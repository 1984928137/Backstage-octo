import type { FormInstance } from 'element-plus';
import { ref } from 'vue'
import { login } from '../axios/api';
import { useRoute, useRouter } from 'vue-router';

interface LoginForm {
    userName: string,
    password: string
}

class InitData {
    loginFormRef = ref<FormInstance>()
    route = useRoute()
    router = useRouter()

    loginForm: LoginForm = {
        userName: '',
        password: '',
    }
    constructor(){
    }



    submitForm = () => {
        this.loginFormRef.value?.validate((valid: unknown) => {
            if (valid) {
                console.log('submit!'),

                    login(
                        this.loginForm
                    ).then(
                        res => {
                            console.log(res.data)

                            localStorage.setItem('token', res.data.token)
                            console.log(localStorage.getItem('token'))
                            return res
                        }
                    ).catch(err => {
                        console.log(err)
                    })

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