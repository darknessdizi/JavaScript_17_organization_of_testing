import Widget from '../Widget';
import WidgetController from '../WidgetController';
import data from '../cards.json';

const arrayCards = [
  [
    'VISA',
    [
      '4916569301993530',
      '4485139364138315',
      '4121205825083034',
      '4128416358857206',
      '4024007175232106',
    ],
  ],
  [
    'Mastercard',
    [
      '5343514400503236',
      '5250593230592339',
      '5457857808330195',
      '5469351877462705',
      '5320357019198288',
    ],
  ],
  [
    'Discover',
    [
      '6011542509427824',
      '6011972909118899',
      '6011642568164308',
      '6011739259793880',
      '6011667567609615',
      '6221261111111111113',
    ],
  ],
  [
    'American-express',
    [
      '374477613641560',
      '347014270757456',
      '349886264694383',
      '347296718906163',
      '342252840505824',
    ],
  ],
  [
    'MIR',
    [
      '2201111111111116',
    ],
  ],
];

const body = document.querySelector('body');

const widget = new Widget(body);
const controller = new WidgetController(widget, data.creditCards);
controller.init();

test('Первоначальный запуск виджета (иконки не активны)', () => {
  const icons = document.querySelector('.conteiner_money_sistem');
  for (const icon of icons.children) {
    expect(icon.classList).toContain('disable');
  }
});

const testArray = test.each(arrayCards);

testArray('Ввод валидных данных (кредитная карта - %s)', (title, array) => {
  for (const number of array) {
    widget.input.value = number;

    const eventInput = new Event('input');
    eventInput.data = widget.input.value;
    widget.input.dispatchEvent(eventInput);
    const icon = widget.parent.querySelector(`#${title}`);
    // Иконка платежной системы активна
    expect(icon.classList).not.toContain('disable');

    const eventSubmit = new Event('submit');
    widget.form.dispatchEvent(eventSubmit);
    // Данные прошли проверку на валидность
    expect(widget.input.classList).toContain('valid');
  }
});

const errorCards = [
  ['4916534993530'],
  ['448513924328316'],
  ['412143245825083034'],
  ['4124358857206'],
  ['40240432375232109'],
  ['6221261111000111113'],
  ['2201111333111116'],
];

const testErrorArray = test.each(errorCards);

testErrorArray('Ввод не валидных карт', (number) => {
  widget.input.value = number;

  const eventSubmit = new Event('submit');
  widget.form.dispatchEvent(eventSubmit);
  // Данные не прошли проверку на валидность
  expect(widget.input.classList).toContain('invalid');
});
