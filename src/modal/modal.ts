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
  @state() blockchain = 'Numbers Mainnet';
  @state() asset: AssetModel | undefined = undefined;
  @state() assetLoaded = false;
  @state() captureEyeCustom: object | undefined = undefined;
  @state() imageLoaded = false;
  @state() hasNftProduct = false;

  @query('.modal') modalElement!: HTMLDivElement;

  constructor() {
    super();
  }

  resetModalProps() {
    this.asset = undefined;
    this.assetLoaded = false;
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
    const imgSrc = this.asset?.thumbnailUrl
      ? this.asset?.thumbnailUrl
      : 'https://via.placeholder.com/100';
    const name = this.isOriginal()
      ? this.asset?.creator
      : this.asset?.assetSourceType;
    /*
     * original: signed_metadata.capture_time or assetTree.assetTimestampCreated or uploaded_at
     * curated: integrity(signed_metadata) capture_time
     */
    const date = this.isOriginal()
      ? this.asset?.captureTime
        ? this.asset?.captureTime
        : this.asset?.createdTime
      : this.asset?.captureTime;
    return html`
      <div class="section">
        <div class="section-title">Produced by</div>
        <div class="profile-container">
          ${this.assetLoaded
            ? html`<img src=${imgSrc} alt="Profile" class="profile-img" />`
            : html`<div class="shimmer-profile-img"></div>`}
          <div class="profile-text">
            <div class="top-name">
              ${this.assetLoaded
                ? name
                : html`<div class="shimmer-text"></div>`}
            </div>
            <div class="top-date">
              ${this.assetLoaded
                ? date
                : html`<div class="shimmer-text"></div>`}
            </div>
          </div>
        </div>
        <div class="headline">
          ${this.assetLoaded
            ? this.asset?.headline
            : html`<div class="shimmer-text"></div>`}
        </div>
      </div>
    `;
  }

  private renderMiddle() {
    const formattedTransaction = formatTxHash(
      this.asset?.initialTransaction ?? ''
    );
    return html`
      <div class="section">
        <div class="section-title">
          ${this.isOriginal() ? 'Origins' : 'Curated By'}
        </div>
        ${this.isOriginal()
          ? html`<div class="middle-row">
                ${this.assetLoaded
                  ? html`<img
                        src=${Constant.url.blockchainIcon}
                        loading="lazy"
                        width="20"
                        height="Auto"
                        alt=""
                      /><span class="middle-text"
                        >Blockchain:
                        <a
                          class="link-text"
                          href=${Constant.url.explorer}
                          target="_blank"
                          >${this.blockchain}</a
                        ></span
                      >`
                  : html`<span class="shimmer-text"></span>`}
              </div>
              <div class="middle-row">
                ${formattedTransaction
                  ? html`<img
                        src=${Constant.url.txIcon}
                        loading="lazy"
                        width="20"
                        height="Auto"
                        alt=""
                      />
                      <span class="middle-text"
                        >Transaction:
                        <a
                          class="link-text"
                          href=${this.asset?.explorerUrl ?? ''}
                          target="_blank"
                          >${formattedTransaction}</a
                        ></span
                      >`
                  : html`${this.assetLoaded
                      ? html`<img
                            src=${Constant.url.txIcon}
                            loading="lazy"
                            width="20"
                            height="Auto"
                            alt=""
                          />
                          <span class="middle-text">Transaction: N/A</span>`
                      : html`<span class="shimmer-text"></span>`}`}
              </div>`
          : html`<div class="middle-row">
              ${this.assetLoaded
                ? html`<img
                      src=${Constant.url.curatorIcon}
                      loading="lazy"
                      width="20"
                      height="Auto"
                      alt=""
                    /><span class="middle-text"
                      >${this.asset?.backendOwnerName}</span
                    >`
                : html`<div class="shimmer-text"></div>`}
            </div>`}
      </div>
    `;
  }

  private renderBottom() {
    const actionButtonLink = this.actionButtonLink
      ? this.actionButtonLink
      : this.hasNftProduct
      ? `${Constant.url.collect}?nid=${this.nid}&from=capture-eye`
      : this.isOriginal()
      ? `${Constant.url.profile}/${this.nid}`
      : this.asset?.usedBy ?? '';
    const actionButtonText = this.actionButtonText
      ? this.actionButtonText
      : this.hasNftProduct
      ? Constant.text.collect
      : Constant.text.viewMore;
    return html`
      <div class="section">
        <a href=${actionButtonLink} target="_blank"
          ><button class="view-more-btn">${actionButtonText}</button></a
        >
        <div class="powered-by">
          ${this.assetLoaded
            ? html`<a href=${Constant.url.numbersWebsite} target="_blank"
                >Powered by Numbers Protocol</a
              >`
            : html`<div class="shimmer-text"></div>`}
        </div>
      </div>
    `;
  }

  private handleImageLoad() {
    this.imageLoaded = true;
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
              ${this.renderTop()} ${this.renderMiddle()} ${this.renderBottom()}
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
                  style="display: ${this.imageLoaded ? 'block' : 'none'}"
                />
                ${!this.imageLoaded
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
