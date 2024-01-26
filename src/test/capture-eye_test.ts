import { CaptureEye } from '../capture-eye';

import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('capture-eye', () => {
  test('is defined', () => {
    const el = document.createElement('capture-eye');
    assert.instanceOf(el, CaptureEye);
  });

  test('styling applied', async () => {
    const el = (await fixture(html`<capture-eye></capture-eye>`)) as CaptureEye;
    await el.updateComplete;
    assert.equal(
      getComputedStyle(el).fontFamily.includes('Degular-Medium'),
      true
    );
  });
});
