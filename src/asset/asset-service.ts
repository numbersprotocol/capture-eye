import { Constant } from '../constant';
import { AssetModel, CaptureEyeCustomItem } from './asset-model';

// Injected by rollup at build time from package.json
declare const __CAPTURE_EYE_VERSION__: string;
const VERSION =
  typeof __CAPTURE_EYE_VERSION__ !== 'undefined'
    ? __CAPTURE_EYE_VERSION__
    : 'dev';

/**
 * Format a timestamp (seconds or milliseconds) to a human-readable GMT string.
 * Handles both Unix seconds and milliseconds.
 */
function formatTimestampGmt(timestamp: number): string {
  // If timestamp > 10 digits, treat as milliseconds; otherwise seconds
  const ms = timestamp > 9999999999 ? timestamp : timestamp * 1000;
  const date = new Date(ms);
  return date.toUTCString();
}

/**
 * Format an ISO date string to a human-readable GMT string.
 */
function formatIsoDateGmt(isoDate?: string): string | undefined {
  if (!isoDate) return undefined;
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return undefined;
  return date.toUTCString();
}

/**
 * Reverse geocode latitude and longitude into a human-readable address
 * using OpenStreetMap Nominatim. Falls back to coordinate string on failure.
 */
async function reverseGeocode(
  lat?: number | string,
  lng?: number | string
): Promise<string | undefined> {
  if (lat == null || lng == null) return undefined;
  const latNum = typeof lat === 'string' ? parseFloat(lat) : lat;
  const lngNum = typeof lng === 'string' ? parseFloat(lng) : lng;
  if (isNaN(latNum) || isNaN(lngNum)) return undefined;

  const coordFallback = `${latNum.toFixed(4)}, ${lngNum.toFixed(4)}`;
  try {
    const url =
      `https://nominatim.openstreetmap.org/reverse` +
      `?lat=${latNum}&lon=${lngNum}&format=json&zoom=10&accept-language=en`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const response = await fetch(url, {
      headers: { 'User-Agent': `CaptureEye/${VERSION}` },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) return coordFallback;
    const data = await response.json();
    return data?.display_name || coordFallback;
  } catch {
    return coordFallback;
  }
}

/**
 * Safely parse signed_metadata JSON string.
 */
function parseSignedMetadata(
  raw?: string
): Record<string, unknown> | undefined {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
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
        `Error ${response.status}: ${errorResponse?.error?.type} ${errorResponse?.error?.message}`
      );
      return;
    }

    const data: any = await response.json();
    console.debug(data);

    const nitCustom: any = data.nit_commit_custom ?? {};
    const signedMeta: any = parseSignedMetadata(data.signed_metadata);
    const initialTx = data.integrity_info?.[0];

    // captureTime: from signed_metadata.created_at (seconds or ms)
    const captureTimeRaw = signedMeta?.created_at;
    const captureTime =
      typeof captureTimeRaw === 'number'
        ? formatTimestampGmt(captureTimeRaw)
        : undefined;

    // captureLocation: nit_commit_custom.assetLocationCreated, or reverse geocode from signed_metadata
    const captureLocation =
      nitCustom.assetLocationCreated ??
      (await reverseGeocode(
        signedMeta?.location_latitude,
        signedMeta?.location_longitude
      ));

    // creator: nit_commit_custom.assetCreator > creator_profile_display_name > creator_name > nft_creator_address
    const creator =
      nitCustom.assetCreator ??
      data.creator_profile_display_name ??
      data.creator_name ??
      data.nft_creator_address;

    // creatorWallet: nit_commit_custom.creatorWallet > creator_addresses.asset_wallet_address
    const creatorWallet =
      nitCustom.creatorWallet ??
      data.creator_addresses?.asset_wallet_address;

    // backendOwnerName: prefer display name for UI presentation
    const ownerName = data.owner_profile_display_name ?? data.owner_name;
    // showcaseLink: intentionally uses owner_name (username slug) instead of
    // owner_profile_display_name, because the showcase URL path requires the
    // account username, not the display name.
    const showcaseLink = data.owner_name
      ? `${Constant.url.showcase}/${data.owner_name.toLowerCase()}`
      : undefined;

    // captureEyeCustom: directly from nit_commit_custom.captureEyeCustom
    const captureEyeCustom: CaptureEyeCustomItem[] | undefined =
      nitCustom.captureEyeCustom;

    const assetModel: AssetModel = {
      creator,
      creatorWallet,
      createdTime: formatIsoDateGmt(data.uploaded_at),
      encodingFormat: data.asset_file_mime_type,
      headline: data.headline,
      abstract: data.caption,
      initialTransaction: initialTx?.search_id,
      thumbnailUrl: data.asset_file_thumbnail,
      explorerUrl: initialTx?.explorer_url ?? '',
      assetSourceType: nitCustom.assetSourceType ?? data.origin_type,
      captureTime,
      captureLocation,
      backendOwnerName: ownerName,
      digitalSourceType: data.digital_source_type,
      usedBy: nitCustom.usedBy,
      captureEyeCustom,
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
