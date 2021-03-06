/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error("Ошибка");
    } 
    this.element = element;
    this.registerEvents();
    this.update();
    
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      event.preventDefault();

      if (event.target.closest('.create-account')) {
        App.getModal('createAccount').open();
      }

      if (event.target.closest('.account')) {
        this.onSelectAccount(event.target.closest('.account'));
      }
    });
    /*let createAccount = document.querySelector('.create-account');
    createAccount.addEventListener('click', (event) => {
      event.preventDefault();
      App.getModal('createAccount').open();
    });

    let lookAccount = document.querySelectorAll('.account');
    for (let i = 0; i < lookAccount.length; i++) {
      lookAccount[i].addEventListener('click', (event) => {
        event.preventDefault();
        this.onSelectAccount(event.target);
      })
    }*/
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let user = User.current();
    if (user) {
      Account.list(user, ( err, response ) => {
        if (response.success) {
          this.clear();
          for (let i = 0; i < response.data.length; i++) {
            this.renderItem(response.data[i]);
          }
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let lookAccount = document.querySelectorAll('.account');
    for (let i = 0; i < lookAccount.length; i++) {
      lookAccount[i].remove();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    let activeAccount = this.element.querySelector('.active.account');
    if (activeAccount) {
      activeAccount.classList.remove('active');
    }
    element.classList.add('active');
    App.showPage( 'transactions', { account_id: element.dataset.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    return `<li class="account" data-id="${item.id}">
              <a href=''>
                <span>${item.name}</span> /
                <span>${item.sum} $</span>
              </a>
            </li>`;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    this.element.insertAdjacentHTML('beforeEnd', this.getAccountHTML(item));
  }
}
