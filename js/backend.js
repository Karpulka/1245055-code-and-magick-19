'use strict';

(function () {
  var RequestUrl = {
    URL_LOAD: 'https://js.dump.academy/code-and-magick/data',
    URL_SEND: 'https://js.dump.academy/code-and-magick'
  };

  var Method = {
    GET: 'GET',
    POST: 'POST'
  };

  var StatusCode = {
    OK: 200
  };

  var sendRequest = function (method, url, onLoad, onError, data) {
    method = method ? method : Method.GET;
    url = url ? url : RequestUrl.URL_LOAD;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onDataLoad = function () {
      if (xhr.status === StatusCode.OK) {
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

    xhr.open(method, url);
    xhr.send(data);
  };

  var prefillRequest = function (method, url) {
    return sendRequest.bind(null, method, url);
  };

  window.backend = {
    load: prefillRequest(Method.GET, RequestUrl.URL_LOAD),
    save: prefillRequest(Method.POST, RequestUrl.URL_SEND)
  };
})();
