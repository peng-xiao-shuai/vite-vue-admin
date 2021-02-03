import { defineConfig } from "vite";

import vue from '@vitejs/plugin-vue';

import path from 'path';


export default defineConfig({
  plugins:[vue()],
  alias: {
    "/@": path.resolve(__dirname, "./src"),
  },
  server: {
    host: "localhost",
    port: 8088,
    // 是否自动在浏览器打开
    open: false,
    // 是否开启 https
    https: false,
    proxy: {
      //   '/api': {
      // target: 'https://blog.csdn.net/weixin_45292658',
      // changeOrigin: true,
      // rewrite: path => path.replace(/^\/api/, '')
      //   }
    },
  },
});
