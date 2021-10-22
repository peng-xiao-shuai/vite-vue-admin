import { saveAs } from 'file-saver'
import * as ExcelJs from 'exceljs/dist/exceljs'

import { ExportToExelData, ExportConfigData } from './exportType';

/**
 * 支持多sheet 导出excel
 * @param multiHeaders 多行表头
 * @param headers 多sheet对应的表头
 * @param datas 数据，一个数组表示一个sheet中的数据
 * @param sheetNames sheet名称，数组格式的，数组中按次获取sheet名称
 * @param merges 合并单元格
 * @param autoWidth 自动列宽
 */
export function export_json_to_excel_sheet({
  multiHeaders = [],
  headers = [],
  datas = [],
  sheetNames = [],
  merges = [],
  borders = [true], // 是否需要黑色边框,
  autoWidths = [true],
  aligns = ['center'],
  stripes = [true],
}: ExportToExelData, configData: ExportConfigData) {
  // 文档类型
  const bookType = 'xlsx'
  // 创建一个工作簿
  const workbook = new ExcelJs.Workbook()

  // 遍历数据
  for (let tmp = 0; tmp <= datas.length - 1; tmp++) {
    // 获取底部sheet名称
    var ws_name = sheetNames[tmp] || "sheet" + (tmp + 1)

    // 新增一个工作表
    const ws = workbook.addWorksheet(ws_name)

    // 获取数据
    const data = datas[tmp]

    // 添加表头, 合并表头的数据
    const header = headers[tmp]
    if (header.length) data.unshift(header)

    // 复杂表头的标题长度
    var dataLength = 0

    // 使用用户定义的合并内容
    if (merges[tmp].length) {
      if (merges[tmp]) {
        merges[tmp].forEach((mItem: any, mIndex: number) => {
          const cell = mItem.split(":")
          ws.mergeCells(cell[0], cell[1])
          ws.getCell(cell[0]).value = multiHeaders[tmp][mIndex]

          // 获取计算复杂表头合并的标题长度
          if (merges[tmp].length - 1 === mIndex) {
            dataLength = data.length + Number(cell[1].substr(1, 1))
          }
        })
      } else {
        dataLength = data.length
      }
    }
    // 使用默认标题合并
    else {
      if (multiHeaders[tmp] && multiHeaders[tmp].length) {
        multiHeaders[tmp].forEach((mhItem: any, mhIndex: number) => {
          // 给头部多行标题动态设置合并项
          // console.log('A' + (mhIndex + 1), createCol(header.length - 1) + (mhIndex + 1))
          ws.mergeCells('A' + (mhIndex + 1), createCol(header.length - 1) + (mhIndex + 1))
          ws.getCell('A' + (mhIndex + 1)).value = mhItem
          // data.unshift([mhItem].concat(Array(datas[tmp].length - [mhItem].length).fill('')))
        })
        dataLength = data.length + 1
      } else {
        dataLength = data.length
      }
    }

    ws.addRows(data)

    // 给每个单元格居中
    rowCenter(ws, header.length ? header : multiHeaders[tmp], data, dataLength, tmp)

    // 自适应宽度设置的优先等级，局部 -> 全局 -> 默认
    const autoWidthFlag: boolean = autoWidths[tmp] != undefined ? autoWidths[tmp] : configData.autoWidth == undefined ? true : configData.autoWidth
    // 自动处理单元格列宽
    if (autoWidthFlag) {
      // 设置worksheet每列的最大宽度
      const columnWidth = data.map((row: any) => row.map((val: any) => {
        // 先判断是否为null/undefined
        if (val == null) {
          return {
            'width': 10
          }
        }
        // 再判断是否为中文
        else if (val.toString().charCodeAt(0) > 255) {
          return {
            'width': val.toString().length * 2 + 2
          }
        } else {
          return {
            'width': val.toString().length + 2
          }
        }
      }))
      // 以第一行为初始值
      const result = columnWidth[0]
      for (let i = 1; i < columnWidth.length; i++) {
        for (let j = 0; j < columnWidth[i].length; j++) {
          if (result[j]['width'] < columnWidth[i][j]['width']) {
            result[j]['width'] = columnWidth[i][j]['width']
          }
        }
      }
      // 设置列宽
      colWidth(ws, result)
    }
  }

  /**
   *  设置start-end行单元格水平垂直居中/添加边框
   * @param arg_ws workSheet 参数
   */
  function rowCenter(arg_ws: any, header: any, data: any[] = [[]], dataLength: number, iIndex: number) {
    header.forEach((hItem: any, hIndex: number) => {
      for (let dIndex = 0; dIndex < dataLength; dIndex++) {
        const alignFlag = aligns[iIndex] || configData.align || 'center'
        arg_ws.getCell(createCol(hIndex) + (dIndex + 1)).alignment = { vertical: 'middle', horizontal: alignFlag }
        // 是否需要黑色边框，默认需要
        // 是否需要黑色边框设置的优先等级，局部 -> 全局 -> 默认
        const borderFlag: boolean = borders[iIndex] != undefined ? borders[iIndex] : configData.border == undefined ? true : configData.border
        if (borderFlag && hIndex < data[0]?.length) {
          arg_ws.getCell(createCol(hIndex) + (dIndex + 1)).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
        // 是否需要斑马纹，默认不需要
        // 是否需要斑马纹设置的优先等级，局部 -> 全局 -> 默认
        const stripeFlag: boolean = stripes[iIndex] != undefined ? stripes[iIndex] : configData.stripe ? true : false
        if (stripeFlag && hIndex < data[0]?.length) {
          if (dIndex % 2 == 0) {
            arg_ws.getCell(createCol(hIndex) + (dIndex + 1)).fill = {
              type: 'gradient',
              gradient: 'angle',
              degree: 0,
              stops: [
                { position: 0, color: { argb: 'FFE4E4E4' } },
                { position: 1, color: { argb: 'FFE4E4E4' } }
              ]
            };
          }
        }
      }
    })
  }

  /**
   * 通过数字获取excel文档的大写字母
   * @param {n} 数字 
   * @returns 
   */
  function createCol(n: number) {
    const ordA = 'A'.charCodeAt(0)
    const ordZ = 'Z'.charCodeAt(0)
    const len = ordZ - ordA + 1
    let str = ""
    while (n >= 0) {
      str = String.fromCharCode(n % len + ordA) + str
      n = Math.floor(n / len) - 1
    }
    return str
  }

  // 设置　start-end 列的宽度
  /**
   * 设置行宽
   * @param arg_ws workSheet
   * @param arg_cols 列数组
   */
  function colWidth(arg_ws: any, arg_cols: any) {
    for (const i in arg_cols) {
      arg_ws.getColumn(parseInt(i) + 1).width = arg_cols[i].width
    }
  }
  // 保存下载
  workbook.xlsx.writeBuffer().then((buffer: any) => {
    saveAs(new Blob([buffer], {
      type: 'application/octet-stream'
    }), `${configData.fileName}.${bookType}`)
  })
}