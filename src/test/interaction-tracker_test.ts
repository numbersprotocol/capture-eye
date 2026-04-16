import { assert } from '@open-wc/testing';
import sinon from 'sinon';
import interactionTracker, { TrackerEvent } from '../modal/interaction-tracker';

suite('interaction-tracker', () => {
  let fetchStub: sinon.SinonStub;

  setup(() => {
    fetchStub = sinon.stub(window, 'fetch');
    sessionStorage.clear();
  });

  teardown(() => {
    fetchStub.restore();
    sessionStorage.clear();
  });

  test('does not fire fetch when token is empty string', () => {
    (interactionTracker as any).token = '';

    (interactionTracker as any).createEvent(
      TrackerEvent.CAPTURE_EYE,
      new Date().toISOString(),
      'nid',
      'subid'
    );

    assert.isFalse(fetchStub.called);
  });

  test('schedules retry when token is null', () => {
    const clock = sinon.useFakeTimers();
    (interactionTracker as any).token = null;

    const createEventSpy = sinon.spy(
      interactionTracker as any,
      'createEvent'
    );

    const datetime = new Date().toISOString();
    (interactionTracker as any).createEvent(
      TrackerEvent.CAPTURE_EYE,
      datetime,
      'nid',
      'subid'
    );

    assert.isFalse(fetchStub.called, 'fetch should not be called immediately');

    clock.tick(1000);

    assert.isTrue(
      createEventSpy.calledTwice,
      'createEvent should be retried after 1 second'
    );

    createEventSpy.restore();
    clock.restore();
  });

  test('fires fetch with Bearer token header when token is valid', () => {
    (interactionTracker as any).token = 'valid-test-token';
    fetchStub.resolves({
      ok: true,
    } as unknown as Response);

    (interactionTracker as any).createEvent(
      TrackerEvent.CAPTURE_EYE,
      new Date().toISOString(),
      'nid',
      'subid'
    );

    assert.isTrue(fetchStub.calledOnce);
    const [, options] = fetchStub.firstCall.args as [string, RequestInit];
    const headers = options.headers as Record<string, string>;
    assert.equal(headers['Authorization'], 'Bearer valid-test-token');
  });

  test('token fetch failure sets token to empty string', async () => {
    fetchStub.rejects(new Error('Network error'));

    await (interactionTracker as any).getToken();

    assert.equal((interactionTracker as any).token, '');
  });

  test('uses cached key from sessionStorage without fetching', async () => {
    const decryptDataStub = sinon
      .stub(interactionTracker as any, 'decryptData')
      .resolves('cached-decrypted-token');

    sessionStorage.setItem('tokenCryptoKey', 'fake-base64-key');

    await (interactionTracker as any).getToken();

    assert.isFalse(fetchStub.called, 'fetch should not be called when key is cached');
    assert.equal((interactionTracker as any).token, 'cached-decrypted-token');

    decryptDataStub.restore();
  });

  test('fetches key and stores it in sessionStorage when not cached', async () => {
    fetchStub.resolves({
      ok: true,
      text: () => Promise.resolve('fetched-base64-key'),
    } as unknown as Response);

    const decryptDataStub = sinon
      .stub(interactionTracker as any, 'decryptData')
      .resolves('fetched-decrypted-token');

    await (interactionTracker as any).getToken();

    assert.isTrue(fetchStub.calledOnce);
    assert.equal(
      sessionStorage.getItem('tokenCryptoKey'),
      'fetched-base64-key'
    );
    assert.equal((interactionTracker as any).token, 'fetched-decrypted-token');

    decryptDataStub.restore();
  });

  test('createEvent truncates subid longer than 255 characters via trackInteraction', () => {
    const clock = sinon.useFakeTimers();
    (interactionTracker as any).token = 'valid-test-token';
    fetchStub.resolves({ ok: true } as unknown as Response);

    const longSubid = 'a'.repeat(300);
    interactionTracker.trackInteraction(TrackerEvent.CAPTURE_EYE, 'nid', longSubid);

    clock.tick(50);

    assert.isTrue(fetchStub.calledOnce);
    const [, options] = fetchStub.firstCall.args as [string, RequestInit];
    const body = JSON.parse(options.body as string);
    assert.equal(body.subid.length, 255);

    clock.restore();
  });
});
