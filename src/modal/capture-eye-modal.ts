import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Constant } from '../constant';
import { getStyles } from '../styles';

@customElement('capture-eye-modal')
export class CaptureEyeModal extends LitElement {
  static override styles = getStyles();

  @property()
  nid = '';

  @property({ type: Boolean })
  modalHidden = true;

  constructor() {
    super();
  }

  override render() {
    return html`
      <div class="modal" ?hidden=${this.modalHidden}>
        <div class="modal-container">
          <div class="modal-header">
            <div class="keyboard-arrow-left" @click=${this.hideModal}>
              <img class="close" src=${Constant.url.closeIcon} />
            </div>
          </div>
          <div class="modal-content">
            ${this.nid
              ? html`
                  <iframe
                    src="https://verify.numbersprotocol.io/version-test/asset-profile/?nid=${this
                      .nid}&iframe=yes"
                    width="80%"
                    height="80%"
                    ?allowfullscreen=${true}
                    class="capture-eye-iframe"
                  >
                  </iframe>
                `
              : ''}
          </div>
        </div>
      </div>
    `;
  }

  private hideModal() {
    this.modalHidden = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'capture-eye-modal': CaptureEyeModal;
  }
}
