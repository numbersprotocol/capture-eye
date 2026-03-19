import { Constant } from '../constant';
import { AssetModel } from './asset-model';

/**
 * Format a Unix timestamp (seconds) to a readable date string.
 */
function formatTimestamp(unixSeconds: number): string {
  const date = new Date(unixSeconds * 1000);
  return date.toISOString().split('T')[0];
}

/**
 * Format latitude and longitude into a readable location string.
 */
function formatLocation(lat?: string, lng?: string): string | undefined {
  if (!lat || !lng) return undefined;
  return `${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}`;
}

/**
 * Format an ISO date string to a readable date string.
 */
function formatIsoDate(isoDate?: string): string | undefined {
  if (!isoDate) return undefined;
  return isoDate.split('T')[0];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchAsset(
  nid: string
): Promise<AssetModel | undefined> {
  try {
    const response = await fetch(`${Constant.url.assetApi}${nid}/`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error(
        `Error ${response.status}: ${errorResponse?.detail ?? errorResponse?.message}`
      );
      return;
    }

    const data: any = await response.json();
    console.debug(data);

    const initialTx = data.integrity_info?.[0];
    const captureTime = data.parsed_meta?.capture_time
      ? formatTimestamp(data.parsed_meta.capture_time)
      : undefined;
    const showcaseLink = data.owner_name
      ? `${Constant.url.showcase}/${data.owner_name.toLowerCase()}`
      : undefined;

    const assetModel: AssetModel = {
      creator: data.creator_name,
      creatorWallet:
        data.nit_commit_custom?.creatorWallet ??
        data.creator_addresses?.managed_wallet_address,
      createdTime: formatIsoDate(data.uploaded_at),
      encodingFormat: data.asset_file_mime_type,
      headline: data.headline || data.caption,
      abstract: data.caption,
      initialTransaction: initialTx?.search_id,
      thumbnailUrl: data.asset_file_thumbnail,
      explorerUrl: initialTx?.explorer_url ?? '',
      assetSourceType: data.source_type,
      captureTime,
      captureLocation: formatLocation(
        data.parsed_meta?.capture_latitude,
        data.parsed_meta?.capture_longitude
      ),
      backendOwnerName: data.owner_name,
      digitalSourceType: data.digital_source_type,
      usedBy: data.nit_commit_custom?.usedBy,
      hasC2pa: data.c2pa === true,
      showcaseLink,
    };

    console.debug(assetModel);
    return assetModel;
  } catch (error) {
    console.error('Fetch error:', error);
    return;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

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
