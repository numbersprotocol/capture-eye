import { CaptureEyeModal } from './modal.js';
import { AssetModel } from '../asset/asset-model.js';
import { fetchAsset, hasNftProduct } from '../asset/asset-service.js';
import interactionTracker, { TrackerEvent } from './interaction-tracker.js';

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

  public updateModal(
    nid: string,
    layout: string,
    engagementImage: string,
    engagementLink: string,
    actionButtonText: string,
    actionButtonLink: string,
    position: { top: number; left: number }
  ): void {
    if (this.modalElement) {
      this.positionModal(position);
      this.modalElement.modalHidden = false;
      this.registerRootClickListener();

      if (this.modalElement.nid !== nid) {
        this.modalElement.resetModalProps();
        this.modalElement.nid = nid;
        this.modalElement.layout = layout;
        this.modalElement.updateEngagementZone(
          engagementImage,
          engagementLink,
          actionButtonText,
          actionButtonLink
        );
        fetchAsset(nid).then((assetData) =>
          this.updateModalAsset(assetData, true)
        );
        hasNftProduct(nid).then((hasNftProduct) =>
          this.updateModalAsset({ hasNftProduct }, false)
        );
      }
    }
  }

  public updateModalWithDelay(
    nid: string,
    layout: string,
    engagementImage: string,
    engagementLink: string,
    actionButtonText: string,
    actionButtonLink: string,
    position: { top: number; left: number }
  ): void {
    if (!this.modalElement) return;
    this.modalElement.modalHidden = true;
    setTimeout(
      () =>
        this.updateModal(
          nid,
          layout,
          engagementImage,
          engagementLink,
          actionButtonText,
          actionButtonLink,
          position
        ),
      150
    );
  }

  private remToPixels(rem: number): number {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  private positionModal(position: { top: number; left: number }): void {
    if (this.modalElement) {
      const remOffset = this.remToPixels(1); // Convert 1rem to pixels

      // Update modal position styles with 1rem offset
      this.modalElement.style.position = 'absolute';
      this.modalElement.style.top = `${position.top + remOffset}px`;
      this.modalElement.style.left = `${position.left + remOffset}px`;
    }
  }

  public hideModal(): void {
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
