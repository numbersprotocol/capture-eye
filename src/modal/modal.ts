import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { getModalStyles } from './modal-styles.js';
import { Constant } from '../constant.js';

function formatTxHash(txHash: string): string {
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
  @state() engagementImage = '';
  @state() engagementLink = '';
  @state() actionButtonText = '';
  @state() actionButtonLink = '';
  @state() imageLoaded = false;
  @state() hasNftProduct = false;

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
    this.assetSourceType = Constant.text.loading;
    this.captureTime = Constant.text.loading;
    this.backendOwnerName = Constant.text.loading;
    this.usedBy = Constant.text.loading;
    this.engagementImage = Constant.url.defaultEngagementImage;
    this.engagementLink = Constant.url.defaultEngagementLink;
    this.actionButtonText = '';
    this.actionButtonLink = '';
    this.hasNftProduct = false;
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
    const imgSrc = this.thumbnailUrl
      ? this.thumbnailUrl
      : 'https://via.placeholder.com/100';
    const name = this.isOriginal() ? this.creatorName : this.assetSourceType;
    const date = this.isOriginal() ? this.date : this.captureTime;
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
          ? html`<div class="middle-row">
                ${this.blockchain !== Constant.text.loading
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
                          href=${this.explorerUrl}
                          target="_blank"
                          >${formatTxHash(this.transaction)}</a
                        ></span
                      >`
                  : html`<span
                      >${this.transaction !== Constant.text.loading
                        ? html`<img
                              src=${Constant.url.txIcon}
                              loading="lazy"
                              width="20"
                              height="Auto"
                              alt=""
                            />
                            <span class="middle-text">Transaction: N/A</span>`
                        : html`<div class="shimmer-text"></div>`}</span
                    >`}
              </div>`
          : html`<div class="middle-row">
              ${this.backendOwnerName !== Constant.text.loading
                ? html`<img
                      src=${Constant.url.curatorIcon}
                      loading="lazy"
                      width="20"
                      height="Auto"
                      alt=""
                    /><span class="middle-text">${this.backendOwnerName}</span>`
                : html`<div class="shimmer-text"></div>`}
            </div>`}
      </div>
    `;
  }

  private renderBottom() {
    console.log('this.actionButtonLink', this.actionButtonLink);
    const actionButtonLink = this.actionButtonLink
      ? this.actionButtonLink
      : this.hasNftProduct
      ? `${Constant.url.collect}?nid=${this.nid}&from=capture-eye`
      : this.isOriginal()
      ? `${Constant.url.profile}/${this.nid}`
      : this.usedBy;
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
          ${this.usedBy !== Constant.text.loading
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
      <div class="modal ${this.modalHidden ? 'modal-hidden' : 'modal-visible'}">
        <div class="modal-container">
          <div class="modal-content">
            <div class="card">
              ${this.renderTop()} ${this.renderMiddle()} ${this.renderBottom()}
            </div>
          </div>
          ${this.engagementImage && this.engagementLink
            ? html`<a href=${this.engagementLink} target="_blank">
                <img
                  src=${this.engagementImage}
                  alt="Full width"
                  class="full-width-img"
                  @load=${this.handleImageLoad}
                  style="display: ${this.imageLoaded ? 'block' : 'none'}"
                />
                ${!this.imageLoaded
                  ? html`<div class="shimmer full-width-img"></div>`
                  : ''}
              </a>`
            : html`<div class="full-width-img"></div>`}
          <div class="close-button" @click=${this.hideModal}>
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
