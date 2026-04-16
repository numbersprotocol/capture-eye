import { LitElement, PropertyValues, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getMediaViewerStyles } from './media-viewer-styles';

@customElement('media-viewer')
export class MediaViewer extends LitElement {
  static override styles = getMediaViewerStyles();

  @property({ type: String }) src = '';
  @property({ type: String }) alt = 'Image';
  @property({ type: String }) width = '100%';
  @property({ type: String }) height = 'auto';
  @property({ type: Boolean }) controls = true;
  @property({ type: Boolean }) autoplay = false;
  @property({ type: Boolean }) loop = false;
  @property({ type: Boolean }) muted = false;

  private mimeType: string | null = null;
  @state() private _error = false;
  private _fetchingFor: string | null = null;

  override connectedCallback() {
    super.connectedCallback();
    if (!this.mimeType && this.src && this._fetchingFor !== this.src) {
      this.determineFileType();
    }
  }

  override updated(changedProperties: PropertyValues) {
    if (
      changedProperties.has('src') &&
      this.src &&
      this._fetchingFor !== this.src
    ) {
      this.mimeType = null;
      this._error = false;
      this.determineFileType();
    }
  }

  private fallbackToExtensionBasedType() {
    const ext = this.src?.split('.').pop()?.toLowerCase();
    if (ext && ['mp4', 'webm', 'ogg'].includes(ext)) {
      this.mimeType = `video/${ext}`;
    } else {
      this.mimeType = 'image/unknown';
    }
  }

  async determineFileType() {
    if (!this.src) return;
    this._fetchingFor = this.src;
    try {
      const response = await fetch(this.src, { method: 'HEAD' });
      const contentType = response.headers.get('Content-Type');
      if (contentType) {
        this.mimeType = contentType;
      } else {
        console.error('Content-Type header not found');
        this.fallbackToExtensionBasedType();
      }
    } catch (error) {
      console.error('Error fetching content type:', error);
      this.fallbackToExtensionBasedType();
    } finally {
      this._fetchingFor = null;
    }
    this.requestUpdate();
    if (
      !this.mimeType ||
      !(this.isImageMimeType(this.mimeType) || this.isVideoMimeType(this.mimeType))
    ) {
      this._error = true;
      this.dispatchEvent(new Event('error'));
    }
  }

  isImageMimeType(mimeType: string): boolean {
    return mimeType.startsWith('image/');
  }

  isVideoMimeType(mimeType: string): boolean {
    return (
      mimeType.startsWith('video/') ||
      mimeType === 'application/vnd.apple.mpegurl'
    );
  }

  override render() {
    if (!this.src) {
      return html`<div class="unsupported">No source provided</div>`;
    }

    if (this._error) {
      return html`<div class="error">Unable to load media</div>`;
    }

    if (!this.mimeType) {
      return html`<div class="loading"></div>`;
    }

    if (this.isImageMimeType(this.mimeType)) {
      return html`<img
        src=${this.src}
        alt=${this.alt}
        style="width: ${this.width}; height: ${this.height};"
        @error=${this.handleEvent}
      />`;
    }

    if (this.isVideoMimeType(this.mimeType)) {
      return html`
        <video
          style="width: ${this.width}; height: ${this.height};"
          ?controls=${this.controls}
          ?autoplay=${this.autoplay}
          ?loop=${this.loop}
          ?muted=${this.muted}
          @error=${this.handleEvent}
        >
          <source src=${this.src} type=${this.mimeType} />
          Your browser does not support the video tag.
        </video>
      `;
    }

    return html`<div class="unsupported">Unsupported file format</div>`;
  }

  private handleEvent(event: Event) {
    this.dispatchEvent(new Event(event.type));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'media-viewer': MediaViewer;
  }
}
