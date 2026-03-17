import { assert } from '@open-wc/testing';
import sinon from 'sinon';
import {
  fetchAsset,
  hasNftProduct,
  fetchAssetMetadata,
} from '../asset/asset-service';
import { Constant } from '../constant';

suite('asset-service', () => {
  let fetchStub: sinon.SinonStub;

  setup(() => {
    fetchStub = sinon.stub(window, 'fetch');
  });

  teardown(() => {
    fetchStub.restore();
  });

  suite('fetchAsset', () => {
    test('maps API response fields correctly to AssetModel', async () => {
      const mockData = {
        assetCreator: 'Test Creator',
        fullAssetTree: {
          '_api_c2_assetTree.creatorWallet': '0xabc123',
          '_api_c2_assetTree.encodingFormat': 'image/jpeg',
          '_api_c2_assetTree.assetLocationCreated': 'New York, USA',
        },
        assetTimestampCreated: '2024-01-01T00:00:00Z',
        headline: 'Test Headline',
        abstract: 'Test Abstract',
        initial_transaction: '0x123abc',
        thumnail_url: 'https://example.com/thumb.jpg', // [sic] — intentional typo in the API field name
        assetSourceType: 'upload',
        integrity_capture_time: '2024-01-01T12:00:00Z',
        backend_owner_name: 'Owner Name',
        digitalSourceType: 'original',
        usedBy: 'test-user',
        captureEyeCustom: [
          {
            _api_c2_field: 'Custom Field',
            _api_c2_value: 'Custom Value',
            _api_c2_iconSource: 'https://example.com/icon.png',
            _api_c2_url: 'https://example.com',
          },
        ],
      };

      fetchStub.resolves({
        ok: true,
        json: () =>
          Promise.resolve({ response: { data: mockData } }),
      } as unknown as Response);

      const result = await fetchAsset('test-nid');

      assert.isDefined(result);
      assert.equal(result!.creator, 'Test Creator');
      assert.equal(result!.creatorWallet, '0xabc123');
      assert.equal(result!.createdTime, '2024-01-01T00:00:00Z');
      assert.equal(result!.encodingFormat, 'image/jpeg');
      assert.equal(result!.headline, 'Test Headline');
      assert.equal(result!.abstract, 'Test Abstract');
      assert.equal(result!.initialTransaction, '0x123abc');
      assert.equal(result!.thumbnailUrl, 'https://example.com/thumb.jpg');
      assert.equal(
        result!.explorerUrl,
        `${Constant.url.explorer}/tx/0x123abc`
      );
      assert.equal(result!.assetSourceType, 'upload');
      assert.equal(result!.captureTime, '2024-01-01T12:00:00Z');
      assert.equal(result!.captureLocation, 'New York, USA');
      assert.equal(result!.backendOwnerName, 'Owner Name');
      assert.equal(result!.digitalSourceType, 'original');
      assert.equal(result!.usedBy, 'test-user');
      assert.deepEqual(result!.captureEyeCustom, [
        {
          field: 'Custom Field',
          value: 'Custom Value',
          iconSource: 'https://example.com/icon.png',
          url: 'https://example.com',
        },
      ]);
    });

    test('sets explorerUrl to empty string when initial_transaction is absent', async () => {
      fetchStub.resolves({
        ok: true,
        json: () =>
          Promise.resolve({
            response: { data: { assetCreator: 'Creator' } },
          }),
      } as unknown as Response);

      const result = await fetchAsset('test-nid');
      assert.isDefined(result);
      assert.equal(result!.explorerUrl, '');
    });

    test('returns undefined on non-OK HTTP response', async () => {
      fetchStub.resolves({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: 'Not Found' }),
      } as unknown as Response);

      const result = await fetchAsset('test-nid');
      assert.isUndefined(result);
    });

    test('returns undefined on network error', async () => {
      fetchStub.rejects(new Error('Network error'));

      const result = await fetchAsset('test-nid');
      assert.isUndefined(result);
    });

    test('handles non-JSON error response body gracefully', async () => {
      fetchStub.resolves({
        ok: false,
        status: 500,
        json: () => Promise.reject(new SyntaxError('Unexpected token')),
      } as unknown as Response);

      const result = await fetchAsset('test-nid');
      assert.isUndefined(result);
    });

    test('returns undefined when data is null', async () => {
      fetchStub.resolves({
        ok: true,
        json: () => Promise.resolve({ response: { data: null } }),
      } as unknown as Response);

      const result = await fetchAsset('test-nid');
      assert.isUndefined(result);
    });
  });

  suite('hasNftProduct', () => {
    test('returns true when count is greater than zero', async () => {
      fetchStub.resolves({
        ok: true,
        json: () => Promise.resolve({ count: 3 }),
      } as unknown as Response);

      const result = await hasNftProduct('test-nid');
      assert.isTrue(result);
    });

    test('returns false when count is zero', async () => {
      fetchStub.resolves({
        ok: true,
        json: () => Promise.resolve({ count: 0 }),
      } as unknown as Response);

      const result = await hasNftProduct('test-nid');
      assert.isFalse(result);
    });

    test('returns false on non-OK HTTP response', async () => {
      fetchStub.resolves({
        ok: false,
        status: 404,
        json: () =>
          Promise.resolve({
            error: { type: 'NotFound', message: 'Not found' },
          }),
      } as unknown as Response);

      const result = await hasNftProduct('test-nid');
      assert.isFalse(result);
    });

    test('returns false on network error', async () => {
      fetchStub.rejects(new Error('Network error'));

      const result = await hasNftProduct('test-nid');
      assert.isFalse(result);
    });
  });

  suite('fetchAssetMetadata', () => {
    test('returns hasC2pa true and showcaseLink when owner_name is present', async () => {
      fetchStub.resolves({
        ok: true,
        json: () =>
          Promise.resolve({ c2pa: true, owner_name: 'TestOwner' }),
      } as unknown as Response);

      const result = await fetchAssetMetadata('test-nid');
      assert.isDefined(result);
      assert.isTrue(result!.hasC2pa);
      assert.equal(
        result!.showcaseLink,
        `${Constant.url.showcase}/testowner`
      );
    });

    test('returns hasC2pa false when c2pa field is not true', async () => {
      fetchStub.resolves({
        ok: true,
        json: () =>
          Promise.resolve({ c2pa: false, owner_name: 'TestOwner' }),
      } as unknown as Response);

      const result = await fetchAssetMetadata('test-nid');
      assert.isDefined(result);
      assert.isFalse(result!.hasC2pa);
    });

    test('returns showcaseLink as undefined when owner_name is absent', async () => {
      fetchStub.resolves({
        ok: true,
        json: () => Promise.resolve({ c2pa: true }),
      } as unknown as Response);

      const result = await fetchAssetMetadata('test-nid');
      assert.isDefined(result);
      assert.isTrue(result!.hasC2pa);
      assert.isUndefined(result!.showcaseLink);
    });

    test('returns undefined on non-OK HTTP response', async () => {
      fetchStub.resolves({
        ok: false,
        status: 403,
        json: () =>
          Promise.resolve({
            error: { type: 'Forbidden', message: 'Forbidden' },
          }),
      } as unknown as Response);

      const result = await fetchAssetMetadata('test-nid');
      assert.isUndefined(result);
    });

    test('returns undefined on network error', async () => {
      fetchStub.rejects(new Error('Network error'));

      const result = await fetchAssetMetadata('test-nid');
      assert.isUndefined(result);
    });
  });
});
