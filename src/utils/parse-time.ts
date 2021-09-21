export function parseTime(time: Date | number, cFormat?: string) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (("" + time).length === 10) time = Number(time) * 1000;
    date = new Date(time);
  }

  type FormatObj = {
    y: number,
    m: number,
    d: number,
    h: number,
    i: number,
    s: number,
    a: number,
    [s:string]: number
  }
  const formatObj: FormatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str: string = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: string, key: string):string => {
    let value:number|string = formatObj[key];

    if (key === "a")
      return ["一", "二", "三", "四", "五", "六", "日"][Number(value) - 1];
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return '' + value || '0';
  });
  
  return time_str;
}

/**
 * 
 * @param time 秒
 * @param option 
 * @returns 
 */
export function formatTime(time: number, option: string) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d.getTime()) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}
