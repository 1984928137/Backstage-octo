import { ref, reactive, toRefs, Ref } from "vue";
import { useRouter } from "vue-router";
import { RouterAPI, exRequest } from "../axios/api";
import type { ElTable } from 'element-plus'
import { ro } from "element-plus/lib/locale";

interface RoleData {
    name: string,
    role: string[],
    permission: number[],
    createdatetime: Date,
    page: number,
    count: number,
    isShow: boolean,
}

interface SelectRole {
    value: string,
    label: string
}

interface SelectOpn {
    value: any,
    // label: any
    time: string | Date
}

interface QuireRole {
    name: string,
    role: string
}


class InitRole {
    startTime: Ref<string>
    endTime: Ref<string>
    routerTeachData: Ref
    isShow: Ref<boolean>
    isDateShow: Ref<boolean>
    isNameShow: Ref<boolean>
    isTeachShow: Ref<boolean>
    isDisabled: Ref<string>
    examDate: Ref
    examName: Ref
    examTeachName: Ref
    fromVal: any
    teacherListData: SelectOpn[]

    constructor() {
        this.startTime = ref('')
        this.endTime = ref('')

        this.examDate = ref('')
        this.examName = ref('')
        this.examTeachName = ref('')
        this.isDisabled = ref('')
        this.routerTeachData = ref()
        this.isShow = ref(true)
        this.isDateShow = ref(true)
        this.isNameShow = ref(true)
        this.isTeachShow = ref(true)
        this.teacherListData = [
            {
                value: '',
                // label: '',
                time: ''
            }
        ]
        this.fromVal = {
            startTime: '',
            endTime: "",
            examDate: '',
            examName: '',
            examTeachName: '',
            teacherListData: this.teacherListData
        }

    }
    quireRole: QuireRole = {
        name: '',
        role: ''
    }

    roleData: RoleData = {
        name: '',
        role: [],
        permission: [],
        page: 1,
        count: 0,
        createdatetime: new Date(),
        isShow: true,

    }

    obj = ref<object>()

    tableData = ref<RoleData[][]>([])

    options: SelectRole[] = [
        {
            value: '学生',
            label: '学生',
        },
        {
            value: '老师',
            label: '老师',
        },
        {
            value: '工作人员',
            label: '工作人员',
        },
    ]


    pageIndex = ref<number>()

    value = ref<boolean>()

    tableNumber = ref<number>(0)

    multipleSelection = ref<RoleData[]>([])

    userTableRef = ref<InstanceType<typeof ElTable>>()

    currentRow = ref<RoleData>()

    formLabelWidth: string = '140px'

    fromPermission = ref<RoleData>({
        name: '',
        role: [],
        permission: [],
        page: 1,
        count: 0,
        createdatetime: new Date(),
        isShow: true,

    })

    router = ref(useRouter())

    dialogFormVisible = ref(false)

    role1 = ref<string[]>()
    role2 = ref<string[]>()
    role3 = ref<string[]>()
    role4 = ref<string[]>()
    role5 = ref<string[]>()

    permission1 = ref<number[]>()
    permission2 = ref<number[]>()
    permission3 = ref<number[]>()
    permission4 = ref<number[]>()
    permission5 = ref<number[]>()

    name1 = ref<string>()
    name2 = ref<string>()
    name3 = ref<string>()
    name4 = ref<string>()
    name5 = ref<string>()

    role = reactive(
        [
            this.role1,
            this.role2,
            this.role3,
            this.role4,
            this.role5
        ]
    )

    permission = reactive(
        [
            this.permission1,
            this.permission2,
            this.permission3,
            this.permission4,
            this.permission5
        ]
    )

    name = reactive(
        [
            this.name1,
            this.name2,
            this.name3,
            this.name4,
            this.name5
        ]
    )


    getTeacherListData = () => {
        return exRequest.get({
            url: RouterAPI.TeacherList,
            data: "",
        });
    }

    getRouterTeachData = async () => {
        this.routerTeachData.value = await this.getTeacherListData();
        // const as = () => {
        this.teacherListData = this.routerTeachData.value?.result.map((v: any) => {
            console.log(v.name);

            return {
                valeu: v.name,
                label: v.name,
            };
        });
        console.log(this.teacherListData)
    }

    onSubmit = () => {
        console.log('submit!')
    }

    handleCurrentChange = (val: number) => {
        this.pageIndex.value = val
        console.log('pageIndex', this.pageIndex.value)
        this.roleData.page = val
    }

    handleEdit = (index: number, row: RoleData) => {

        row.isShow = true
        this.name[index].value = row.name
        this.permission[index].value = row.permission
        this.role[index].value = row.role
        // row._id == this.currentRow.value._id ? this.rowShow.value = true 
        // : this.rowShow.value = false
    }
    handleChange = (index: number, row: RoleData) => {
        console.log(index, row)
        this.router.value.push({
            path: '/permission',
            query: {
                name: row.name,
                permission: row.permission,
                role: row.role
            }
        })
    }

    handleSelectionChange = (val: RoleData[]) => {
        this.multipleSelection.value = val
    }

    handleCurrentChanges = (val: RoleData | undefined) => {
        this.currentRow.value = val
    }

    confirm = (index?: number, row?: RoleData) => {
        this.dialogFormVisible.value = true
        if (row) {
            this.fromVal = JSON.parse(JSON.stringify(row))
        }

        console.log(index, this.fromVal)
        // this.age[index].value = undefined
        // this.name[index].value = undefined
        // this.permission[index].value = undefined
    }

    toggleSelection = (rows?: RoleData[]) => {
        if (rows) {
            rows.forEach((row) => {
                // TODO: improvement typing when refactor table
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                this.userTableRef.value!.toggleRowSelection(row, undefined)
            })
        } else {
            this.userTableRef.value!.clearSelection()
        }
    }

    splitArray = (val: RoleData[]) => {
        for (let index = 0; index < val.length; index += 5) {
            let list: RoleData[] = val.slice(index, index + 5)
            this.tableData.value.push([...list])
        }
        // this.fromPermission.value  = [...this.tableData.value]
        console.log('splitArray', this.tableData.value)
    }
    vats = () => {
        console.log('删除', this.fromVal)
    }

    addRole = () => {
        let list = this.fromPermission.value
        this.tableData.value[this.tableData.value.length - 1].push(list)
        console.log(this.tableData.value)
        this.dialogFormVisible.value = false
    }

}


export {
    InitRole
}