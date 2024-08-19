const methods = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];

export function setupRouteGuards() {
	methods.forEach(method => {
		uni.addInterceptor(method, {
			invoke(e) {
				// 相同的路由守卫逻辑
				const token = uni.getStorageSync('token');
				const restrictedPages = ['/pages/index/index'];

				if (restrictedPages.includes(e.url) && !token) {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
					});
					uni.redirectTo({
						url: '/pages/login/index',
					});
					return false;
				}
				return true;
			},
		});
	});
}