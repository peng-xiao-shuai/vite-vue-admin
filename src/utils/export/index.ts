import router from '@/router';

interface configData {
  fileName?: string | number, // 文档名称
  border?: boolean // 是否需要黑色边框
}

export function exportExcelSheet(exportData: any[] = [], configData: configData) {
  import("@/utils/export/exportToExcel").then((excel) => {
    const headers: any = []
    const datas: any = []
    const multiHeaders: any = []
    const sheetNames: any = []
    const merges: any = []

    // 如果没有设置文档名称，默认等于路由名称加数据数量
    const defaultFileName = router.currentRoute.value.meta.title || '导出' + '(' + exportData[0].list.length + '条数据)'

    const fileName: any = configData.fileName || defaultFileName

    // 整合为二位数组
    exportData.forEach((eItem: any, eIndex: number) => {
      headers.push(eItem.header || [])
      datas.push(formatJson(eItem.prop, eItem.list))
      multiHeaders.push(eItem.multiHeader || [])
      merges.push(eItem.merges || [])
      sheetNames.push(eItem.sheetName)
    })

    excel.export_json_to_excel_sheet({
      headers: headers,
      datas: datas,
      multiHeaders: multiHeaders,
      fileName: fileName,
      sheetNames: sheetNames,
      merges: merges,
    }, configData);

    function formatJson(filterVal: any, jsonData: any) {
      return jsonData.map((v: any) => filterVal.map((j: any) => v[j]));
    };
  });
}