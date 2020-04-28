/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if(!element) {
      throw new Error("Ошибка");
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const removeAccountButton = this.element.querySelector('.remove-account');

    removeAccountButton.addEventListener('click', () => {
      this.removeAccount();
    });

    this.element.addEventListener('click', (event) => {
      let transactionRemove = event.target.closest('.transaction__remove');
      if (transactionRemove) {
        this.removeTransaction(transactionRemove.dataset.id);
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.lastOptions) {
      return
    }

    let deleteAccount = confirm('Вы действительно хотите удалить счёт?');
    if (!deleteAccount) {
      return
    }

      Account.remove(this.lastOptions.account_id, {}, (err, response) => {
      if (response.success) {
        this.clear();
        App.update();
      }
    });
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    let deleteTransaction = confirm('Вы действительно хотите удалить эту транзакцию?');
    if (!deleteTransaction) {
      return;
    }

      Transaction.remove(id, {}, (err, response) => {
      if (response.success) {
        App.update();
      }
    });
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (!options) {
      return;
    }

    this.lastOptions = options;

    Account.get(options.account_id, {}, (err, response) => {
      if (response) {
        this.renderTitle(response.data.name);
      }
    });

    Transaction.list(options, (err, response) => {
      this.renderTransactions(response.data);
      console.log(response.data);
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = '';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    this.element.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    let year = date.slice(0, 4);
    let monthCurrent = Number(date.slice(5, 7)) -1;
    let day = date.slice(8, 10);
    let time = date.slice(11, 16);

    let months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря"
    ];

    let newDate = `${day} ${months[monthCurrent]} ${year} г. в ${time}`;

    return newDate;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    let htmlItem = `
      <div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${item.name}</h4>
              <!-- дата -->
              <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
          <!--  сумма -->
            ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <!-- в data-id нужно поместить id -->
            <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                <i class="fa fa-trash"></i>  
            </button>
        </div>
    </div>`;
    return htmlItem;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    let content = this.element.querySelector('.content');

    if (!data) {
      return;
    }
    content.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
      content.innerHTML += this.getTransactionHTML(data[i]);
    }
  }
}
