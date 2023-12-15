import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('capture-eye')
export class CaptureEye extends LitElement {
  static override styles = css`
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans:400');
    @font-face {
      font-family: 'Capture-Eye-Degular-Medium';
      src: url('https://anima-uploads.s3.amazonaws.com/5e7abf65eb876cc1084e5bac/.44512.otf') format('opentype');
    }

    .capture-eye-button {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      border-radius: 100vw;
      opacity: 0.4;
    }
    .capture-eye-button:hover {
      opacity: 1;
    }

    @media (min-width: 401px) {
      .capture-eye-button:hover::before {
        max-width: 170px;
        /* Adjust to your desired maximum width */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        content: 'Click me!';
        position: absolute;
        left: 220%;
        /* Adjust as needed */
        transform: translateX(-50%);
        padding: 5px 10px;
        background-color: #fff;
        /* Background color of the popup */
        color: #333;
        /* Text color */
        opacity: 0.7;
        border-radius: 5px;
        font-size: 12px;
        z-index: 1;
        /* To make sure it stays on top */
        pointer-events: none;
        /* Ensure it doesn't interfere with other interactions */
        font-family: 'Noto Sans', Helvetica;
      }
    }

    .capture-eye-no-scroll {
      overflow: hidden;
    }

    /* Modal styles */
    .modal {
        // display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 2; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
      }

    .modal-container {
      background-color: #fefefe;
      border-radius: 1rem;
      margin: 48px auto; /* 15% from the top and centered */
      width: 80%; /* Could be more or less, depending on screen size */
      background: #111112;
    }

    .modal-header {
      display: flex;
      height: 90px;
      align-items: center;
      border-bottom: 1px solid #383838;
    }

    .keyboard-arrow-left {
      display: inline-flex;
      align-items: flex-start;
      gap: 8px;
      padding: 4px;
      background-color: #383838;
      border-radius: 32px;
      margin-left: 40px;
    }

    @media (max-width: 600px) {
      .keyboard-arrow-left {
        margin-left: 20px;
      }
    }

    .keyboard-arrow-left .close {
      position: relative;
      width: 24px;
      height: 24px;
    }

    .modal-content {
      display: flex;
    }

    @media (max-width: 1200px) {
      .modal-content {
        display: flex;
        flex-direction: column;
      }
    }

    .modal-content-error {
      display: none; /* Hidden by default */
      height: 60vh;
      width: 100%;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: 'Noto Sans', Helvetica;
      font-weight: 400;
      color: #ffffff;
      font-size: 14px;
      letter-spacing: 0;
      line-height: normal;
      text-align: center;
    }

    .modal-content section {
      flex: 1; /* Each section takes equal width */
      aspect-ratio: 1; /* Maintain aspect ratio of 1 */
      color: white;
    }

    section.preview-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-width: 200px;
      margin: 40px;
    }

    section.preview-container img {
      border-radius: 8px;
      overflow: hidden;
    }

    section.preview-container #ipfs-no-preview-available-text {
      background-color: #212121;
      border-radius: 8px;
      width: 100%;
      aspect-ratio: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Noto Sans', Helvetica;
      font-weight: 400;
      color: #ffffff5a;
      letter-spacing: 0;
      line-height: normal;
    }

    @media (max-width: 600px) {
      section.preview-container {
        margin: 24px;
      }
    }

    section.preview-container .preview-image {
      width: 100%;
      aspect-ratio: 1;
      object-fit: contain;
    }

    section.metadata-container {
      border: 1px solid #383838;
      border-top: none;
    }

    @media (max-width: 1200px) {
      section.metadata-container {
        border: none;
        border-top: 1px solid #383838;
      }
    }

    .heading {
      display: flex;
      /* width: 100%; */
      align-items: center;
      justify-content: space-between;
      padding: 12px 40px;

      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-color: #333333;
    }

    .metadata-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: relative;
      width: fit-content;
      font-family: 'Capture-Eye-Degular-Medium', Helvetica;
      font-weight: 500;
      color: #ffffff;
      font-size: 16px;
      letter-spacing: 0;
      line-height: 24px;
      white-space: nowrap;
    }

    .metadata-container .keyboard-arrow-up {
      position: relative;
      width: 24px;
      height: 24px;
      margin-top: -6937px;
      margin-left: -86152px;
    }

    .metadata-container .table {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      padding: 20px 40px 24px;
    }

    .metadata-container-bottom-spacer {
      height: 48px;
    }
    @media (min-width: 1200px) {
      .metadata-container-bottom-spacer {
        height: 145px;
        width: 100%;
      }
    }

    .metadata-container .link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 13px 32px;
      margin-left: 40px;
      margin-right: 40px;

      background-color: #5ce6a8;
      border-radius: 43px;
      overflow: hidden;
    }

    @media (min-width: 1200px) {
      .link {
        align-self: flex-end;
      }
    }

    .link:hover,
      .link *:hover {
        cursor: pointer;
    }

    .link .purchase-license {
      width: fit-content;
      font-family: 'Capture-Eye-Degular-Medium', Helvetica;
      font-weight: 500;
      color: #000000;
      font-size: 15px;
      text-align: center;
      letter-spacing: 0.3px;
      line-height: normal;
    }

    .link {
      margin: 24px 40px;
    }

    @media (max-width: 600px) {
      .link {
        margin: 24px 24px;
      }
    }

    .metadata-container .row {
      display: flex;
      align-items: flex-start;
      gap: 4px;
      align-self: stretch;
      width: 100%;
      flex: 0 0 auto;
    }

    .metadata-container .key-column {
      flex: 0 0 30%; /* 30% of the parent container's width */
      max-width: 202px;
      position: relative;
      margin-top: -1px;
      opacity: 0.5;
      color: #fff;
      font-family: 'Noto Sans', Helvetica;
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 0;
      line-height: normal;
    }

    @media (max-width: 600px) {
      .metadata-container .key-column {
        flex: 0 0 35%; /* 30% of the parent container's width */
      }
    }

    .metadata-container .value-column {
      max-width: 430px;
      white-space: nowrap; /* Keep the text on the same line */
      overflow: hidden; /* Hide the overflow text */
      text-overflow: ellipsis; /* Show an ellipsis when text overflows */
      display: flex;
      align-items: center;
      gap: 4px;
      position: relative;
      flex: 1;
      flex-grow: 1;
      margin-top: -0.5px;
      color: #fff;
      width: 100%;
      font-family: 'Noto Sans', Helvetica;
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 0;
      line-height: normal;
    }

    .metadata-container .value-column a {
      color: #5ce6a8;
    }

    .metadata-container .value-column .highlight-color {
      color: #5ce6a8;
    }

    .metadata-container .img {
      position: relative;
      width: 20px;
      height: 20px;
    }

    .metadata-container .purchase-license-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 13px 32px;
      /* position: absolute; */
      top: 21px;
      left: 1205px;
      background-color: #5ce6a8;
      border-radius: 43px;
      overflow: hidden;
    }

    @-webkit-keyframes fadein {
      from {
        bottom: 0;
        opacity: 0;
      }
      to {
        bottom: 30px;
        opacity: 1;
      }
    }

    @keyframes fadein {
      from {
        bottom: 0;
        opacity: 0;
      }
      to {
        bottom: 30px;
        opacity: 1;
      }
    }

    @-webkit-keyframes fadeout {
      from {
        bottom: 30px;
        opacity: 1;
      }
      to {
        bottom: 0;
        opacity: 0;
      }
    }

    @keyframes fadeout {
      from {
        bottom: 30px;
        opacity: 1;
      }
      to {
        bottom: 0;
        opacity: 0;
      }
    }

    .icon-container {
      position: relative;
      display: inline-block;
    }

    .tooltip {
      visibility: hidden;
      width: 220px;
      padding: 8px;
      background-color: #000;
      font-family: 'Noto Sans', Helvetica;
      font-weight: 400;
      color: #fff;
      font-size: 12px;
      letter-spacing: 0;
      text-align: center;
      line-height: normal;
      text-align: center;
      border-radius: 5px;
      position: fixed;
      height: fit-content;
      z-index: 9;
      white-space: normal; /* Allows the text to wrap */
      overflow-wrap: break-word; /* Breaks words to prevent overflow */
      overflow: hidden; /* Prevents text from overflowing outside the box */
    }

    .tooltip.show {
      visibility: visible;
      -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
      animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }

    /* Define the shimmer animation */
    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }

    /* Apply the shimmer effect to elements with the .shimmer class */
    .shimmer {
      background: linear-gradient(
        90deg,
        #3d3939 10%,
        #d0d0d0 25%,
        #2d2c2c 40%
      );
      background-size: 200% 200%;
      animation: shimmer 3s infinite;
      color: transparent !important;
    }

    /* Make all child elements transparent */
    .shimmer * {
      color: transparent !important;
    }

    .grayed-out {
      filter: grayscale(100%);
      /* Add any other styling for grayed-out image here */
    }

  `;

