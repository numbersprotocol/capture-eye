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
