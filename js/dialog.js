'use strict';

(function () {
  var setupBlock = document.querySelector('.setup');
  var uploadBlock = setupBlock.querySelector('.upload');

  var startMoveSetupBlock = function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDragged = false;

    var moveSetupBlock = function (evtMove) {
      isDragged = true;

      var offset = {
        x: startCoordinates.x - evtMove.clientX,
        y: startCoordinates.y - evtMove.clientY
      };

      startCoordinates = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      setupBlock.style.left = (setupBlock.offsetLeft - offset.x) + 'px';
      setupBlock.style.top = (setupBlock.offsetTop - offset.y) + 'px';
    };

    var stopSetupBlock = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', moveSetupBlock);
      document.removeEventListener('mouseup', stopSetupBlock);

      if (isDragged) {
        var stopOpenAvatarChoiseWindow = function (evtClick) {
          evtClick.preventDefault();

          uploadBlock.removeEventListener('click', stopOpenAvatarChoiseWindow);
        };

        uploadBlock.addEventListener('click', stopOpenAvatarChoiseWindow);
      }
    };

    document.addEventListener('mousemove', moveSetupBlock);
    document.addEventListener('mouseup', stopSetupBlock);
  };

  uploadBlock.addEventListener('mousedown', startMoveSetupBlock);
})();
