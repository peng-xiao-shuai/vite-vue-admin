import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    Components({
      globs: [
        'src/components/*.{vue|tsx}',
        'src/views/**/components/*.{vue|tsx}',
      ],
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
    viteCompression({
      threshold: 1024000, // 对大于 1mb 的文件进行压缩
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'typings'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element.scss" as *;`,
      },
    },
  },
  define: {
    __VUE_I18N_LEGACY_API__: false,
    __VUE_I18N_FULL_INSTALL__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  // base: "/",
  // 控制台打印
  // logLevel: "silent",
  build: {
    chunkSizeWarningLimit: 1024,
    // rollupOptions: {
    //   external: ["src/*"],
    // },
  },
  server: {
    hmr: {
      overlay: false,
    },
    // host: "localhost",
    port: 3002,
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
})
