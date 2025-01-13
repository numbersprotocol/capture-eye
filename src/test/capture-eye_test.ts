import { CaptureEye } from '../capture-eye';
import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';

suite('capture-eye', () => {
  test('is defined', () => {
    const el = document.createElement('capture-eye');
    assert.instanceOf(el, CaptureEye);
  });

  test('renders with default properties', async () => {
    const el = await fixture<CaptureEye>(html`<capture-eye></capture-eye>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="capture-eye-container">
        <slot></slot>
      </div>
      `
    );
  });

  test('renders button when nid is set', async () => {
    const el = await fixture<CaptureEye>(
      html`<capture-eye nid="12345"></capture-eye>`
    );
    const button = el.shadowRoot?.querySelector('.capture-eye-button');
    assert.isNotNull(button, 'Button should be rendered');
  });

  test('button click triggers openEye function', async () => {
    const spy = sinon.spy(CaptureEye.prototype, 'openEye');
    const el = await fixture<CaptureEye>(
      html`<capture-eye nid="12345"></capture-eye>`
    );
    const button = el.shadowRoot?.querySelector('.capture-eye-button');
    button?.dispatchEvent(new MouseEvent('click'));
    assert.isTrue(spy.calledOnce, 'openEye should be called once');
    spy.restore();
  });

  test('button active state changes on mouse enter/leave', async () => {
    const el = await fixture<CaptureEye>(
      html`<capture-eye nid="12345"><div></div></capture-eye>`
    );
    const button = el.shadowRoot?.querySelector(
      '.capture-eye-button'
    ) as HTMLElement;
    const slot = el.shadowRoot?.querySelector('slot');

    slot?.dispatchEvent(new MouseEvent('mouseenter'));
    assert.isTrue(
      button.classList.contains('active'),
      `Button should be active on mouse enter`
    );

    slot?.dispatchEvent(new MouseEvent('mouseleave'));
    assert.isFalse(
      button.classList.contains('active'),
      'Button should not be active on mouse leave'
    );
  });

  test('loadFontFace function is called on initialization', async () => {
    const spy = sinon.spy(CaptureEye.prototype as any, 'loadFontFace');
    await fixture<CaptureEye>(html`<capture-eye></capture-eye>`);
    assert.isTrue(spy.calledOnce, 'loadFontFace should be called once');
    spy.restore();
  });

  test('clicking button invokes openEye but not outer div click', async () => {
    const spyOpenEye = sinon.spy(CaptureEye.prototype, 'openEye');
    const captureEye = await fixture(html`
      <capture-eye nid="12345">
        <div class="inner-div">Click me</div>
      </capture-eye>
    `);
    const outerDiv = document.createElement('div');
    outerDiv.appendChild(captureEye);
    const button = captureEye.shadowRoot?.querySelector('.capture-eye-button');
    const spyOuterDiv = sinon.spy();
    outerDiv.addEventListener('click', spyOuterDiv);

    // Click the button
    button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // Assert that openEye was called
    assert.isTrue(spyOpenEye.calledOnce, 'openEye should be called once');

    // Assert that the outer div click event was not triggered
    assert.isFalse(
      spyOuterDiv.called,
      'Outer div click event should not be triggered'
    );
    spyOpenEye.restore();
  });

  test('clicking innter div invokes outer div click but not openEye', async () => {
    const spyOpenEye = sinon.spy(CaptureEye.prototype, 'openEye');
    const captureEye = await fixture(html`
      <capture-eye nid="12345">
        <div class="inner-div">Click me</div>
      </capture-eye>
    `);
    const outerDiv = document.createElement('div');
    outerDiv.appendChild(captureEye);
    const innerDiv = outerDiv.querySelector('.inner-div');
    if (!innerDiv) throw new Error('Inner div not found');
    const spyOuterDiv = sinon.spy();
    outerDiv.addEventListener('click', spyOuterDiv);

    // Click the button
    innerDiv.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // Assert that openEye was not called
    assert.isFalse(spyOpenEye.called, 'openEye should not be called');

    // Assert that the outer div click event was triggered once
    assert.isTrue(
      spyOuterDiv.calledOnce,
      'Outer div click event should be triggered once'
    );
    spyOpenEye.restore();
  });

  test('button should change when its visibility is set to always', async () => {
    const captureEye = await fixture<CaptureEye>(html`
      <capture-eye nid="12345" visibility="always">
        <div></div>
      </capture-eye>
    `);
    const button = captureEye.shadowRoot?.querySelector('.capture-eye-button') as HTMLElement;

    assert.isFalse(
      button.classList.contains('full-visibility'),
      'Button should not be fully visible beforehand'
    );

    const slot = captureEye.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    const div = slot.assignedNodes({ flatten: true }).find((node) => {
      return node.nodeType === Node.ELEMENT_NODE && node.nodeName == 'DIV'
    }) as HTMLElement;

    // Simulate a size change
    div.style.width = '50px';
    div.style.height = '50px';

    // Wait a ResizeObserver callback
    await new Promise((resolve) => setTimeout(resolve, 50));
    await captureEye.updateComplete;

    assert.isTrue(
      button.classList.contains('full-visibility'),
      'Button should be fully visible afterhand'
    );
  });
});
