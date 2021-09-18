import type { App } from 'vue';
import num from './common/num';
import pressKey from './common/press-key';
import { debounce, throttle } from './common/debounce';

export default function directives(app: App) {
  num(app)
  pressKey(app)
  debounce(app)
  throttle(app)
}