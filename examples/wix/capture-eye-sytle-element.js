function updateElement(elem) {
  const _nid = elem.getAttribute('nid');
  const nid = `${_nid.slice(0, 5)}...${_nid.slice(-5)}`;
  const thumbnail = elem.getAttribute('thumbnail');
  const creator = elem.getAttribute('creator') || 'N/A';
  const headline = elem.getAttribute('headline');
  const _captureUpdatedDate = new Date(elem.getAttribute('captureUpdatedDate'));
  // Format the date to "Jul 25 2024 15:05:45" in GMT+8 timezone
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Taipei',
  };
  const captureUpdatedDate = _captureUpdatedDate.toLocaleString(
    'en-US',
    options
  );

  // Clear existing content safely
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }

  // Build DOM safely without innerHTML to prevent XSS
  const captureEye = document.createElement('capture-eye');
  captureEye.setAttribute('nid', _nid);

  const container = document.createElement('div');
  container.className = 'container';

  const img = document.createElement('img');
  img.setAttribute('src', thumbnail);
  img.setAttribute('alt', 'Image');
  img.className = 'image';

  const textContainer = document.createElement('div');
  textContainer.className = 'text-container';

  const createParagraph = (className, text) => {
    const p = document.createElement('p');
    p.className = className;
    p.textContent = text;
    return p;
  };

  textContainer.appendChild(createParagraph('title', '註冊時間'));
  textContainer.appendChild(createParagraph('description', captureUpdatedDate));
  textContainer.appendChild(createParagraph('title', '創建者'));
  textContainer.appendChild(createParagraph('description', creator));
  textContainer.appendChild(createParagraph('title', '簡介'));
  textContainer.appendChild(createParagraph('description', headline));
  textContainer.appendChild(createParagraph('title', '影像 Nid'));

  const nidP = createParagraph('nid', nid);
  nidP.addEventListener('click', () => {
    window.open(
      `https://asset.captureapp.xyz/${encodeURIComponent(_nid)}`,
      '_blank'
    );
  });
  textContainer.appendChild(nidP);

  container.appendChild(img);
  container.appendChild(textContainer);
  captureEye.appendChild(container);
  elem.appendChild(captureEye);
}

class CaptureEyeStyleElement extends HTMLElement {
  static observedAttributes = ['creator'];

  connectedCallback() {
    updateElement(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    updateElement(this);
  }
}

customElements.define('capture-eye-style-element', CaptureEyeStyleElement);
