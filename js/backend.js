'use strict';

(function () {
  var url = '';

  var sendRequest = function (onLoad, onError, data) {
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

    if (data) {
      url = 'https://js.dump.academy/code-and-magick1';
      xhr.open('POST', url);
      xhr.send(data);
    } else {
      url = 'https://js.dump.academy/code-and-magick/data';
      xhr.open('GET', url);
      xhr.send();
    }
  };

  window.backend = {
    load: sendRequest,
    save: sendRequest
  };
})();
