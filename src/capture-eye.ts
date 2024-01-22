import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Constant } from './constant';
import { Asset } from './interfaces/asset';
import { TooltipStates } from './interfaces/tooltip_states';
import { getStyles } from './styles';

@customElement('capture-eye')
export class CaptureEye extends LitElement {
  static override styles = getStyles();

  /**
   * Whether to display inspector panel or not.
   */
  @property({ type: Boolean })
  showPanel = false;

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

  /**
   * Optional Capture token for accessing data from private assets.
   */
  @property()
  capture_token = '';

  @property({ attribute: false })
  metadata = [
    { label: 'Creator', link: '' },
    { label: 'Creation Time' },
    { label: 'Geolocation' },
    {
      label: 'File Mimetype',
      helpText: "The asset's type expressed using a MIME format",
    },
    {
      label: 'Source Type',
      helpText:
        'digitalSourceType is a controlled vocabulary that indicates from which source a digital media was created.',
    },
    { label: 'Initial Committer', link: '' },
    { label: 'Initial Minter', link: '' },
    { label: 'License' },
    { label: 'Mining Preference' },
    { label: 'Integrity Proof', link: '' },
  ].map((item) => ({
    value: Constant.text.not_available,
    ...item,
  }));

  private asset: Asset = {
    nid: '',
    assetCreator: '',
    creatorWallet: '',
    assetTimestampCreated: '',
    digitalSourceType: '',
    geolocation: '',
    mimetype: '',
    initialCommitter: '',
    generatedBy: '',
    initialMinter: '',
    license: '',
    miningPreference: '',
    integrityProof: '',
    inStock: -1,
  };

  @property({ attribute: false })
  tooltipStates: TooltipStates = {
    'File Mimetype': {
      show: false,
      top: 0,
      left: 0,
    },
    'Source Type': {
      show: false,
      top: 0,
      left: 0,
    },
  };

  @property({ attribute: false })
  assetDataFetched = false;

  @property({ attribute: false })
  assetDataNotFound = false;

