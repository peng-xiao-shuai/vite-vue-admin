/**
 * 读取缓存
 * @author peng-xiao-shuai
 * @date 2023-3-1
 */
export const getStorage = (name: string, type?: string, key?: string) => {
  let data = localStorage.getItem(name) || ''

  if (type === 'object') {
    data = JSON.parse(data || '{}')
    if (key) {
      return (data as unknown as Indexes)[key]
    }
    return data
  }

  return data
}
