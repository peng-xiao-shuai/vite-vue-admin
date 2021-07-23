// kebab-case 转 kebabCase (驼峰)
export function toHump(str: string) {
  const regex = /\-(\w)/g;
  /**
   * @param {string} a 正则匹配的值 例如 -t
   * @param {string} b 正则匹配 (\w) 的值 例如 t
   * @param {number} c 正则匹配值的下标 例如 -t
   * @param {string} d str
   */
  return str.replace(regex, function (a, b, c, d) {
    return b.toUpperCase();
  })
}

// kebabCase (驼峰) 转 kebab-case
export function toLine(str: string) {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}