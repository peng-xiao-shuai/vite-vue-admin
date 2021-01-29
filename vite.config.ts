
// const fs = require("fs")
const path = require("path")
 
// Dotenv 是一个零依赖的模块，它能将环境变量中的变量从 .env 文件加载到 process.env 中
// const dotenv = require("dotenv")
 
// const envFiles = [
//   /** default file */ `.env`,
//   // /** mode file */ `.env.${process.env.NODE_ENV}`
// ]
 
// for (const file of envFiles) {
//   const envConfig = dotenv.parse(fs.readFileSync(file))
//   for (const k in envConfig) {
//     process.env[k] = envConfig[k]
//   }
// }
module.exports = {
    alias: {
      // 键必须以斜线开始和结束
      '/@/': path.resolve(__dirname, './src')
    },
    hostname: 'localhost',
    port: 8088,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 是否自动在浏览器打开
    open: false,
    // 是否开启 https
    https: false,
    // 服务端渲染
    ssr: false,
    /**
     * 在生产中服务时的基本公共路径。
     * @default '@/src'
     */
    base: './',
    /**
     * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
     * @default 'dist'
     */
    outDir: 'dist',
    // 反向代理
    proxy: {
    //   '/api': {
        // target: 'https://blog.csdn.net/weixin_45292658',
        // changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '')
    //   }
    }
  }