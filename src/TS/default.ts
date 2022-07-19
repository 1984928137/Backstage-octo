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
        console.log(this.flipNode.value)
        this.flipNode.value.forEach((element: any) => {
            element!.classList.add("running");
        });
        // .classList.add("running");
        setTimeout(() => {
            this.flipNode.value.forEach((element: any) => {
                element.classList.remove("running");
            });
            this.isFlipping = false;
            // this.setFrontTime(nextTime);
            // Time.formatDate
            this.ReTime.value = Time.formatDate(new Date());
            this.NextTime.value = Time.formatDate(new Date(new Date().getTime() + 1000));

        }, this.duration);
    };
}

class Flipper {

    // frontNode: HTMLElement | null
    // backNode: HTMLElement | null
    // constructor(node: HTMLElement, currentTime:string|number|[], nextTime:string|number|[]) {
    //     this.isFlipping = false;
    //     this.duration = 600;
    //     this.flipNode = document.querySelector(".flip") as HTMLElement;
    //     // this.frontNode = node.querySelector(".front");
    //     // this.backNode = node.querySelector(".back");
    //     // this.setFrontTime(currentTime);
    //     // this.setBackTime(nextTime);
    //     console.log(document.querySelector(".flip"))
    // }
    // setFrontTime =  (time :string|number) => {
    //     this.frontNode !== null ? this.frontNode.dataset.number = time : this.frontNode
    // };
    // setBackTime =  (time:string|number|HTMLElement) => {
    //     this.backNode !== null ? this.backNode.dataset.number = time : this.backNode
    // };
    // flipDown =  (currentTime: string | number | [], nextTime: string | number | []) => {
    //     if (this.isFlipping) {
    //         return false;
    //     }
    //     this.isFlipping = true;
    //     // this.setFrontTime(currentTime);
    //     // this.setBackTime(nextTime);
    //     this.flipNode.classList.add("running");
    //     setTimeout( () => {
    //         this.flipNode.classList.remove("running");
    //         this.isFlipping = false;
    //         // this.setFrontTime(nextTime);
    //     }, this.duration);
    // };
    // // 获取时间字符串
    // getTimeFromDate =(date:Date)=> {
    //     return date
    //         .toTimeString()
    //         .slice(0, 8)
    //         .split(":")
    //         .join("");
    // };
}




// let now =new InitData().nowTime;
// let nowTimeStr = getTimeFromDate(new Date(now.value.getTime() - 1000));
// let nextTimeStr = getTimeFromDate(now);
// let flippers = Array.from(flips).map(function (flip, i) { return new Flipper(flip, nowTimeStr[i], nextTimeStr[i]); });
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