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
  elem.innerHTML = `<capture-eye nid="${_nid}"><div class="container"><img src="${thumbnail}" alt="Image" class="image">
              <div class="text-container">
                <p class="title">註冊時間</p>
                <p class="description">${captureUpdatedDate}</p>
                <p class="title">創建者</p>
                <p class="description">${creator}</p>
                <p class="title">簡介</p>
                <p class="description">${headline}</p>
                <p class="title">影像 Nid</p>
                <p class="nid" onclick="window.open('https://asset.captureapp.xyz/${_nid}', '_blank')">${nid}</p>
             </div></div></capture-eye>`;
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
