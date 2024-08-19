<script setup lang="ts">
	import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
	onLaunch(() => {
		console.log("App Launch");
	});
	onShow(() => {
		console.log("App Show");
		// 路由守卫逻辑
		const currentPage = getCurrentPages().pop();
		const token = uni.getStorageSync('token');

		if (!token && currentPage?.route !== 'pages/login/') {
			// 如果没有 token 且当前页面不是登录页，则重定向到登录页
			uni.redirectTo({
				url: '/pages/login/index',
			});
		}
	});
	onHide(() => {
		console.log("App Hide");
	});
</script>
<style lang="scss">
	@import "uview-plus/index.scss";
</style>