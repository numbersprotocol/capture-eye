import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getMediaViewerStyles } from './media-viewer-styles';

@customElement('media-viewer')
export class MediaViewer extends LitElement {
  static override styles = getMediaViewerStyles();

  @property({ type: String }) src = '';
  @property({ type: String }) width = '100%';
  @property({ type: String }) height = 'auto';
  @property({ type: Boolean }) controls = true;
  @property({ type: Boolean }) autoplay = false;
  @property({ type: Boolean }) loop = false;
  @property({ type: Boolean }) muted = false;

  private mimeType: string | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.determineFileType();
  }

  async determineFileType() {
    if (this.src) {
      try {
        const response = await fetch(this.src, { method: 'HEAD' });
        const contentType = response.headers.get('Content-Type');
        if (contentType) {
          this.mimeType = contentType;
        } else {
          console.error('Content-Type header not found');
        }
      } catch (error) {
        console.error('Error fetching content type:', error);
      }
      this.requestUpdate();
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

    if (!this.mimeType) {
      return html`<div class="loading"></div>`;
    }

    if (this.isImageMimeType(this.mimeType)) {
      return html`<img
        src=${this.src}
        alt="Image"
        style="width: ${this.width}; height: ${this.height};"
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
        >
          <source src=${this.src} type=${this.mimeType} />
          Your browser does not support the video tag.
        </video>
      `;
    }

    return html`<div class="unsupported">Unsupported file format</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'media-viewer': MediaViewer;
  }
}
