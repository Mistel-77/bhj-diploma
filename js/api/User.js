/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return JSON.parse(localStorage.user);
    } else {
      return undefined;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    let xhr = createRequest({
      url: this.HOST + this.URL + '/current',
      metod: 'GET',
      responseType: 'json',
      data: data,
      callback: ( err, response ) => {
        if (response.success === 'false') {
          User.unsetCurrent(response.user);
        } else {
          User.setCurrent(response.user);
        }
        callback( err, response );
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    let xhr = createRequest({
      url: this.HOST + this.URL + '/login',
      metod: 'POST',
      responseType: 'json',
      data: data,
      callback: ( err, response ) => {
        if (response.success === 'true') {
          User.setCurrent(response.user);
        }
        callback( err, response );
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    let xhr = createRequest({
      url: this.HOST + this.URL + '/register',
      metod: 'POST',
      responseType: 'json',
      data: data,
      callback: ( err, response ) => {
        if (response.success === 'true') {
          User.setCurrent(response.user);
        }
        callback( err, response );
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    let xhr = createRequest({
      url: this.HOST + this.URL + '/logout',
      metod: 'POST',
      responseType: 'json',
      data: data,
      callback: ( err, response ) => {
        if (response.success === 'true') {
          User.unsetCurrent(response.user);
        }
        callback( err, response );
      }
    });
  }
}



User.URL = '/user';
User.HOST =  Entity.HOST;