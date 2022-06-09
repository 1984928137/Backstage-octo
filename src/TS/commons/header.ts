
import { ref, Ref, watch } from 'vue'
import { Router, useRouter } from 'vue-router'


interface BtnType {
    type: string,
    text: string
}

class InitHead {
    buttons: BtnType[]
    router: Router
    avatarShow = ref<boolean>(true)
    constructor() {
        this.buttons = [
            //   { type: '', text: 'plain' },
            { type: "primary", text: "退出" },
        ]

        // this.avatarShow = ref<boolean>(true)

        this.router = useRouter()


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

    changeShow = (val: boolean) => {
        this.avatarShow.value = val
    }
}



export {
    InitHead
}