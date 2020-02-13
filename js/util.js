'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var ARROW_RIGHT_KEY = 'ArrowRight';
  var ARROW_LEFT_KEY = 'ArrowLeft';

  var getNextArrayElement = function (key, array, direction) {
    if (direction === window.util.arrowLeftKey) {
      return key < 1 ? array[array.length - 1] : array[key - 1];
    }
    if (key === -1) {
      return array[1];
    }
    return key === array.length - 1 ? array[0] : array[key + 1];
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var isLeftOrRightArrowEvent = function (evt, action) {
    if (evt.key === ARROW_RIGHT_KEY || evt.key === ARROW_LEFT_KEY) {
      action();
    }
  };

  var getRandomItemFromArray = function (array) {
    var min = 0;
    var max = array.length;
    return array[Math.floor(Math.random() * (max - min)) + min];
  };

  window.util = {
    arrowLeftKey: ARROW_LEFT_KEY,
    setupBlock: document.querySelector('.setup'),
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isLeftOrRightArrowEvent: isLeftOrRightArrowEvent,
    getRandomItemFromArray: getRandomItemFromArray,
    getNextArrayElement: getNextArrayElement
  };
})();
