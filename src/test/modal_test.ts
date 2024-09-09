import { html } from 'lit';
import { fixture, assert, expect } from '@open-wc/testing';
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
    expect(modal).to.not.be.null;
    expect(modal?.classList.contains('modal-hidden')).to.be.true;

    el.modalHidden = false;
    await el.updateComplete;
    expect(modal?.classList.contains('modal-hidden')).to.be.false;
    expect(modal?.classList.contains('modal-visible')).to.be.true;
  });

  test('calls hideModal() when close button is clicked', async () => {
    const el = await fixture<CaptureEyeModal>(
      html`<capture-eye-modal></capture-eye-modal>`
    );
    const closeButton = el.shadowRoot?.querySelector(
      '.close-button'
    ) as HTMLElement;
    expect(closeButton).to.exist;

    el.modalHidden = false;
    await el.updateComplete;
    closeButton.click();
    await el.updateComplete;

    const modal = el.shadowRoot?.querySelector('.modal');
    expect(modal?.classList.contains('modal-hidden')).to.be.true;
    expect(el.modalHidden).to.be.true;
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
    expect(img).to.exist;
    expect(img!.src).to.equal(engagementImage);

    const link = el.shadowRoot?.querySelector('.eng-link') as HTMLAnchorElement;
    expect(link).to.exist;
    expect(new URL(link!.href).href).to.equal(new URL(engagementLink).href);
  });

  test('should render custom provenance zone correctly', async () => {
    const el = await fixture<CaptureEyeModal>(html`
      <capture-eye-modal></capture-eye-modal>
    `);
    const customProvenance = [
      {
        field: 'Custom Field 1',
        value: 'Custom Value 1',
        iconSource: 'https://via.placeholder.com/20',
        url: 'https://example.com',
      },
      {
        field: 'Custom Field 2',
        value: 'Custom Value 2',
        iconSource: 'https://via.placeholder.com/20',
      },
    ];

    el.updateAsset({
      captureEyeCustom: customProvenance,
    });

    await el.updateComplete; // Wait for LitElement to finish rendering

    const provenanceItems = el.shadowRoot!.querySelectorAll('.middle-row');

    expect(provenanceItems.length).to.equal(customProvenance.length + 1); // first row is tx

    customProvenance.forEach((item, index) => {
      const itemElement = provenanceItems[index + 1]; // first row is tx

      const icon = itemElement.querySelector('img');
      const fieldText = itemElement.querySelector('.field-text');
      const valueText = itemElement.querySelector('.value-text');
      const link = itemElement.querySelector('a');

      if (item.iconSource) {
        expect(icon).to.exist;
        expect(icon!.src).to.equal(item.iconSource);
      } else {
        expect(icon).to.not.exist;
      }

      expect(fieldText).to.exist;
      expect(fieldText!.textContent).to.equal(`${item.field}:`);

      if (item.url) {
        expect(link).to.exist;
        expect(new URL(link!.href).href).to.equal(new URL(item.url).href);
        expect(valueText!.textContent).to.equal(item.value);
      } else {
        expect(link).to.not.exist;
        expect(valueText!.textContent).to.equal(item.value);
      }
    });
  });

  test('correctly formats transaction hash', () => {
    const txHash =
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
    const formatted = formatTxHash(txHash);
    expect(formatted).to.equal('0x1234...abcdef');
  });
});
