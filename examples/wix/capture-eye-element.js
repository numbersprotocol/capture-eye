class CaptureEyeElement extends HTMLElement {
  connectedCallback() {
    const nid = this.getAttribute('nid');
    const thumbnail = this.getAttribute('thumbnail');
    // Clear existing content to prevent duplicates on re-connection
    this.replaceChildren();
    const captureEye = document.createElement('capture-eye');
    captureEye.setAttribute('nid', nid);
    const mediaViewer = document.createElement('media-viewer');
    mediaViewer.setAttribute('src', thumbnail);
    captureEye.appendChild(mediaViewer);
    this.appendChild(captureEye);
  }
}
customElements.define('capture-eye-element', CaptureEyeElement);
