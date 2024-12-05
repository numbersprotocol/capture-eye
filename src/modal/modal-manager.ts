import { CaptureEyeModal, ModalOptions } from './modal.js';
import { AssetModel } from '../asset/asset-model.js';
import {
  fetchAsset,
  hasNftProduct,
  getUsername,
} from '../asset/asset-service.js';
import interactionTracker, { TrackerEvent } from './interaction-tracker.js';
import { Constant } from '../constant.js';

export class ModalManager {
  private static instance: ModalManager;
  private modalElement: CaptureEyeModal | null = null;

  private constructor() {
    interactionTracker.trackInteraction(TrackerEvent.SCRIPT);
  }

  get nid() {
    return this?.modalElement?.nid ?? '';
  }

  get modalHidden() {
    return this?.modalElement?.modalHidden ?? true;
  }

  static getInstance(): ModalManager {
    if (!ModalManager.instance) {
      ModalManager.instance = new ModalManager();
    }
    return ModalManager.instance;
  }

  async updateModal(options: ModalOptions, delay = 150): Promise<void> {
    let modal = this.getModal();
    modal.modalHidden = true;
    await new Promise((resolve) => setTimeout(resolve, delay));
    const nidChanged = modal.nid !== options.nid;
    if (nidChanged) {
      modal.clearModalOptions();
      this.removeModal();
      modal = this.getModal();
    }
    modal.modalHidden = false;
    this.registerRootClickListener();
    modal.updateModalOptions(options);

    if (nidChanged) {
      fetchAsset(options.nid).then((assetData) => {
        this.updateModalAsset(assetData, true);
      });
      getUsername(options.nid).then((username) => {
        if (username) {
          const showcaseLink = `${
            Constant.url.showcase
          }/${username.toLowerCase()}`;
          this.updateModalAsset({ showcaseLink }, false);
        }
      });
      hasNftProduct(options.nid).then((hasNftProduct) =>
        this.updateModalAsset({ hasNftProduct }, false)
      );
    }
  }

  removeModal(): void {
    if (!this.modalElement) return;
    this.modalElement.modalHidden = true;
    this.unregisterRootClickListener();
    this.modalElement.remove();
    this.modalElement = null;
  }

  private getModal(): CaptureEyeModal {
    if (!this.modalElement) {
      this.modalElement = document.createElement('capture-eye-modal');
      this.modalElement.addEventListener('remove-capture-eye-modal', () => {
        this.removeModal();
      });
      document.body.appendChild(this.modalElement);
      return this.modalElement;
    }
    return this.modalElement;
  }

  private updateModalAsset(
    assetModel: AssetModel | undefined,
    setAsLoaded: boolean
  ) {
    if (!this.modalElement || !assetModel) return;
    this.modalElement.updateAsset(assetModel, setAsLoaded);
  }

  private registerRootClickListener() {
    document.body.addEventListener('click', this.handleRootClick);
  }

  private unregisterRootClickListener() {
    document.body.removeEventListener('click', this.handleRootClick);
  }

  private handleRootClick = (event: MouseEvent) => {
    const modal = this.getModal();
    if (!modal.contains(event.target as Node)) {
      this.removeModal();
    }
  };
}
