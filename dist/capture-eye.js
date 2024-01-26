var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Constant } from './constant.js';
import { getStyles } from './styles.js';
import { ModalManager } from './modal/modal_manager.js';
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
      <div
        class="capture-eye-button"
        @click=${this.showModal}
        @mouseover=${this.handleMouseOver}
      >
        <img src=${Constant.url.captureEyeIcon} alt="Capture Eye" />
      </div>
    `;
    }
    render() {
        return html `
      <div class="capture-eye-container">
        <slot></slot>
        ${this.buttonTemplate()}
      </div>
    `;
    }
    async connectedCallback() {
        super.connectedCallback();
        ModalManager.getInstance().initializeModal();
        if (this.prefetch) {
            customElements.whenDefined('capture-eye-modal').then(() => {
                ModalManager.getInstance().updateModal(this.nid, false);
            });
        }
    }
    handleMouseOver() {
        const modalManager = ModalManager.getInstance();
        if (modalManager.isHidden) {
            modalManager.updateModal(this.nid, false);
        }
    }
    async showModal() {
        ModalManager.getInstance().updateModal(this.nid);
        console.debug(CaptureEyeModal.name); // The line ensures CaptureEyeModal is included in compilation.
    }
};
CaptureEye.styles = getStyles();
__decorate([
    property({ type: Boolean })
], CaptureEye.prototype, "prefetch", void 0);
__decorate([
    property()
], CaptureEye.prototype, "nid", void 0);
CaptureEye = __decorate([
    customElement('capture-eye')
], CaptureEye);
export { CaptureEye };
//# sourceMappingURL=capture-eye.js.map