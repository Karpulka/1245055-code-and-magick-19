'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = window.wizard.COAT_COLORS;
  var EYES_COLORS = window.wizard.EYES_COLORS;
  var WIZARDS_COUNT = 4;

  var setupBlock = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = setupBlock.querySelector('.setup-similar-list');

  var getOtherWizards = function (count) {
    count = count ? count : WIZARDS_COUNT;
    var wizards = [];
    for (var i = 0; i < count; i++) {
      var properties = {
        name: window.util.getRandomItemFromArray(NAMES) + ' ' + window.util.getRandomItemFromArray(LASTNAMES),
        coatColor: window.util.getRandomItemFromArray(COAT_COLORS),
        eyesColor: window.util.getRandomItemFromArray(EYES_COLORS)
      };
      wizards.push(properties);
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var showOtherWizards = function () {
    if (setupBlock) {
      var wizards = getOtherWizards();
      var fragment = document.createDocumentFragment();
      wizards.forEach(function (wizard) {
        fragment.appendChild(renderWizard(wizard));
      });
      similarListElement.appendChild(fragment);
      setupBlock.querySelector('.setup-similar').classList.remove('hidden');
    }
  };

  window.otherWizards = {
    showOtherWizards: showOtherWizards
  };
})();
