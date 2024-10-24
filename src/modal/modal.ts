import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { getModalStyles } from './modal-styles.js';
import { Constant } from '../constant.js';
import { AssetModel } from '../asset/asset-model.js';
import interactionTracker, { TrackerEvent } from './interaction-tracker.js';
import { hasTouchScreen } from '../utils.js';

export function formatTxHash(txHash: string): string {
  if (txHash.length < 60) {
    return '';
  }
  const firstPart = txHash.slice(0, 6);
  const lastPart = txHash.slice(-6);
  return `${firstPart}...${lastPart}`;
}

export interface EngagementZone {
  image: string;
  link: string;
}

export interface ModalOptions {
  nid: string;
  layout?: string;
  copyrightZoneTitle?: string;
  engagementZones?: EngagementZone[];
  actionButtonText?: string;
  actionButtonLink?: string;
  position?: { top: number; left: number };
}

@customElement('capture-eye-modal')
export class CaptureEyeModal extends LitElement {
  static override styles = getModalStyles();

  @property({ type: String }) nid = '';
  @property({ type: String }) layout = Constant.layout.original;
  @property({ type: Boolean }) modalHidden = true;

  @state() protected _copyrightZoneTitle = '';
  @state() protected _engagementZones: EngagementZone[] = [];
  @state() protected _engagementZoneIndex = 0;
  @state() protected _engagementZoneRotationInterval = 5000;
  @state() protected _engagementZoneRotationIntervalId: number | undefined =
    undefined;
  @state() protected _actionButtonText = '';
  @state() protected _actionButtonLink = '';
  @state() protected _asset: AssetModel | undefined = undefined;
  @state() protected _assetLoaded = false;
  @state() protected _imageLoaded = false;

  @query('.modal') modalElement!: HTMLDivElement;

  constructor() {
    super();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopEngagementZoneRotation();
  }

  override firstUpdated() {
    this.updateModalVisibility();
  }

