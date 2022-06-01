import { ref } from "vue";

interface UserQuireData {
    user: string,
    region: string
}

interface UserData {
    page: number,
    count: number
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
        count: 0
    }

    tableData = ref<UserData[][]>(
        []
    )

    pageIndex = ref<number>()

    value = ref<boolean>()

    obj = ref<object>()


    onSubmit = () => {
        console.log('submit!')
    }

    handleCurrentChange = (val: number) => {
        console.log(val)
    }

    splitArray = (val: UserData[]) => {
        for (let index = 0; index < val.length; index += 5) {
            let list: UserData[] = val.slice(index, index + 5)
            this.tableData.value.push([...list])
        }
        console.log('splitArray', this.tableData.value)
    }
}



export {
    InitUserData
}