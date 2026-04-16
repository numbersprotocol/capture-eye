import { assert } from '@open-wc/testing';
import { isMobile } from '../utils';

suite('utils', () => {
  let originalUserAgentDescriptor: PropertyDescriptor | undefined;

  setup(() => {
    originalUserAgentDescriptor = Object.getOwnPropertyDescriptor(
      Navigator.prototype,
      'userAgent'
    );
  });

  teardown(() => {
    if (originalUserAgentDescriptor) {
      Object.defineProperty(
        Navigator.prototype,
        'userAgent',
        originalUserAgentDescriptor
      );
    }
  });

  function stubUserAgent(ua: string) {
    Object.defineProperty(Navigator.prototype, 'userAgent', {
      get: () => ua,
      configurable: true,
    });
  }

  test('returns true for iPhone user agent', () => {
    stubUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    );
    assert.isTrue(isMobile());
  });

  test('returns true for Android user agent', () => {
    stubUserAgent(
      'Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36'
    );
    assert.isTrue(isMobile());
  });

  test('returns true for iPad user agent', () => {
    stubUserAgent(
      'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    );
    assert.isTrue(isMobile());
  });

  test('returns true for BlackBerry user agent', () => {
    stubUserAgent(
      'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+'
    );
    assert.isTrue(isMobile());
  });

  test('returns true for Windows Phone user agent', () => {
    stubUserAgent(
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0)'
    );
    assert.isTrue(isMobile());
  });

  test('returns false for desktop Chrome user agent', () => {
    stubUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36'
    );
    // In the test environment screen.width is >= 768, so this should return false
    assert.isFalse(isMobile());
  });

  test('returns false for desktop Firefox user agent', () => {
    stubUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0'
    );
    assert.isFalse(isMobile());
  });

  test('returns false for macOS Safari user agent', () => {
    stubUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15'
    );
    assert.isFalse(isMobile());
  });
});
