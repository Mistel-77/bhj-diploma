/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest();
    let url = options.url;
    let formData = new FormData;

    xhr.responseType = 'json';
    xhr.withCredentials = true;
    
    if (options.method === 'GET') {
        url = url + '?';
        for(let key in options.data) {
            url = url + `${key}=${options.data[key]}&`
        }
          
    } else {
        for(let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }

    try {
        if (options.method === 'GET') {
            xhr.open( 'GET', url);
            xhr.send();
        } else {
            xhr.open( options.method, url);
            xhr.send(formData);
        }
      }
      catch (e) {
        // перехват сетевой ошибки
        options.callback(e);
    }

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && this.status == 200) {
            options.callback(null, xhr.response);
        }
    });
    console.log(xhr);
    return xhr;
};
