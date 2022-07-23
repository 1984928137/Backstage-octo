import type { FormInstance } from 'element-plus';
import { ref } from 'vue'
import LocalCache from '../axios/cache';
import { exRequest, RouterAPI } from '../axios/api';
import { useRoute, useRouter } from 'vue-router';

interface LoginForm {
    userName: string,
    password: string
}

class InitData {
    loginFormRef = ref<FormInstance>()
    route = useRoute()
    router = useRouter()
    data: any

    loginForm: LoginForm = {
        userName: '',
        password: '',
    }
    constructor() {
    }

    resData() {
        return exRequest.post({
            url: RouterAPI.AccountLogin,
            data: this.loginForm
        })
    }

    submitForm = async () => {
        this.loginFormRef.value?.validate(async (valid: unknown) => {
            if (valid) {
                console.log('submit!'),
                this.data = await this.resData()
                // .then(
                //     res => {
                //         console.log(res)
                console.log('data!', this.data.token)
                LocalCache.setCache('token', this.data.token)
                console.log('login',LocalCache.getCache('token'))
                //         return res
                //     }
                // ).catch(err => {
                //     console.log(err)
                // })

                this.router.push('/')
            } else {
                console.log('error submit!')
                return false
            }
        })
    }
}


export {
    InitData
}
export type {
    LoginForm
}