  /**
   * Whether to display inspector panel or not.
   */
  @property({type: Boolean})
  showPanel = false;

  /**
   * If yes, start fetching asset data when the Capture Eye is loaded.
   * Otherwise the data will only be fetched when the panel is opened.
   */
  @property({type: Boolean})
  prefetch = false;

  /**
   * Nid of the asset.
   */
  @property()
  nid = '';

  /**
   * Optional Capture token for accessing data from private assets.
   */
  @property()
  capture_token = '';

  @property({attribute: false})
  assetCreator = 'Loading...';

  @property({attribute: false})
  creatorWallet = 'Loading...';

  @property({attribute: false})
  assetTimestampCreated = 'Loading...';

  @property({attribute: false})
  digitalSourceType = 'Loading...';

  @property({attribute: false})
  inStock = -1;

  @property({attribute: false})
  geolocation = undefined;

  @property({attribute: false})
  file_mimetype = undefined;

  @property({attribute: false})
  initialCommitter = undefined;

  @property({attribute: false})
  generatedBy = undefined;

  @property({attribute: false})
  showTooltip = false;

  @property({attribute: false})
  tooltipTop = 0;

  @property({attribute: false})
  tooltipLeft = 0;

  @property({attribute: false})
  assetDataFetched = false;

  @property({attribute: false})
  assetDataNotFound = false;

