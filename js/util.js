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

  var showErrorMessage = function (message) {
    var errorWindow = document.querySelector('.error-message');
    if (errorWindow) {
      errorWindow.querySelector('.error-description').textContent = message;
    } else {
      var fragment = document.createDocumentFragment();
      var errorContentBlock = document.createElement('div');
      var errorTitleBlock = document.createElement('div');
      var errorMessageBlock = document.createElement('div');
      errorContentBlock.classList.add('error-message', 'hidden');
      errorTitleBlock.classList.add('error-title');
      errorMessageBlock.classList.add('error-description');
      errorMessageBlock.textContent = message;
      fragment.appendChild(errorContentBlock).appendChild(errorTitleBlock).appendChild(errorMessageBlock);
      document.querySelector('body').appendChild(fragment);
      document.querySelector('.error-message').classList.remove('hidden');
    }
  };

  window.util = {
    arrowLeftKey: ARROW_LEFT_KEY,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isLeftOrRightArrowEvent: isLeftOrRightArrowEvent,
    getRandomItemFromArray: getRandomItemFromArray,
    getNextArrayElement: getNextArrayElement,
    showErrorMessage: showErrorMessage
  };
})();
