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
    count: string
    delivery: Ref<boolean>
    type: []
    resource: string
    desc: string
}
interface Option {
    value: string,
    label: string
}

class InitData {
    basicFormRef = ref<FormInstance>()
    route: RouteLocationRaw = useRoute()
    router: Router = useRouter()
    isShow1: Ref<boolean> = ref(true)
    isShow2: Ref<boolean> = ref(true)
    isShow3: Ref<boolean> = ref(true)
    options: Option[]
    rules: {}

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
        count: '',
        delivery: ref(false),
        type: [],
        resource: '',
        desc: ''
    }
    constructor() {
        this.options = Array.from({ length: 10 }).map((_, idx) => ({
            value: `${idx + 1}`,
            label: `${idx + 1}`,
        }))
        this.rules = reactive({
            userName: [
                { required: false, message: "Please input 帐号", trigger: "blur" },
                {
                    min: 6,
                    max: 20,
                    message: "字符长度在 6 to 20 之间",
                    trigger: "blur",
                },
            ],
            accountNumber: [
                {
                    required: false,
                    message: 'Please select Activity zone',
                    trigger: 'change',
                },
            ],
            count: [
                {
                    required: false,
                    message: 'Please select Activity count',
                    trigger: 'change',
                },
            ],
            type: [
                {
                    type: 'array',
                    required: false,
                    message: 'Please select at least one activity type',
                    trigger: 'change',
                },
            ],
            resource: [
                {
                    required: false,
                    message: 'Please select activity resource',
                    trigger: 'change',
                },
            ],
            desc: [
                { required: false, message: 'Please input activity form', trigger: 'blur' },
            ],
        });
    }



    submitForm = () => {
        this.basicFormRef.value?.validate((valid: unknown) => {
            if (valid) {
                console.log('submit!',this.basicForm)

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

    resetForm = () => {
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