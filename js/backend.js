'use strict';

(function () {
  var url = 'https://js.dump.academy/code-and-magick/data';

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onDataLoad = function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

      xhr.removeEventListener('load', onDataLoad);
    };

    var onErrorLoad = function () {
      onError('Произошла ошибка соединения');
    };

    var onTimeoutErrorLoad = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.addEventListener('load', onDataLoad);

    xhr.addEventListener('error', onErrorLoad);

    xhr.addEventListener('timeout', onTimeoutErrorLoad);

    xhr.open('GET', url);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    return 2;
  };

  window.backend = {
    load: load,
    save: save
  };
})();
