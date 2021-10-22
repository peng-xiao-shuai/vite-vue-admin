import { ExportData, ExportConfigData } from './exportType';

export function exportExcelSheet(exportData: ExportData[] = [{
  header: [],
  prop: [],
  list: []
}], configData: ExportConfigData = {}) {
  import("@/utils/export/exportToExcel").then((excel) => {
    const headers: string[][] = []
    const datas: string[][] = []
    const multiHeaders: string[][] = []
    const sheetNames: string[] = []
    const merges: string[][] = []
    const borders: boolean[] = []
    const autoWidths: boolean[] = []
    const aligns: string[] = []
    const stripes: boolean[] = []

    // 如果没有设置文档名称，默认等于路由名称加数据数量
    const defaultFileName = '导出' + '(' + exportData[0].list.length + '条数据)'

    const fileName: any = configData.fileName || defaultFileName
    configData.fileName = fileName

    // 整合为二位数组
    exportData.forEach((eItem: ExportData, eIndex: number) => {
      headers.push(eItem.header || [])
      // datas.push(formatJson(eItem.prop, eItem.list))
      datas.push(getDatas(eItem))
      multiHeaders.push(eItem.multiHeader || [])
      merges.push(eItem.merges || [])
      sheetNames.push(eItem.sheetName || '')
      borders.push(eItem.border || undefined)
      autoWidths.push(eItem.autoWidth || undefined)
      aligns.push(eItem.align || '')
      stripes.push(eItem.stripe || undefined)
    })

    // console.log(datas);
    excel.export_json_to_excel_sheet({
      headers: headers,
      datas: datas,
      multiHeaders: multiHeaders,
      sheetNames: sheetNames,
      merges: merges,
      borders: borders,
      autoWidths: autoWidths,
      aligns: aligns,
      stripes: stripes,
    }, configData);

    /**
     * 处理导出数据
     * @param eItem 导出数据对象
     * @returns 
     */
    function getDatas(eItem: ExportData) {
      const list: any[] = []
      list.push(...formatJson(eItem.prop, eItem.list))
      if (eItem.showSummary) {
        const summaryList: any[] = []
        summaryList.push(...eItem.summaryList || [])
        list.push(summaryList)
      }
      return list
    }

    /**
     * 根据prop提取list中的数据
     * @param filterVal 
     * @param jsonData 
     * @returns 
     */
    function formatJson(filterVal: string[], jsonData: string[]) {
      return jsonData.map((v: any) => filterVal.map((j: any) => v[j]));
    };
  });
}