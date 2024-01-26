import { CaptureEyeModal } from './capture-eye-modal';

export class ModalManager {
  private static instance: ModalManager;
  private modalElement: CaptureEyeModal | null = null;

  private constructor() {}

  public static getInstance(): ModalManager {
    if (!ModalManager.instance) {
      ModalManager.instance = new ModalManager();
    }
    return ModalManager.instance;
  }

  public initializeModal(): void {
    if (!this.modalElement) {
      this.modalElement = document.createElement('capture-eye-modal');
      document.body.appendChild(this.modalElement);
    }
  }

  public showModal(nid: string): void {
    if (this.modalElement) {
      if (this.modalElement.nid !== nid) {
        // Remove existing iframe if it exists
        const existingIframe = this.modalElement.shadowRoot?.querySelector(
          '.capture-eye-iframe'
        );
        if (existingIframe) {
          existingIframe.remove();
        }

        // Set new nid and create a new iframe
        this.modalElement.nid = nid;
        this.createIframe(nid);
      }
      this.modalElement.modalHidden = false;
    }
  }

  public hideModal(): void {
    if (this.modalElement) {
      this.modalElement.modalHidden = true;
    }
  }

  private createIframe(nid: string): void {
    if (this.modalElement && this.modalElement.shadowRoot) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://verify.numbersprotocol.io/version-test/asset-profile/?nid=${nid}&iframe=yes`;
      iframe.width = '80%';
      iframe.height = '80%';
      iframe.allowFullscreen = true;
      iframe.className = 'capture-eye-iframe';

      // Find the modal-content div and append the iframe to it
      const modalContentDiv =
        this.modalElement.shadowRoot.querySelector('.modal-content');
      if (modalContentDiv) {
        modalContentDiv.appendChild(iframe);
      }
    }
  }
}
