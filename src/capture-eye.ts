import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Constant } from './constant.js';
import { getCaptureEyeStyles } from './capture-eye-styles.js';
import { ModalManager } from './modal/modal-manager.js';
import { CaptureEyeModal } from './modal/modal.js';
import { MediaViewer } from './media-viewer/media-viewer.js';
import interactionTracker, {
  TrackerEvent,
} from './modal/interaction-tracker.js';
import { isMobile } from './utils.js';

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

  /**
   * Set visibility behavior. Default is mouse hover to show. Options: hover, always
   */
  @property({ type: String })
  visibility = Constant.visibility.hover;

  /**
   * Customizable copyright zone title.
   */
  @property({ type: String, attribute: 'cz-title' })
  copyrightZoneTitle = '';

  /**
   * Url of the engagement image.
   */
  @property({ type: String, attribute: 'eng-img' })
  engagementImage = '';

  /**
   * Url of the engagement link.
   */
  @property({ type: String, attribute: 'eng-link' })
  engagementLink = '';

  /**
   * Text of the action button.
   */
  @property({ type: String, attribute: 'action-button-text' })
  actionButtonText = '';

  /**
   * Url of the action button link.
   */
  @property({ type: String, attribute: 'action-button-link' })
  actionButtonLink = '';

  get assetUrl() {
    return `${Constant.url.ipfsGateway}/${this.nid}`;
  }

  get assetProfileUrl() {
    return `${Constant.url.profile}/${this.nid}`;
  }

  constructor() {
    super();
    this.loadFontFace();
    console.debug(MediaViewer.name); // The line ensures MediaViewer is included in compilation.
    console.debug(CaptureEyeModal.name); // The line ensures CaptureEyeModal is included in compilation.
  }

  get isOpened() {
    return !ModalManager.getInstance().modalHidden;
  }

  open() {
    this.setButtonActive(true);
    this.openEye();
  }

  close() {
    ModalManager.getInstance().hideModal();
  }

  private buttonTemplate() {
    return this.nid
      ? html`
          <div
            class="capture-eye-button ${this.visibility ===
              Constant.visibility.always || isMobile()
              ? 'full-visibility'
              : ''}"
            @click=${this.openEye}
          >
            <img
              src=${isMobile()
                ? Constant.url.captureEyeMobileIcon
                : Constant.url.captureEyeIcon}
              alt="Capture Eye"
            />
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

  openEye(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const modalManager = ModalManager.getInstance();
    const buttonElement = this.getButtonElement();
    const buttonRect = buttonElement.getBoundingClientRect();
    const modalOptions = {
      nid: this.nid,
      layout: this.layout,
      copyrightZoneTitle: this.copyrightZoneTitle,
      engagementImage: this.engagementImage,
      engagementLink: this.engagementLink,
      actionButtonText: this.actionButtonText,
      actionButtonLink: this.actionButtonLink,
      position: {
        top: buttonRect.top + window.scrollY,
        left: buttonRect.left + window.scrollX,
      },
    };
    modalManager.updateModal(modalOptions);
    this.setButtonActive(false);

    if (this.nid) {
      interactionTracker.trackInteraction(
        TrackerEvent.CAPTURE_EYE,
        this.nid,
        `layout=${this.layout},visibility=${this.visibility}`
      );
    }
  }

  private getButtonElement(): HTMLElement {
    return this.shadowRoot?.querySelector('.capture-eye-button') as HTMLElement;
  }

  private handleMouseEnter() {
    this.setButtonActive(true);
  }

  private handleMouseLeave() {
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

  private loadFontFace() {
    /*
     * Inject link stylesheet to DOM directly since it will not work in shadow DOM
     */
    const font = document.createElement('link');
    font.href = Constant.url.fontFaceCssUrl;
    font.rel = 'stylesheet';
    document.head.appendChild(font);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'capture-eye': CaptureEye;
  }
}
