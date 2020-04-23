/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarMini = document.querySelector('.sidebar-mini');
    const sidebar = document.querySelector('.sidebar-toggle');

    sidebar.addEventListener('click', () => {
      sidebarMini.classList.toggle('sidebar-open');
      sidebarMini.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let menuRegister = document.querySelector('.menu-item_register');
    let menuLogin = document.querySelector('.menu-item_login');
    let menuLogout = document.querySelector('.menu-item_logout');

    menuRegister.addEventListener('click', () => {
      let modalRegister = App.getModal('register');
      modalRegister.open();
    });

    menuLogin.addEventListener('click', () => {
      let modalLogin = App.getModal('login');
      modalLogin.open();
    });

    menuLogout.addEventListener('click', () => {
      User.logout({}, (err, response) => {
        if(response.success) {
          App.setState('init');
        }
      });
    });
  }

}
