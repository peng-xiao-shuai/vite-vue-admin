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
  const obj:any = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val =v.substring(index + 1, v.length)
      
      obj[name] = !val.length ? val : isNaN(Number(val)) ? val : Number(val)
    }
  })
  return obj
}

/**
 * @param {Object} source
 * @returns {Object}
 */

//  深度克隆
function deepClone(source: any) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments deepClone')
  }
  const targetObj:any = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export type sizeReturn<T> = {
  list: T[],
  pageNum: number,
  pageSize: number,
  totalPageNum: number,
  total: number
}
/**
 * 数据分页
 * @param {number} pageNum 多少页
 * @param {number} pageSize 一页多少条
 * @param {T[]} arr 数据源
 * @returns {T[]}
 */

function listPaging<T>(pageNum: number, pageSize: number, arr: T[]): sizeReturn<T> {
  pageNum = pageNum ? pageNum : 1
  pageSize = pageSize ? pageSize : 10

  return {
    list: arr.filter((item: T, index: number) => index >= (pageNum - 1) * pageSize && index < pageNum * pageSize).sort((a: any, b: any) => a.sort && a.sort - b.sort),
    pageNum,
    pageSize,
    totalPageNum: Math.ceil(arr.length / pageSize),
    total: arr.length,
  }
}

export {
  param2Obj,
  deepClone,
  listPaging
}