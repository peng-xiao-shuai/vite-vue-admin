/*
 * 定义导出参数接口
 * @Author: chenle 
 * @Date: 2021-10-19 10:11:06 
 * @Last Modified by: chenle
 * @Last Modified time: 2021-10-22 15:33:45
 */

// 公共参数类型
export interface CommonConfigData {
  border?: any // 是否需要黑色边框,
  autoWidth?: any // 是否使用自适应宽度
  align?: string | 'center' | 'left' | 'right' // 单元格对齐方式
  stripe?: any // 是否使用斑马纹
  showSummary?: boolean // 是否开启合计功能，默认不开启
  summaryList?: string[] // 需要开启合计的prop项
}

// 配置参数类型
export interface ExportConfigData extends CommonConfigData {
  fileName?: string | number, // 文档名称
}

// 数据参数类型
export interface ExportData extends CommonConfigData {
  header?: string[],
  prop: string[],
  list: any[],
  multiHeader?: string[],
  sheetName?: string,
  merges?: string[]
}

export interface ExportToExelData {
  headers: string[][],
  datas: any[][],
  multiHeaders?: string[][],
  sheetNames?: string[],
  merges?: string[][]
  borders?: boolean[], // 是否需要黑色边框,
  autoWidths?: boolean[]
  aligns?: string[]
  stripes?: boolean[]
}