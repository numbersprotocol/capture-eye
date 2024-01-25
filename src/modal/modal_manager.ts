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
      this.modalElement.nid = '';
      this.modalElement.nid = nid;
      console.log('Nid changed');
      this.modalElement.modalHidden = false;
    }
  }

  public hideModal(): void {
    if (this.modalElement) {
      this.modalElement.modalHidden = true;
    }
  }
}
