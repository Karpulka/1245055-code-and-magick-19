'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

var setupBlock = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = setupBlock.querySelector('.setup-similar-list');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupBlock.querySelector('.setup-close');
var setupWizard = setupBlock.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupWizardFireball = setupBlock.querySelector('.setup-fireball-wrap');

var getRandomItemFromArray = function (array) {
  var min = 0;
  var max = array.length;
  return array[Math.floor(Math.random() * (max - min)) + min];
};

var getOtherWizards = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    var properties = {
      name: getRandomItemFromArray(NAMES) + ' ' + getRandomItemFromArray(LASTNAMES),
      coatColor: getRandomItemFromArray(COAT_COLORS),
      eyesColor: getRandomItemFromArray(EYES_COLORS)
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

var getNextArrayElement = function (key, array) {
  return key === array.length - 1 ? array[0] : array[key + 1];
};

var getWizardElementColor = function (color, colors) {
  var colorKey = colors.indexOf(color);
  return getNextArrayElement(colorKey, colors);
};

if (setupBlock) {
  var wizards = getOtherWizards(WIZARDS_COUNT);
  var fragment = document.createDocumentFragment();
  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });
  similarListElement.appendChild(fragment);
  setupBlock.querySelector('.setup-similar').classList.remove('hidden');
}

var openSetupBlock = function () {
  setupBlock.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
  setupWizardCoat.addEventListener('click', function (evt) {
    evt.target.style.fill = getWizardElementColor(evt.target.style.fill, COAT_COLORS);
  });
  setupWizardEyes.addEventListener('click', function (evt) {
    evt.target.style.fill = getWizardElementColor(evt.target.style.fill, EYES_COLORS);
  });
  setupWizardFireball.addEventListener('click', function (evt) {
    evt.currentTarget.style.background = getWizardElementColor(evt.currentTarget.style.background, FIREBALL_COLORS);
  });
};

var closePopup = function () {
  setupBlock.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
};

var popupEscPressHandler = function (evt) {
  if (!evt.target.classList.contains('setup-user-name') && evt.key === ESC_KEY) {
    closePopup();
  }
};

setupOpen.addEventListener('click', function () {
  openSetupBlock();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openSetupBlock();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});
