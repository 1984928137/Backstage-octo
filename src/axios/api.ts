import EXRequest from './index';
import LocalCache from './cache';
import * as qs from 'qs'

import { ElMessage } from 'element-plus'
// 在非组件成员中想要使用router,则需要导入router模块
import { router } from "../router/index";


enum RouterAPI {
    AccountLogin = '/users/login',
    LoginUserInfo = '/users/', // 用法: /users/1
    UserMenus = '/api/getRole', // 用法: /api/getRole/1/menu
    Product = '/api/product',
    ProductQuire = '/api/productQuire',
    GetUser = '/api/getUser',
    Authority = '/api/authority',
    GetRouter = '/api/getRouter',
    StudentList = "/api/studentList",
}

interface HttpDefault {
    method: string,
    url: string,
    params: unknown,
    data: string | null
}

interface LoginData {
    userName: string,
    password: string
}
const $http = {
    baseURL: 'http://120.78.133.68:3000',
    timeout: 3000,
    headers: {
        'Content-Type': "application/json;charset=utf-8"
    }
}

const setTime = () => window.location.reload()
// const routers = router
const tzRouter = () => router.push({ path: '/login' })


const exRequest = new EXRequest({
    baseURL: $http.baseURL,
    timeout: $http.timeout,
    interceptors: {
        requestInterceptor: (config: any) => {
            // 携带token的拦截
            const token = LocalCache.getCache('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            console.log('请求成功的拦截',token)
            return config
        },

        requestInterceptorCatch: (err) => {
            console.log('请求失败的拦截',err)
            return err
        },
        responseInterceptor: (res) => {
            console.log('响应成功的拦截')
            return res
        },
        responseInterceptorCatch: (err) => {
            console.log('响应失败的拦截',err)
            if (err.response.status == 401) {

                ElMessage.error('帐号已过期，请重新登录帐号')
                localStorage.removeItem('token')
                // router.replace('/login')

                console.log('401跳转', err)
                setTimeout(tzRouter, 3000)
                return err
            }
            return err
        }
    }
})

// const api = function (method: string, url: string, params: LoginData | Object | null) {
//     let httpDefault: HttpDefault = {
//         method,
//         url,
//         params: method === 'GET' || method === 'DELETE' ? params : null,
//         data: method === 'POST' || method === 'PUT' ? JSON.stringify(params) : null
//     }
//     // .then(
//     //     res =>{
//     //         return res.data
//     //     }
//     // ).catch(err => {
//     //     console.log(err)
//     // })
// }

// // 登录请求
// const login = (data: LoginData | Object | null) => api('POST', "/users/login", data)

// // 商品初始化列表
// const productData = (data: LoginData | Object | null) => api('GET', "/api/product", data)

// // 商品查询
// const productQuire = (data: LoginData | Object | null) => api('POST', "/api/productQuire", data)

// // 获取角色列表，例如学生、老师等
// const getRole = (data: LoginData | Object | null | string) => api('GET', "/api/getRole", data)

// // 用户列表
// const getUser = (data: LoginData | Object | null | string) => api('GET', "/api/getUser", data)

// const authority = (data: LoginData | object | null | string) => api('GET', "/api/authority", data)

// const getRouter = (data: LoginData | object | null | string) => api('GET', "/api/getRouter", data)

export {
    exRequest,
    RouterAPI
}