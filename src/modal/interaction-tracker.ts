export enum TrackerEvent {
  SCRIPT = 'Script',
  CAPTURE_EYE = 'Capture eye',
  ENGAGEMENT_ZONE = 'Engagement zone',
}

class InteractionTracker {
  static EVENT_API = 'https://api.numbersprotocol.io/api/v3/events/';
  static TOKEN = 'PCkUO1BCAfoLCRI7oR22A1g75iHtpI';
  private domain: string;
  private path: string;

  constructor() {
    this.domain = window.location.hostname;
    this.path = window.location.pathname;
    this.path = this.path.startsWith('/') ? this.path.substring(1) : this.path;
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
    const headers = {
      Authorization: `Bearer ${InteractionTracker.TOKEN}`,
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
}

const instance: InteractionTracker = new InteractionTracker();

export default instance;
