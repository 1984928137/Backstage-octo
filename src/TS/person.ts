import { Ref, ref } from "vue"
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";


class InitPerson {
    isCollapse: Ref<boolean>
    route:RouteLocationNormalizedLoaded

    constructor() {
        this.isCollapse = ref(false)
        this.route = useRoute()
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