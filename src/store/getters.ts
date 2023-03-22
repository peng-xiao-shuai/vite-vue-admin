import { State } from './index'
import { Log } from '@/utils/interface'

const getters = {
  getToken: (state: State) => {
    return state.user.vToken
  },
  getUserInfo: (state: State) => {
    return state.user.userInfo
  },
  getMenus: (state: State) => {
    return state.user.menus
  },
  getThemeColor: (state: State) => {
    return state.settings.themeColor.primary
  },
  getBugNumber: (state: State) => {
    return state.settings.errorLog.filter(
      (item: Log) => item.type === 'Bug' || item.type === 'Ajax'
    ).length
  },
  getBugs: (state: State) => {
    return state.settings.errorLog
  },
}

export default getters
