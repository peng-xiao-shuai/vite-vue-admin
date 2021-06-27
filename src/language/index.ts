import { createI18n } from 'vue-i18n'		//引入vue-i18n组件
import defaultData from '@/config/default-data';

const modules = (import.meta as any).globEager('./*')
const viewModules = (import.meta as any).globEager('../views/**/locales/*.ts')
const componentModules = (import.meta as any).globEager('../components/**/locales/*.ts')

function getLangAll(): any {
  let message: any = {}
  getLangFiles(modules, message)
  getLangFiles(viewModules, message)
  getLangFiles(componentModules, message)

  console.log(message);

  return message
}
/**
 * 获取所有语言文件
 * @param {Object} mList
 */
function getLangFiles(mList: any, msg: any) {
  for (let path in mList) {
    if (mList[path].default) {

      // 判断是否中英混合文件
      if (/zh-and-en/.test(path)) {
        let localeObj: any = {
          'zh-CN': {},
          'en-US': {}
        }
        // 拆解
        for (let i in mList[path].default) {
          localeObj['zh-CN'][i] = mList[path].default[i]
          localeObj['en-US'][i] = i.replace(/\./g, " ");
        }
        // 合并
        for (let i in localeObj) {
          if (msg[i]) {
            msg[i] = {
              ...msg[i],
              ...localeObj[i]
            }
          } else {
            msg[i] = localeObj[i]
          }
        }

      } else {
        //  获取文件名
        let pathName = path.substr(path.lastIndexOf('/') + 1, 5)

        if (msg[pathName]) {
          msg[pathName] = {
            ...msg[pathName],
            ...mList[path].default
          }
        } else {
          msg[pathName] = mList[path].default
        }
      }

    }
  }
}

/**
 * 修改语言
 * @param lang
 */
export function SETLOCALE(lang: string) {
  window.localStorage.setItem('locale', lang)

  window.location.reload()
}

//注册i8n实例并引入语言文件
const i18n = createI18n({
  legacy: false,
  locale: defaultData.locale,
  messages: getLangAll()
})


export default i18n; //将i18n暴露出去，在main.js中引入挂载