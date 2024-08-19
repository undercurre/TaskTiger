import http from '../services/request/index';

interface LoginPar {
	username: string; password: string; key: string;
}

interface LoginRes {
	access_token: string
}

// 登录
export function login(params: LoginPar) {
  return http.post<LoginRes>('/auth/login', { ...params });
}