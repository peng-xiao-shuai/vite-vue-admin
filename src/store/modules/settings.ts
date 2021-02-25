import config from '/@/config/defalut-data';
const themeColor:string = window.localStorage.getItem('themeColor')

let state = {
    themeColor: JSON.parse(themeColor) || config.themeColor.background
}

export default{
    state
}