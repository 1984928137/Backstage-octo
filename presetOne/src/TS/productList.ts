import { ref, reactive } from 'vue'
import { productQuire } from "../axios/api";
import type { ElTable } from "element-plus";
import { ro } from 'element-plus/lib/locale';

interface ProductQuireData {
    user: string,
    region: string
}

interface ProductListData {
    userName: string,
    _id: number | string,
    page: number,
    count: number,
    createdatetime: string,
    name: string,
    address: string,
    isShow: boolean,
    price: number
}




class InitProduct {
    // constructor(parameters) {

    // }

    multipleTableRef = ref<InstanceType<typeof ElTable>>()

    multipleSelection = ref<ProductListData[]>([])

    productQuireData: ProductQuireData = {
        user: '',
        region: '',
    }

    productListData: ProductListData = {
        userName: '',
        _id: '',
        page: 1,
        count: 0,
        createdatetime: '',
        name: '',
        address: '',
        isShow: true,
        price: 0
    }

    listArr: ProductListData[][] = []

    obj = ref<object>()

    value = ref<boolean>(true)

    addre1 = ref<string>()
    addre2 = ref<string>()
    addre3 = ref<string>()
    addre4 = ref<string>()
    addre5 = ref<string>()

    price1 = ref<number>()
    price2 = ref<number>()
    price3 = ref<number>()
    price4 = ref<number>()
    price5 = ref<number>()

    name1 = ref<string>()
    name2 = ref<string>()
    name3 = ref<string>()
    name4 = ref<string>()
    name5 = ref<string>()
    

    price = reactive(
        [
            this.price1,
            this.price2,
            this.price3,
            this.price4,
            this.price5
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

    name = reactive(
        [
            this.name1,
            this.name2,
            this.name3,
            this.name4,
            this.name5
        ]
    )

    currentRow = ref<ProductListData | undefined>()

    rowShow = ref<boolean>(false)

    pageIndex = ref<number>()

    tableData = ref<ProductListData[][]>(
        []
    )

    onSubmit = async () => {
        console.log('submit!')
        if (!this.productQuireData.user && !this.productQuireData.region) {
            return
        }
        this.obj = await productQuire(
            this.productQuireData
        )
            .then(res => {
                this.tableData.value = []
                this.productListData.count = res.data.result.length == 'undefined' ? 1
                    : res.data.result.length
                this.splitArray(res.data.result)
                return res.data.result
            })
            .catch(err => {
                console.log(err)
            })

        // this.tableData = this.obj.value
        console.log('onSubmit', this.tableData.value)
    }

    handleCurrentChange = (val: number) => {
        this.pageIndex.value = val
        console.log('pageIndex', this.pageIndex.value)
        this.productListData.page = val
    }

    splitArray = (val: ProductListData[]) => {
        for (let index = 0; index < val.length; index += 5) {
            let list: ProductListData[] = val.slice(index, index + 5)
            this.tableData.value.push([...list])
        }
        console.log('splitArray', this.tableData.value)
    }

    handleSelectionChange = (val: ProductListData[]) => {
        this.multipleSelection.value = val
    }

    toggleSelection = (rows?: ProductListData[]) => {
        if (rows) {
            rows.forEach((row) => {
                // TODO: improvement typing when refactor table
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                this.multipleTableRef.value!.toggleRowSelection(row, undefined)
            })
        } else {
            this.multipleTableRef.value!.clearSelection()
        }
    }

    handleEdit = (index: number, row: ProductListData) => {
        
        row.isShow = true
        this.price[index].value = row.price 
        this.name[index].value = row.name
        this.address[index].value = row.address
        // row._id == this.currentRow.value._id ? this.rowShow.value = true 
        // : this.rowShow.value = false
    }
    handleDelete = (index: number, row: ProductListData) => {
        console.log(index, row)
    }

    handleCurrentChanges = (val: ProductListData | undefined) => {
        this.currentRow.value = val
    }

    confirm = (index: number, row: ProductListData) => {
        row.price = this.price[index].value == undefined ? row.price
            : this.price[index].value!
        row.name = this.name[index].value == undefined ? row.name
            : this.name[index].value!
        row.address = this.address[index].value == undefined ? row.address
            : this.address[index].value!
        row.isShow = false
        this.price[index].value = undefined
        this.name[index].value = undefined
        this.address[index].value = undefined
    }


    rowState = (arg: object) => {
        // console.log(arg)
    }

}

export {
    InitProduct,
}
export type {
    ProductQuireData,
    ProductListData
}