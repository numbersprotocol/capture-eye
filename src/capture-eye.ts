import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Constant } from './constant';
import { getStyles } from './styles';
import { ModalManager } from './modal/modal_manager';
import { CaptureEyeModal } from './modal/capture-eye-modal';

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
      <div class="capture-eye-button" @click=${this.showModal}>
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
    ModalManager.getInstance().initializeModal();
    super.connectedCallback();
    if (this.prefetch) {
      //
    }
  }

  private async showModal() {
    ModalManager.getInstance().showModal(this.nid);
    console.debug(CaptureEyeModal.name); // The line ensures CaptureEyeModal is included in compilation.
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'capture-eye': CaptureEye;
  }
}
