import { ref, Ref } from "vue"
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
}


class InitData {
    quireData: Ref<QuireData>
    studentListData: Ref<StudentList>
    anyField: Ref<string | number>
    pageIndex: Ref<number>
    tableData: Ref<StudentList[][]>
    multipleSelection: Ref<StudentList[]>
    multipleTableRef: Ref
    value: Ref<boolean>
    currentRow: Ref<StudentList | undefined>
    data: any

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
            isShow: true
        })
        this.anyField = ref<string | number>('')
        this.pageIndex = ref<number>(0)
        this.tableData = ref<StudentList[][]>(
            []
        )
        this.multipleSelection = ref<StudentList[]>([])
        this.multipleTableRef = ref<InstanceType<typeof ElTable>>()
        this.value = ref<boolean>(true)
        this.currentRow = ref<StudentList | undefined>()

    }

    productQuire = () => {
        // this.productQuireData
        return exRequest.post({
            url: RouterAPI.Product,
            data: this.quireData
        })
    }

    onQuireClick = async () => {
        console.log('submit!')
        if (!this.quireData.value.id && !this.quireData.value.name) {
            return
        }
        this.data = await this.productQuire()
        // .then(res => {
        this.tableData.value = []
        this.studentListData.count = this.data?.result.length == 'undefined' ? 1
            : this.data?.result.length
        this.splitArray(this.data?.result)
        //     return res.data.result
        // })
        // .catch(err => {
        //     console.log(err)
        // })

        // this.tableData = this.obj.value
        console.log('onSubmit', this.tableData.value)

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
    handleEdit = (index: number, row: StudentList) => {

        // row.isShow = true
        // this.[index].value = row.price
        // this.name[index].value = row.name
        // this.address[index].value = row.address
        console.log(index, row)
        // row._id == this.currentRow.value._id ? this.rowShow.value = true 
        // : this.rowShow.value = false
    }
    handleDelete = (index: number, row: StudentList) => {
        console.log(index, row)
    }
}



export {
    InitData
}