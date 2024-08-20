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
			<up-button type="primary" text="Login" @click="submitLogin"></up-button>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { getPublicKey, login } from '@/apis/login';
	import { reactive } from 'vue';
	import CryptoJS from "crypto-es";
	import { encryptSymmetricKey } from "@/utils/crypto/encryte";

	const form = reactive({
		username: '',
		password: '',
	});

	async function submitLogin() {
		const publicKeyRes = await getPublicKey();
		const publicKey = publicKeyRes.data.publicKey;
		const symmetricKey = CryptoJS.lib.WordArray.random(32).toString();
		const hashedPassword = CryptoJS.SHA256(form.password).toString();
		const encryptedPassword = CryptoJS.AES.encrypt(hashedPassword, symmetricKey).toString();
		const encryptedSymmetricKey = await encryptSymmetricKey(publicKey, symmetricKey);
		const loginRes = await login({username: form.username, password: encryptedPassword, key: encryptedSymmetricKey});
		if (loginRes.data.access_token) {
			uni.setStorageSync('token', loginRes.data.access_token);
			uni.redirectTo({
				url: '/pages/index/index',
			});
		} else {
			
		}
	}
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