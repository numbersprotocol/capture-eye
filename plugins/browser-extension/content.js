async function calculateSHA256(buffer) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const sha256sum = hashArray
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  console.log('Calculated SHA-256:', sha256sum);
  return sha256sum;
}

async function fetchBytes(url) {
  console.log('Fetching bytes for URL:', url);
  const response = await fetch(url);
  return await response.arrayBuffer();
}

// Mock chrome.storage.local for testing outside of browser extension context
if (typeof chrome === 'undefined') {
  var chrome = {
    storage: {
      local: {
        get: async (keys) => {
          const data = {};
          keys.forEach((key) => (data[key] = { nid: null }));
          console.log('Mock get:', data);
          return data;
        },
        set: async (items) => {
          console.log('Mock set:', items);
        },
      },
    },
  };
}

async function getOrCreateNid(src) {
  console.log('Getting or creating nid for src:', src);

  // Check if we already have an nid stored for this src
  const data = await chrome.storage.local.get([src]);
  if (data[src]) {
    const storedNid = data[src].nid;
    if (storedNid !== null) {
      console.log(
        'Found existing nid in storage for src:',
        src,
        '-> nid:',
        storedNid
      );
      return storedNid;
    } else {
      console.log(`nid for ${src} was previously marked as unavailable.`);
      return null; // Avoid recalculating for this src
    }
  }

  // Calculate the SHA-256 hash if no nid or hash entry is found
  const buffer = await fetchBytes(src);
  const sha256sum = await calculateSHA256(buffer);

  // Check if this SHA-256 hash has been previously resolved
  const hashData = await chrome.storage.local.get([sha256sum]);
  if (hashData[sha256sum]?.nid) {
    const cachedNid = hashData[sha256sum].nid;
    console.log(
      'Found existing nid in storage for sha256sum:',
      sha256sum,
      '-> nid:',
      cachedNid
    );
    await chrome.storage.local.set({
      [src]: { sha256sum, nid: cachedNid },
    });
    return cachedNid;
  }

  // Fetch the nid from Numbers Protocol API
  const apiUrl = `https://api.numbersprotocol.io/api/v3/assets/?proof_hash=${sha256sum}`;
  console.log(
    'Fetching nid from Numbers Protocol API for sha256sum:',
    sha256sum
  );
  const response = await fetch(apiUrl);

  if (response.ok) {
    const jsonResponse = await response.json();
    const result = jsonResponse.results[0];
    const nid = result ? result.cid : null;

    console.log('Received nid from API:', nid);

    // Store both mappings (src -> nid, sha256sum -> nid)
    await chrome.storage.local.set({
      [src]: { sha256sum, nid },
      [sha256sum]: { nid },
    });
    console.log(
      'Stored src -> sha256sum and sha256sum -> nid mappings in storage.'
    );

    return nid;
  }

  // High-level error log if nid is unavailable
  console.error('Cannot find nid for src:', src);

  // Store src -> null to avoid recalculating
  await chrome.storage.local.set({
    [src]: { sha256sum, nid: null },
  });

  return null;
}

async function wrapMediaWithCaptureEye(mediaElement) {
  const src = mediaElement.src || mediaElement.currentSrc;
  if (!src) {
    console.warn('No src found for media element:', mediaElement);
    return;
  }

  console.log('Attempting to wrap media element with src:', src);
  const nid = await getOrCreateNid(src);
  if (!nid) {
    console.error('Cannot find nid for src:', src); // High-level error log
    return;
  }

  // Create and insert <capture-eye> component
  const captureEye = document.createElement('capture-eye');
  captureEye.setAttribute('nid', nid);

  mediaElement.parentNode.insertBefore(captureEye, mediaElement);
  captureEye.appendChild(mediaElement);
  console.log(
    'Wrapped media element with capture-eye component:',
    mediaElement
  );

  // Confirm the component is in the DOM
  console.log('capture-eye element added to DOM:', captureEye.isConnected);
}

function wrapAllMediaElements() {
  const mediaElements = document.querySelectorAll('img, video');
  console.log('Found media elements to wrap:', mediaElements.length);

  mediaElements.forEach((mediaElement) => {
    wrapMediaWithCaptureEye(mediaElement).then(() => {
      console.log('Completed wrapping media element:', mediaElement);
    });
  });
}

async function injectCaptureEyeScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src =
      'https://cdn.jsdelivr.net/npm/@numbersprotocol/capture-eye@latest/dist/capture-eye.bundled.js';
    script.onload = () => {
      console.log('Capture Eye script loaded successfully.');
      resolve();
    };
    script.onerror = (error) => {
      console.error('Failed to load Capture Eye script:', error);
      reject(error);
    };
    document.head.appendChild(script);
  });
}

async function initializeCaptureEye() {
  // Ensure capture-eye script is loaded
  try {
    await injectCaptureEyeScript();
    console.log(
      'Capture Eye script loaded. Proceeding to wrap media elements.'
    );

    // Once script is loaded, proceed with wrapping media elements
    wrapAllMediaElements();
  } catch (error) {
    console.error('Failed to load Capture Eye script:', error);
  }
}

initializeCaptureEye();
