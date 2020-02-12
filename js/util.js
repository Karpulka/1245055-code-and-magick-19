'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var ARROW_RIGHT_KEY = 'ArrowRight';
  var ARROW_LEFT_KEY = 'ArrowLeft';

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },
    isLeftOrRightArrowEvent: function (evt, action) {
      if (evt.key === ARROW_RIGHT_KEY || evt.key === ARROW_LEFT_KEY) {
        action();
      }
    },
    arrowLeftKey: ARROW_LEFT_KEY
  };
})();
