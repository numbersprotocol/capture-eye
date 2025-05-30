import { html } from 'lit';
import { fixture, assert, expect, waitUntil } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import {
  CaptureEyeModal,
  formatTxHash,
  generateCaptureEyeCloseSvg,
} from '../modal/modal';
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
              <div class="badge-container"></div>
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
                <div class="heading headline" title="">
                  <div
                    class="shimmer-text"
                    style="height: auto;"
                  >
                  </div>
                </div>
              </div>
              <div class="section">
                <div class="section-title">Origins</div>
                <div class="middle-row">
                  <span
                    class="shimmer-text"
                    style="height: 21.5px;"
                  >
                  </span>
                </div>
                <div class="middle-row">
                  <span
                    class="shimmer-text"
                    style="height: 21.5px;"
                  >
                  </span>
                </div>
              </div>
              <div class="section">
                <a href="https://asset.captureapp.xyz/" target="_blank"><button class="view-more-btn">View More</button></a>
                <div class="powered-by">
                  <div
                    class="shimmer-text"
                    style="height: auto;"
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slideshow-container">
            <a
              class="eng-link"
              href="https://captureapp.xyz"
              target="_blank"
            >
              <img
                alt="Slideshow Image"
                class="eng-img"
                src="https://static-cdn.numbersprotocol.io/capture-eye/capture-ad.png"
                style="display: none"
              >
              <div class="eng-img shimmer">
              </div>
            </a>
          </div>
        </div>
        <div class="close-button close-button-hidden">
          ${generateCaptureEyeCloseSvg(
            Constant.color.defaultEye,
            32
          ).strings.join()}
        </div>
      </div>
      `
    );
  });

  test('handles modal visibility correctly', async () => {
    const el = await fixture<CaptureEyeModal>(
      html`<capture-eye-modal></capture-eye-modal>`
    );
    const modal = el.shadowRoot?.querySelector('.modal');
    expect(modal).to.not.be.null;
    expect(modal?.classList.contains('modal-hidden')).to.be.true;

    el.modalHidden = false;
    await el.updateComplete;
    expect(modal?.classList.contains('modal-hidden')).to.be.false;
    expect(modal?.classList.contains('modal-visible')).to.be.true;

    el.modalHidden = true;
    await el.updateComplete;
    expect(modal?.classList.contains('modal-hidden')).to.be.true;
  });

  test('emits remove-capture-eye-modal event when close button is clicked', async () => {
    const el = await fixture<CaptureEyeModal>(
      html`<capture-eye-modal></capture-eye-modal>`
    );
    const closeButton = el.shadowRoot?.querySelector(
      '.close-button'
    ) as HTMLElement;

    const eventSpy = sinon.spy(el, 'dispatchEvent');

    el.modalHidden = false;
    await el.updateComplete;
    closeButton.click();

    expect(eventSpy).to.have.been.calledWith(
      sinon.match
        .instanceOf(CustomEvent)
        .and(sinon.match.has('type', 'remove-capture-eye-modal'))
    );

    eventSpy.restore();
  });

  test('renders engagement image and link correctly', async () => {
    const engagementImage =
      'https://static-cdn.numbersprotocol.io/capture-eye/capture-ad.png';
    const engagementLink = 'https://example.com';

    const el = await fixture<CaptureEyeModal>(html`
      <capture-eye-modal></capture-eye-modal>
    `);

    el.updateModalOptions({
      nid: '123',
      engagementZones: [{ image: engagementImage, link: engagementLink }],
    });
    await el.updateComplete;

    const img = el.shadowRoot?.querySelector('.eng-img') as HTMLImageElement;
    expect(img).to.exist;

    expect(new URL(img.src).href).to.equal(new URL(engagementImage).href);

    await (el as any).preloadEngagementZoneImages();
    await el.updateComplete;
    expect(img.style.display).to.equal('block');

    const link = el.shadowRoot?.querySelector('.eng-link') as HTMLAnchorElement;
    expect(link).to.exist;
    expect(new URL(link.href).href).to.equal(new URL(engagementLink).href);
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

    const originalWidth = window.innerWidth;
    const originalHeight = window.innerHeight;
    await setViewport({ width: 850, height: 850 });

    const position = { top: 100, left: 200, name: '' };

    el.updateModalOptions({
      nid: '123',
      position,
    });

    el.modalHidden = false;
    await el.updateComplete;

    const modal = el.shadowRoot?.querySelector('.modal') as HTMLDivElement;

    expect(modal.style.top).to.equal('116px'); // Assuming 1rem = 16px (this may vary)
    expect(modal.style.left).to.equal('216px');

    // Position is bottom right with enough space in that direction
    el.modalHidden = true;
    el.modalHidden = false;
    el.updateModalOptions({
      nid: '123',
      position: { top: 600, left: 800, name: 'bottom right' },
    });
    await el.updateComplete;

    expect(modal.style.top).to.equal(`${600 + 16 - modal.offsetHeight}px`);
    expect(modal.style.left).to.equal(`${800 + 16 - modal.offsetWidth}px`);

    // Position is bottom right without enough space in that direction
    el.modalHidden = true;
    el.modalHidden = false;
    el.updateModalOptions({
      nid: '123',
      position: { top: 100, left: 200, name: 'bottom right' },
    });
    await el.updateComplete;

    expect(modal.style.top).to.equal('116px');
    expect(modal.style.left).to.equal('216px');

    // Position is top left without enough space between the modal and the edges
    await setViewport({ width: 400, height: 600 });
    document.body.style.position = 'fixed';
    el.modalHidden = true;
    el.modalHidden = false;
    el.updateModalOptions({
      nid: '123',
      position: { top: 100, left: 200, name: '' },
    });
    await el.updateComplete;

    expect(modal.style.top).to.equal(`${600 - modal.offsetHeight}px`);
    expect(modal.style.left).to.equal(`${400 - modal.offsetWidth}px`);

    // Reset
    document.body.style.position = 'static';
    await setViewport({ width: originalWidth, height: originalHeight });
    expect(window.innerWidth).to.equal(originalWidth);
    expect(window.innerHeight).to.equal(originalHeight);
  });

  test('clears modal options correctly', async () => {
    const el = await fixture<CaptureEyeModal>(html`
      <capture-eye-modal></capture-eye-modal>
    `);

    // Update some modal options
    el.updateModalOptions({
      nid: '123',
      layout: 'custom-layout',
      engagementZones: [
        {
          image:
            'https://static-cdn.numbersprotocol.io/capture-eye/capture-ad.png',
          link: 'https://example.com',
        },
      ],
      position: { top: 100, left: 200, name: '' },
    });

    await el.updateComplete;

    // Call clearModalOptions to reset everything
    el.clearModalOptions();
    await el.updateComplete;

    // Verify that options are reset to defaults
    expect(el.nid).to.equal('');
    expect(el.layout).to.equal(Constant.layout.original);
    expect((el as any)._engagementZones).to.deep.equal([]);
    expect((el as any)._position).to.equal(undefined);
  });

  test('modal visibility toggle works', async () => {
    const el = await fixture<CaptureEyeModal>(html`
      <capture-eye-modal></capture-eye-modal>
    `);

    const modal = el.shadowRoot?.querySelector('.modal') as HTMLDivElement;

    el.modalHidden = false;
    await el.updateComplete;

    // Wait until the modal becomes visible
    await waitUntil(
      () => getComputedStyle(modal).display === 'flex',
      'Modal should be visible'
    );
    expect(getComputedStyle(modal).display).to.equal('flex');

    // Set the modal to hidden
    el.modalHidden = true;
    await el.updateComplete;

    // Wait until the modal is hidden
    await waitUntil(
      () => getComputedStyle(modal).display === 'none',
      'Modal should be hidden'
    );
    expect(getComputedStyle(modal).display).to.equal('none');
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
      engagementZones: [
        {
          image:
            'https://static-cdn.numbersprotocol.io/capture-eye/capture-ad.png',
          link: engagementLink,
        },
      ],
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
      encodingFormat: 'image/jpeg',
      thumbnailUrl: 'https://example.com/thumbnail.jpg',
      captureTime: '2024-10-16',
      captureLocation: 'New York, USA',
      headline: 'Sample Asset',
      abstract: 'A brief summary',
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
    const creator = el.shadowRoot?.querySelector('.top-name a') as HTMLElement;
    expect(creator.textContent?.trim()).to.equal(assetData.creator);

    const location = el.shadowRoot?.querySelector(
      '.top-info:last-child'
    ) as HTMLElement;
    expect(location.textContent?.trim()).to.equal(assetData.captureLocation);

    const heading = el.shadowRoot?.querySelector('.heading') as HTMLElement;
    expect(heading.textContent?.trim()).to.equal(assetData.headline);

    const img = el.shadowRoot?.querySelector(
      '.profile-img'
    ) as HTMLImageElement;
    expect(img.src).to.equal(assetData.thumbnailUrl);

    const badge = el.shadowRoot?.querySelector(
      'div.badge-container img[alt="Generated via AI"]'
    );
    expect(badge).to.null;

    const buttonCr = el.shadowRoot?.querySelector('.button-content-credentials');
    expect(buttonCr).to.exist;

    // Headling source is abstract
    el.updateModalOptions({
      nid: '123',
      headingSource: 'abstract'
    });

    await el.updateComplete;

    expect(heading.textContent?.trim()).to.equal(assetData.abstract);
  });

  test('should render generated via AI correctly', async () => {
    const el = await fixture<CaptureEyeModal>(html`
      <capture-eye-modal></capture-eye-modal>
    `);

    el.updateAsset({
      digitalSourceType: 'trainedAlgorithmicMedia',
    });

    await el.updateComplete;

    const badge = el.shadowRoot!.querySelector(
      'div.badge-container img[alt="Generated via AI"]'
    );

    expect(badge).to.exist;
  });

  test('should hide content credentials when disabled', async () => {
    const el = await fixture<CaptureEyeModal>(html`
      <capture-eye-modal></capture-eye-modal>
    `);

    el.updateAsset({
      encodingFormat: 'image/jpeg',
    }, true);

    // By default, Content Credentials should be enabled
    await el.updateComplete;
    let buttonCr = el.shadowRoot!.querySelector('.button-content-credentials');
    expect(buttonCr).to.exist;

    // Enable Content Credentials
    el.updateModalOptions({
      nid: '123',
      crPin: Constant.crPin.on
    });
    await el.updateComplete;

    buttonCr = el.shadowRoot!.querySelector('.button-content-credentials');
    expect(buttonCr).to.exist;

    // Disable Content Credentials
    el.updateModalOptions({
      nid: '123',
      crPin: Constant.crPin.off
    });
    await el.updateComplete;

    buttonCr = el.shadowRoot!.querySelector('.button-content-credentials');
    expect(buttonCr).to.not.exist;
  });
});
