import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('capture-eye')
export class CaptureEye extends LitElement {
  static override styles = css`
    :host {
      color: #000;
      font-family: degular, sans-serif;
      font-size: 1rem;
      line-height: 1.5;
      display: inline-block;
      position: relative;
    }

    p {
      color: rgba(204, 204, 204, 0.75);
      margin: 0;
      font-size: 1.125rem;
    }

    a {
      text-decoration: none;
    }

    img {
      max-width: 100%;
      display: inline-block;
    }

    .inspector-component {
      top: 0;
      left: 0;
      z-index: 1;
      color: #000;
      position: absolute;
    }

    .inspector-wrapper {
      margin-top: 1rem;
      margin-left: 1rem;
      position: relative;
    }

    .inspector-ref-eye {
      z-index: 999;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      border-radius: 100vw;
      justify-content: center;
      align-items: center;
      display: flex;
      position: relative;
    }

    .inspector-eye-icon {
      width: 2rem;
      height: 2rem;
    }

    .inspector-panel {
      z-index: 998;
      width: 20rem;
      max-width: 75vw;
      perspective-origin: 0 0;
      transform: scale3d(1none, 1none, 1none);
      transform-origin: 0 0;
      transform-style: preserve-3d;
      background-color: #fff;
      border-radius: 1rem;
      margin-top: 1rem;
      margin-left: 1rem;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      position: absolute;
      top: 0%;
      bottom: auto;
      left: 0%;
      right: auto;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
    }

    .inspector-panel-section {
      border-bottom: 1px solid #e2e2e2;
      padding-top: 0.75rem;
      padding-bottom: 0.8rem;
    }

    .inspector-panel-heading {
      opacity: 0.6;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      font-size: 0.75rem;
    }

    .inspector-panel-link {
      opacity: 1;
      color: #486cd9;
      font-size: 0.9rem;
      text-decoration: none;
      transition: opacity 0.2s;
    }

    .inspector-panel-link:hover {
      opacity: 0.8;
      color: #6ebff2;
    }

    .inspector-panel-text {
      color: #000;
      font-size: 1rem;
    }

    .inspector-panel-link {
      overflow-wrap: break-word;
    }

    .inspector-panel-section:last-child {
      border: none;
    }

    .inspector-btn-view-more {
      display: inline-block;
      background-color: #486cd9;
      color: #fff;
      /* button text color */
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      padding-top: 0.5rem;
      padding-right: 2rem;
      padding-bottom: 0.6rem;
      padding-left: 2rem;
      border-radius: 100vw;
      text-align: center;
      transition: background-color 0.3s ease;
      /* smooth background color transition */
    }

    .inspector-btn-view-more:hover {
      background-color: #6ebff2;
      /* slightly darker color on hover */
      color: #fff;
      /* button text color */
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
  assetCreator = 'Loading data from blockchain...';

  @property({attribute: false})
  assetTimestampCreated = 'Loading data from blockchain...';

  @property({attribute: false})
  digitalSourceType = 'Loading data from blockchain...';

  private captureEyeIcon = 'https://ipfs-pin.numbersprotocol.io/ipfs/bafkreihh5vsu7ru7o6gd54qicdn3mb5eqdpoc4f32shfacnhwelljt6ptu';
  private profileBaseUrl = 'https://nftsearch.site/asset-profile?nid=';
  private assetDataFetched = false;
  private assetDataNotFound = false;

  override render() {
    return html`
      <slot></slot>
      <div class="inspector-component">
        <div class="inspector-wrapper">
          <div class="inspector-ref-eye" @click=${this.toggleShowPanel}>
            <img
              src=${this.captureEyeIcon}
              class="${this.assetDataNotFound ? 'grayed-out' : ''}"
              alt="Capture Eye"
            />
          </div>
          <div class="inspector-panel" ?hidden=${!this.showPanel}>
            <div class="inspector-panel-section">
              <div class="inspector-panel-heading">Registration Time</div>
              <p class="inspector-panel-text">${this.assetTimestampCreated}</p>
            </div>
            <div class="inspector-panel-section">
              <div class="inspector-panel-heading">Creator</div>
              <p class="inspector-panel-text">${this.assetCreator}</p>
            </div>
            <div class="inspector-panel-section">
              <div class="inspector-panel-heading">Source Type</div>
              <p class="inspector-panel-text">${this.digitalSourceType}</p>
            </div>
            <div class="inspector-panel-section">
              <div class="inspector-panel-heading">Asset ID</div>
              <a
                id="dynamicLink"
                class="inspector-panel-link w-inline-block"
                target="_blank"
                href="${this.profileBaseUrl}${this.nid}"
              >
                ${this.nid}
              </a>
            </div>
            <div class="inspector-panel-section">
              <a
                id="dynamicDestination"
                class="inspector-btn-view-more"
                target="_blank"
                href="${this.profileBaseUrl}${this.nid}"
              >
                <div>View More</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  override async connectedCallback() {
    super.connectedCallback();
    if (this.prefetch) {
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
      this.assetCreator = data.assetCreator;
      this.assetTimestampCreated = data.assetTimestampCreated;
      this.digitalSourceType = data.digitalSourceType;
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
}

declare global {
  interface HTMLElementTagNameMap {
    'capture-eye': CaptureEye;
  }
}
