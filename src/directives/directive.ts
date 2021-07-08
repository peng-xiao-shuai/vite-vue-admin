import type { App } from 'vue';
import num from './common/num';

export default function directives(app: App) {
  num(app)
}