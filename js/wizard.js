'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupBlock = document.querySelector('.setup');
  var setupWizard = setupBlock.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupWizardFireball = setupBlock.querySelector('.setup-fireball-wrap');
  var currentWizardProperties = {
    eyesColor: setupWizardEyes.style.fill,
    coatColor: setupWizardCoat.style.fill,
    fireballColor: setupWizardFireball.style.background
  };

  var getWizardElementColor = function (color, colors, direction) {
    var colorKey = colors.indexOf(color);
    return window.util.getNextArrayElement(colorKey, colors, direction);
  };

  var renderWizardProperties = function () {
    setupWizardCoat.style.fill = currentWizardProperties.coatColor;
    setupWizardEyes.style.fill = currentWizardProperties.eyesColor;
    setupWizardFireball.style.background = currentWizardProperties.fireballColor;
  };

  var setWizardProperties = function (propertyName, inputSelectorName, colors, direction) {
    currentWizardProperties[propertyName] = getWizardElementColor(currentWizardProperties[propertyName], colors, direction);
    var properties = [
      {
        name: 'eyesColor',
        value: currentWizardProperties.eyesColor
      },
      {
        name: 'coatColor',
        value: currentWizardProperties.coatColor
      }
    ];
    setupBlock.querySelector('input[name="' + inputSelectorName + '"]').value = currentWizardProperties[propertyName];
    renderWizardProperties();
    window.otherWizards.editStartWizardProperties(properties);
  };

  var wizardSettingsAddEventListeners = function () {
    setupWizardCoat.addEventListener('click', setColorHandlers.clickSetCoatColorHandler);
    setupWizardEyes.addEventListener('click', setColorHandlers.clickSetEyesColorHandler);
    setupWizardFireball.addEventListener('click', setColorHandlers.clickSetFireballColorHandler);
    setupWizardCoat.addEventListener('keydown', setColorHandlers.keydownSetCoatColorHandler);
    setupWizardEyes.addEventListener('keydown', setColorHandlers.keydownSetEyesColorHandler);
    setupWizardFireball.addEventListener('keydown', setColorHandlers.keydownSetFireballColorHandler);
  };

  var wizardSettingsRemoveEventListeners = function () {
    setupWizardCoat.removeEventListener('click', setColorHandlers.clickSetCoatColorHandler);
    setupWizardEyes.removeEventListener('click', setColorHandlers.clickSetEyesColorHandler);
    setupWizardFireball.removeEventListener('click', setColorHandlers.clickSetFireballColorHandler);
    setupWizardCoat.removeEventListener('keydown', setColorHandlers.keydownSetCoatColorHandler);
    setupWizardEyes.removeEventListener('keydown', setColorHandlers.keydownSetEyesColorHandler);
    setupWizardFireball.removeEventListener('keydown', setColorHandlers.keydownSetFireballColorHandler);
  };

  var setColorHandlers = {
    clickSetCoatColorHandler: function () {
      setWizardProperties('coatColor', 'coat-color', COAT_COLORS);
    },
    clickSetEyesColorHandler: function () {
      setWizardProperties('eyesColor', 'eyes-color', EYES_COLORS);
    },
    clickSetFireballColorHandler: function () {
      setWizardProperties('fireballColor', 'fireball-color', FIREBALL_COLORS);
    },
    keydownSetCoatColorHandler: function (evt) {
      window.util.isLeftOrRightArrowEvent(evt, setWizardProperties('coatColor', 'coat-color', COAT_COLORS, evt.key));
    },
    keydownSetEyesColorHandler: function (evt) {
      window.util.isLeftOrRightArrowEvent(evt, setWizardProperties('eyesColor', 'eyes-color', EYES_COLORS, evt.key));
    },
    keydownSetFireballColorHandler: function (evt) {
      window.util.isLeftOrRightArrowEvent(evt, setWizardProperties('fireballColor', 'fireball-color', FIREBALL_COLORS, evt.key));
    }
  };

  window.wizard = {
    wizardSettingsAddEventListeners: wizardSettingsAddEventListeners,
    wizardSettingsRemoveEventListeners: wizardSettingsRemoveEventListeners
  };
})();