  override updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('modalHidden')) {
      this.updateModalVisibility();
    }
  }

  updateAsset(asset: AssetModel, setAsLoaded = false) {
    this._asset = { ...this._asset, ...asset };
    if (setAsLoaded) this._assetLoaded = true;
  }

  updateModalOptions(options: ModalOptions) {
    if (options.nid) this.nid = options.nid;
    if (options.layout) this.layout = options.layout;
    if (options.copyrightZoneTitle)
      this._copyrightZoneTitle = options.copyrightZoneTitle;
    if (
      options.engagementZones &&
      JSON.stringify(options.engagementZones) !==
        JSON.stringify(this._engagementZones)
    ) {
      this._imageLoaded = false;
      this._engagementZones = options.engagementZones;
    }
    this.preloadEngagementZoneImages();
    if (options.actionButtonText)
      this._actionButtonText = options.actionButtonText;
    if (options.actionButtonLink)
      this._actionButtonLink = options.actionButtonLink;
    if (options.position) {
      const remOffset = this.remToPixels(1); // Convert 1rem to pixels
      // Update modal position styles with 1rem offset
      this.modalElement.style.position = 'absolute';
      this.modalElement.style.top = `${options.position.top + remOffset}px`;
      this.modalElement.style.left = `${options.position.left + remOffset}px`;
    }
  }

  clearModalOptions() {
    this.stopEngagementZoneRotation();
    this.nid = '';
    this.layout = Constant.layout.original;
    this._copyrightZoneTitle = '';
    this._engagementZones = [];
    this._engagementZoneIndex = 0;
    this._engagementZoneRotationIntervalId = undefined;
    this._actionButtonText = '';
    this._actionButtonLink = '';
    this._asset = undefined;
    this._assetLoaded = false;
  }

  private updateModalVisibility() {
    const closeButton = this.shadowRoot?.querySelector('.close-button');
    if (this.modalElement && closeButton) {
      if (this.modalHidden) {
        this.modalElement.classList.add('modal-hidden');
        this.modalElement.classList.remove('modal-visible');
        closeButton.classList.add('close-button-hidden');
        closeButton.classList.remove('close-button-visible');
        // Add a transitionend event listener to move the modal off-screen after the animation
        this.modalElement.addEventListener(
          'transitionend',
          () => {
            if (this.modalHidden) {
              this.modalElement.style.top = '-9999px';
              this.modalElement.style.left = '-9999px';
            }
          },
          { once: true }
        );
      } else {
        this.modalElement.classList.remove('modal-hidden');
        this.modalElement.classList.add('modal-visible');
        closeButton.classList.remove('close-button-hidden');
        closeButton.classList.add('close-button-visible');
        if (hasTouchScreen()) {
          closeButton.classList.add('mobile');
        }
      }
    }
  }

  private remToPixels(rem: number): number {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  private startEngagementZoneRotation() {
    if (this._engagementZones.length <= 1) return;
    this._engagementZoneRotationIntervalId = setInterval(() => {
      this._engagementZoneIndex =
        (this._engagementZoneIndex + 1) % this._engagementZones.length;
    }, this._engagementZoneRotationInterval);
  }

  private stopEngagementZoneRotation() {
    if (this._engagementZoneRotationIntervalId)
      clearInterval(this._engagementZoneRotationIntervalId);
  }

  private rotateNext() {
    if (this._engagementZones.length <= 1) return;
    this._engagementZoneIndex =
      (this._engagementZoneIndex + 1) % this._engagementZones.length;
  }
  private rotatePrev() {
    if (this._engagementZones.length <= 1) return;
    this._engagementZoneIndex =
      (this._engagementZoneIndex - 1 + this._engagementZones.length) %
      this._engagementZones.length;
  }

  private preloadEngagementZoneImages(): Promise<void> {
    return new Promise((resolve, reject) => {
      let loadedImages = 0;
      const imageUrls =
        this._engagementZones.length > 0
          ? this._engagementZones.map((zone) => zone.image)
          : [Constant.url.defaultEngagementImage];

      imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedImages++;
          if (loadedImages === imageUrls.length) {
            this.handleImageLoad();
            resolve();
          }
        };
        img.onerror = () => {
          console.error(`Image failed to load: ${url}`);
          reject(new Error(`Image failed to load: ${url}`));
        };
      });
    });
  }

  private handleImageLoad() {
    this._imageLoaded = true;
    this.startEngagementZoneRotation();
  }

  private isOriginal() {
    return this.layout == Constant.layout.original;
  }

  private renderCreatorOrAssetSourceType() {
    // Render creator and showcase link if layout is original, otherwise render assetSourceType
    return this.isOriginal()
      ? html`
          <a
            class="link-text"
            href=${this._asset?.showcaseLink ?? '#'}
            target="_blank"
          >
            ${this._asset?.creator ?? ''}
          </a>
        `
      : this._asset?.assetSourceType ?? '';
  }

  private renderTop() {
    const imgSrc = this._asset?.thumbnailUrl
      ? this._asset?.thumbnailUrl
      : 'https://via.placeholder.com/100';
    /*
     * original: signed_metadata.capture_time or assetTree.assetTimestampCreated or uploaded_at
     * curated: integrity(signed_metadata) capture_time
     */
    const date = this.isOriginal()
      ? this._asset?.captureTime
        ? this._asset?.captureTime
        : this._asset?.createdTime
      : this._asset?.captureTime;
    return html`
      <div class="section">
        <div class="section-title">
          ${this._copyrightZoneTitle || Constant.text.defaultCopyrightZoneTitle}
        </div>
        <div class="profile-container">
          ${this._assetLoaded
            ? html`<a
                href=${`${Constant.url.profile}/${this.nid}`}
                target="_blank"
                ><img src=${imgSrc} alt="Profile" class="profile-img"
              /></a>`
            : html`<div class="shimmer-profile-img"></div>`}
          <div class="profile-text">
            <div class="top-name">
              ${this._assetLoaded
                ? this.renderCreatorOrAssetSourceType()
                : html`<div class="shimmer-text"></div>`}
            </div>
            <div class="top-info">
              ${this._assetLoaded
                ? date ?? ''
                : html`<div class="shimmer-text"></div>`}
            </div>
            <div class="top-info">
              ${this._assetLoaded
                ? this._asset?.captureLocation ?? ''
                : html`<div class="shimmer-text"></div>`}
            </div>
          </div>
        </div>
        <div class="headline">
          ${this._assetLoaded
            ? this._asset?.headline ?? ''
            : html`<div class="shimmer-text"></div>`}
        </div>
      </div>
    `;
  }

  private renderIcon(iconUrl: string) {
    return html`<img
      src=${iconUrl}
      loading="lazy"
      width="20"
      height="auto"
      alt=""
    />`;
  }

  private renderTransaction() {
    const transactionText =
      formatTxHash(this._asset?.initialTransaction ?? '') || 'N/A';
    return html`${this._assetLoaded
      ? html`${this.renderIcon(Constant.url.txIcon)}
          <span class="field-text">Blockchain Tx:</span>
          ${transactionText !== 'N/A' && this._asset?.explorerUrl
            ? html`<a
                class="link-text"
                href=${this._asset.explorerUrl}
                target="_blank"
              >
                <span class="value-text">${transactionText}</span>
              </a>`
            : html`<span class="value-text">${transactionText}</span>`}`
      : html`<span class="shimmer-text"></span>`}`;
  }

  private renderDefaultProvenanceZone() {
    return html` <div class="section">
      <div class="section-title">
        ${this.isOriginal() ? 'Origins' : 'Curated By'}
      </div>
      ${this.isOriginal()
        ? html`<div class="middle-row">
              ${this._assetLoaded
                ? html`${this.renderIcon(Constant.url.blockchainIcon)}
                    <span class="field-text">Blockchain:</span>
                    <a
                      class="link-text"
                      href=${Constant.url.explorer}
                      target="_blank"
                    >
                      <span class="value-text"
                        >${Constant.text.numbersMainnet}</span
                      >
                    </a>`
                : html`<span class="shimmer-text"></span>`}
            </div>
            <div class="middle-row">${this.renderTransaction()}</div>`
        : html`<div class="middle-row">
            ${this._assetLoaded
              ? html`${this.renderIcon(Constant.url.curatorIcon)}
                  <span class="field-text">
                    ${this._asset?.backendOwnerName ?? ''}
                  </span>`
              : html`<div class="shimmer-text"></div>`}
          </div>`}
    </div>`;
  }

  private renderCustomProvenanceZone() {
    const captureEyeCustom = this._asset?.captureEyeCustom;
    if (!Array.isArray(captureEyeCustom)) {
      return html``;
    }
    const provenanceZoneItems = captureEyeCustom.filter(
      (item) => item.field && item.value
    );
    return html`
      <div class="section">
        <div class="section-title">
          ${this.isOriginal() ? 'Origins' : 'Curated By'}
        </div>
        ${provenanceZoneItems.map(
          (item) => html`
            <div class="middle-row">
              ${item.iconSource ? this.renderIcon(item.iconSource) : html``}

              <span class="field-text">${item.field}:</span>
              ${item.url
                ? html`<a class="link-text" href=${item.url} target="_blank"
                    ><span class="value-text">${item.value}</span></a
                  >`
                : html`<span class="value-text">${item.value}</span>`}
            </div>
          `
        )}
        <div class="middle-row">${this.renderTransaction()}</div>
      </div>
    `;
  }

  private renderBottom() {
    const actionButtonLink = this._actionButtonLink
      ? this._actionButtonLink
      : this._asset?.hasNftProduct
      ? `${Constant.url.collect}?nid=${this.nid}&from=capture-eye`
      : this.isOriginal()
      ? `${Constant.url.profile}/${this.nid}`
      : this._asset?.usedBy ?? '';
    const actionButtonText = this._actionButtonText
      ? this._actionButtonText
      : this._asset?.hasNftProduct
      ? Constant.text.collect
      : Constant.text.viewMore;
    return html`
      <div class="section">
        <a href=${actionButtonLink} target="_blank"
          ><button class="view-more-btn">${actionButtonText}</button></a
        >
        <div class="powered-by">
          ${this._assetLoaded
            ? html`<a href=${Constant.url.numbersWebsite} target="_blank"
                >Powered by Numbers Protocol</a
              >`
            : html`<div class="shimmer-text"></div>`}
        </div>
      </div>
    `;
  }

  private get currentEngagementZone() {
    const defaultEngagementZone: EngagementZone = {
      image: Constant.url.defaultEngagementImage,
      link: Constant.url.defaultEngagementLink,
    };
    const currentEngagementZone =
      this._engagementZones.length > 0
        ? this._engagementZones[this._engagementZoneIndex]
        : defaultEngagementZone;
    return currentEngagementZone;
  }

  private renderEngagementZone() {
    return html`
      <div class="slideshow-container">
        <a
          href=${this.currentEngagementZone.link}
          target="_blank"
          class="eng-link"
          @click=${this.trackEngagement}
        >
          <img
            src=${this.currentEngagementZone.image}
            alt="Slideshow Image"
            class="eng-img"
            style="display: ${this._imageLoaded ? 'block' : 'none'}"
          />
          ${!this._imageLoaded ? html`<div class="shimmer eng-img"></div>` : ''}
        </a>
        <!-- Left and Right Arrows -->
        ${this._engagementZones.length > 1
          ? html` <button class="prev" @click=${this.rotatePrev}>
                &#10094;
              </button>
              <button class="next" @click=${this.rotateNext}>&#10095;</button>`
          : ''}
      </div>
    `;
  }

  override render() {
    const isMobile = hasTouchScreen();
    return html`
      <div
        class="modal ${this.modalHidden ? 'modal-hidden' : 'modal-visible'}"
        @click=${this.handleModalClick}
      >
        <div class="modal-container">
          <div class="modal-content">
            <div class="card">
              ${this.renderTop()}
              ${this._asset?.captureEyeCustom &&
              this._asset.captureEyeCustom.length > 0
                ? this.renderCustomProvenanceZone()
                : this.renderDefaultProvenanceZone()}
              ${this.renderBottom()}
            </div>
          </div>
          ${this.renderEngagementZone()}
          <div class="close-button" @click=${this.hideModal}>
            <img
              src=${isMobile
                ? Constant.url.mobileCloseIcon
                : Constant.url.closeIcon}
              alt="Close"
            />
          </div>
        </div>
      </div>
    `;
  }

  private handleModalClick(event: MouseEvent) {
    event.stopPropagation();
    // Check if the target of the event is an <a> tag
    const isAnchorTag = (event.target as HTMLElement).closest('a') !== null;

    // Prevent default behavior only if the target is not an <a> tag
    if (!isAnchorTag) {
      event.preventDefault();
    }
  }

  private hideModal() {
    this.modalHidden = true;
  }

  private trackEngagement() {
    // 0: User-customized link (not provided by us)
    // 1: Default engagement link
    // 2, 3, ...: Future rotating engagement links
    const subid =
      this.currentEngagementZone.link === Constant.url.defaultEngagementLink
        ? '1'
        : '0';
    interactionTracker.trackInteraction(
      TrackerEvent.ENGAGEMENT_ZONE,
      this.nid,
      subid
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'capture-eye-modal': CaptureEyeModal;
  }
}
