import { ref, Ref, toRefs } from "vue"
import type { ElTable } from "element-plus";
import { RouterAPI, exRequest } from "../axios/api";

interface QuireData {
    time?: string | number,
    name?: string,
    id: number | string
    // 学号
    studentID?: number | string,
    sex?: number | string,
    phone?: number,
    // 民族
    nationality?: string,
    // 寄宿
    boarding?: string,
}

interface FamilyMember{
    familyName:string,
    familyAge:string|number,
    familyRelation:string,
    familyWorkPlace:string,
    familyProfession:string,
    familyPhone:string|number,
}

interface StudentList {
    // 出生时间
    time: string,
    name: string,
    id: number | string,
    // 学号
    studentID: number | string,
    sex: number | string,
    phone: number,
    // 民族
    nationality: string,
    // 寄宿
    boarding: string,
    page: number,
    count: number,
    isShow: boolean
    // 身份证号
    IDcard?:string
    // 户口类型
    accountType?:string
    // 户口所在地
    accountLocation?:string
    // 家庭经济情况
    familyFinancialSituation?:string
    // 户籍
    censusRegister?:string
    // 现住址
    currentAddress?:string
    // 是否留守儿童
    whetherChildren?:boolean
    // 留守儿童
    behindChildren?:string
    // 家庭成员
    familyMember: FamilyMember
    // 获奖情况
    awards?:string
    // 特长
    specialty?:string
}


class InitData {
    quireData: Ref<QuireData>
    studentListData: Ref<StudentList>
    studentQuierData: Ref<StudentList[]>
    anyField: Ref<string | number>
    pageIndex: Ref<number>
    tableData: Ref<StudentList[][]>
    multipleSelection: Ref<StudentList[]>
    multipleTableRef: Ref
    value: Ref<boolean>
    currentRow: Ref<StudentList | undefined>
    data: any
    dialogFormVisible: Ref<boolean>
    formLabelWidth: string
    formDataCount: Ref<number>
    formData: StudentList

    constructor() {
        this.quireData = ref<QuireData>(
            {
                id: '',
                time: '',
                name: '',
                studentID: '',
                sex: '',
                phone: 0,
                nationality: '',
                boarding: ''
            }
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
            familyMember:{
                familyAge:'',
                familyName:'',
                familyPhone:'',
                familyProfession:'',
                familyRelation:'',
                familyWorkPlace:'',
            }
        })
        this.anyField = ref<string | number>('')
        this.pageIndex = ref<number>(1)
        this.studentQuierData = ref([])
        this.tableData = ref(
            []
        )
        this.multipleSelection = ref<StudentList[]>([])
        this.multipleTableRef = ref<InstanceType<typeof ElTable>>()
        this.value = ref<boolean>(true)
        this.currentRow = ref<StudentList | undefined>()
        this.dialogFormVisible = ref(false)
        this.formLabelWidth = '140px'
        this.formDataCount = ref(0)
        this.formData =
        {
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
            familyMember: {
                familyAge: '',
                familyName: '',
                familyPhone: '',
                familyProfession: '',
                familyRelation: '',
                familyWorkPlace: '',
            }
        }
    }

    productQuire = () => {
        // this.productQuireData
        return exRequest.post({
            url: RouterAPI.Product,
            data: this.quireData
        })
    }

    onQuireClick = async () => {
        if (!this.quireData.value.studentID && !this.quireData.value.name) {
            return
        }
        console.log('onQuireClick!')
        // this.data = await this.productQuire()
        // .then(res => {
        // this.tableData.value = []
        // this.studentListData.count = this.data?.result.length == 'undefined' ? 1
        //     : this.data?.result.length
        // this.splitArray(this.data?.result)
        //     return res.data.result
        // })
        // .catch(err => {
        //     console.log(err)
        // })
        let quireData = this.quireData.value.studentID ? this.studentQuierData.value.filter(v => v.studentID.toString().indexOf(this.quireData.value.studentID as string) != -1)
            : this.studentQuierData.value.filter(v => v.name.indexOf(this.quireData.value.name as string) != -1)
        this.tableData.value = []
        this.splitArray(quireData)
        this.studentListData.value.count = quireData.length
    }
    handleCurrentChange = (val: number) => {
        this.pageIndex.value = val
        console.log('pageIndex', this.pageIndex.value)
        this.studentListData.value.page = val
    }
    splitArray = (val: StudentList[]) => {
        for (let index = 0; index < val.length; index += 5) {
            let list: StudentList[] = val.slice(index, index + 5)
            this.tableData.value.push([...list])
        }
        console.log('splitArray', this.tableData.value)
    }

    handleSelectionChange = (val: StudentList[]) => {
        console.log(val)
        this.multipleSelection.value = val
    }
    handleCurrentChanges = (val: StudentList | undefined) => {
        console.log(val, '566')
        this.currentRow.value = val
    }
    toggleSelection = (rows?: StudentList[]) => {
        if (rows) {
            rows.forEach((row) => {

                this.multipleTableRef.value!.toggleRowSelection(row, undefined)
            })
        } else {
            this.multipleTableRef.value!.clearSelection()
        }
    }
   
    handleDelete = (index: number, row: StudentList) => {
        console.log(index, row)
    }
    clickClose = () => {

    }
}



export {
    InitData
}

export type {
    StudentList,
    FamilyMember
}