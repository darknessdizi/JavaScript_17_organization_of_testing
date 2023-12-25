import checkValidateCard from './checkValidateCard';
import indetifyCard from './identifyCard';

export default class WidgetController {
  constructor(widget, cards) {
    this.widget = widget;
    this.cards = cards;
  }

  init() {
    // Запускает работу приложения
    this.widget.bindToDOM();
    this.widget.drawIconsCards(this.cards);
    this.widget.addSubmitListeners(this.onSubmit.bind(this));
    this.widget.addInputListeners(this.onClick.bind(this));
  }

  onSubmit() {
    // Callback для события submit (нажатие кнопки или Enter)
    // Проверка валидности набора карты
    const number = this.widget.input.value.replaceAll(' ', '');
    if (checkValidateCard(number)) {
      this.widget.input.classList.remove('novalidate');
      this.widget.input.classList.add('validate');
    } else {
      this.widget.input.classList.remove('validate');
      this.widget.input.classList.add('novalidate');
    }
  }

  onClick(event) {
    // Callback для события click (ввод текста в поле input) 
    this.widget.input.classList.remove('novalidate');
    this.widget.input.classList.remove('validate');

    let value = this.widget.input.value;
    if ((!isFinite(event.data)) || (event.data === ' ')) {
      this.widget.input.value = value.slice(0, value.length - 1);
      return;
    }

    value = value.replaceAll(' ', '');
    this.widget.input.value = this.repeatInputValue(value);

    const titleCard = indetifyCard(value, this.cards);
    this.widget.setDeactiveCard();
    if (titleCard) {
      this.widget.setActiveCard(titleCard);
    } 
  }

  repeatInputValue(value) {
    // Разбивает цифры на группы по 4 символа и возвращает строку 
    const step = Math.floor(value.length/4);
    let result = String();
    if (step > 0) {
      let index = 0;
      for (let i = 0; i < step + 1; i += 1) {
        result += value.slice(index, 4 + (4 * i)) + ' ';
        index = 4 + (4 * i);
      }
    } else {
      result = value;
    }
    return result.trim();
  }
}