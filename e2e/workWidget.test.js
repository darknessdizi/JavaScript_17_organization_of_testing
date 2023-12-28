// Импорт библиотеки для работы с браузером
import puppeteer from 'puppeteer';

jest.setTimeout(30000); // default puppeteer timeout

// Группируем тесты, так как тестам понадобится подготовка для запуска
// браузера, его закрытие, переход на страницы и т.д.
describe('Page start', () => {
  let browser; // переменная для браузера
  let page; // переменная для страницы

  beforeEach(async () => { // Перед каждым тестом запустить браузер
    browser = await puppeteer.launch({
      headless: false, // чтобы запустить реальный браузер (true браузер не будет запущен)
      slowMo: 100, // Задержка между действиями браузера 100 мс
      devtools: true, // чтобы видеть инструменты разработчика
    });
    page = await browser.newPage(); // Создание экземпляра страницы
  });

  afterEach(async () => {
    await browser.close(); // Закрытие браузера после каждого теста
  });

  it('test проверки ввода валидных данных', async () => {
    // переход страницы по url
    // сервер уже должен быть запущен для данной страницы
    await page.goto('http://localhost:9090');

    // Страница ожидает загрузки селектора .content
    await page.waitForSelector('.content');

    const form = await page.$('.conteiner_input_data');
    const input = await form.$('.form_text');
    const button = await form.$('.form_button');

    const number = '2201111111111116';
    await input.type(number); // Ввод данных в поле инпут

    // const icon = await page.waitForSelector('#MIR');
    // const expected = icon.clasName;
    // expect('disable').not.toEqual(expect.stringContaining(expected));

    const iconMir = await page.waitForSelector('#MIR');
    expect(iconMir.classList).not.toContain('disable');

    await button.click(); // Нажатие кнопки
    await page.waitForSelector('.form_text.valid'); // Ожидание появления класса валидности у формы

    await page.focus('.form_text');
    for (const _ of number) {
      await page.keyboard.press('Backspace');
    }
    await page.keyboard.type('6221261111111111113');

    expect(iconMir.classList).toContain('disable');
    const iconDiscover = await page.waitForSelector('#Discover');
    expect(iconDiscover.classList).not.toContain('disable');

    await page.keyboard.press('Enter');
    await page.waitForSelector('.conteiner_input_data .form_text.valid'); // Ожидание появления класса валидности у страницы
  });

  it ('test ввода не существующего номера', async () => {
    await page.goto('http://localhost:9090');
    await page.waitForSelector('.content');
    const form = await page.$('.conteiner_input_data');
    const input = await form.$('.form_text');
    const button = await form.$('.form_button');

    await input.type('1111111111111111');
    await button.click();
    // await page.waitForSelector('.conteiner_input_data .form_text.invalid');
    await page.waitForSelector('.invalid');
  });
});
