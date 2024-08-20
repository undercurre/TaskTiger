import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { config } from './env.config';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [uni()],
	server: {
		proxy: {
			// 将所有以 `/api` 开头的请求代理到目标服务器
			'/api': {
				target: config.BASE_API,
				changeOrigin: true,  // 跨域
				rewrite: (path) => path.replace(/^\/api/, ''),  // 重写路径
			},
		},
	},
});