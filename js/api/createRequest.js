/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const url = options.url;
    const formData = new FormData;
    
    if (options.method === 'GET') {
        url = url + '?';
        for(let key in options.data) {
            url = url + `${key}=${options.data[key]}&`
        }
          
    } else {
        for(let key in options.data) {
            formData.append(key, option.data[key]);
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

    xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === 4 && this.status == 200) {
            options.callback(null, xhr.response);
        }
    });
    console.log(xhr);
    return xhr;
};
