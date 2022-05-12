import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
export default defineConfig({
	// base: '/pigMap/dist/',//gh-pages 設定路徑
	plugins: [vue()],
	resolve: {
		alias: {
			'@/': `${path.resolve(__dirname, 'src')}/`
		}
	},
})