  @property({attribute: false})
  imageError = false;

  private readonly ipfsGatewayBaseUrl = 'https://ipfs-pin.numbersprotocol.io/ipfs'
  private readonly profileBaseUrl = 'https://nftsearch.site/asset-profile?nid=';
  private readonly captureEyeIcon = `${this.ipfsGatewayBaseUrl}/bafkreicf4sruldnh4g3bmxnqr6zjgfzfgvbqoa5iy2jncewqqlgg75utd4`;
  private readonly closeIcon = 'https://c.animaapp.com/twFYQx58/img/close@2x.png';
  private readonly contentCopyIcon = 'https://c.animaapp.com/twFYQx58/img/content-copy@2x.png';
  private readonly helpIcon = 'https://c.animaapp.com/twFYQx58/img/help-2@2x.png';
  private previewUrl = 'https://c.animaapp.com/twFYQx58/img/placeholder-image.png';

  get assetUrl() {
    return `${this.ipfsGatewayBaseUrl}/${this.nid}`;
  }

  get assetProfileUrl() {
    return `${this.profileBaseUrl}${this.nid}`;
  }

  buttonTemplate() {
    return html`
      <div
        class="capture-eye-button"
        @click=${this.toggleShowPanel}
      >
        <img
          src=${this.captureEyeIcon}
          class="${this.assetDataNotFound ? 'grayed-out' : ''}"
          alt="Capture Eye"
        />
      </div>
    `
  }

