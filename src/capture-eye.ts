import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Constant } from './constant.js';
import { getCaptureEyeStyles } from './capture-eye-styles.js';
import { ModalManager } from './modal/modal-manager.js';
import { CaptureEyeModal } from './modal/capture-eye-modal.js';

@customElement('capture-eye')
export class CaptureEye extends LitElement {
  static override styles = getCaptureEyeStyles();

  /**
   * Nid of the asset.
   */
  @property({ type: String })
  nid = '';

  /**
   * layout name of the asset. Options: original, curated
   */
  @property({ type: String })
  layout = Constant.layout.original;

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
        <slot
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
        ></slot>
        ${this.buttonTemplate()}
      </div>
    `;
  }

  override async connectedCallback() {
    super.connectedCallback();
    ModalManager.getInstance().initializeModal();
  }

  private async showModal() {
    const modalManager = ModalManager.getInstance();
    const buttonElement = this.getButtonElement();
    modalManager.updateModal(this.nid, this.layout, buttonElement);
    this.setButtonActive(true);
    console.debug(CaptureEyeModal.name); // The line ensures CaptureEyeModal is included in compilation.
  }

  private getButtonElement(): HTMLElement {
    return this.shadowRoot?.querySelector('.capture-eye-button') as HTMLElement;
  }

  private handleMouseEnter() {
    this.setButtonActive(true);
  }

  private handleMouseLeave() {
    const modalManager = ModalManager.getInstance();
    if (!modalManager.isHidden && modalManager.nid === this.nid) {
      return; // Do not hide the button if the modal is shown
    }
    this.setButtonActive(false);
  }

  private setButtonActive(active: boolean) {
    const button = this.getButtonElement();
    if (button) {
      if (active) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'capture-eye': CaptureEye;
  }
}
