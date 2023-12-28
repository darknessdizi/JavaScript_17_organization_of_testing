import Widget from './widget/Widget';
import WidgetController from './widget/WidgetController';
import data from './widget/cards.json';

const body = document.querySelector('body');

const widget = new Widget(body);
const controller = new WidgetController(widget, data.creditCards);
controller.init();
