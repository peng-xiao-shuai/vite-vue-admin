type Option = {
  deg: number,
  size: number,
  ratio: number,
  text: string,
  color: string
}
const options = {
  deg: -20,
  size: 30,
  ratio: 0,
  text: 'Peng_Xiao_Shuai',
  color: '#999'
}

interface styles {
  [s: string]: string
}
const divStyles: styles = {
  position: 'fixed',
  top: '0px',
  left: '0px',
  zIndex: '99999',
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none',
}

export function remove() {
  const watermark = document.getElementById('watermark')
  watermark && document.getElementsByTagName('body')[0].removeChild(watermark)
}

export function create(option?: Option) {
  remove()

  Object.assign(options, option)
  // 创建dome
  const canvas = document.createElement('canvas')
  const dpr = window.devicePixelRatio || 1
  const cw = options.size * 6;
  const ch = options.size * 4;
  canvas.width = cw * dpr;
  canvas.height = ch * dpr;

  // 获取实例
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    console.error('canvas 实例获取失败');
    return
  }
  // 绘制背景
  ctx.fillStyle = 'rgba(0,0,0,0)'
  ctx.fillRect(0, 0, cw, ch)
  ctx.save()
  // 旋转文字
  ctx.translate(cw / 2, ch / 2)
  ctx.rotate(Math.PI / 180 * options.deg);
  ctx.font = (options.size) + "px 黑体";
  ctx.fillStyle = options.color
  ctx.fillText(options.text, -ctx.measureText(options.text).width / 2, options.size / 2)
  ctx.translate(-(cw / 2), -(ch / 2));

  // 创建div
  const div = document.createElement('div')
  document.getElementsByTagName('body')[0].append(div)
  // 添加样式
  let d: string
  for (d in divStyles) (div.style as CSSStyleDeclaration & {[s:string]: string})[d] = divStyles[d]

  div.style.background = `rgba(0,0,0,${options.ratio / 100}) url(${canvas.toDataURL('image/png')}) left top repeat`;
  div.setAttribute('id', 'watermark')
}
// 绘制线
// function lineFun(ctx: CanvasRenderingContext2D, moveTo: number[], lineTo: number[]) {
//   ctx.beginPath();
//   ctx.strokeStyle = "blue"; // 蓝色路径
//   ctx.moveTo(moveTo[0], moveTo[1]);
//   ctx.lineTo(lineTo[0], lineTo[1]);
//   ctx.stroke(); // 进行绘制
//   ctx.save()
// }