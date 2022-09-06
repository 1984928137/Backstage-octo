import { ref, Ref } from "vue"
import type { ElTable } from "element-plus";
import { RouterAPI, exRequest } from "../axios/api";

interface QuireData {
    // 出生时间
    time?: string | number,
    name: string,
    id?: number | string,
    // 教师编号
    TeacherID?: number | string,
    sex?: number | string,
    phone?: number | string,
    // 身份证号
    IDcard?: string | number
    // 地址
    place?: string,
    // qq号
    QQ?: string | number,
    // 微信号
    WX?: string | number
}

enum FamilyS {
    name = 0,
    // 教师编号
    TeacherID = 1,
    sex = 2,
    phone = 3,
    // 身份证号
    IDcard = 4,
    // 地址
    place = 5,
    // qq号
    QQ = 6,
    // 微信号
    WX = 7
}

interface TchOptions {
    label: string,
    value: string
}

interface TeacherList {
    // 出生时间
    time: string,
    name: string,
    id: number | string,
    // 教师编号
    TeacherID: number | string,
    sex: number | string,
    phone: number | string,
    // 身份证号
    IDcard: string | number
    // 地址
    place: string,
    // qq号
    QQ: string | number,
    // 微信号
    WX: string | number
    page: number,
    count: number,
    isShow: boolean
}


class InitData {
    // 时间搜索
    defaultTime: Ref<Date[]>
    timeValue1: Ref<string>

    // 按条件查询
    FieldValue: Ref<string>
    options: TchOptions[]
    anyField: Ref<string | number>

    // 
    quireData: Ref<QuireData>
    teacherListData: Ref<TeacherList>
    teacherQuierData: Ref<TeacherList[]>
    formData: TeacherList

    pageIndex: Ref<number>
    tableData: Ref<TeacherList[][]>
    multipleSelection: Ref<TeacherList[]>
    multipleTableRef: Ref
    value: Ref<boolean>
    currentRow: Ref<TeacherList | undefined>
    data: any

    // 控制弹窗是否弹出
    dialogFormVisible: Ref<boolean>


    constructor() {
        this.quireData = ref<QuireData>(
            {
                id: '',
                time: '',
                name: '',
                TeacherID: '',
                IDcard: '',
                sex: '',
                phone: 0,
                place: '',
                QQ: '',
                WX: '',
            }
        )
        this.formData =
        {
            id: '',
            time: '',
            name: '',
            TeacherID: '',
            IDcard: '',
            sex: '',
            phone: 0,
            place: '',
            QQ: '',
            WX: '',
            page: 1,
            count: 0,
            isShow: true,
        }
        this.teacherListData = ref<TeacherList>({
            id: '',
            time: '',
            name: '',
            TeacherID: '',
            IDcard: '',
            sex: '',
            phone: 0,
            place: '',
            QQ: '',
            WX: '',
            page: 1,
            count: 0,
            isShow: true,
        })
        this.teacherQuierData = ref([])
        this.anyField = ref<string | number>('')
        this.pageIndex = ref<number>(1)
        this.tableData = ref(
            []
        )
        this.multipleSelection = ref<TeacherList[]>([])
        this.multipleTableRef = ref<InstanceType<typeof ElTable>>()
        this.value = ref<boolean>(true)
        this.currentRow = ref<TeacherList | undefined>()
        this.defaultTime = ref([
            new Date(2000, 1, 1, 0, 0, 0),
            new Date(2000, 2, 1, 23, 59, 59),
        ])
        this.timeValue1 = ref('')
        this.FieldValue = ref('')
        this.options = [
            { label: '名字', value: '0' },
            { label: '编号', value: '1' },
            { label: '性别', value: '2' },
            { label: '手机号码', value: '3' },
            { label: '身份证', value: '4' },
            { label: '地址', value: '5' },
            { label: 'QQ', value: '6' },
            { label: '微信', value: '7' },
        ]
        this.dialogFormVisible = ref(false)

    }

    // 发送请求
    getTeacherListData = () => {
        return exRequest.get({
            url: RouterAPI.TeacherList,
            data: "",
        });
    }

