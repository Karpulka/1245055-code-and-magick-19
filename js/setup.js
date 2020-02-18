'use strict';

(function () {
  var setupBlock = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupBlock.querySelector('.setup-close');
  var defaultCoordinates = {
    x: setupBlock.offsetLeft,
    y: setupBlock.offsetTop
  };

  setupOpen.addEventListener('click', function () {
    openSetupBlock();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetupBlock);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var openSetupBlock = function () {
    window.otherWizards.showOtherWizards();
    setupBlock.classList.remove('hidden');
    document.addEventListener('keydown', popupEscPressHandler);
    window.wizard.wizardSettingsAddEventListeners();

    defaultCoordinates = {
      x: setupBlock.offsetLeft,
      y: setupBlock.offsetTop
    };
  };

  var closePopup = function () {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
    window.wizard.wizardSettingsRemoveEventListeners();
    setupBlock.style.left = defaultCoordinates.x + 'px';
    setupBlock.style.top = defaultCoordinates.y + 'px';
  };

  var closePopupByEsc = function (evt) {
    if (!evt.target.classList.contains('setup-user-name')) {
      closePopup();
    }
  };

  var popupEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, closePopupByEsc.bind(undefined, evt));
  };
})();
