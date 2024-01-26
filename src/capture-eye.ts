import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Constant } from './constant.js';
import { getStyles } from './styles.js';
import { ModalManager } from './modal/modal_manager.js';
import { CaptureEyeModal } from './modal/capture-eye-modal.js';

@customElement('capture-eye')
export class CaptureEye extends LitElement {
  static override styles = getStyles();

  /**
   * If yes, start fetching asset data when the Capture Eye is loaded.
   * Otherwise the data will only be fetched when the panel is opened.
   */
  @property({ type: Boolean })
  prefetch = false;

  /**
   * Nid of the asset.
   */
  @property()
  nid = '';

  get assetUrl() {
    return `${Constant.url.ipfsGateway}/${this.nid}`;
  }

  get assetProfileUrl() {
    return `${Constant.url.profile}${this.nid}`;
  }

  constructor() {
    super();
    /*
     * Inject link stylesheet to DOM directly since it will not work in shadow DOM
     */
    const font = document.createElement('link');
    font.href = 'https://static-cdn.numbersprotocol.io/fonts/degular.css';
    font.rel = 'stylesheet';
    document.head.appendChild(font);
  }

  buttonTemplate() {
    return html`
      <div
        class="capture-eye-button"
        @click=${this.showModal}
        @mouseover=${this.handleMouseOver}
      >
        <img src=${Constant.url.captureEyeIcon} alt="Capture Eye" />
      </div>
    `;
  }

  override render() {
    return html`
      <div class="capture-eye-container">
        <slot></slot>
        ${this.buttonTemplate()}
      </div>
    `;
  }

  override async connectedCallback() {
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

  private async showModal() {
    ModalManager.getInstance().updateModal(this.nid);
    console.debug(CaptureEyeModal.name); // The line ensures CaptureEyeModal is included in compilation.
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'capture-eye': CaptureEye;
  }
}
