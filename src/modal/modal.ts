import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { getModalStyles } from './modal-styles.js';
import { Constant } from '../constant.js';

function formatTxHash(txHash: string): string {
  if (txHash.length < 8) {
    return '';
  }
  const firstPart = txHash.slice(0, 4);
  const lastPart = txHash.slice(-4);
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

  @state() creatorName = Constant.text.loading;
  @state() date = Constant.text.loading;
  @state() headline = Constant.text.loading;
  @state() blockchain = Constant.text.loading;
  @state() transaction = Constant.text.loading;
  @state() thumbnailUrl = '';
  @state() explorerUrl = '';
  @state() assetSourceType = Constant.text.loading;
  @state() captureTime = Constant.text.loading;
  @state() backendOwnerName = Constant.text.loading;
  @state() usedBy = Constant.text.loading;
  @state() bannerImageSrc = '';
  @state() bannerLink = '';
  @state() imageLoaded = false;

  @query('.modal') modalElement!: HTMLDivElement;

  constructor() {
    super();
  }

  resetModalProps() {
    this.creatorName = Constant.text.loading;
    this.date = Constant.text.loading;
    this.headline = Constant.text.loading;
    this.blockchain = Constant.text.loading;
    this.transaction = Constant.text.loading;
    this.thumbnailUrl = '';
    this.explorerUrl = '';
    this.bannerImageSrc = '';
    this.bannerLink = '';
    this.imageLoaded = false;
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
    const modalElement = this.shadowRoot?.querySelector('.modal');
    if (modalElement) {
      if (this.modalHidden) {
        modalElement.classList.add('modal-hidden');
        modalElement.classList.remove('modal-visible');

        // Add a transitionend event listener to move the modal off-screen after the animation
        modalElement.addEventListener(
          'transitionend',
          () => {
            if (this.modalHidden) {
              modalElement.style.top = '-9999px';
              modalElement.style.left = '-9999px';
            }
          },
          { once: true }
        );
      } else {
        // Reset the position before making it visible
        modalElement.style.top = '';
        modalElement.style.left = '';
        modalElement.classList.remove('modal-hidden');
        modalElement.classList.add('modal-visible');
      }
    }
  }

  private isOriginal() {
    return this.layout == Constant.layout.original;
  }

  private renderTop() {
    const imgSrc = this.thumbnailUrl
      ? this.thumbnailUrl
      : 'https://via.placeholder.com/100';
    const name = this.isOriginal() ? this.creatorName : this.assetSourceType;
    const date = this.captureTime;
    return html`
      <div class="section">
        <div class="section-title">Produced by</div>
        <div class="profile-container">
          ${this.thumbnailUrl
            ? html`<img src=${imgSrc} alt="Profile" class="profile-img" />`
            : html`<div class="shimmer-profile-img"></div>`}
          <div class="profile-text">
            <div class="top-name">
              ${name !== Constant.text.loading
                ? name
                : html`<div class="shimmer-text"></div>`}
            </div>
            <div class="top-date">
              ${date !== Constant.text.loading
                ? date
                : html`<div class="shimmer-text"></div>`}
            </div>
          </div>
        </div>
        <div class="headline">
          ${this.headline !== Constant.text.loading
            ? this.headline
            : html`<div class="shimmer-text"></div>`}
        </div>
      </div>
    `;
  }

  private renderMiddle() {
    const formattedTransaction = formatTxHash(this.transaction);
    return html`
      <div class="section">
        <div class="section-title">
          ${this.isOriginal() ? 'Origins' : 'Curated By'}
        </div>
        ${this.isOriginal()
          ? html`<p>
                ${this.blockchain !== Constant.text.loading
                  ? `Blockchain: ${this.blockchain}`
                  : html`<div class="shimmer-text"></div>`}
              </p>
              <span>Transaction:</span>
              ${formattedTransaction
                ? html`<a href=${this.explorerUrl} target="_blank"
                    >${formatTxHash(this.transaction)}</a
                  >`
                : html`<span
                    >${this.transaction !== Constant.text.loading
                      ? 'N/A'
                      : html`<div class="shimmer-text"></div>`}</span
                  >`}`
          : html`<p>
              ${this.backendOwnerName !== Constant.text.loading
                ? this.backendOwnerName
                : html`<div class="shimmer-text"></div>`}
            </p>`}
      </div>
    `;
  }

  private renderBottom() {
    const viewMoreUrl = this.isOriginal()
      ? `${Constant.url.profile}/${this.nid}`
      : this.usedBy;
    return html`
      <div class="section">
        <a href=${viewMoreUrl} target="_blank"
          ><button class="view-more-btn">View More</button></a
        >
        <div class="powered-by">
          ${this.usedBy !== Constant.text.loading
            ? 'Powered by Numbers Protocol'
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
      <div class="modal ${this.modalHidden ? 'modal-hidden' : 'modal-visible'}">
        <div class="modal-container">
          <div class="modal-content">
            <div class="card">
              ${this.renderTop()} ${this.renderMiddle()} ${this.renderBottom()}
            </div>
          </div>
          ${this.bannerLink && this.bannerImageSrc
            ? html`<a href=${this.bannerLink} target="_blank">
                <img
                  src=${this.bannerImageSrc}
                  alt="Full width"
                  class="full-width-img"
                  @load=${this.handleImageLoad}
                  style="display: ${this.imageLoaded ? 'block' : 'none'}"
                />
                ${!this.imageLoaded
                  ? html`<div class="shimmer full-width-img"></div>`
                  : ''}
              </a>`
            : html`<div class="shimmer full-width-img"></div>`}
          <div class="capture-eye-button-modal" @click=${this.hideModal}>
            <img src=${Constant.url.closeIcon} alt="Close" />
          </div>
        </div>
      </div>
    `;
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
