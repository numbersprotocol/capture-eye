import { html } from 'lit';
import { fixture, assert } from '@open-wc/testing';
import { CaptureEyeModal, formatTxHash } from '../modal/modal';

suite('capture-eye-modal', () => {
  test('is defined', () => {
    const el = document.createElement('capture-eye-modal');
    assert.instanceOf(el, CaptureEyeModal);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<capture-eye-modal></capture-eye-modal>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="modal modal-hidden">
        <div class="modal-container">
          <div class="modal-content">
            <div class="card">
              <div class="section">
                <div class="section-title">Produced by</div>
                <div class="profile-container">
                  <div class="shimmer-profile-img"></div>
                  <div class="profile-text">
                    <div class="top-name">
                      <div class="shimmer-text"></div>
                    </div>
                    <div class="top-date">
                      <div class="shimmer-text"></div>
                    </div>
                  </div>
                </div>
                <div class="headline">
                  <div class="shimmer-text"></div>
                </div>
              </div>
              <div class="section">
                <div class="section-title">Origins</div>
                <div class="middle-row">
                  <span class="shimmer-text"></span>
                </div>
                <div class="middle-row">
                  <span class="shimmer-text"></span>
                </div>
              </div>
              <div class="section">
                <a href="https://verify.numbersprotocol.io/asset-profile/" target="_blank"><button class="view-more-btn">View More</button></a>
                <div class="powered-by">
                  <div class="shimmer-text"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="eng-img">
          </div>
          <div class="close-button close-button-hidden">
            <img src="https://static-cdn.numbersprotocol.io/capture-eye/capture-eye-close-icon.png" alt="Close" />
          </div>
        </div>
      </div>
      `
    );
  });

  test('handles modal visibility', async () => {
    const el = await fixture<CaptureEyeModal>(
      html`<capture-eye-modal class="modal-hidden"></capture-eye-modal>`
    );
    const modal = el.shadowRoot?.querySelector('.modal');
    assert.isNotNull(modal);
    assert.isTrue(modal?.classList.contains('modal-hidden'));

    el.modalHidden = false;
    await el.updateComplete;
    assert.isFalse(modal?.classList.contains('modal-hidden'));
    assert.isTrue(modal?.classList.contains('modal-visible'));
  });

  test('calls hideModal() when close button is clicked', async () => {
    const el = await fixture<CaptureEyeModal>(
      html`<capture-eye-modal></capture-eye-modal>`
    );
    const closeButton = el.shadowRoot?.querySelector(
      '.close-button'
    ) as HTMLElement;
    assert.isNotNull(closeButton);

    el.modalHidden = false;
    await el.updateComplete;
    closeButton.click();
    await el.updateComplete;

    const modal = el.shadowRoot?.querySelector('.modal');
    assert.isTrue(modal?.classList.contains('modal-hidden'));
    assert.isTrue(el.modalHidden);
  });

  test('renders engagement image and link correctly', async () => {
    const engagementImage = 'https://example.com/image.jpg';
    const engagementLink = 'https://example.com';
    const el = await fixture<CaptureEyeModal>(html`
      <capture-eye-modal></capture-eye-modal>
    `);

    el.engagementImage = engagementImage;
    el.engagementLink = engagementLink;
    await el.updateComplete;
    const img = el.shadowRoot?.querySelector('.eng-img') as HTMLImageElement;
    assert.isNotNull(img);
    assert.equal(img.src, engagementImage);

    const link = el.shadowRoot?.querySelector('.eng-link') as HTMLAnchorElement;
    assert.isNotNull(link);
    assert.equal(new URL(link.href).href, new URL(engagementLink).href);
  });

  test('correctly formats transaction hash', () => {
    const txHash =
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    const formatted = formatTxHash(txHash);
    assert.equal(formatted, '0x1234...abcdef');
  });
});
