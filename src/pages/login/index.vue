<template>
	<view class="login-container">
		<text class="title">Login</text>
		<up-form :model="form" labelPosition="left">
			<up-form-item labelWidth="80" class="input" label="Username:" borderBottom>
				<up-input border="none" v-model="form.username"></up-input>
			</up-form-item>

			<up-form-item labelWidth="80" class="input" label="Password:" borderBottom>
				<up-input type="password" border="none" v-model="form.password"></up-input>
			</up-form-item>
		</up-form>
		<view class="button">
			<up-button type="primary" text="Login"></up-button>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { reactive } from 'vue';

	const form = reactive({
		username: '',
		password: '',
	});
	
	
</script>

<style scoped>
	.login-container {
		padding: 40px 20px;
	}

	.title {
		display: inline-block;
		font-size: 24px;
		text-align: center;
		margin-bottom: 20px;
		width: 100%;
	}
	
	.form {
		width: 100%;
	}
	
	.button {
		margin-top: 20px;
	}
</style>