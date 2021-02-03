declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare module "js-cookie"

declare module 'mockjs'

interface ResizeObserver {
    observe(target: Element): void;
    unobserve(target: Element): void;
    disconnect(): void;
}
