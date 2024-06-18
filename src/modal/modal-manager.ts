import { Constant } from '../constant.js';
import { CaptureEyeModal } from './modal.js';

export class ModalManager {
  private static instance: ModalManager;
  private modalElement: CaptureEyeModal | null = null;

  private constructor() {}

  get isHidden() {
    if (this.modalElement) return this.modalElement.modalHidden;
    return true;
  }

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
    position: { top: number; left: number }
  ): void {
    if (this.modalElement) {
      this.positionModal(position);
      this.modalElement.modalHidden = false;

      if (this.modalElement.nid !== nid) {
        this.modalElement.nid = nid;
        this.modalElement.layout = layout;
        this.modalElement.resetModalProps();
        this.fetchAssetData(nid).then((assetData) =>
          this.updateModalProperties(assetData)
        );
      }
    }
  }

  private positionModal(position: { top: number; left: number }): void {
    if (this.modalElement) {
      // Update modal position styles
      this.modalElement.style.position = 'absolute';
      this.modalElement.style.top = `${position.top}px`;
      this.modalElement.style.left = `${position.left}px`;
      this.modalElement.style.transform = 'none'; // Ensure no additional translation
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

      const fullAssetTree = data.fullAssetTree || {};
      const {
        '_api_c2_assetTree.assetCreator': assetCreator = '',
        '_api_c2_assetTree.assetTimestampCreatedReadable': assetTimestamp = '',
        '_api_c2_assetTree.assetSourceType': assetSourceType = '',
        '_api_c2_assetTree.usedBy': assetUsedBy = '',
      } = fullAssetTree;

      const assetData: AssetData = {
        assetCreator,
        assetTimestamp,
        assetHeadline: data.headline ?? '',
        assetInitialTransaction: data.initial_transaction ?? '',
        assetThumbnailUrl: data.thumnail_url ?? '', // [sic]
        explorerUrl: data.initial_transaction
          ? `${Constant.url.explorer}/tx/${data.initial_transaction}`
          : '',
        assetSourceType,
        assetCaptureTime: data.integrity_capture_time ?? '',
        assetBackendOwnerName: data.backend_owner_name ?? '',
        assetUsedBy,
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
    this.modalElement.bannerImageSrc =
      'https://static-cdn.numbersprotocol.io/collab/defiance_media_banner.webp';
    this.modalElement.bannerLink = 'https://defiance.media/';
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
