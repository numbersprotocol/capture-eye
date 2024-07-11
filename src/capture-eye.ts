import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Constant } from './constant.js';
import { getCaptureEyeStyles } from './capture-eye-styles.js';
import { ModalManager } from './modal/modal-manager.js';
import { CaptureEyeModal } from './modal/modal.js';

function loadFontFace() {
  /*
   * Inject link stylesheet to DOM directly since it will not work in shadow DOM
   */
  const font = document.createElement('link');
  font.href = Constant.url.fontFaceCssUrl;
  font.rel = 'stylesheet';
  document.head.appendChild(font);
}

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
    return `${Constant.url.profile}/${this.nid}`;
  }

  constructor() {
    super();
    loadFontFace();
  }

  buttonTemplate() {
    return this.nid
      ? html`
          <div class="capture-eye-button" @click=${this.showModal}>
            <img src=${Constant.url.captureEyeIcon} alt="Capture Eye" />
          </div>
        `
      : null;
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
    const buttonRect = buttonElement.getBoundingClientRect();
    modalManager.updateModalWithDelay(this.nid, this.layout, {
      top: buttonRect.top + window.scrollY,
      left: buttonRect.left + window.scrollX,
    });
    this.setButtonActive(false);
    console.debug(CaptureEyeModal.name); // The line ensures CaptureEyeModal is included in compilation.
  }

  private getButtonElement(): HTMLElement {
    return this.shadowRoot?.querySelector('.capture-eye-button') as HTMLElement;
  }

  private handleMouseEnter(event: MouseEvent) {
    this.setButtonActive(true);
    event.stopPropagation();
  }

  private handleMouseLeave(event: MouseEvent) {
    this.setButtonActive(false);
    event.stopPropagation();
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
