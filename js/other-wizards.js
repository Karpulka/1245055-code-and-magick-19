'use strict';

(function () {
  var WIZARDS_COUNT = 4;

  var setupBlock = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = setupBlock.querySelector('.setup-similar-list');
  var setupWizard = setupBlock.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var startWizardProperties = {
    eyesColor: setupWizardEyes.style.fill,
    coatColor: setupWizardCoat.style.fill
  };
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === startWizardProperties.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === startWizardProperties.eyesColor) {
      rank += 1;
    }

    return rank;
  }

  var editStartWizardProperties = function (properties) {
    properties.forEach(function (property) {
      startWizardProperties[property.name] = property.value ? property.value : startWizardProperties[property.name];
    });
    showOtherWizards();
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var sortByRank = function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    if (rankDiff === 0) {
      rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
    }
    return rankDiff;
  };

  var showOtherWizards = function (count) {
    count = count ? count : WIZARDS_COUNT;
    var onLoad = function (data) {
      if (setupBlock) {
        if (similarListElement.children.length > 0) {
          similarListElement.textContent = '';
        }
        var fragment = document.createDocumentFragment();
        wizards = data;
        var similarWizards = data.sort(sortByRank).slice(0, count);
        similarWizards.forEach(function (wizard) {
          fragment.appendChild(renderWizard(wizard));
        });
        similarListElement.appendChild(fragment);
        setupBlock.querySelector('.setup-similar').classList.remove('hidden');
      }
    };

    window.backend.load(onLoad, window.util.showErrorMessage);
  };

  window.otherWizards = {
    showOtherWizards: showOtherWizards,
    editStartWizardProperties: editStartWizardProperties
  };
})();
