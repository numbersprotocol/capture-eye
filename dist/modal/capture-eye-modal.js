var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Constant } from '../constant.js';
import { getStyles } from '../styles.js';
let CaptureEyeModal = class CaptureEyeModal extends LitElement {
    constructor() {
        super();
        this.nid = '';
        this.modalHidden = true;
    }
    render() {
        return html `
      <div class="modal" ?hidden=${this.modalHidden}>
        <div class="modal-container">
          <div class="modal-header">
            <div class="keyboard-arrow-left" @click=${this.hideModal}>
              <img class="close" src=${Constant.url.closeIcon} />
            </div>
          </div>
          <div class="modal-content"></div>
        </div>
      </div>
    `;
    }
    hideModal() {
        this.modalHidden = true;
    }
};
CaptureEyeModal.styles = getStyles();
__decorate([
    property()
], CaptureEyeModal.prototype, "nid", void 0);
__decorate([
    property({ type: Boolean })
], CaptureEyeModal.prototype, "modalHidden", void 0);
CaptureEyeModal = __decorate([
    customElement('capture-eye-modal')
], CaptureEyeModal);
export { CaptureEyeModal };
//# sourceMappingURL=capture-eye-modal.js.map