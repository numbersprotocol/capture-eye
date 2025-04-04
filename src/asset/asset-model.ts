export interface AssetModel {
  creator?: string;
  creatorWallet?: string;
  createdTime?: string;
  encodingFormat?: string;
  headline?: string;
  abstract?: string;
  initialTransaction?: string;
  thumbnailUrl?: string;
  explorerUrl?: string;
  assetSourceType?: string;
  captureTime?: string;
  captureLocation?: string;
  backendOwnerName?: string;
  digitalSourceType?: string;
  usedBy?: string;
  captureEyeCustom?: Array<CaptureEyeCustomItem>;
  hasNftProduct?: boolean;
  showcaseLink?: string;
}

export interface CaptureEyeCustomItem {
  field?: string;
  value?: string;
  iconSource?: string;
  url?: string;
}
