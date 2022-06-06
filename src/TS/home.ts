import { ref } from 'vue';
import { Router, useRouter } from 'vue-router'


class InitHome {

    // constructor(parameters: any) {

    // }
    router: Router = useRouter()


    avatar: string = "../img/person2.jpeg"

    isCollapse = ref(false)

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
    InitHome
}