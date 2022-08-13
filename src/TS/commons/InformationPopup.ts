import { ReactiveEffect, ref, Ref, reactive, ReactiveEffectOptions } from "vue"
import type { StudentList } from "../studentList";
import type { FormInstance, FormRules } from 'element-plus'
import { exRequest, RouterAPI } from "../../axios/api";

interface Opt {
    value: string
    label: string
}

interface TypeAs<T> {

}


class InitPopup {
    dialogFormVisible: Ref<boolean>
    tableData: Ref<StudentList[][]>
    data: unknown
    studentListData: Ref<StudentList>
    formLabelWidth: string
    formData: any
    formSize: Ref<string>
    ruleFormRef: Ref<FormInstance | undefined>
    rules: FormRules
    options: Opt[]
    constructor() {
        this.dialogFormVisible = ref(false)
        this.tableData = ref<StudentList[][]>(
            []
        )
        this.studentListData = ref<StudentList>({
            id: '',
            time: '',
            name: '',
            studentID: '',
            sex: '',
            phone: 0,
            nationality: '',
            boarding: '',
            page: 1,
            count: 0,
            isShow: true
        })
        this.formData = {
            id: '',
            time: '',
            name: '',
            studentID: '',
            sex: '',
            phone: 0,
            nationality: '',
            boarding: '',
            page: 1,
            count: 0,
            isShow: true
        }
        this.formLabelWidth = '68px'
        this.formSize = ref('default')
        this.ruleFormRef = ref<FormInstance>()
        this.rules = reactive<FormRules>({
            name: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            studentID: [
                {
                    required: true,
                    message: 'Please select Activity zone',
                    trigger: 'blur',
                },
            ],
            sex: [
                {
                    required: true,
                    message: 'Please select Activity count',
                    trigger: 'change',
                },
            ],
            phone: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            nationality: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            IDcard: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            time: [
                {
                    type: 'date',
                    required: true,
                    message: 'Please pick a date',
                    trigger: 'blur',
                },
            ],
            boarding: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            accountType: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            accountLocation: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            familyFinancialSituation: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            censusRegister: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            currentAddress: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            whetherChildren: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            behindChildren: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            familyMember: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            awards: [
                { required: true, message: 'Please input Activity name', trigger: 'blur' },
                { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ],
            // type: [
            //     {
            //         type: 'array',
            //         required: true,
            //         message: 'Please select at least one activity type',
            //         trigger: 'change',
            //     },
            // ],
            specialty: [
                {
                    required: true,
                    message: 'Please select activity resource',
                    trigger: 'blur',
                },
            ],
            // desc: [
            //     { required: true, message: 'Please input activity form', trigger: 'blur' },
            // ],
        })
        this.options = [
            {
                value: '0',
                label: '城市户口',
            },
            {
                value: '1',
                label: '农村户口',
            },

        ]
    }
    changeBoon = <T>(val: T) => {
        this.dialogFormVisible.value = true
        val = JSON.parse(JSON.stringify(val))
        this.formData = val
        console.log(this.formData)
    }

    studentListChange = () => {
        return exRequest.post({
            url: RouterAPI.StudentListChange,
            data: this.formData
        })
    }

    submitForm = async (formEl: FormInstance | undefined) => {

        if (!formEl) return
        await formEl.validate(async (valid, fields) => {
            if (valid) {
                console.log('submit!')
                this.data = await this.studentListChange()
                console.log(this.formData)
            } else {
                console.log('error submit!', fields)
            }
        })
    }
    resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }
}








export {
    InitPopup
}