  @property({ attribute: false })
  imageError = false;

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
      <div class="capture-eye-button" @click=${this.toggleShowPanel}>
        <img
          src=${Constant.url.captureEyeIcon}
          class="${this.assetDataNotFound ? 'grayed-out' : ''}"
          alt="Capture Eye"
        />
      </div>
    `;
  }

  tooltipTemplate(label: string, helpText: string) {
    const tooltipState = this.tooltipStates[label];
    const tooltipStyle = `left: ${tooltipState.left}px; top: ${tooltipState.top}px;`;
    return html`
      <div class="icon-container">
        <img
          class="img"
          src=${Constant.url.helpIcon}
          @mouseover=${(e: Event) => this.showTooltip(e, label)}
          @mouseleave=${(e: Event) => this.hideTooltip(e, label)}
        />
        <div
          class=${tooltipState.show ? 'tooltip show' : 'tooltip'}
          style=${tooltipStyle}
        >
          ${helpText}
        </div>
      </div>
    `;
  }

  metadataTemplate() {
    const fetchedValueClass =
      !this.assetDataFetched && !this.assetDataNotFound
        ? 'value-column shimmer'
        : 'value-column';
    return html`
      <section class="metadata-container">
        ${this.assetDataFetched &&
        !this.assetDataNotFound &&
        this.asset.inStock >= 0
          ? html` <div class="link" @click=${this.collect}>
              <div class="purchase-license">
                ${this.asset.inStock > 0 ? 'COLLECT' : 'COLLECTED'}
              </div>
            </div>`
          : ''}
        <div class="heading">
          <div>Provenance</div>
        </div>
        <div class="table">
          <div class="row">
            <div class="key-column">Nid</div>
            <div class="value-column">
              <a target="_blank" href="${this.assetProfileUrl}">${this.nid}</a>
              <img
                class="img"
                src=${Constant.url.contentCopyIcon}
                @click=${this.copyToClipboard}
              />
            </div>
          </div>
          ${this.metadata.map(
            (item) => html`
              <div class="row">
                <div class="key-column">${item.label}</div>
                <div class=${fetchedValueClass}>
                  ${item.link
                    ? html`<a target="_blank" href="${item.link}"
                        >${item.value}</a
                      >`
                    : item.value}
                  ${item.helpText && this.assetDataFetched
                    ? this.tooltipTemplate(item.label, item.helpText)
                    : ''}
                </div>
              </div>
            `
          )}
        </div>
        <div class="metadata-container-bottom-spacer"></div>
      </section>
    `;
  }

  override render() {
    return html`
      <div class="capture-eye-container">
        <slot></slot>
        ${this.buttonTemplate()}
      </div>
      <div class="modal" ?hidden=${!this.showPanel}>
        <div class="modal-container">
          <div class="modal-header">
            <div class="keyboard-arrow-left" @click=${this.toggleShowPanel}>
              <img class="close" src=${Constant.url.closeIcon} />
            </div>
          </div>
          <div class="modal-content-error"></div>
          <div class="modal-content">
            <iframe
              src="https://verify.numbersprotocol.io/version-test/asset-profile/?nid=${this
                .nid}&iframe=yes"
              width="80%"
              height="80%"
              ?allowfullscreen=${true}
              class="capture-eye-iframe"
            >
            </iframe>
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
    const response = await fetch(`${Constant.url.dataApi}?nid=${this.nid}`, {
      method: 'GET',
      headers,
    });
    if (response.ok) {
      const data: Asset = await response.json();
      this.asset = data;
      this.setMetadata(this.asset);
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

  private async showTooltip(event: Event, label: string) {
    const element = event.target as HTMLElement;
    const targetRect = element.getBoundingClientRect();
    this.tooltipStates = {
      ...this.tooltipStates,
      [label]: {
        show: true,
        top: targetRect.bottom,
        left: targetRect.left,
      },
    };
  }

  private async hideTooltip(event: Event, label: string) {
    const element = event.target as HTMLElement;
    const targetRect = element.getBoundingClientRect();
    this.tooltipStates = {
      ...this.tooltipStates,
      [label]: {
        show: false,
        top: targetRect.bottom,
        left: targetRect.left,
      },
    };
  }

  private async copyToClipboard() {
    window.navigator.clipboard.writeText(this.nid);
  }

  private async collect() {
    if (this.asset.inStock < 1) return;
    const url = `${Constant.url.collect}}?from=nse&nid=${this.nid}`;
    window.open(url, '_blank')!.focus();
  }

  private setMetadata(asset: Asset) {
    // metadata must be updated via object assignment to trigger reactive rendering
    this.metadata = [
      {
        label: 'Creator',
        value: asset.assetCreator || Constant.text.not_available,
        link: this.getExplorerUrl(asset.creatorWallet),
      },
      {
        label: 'Creation Time',
        value: asset.assetTimestampCreated || Constant.text.not_available,
      },
      {
        label: 'Geolocation',
        value: asset.geolocation || Constant.text.not_available,
      },
      {
        label: 'File Mimetype',
        value: asset.mimetype || Constant.text.not_available,
        helpText: "The asset's type expressed using a MIME format.",
      },
      {
        label: 'Source Type',
        value: asset.digitalSourceType || Constant.text.not_available,
        helpText:
          'digitalSourceType is a controlled vocabulary that indicates from which source a digital media was created.',
      },
      {
        label: 'Initial Committer',
        value: asset.initialCommitter || Constant.text.not_available,
        link: this.getExplorerUrl(asset.initialCommitter),
      },
      {
        label: 'Initial Minter',
        value: asset.initialMinter || Constant.text.not_available,
        link: this.getExplorerUrl(asset.initialMinter),
      },
      { label: 'License', value: asset.license || Constant.text.not_available },
      {
        label: 'Mining Preference',
        value: asset.miningPreference || Constant.text.not_available,
      },
      {
        label: 'Integrity Proof',
        value: asset.integrityProof || Constant.text.not_available,
        link: this.getIpfsUrl(asset.integrityProof),
      },
    ];
  }

  private getExplorerUrl(address: string) {
    return address ? `${Constant.url.explorer}/address/${address}` : '';
  }

  private getIpfsUrl(cid: string) {
    return cid ? `${Constant.url.ipfsGateway}/${cid}` : '';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'capture-eye': CaptureEye;
  }
}
