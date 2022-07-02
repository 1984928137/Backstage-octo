import type { FormInstance } from 'element-plus';
import { ref } from 'vue'
import LocalCache from '../axios/cache';
import { exRequest, LoginAPI } from '../axios/api';
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
            url: LoginAPI.AccountLogin,
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

                //         // LocalCache.setCache('token', res)
                //         console.log(LocalCache.getCache('token'))
                //         return res
                //     }
                // ).catch(err => {
                //     console.log(err)
                // })
                console.log('data!', this.data)

                // this.router.push('/')
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