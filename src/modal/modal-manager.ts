import { Constant } from '../constant.js';
import { CaptureEyeModal } from './modal.js';

export class ModalManager {
  private static instance: ModalManager;
  private modalElement: CaptureEyeModal | null = null;

  private constructor() {}

  get nid() {
    return this?.modalElement?.nid ?? '';
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

      if (this.modalElement.nid !== nid) {
        this.modalElement.resetModalProps();
        this.modalElement.nid = nid;
        this.modalElement.layout = layout;
        this.modalElement.engagementImage = engagementImage;
        this.modalElement.engagementLink = engagementLink;
        this.modalElement.actionButtonText = actionButtonText;
        this.modalElement.actionButtonLink = actionButtonLink;
        this.fetchAssetData(nid).then((assetData) =>
          this.updateModalProperties(assetData)
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
    }
  }

  private async fetchAssetData(nid: string): Promise<AssetData | undefined> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(`${Constant.url.dataApi}?nid=${nid}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error(`Error ${response.status}: ${errorResponse.message}`);
        return;
      }

      const {
        response: { data },
      } = await response.json();
      console.debug(data);

      if (!data) return;

      const assetData: AssetData = {
        assetCreator: data.assetCreator ?? '',
        assetTimestamp: data.assetTimestampCreated ?? '',
        assetHeadline: data.headline ?? '',
        assetInitialTransaction: data.initial_transaction ?? '',
        assetThumbnailUrl: data.thumnail_url ?? '', // [sic]
        explorerUrl: data.initial_transaction
          ? `${Constant.url.explorer}/tx/${data.initial_transaction}`
          : '',
        assetSourceType: data.assetSourceType ?? '',
        assetCaptureTime: data.integrity_capture_time ?? '',
        assetBackendOwnerName: data.backend_owner_name ?? '',
        assetUsedBy: data.usedBy ?? '',
      };

      console.debug(assetData);
      return assetData;
    } catch (error) {
      console.error('Fetch error:', error);
      return;
    }
  }

  private updateModalProperties(assetData: AssetData | undefined) {
    if (!this.modalElement || !assetData) return;
    this.modalElement.creatorName = assetData.assetCreator;
    this.modalElement.date = assetData.assetTimestamp;
    this.modalElement.headline = assetData.assetHeadline;
    this.modalElement.blockchain = 'Numbers Mainnet';
    this.modalElement.transaction = assetData.assetInitialTransaction;
    this.modalElement.thumbnailUrl = assetData.assetThumbnailUrl;
    this.modalElement.explorerUrl = assetData.explorerUrl;
    this.modalElement.assetSourceType = assetData.assetSourceType;
    this.modalElement.captureTime = assetData.assetCaptureTime;
    this.modalElement.backendOwnerName = assetData.assetBackendOwnerName;
    this.modalElement.usedBy = assetData.assetUsedBy;
  }
}

interface AssetData {
  assetCreator: string;
  assetTimestamp: string;
  assetHeadline: string;
  assetInitialTransaction: string;
  assetThumbnailUrl: string;
  explorerUrl: string;
  assetSourceType: string;
  assetCaptureTime: string;
  assetBackendOwnerName: string;
  assetUsedBy: string;
}
