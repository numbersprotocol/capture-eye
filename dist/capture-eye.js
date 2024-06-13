var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Constant } from './constant.js';
import { getCaptureEyeStyles } from './capture-eye-styles.js';
import { ModalManager } from './modal/modal-manager.js';
import { CaptureEyeModal } from './modal/capture-eye-modal.js';
let CaptureEye = class CaptureEye extends LitElement {
    get assetUrl() {
        return `${Constant.url.ipfsGateway}/${this.nid}`;
    }
    get assetProfileUrl() {
        return `${Constant.url.profile}${this.nid}`;
    }
    constructor() {
        super();
        /**
         * If yes, start fetching asset data when the Capture Eye is loaded.
         * Otherwise the data will only be fetched when the panel is opened.
         */
        this.prefetch = false;
        /**
         * Nid of the asset.
         */
        this.nid = '';
        /**
         * layout name of the asset. Options: original, curated
         */
        this.layout = Constant.layout.original;
        /*
         * Inject link stylesheet to DOM directly since it will not work in shadow DOM
         */
        const font = document.createElement('link');
        font.href = 'https://static-cdn.numbersprotocol.io/fonts/degular.css';
        font.rel = 'stylesheet';
        document.head.appendChild(font);
    }
    buttonTemplate() {
        return html `
      <div class="capture-eye-button" @click=${this.showModal}>
        <img src=${Constant.url.captureEyeIcon} alt="Capture Eye" />
      </div>
    `;
    }
    render() {
        return html `
      <div class="capture-eye-container">
        <slot
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
        ></slot>
        ${this.buttonTemplate()}
      </div>
    `;
    }
    async connectedCallback() {
        super.connectedCallback();
        ModalManager.getInstance().initializeModal();
        if (this.prefetch) {
            customElements.whenDefined('capture-eye-modal').then(() => {
                ModalManager.getInstance().updateModal(this.nid, this.layout, this.getButtonElement(), false);
            });
        }
    }
    async showModal() {
        const modalManager = ModalManager.getInstance();
        const buttonElement = this.getButtonElement();
        modalManager.updateModal(this.nid, this.layout, buttonElement);
        this.setButtonActive(true);
        console.debug(CaptureEyeModal.name); // The line ensures CaptureEyeModal is included in compilation.
    }
    getButtonElement() {
        return this.shadowRoot?.querySelector('.capture-eye-button');
    }
    handleMouseEnter() {
        this.setButtonActive(true);
    }
    handleMouseLeave() {
        const modalManager = ModalManager.getInstance();
        if (!modalManager.isHidden && modalManager.nid === this.nid) {
            return; // Do not hide the button if the modal is shown
        }
        this.setButtonActive(false);
    }
    setButtonActive(active) {
        const button = this.getButtonElement();
        if (button) {
            if (active) {
                button.classList.add('active');
            }
            else {
                button.classList.remove('active');
            }
        }
    }
};
CaptureEye.styles = getCaptureEyeStyles();
__decorate([
    property({ type: Boolean })
], CaptureEye.prototype, "prefetch", void 0);
__decorate([
    property({ type: String })
], CaptureEye.prototype, "nid", void 0);
__decorate([
    property({ type: String })
], CaptureEye.prototype, "layout", void 0);
CaptureEye = __decorate([
    customElement('capture-eye')
], CaptureEye);
export { CaptureEye };
//# sourceMappingURL=capture-eye.js.map