  override render() {
    const fetchedValueClass = !this.assetDataFetched && !this.assetDataNotFound ? 'value-column shimmer' : 'value-column';
    const tooltipStyle = `left: ${this.tooltipLeft}px; top: ${this.tooltipTop}px;`;
    return html`
      <slot></slot>
      ${this.buttonTemplate()}
      <div id="capture-eye-modal" class="modal" ?hidden=${!this.showPanel}>
      <div class="modal-container">
        <div class="modal-header">
          <div
            class="keyboard-arrow-left"
            @click=${this.toggleShowPanel}
          >
            <img
              class="close"
              src=${this.closeIcon}
            />
          </div>
        </div>
        <div class="modal-content-error"></div>
        <div class="modal-content">
          <section class="preview-container">
            <a
            target="_blank"
            href=${this.assetProfileUrl}
            >
              <img
                class="preview-image"
                src=${this.previewUrl}
                @error=${this.handleImageError}
                ?hidden=${this.imageError}
              />
            </a>
            <span id="ipfs-no-preview-available-text" ?hidden=${!this.imageError}>
              No Preview Available
            </span>
          </section>
          <section class="metadata-container">
            <div ?hidden=${this.inStock<0} class="link" @click=${this.collect}>
              <div class="purchase-license">${this.inStock>0 ? 'COLLECT' : 'COLLECTED'}</div>
            </div>
            <div class="heading">
              <div>Provenance</div>
            </div>
            <div class="table">
              <div class="row">
                <div class="key-column">Nid</div>
                <div class="value-column">
                  <div class="value-column highlight-color" id="ui-data-nid">
                  ${this.nid}</div>
                  <img
                    class="img"
                    src=${this.contentCopyIcon}
                    @click=${this.copyToClipboard}
                  />
                </div>
              </div>
              <div class="row">
                <div class="key-column">Creator</div>
                <div
                  class=${fetchedValueClass}
                >
                <a>
                  ${this.assetCreator}
                  </a>
                </div>
              </div>
              <div class="row">
                <div class="key-column">Creation Time</div>
                <div
                  class=${fetchedValueClass}
                >
                  ${this.assetTimestampCreated}
                </div>
              </div>
              <div class="row">
                <div class="key-column">Geolocation</div>
                <div class="value-column">
                  ${this.geolocation}
                </div>
              </div>
              <div class="row">
                <div class="key-column">File Mimetype</div>
                <div class="value-column">
                  <div>${this.file_mimetype}</div>
                  <img
                    class="img"
                    src=${this.helpIcon}
                  />
                </div>
              </div>
              <div class="row">
                <div class="key-column">Source Type</div>
                <div class="value-column">
                  <div>
                    ${this.digitalSourceType}
                  </div>
                  <div class="icon-container">
                    <img
                      class="img"
                      src=${this.helpIcon}
                      @mouseover=${this.setTooltipOn}
                      @mouseleave=${this.setTooltipOff}
                    />
                    <div class=${this.showTooltip ? "tooltip show" : "tooltip"} style=${tooltipStyle}>digitalSourceType is a controlled vocabulary that indicates from which source a digital media was created.</div>
                  </div>
                </div>
              </div>
              ${this.initialCommitter
                ? html`
                <div class="row">
                  <div class="key-column">Initial Committer</div>
                  <div class="value-column">
                    ${this.initialCommitter}
                  </div>
                </div>`
                : ''
              }
              ${this.generatedBy
                ? html`
                  <div class="row">
                  <div class="key-column">Generated By</div>
                  <a class="value-column">${this.generatedBy}</a>
                </div>`
                : ''
              }
            </div>
            <div class="metadata-container-bottom-spacer"></div>
          </section>
        </div>
      </div>
    </div>
    `;
  }

  override async connectedCallback() {
    super.connectedCallback();
    if (this.prefetch) {
      console.log('prefetch', this.prefetch)
      await this.fetchAssetData();
    }
  }

  private async toggleShowPanel() {
    this.showPanel = !this.showPanel;
    await this.fetchAssetData();
  }

  private async fetchAssetData() {
    if (this.assetDataFetched) {
      return;
    }
    this.previewUrl = this.assetUrl;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (this.capture_token) {
      headers['Authorization'] = `token ${this.capture_token}`;
    }
    const response = await fetch(
      `https://eognt1jfpe04mq8.m.pipedream.net?nid=${this.nid}`,
      {
        method: 'GET',
        headers,
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log('API data', data);
      this.assetCreator = data.assetCreator;
      this.creatorWallet = data.creatorWallet;
      this.assetTimestampCreated = data.assetTimestampCreated;
      this.digitalSourceType = data.digitalSourceType;
      this.inStock = data.inStock;
      this.file_mimetype = data.mimtype;
      this.geolocation = data.geolocation;
      this.generatedBy = data.generatedBy;
      this.assetDataFetched = true;
      this.assetDataNotFound = false;
    } else {
      console.log(
        `Error ${response.status}: ${await response
          .json()
          .then((r) => r.message)}`
      );
      this.showPanel = false;
      this.assetDataNotFound = true;
    }
  }

  private async setTooltipOn(event: { target: HTMLElement; }) {
    const element = event.target as HTMLElement;
    const targetRect = element.getBoundingClientRect();
    this.tooltipLeft = targetRect.left;
    this.tooltipTop = targetRect.bottom;
    this.showTooltip = true;
  }

  private async setTooltipOff() {
    this.showTooltip = false;
  }

  private async copyToClipboard() {
    window.navigator.clipboard.writeText(this.nid);
  }

  private async collect() {
    const url = `https://captureappiframe.numbersprotocol.io/checkout?from=nse&nid=${this.nid}`;
    window.open(url, '_blank')!.focus();
  }

  private handleImageError() {
    this.imageError = true;
    console.log('imageError', this.imageError);
    // Additional logic when the image fails to load
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'capture-eye': CaptureEye;
  }
}
