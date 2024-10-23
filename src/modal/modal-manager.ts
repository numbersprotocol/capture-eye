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

  initializeModal(): void {
    if (!this.modalElement) {
      this.modalElement = document.createElement('capture-eye-modal');
      document.body.appendChild(this.modalElement);
    }
  }

  async updateModal(options: ModalOptions, delay = 150): Promise<void> {
    if (!this.modalElement) return;
    this.modalElement.modalHidden = true;
    await new Promise((resolve) => setTimeout(resolve, delay));
    const nidChanged = this.modalElement.nid !== options.nid;
    if (nidChanged) {
      this.modalElement.clearModalOptions();
    }
    this.modalElement.modalHidden = false;
    this.registerRootClickListener();
    this.modalElement.updateModalOptions(options);

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

  hideModal(): void {
    if (this.modalElement) {
      this.modalElement.modalHidden = true;
      this.unregisterRootClickListener();
    }
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
    if (
      this.modalElement &&
      !this.modalElement.contains(event.target as Node)
    ) {
      this.hideModal();
    }
  };
}
