import { ref } from "vue"
import { useRoute } from "vue-router";
import type { Ref } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { ElTree } from "element-plus";
import type Node from 'element-plus/es/components/tree/src/model/node'
import { th } from "element-plus/lib/locale";


interface PermissData {
    name: string,
    role: string[]
    permission: number[]
}


interface Tree {
    id: number
    name: string
    leaf?: boolean
    children?: Tree[]
}



class InitPermiss {
    route: RouteLocationNormalizedLoaded
    treeRef = ref<InstanceType<typeof ElTree>>()
    id: Ref<number>
    obj: Ref<object>
    dataSource: Tree[]

    constructor() {
        this.route = useRoute()
        this.id = ref(10)
        this.dataSource = []

        this.obj = ref({})


        if (this.route.query.name) {
            this.permissData.name = this.route.query.name as string
        }
        if (this.route.query.permission) {
            this.permissData.permission = this.route.query.permission as []
        }
        this.permissData.role = this.route.query.role ? this.route.query.role as []
            : []
    }


    permissData: PermissData = {
        name: '',
        permission: [],
        role: []
    }


    props = {
        children: 'children',
        // 使用例子：
        // children: [
        //     {
        //         id: 7,
        //         label: 'Level two 3-1',
        //     },
        //     {
        //         id: 8,
        //         label: 'Level two 3-2',
        //     },
        // ],
        label: 'name',
        isLeaf: 'leaf',
    }


    getCheckedKeys = () => {
        let key = this.treeRef.value?.getCheckedNodes(true)
        console.log(this.treeRef.value!.getCheckedKeys(false),key)
    }

    append = (data: Tree) => {
        const newChild = { id: this.id.value++, name: 'testtest', children: [] }
        if (!data.children) {
            data.children = []
        }
        data.children.push(newChild)
        this.dataSource = [...this.dataSource]
    }
    remove = (node: Node, data: Tree) => {
        console.log('node', node, 'data', data)
        const parent = node.parent
        const children: Tree[] = parent.data.children || parent.data
        const index = children.findIndex((d) => d.id === data.id)
        children.splice(index, 1)
        this.dataSource = [...this.dataSource]
    }
}


export {
    InitPermiss
}