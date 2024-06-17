var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { getModalStyles } from './modal-styles.js';
import { Constant } from '../constant.js';
function formatTxHash(txHash) {
    if (txHash.length < 8) {
        return '';
    }
    const firstPart = txHash.slice(0, 4);
    const lastPart = txHash.slice(-4);
    return `${firstPart}...${lastPart}`;
}
let CaptureEyeModal = class CaptureEyeModal extends LitElement {
    constructor() {
        super();
        this.nid = '';
        this.layout = Constant.layout.original;
        this.modalHidden = true;
        this.creatorName = Constant.text.loading;
        this.date = Constant.text.loading;
        this.abstract = Constant.text.loading;
        this.blockchain = Constant.text.loading;
        this.transaction = Constant.text.loading;
        this.thumbnailUrl = '';
        this.explorerUrl = '';
        this.assetSourceType = Constant.text.loading;
        this.captureTime = Constant.text.loading;
        this.backendOwnerName = Constant.text.loading;
        this.usedBy = Constant.text.loading;
        this.bannerImageSrc = '';
        this.bannerLink = '';
        this.imageLoaded = false;
    }
    resetModalProps() {
        this.creatorName = Constant.text.loading;
        this.date = Constant.text.loading;
        this.abstract = Constant.text.loading;
        this.blockchain = Constant.text.loading;
        this.transaction = Constant.text.loading;
        this.thumbnailUrl = '';
        this.explorerUrl = '';
        this.bannerImageSrc = '';
        this.bannerLink = '';
        this.imageLoaded = false;
    }
    firstUpdated() {
        this.updateModalVisibility();
    }
    updated(changedProperties) {
        if (changedProperties.has('modalHidden')) {
            this.updateModalVisibility();
        }
    }
    updateModalVisibility() {
        const modalElement = this.shadowRoot?.querySelector('.modal');
        if (modalElement) {
            if (this.modalHidden) {
                modalElement.classList.add('modal-hidden');
                modalElement.classList.remove('modal-visible');
            }
            else {
                modalElement.classList.remove('modal-hidden');
                modalElement.classList.add('modal-visible');
            }
        }
    }
    isOriginal() {
        return this.layout == Constant.layout.original;
    }
    renderTop() {
        const imgSrc = this.thumbnailUrl
            ? this.thumbnailUrl
            : 'https://via.placeholder.com/100';
        const name = this.isOriginal() ? this.creatorName : this.assetSourceType;
        const date = this.isOriginal() ? this.date : this.captureTime;
        return html `
      <div class="section-title">Produced by</div>
      <div class="profile-container">
        ${this.thumbnailUrl
            ? html `<img src=${imgSrc} alt="Profile" class="profile-img" />`
            : html `<div class="shimmer-profile-img"></div>`}
        <div class="profile-text">
          <div class="top-name">
            ${name !== Constant.text.loading
            ? name
            : html `<div class="shimmer-text"></div>`}
          </div>
          <div class="top-date">
            ${date !== Constant.text.loading
            ? date
            : html `<div class="shimmer-text"></div>`}
          </div>
        </div>
      </div>
      <div class="abstract">
        ${this.abstract !== Constant.text.loading
            ? this.abstract
            : html `<div class="shimmer-text"></div>`}
      </div>
      <hr class="thin-hr" />
    `;
    }
    renderMiddle() {
        const formattedTransaction = formatTxHash(this.transaction);
        return html `
      <div class="section-title">
        ${this.isOriginal() ? 'Origins' : 'Curated By'}
      </div>
      ${this.isOriginal()
            ? html `<p>
              ${this.blockchain !== Constant.text.loading
                ? `Blockchain: ${this.blockchain}`
                : html `<div class="shimmer-text"></div>`}
            </p>
            <span>Transaction:</span>
            ${formattedTransaction
                ? html `<a href=${this.explorerUrl} target="_blank"
                  >${formatTxHash(this.transaction)}</a
                >`
                : html `<span
                  >${this.transaction !== Constant.text.loading
                    ? 'N/A'
                    : html `<div class="shimmer-text"></div>`}</span
                >`}`
            : html `<p>
            ${this.backendOwnerName !== Constant.text.loading
                ? this.backendOwnerName
                : html `<div class="shimmer-text"></div>`}
          </p>`}
      <hr class="thin-hr" />
    `;
    }
    renderBottom() {
        const viewMoreUrl = this.isOriginal()
            ? `${Constant.url.profile}/${this.nid}`
            : this.usedBy;
        return html `
      <a href=${viewMoreUrl} target="_blank"
        ><button class="view-more-btn">View More</button></a
      >
      <div class="powered-by">
        ${this.usedBy !== Constant.text.loading
            ? 'Powered by Numbers Protocol'
            : html `<div class="shimmer-text"></div>`}
      </div>
    `;
    }
    handleImageLoad() {
        this.imageLoaded = true;
    }
    render() {
        return html `
      <div class="modal ${this.modalHidden ? 'modal-hidden' : 'modal-visible'}">
        <div class="modal-container">
          <div class="modal-content">
            <div class="card">
              ${this.renderTop()} ${this.renderMiddle()} ${this.renderBottom()}
            </div>
          </div>
          ${this.bannerLink && this.bannerImageSrc
            ? html `<a href=${this.bannerLink} target="_blank">
                <img
                  src=${this.bannerImageSrc}
                  alt="Full width"
                  class="full-width-img"
                  @load=${this.handleImageLoad}
                  style="display: ${this.imageLoaded ? 'block' : 'none'}"
                />
                ${!this.imageLoaded
                ? html `<div class="shimmer full-width-img"></div>`
                : ''}
              </a>`
            : html `<div class="shimmer full-width-img"></div>`}
        </div>
      </div>
    `;
    }
};
CaptureEyeModal.styles = getModalStyles();
__decorate([
    property({ type: String })
], CaptureEyeModal.prototype, "nid", void 0);
__decorate([
    property({ type: String })
], CaptureEyeModal.prototype, "layout", void 0);
__decorate([
    property({ type: Boolean })
], CaptureEyeModal.prototype, "modalHidden", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "creatorName", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "date", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "abstract", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "blockchain", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "transaction", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "thumbnailUrl", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "explorerUrl", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "assetSourceType", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "captureTime", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "backendOwnerName", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "usedBy", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "bannerImageSrc", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "bannerLink", void 0);
__decorate([
    state()
], CaptureEyeModal.prototype, "imageLoaded", void 0);
__decorate([
    query('.modal')
], CaptureEyeModal.prototype, "modalElement", void 0);
CaptureEyeModal = __decorate([
    customElement('capture-eye-modal')
], CaptureEyeModal);
export { CaptureEyeModal };
//# sourceMappingURL=capture-eye-modal.js.map