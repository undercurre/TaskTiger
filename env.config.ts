export const config = {
    BASE_API: fn(),
}
function fn(){
	//生产环境
	if(process.env.NODE_ENV == 'production'){
		return 'http://localhost:3000'
	}else{
	//开发环境
		return 'http://localhost:3000'
	}
}
