import { Ref, ref } from 'vue';
import { RouteParamValueRaw, Router, RouteLocationNormalizedLoaded, RouteRecordNormalized, useRoute, useRouter } from 'vue-router'

class InitAside {
    constructor() {
        this.routerArr = useRouter().getRoutes()
            .filter((v) => v.meta.homeIsShow);
        this.avatar = "../img/person2.jpeg"
        this.isCollapse = ref(false)
        this.route = useRoute();
        this.router = useRouter()
    }
    router:Router
    routerArr: RouteRecordNormalized[]
    avatar: string
    isCollapse: Ref<boolean>
    route: RouteLocationNormalizedLoaded



    handleOpen = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

    handleClose = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

    AvatarClick = () => {
        // eslint-disable-next-line no-alert
        alert('button click')
    }
    clickCommand = (command: string | number | object) => {
        console.log(command)
        typeof (command) == 'string' ? this.router.push(command)
            : false
    }
}



export {
    InitAside
}