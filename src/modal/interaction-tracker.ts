export enum TrackerEvent {
  SCRIPT = 'Script',
  CAPTURE_EYE = 'Capture eye',
  ENGAGEMENT_ZONE = 'Engagement zone',
}

class InteractionTracker {
  static EVENT_API = 'https://api.numbersprotocol.io/api/v3/events/';
  static GET_TOKEN_CRYPTO_KEY_API =
    'https://static-cdn.numbersprotocol.io/capture-eye/token-crypto-key.txt';
  static TOKEN_CRYPTO_KEY_NAME = 'tokenCryptoKey';
  static TOKEN_CRYPTO_ENCRYPTED_TEXT =
    'cUtaBpS27se6oazDe4zGwLOSK6arfdfuFulXoJkklslbGgNkvHyUXa8EV6bVyw==';
  static TOKEN_CRYPTO_IV = 'P1PuJ76j0cHvUTsN';
  static TOKEN_CRYPTO_ALGORITHM = 'AES-GCM';
  private domain: string;
  private path: string;
  private token: string | null;

  constructor() {
    this.domain = window.location.hostname;
    this.path = window.location.pathname;
    this.path = this.path.startsWith('/') ? this.path.substring(1) : this.path;
    this.token = null;
    this.getToken();
  }

  public trackInteraction(name: TrackerEvent, nid = '', subid = '') {
    const datetime = new Date().toISOString();
    if (subid.length > 255) {
      subid = subid.substring(0, 255);
    }
    const callback = () => {
      this.createEvent(name, datetime, nid, subid);
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback);
    } else {
      setTimeout(callback, 50);
    }
  }

  private createEvent(
    name: TrackerEvent,
    datetime: string,
    nid = '',
    subid = ''
  ): void {
    const token = this.token;
    if (token === null) {
      setTimeout(() => {
        this.createEvent(name, datetime, nid, subid);
      }, 1000);
      return;
    }

    if (token === '') {
      console.error('Create event error: no valid token');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      name: name,
      datetime: datetime,
      nid: nid,
      source_domain_name: this.domain,
      source_path: this.path,
      subid: subid,
    });
    fetch(InteractionTracker.EVENT_API, {
      method: 'POST',
      headers: headers,
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          // Handle response errors
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error('Create event error:', error.message);
      });
  }

  private async getToken(): Promise<string> {
    let base64Key = sessionStorage.getItem(
      InteractionTracker.TOKEN_CRYPTO_KEY_NAME
    );
    if (base64Key) {
      try {
        const token = await this.decryptData(base64Key);
        this.token = token;
        return token;
      } catch (error) {
        console.log(`Get invalid token from cache.`);
      }
    }

    // Fetch the key over HTTPS if not cached
    try {
      const response = await fetch(
        InteractionTracker.GET_TOKEN_CRYPTO_KEY_API,
        {
          method: 'GET',
        }
      );
      if (!response.ok) {
        // Handle response errors
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      base64Key = await response.text();
      const token = await this.decryptData(base64Key);
      sessionStorage.setItem(
        InteractionTracker.TOKEN_CRYPTO_KEY_NAME,
        base64Key
      );
      this.token = token;
      return token;
    } catch (error) {
      console.error(`Get token error: ${error}`);
      this.token = '';
      return this.token;
    }
  }

  private async decryptData(base64Key: string): Promise<string> {
    const key = await crypto.subtle.importKey(
      'raw',
      this.base64ToUint8Array(base64Key),
      {
        name: InteractionTracker.TOKEN_CRYPTO_ALGORITHM,
      },
      true,
      ['encrypt', 'decrypt']
    );
    const ciphertext = this.base64ToUint8Array(
      InteractionTracker.TOKEN_CRYPTO_ENCRYPTED_TEXT
    );
    const iv = this.base64ToUint8Array(InteractionTracker.TOKEN_CRYPTO_IV);
    const decrypted = await crypto.subtle.decrypt(
      {
        name: InteractionTracker.TOKEN_CRYPTO_ALGORITHM,
        iv: iv, // Initialization vector
      },
      key, // The decryption key
      ciphertext // The encrypted data
    );

    return new TextDecoder().decode(decrypted); // Convert decrypted bytes back to a string
  }

  private base64ToUint8Array(base64String: string): Uint8Array {
    return Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
  }
}

const instance: InteractionTracker = new InteractionTracker();

export default instance;
