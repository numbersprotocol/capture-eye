import { css } from 'lit';

export function getMediaViewerStyles() {
  return css`
    :host {
      display: block;
    }
    img,
    video {
      width: var(--media-viewer-width, 100%);
      height: var(--media-viewer-height, auto);
      vertical-align: bottom;
    }
    .unsupported {
      color: red;
      font-size: 1rem;
      text-align: center;
    }
    .loading {
      text-align: center;
      font-size: 1rem;
      color: #888;
    }
  `;
}
