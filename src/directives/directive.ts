import type { App } from 'vue';
import num from './common/num';
import pressKey from './common/press-key';

export default function directives(app: App) {
  num(app)
  pressKey(app)
}