    // 发送查询请求
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
            quireDatas = this.timeValue1.value[1] ? this.teacherQuierData.value.filter(
                v => Date.parse(this.timeValue1.value[0]) <= Date.parse(v.time) && Date.parse(v.time) <= Date.parse(this.timeValue1.value[1])

            )
                : this.teacherQuierData.value.filter(
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
            quireDatas = this.teacherQuierData.value.filter(
                v => v.name.indexOf(this.quireData.value.name as string) != -1
            )
        } else if (this.anyField.value) {
            quireDatas = this.teacherQuierData.value.filter(v => {
                // console.log(v)
                return this.DataFilters(v, FamilyS[Number.parseInt(this.FieldValue.value)], this.anyField.value)
            })
        }
        console.log(Array.isArray(quireDatas))
        this.tableData.value = []
        this.splitArray(quireDatas)
        this.teacherListData.value.count = quireDatas.length
    }
    handleCurrentChange = (val: number) => {
        this.pageIndex.value = val
        console.log('pageIndex', this.pageIndex.value)
        this.teacherListData.value.page = val
    }
    splitArray = (val: TeacherList[]) => {
        for (let index = 0; index < val.length; index += 5) {
            let list: TeacherList[] = val.slice(index, index + 5)
            this.tableData.value.push([...list])
        }
        console.log('splitArray', this.tableData.value)
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

    handleSelectionChange = (val: TeacherList[]) => {
        console.log(val)
        this.multipleSelection.value = val
    }
    handleCurrentChanges = (val: TeacherList | undefined) => {
        console.log(val, '566')
        this.currentRow.value = val
    }
    toggleSelection = (rows?: TeacherList[]) => {
        if (rows) {
            rows.forEach((row) => {

                this.multipleTableRef.value!.toggleRowSelection(row, undefined)
            })
        } else {
            this.multipleTableRef.value!.clearSelection()
        }
    }
    handleEdit = (index: number, row: TeacherList) => {

        // row.isShow = true
        // this.[index].value = row.price
        // this.name[index].value = row.name
        // this.address[index].value = row.address
        console.log(index, row)
        // row._id == this.currentRow.value._id ? this.rowShow.value = true 
        // : this.rowShow.value = false
    }
    handleDelete = (index: number, row: TeacherList) => {
        console.log(index, row)
    }

    // 取消查询
    onRestoreClick = () => {
        this.tableData.value = []
        console.log(this.teacherQuierData.value)
        let RestoreData: TeacherList[] = JSON.parse(JSON.stringify(this.teacherQuierData.value))
        this.splitArray(RestoreData)
        this.teacherListData.value.count = RestoreData.length
        this.anyField.value = ''
    }

    // 导出老师信息
    tableToExcel = async () => {
        // 要导出的json数据

        const jsonData: Ref = ref();
        this.tableData.value = []
        jsonData.value = await this.getTeacherListData();
        this.teacherQuierData = jsonData.value?.result;
        // .then((res) => {
        this.teacherListData.count = jsonData.value?.result.length;
        this.splitArray(jsonData.value?.result);
        // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
        let str = `学号,姓名,电话,邮箱\n`;
        // 增加\t为了不让表格显示科学计数法或者其他格式
        for (let i = 0; i < jsonData.value?.result.length; i++) {
            for (let key in jsonData.value?.result[i]) {
                if (key == "_id" || key == "permission" || key == "postData") {
                    continue
                }
                if (key == 'familyMember') {
                    console.log(jsonData.value.result[i][key][0],
                        Object.prototype.toString.call(jsonData.value.result[i][key]) == "[object Array]")
                }
                str += `${jsonData.value.result[i][key] + '\t'},`;
            }
            str += '\n';
        }
        console.log("str", str)
        // encodeURIComponent解决中文乱码
        const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
        // 通过创建a标签实现
        const link = document.createElement("a");
        link.href = uri;
        // 对下载的文件命名
        link.download = "学生信息表.csv";
        link.click();
    }
}



export {
    InitData
}
export type {
    TeacherList,
}