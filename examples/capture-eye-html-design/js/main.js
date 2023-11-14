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
