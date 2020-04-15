/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    let xhr = createRequest({
      url: this.HOST + this.URL,
      metod: 'GET',
      responseType: 'json',
      data: data,
      callback: ( err, response ) => {
        console.log( err ); // null
        console.log( response ); // ответ
      }
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let xhr = createRequest({
      url: this.HOST + this.URL,
      metod: 'POST',
      responseType: 'json',
      data: Object.assign({ _method: 'PUT' }, data ),
      callback: ( err, response ) => {
        console.log( err ); // null
        console.log( response ); // ответ
      }
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    let xhr = createRequest({
      url: this.HOST + this.URL,
      metod: 'GET',
      responseType: 'json',
      data: Object.assign({ id: id }, data ),
      callback: ( err, response ) => {
        console.log( err ); // null
        console.log( response ); // ответ
      }
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let xhr = createRequest({
      url: this.HOST + this.URL,
      metod: 'POST',
      responseType: 'json',
      data: Object.assign({ _method: 'DELETE', id: id }, data ),
      callback: ( err, response ) => {
        console.log( err ); // null
        console.log( response ); // ответ
      }
    });
  }
}

Entity.URL = '';
Entity.HOST =  'https://bhj-diplom.letsdocode.ru';