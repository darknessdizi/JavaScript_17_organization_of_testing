export default class Widget {
  constructor(parent) {
    this.parent = parent;
    this.form = null;
    this.input = null;
    this.submitListeners = [];
    this.inputListeners = [];
  }

  bindToDOM() {
    // Добавляет виджет к родителю и назначает обработчики событий
    const content = this.createWidget();
    this.parent.append(content);

    this.form.addEventListener('submit', (o) => this.onSubmit(o));
    this.input.addEventListener('input', (o) => this.onInput(o));
  }

  createWidget() {
    // Создает и возвращает блок main и всю оснастку внутри
    const main = document.createElement('main');
    main.classList.add('content');

    const div = document.createElement('div');
    div.classList.add('conteiner_money_sistem');
    main.append(div);

    this.form = document.createElement('form');
    this.form.classList.add('conteiner_input_data');
    main.append(this.form);

    this.input = document.createElement('input');
    this.input.classList.add('form_text');
    this.input.type = 'text';
    this.input.setAttribute('placeholder', '0000 0000 0000 0000');
    this.input.setAttribute('maxlength', '24');
    this.form.append(this.input);

    const button = document.createElement('button');
    button.classList.add('form_button');
    button.type = 'submit';
    button.textContent = 'Click to Validate';
    this.form.append(button);

    return main;
  }

  drawIconsCards(array) {
    // Добавляет в виджет иконки платежных систем из списка
    for (const item of array) {
      const block = this.parent.querySelector('.conteiner_money_sistem');
      const div = document.createElement('div');
      div.classList.add('card_money_sistem');
      div.setAttribute('id', item.title);
      div.classList.add('disable');
      block.append(div);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.submitListeners.forEach((o) => o.call(null));
  }

  addSubmitListeners(callback) {
    this.submitListeners.push(callback);
  }

  onInput(event) {
    event.preventDefault();
    this.inputListeners.forEach((o) => o.call(null, event));
  }

  addInputListeners(callback) {
    this.inputListeners.push(callback);
  }

  setActiveCard(title) {
    const selector = `#${title}`;
    const div = this.parent.querySelector(selector);
    div.classList.remove('disable');
    div.classList.add('active');
  }

  setDeactiveCard() {
    const div = this.parent.querySelector('.conteiner_money_sistem');
    for (const child of div.children) {
      if (child.classList.contains('active')) {
        child.classList.add('disable');
        child.classList.remove('active');
      }
    }
  }
}
