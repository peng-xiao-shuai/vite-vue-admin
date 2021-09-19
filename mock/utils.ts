/**
 * @param {string} url
 * @returns {Object}
 */

// url截取
function param2Obj(url:string) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  type objType = {
    [s: string]: string,
  }
  const obj:objType = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {Object} source
 * @returns {Object}
 */

//  深度克隆
type sourceType = {
  [s:string]: string|sourceType
}
function deepClone(source: sourceType) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments deepClone')
  }
  const targetObj:any = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone((source[keys] as sourceType))
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export {
  param2Obj,
  deepClone
}
