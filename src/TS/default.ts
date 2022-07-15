import { Ref, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'


class InitData {
    activeName: Ref<string>
    nowTime:Ref<Date>
    constructor() {
        this.activeName = ref('first')
        this.nowTime = ref(new Date())
    }

    handleClick = (tab: TabsPaneContext, event: Event) => {
        console.log(tab, event)
    }
}


export {
    InitData
}