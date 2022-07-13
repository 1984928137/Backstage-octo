import { Ref, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'


class InitData {
    activeName: Ref<string>
    constructor() {
        this.activeName = ref('first')
    }

    handleClick = (tab: TabsPaneContext, event: Event) => {
        console.log(tab, event)
    }
}


export {
    InitData
}