'use strict';

(function () {
  var WIZARDS_COUNT = 4;

  var setupBlock = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = setupBlock.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var showOtherWizards = function (count) {
    count = count ? count : WIZARDS_COUNT;
    var onLoad = function (data) {
      if (setupBlock) {
        if (similarListElement.children.length > 0) {
          similarListElement.textContent = '';
        }
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < count; i++) {
          fragment.appendChild(renderWizard(window.util.getRandomItemFromArray(data)));
        }
        similarListElement.appendChild(fragment);
        setupBlock.querySelector('.setup-similar').classList.remove('hidden');
      }
    };
    var onError = function (message) {
      console.log(message);
    };
    window.backend.load(onLoad, onError);
  };

  window.otherWizards = {
    showOtherWizards: showOtherWizards
  };
})();
