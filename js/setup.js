'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomItemFromArray = function (array) {
  var min = 0;
  var max = array.length;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getOtherWizards = function () {

};

var setupBlock = document.querySelector('.setup');

if (setupBlock) {
  setupBlock.classList.remove('hidden');
}


