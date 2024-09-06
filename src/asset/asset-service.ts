import { Constant } from '../constant';
import { AssetModel } from './asset-model';

export async function fetchAsset(nid: string): Promise<AssetModel | undefined> {
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

    const assetModel: AssetModel = {
      creator: data.assetCreator,
      createdTime: data.assetTimestampCreated,
      headline: data.headline,
      initialTransaction: data.initial_transaction,
      thumbnailUrl: data.thumnail_url, // [sic]
      explorerUrl: data.initial_transaction
        ? `${Constant.url.explorer}/tx/${data.initial_transaction}`
        : '',
      assetSourceType: data.assetSourceType,
      captureTime: data.integrity_capture_time,
      backendOwnerName: data.backend_owner_name,
      usedBy: data.usedBy,
      captureEyeCustom:
        data.fullAssetTree?.['_api_c2_assetTree.captureEyeCustom'],
    };

    console.debug(assetModel);
    return assetModel;
  } catch (error) {
    console.error('Fetch error:', error);
    return;
  }
}

export async function hasNftProduct(nid: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${Constant.url.productApi}?nid=${nid}&available=true&limit=1`,
      { method: 'GET' }
    );

    if (response.ok) {
      const { count } = await response.json();
      return count > 0;
    }

    const errorResponse = await response.json();
    console.error(
      `Error ${response.status}: ${errorResponse?.error?.type} ${errorResponse?.error?.message}`
    );
  } catch (error) {
    console.error('Fetch error:', error);
  }
  return false;
}
