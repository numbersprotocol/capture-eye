class CaptureEyeElement extends HTMLElement {
  connectedCallback() {
    const nid = this.getAttribute('nid');
    const thumbnail = this.getAttribute('thumbnail');
    this.innerHTML = `<capture-eye nid="${nid}"><media-viewer src="${thumbnail}"/></capture-eye>`;
  }
}
customElements.define('capture-eye-element', CaptureEyeElement);