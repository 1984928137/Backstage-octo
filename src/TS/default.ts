import { Ref, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { ElementTypes } from '@vue/compiler-core'
import { TimeInit } from "./commons/time";


const Time = new TimeInit()

class InitData {
    activeName: Ref<string>
    nowTime: Ref<Date>
    node!: HTMLElement
    isFlipping: boolean
    duration: number
    flipNode: Ref<NodeList>
    nextTime: Ref<Date>
    ReTime: Ref<(string | number)[]>
    NextTime: Ref<(string | number)[]>
    constructor() {
        this.activeName = ref('first')
        this.nowTime = ref(new Date())
        this.nextTime = ref(new Date(this.nowTime.value.getTime() + 1000))
        this.isFlipping = false;
        this.duration = 600;
        this.flipNode = ref(document.querySelectorAll(".flip"))
        this.ReTime = ref(Time.formatDate(this.nextTime.value));
        this.NextTime = ref(Time.formatDate(this.nextTime.value));
    }
    handleClick = (tab: TabsPaneContext, event: Event) => {
        console.log(tab, event)
    }
    flipDown = () => {
        if (this.isFlipping) {
            return false;
        }
        this.isFlipping = true;
        // this.setFrontTime(currentTime);
        // this.setBackTime(nextTime);

        this.flipNode.value = document.querySelectorAll(".flip")
        this.flipNode.value.forEach((element: any, key: number) => {
            if (key == 1 && this.ReTime.value[2] == '29'
                && this.ReTime.value[3] == '23'
                && this.ReTime.value[4] == '59'
                && this.ReTime.value[5] == '59') {
                element!.classList.add("running");
            }
            if (key == 2 && this.ReTime.value[3] == '23'
                && this.ReTime.value[4] == '59'
                && this.ReTime.value[5] == '59') {
                element!.classList.add("running");
            }
            if (key == 3 && this.ReTime.value[4] == '59'
                && this.ReTime.value[5] == '59') {
                element!.classList.add("running");
            }
            if (key == 4 && this.ReTime.value[5] == '59') {
                element!.classList.add("running");
            }
            if (key == 5) {
                element!.classList.add("running");
            }
        });
        // .classList.add("running");
        setTimeout(() => {
            this.flipNode.value.forEach((element: any) => {
                if (element.classList.length > 1) {
                    element.classList.remove("running");
                }
            });
            this.isFlipping = false;
            // this.setFrontTime(nextTime);
            // Time.formatDate
            this.ReTime.value = Time.formatDate(new Date());
            this.NextTime.value = Time.formatDate(new Date(new Date().getTime() + 1000));

        }, this.duration);
    };

}

// setInterval(function () {
//     let now = new Date();
//     let nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
//     let nextTimeStr = getTimeFromDate(now);
//     for (let i = 0; i < flippers.length; i++) {
//         if (nowTimeStr[i] === nextTimeStr[i]) {
//             continue;
//         }
//         flippers[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
//     }
// }, 1000);


export {
    InitData,
}