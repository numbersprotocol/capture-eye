(function initializeCaptureEyeButtonFunctionality() {
  // Get the modal
  var modal = document.getElementById('capture-eye-modal');

  // Get the button that opens the modal
  var btn = document.getElementById('capture-eye-button');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('keyboard-arrow-left')[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = 'block';

    resetUIState();

    // fetchData() // used in QA Testing or Prod
    fetchDataDebug(); // used in dev mode for fast UI Development
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none';
  };
})();

/**
 * Toggles a custom tooltip on a target element when triggered by an event.
 * If the tooltip already exists, it will be removed; otherwise, a new one will be created.
 * The tooltip provides information about a source type of asset.
 *
 * @param {Event} event - The event that triggered the tooltip display.
 */
function toggleTooltipText(event) {
  console.log(event);
  // Check if a tooltip already exists
  var existingTooltip = document.getElementById('custom-tooltip');

  if (existingTooltip) {
    // If tooltip exists, remove it
    existingTooltip.remove();
  } else {
    // If no tooltip, create a new one
    var newTooltip = document.createElement('div');
    newTooltip.id = 'custom-tooltip';
    newTooltip.textContent =
      'SourceType: digitalSourceType is a controlled vocabulary that indicates from which source a digital media was created.';
    // style tooltip
    newTooltip.style.position = 'absolute';
    newTooltip.style.width = '220px';
    newTooltip.style.padding = '8px';
    newTooltip.style.backgroundColor = 'black';
    newTooltip.style.color = 'white';
    newTooltip.style.textAlign = 'center';
    newTooltip.style.fontFamily = "'Noto Sans', Arial, sans-serif";
    newTooltip.style.zIndex = 1000;
    newTooltip.style.borderRadius = '5px';

    // Get the position of the target element
    var targetElement = event.target;
    var targetRect = targetElement.getBoundingClientRect();

    // Position the tooltip below the target element
    newTooltip.style.left = targetRect.left - 150 + 'px';
    newTooltip.style.top = targetRect.bottom - 130 + 'px';

    // Append the new tooltip to the body
    document.body.appendChild(newTooltip);

    setTimeout(() => {
      newTooltip.remove();
    }, 1000);
  }
}

/**
 * Displays a snackbar notification with the specified text for a short duration.
 *
 * @param {string} text - The text to display in the snackbar notification.
 */
function showSnackbar(text) {
  var x = document.getElementById('snackbar');
  x.className = 'show';
  x.innerText = text;
  setTimeout(function () {
    x.className = x.className.replace('show', '');
  }, 3000);
}

/**
 * Copies the text content of an element with the given ID to the clipboard.
 * Displays a snackbar notification upon successful copy or if the element is not found.
 *
 * @param {string} elementId - The ID of the element whose text content will be copied.
 */
function copyToClipboard(elementId) {
  // Get the element by its ID
  var element = document.getElementById(elementId);

  if (element) {
    // Create a temporary textarea element to copy the text to the clipboard
    var textarea = document.createElement('textarea');
    textarea.value = element.textContent || element.innerText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    showSnackbar('NID copied to clipboard');
  } else {
    showSnackbar('Element with ID ' + elementId + ' not found.');
  }
}

/**
 * Fetch data from a remote API using the specified NID and user token.
 * If successful, update the UI with the retrieved data.
 * If there's an error, update the UI with an error message.
 * @async
 */
async function fetchData() {
  const nid = 'bafkreibfqutz3xybzgudrwfs43s7dlgmx2tbvqj5r7ivxzplwrahdoyrfi ';
  const userToken = undefined;

  let headers = {'Content-Type': 'application/json'};
  if (userToken) headers['Authorization'] = `Bearer ${userToken}`;

  const requestUrl = `https://eognt1jfpe04mq8.m.pipedream.net?nid=${nid}`;
  const requestOptions = {method: 'GET', headers: headers};

  try {
    updateUILoadingState({isLoading: true});
    const response = await fetch(requestUrl, requestOptions);
    if (response.ok) {
      const data = await response.json();
      updateUILoadingState({isLoading: false});
      updateUISuccessState(data);
    } else {
      const error = await response.json();
      throw error;
    }
  } catch (error) {
    updateUILoadingState({isLoading: false});
    updateUIWithErrorState('Error fetching data: ' + error.message);
  }
}

/**
 * Simulate fetching data for debugging purposes and faster UI development.
 * This function simulates few test cases:
 * 1. Successful data retrieval after a delay.
 * 2. Error response after a delay.
 * 3. More can be added in the future
 * It updates the UI accordingly with loading, success, or error states.
 * @async
 */
async function fetchDataDebug() {
  const sampleImageData = {
    nid: 'bafkreibfqutz3xybzgudrwfs43s7dlgmx2tbvqj5r7ivxzplwrahdoyrfi',
    assetCreator: 'sultanmyrza001',
    creatorWallet: '0xd753C118b157AEA80b371567eCFF1C32F165B710',
    assetTimestampCreated: '10/03/2023 21:41 UTC',
    digitalSourceType: 'digitalUpload',
  };
  const testNetworkDelay = 1300;
  const testCases = [
    function () {
      updateUILoadingState({isLoading: true});
      setTimeout(() => {
        updateUILoadingState({isLoading: false});
        updateUISuccessState(sampleImageData);
      }, testNetworkDelay);
    },
    function () {
      updateUILoadingState({isLoading: true});
      setTimeout(() => {
        updateUILoadingState({isLoading: false});
        updateUIWithErrorState('Sample error message');
      }, testNetworkDelay);
    },
  ];
  // Run one of the test cases
  testCases[0]();
}

