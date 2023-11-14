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
