import { Ref, ref } from "vue"


class InitPerson {
    isCollapse: Ref<boolean>

    constructor() {
        this.isCollapse = ref(false)
    }

    // isCollapse = ref(false)

    handleOpen = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

    handleClose = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }
}




export {
    InitPerson
}