declare module "*.vue" {
  import Vue from "vue";
  import type { DefineComponent } from "vue";
  const defineComponent: DefineComponent<{}, {}, any>;
  export { Vue, defineComponent };
}

declare module 'js-cookie'