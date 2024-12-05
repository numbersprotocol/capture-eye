import { LitElement, HTMLTemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Constant } from './constant.js';
import { getCaptureEyeStyles } from './capture-eye-styles.js';
import { ModalManager } from './modal/modal-manager.js';
import { CaptureEyeModal, EngagementZone } from './modal/modal.js';
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
   * Set position. Default is top left. Options: top left, top right, bottom left, bottom right
   */
  @property({ type: String })
  position = '';

  /**
   * Set color: default is #377dde, and for mobile, the default is #333333.
   */
  @property({ type: String })
  color = '';

  /**
   * Customizable copyright zone title.
   */
  @property({ type: String, attribute: 'cz-title' })
  copyrightZoneTitle = '';

  /**
   * Urls of the engagement images. Use comma to separate multiple images.
   */
  @property({ type: String, attribute: 'eng-img' })
  engagementImage = '';

  /**
   * Urls of the engagement links. Use comma to separate multiple links.
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

  override disconnectedCallback() {
    super.disconnectedCallback();
    ModalManager.getInstance().removeModal();
  }

  get isOpened() {
    return !ModalManager.getInstance().modalHidden;
  }

  open() {
    this.setButtonActive(true);
    this.openEye();
  }

  close() {
    ModalManager.getInstance().removeModal();
  }

  private buttonTemplate() {
    if (!this.nid) {
      return html``;
    }

    const mobile = isMobile();
    const color = this.color
      ? this.color
      : mobile
      ? Constant.color.mobileEye
      : Constant.color.defaultEye;
    const size = mobile ? 24 : 32;
    const positions = this.position.split(' ');
    return html`
      <div
        class="capture-eye-button ${this.visibility ===
          Constant.visibility.always || mobile
          ? 'full-visibility'
          : ''}
          ${positions.includes('bottom') ? 'position-bottom' : 'position-top'}
          ${positions.includes('right') ? 'position-right' : 'position-left'}
          "
        @click=${this.openEye}
      >
        ${this.generateCaptureEyeSvg(color, size)}
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
      color: this.color,
      copyrightZoneTitle: this.copyrightZoneTitle,
      engagementZones: this.engagementZones,
      actionButtonText: this.actionButtonText,
      actionButtonLink: this.actionButtonLink,
      position: {
        top: buttonRect.top + window.scrollY,
        left: buttonRect.left + window.scrollX,
        name: this.position,
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

  private generateCaptureEyeSvg(
    color: string,
    size: number
  ): HTMLTemplateResult {
    return html`
      <svg
        style="--eye-color: ${color};"
        width="${size}"
        height="${size}"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_640_264)">
          <path
            d="M11.9821 23.8844C18.5457 23.8844 23.8665 18.5635 23.8665
              11.9999C23.8665 5.43633 18.5457 0.115479 11.9821 0.115479C5.4185
              0.115479 0.0976562 5.43633 0.0976562 11.9999C0.0976562 18.5635
              5.4185 23.8844 11.9821 23.8844Z"
            style="fill: var(--eye-color, #377dde);"
          />
          <path
            d="M18.4909 17.6401C18.4909 17.8801 18.3931 18.0956 18.2375
              18.2534C18.0798 18.4112 17.8642 18.5068 17.6242
              18.5068H15.542V20.3401H16.8131C17.2042 20.3401 17.5775 20.1845
              17.8531 19.909L19.8931 17.869C20.1687 17.5934 20.3242 17.2179
              20.3242 16.829V15.5579H18.4909V17.6401Z"
            fill="white"
          />
          <path
            d="M5.72876 18.2556C5.57098 18.0978 5.47542 17.8823 5.47542
              17.6423V15.5601H3.64209V16.8312C3.64209 17.2223 3.79765 17.5956
              4.0732 17.8712L6.1132 19.9112C6.38876 20.1867 6.76431 20.3423
              7.1532 20.3423H8.42431V18.5089H6.34209C6.10209 18.5089 5.88653
              18.4134 5.72876 18.2556Z"
            fill="white"
          />
          <path
            d="M5.47347 6.35991C5.47347 6.11991 5.57125 5.90436 5.7268
              5.74658C5.88458 5.5888 6.10014 5.49325 6.34014
              5.49325H8.42236V3.65991H7.15125C6.76014 3.65991 6.3868 3.81547
              6.11125 4.09102L4.07125 6.13102C3.79569 6.40658 3.64014 6.78213
              3.64014 7.17102V8.44436H5.47347V6.35991Z"
            fill="white"
          />
          <path
            d="M19.8911 6.13102L17.8512 4.09102C17.5756 3.81547 17.2 3.65991
              16.8112 3.65991H15.54V5.49325H17.6223C17.8623 5.49325 18.0778
              5.59102 18.2356 5.74658C18.3934 5.90436 18.4889 6.11991 18.4889
              6.35991V8.44213H20.3223V7.17102C20.3223 6.78213 20.1689 6.4088
              19.8911 6.13102Z"
            fill="white"
          />
          <path
            d="M19.1002 12.3777L19.3069 11.9999L19.1002 11.6221C18.4113 10.3621
              17.4024 9.30879 16.178 8.56657C14.9558 7.82657 13.518 7.3999
              11.9847 7.3999H11.9802C10.4469 7.3999 9.00909 7.82657 7.78465
              8.56879C6.56021 9.31101 5.5491 10.3666 4.86243 11.6243L4.65576
              12.0021L4.86243 12.3799C5.55132 13.6399 6.56021 14.6932 7.78465
              15.4355C9.00687 16.1777 10.4469 16.6043 11.978
              16.6043H11.9824C13.5158 16.6043 14.9535 16.1777 16.178
              15.4355C17.4024 14.691 18.4135 13.6377 19.1002 12.3777ZM11.9824
              15.031C11.0513 15.031 10.1713 14.8377 9.37132 14.4888C9.10465
              14.3732 8.84687 14.2399 8.60021 14.0888C7.77576 13.5888 7.07132
              12.911 6.53798 12.1088L6.46687 11.9999L6.54021 11.891C7.07354
              11.0888 7.77798 10.411 8.60243 9.91101C9.5891 9.31324 10.7424
              8.96879 11.9847 8.96879C13.2247 8.96879 14.378 9.31324 15.3669
              9.91101C16.1913 10.411 16.8958 11.0888 17.4291 11.891L17.5024
              11.9999L17.4291 12.1088C16.8958 12.911 16.1913 13.5888 15.3669
              14.0888C14.3758 14.6866 13.2224 15.031 11.9824 15.031Z"
            fill="white"
          />
          <path
            d="M11.9822 13.8934C13.0279 13.8934 13.8755 13.0457 13.8755
              12C13.8755 10.9544 13.0279 10.1067 11.9822 10.1067C10.9365 10.1067
              10.0889 10.9544 10.0889 12C10.0889 13.0457 10.9365 13.8934 11.9822
              13.8934Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_640_264">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `;
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

  private get engagementZones() {
    const engagementImages = this.engagementImage
      .split(',')
      .map((url) => url.trim())
      .filter((url) => url !== '');
    const engagementLinks = this.engagementLink
      .split(',')
      .map((url) => url.trim())
      .filter((url) => url !== '');
    /* Use image as base. For unexpected use cases links > images, ignore the exceeding links.
     * For unexpected use cases images > links, use default link.
     */
    return engagementImages.map((image, index) => {
      return {
        image,
        link: engagementLinks[index] || Constant.url.defaultEngagementLink,
      } as EngagementZone;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'capture-eye': CaptureEye;
  }
}
