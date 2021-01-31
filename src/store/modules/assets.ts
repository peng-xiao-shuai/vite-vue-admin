import defalut from '/@/config/defalut-data';

const themeColor:string = window.localStorage.getItem('themeColor')

let state = {
    themeColor: JSON.parse(themeColor) || defalut.themeColor
}

export default{
    state
}