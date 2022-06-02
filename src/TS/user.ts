import { ref, reactive } from "vue";
import type { ElTable } from 'element-plus'

interface UserQuireData {
    user: string,
    region: string
}

interface UserData {
    page: number,
    count: number,
    options: selectRole[],
    isShow: boolean,
    age: number,
    name: string,
    address: string,
    role:string
}

interface selectRole {
    value: string,
    label: string
}



class InitUserData {
    // constructor(parameters) {

    // }
    userQuireData: UserQuireData = {
        user: '',
        region: ''
    }

    userData: UserData = {
        page: 1,
        count: 0,
        options: [
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
        ],
        isShow: true,
        age: 0,
        address: '',
        name: '',
        role:''
    }

    tableData = ref<UserData[][]>(
        []
    )

    pageIndex = ref<number>()

    value = ref<boolean>()

    multipleSelection = ref<UserData[]>([])

    userTableRef = ref<InstanceType<typeof ElTable>>()

    currentRow = ref<UserData>()

    obj = ref<object>()

    role1 = ref<string>()
    role2 = ref<string>()
    role3 = ref<string>()
    role4 = ref<string>()
    role5 = ref<string>()

    addre1 = ref<string>()
    addre2 = ref<string>()
    addre3 = ref<string>()
    addre4 = ref<string>()
    addre5 = ref<string>()

    age1 = ref<number>()
    age2 = ref<number>()
    age3 = ref<number>()
    age4 = ref<number>()
    age5 = ref<number>()

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

    address = reactive(
        [
            this.addre1,
            this.addre2,
            this.addre3,
            this.addre4,
            this.addre5
        ]
    )

    age = reactive(
        [
            this.age1,
            this.age2,
            this.age3,
            this.age4,
            this.age5
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


    onSubmit = () => {
        console.log('submit!')
    }

    handleCurrentChange = (val: number) => {
        this.pageIndex.value = val
        console.log('pageIndex', this.pageIndex.value)
        this.userData.page = val
    }

    splitArray = (val: UserData[]) => {
        for (let index = 0; index < val.length; index += 5) {
            let list: UserData[] = val.slice(index, index + 5)
            this.tableData.value.push([...list])
        }
        console.log('splitArray', this.tableData.value)
    }

    handleEdit = (index: number, row: UserData) => {

        row.isShow = true
        this.age[index].value = row.age
        this.name[index].value = row.name
        this.address[index].value = row.address
        this.role[index].value = row.role
        // row._id == this.currentRow.value._id ? this.rowShow.value = true 
        // : this.rowShow.value = false
    }
    handleDelete = (index: number, row: UserData) => {
        console.log(index, row)
    }

    handleSelectionChange = (val: UserData[]) => {
        this.multipleSelection.value = val
    }

    handleCurrentChanges = (val: UserData | undefined) => {
        this.currentRow.value = val
    }

    confirm = (index: number, row: UserData) => {
        row.age = this.age[index].value == undefined ? row.age
            : this.age[index].value!
        row.name = this.name[index].value == undefined ? row.name
            : this.name[index].value!
        row.address = this.address[index].value == undefined ? row.address
            : this.address[index].value!
        row.role = this.role[index].value == undefined ? row.role
            : this.role[index].value!
        row.isShow = false
        // this.age[index].value = undefined
        // this.name[index].value = undefined
        // this.address[index].value = undefined
    }

    toggleSelection = (rows?: UserData[]) => {
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
}



export {
    InitUserData
}