import { Ref, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { ElementTypes } from '@vue/compiler-core'
import { Router, useRouter } from 'vue-router';
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
    router: Router
    iconSize: number
    constructor() {
        this.activeName = ref('first')
        this.nowTime = ref(new Date())
        this.nextTime = ref(new Date(this.nowTime.value.getTime() + 1000))
        this.isFlipping = false;
        this.duration = 600;
        this.flipNode = ref(document.querySelectorAll(".flip"))
        this.ReTime = ref(Time.formatDate(this.nextTime.value));
        this.NextTime = ref(Time.formatDate(this.nextTime.value));
        this.router = useRouter()
        this.iconSize = 110
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

    fastSearchClick = () => {
        console.log('fastClick')
        this.router.push({
            path: '/productlist'
        })
    }
    fastManagement = () => {
        this.router.push({
            path: '/productlist'
        })
    }
    fastCalendar = () => {
        this.router.push({
            path: '/order'
        })
    }
    fastTrendCharts = () => {
        this.router.push({
            path: '/user'
        })
    }
    fastTeacherList = () => {
        this.router.push({
            path: '/teacherList'
        })
    }
    fastStudentList = () => {
        this.router.push({
            path: '/studentList'
        })
    }
    fastExamList = () => {
        this.router.push({
            path: '/role'
        })
    }
    fastEdit = () => {

    }
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

// {"studentID":"1427888686","name":"朱小二","nationality":"汉","phone":"15208905451","boarding":"0","sex":"1", "role":"学生","time":"1995-10-12","permission":[ 1, 2, 5, 4, 3, 7, 2 ],"createdatetime":new Date() }
// {"studentID":"1272149249","name":"赵克罗","nationality":"汉","phone":"15507283417","boarding":"0","sex":"1", "role":"学生","time":"1995-08-01","permission":[ 1, 2, 5, 4, 3, 7, 2 ],"createdatetime":new Date() }
// {"studentID":"1727242424","name":"刘仪伟","nationality":"汉","phone":"13906305059","boarding":"0","sex":"1", "role":"学生","time":"1995-03-10","permission":[ 1, 2, 5, 4, 3, 7, 2 ],"createdatetime":new Date() }
// {"studentID":"1272424727","name":"帕塔亚","nationality":"汉","phone":"13602908793","boarding":"0","sex":"0", "role":"学生","time":"1995-07-11","permission":[ 1, 2, 5, 4, 3, 7, 2 ],"createdatetime":new Date() }
// {"studentID":"1228428382","name":"姚一林","nationality":"汉","phone":"13708109734","boarding":"0","sex":"1", "role":"学生","time":"1995-02-27","permission":[ 1, 2, 5, 4, 3, 7, 2 ],"createdatetime":new Date() }
// {"studentID":"1274274211","name":"田微荣","nationality":"汉","phone":"14418906473","boarding":"0","sex":"1", "role":"学生","time":"1995-08-18","permission":[ 1, 2, 5, 4, 3, 7, 2 ],"createdatetime":new Date() }
// {"studentID":"1425282220","name":"许歌间","nationality":"汉","phone":"13603084249","boarding":"0","sex":"1", "role":"学生","time":"1996-06-21","permission":[ 1, 2, 5, 4, 3, 7, 2 ],"createdatetime":new Date() }
    interface StudentList {
        // 出生时间
        time: string,
        name: string,
        id: number | string,
        // 学号
        studentID: number | string,
        sex: number | string,
        phone: number,
        // 民族
        nationality: string,
        // 寄宿
        boarding: string,
        page: number,
        count: number,
        isShow: boolean
    }
    export {
        InitData,
    }