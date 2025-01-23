import { Constant } from '../constant';
import { AssetModel, CaptureEyeCustomItem } from './asset-model';

export async function downloadC2pa(
  nid: string, scopeToken: string | null
): Promise<string | undefined> {
  if (!scopeToken) {
    console.log('Skip downloading C2PA');
    return;
  }

  try {
    const headers = {
      Authorization: `Bearer ${scopeToken}`,
    };

    const response = await fetch(`${Constant.url.assetApi}${nid}/c2pa/`, {
      method: 'POST',
      headers: headers,
    });

    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP ${response.status}: ` +
          `${errorResponse?.error?.type} ${errorResponse?.error?.message}`
        );
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const { url } = await response.json();
    return url as string;
  } catch (error) {
    console.error('Download C2PA error:', error);
    return;
  }
}

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

    const captureEyeCustom: CaptureEyeCustomItem[] | undefined =
      data.captureEyeCustom?.map(
        (custom: {
          _api_c2_field?: string;
          _api_c2_value?: string;
          _api_c2_iconSource?: string;
          _api_c2_url?: string;
        }) => ({
          field: custom._api_c2_field,
          value: custom._api_c2_value,
          iconSource: custom._api_c2_iconSource,
          url: custom._api_c2_url,
        })
      );

    const assetModel: AssetModel = {
      creator: data.assetCreator,
      creatorWallet: data.fullAssetTree?.['_api_c2_assetTree.creatorWallet'],
      createdTime: data.assetTimestampCreated,
      encodingFormat: data.fullAssetTree?.['_api_c2_assetTree.encodingFormat'],
      headline: data.headline,
      abstract: data.abstract,
      initialTransaction: data.initial_transaction,
      thumbnailUrl: data.thumnail_url, // [sic]
      explorerUrl: data.initial_transaction
        ? `${Constant.url.explorer}/tx/${data.initial_transaction}`
        : '',
      assetSourceType: data.assetSourceType,
      captureTime: data.integrity_capture_time,
      captureLocation:
        data.fullAssetTree?.['_api_c2_assetTree.assetLocationCreated'],
      backendOwnerName: data.backend_owner_name,
      digitalSourceType: data.digitalSourceType,
      usedBy: data.usedBy,
      captureEyeCustom,
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

export async function getUsername(nid: string): Promise<string | undefined> {
  try {
    const response = await fetch(`${Constant.url.assetApi}${nid}/`, {
      method: 'GET',
    });

    if (response.ok) {
      const responseJson = await response.json();
      return `${responseJson.owner_name}`;
    }

    const errorResponse = await response.json();
    console.error(
      `Error ${response.status}: ${errorResponse?.error?.type} ${errorResponse?.error?.message}`
    );
  } catch (error) {
    console.error('Fetch error:', error);
  }
  return;
}
