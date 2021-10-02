import type { App } from 'vue';
import num from './common/num';
import pressKey from './common/press-key';
import { debounce, throttle } from './common/debounce-throttle';
import permission from './common/permission'
import copy from './common/copy'

export default function directives(app: App) {
  num(app)
  pressKey(app)
  debounce(app)
  throttle(app)
  copy(app)
  permission(app)
}