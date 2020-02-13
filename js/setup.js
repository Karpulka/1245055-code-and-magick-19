'use strict';

(function () {
  var setupBlock = window.util.setupBlock;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupBlock.querySelector('.setup-close');

  window.otherWizards.showOtherWizards();

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
    setupBlock.classList.remove('hidden');
    document.addEventListener('keydown', popupEscPressHandler);
    window.wizard.wizardSettingsAddEventListeners();
  };

  var closePopup = function () {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
    window.wizard.wizardSettingsRemoveEventListeners();
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
