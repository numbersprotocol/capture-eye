import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { getModalStyles } from './modal-styles.js';
import { Constant } from '../constant.js';
import { AssetModel } from '../asset/asset-model.js';

export function formatTxHash(txHash: string): string {
  if (txHash.length < 60) {
    return '';
  }
  const firstPart = txHash.slice(0, 6);
  const lastPart = txHash.slice(-6);
  return `${firstPart}...${lastPart}`;
}

@customElement('capture-eye-modal')
export class CaptureEyeModal extends LitElement {
  static override styles = getModalStyles();

  @property({ type: String })
  nid = '';

  @property({ type: String })
  layout = Constant.layout.original;

  @property({ type: Boolean })
  modalHidden = true;

  @state() engagementImage = '';
  @state() engagementLink = '';
  @state() actionButtonText = '';
  @state() actionButtonLink = '';
  @state() protected _blockchain = 'Numbers Mainnet';
  @state() protected _asset: AssetModel | undefined = undefined;
  @state() protected _assetLoaded = false;
  @state() protected _imageLoaded = false;

  @query('.modal') modalElement!: HTMLDivElement;

  constructor() {
    super();
  }

  updateAsset(asset: AssetModel, setAsLoaded = false) {
    this._asset = { ...this._asset, ...asset };
    if (setAsLoaded) this._assetLoaded = true;
  }

  resetModalProps() {
    this._asset = undefined;
    this._assetLoaded = false;
    this.engagementImage = Constant.url.defaultEngagementImage;
    this.engagementLink = Constant.url.defaultEngagementLink;
    this.actionButtonText = '';
    this.actionButtonLink = '';
  }

  override firstUpdated() {
    this.updateModalVisibility();
  }

  override updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('modalHidden')) {
      this.updateModalVisibility();
    }
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
        // Reset the position before making it visible
        this.modalElement.style.top = '';
        this.modalElement.style.left = '';
        this.modalElement.classList.remove('modal-hidden');
        this.modalElement.classList.add('modal-visible');
        closeButton.classList.remove('close-button-hidden');
        closeButton.classList.add('close-button-visible');
      }
    }
  }

  private isOriginal() {
    return this.layout == Constant.layout.original;
  }

  private renderTop() {
    const imgSrc = this._asset?.thumbnailUrl
      ? this._asset?.thumbnailUrl
      : 'https://via.placeholder.com/100';
    const name = this.isOriginal()
      ? this._asset?.creator
      : this._asset?.assetSourceType;
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
        <div class="section-title">Produced by</div>
        <div class="profile-container">
          ${this._assetLoaded
            ? html`<img src=${imgSrc} alt="Profile" class="profile-img" />`
            : html`<div class="shimmer-profile-img"></div>`}
          <div class="profile-text">
            <div class="top-name">
              ${this._assetLoaded
                ? name
                : html`<div class="shimmer-text"></div>`}
            </div>
            <div class="top-date">
              ${this._assetLoaded
                ? date
                : html`<div class="shimmer-text"></div>`}
            </div>
          </div>
        </div>
        <div class="headline">
          ${this._assetLoaded
            ? this._asset?.headline
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

  private renderDefaultProvenanceZone() {
    const formattedTransaction = formatTxHash(
      this._asset?.initialTransaction ?? ''
    );
    return html`
      <div class="section">
        <div class="section-title">
          ${this.isOriginal() ? 'Origins' : 'Curated By'}
        </div>
        ${this.isOriginal()
          ? html`<div class="middle-row">
                ${this._assetLoaded
                  ? html`${this.renderIcon(Constant.url.blockchainIcon)}<span
                        class="field-text"
                        >Blockchain:</span
                      >
                      <a
                        class="link-text"
                        href=${Constant.url.explorer}
                        target="_blank"
                        ><span class="value-text">${this._blockchain}</span></a
                      >`
                  : html`<span class="shimmer-text"></span>`}
              </div>
              <div class="middle-row">
                ${formattedTransaction
                  ? html`${this.renderIcon(Constant.url.txIcon)}
                      <span class="field-text">Transaction:</span>
                      <a
                        class="link-text"
                        href=${this._asset?.explorerUrl ?? ''}
                        target="_blank"
                        ><span class="value-text"
                          >${formattedTransaction}</span
                        ></a
                      >`
                  : html`${this._assetLoaded
                      ? html`${this.renderIcon(Constant.url.txIcon)}
                          <span class="field-text">Transaction:</span
                          ><span class="value-text">N/A</span>`
                      : html`<span class="shimmer-text"></span>`}`}
              </div>`
          : html`<div class="middle-row">
              ${this._assetLoaded
                ? html`${this.renderIcon(Constant.url.curatorIcon)}<span
                      class="field-text"
                      >${this._asset?.backendOwnerName}</span
                    >`
                : html`<div class="shimmer-text"></div>`}
            </div>`}
      </div>
    `;
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
      </div>
    `;
  }

  private renderBottom() {
    const actionButtonLink = this.actionButtonLink
      ? this.actionButtonLink
      : this._asset?.hasNftProduct
      ? `${Constant.url.collect}?nid=${this.nid}&from=capture-eye`
      : this.isOriginal()
      ? `${Constant.url.profile}/${this.nid}`
      : this._asset?.usedBy ?? '';
    const actionButtonText = this.actionButtonText
      ? this.actionButtonText
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

  private handleImageLoad() {
    this._imageLoaded = true;
  }

  override render() {
    return html`
      <div
        class="modal ${this.modalHidden ? 'modal-hidden' : 'modal-visible'}"
        @click=${this.handleModalClick}
      >
        <div class="modal-container">
          <div class="modal-content">
            <div class="card">
              ${this.renderTop()}
              ${this._asset?.captureEyeCustom
                ? this.renderCustomProvenanceZone()
                : this.renderDefaultProvenanceZone()}
              ${this.renderBottom()}
            </div>
          </div>
          ${this.engagementImage && this.engagementLink
            ? html`<a
                href=${this.engagementLink}
                target="_blank"
                class="eng-link"
              >
                <img
                  src=${this.engagementImage}
                  alt="Full width"
                  class="eng-img"
                  @load=${this.handleImageLoad}
                  style="display: ${this._imageLoaded ? 'block' : 'none'}"
                />
                ${!this._imageLoaded
                  ? html`<div class="shimmer eng-img"></div>`
                  : ''}
              </a>`
            : html`<div class="eng-img"></div>`}
          <div class="close-button" @click=${this.hideModal}>
            <img src=${Constant.url.closeIcon} alt="Close" />
          </div>
        </div>
      </div>
    `;
  }

  private handleModalClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  private hideModal() {
    this.modalHidden = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'capture-eye-modal': CaptureEyeModal;
  }
}
