import { html } from 'lit';
import { fixture, assert, expect } from '@open-wc/testing';
import { CaptureEyeModal, formatTxHash } from '../modal/modal';
import { AssetModel } from '../asset/asset-model';
import interactionTracker, { TrackerEvent } from '../modal/interaction-tracker';
import sinon from 'sinon';
import { Constant } from '../constant';

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
                    <div class="top-info">
                      <div class="shimmer-text"></div>
                    </div>
                    <div class="top-info">
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
                <a href="https://asset.captureapp.xyz/" target="_blank"><button class="view-more-btn">View More</button></a>
                <div class="powered-by">
                  <div class="shimmer-text"></div>
                </div>
              </div>
            </div>
          </div>
          <a
            class="eng-link"
            href="https://captureapp.xyz"
            target="_blank"
          >
            <img
              alt="Full width"
              class="eng-img"
              src="https://static-cdn.numbersprotocol.io/capture-eye/capture-ad.png"
              style="display: none"
            >
            <div class="eng-img shimmer">
            </div>
          </a>
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

    el.updateModalOptions({
      nid: '123',
      engagementImage,
      engagementLink,
    });
    await el.updateComplete;
    const img = el.shadowRoot?.querySelector('.eng-img') as HTMLImageElement;
    expect(img).to.exist;
    expect(img!.src).to.equal(engagementImage);

    img.dispatchEvent(new Event('load'));
    await el.updateComplete;
    expect(img.style.display).to.equal('block');

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

    expect(provenanceItems.length).to.equal(customProvenance.length + 1); // last row is tx

    customProvenance.forEach((item, index) => {
      const itemElement = provenanceItems[index];

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

  test('positions modal correctly based on options', async () => {
    const el = await fixture<CaptureEyeModal>(html`
      <capture-eye-modal></capture-eye-modal>
    `);

    const position = { top: 100, left: 200 };

    el.updateModalOptions({
      nid: '123',
      position,
    });

    await el.updateComplete;

    const modal = el.shadowRoot?.querySelector('.modal') as HTMLDivElement;

    expect(modal.style.top).to.equal('116px'); // Assuming 1rem = 16px (this may vary)
    expect(modal.style.left).to.equal('216px');
  });

  test('clears modal options correctly', async () => {
    const el = await fixture<CaptureEyeModal>(html`
      <capture-eye-modal></capture-eye-modal>
    `);

    // Update some modal options
    el.updateModalOptions({
      nid: '123',
      layout: 'custom-layout',
      engagementImage: 'https://example.com/image.jpg',
      engagementLink: 'https://example.com',
    });

    await el.updateComplete;

    // Call clearModalOptions to reset everything
    el.clearModalOptions();
    await el.updateComplete;

    // Verify that options are reset to defaults
    expect(el.nid).to.equal('');
    expect(el.layout).to.equal(Constant.layout.original);
    expect((el as any)._engagementImage).to.equal('');
    expect((el as any)._engagementLink).to.equal('');
  });

  test('modal visibility toggle works with transition end', async () => {
    const el = await fixture<CaptureEyeModal>(html`
      <capture-eye-modal></capture-eye-modal>
    `);

    const modal = el.shadowRoot?.querySelector('.modal') as HTMLDivElement;

    el.modalHidden = false;
    await el.updateComplete;

    // Check that the modal is visible
    expect(modal.style.top).to.not.equal('-9999px');
    expect(modal.style.left).to.not.equal('-9999px');

    // Set the modal to hidden
    el.modalHidden = true;
    await el.updateComplete;

    // Simulate the 'transitionend' event to trigger moving the modal off-screen
    modal.dispatchEvent(new Event('transitionend'));
    await el.updateComplete;

    // Check that the modal is moved off-screen after hiding
    expect(modal.style.top).to.equal('-9999px');
    expect(modal.style.left).to.equal('-9999px');
  });

  test('tracks engagement when engagement link is clicked', async () => {
    const engagementLink = 'https://example.com';
    const el = await fixture<CaptureEyeModal>(html`
      <capture-eye-modal></capture-eye-modal>
    `);

    // Spy on the interaction tracker
    const trackInteractionSpy = sinon.spy(
      interactionTracker,
      'trackInteraction'
    );

    el.updateModalOptions({
      nid: '123',
      engagementLink,
    });

    await el.updateComplete;

    const link = el.shadowRoot?.querySelector('.eng-link') as HTMLAnchorElement;
    expect(link).to.exist;

    // Simulate a click on the engagement link
    link.click();
    await el.updateComplete;

    // Check that the trackInteraction function was called
    expect(trackInteractionSpy).to.have.been.calledOnceWith(
      TrackerEvent.ENGAGEMENT_ZONE,
      '123',
      '0' // Because the link is custom
    );

    trackInteractionSpy.restore();
  });

  test('renders asset correctly when asset is loaded', async () => {
    const assetData: AssetModel = {
      creator: 'John Doe',
      thumbnailUrl: 'https://example.com/thumbnail.jpg',
      captureTime: '2024-10-16',
      captureLocation: 'New York, USA',
      headline: 'Sample Asset',
      initialTransaction:
        '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      explorerUrl: 'https://example.com/explorer',
    };

    const el = await fixture<CaptureEyeModal>(html`
      <capture-eye-modal></capture-eye-modal>
    `);

    // Load the asset
    el.updateAsset(assetData, true);
    await el.updateComplete;

    // Check that the asset details are rendered
    const creator = el.shadowRoot?.querySelector('.top-name') as HTMLElement;
    expect(creator.innerText).to.equal(assetData.creator);

    const location = el.shadowRoot?.querySelector(
      '.top-info:last-child'
    ) as HTMLElement;
    expect(location.innerText).to.equal(assetData.captureLocation);

    const headline = el.shadowRoot?.querySelector('.headline') as HTMLElement;
    expect(headline.innerText).to.equal(assetData.headline);

    const img = el.shadowRoot?.querySelector(
      '.profile-img'
    ) as HTMLImageElement;
    expect(img.src).to.equal(assetData.thumbnailUrl);
  });
});
