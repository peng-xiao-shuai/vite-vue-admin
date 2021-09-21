import { nextTick } from 'vue';
import loadingCss from '@/styles/loading.scss';

// 定义方法
export const NextLoading = {
  // 载入 css
  setCss: () => {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    (link.href as any) = loadingCss;
    link.crossOrigin = 'anonymous';
    document.getElementsByTagName('head')[0].appendChild(link);
  },
  // 创建 loading
  start: () => {
    const bodys: HTMLElement = document.body;
    const div = document.createElement('div');
    div.setAttribute('class', 'loading grid grid-c-3');
    const htmls = `
    <div class="_5"></div>
    <div class="_6"></div>
    <div class="_7"></div>
    <div class="_8"></div>
    <div class="_7"></div>
    <div class="_9"></div>
    <div class="_9"></div>
    <div class="_6"></div>
    <div class="_7"></div>
		`;
    div.innerHTML = htmls;
    bodys.insertBefore(div, bodys.childNodes[0]);
  },
  // 移除 loading
  done: () => {
    nextTick(() => {
      const el = document.querySelector('.loading');
      el && el.parentNode?.removeChild(el);
    });
  },
};
