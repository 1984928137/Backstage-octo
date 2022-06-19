
import { ref, Ref, watch } from 'vue'
import { Router, useRouter } from 'vue-router'


interface BtnType {
    type: string,
    text: string,
    click: Function
    show: Ref
}

class InitHead {
    buttons: BtnType[]
    router: Router
    avatarShow = ref<boolean>(true)
    constructor() {
        this.buttons = [
            //   { type: '', text: 'plain' },
            {
                type: "primary",
                text: "返回首页",
                click: this.backHome,
                show: this.backHomeShow
            },
            {
                type: "primary",
                text: "退出登录",
                click: () => { },
                show: this.btnShow
            },
            {
                type: "primary",
                text: "立即注册",
                click: () => { },
                show: this.btnShow
            }
        ]

        // this.avatarShow = ref<boolean>(true)

        this.router = useRouter()


    }

    val: Ref<string> = ref('后台系统')
    backHomeShow: Ref<boolean> = ref(false)
    btnShow: Ref<boolean> = ref(true)


    AvatarClick = () => {
        // eslint-disable-next-line no-alert
        alert('button click')
    }
    clickCommand = (command: string | number | object) => {
        console.log(command)
        typeof (command) == 'string' ? this.router.push({
            path: command,
            params: {
                val: '个人中心'
            }
        })
            : false
    }

    changeShow = (val: boolean) => {
        this.avatarShow.value = val
    }

    backHome = () => {
        console.log('backHome')
        this.router.push({
            path: '/'
        })
    }
}



export {
    InitHead
}