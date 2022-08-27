import { ref, Ref, toRefs } from "vue"
import type { ElTable } from "element-plus";
import { RouterAPI, exRequest } from "../axios/api";
import { isArray } from "element-plus/lib/utils";

interface StuOptions {
    label: string,
    value: string
}

enum FamilyS {
    name = 0,
    studentID = 1,
    sex = 2,
    phone = 3,
    nationality = 4,
    boarding = 5,
    IDcard = 6,
    accountType = 7,
    censusRegister = 8,
    currentAddress = 9,
    whetherChildren = 10,
}

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

interface FamilyMember {
    familyName: string,
    familyAge: string | number,
    familyRelation: string,
    familyWorkPlace: string,
    familyProfession: string,
    familyPhone: string | number,
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
    IDcard?: string
    // 户口类型
    accountType?: string
    // 户口所在地
    accountLocation?: string
    // 家庭经济情况
    familyFinancialSituation?: string
    // 户籍
    censusRegister?: string
    // 现住址
    currentAddress?: string
    // 是否留守儿童
    whetherChildren?: boolean
    // 留守儿童
    behindChildren?: string
    // 家庭成员
    familyMember: FamilyMember[]
    // 获奖情况
    awards?: string
    // 特长
    specialty?: string
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
    options: StuOptions[]
    FieldValue: Ref<string>
    timeValue1: Ref<string>
    defaultTime: Ref<Date[]>

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
            familyMember: [{
                familyAge: '',
                familyName: '',
                familyPhone: '',
                familyProfession: '',
                familyRelation: '',
                familyWorkPlace: '',
            }]
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
            familyMember: [{
                familyAge: '',
                familyName: '',
                familyPhone: '',
                familyProfession: '',
                familyRelation: '',
                familyWorkPlace: '',
            }]
        }
        this.options = [
            { label: '名字', value: '0' },
            { label: '学号', value: '1' },
            { label: '性别', value: '2' },
            { label: '手机号码', value: '3' },
            { label: '民族', value: '4' },
            { label: '是否住宿', value: '5' },
            { label: '身份证', value: '6' },
            { label: '户口类型', value: '7' },
            { label: '户籍', value: '8' },
            { label: '居住城市', value: '9' },
            { label: '是否留守', value: '10' }
        ]
        this.FieldValue = ref('')
        this.timeValue1 = ref('')
        this.defaultTime = ref([
            new Date(2000, 1, 1, 0, 0, 0),
            new Date(2000, 2, 1, 23, 59, 59),
        ])
    }

    productQuire = () => {
        // this.productQuireData
        return exRequest.post({
            url: RouterAPI.Product,
            data: this.quireData
        })
    }

    DataFilters = (list: any, field: string, key: string | number | undefined) => {


        if (Object.prototype.hasOwnProperty.call(list, field)) {
            console.log(list[field], key, field)
            const element = list[field];
            if (element.toString().indexOf(key) >= 0) {

                return list
            } else {
                for (const keys in list) {
                    const element = list[keys];
                    if (element.toString().indexOf(key) >= 0) {
                        console.log(list[keys], key, keys)
                        return list
                    }
                }
            }
        }

        // console.log("arr",arr)
        // return arr
    }

    onQuireClick = async () => {
        if (!this.timeValue1.value && !this.anyField.value) {
            console.log('没有值，查询不了')
            return null
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
        let quireDatas: any = []
        console.log(this.FieldValue.value, FamilyS[Number.parseInt(this.FieldValue.value)])
        if (this.timeValue1.value[0]) {
            quireDatas = this.timeValue1.value[1] ? this.studentQuierData.value.filter(
                v => Date.parse(this.timeValue1.value[0]) <= Date.parse(v.time) && Date.parse(v.time) <= Date.parse(this.timeValue1.value[1])

            )
                : this.studentQuierData.value.filter(
                    v => Date.parse(this.timeValue1.value[0]) <= Date.parse(v.time)
                )
            if (this.anyField.value) {
                quireDatas = quireDatas.filter(
                    (v: unknown) => {
                        // console.log(v)
                        return this.DataFilters(v, FamilyS[Number.parseInt(this.FieldValue.value)], this.anyField.value)
                    }
                )
            }
        } else if (this.quireData.value.name) {
            quireDatas = this.studentQuierData.value.filter(
                v => v.name.indexOf(this.quireData.value.name as string) != -1
            )
        } else if (this.anyField.value) {
            quireDatas = this.studentQuierData.value.filter(v => {
                // console.log(v)
                return this.DataFilters(v, FamilyS[Number.parseInt(this.FieldValue.value)], this.anyField.value)
            })
        }
        console.log(Array.isArray(quireDatas))
        this.tableData.value = []
        this.splitArray(quireDatas)
        this.studentListData.value.count = quireDatas.length
    }
    onRestoreClick = () => {
        this.tableData.value = []
        let RestoreData: StudentList[] = JSON.parse(JSON.stringify(this.studentQuierData.value))
        this.splitArray(RestoreData)
        this.studentListData.value.count = RestoreData.length
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
    OnTimeClick = (val: any) => {
        console.log(val)
    }
}



export {
    InitData
}

export type {
    StudentList,
    FamilyMember
}