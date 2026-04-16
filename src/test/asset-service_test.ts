import { assert } from '@open-wc/testing';
import sinon from 'sinon';
import { fetchAsset, hasNftProduct } from '../asset/asset-service';
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
      const mockResponse = {
        nit_commit_custom: {
          assetCreator: 'Test Creator',
          creatorWallet: '0xabc123',
          assetLocationCreated: 'New York, USA',
          assetSourceType: 'upload',
          usedBy: 'test-user',
          captureEyeCustom: [
            {
              field: 'Custom Field',
              value: 'Custom Value',
              iconSource: 'https://example.com/icon.png',
              url: 'https://example.com',
            },
          ],
        },
        signed_metadata: JSON.stringify({ created_at: 1704067200 }),
        integrity_info: [
          {
            search_id: '0x123abc',
            explorer_url: 'https://mainnet.num.network/tx/0x123abc',
          },
        ],
        uploaded_at: '2024-01-01T00:00:00Z',
        asset_file_mime_type: 'image/jpeg',
        headline: 'Test Headline',
        caption: 'Test Abstract',
        asset_file_thumbnail: 'https://example.com/thumb.jpg',
        digital_source_type: 'original',
        owner_name: 'TestOwner',
        owner_profile_display_name: 'Owner Display Name',
        c2pa: true,
      };

      fetchStub.resolves({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as unknown as Response);

      const result = await fetchAsset('test-nid');

      assert.isDefined(result);
      assert.equal(result!.creator, 'Test Creator');
      assert.equal(result!.creatorWallet, '0xabc123');
      assert.equal(
        result!.createdTime,
        new Date('2024-01-01T00:00:00Z').toUTCString()
      );
      assert.equal(result!.encodingFormat, 'image/jpeg');
      assert.equal(result!.headline, 'Test Headline');
      assert.equal(result!.abstract, 'Test Abstract');
      assert.equal(result!.initialTransaction, '0x123abc');
      assert.equal(result!.thumbnailUrl, 'https://example.com/thumb.jpg');
      assert.equal(
        result!.explorerUrl,
        'https://mainnet.num.network/tx/0x123abc'
      );
      assert.equal(result!.assetSourceType, 'upload');
      assert.equal(
        result!.captureTime,
        new Date(1704067200 * 1000).toUTCString()
      );
      assert.equal(result!.captureLocation, 'New York, USA');
      assert.equal(result!.backendOwnerName, 'Owner Display Name');
      assert.equal(result!.digitalSourceType, 'original');
      assert.equal(result!.usedBy, 'test-user');
      assert.isTrue(result!.hasC2pa);
      assert.equal(
        result!.showcaseLink,
        `${Constant.url.showcase}/testowner`
      );
      assert.deepEqual(result!.captureEyeCustom, [
        {
          field: 'Custom Field',
          value: 'Custom Value',
          iconSource: 'https://example.com/icon.png',
          url: 'https://example.com',
        },
      ]);
    });

    test('sets explorerUrl to empty string when integrity_info is absent', async () => {
      fetchStub.resolves({
        ok: true,
        json: () =>
          Promise.resolve({
            creator_name: 'Creator',
          }),
      } as unknown as Response);

      const result = await fetchAsset('test-nid');
      assert.isDefined(result);
      assert.equal(result!.explorerUrl, '');
      assert.isUndefined(result!.initialTransaction);
    });

    test('falls back creator through priority chain', async () => {
      // No nit_commit_custom.assetCreator → fallback to creator_profile_display_name
      fetchStub.resolves({
        ok: true,
        json: () =>
          Promise.resolve({
            creator_profile_display_name: 'Display Name',
            creator_name: 'Username',
          }),
      } as unknown as Response);

      const result = await fetchAsset('test-nid');
      assert.isDefined(result);
      assert.equal(result!.creator, 'Display Name');
    });

    test('returns hasC2pa and showcaseLink fields', async () => {
      fetchStub.resolves({
        ok: true,
        json: () =>
          Promise.resolve({
            c2pa: true,
            owner_name: 'TestOwner',
            owner_profile_display_name: 'Owner Display',
          }),
      } as unknown as Response);

      const result = await fetchAsset('test-nid');
      assert.isDefined(result);
      assert.isTrue(result!.hasC2pa);
      assert.equal(
        result!.showcaseLink,
        `${Constant.url.showcase}/testowner`
      );
      assert.equal(result!.backendOwnerName, 'Owner Display');
    });

    test('showcaseLink is undefined when owner_name is absent', async () => {
      fetchStub.resolves({
        ok: true,
        json: () =>
          Promise.resolve({
            c2pa: false,
            owner_profile_display_name: 'Owner Display',
          }),
      } as unknown as Response);

      const result = await fetchAsset('test-nid');
      assert.isDefined(result);
      assert.isFalse(result!.hasC2pa);
      assert.isUndefined(result!.showcaseLink);
    });

    test('returns undefined on non-OK HTTP response', async () => {
      fetchStub.resolves({
        ok: false,
        status: 404,
        json: () =>
          Promise.resolve({
            error: { type: 'NotFound', message: 'Not Found' },
          }),
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

    test('returns undefined when response body is null', async () => {
      fetchStub.resolves({
        ok: true,
        json: () => Promise.resolve(null),
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
});