/**
 * Update the UI loading state by adding or removing the 'shimmer' class from specified elements.
 * @param {Object} options - Options for updating the UI loading state.
 * @param {boolean} options.isLoading - Indicates whether the UI is in a loading state.
 */
function updateUILoadingState({isLoading}) {
  const elementsByID = [
    'ui-data-nid',
    'ui-data-assetCreator',
    'ui-data-assetTimestampCreated',
    'ui-data-digitalSourceType',
  ];

  elementsByID.forEach((elementId) => {
    const element = document.getElementById(elementId);
    if (element && isLoading) element.classList.add('shimmer');
    if (element && !isLoading) element.classList.remove('shimmer');
  });
}

/**
 * Updates the UI with the fetched data.
 * @param {Object} data - The data object received from the fetch operation.
 */
function updateUISuccessState(data) {
  updateIPFSImagePreview(
    `https://ipfs-pin.numbersprotocol.io/ipfs/${data.nid}`
  );

  document.getElementById(
    'ui-data-nid'
  ).innerHTML = `<a target="_blank" href="https://ipfs-pin.numbersprotocol.io/ipfs/${data.nid}">${data.nid}</a>`;

  document.getElementById(
    'ui-data-assetCreator'
  ).innerHTML = `<a target="_blank" href="https://mainnet.num.network/address/${data.creatorWallet}">${data.assetCreator}</a>`;

  document.getElementById('ui-data-assetTimestampCreated').textContent =
    data.assetTimestampCreated;

  document.getElementById('ui-data-digitalSourceType').textContent =
    data.digitalSourceType;
}

/**
 * Update the UI to display an error state by hiding the modal content and showing the error modal content.
 * @param {string} errorMessage - The error message to display.
 */
function updateUIWithErrorState(errorMessage) {
  toggleModelContentVisibility({visible: false});
  toggleModelContentErrorVisibility({visible: true, errorMessage});
}

/**
 * Toggle the visibility of the modal content.
 *
 * @param {Object} options - The options for toggling visibility.
 * @param {boolean} [options.visible=true] - Whether to make the modal content visible (true) or hidden (false).
 */
function toggleModelContentVisibility({visible = true}) {
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) modalContent.style.display = visible ? 'flex' : 'none';
}

/**
 * Toggle the visibility of the modal error content and set the error message.
 *
 * @param {Object} options - An object containing options.
 * @param {boolean} [options.visible=false] - Whether to make the error content visible.
 * @param {string} [options.errorMessage=''] - The error message to display.
 */
function toggleModelContentErrorVisibility({
  visible = false,
  errorMessage = '',
}) {
  const errorInstructions = 'Try to re-open modal to refetch data';
  const innerHTML = errorMessage + '<br/>' + errorInstructions;

  const modalContentError = document.querySelector('.modal-content-error');

  if (modalContentError) {
    modalContentError.innerHTML = innerHTML;
    modalContentError.style.display = visible ? 'flex' : 'none';
  }
}

/**
 * Update the source (src) of the IPFS image preview element.
 *
 * @param {string} [imgSrc='https://c.animaapp.com/twFYQx58/img/placeholder-image.png'] - The default URL preview img.
 */
function updateIPFSImagePreview(
  imgSrc = 'https://c.animaapp.com/twFYQx58/img/placeholder-image.png'
) {
  const imgPreview = document.getElementById('ipfs-image-preview');
  if (imgPreview) imgPreview.setAttribute('src', imgSrc);
}

/**
 * Temporarily hides specific UI elements based on provided CSS selectors.
 *
 * This function is used to hide certain UI elements when necessary. For example,
 * it can be used to hide elements that depend on data from an external source that
 * may not be available yet. See https://app.asana.com/0/1201016280880508/1205923376919599
 *
 * @description
 * This function hides UI elements specified by the CSS selectors in the
 * `selectorsToHide` array. You can customize the `selectorsToHide` array to
 * specify which elements should be hidden temporarily.
 */
function temporarilyHideUIElements() {
  const selectorsToHide = [
    '#geolocaton-row',
    '#mime-type-row',
    '#generated-by-row',
    '#initial-committer-row',
    '.heading-2',
    '.table-2',
  ];
  selectorsToHide.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => element.classList.add('temporarely-hidden'));
  });
}

/**
 * Reset the UI state by updating loading state, modal content visibility, and error modal content visibility.
 */
function resetUIState() {
  updateUILoadingState({isLoading: false});
  toggleModelContentVisibility({visible: true});
  toggleModelContentErrorVisibility({visible: false});
  updateIPFSImagePreview();
  temporarilyHideUIElements(); // devs can comment out to see full UI during debugging
}
