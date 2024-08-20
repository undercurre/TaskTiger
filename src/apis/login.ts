import http from '../services/request/index';
interface LoginPar {
	username : string; password : string; key : string;
}

interface LoginRes {
	access_token : string
}

interface PublicKeyRes {
	publicKey: string;
}

// 获取公钥

export function getPublicKey() {
	return http.get<PublicKeyRes>('/auth/public-key')
}

// 登录
export function login(params : LoginPar) {
	return http.post<LoginRes>('/auth/login', { ...params });
}