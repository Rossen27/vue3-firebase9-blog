import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
export default defineConfig({
  // base: '/pigMap/dist/',//gh-pages 設定路徑
  plugins: [vue()],
  resolve: {
    alias: { '@/': `${path.resolve(__dirname, 'src')}/` }
  },
  css: {
		//css预处理
		preprocessorOptions: {
			scss: {
				/*
				引入var.scss全局预定义变量，
				如果引入多个文件，
				可以使用
				'@import "@/assets/scss/globalVariable1.scss";@import "@/assets/scss/globalVariable2.scss";'
				这种格式
				 */
				additionalData: '@import "@/assets/scss/globalVariable.scss";'
			}
		}
	}
})