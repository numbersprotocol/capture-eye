export interface AssetModel {
  creator?: string;
  createdTime?: string;
  headline?: string;
  initialTransaction?: string;
  thumbnailUrl?: string;
  explorerUrl?: string;
  assetSourceType?: string;
  captureTime?: string;
  captureLocation?: string;
  backendOwnerName?: string;
  usedBy?: string;
  captureEyeCustom?: Array<CaptureEyeCustomItem>;
  hasNftProduct?: boolean;
}

export interface CaptureEyeCustomItem {
  field?: string;
  value?: string;
  iconSource?: string;
  url?: string;
}
