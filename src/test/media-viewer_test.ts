import { html } from 'lit';
import { fixture, assert, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import { MediaViewer } from '../media-viewer/media-viewer';

suite('media-viewer', () => {
  let fetchStub: sinon.SinonStub;

  setup(() => {
    fetchStub = sinon.stub(window, 'fetch');
  });

  teardown(() => {
    fetchStub.restore();
  });

  test('is defined', () => {
    const el = document.createElement('media-viewer');
    assert.instanceOf(el, MediaViewer);
  });

  test('renders unsupported message when src is empty', async () => {
    const el = await fixture<MediaViewer>(
      html`<media-viewer></media-viewer>`
    );

    const div = el.shadowRoot?.querySelector('.unsupported');
    assert.exists(div);
    assert.equal(div!.textContent, 'No source provided');
  });

  test('renders loading state while waiting for MIME type', async () => {
    let resolveResponse!: (r: Response) => void;
    const pending = new Promise<Response>((resolve) => {
      resolveResponse = resolve;
    });
    fetchStub.returns(pending);

    const el = await fixture<MediaViewer>(
      html`<media-viewer src="https://example.com/image.jpg"></media-viewer>`
    );

    const loading = el.shadowRoot?.querySelector('.loading');
    assert.exists(loading, 'loading element should be present before fetch resolves');

    resolveResponse({
      ok: true,
      headers: { get: (name: string) => (name === 'Content-Type' ? 'image/jpeg' : null) },
    } as unknown as Response);
    await el.updateComplete;
  });

  test('renders img element for image MIME type', async () => {
    fetchStub.resolves({
      ok: true,
      headers: { get: (name: string) => (name === 'Content-Type' ? 'image/jpeg' : null) },
    } as unknown as Response);

    const el = await fixture<MediaViewer>(
      html`<media-viewer src="https://example.com/image.jpg"></media-viewer>`
    );

    await waitUntil(
      () => el.shadowRoot?.querySelector('img') !== null,
      'img element should be rendered'
    );

    const img = el.shadowRoot?.querySelector('img');
    assert.exists(img);
    assert.equal(img!.getAttribute('src'), 'https://example.com/image.jpg');
  });

  test('renders video element for video MIME type', async () => {
    fetchStub.resolves({
      ok: true,
      headers: { get: (name: string) => (name === 'Content-Type' ? 'video/mp4' : null) },
    } as unknown as Response);

    const el = await fixture<MediaViewer>(
      html`<media-viewer src="https://example.com/video.mp4"></media-viewer>`
    );

    await waitUntil(
      () => el.shadowRoot?.querySelector('video') !== null,
      'video element should be rendered'
    );

    const video = el.shadowRoot?.querySelector('video');
    assert.exists(video);

    const source = video!.querySelector('source');
    assert.exists(source);
    assert.equal(source!.getAttribute('src'), 'https://example.com/video.mp4');
  });

  test('renders video element for HLS MIME type', async () => {
    fetchStub.resolves({
      ok: true,
      headers: {
        get: (name: string) =>
          name === 'Content-Type' ? 'application/vnd.apple.mpegurl' : null,
      },
    } as unknown as Response);

    const el = await fixture<MediaViewer>(
      html`<media-viewer src="https://example.com/stream.m3u8"></media-viewer>`
    );

    await waitUntil(
      () => el.shadowRoot?.querySelector('video') !== null,
      'video element should be rendered for HLS'
    );

    assert.exists(el.shadowRoot?.querySelector('video'));
  });

  test('renders unsupported message for unknown MIME type', async () => {
    fetchStub.resolves({
      ok: true,
      headers: { get: (name: string) => (name === 'Content-Type' ? 'application/pdf' : null) },
    } as unknown as Response);

    const el = await fixture<MediaViewer>(
      html`<media-viewer src="https://example.com/doc.pdf"></media-viewer>`
    );

    await waitUntil(
      () => el.shadowRoot?.querySelector('.unsupported') !== null,
      'unsupported element should be rendered'
    );

    const div = el.shadowRoot?.querySelector('.unsupported');
    assert.exists(div);
    assert.equal(div!.textContent, 'Unsupported file format');
  });

  test('dispatches error event when MIME type is unsupported', async () => {
    const el = await fixture<MediaViewer>(html`<media-viewer></media-viewer>`);

    fetchStub.resolves({
      ok: true,
      headers: { get: (name: string) => (name === 'Content-Type' ? 'application/pdf' : null) },
    } as unknown as Response);

    let errorDispatched = false;
    el.addEventListener('error', () => {
      errorDispatched = true;
    });

    el.src = 'https://example.com/doc.pdf';
    (el as any).mimeType = null;
    await el.determineFileType();

    assert.isTrue(errorDispatched, 'error event should be dispatched for unsupported MIME type');
  });

  test('dispatches error event when HEAD request fails', async () => {
    const el = await fixture<MediaViewer>(html`<media-viewer></media-viewer>`);

    fetchStub.rejects(new Error('Network error'));

    let errorDispatched = false;
    el.addEventListener('error', () => {
      errorDispatched = true;
    });

    el.src = 'https://example.com/image.jpg';
    (el as any).mimeType = null;
    await el.determineFileType();

    assert.isTrue(errorDispatched, 'error event should be dispatched on network error');
  });

  test('dispatches error event when src is empty', async () => {
    const el = await fixture<MediaViewer>(html`<media-viewer></media-viewer>`);

    let errorDispatched = false;
    el.addEventListener('error', () => {
      errorDispatched = true;
    });

    await el.determineFileType();

    assert.isTrue(errorDispatched, 'error event should be dispatched when src is empty');
  });

  test('isImageMimeType returns true for image MIME types', async () => {
    const el = await fixture<MediaViewer>(html`<media-viewer></media-viewer>`);

    assert.isTrue(el.isImageMimeType('image/jpeg'));
    assert.isTrue(el.isImageMimeType('image/png'));
    assert.isTrue(el.isImageMimeType('image/gif'));
    assert.isFalse(el.isImageMimeType('video/mp4'));
    assert.isFalse(el.isImageMimeType('application/pdf'));
  });

  test('isVideoMimeType returns true for video MIME types', async () => {
    const el = await fixture<MediaViewer>(html`<media-viewer></media-viewer>`);

    assert.isTrue(el.isVideoMimeType('video/mp4'));
    assert.isTrue(el.isVideoMimeType('video/webm'));
    assert.isTrue(el.isVideoMimeType('application/vnd.apple.mpegurl'));
    assert.isFalse(el.isVideoMimeType('image/jpeg'));
    assert.isFalse(el.isVideoMimeType('application/pdf'));
  });
});
