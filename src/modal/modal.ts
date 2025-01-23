import { LitElement, HTMLTemplateResult, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { getModalStyles } from './modal-styles.js';
import { Constant } from '../constant.js';
import { AssetModel } from '../asset/asset-model.js';
import { downloadC2pa } from '../asset/asset-service.js';
import interactionTracker, { TrackerEvent } from './interaction-tracker.js';
import { isMobile } from '../utils.js';

export function formatTxHash(txHash: string): string {
  if (txHash.length < 60) {
    return '';
  }
  const firstPart = txHash.slice(0, 6);
  const lastPart = txHash.slice(-6);
  return `${firstPart}...${lastPart}`;
}

export function generateCaptureEyeCloseSvg(
  color: string,
  size: number
): HTMLTemplateResult {
  return html`
    <svg
      style="--eye-color: ${color};"
      width="${size}"
      height="${size}"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12
          0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        style="fill: var(--eye-color, #377dde);"
      />
      <path
        d="M17 7.875L16.125 7L12 11.125L7.875 7L7 7.875L11.125 12L7
          16.125L7.875 17L12 12.875L16.125 17L17 16.125L12.875 12L17 7.875Z"
        fill="white"
      />
    </svg>
  `;
}

export interface EngagementZone {
  image: string;
  link: string;
}

export interface ModalOptions {
  nid: string;
  layout?: string;
  color?: string;
  headingSource?: string;
  copyrightZoneTitle?: string;
  engagementZones?: EngagementZone[];
  actionButtonText?: string;
  actionButtonLink?: string;
  position?: { top: number; left: number; name: string };
}

@customElement('capture-eye-modal')
export class CaptureEyeModal extends LitElement {
  static override styles = getModalStyles();

  @property({ type: String }) nid = '';
  @property({ type: String }) layout = Constant.layout.original;
  @property({ type: Boolean }) modalHidden = true;

  @state() protected _color = '';
  @state() protected _copyrightZoneTitle = '';
  @state() protected _engagementZones: EngagementZone[] = [];
  @state() protected _engagementZoneIndex = 0;
  @state() protected _engagementZoneRotationInterval = 5000;
  @state() protected _engagementZoneRotationIntervalId:
    number | NodeJS.Timeout | undefined = undefined;
  @state() protected _headingSource = '';
  @state() protected _position:
    | { top: number; left: number; name: string }
    | undefined = undefined;
  @state() protected _actionButtonText = '';
  @state() protected _actionButtonLink = '';
  @state() protected _asset: AssetModel | undefined = undefined;
  @state() protected _assetLoaded = false;
  @state() protected _imageLoaded = false;

  @query('.modal') modalElement!: HTMLDivElement;

  private _c2paUrl = '';

  constructor() {
    super();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopEngagementZoneRotation();
  }

  override updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (
      changedProperties.has('modalHidden')
      || changedProperties.has('_assetLoaded')
    ) {
      const closeButton = this.shadowRoot?.querySelector('.close-button');
      if (this.modalElement && closeButton && !this.modalHidden) {
        this.updateModelPosition(closeButton as HTMLElement);
      }
    }
  }

  updateAsset(asset: AssetModel, setAsLoaded = false) {
    this._asset = { ...this._asset, ...asset };
    if (setAsLoaded) this._assetLoaded = true;
  }

  updateModalOptions(options: ModalOptions) {
    if (options.nid) this.nid = options.nid;
    if (options.layout) this.layout = options.layout;
    if (options.color !== undefined && options.color !== this._color) {
      this._color = options.color;
      this.updateModalColor();
    }
    if (options.headingSource) {
      this._headingSource = options.headingSource;
    }
    if (options.copyrightZoneTitle)
      this._copyrightZoneTitle = options.copyrightZoneTitle;
    if (
      options.engagementZones !== undefined &&
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
      this._position = options.position;
    }
  }

  clearModalOptions() {
    this.stopEngagementZoneRotation();
    this.nid = '';
    this.layout = Constant.layout.original;
    this._color = '';
    this._copyrightZoneTitle = '';
    this._engagementZones = [];
    this._engagementZoneIndex = 0;
    this._engagementZoneRotationIntervalId = undefined;
    this._actionButtonText = '';
    this._actionButtonLink = '';
    this._asset = undefined;
    this._assetLoaded = false;
    this._position = undefined;
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

  private isC2paSupported() {
    return typeof this._asset?.encodingFormat === 'string' && new Set([
      'video/msvideo',
      'video/avi',
      'application-msvideo',
      'image/avif',
      'application/x-c2pa-manifest-store',
      'image/x-adobe-dng',
      'image/heic',
      'image/heif',
      'image/jpeg',
      'audio/mp4',
      'audio/mpeg',
      'video/mp4',
      'application/mp4',
      'video/quicktime',
      'application/pdf',
      'image/png',
      'image/svg+xml',
      'image/tiff',
      'audio/x-wav',
      'image/webp',
    ]).has(this._asset?.encodingFormat);
  }

  private isOriginal() {
    return this.layout == Constant.layout.original;
  }

  private renderBadges() {
    const generatedViaAi = this._asset?.digitalSourceType === 'trainedAlgorithmicMedia'
      ? html`<img
          src="${Constant.url.generatedViaAi}"
          alt="Generated via AI"
          title="Generated via AI"
        />`
      : html``;

    const contentCredentials = this.isC2paSupported()
      ? html`<div
          class="button-content-credentials" title="Inspect Content Credentials"
          @click=${this.handleInspectContentCredentials}
        >
          <svg viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M14.6,8v6.6H8c-3.7,0-6.6-3-6.6-6.6s3-6.6,6.6-6.6S14.6,4.3,14.6,8z
                M0,8c0-4.4,3.6-8,8-8s8,3.6,8,8v8H8 C3.6,16,0,12.4,0,8z
                M3.2,8.3c0,1.6,1.1,3,2.9,3c1.5,0,2.4-1,2.7-2.2H7.3c-0.2,0.6-0.6,
                0.9-1.2,0.9c-0.9,0-1.5-0.7-1.5-1.8
                s0.6-1.8,1.5-1.8c0.6,0,1,0.3,1.2,0.9h1.4C8.5,6.2,7.5,5.3,6.1,5.3C4.3,
                5.3,3.2,6.7,3.2,8.3z
                M10.7,5.4H9.3v5.8h1.4v-3
                c0-0.6,0.2-0.9,0.4-1.2c0.2-0.2,0.6-0.3,1.1-0.3h0.4V5.4h-0.4c-0.8,0-1.2,
                0.3-1.6,0.7L10.7,5.4L10.7,5.4z"
              clip-rule="evenodd"
            >
            </path>
          </svg>
        </div>`
      : html``;

    return html`
      <div class="badge-container">
        ${generatedViaAi}
        ${contentCredentials}
      </div>
    `;
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

  private renderHeading() {
    // Preserve headline for backward compatibility
    // in case some references still use the older name
    const headingClass = 'heading headline';
    const headingText = this._assetLoaded
      ? this._headingSource === 'abstract'
        ? this._asset?.abstract ?? ''
        : this._asset?.headline ?? ''
      : '';
    return html`
      <div class="${headingClass}" title=${headingText} @click=${this.toggleHeading}>
        ${this._assetLoaded
          ? html`${headingText}`
          : html`<div class="shimmer-text" style="height: auto;">&nbsp;</div>`}
      </div>
    `;
  }

  private renderTop() {
    const image = this._asset?.thumbnailUrl
      ? html`<img
          src=${this._asset?.thumbnailUrl}
          alt="Profile"
          class="profile-img"
        />`
      : typeof this._asset?.encodingFormat === 'string' &&
        this._asset.encodingFormat.includes('audio/')
      ? html`<svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
          width="100"
          height="100"
          x="0"
          y="0"
          viewBox="0 0 512 512"
          style="enable-background:new 0 0 100 100"
          xml:space="preserve"
          class="profile-img"
        >
          <g>
            <path
              d="M501.969 5.638A23.063 23.063 0 0 0 483.603.231L160.83 46.341c-11.359 1.623-19.795 11.351-19.795 22.825V339.475c-13.656-7.956-29.509-12.537-46.421-12.537-51.021 0-92.531 41.51-92.531 92.531S43.592 512 94.613 512s92.531-41.51 92.531-92.531V181.383l276.663-39.523v151.504c-13.656-7.956-29.509-12.537-46.421-12.537-51.021 0-92.531 41.51-92.531 92.531 0 51.021 41.51 92.531 92.531 92.531s92.531-41.51 92.531-92.531V23.055a23.05 23.05 0 0 0-7.948-17.417z"
              fill="#808080"
              data-original="#000000"
              data-darkreader-inline-fill=""
              style="--darkreader-inline-fill: #292a2b;"
              class=""
            ></path>
          </g>
        </svg>`
      : html`<img
          src=${Constant.url.blankThumbnail}
          alt="Profile"
          class="profile-img"
        />`;
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
                >${image}</a
              >`
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
        ${this.renderHeading()}
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
      : html`<span class="shimmer-text" style="height: 21.5px;"></span>`}`;
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
                : html`<span class="shimmer-text" style="height: 21.5px;"></span>`}
            </div>
            <div class="middle-row">${this.renderTransaction()}</div>`
        : html`<div class="middle-row">
            ${this._assetLoaded
              ? html`${this.renderIcon(Constant.url.curatorIcon)}
                  <span class="field-text">
                    ${this._asset?.backendOwnerName ?? ''}
                  </span>`
              : html`<div class="shimmer-text" style="height: 21.5px;"></div>`}
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
            : html`<div class="shimmer-text" style="height: auto;">&nbsp;</div>`}
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
    const mobile = isMobile();
    const color = this._color
      ? this._color
      : mobile
      ? Constant.color.mobileEye
      : Constant.color.defaultEye;
    const size = mobile ? 24 : 32;
    return html`
      <div
        class="modal ${this.modalHidden ? 'modal-hidden' : 'modal-visible'}"
        @click=${this.handleModalClick}
      >
        <div class="modal-container">
          <div class="modal-content">
            <div class="card">
              ${this.renderBadges()}
              ${this.renderTop()}
              ${this._asset?.captureEyeCustom &&
              this._asset.captureEyeCustom.length > 0
                ? this.renderCustomProvenanceZone()
                : this.renderDefaultProvenanceZone()}
              ${this.renderBottom()}
            </div>
          </div>
          ${this.renderEngagementZone()}
        </div>
        <div
          class="close-button ${this.modalHidden
            ? 'close-button-hidden'
            : 'close-button-visible'}"
          @click=${this.emitRemoveEvent}
        >
          ${generateCaptureEyeCloseSvg(color, size)}
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

  private handleInspectContentCredentials() {
    if (this._c2paUrl) {
      window.open(this._c2paUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const button = this.shadowRoot?.querySelector('.button-content-credentials') as HTMLElement;
    if (button.classList.contains('loading')) {
      return;
    }

    if (!confirm(
      'Inspecting Content Credentials might take a little while. Proceed?'
    )) {
      return;
    }

    button.classList.add('loading');
    button.title = 'Inspecting Content Credentials...';

    downloadC2pa(this.nid, interactionTracker.token).then((url) => {
      if (!this.isConnected) {
        return;
      }

      if (url) {
        this._c2paUrl = `https://contentcredentials.org/verify?source=${url}`;
        button.title = 'View Content Credentials';
        alert(
          'Data is ready. Please click the Content Credential pin again to view it.'
        );
      } else {
        button.title = 'Inspect Content Credentials';
        alert('Something went wrong. Please try again later.');
      }
      button.classList.remove('loading');
    })
  }

  private emitRemoveEvent() {
    // Emit remove event to trigger ModalManager to remove the modal
    this.dispatchEvent(new CustomEvent('remove-capture-eye-modal'));
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

  private updateModalColor() {
    // Set primary color
    this.style.setProperty('--primary-color', this._color);

    // Set hover color
    this.style.setProperty('--hover-color', '');  // Clear the color
    if (!this._color) {
      return;
    }

    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.fillStyle = this._color;
    let hoverColor = ctx.fillStyle;
    const hexPattern = /^#[0-9a-fA-F]{6}$/;
    if (!hexPattern.test(hoverColor)) {
      return;
    }

    function fadeColor(start: number): number {
      const n = parseInt(hoverColor.substring(start, start + 2), 16);
      return Math.round(n + (255 - n) * 0.5);
    }

    const r = fadeColor(1);
    const g = fadeColor(3);
    const b = fadeColor(5);
    hoverColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    this.style.setProperty('--hover-color', hoverColor);
  }

  private updateModelPosition(closeButton: HTMLElement) {
    if (!this._position) {
      return;
    }

    const remOffset = this.remToPixels(1); // Convert 1rem to pixels
    const top = this._position.top + remOffset;
    const left = this._position.left + remOffset;
    const positions = this._position.name.split(' ');

    // Update modal position styles with 1rem offset
    // Calculate the modal position relative to the media
    let modelTop = top;
    let modelLeft = left;
    if (
      modelTop > this.modalElement.offsetHeight &&
      (positions.includes('bottom') ||
        modelTop + this.modalElement.offsetHeight >
          document.documentElement.scrollHeight)
    ) {
      modelTop -= this.modalElement.offsetHeight;
    } else if (
      modelTop + this.modalElement.offsetHeight > document.documentElement.scrollHeight
    ) {
      modelTop = Math.max(
        0,
        document.documentElement.scrollHeight - this.modalElement.offsetHeight
      );
    }

    if (
      modelLeft > this.modalElement.offsetWidth &&
      (positions.includes('right') ||
        modelLeft + this.modalElement.offsetWidth >
          document.documentElement.scrollWidth)
    ) {
      modelLeft -= this.modalElement.offsetWidth;
    } else if (
      modelLeft + this.modalElement.offsetWidth > document.documentElement.scrollWidth
    ) {
      modelLeft = Math.max(
        0,
        document.documentElement.scrollWidth - this.modalElement.offsetWidth
      );
    }

    this.modalElement.style.top = `${modelTop}px`;
    this.modalElement.style.left = `${modelLeft}px`;

    let startTop = top - modelTop;
    let startLeft = left - modelLeft;
    if (
      startTop != 0 && startTop != this.modalElement.offsetHeight
      && startLeft != 0 && startLeft != this.modalElement.offsetWidth
    ) {  // The starting position is not aligned with the edge
      if (startTop <= startLeft) {
        startTop = 0;
      } else {
        startLeft = 0;
      }
    }

    const modalContainer = this.shadowRoot?.querySelector('.modal-container');
    if (modalContainer) {
        (modalContainer as HTMLDivElement).style.transformOrigin = `${startLeft}px ${startTop}px`;
    }

    closeButton.style.top = `${startTop - closeButton.offsetHeight / 2}px`;
    closeButton.style.left = `${startLeft - closeButton.offsetWidth / 2}px`;
  }

  private toggleHeading() {
    const heading = this.shadowRoot?.querySelector('.heading');
    if (!heading) {
      return;
    }

    heading.classList.toggle('expand');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'capture-eye-modal': CaptureEyeModal;
  }
}
