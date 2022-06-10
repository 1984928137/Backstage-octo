import type { FormInstance } from 'element-plus';
import { reactive, Ref, ref } from 'vue'
// import { login } from '../../axios/api';
import { RouteLocationRaw, Router, useRoute, useRouter } from 'vue-router';



enum Gender {
    '中性' = 0,
    '男性' = 1,
    '女性' = 2,
}

interface BasicForm {
    userName: string,
    password: string,
    isShow: Ref<boolean>[],
    accountNumber: number,
    gender: Gender
    count: number
    delivery: Ref<boolean>
    type:[]
    resource:string
    desc:string
}
interface Option {
    name: string,
    num: number
}

class InitData {
    basicFormRef = ref<FormInstance>()
    route: RouteLocationRaw = useRoute()
    router: Router = useRouter()
    isShow1: Ref<boolean> = ref(true)
    isShow2: Ref<boolean> = ref(true)
    isShow3: Ref<boolean> = ref(true)
    options: Option[]

    basicForm: BasicForm = {
        userName: '',
        password: '',
        isShow: reactive([
            this.isShow1,
            this.isShow2,
            this.isShow3
        ]),
        accountNumber: 0o000000000,
        gender: Gender['中性'],
        count: 0,
        delivery:ref(false),
        type:[],
        resource:'',
        desc:''
    }
    constructor() {
        this.options = [
            {
                name: '老师',
                num: 0
            },
            {
                name: '学生',
                num: 1
            }
        ]
    }



    submitForm = () => {
        this.basicFormRef.value?.validate((valid: unknown) => {
            if (valid) {
                console.log('submit!')

                //     login(
                //         this.loginForm
                //     ).then(
                //         res => {
                //             console.log(res.data)

                //             localStorage.setItem('token', res.data.token)
                //             console.log(localStorage.getItem('token'))
                //             return res
                //         }
                //     ).catch(err => {
                //         console.log(err)
                //     })

                // this.router.push('/')
            } else {
                console.log('error submit!')
                return false
            }
        })
    }

    resetForm = ()=>{
        if (!this.basicFormRef.value) return
        this.basicFormRef.value?.resetFields()
    }
}


export {
    InitData
}
export type {
    BasicForm
}