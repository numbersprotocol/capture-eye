export interface AssetModel {
  creator?: string;
  createdTime?: string;
  headline?: string;
  initialTransaction?: string;
  thumbnailUrl?: string;
  explorerUrl?: string;
  assetSourceType?: string;
  captureTime?: string;
  backendOwnerName?: string;
  usedBy?: string;
  captureEyeCustom?: Array<{
    field: string;
    value: string;
    iconSource?: string;
    url?: string;
  }>;
  hasNftProduct?: boolean;
}
