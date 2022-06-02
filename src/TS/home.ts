import { ref } from 'vue';


class InitHome {

    // constructor(parameters: any) {

    // }

    isCollapse = ref(false)

    handleOpen = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

    handleClose = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }
}


export {
    InitHome
}