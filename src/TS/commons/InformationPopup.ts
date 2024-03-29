import { ReactiveEffect, ref, Ref, reactive, ReactiveEffectOptions } from "vue"
import type { StudentList } from "../studentList";
import type { FormInstance, FormRules } from 'element-plus'
import { exRequest, RouterAPI } from "../../axios/api";

interface Opt {
    value: string
    label: string
}




class InitPopup {
    dialogFormVisible: Ref<boolean>
    tableData: Ref<StudentList[][]>
    data: unknown
    studentListData: Ref<StudentList>
    formLabelWidth: string
    FNumber: Ref<number>
    formData: any
    FDom: HTMLElement
    formSize: Ref<string>
    ruleFormRef: Ref<FormInstance | undefined>
    rules: FormRules
    options: Opt[]
    isCreate: Ref<boolean>
    isShow: Ref<string>
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
            isShow: true,
            familyMember: [{
                familyAge: '',
                familyName: '',
                familyPhone: '',
                familyProfession: '',
                familyRelation: '',
                familyWorkPlace: '',
            }]
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
        this.FDom = document.getElementById('family') as HTMLElement
        this.formLabelWidth = '68px'
        this.formSize = ref('default')
        this.FNumber = ref(1)
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
        this.isCreate = ref(false)
        this.isShow = ref('')
    }
    
    // 向后端发送 修改信息 的post请求
    subListChange = (val:string) => {
        return exRequest.post({
            url: val,
            data: this.formData
        })
    }

    familyMember = (val: any) => {
        if (val.familyMember !== undefined) {
            val.familyMember == '' ? val.familyMember = [{
                familyName: '',
                familyAge: '',
                familyPhone: '',
                familyProfession: '',
                familyRelation: '',
                familyWorkPlace: '',
            }]
                : val.familyMember
        }


    }

    // 提交创建的新信息
    subCreateStuNew = async (formEl: FormInstance | undefined) => {

        if (!formEl) return
        await formEl.validate(async (valid, fields) => {
            if (valid) {

                console.log('添加信息!', this.isShow.value)
                if (this.isShow.value == "teacherList") {
                    this.data = await this.subListChange(RouterAPI.TeacherListChange)
                }
                
                this.dialogFormVisible.value = false
                console.log(this.formData)
                this.FNumber.value = 1
            } else {
                console.log('error submit!', fields)
            }
        })
    }

    closeDialog = () => {
        console.log('closeDialog')
        if (this.isShow.value == "studentList") {
            this.FNumber.value = 1
            this.FDom = document.getElementById('family') as HTMLElement
            this.FDom.style.height = '80px'
        }
    }

    changeBoon = <T>(val: T, bool: boolean, transfer: string) => {
        // 判断是否创建新的信息
        bool == false ? this.isCreate.value = false : this.isCreate.value = true
        console.log(val)
        this.formData = JSON.parse(JSON.stringify(val))
        this.isShow.value = transfer
        this.dialogFormVisible.value = true
        // val = JSON.parse(JSON.stringify(val))
        this.isShow.value == 'studentList' ? this.familyMember(this.formData) : null
        console.log('formData', this.formData)
    }

    



    AddFamily = () => {

        this.formData.familyMember.push({
            familyName: '',
            familyAge: '',
            familyPhone: '',
            familyProfession: '',
            familyRelation: '',
            familyWorkPlace: '',
        })
        this.FNumber.value++
        this.FDom = document.getElementById('family') as HTMLElement
        this.FDom.style.height = (80 + (this.FNumber.value - 1) * 40) + "px"
    }

    // 提交修改后的新信息
    submitForm = async (formEl: FormInstance | undefined) => {

        if (!formEl) return
        await formEl.validate(async (valid, fields) => {
            if (valid) {
                console.log('submit!', this.isCreate.value)
                if (this.isShow.value == "teacherList") {
                    this.data = await this.subListChange(RouterAPI.TeacherListChange)
                }
                this.dialogFormVisible.value = false
                console.log(this.formData)
                this.FNumber.value = 1
            } else {
                console.log('error submit!', fields)
            }
        })
    }
    resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        // console.log('reset')
        // this.familyMember(this.resetData)
        // this.formData = this.resetData
        // console.log('reset2', this.resetData, this.formData)
        formEl.resetFields()
    }
}








export {
    InitPopup
}