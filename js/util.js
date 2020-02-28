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

  var onErrorWindowClose = function (evt) {
    if (evt.type === 'click' || evt.key === ENTER_KEY) {
      document.querySelector('.error-message').remove();

      evt.target.removeEventListener('click', onErrorWindowClose);
      evt.target.removeEventListener('keydown', onErrorWindowClose);
    }
  };

  var showErrorMessage = function (message) {
    var fragment = document.createDocumentFragment();
    var errorContentBlock = document.createElement('div');
    var errorTitleBlock = document.createElement('div');
    var errorMessageBlock = document.createElement('div');
    var errorCloseButton = document.createElement('span');

    errorContentBlock.classList.add('error-message', 'hidden');

    errorTitleBlock.classList.add('error-title');
    errorTitleBlock.textContent = 'Ошибка!';

    errorMessageBlock.classList.add('error-description');
    errorMessageBlock.textContent = message;

    errorCloseButton.classList.add('error-close');
    errorCloseButton.setAttribute('tabindex', 0);
    errorCloseButton.textContent = 'x';

    errorContentBlock.appendChild(errorTitleBlock);
    errorContentBlock.appendChild(errorMessageBlock);
    errorContentBlock.appendChild(errorCloseButton);

    fragment.appendChild(errorContentBlock);

    document.querySelector('body').appendChild(fragment);

    errorCloseButton.addEventListener('click', onErrorWindowClose);
    errorCloseButton.addEventListener('keydown', onErrorWindowClose);

    document.querySelector('.error-message').classList.remove('hidden');

    errorCloseButton.focus();
  };

  var shuffle = function (a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  window.util = {
    arrowLeftKey: ARROW_LEFT_KEY,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isLeftOrRightArrowEvent: isLeftOrRightArrowEvent,
    getRandomItemFromArray: getRandomItemFromArray,
    getNextArrayElement: getNextArrayElement,
    showErrorMessage: showErrorMessage,
    shuffle: shuffle
  };
})();
