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
    router: Router
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
}

// { "title" : "订单 " }, { $set: { "title" : "课程列表" } }
// { "title" : "商品 " }, { $set: { "title" : "成绩管理" } }
// { "title" : "用户 " }, { $set: { "title" : "成绩分析" } }
// { "title" : "角色 " }, { $set: { "title" : "考试列表" } }
//{"meta" : { "homeIsShow" : true, "title" : "总体分析", "icon" : "User" }}, { $set:{ "meta" : { "homeIsShow" : true, "title" : "总体分析", "icon" : "TrendCharts" }}
// remove({"title" : "课程列表"})
// { "path" : "order", "name" : "order", "component" : "/Uncommon/Order", "meta" : { "homeIsShow" : true, "title" : "课程列表", "icon" : "List" } }
// { "path" : "productlist", "name" : "productlist", "component" : "/Uncommon/ProductList", "meta" : { "homeIsShow" : true, "title" : "成绩管理", "icon" : "icon-menu" } }
// { "path" : "user", "name" : "user", "component" : "/Uncommon/User", "meta" : { "homeIsShow" : true, "title" : "成绩分析", "icon" : "User" } }
// { "path" : "role", "name" : "role", "component" : "/View/roleView", "meta" : { "homeIsShow" : true, "title" : "考试列表", "icon" : "Avatar" } }
// { "path" : "permission", "name" : "permission", "component" : "/Uncommon/PermissionModification", "meta" : { "homeIsShow" : false, "title" : "权限", "icon" : "Unlock" } }
// { "path" : "studentList", "name" : "studentList", "component" : "/Uncommon/studentList", "meta" : { "homeIsShow" : true, "title" : "学生列表", "icon" : "UserFilled" } }
// { "path" : "teacherList", "name" : "teacherList", "component" : "/Uncommon/teacherList", "meta" : { "homeIsShow" : true, "title" : "老师列表", "icon" : "Avatar" } }
export {
    InitAside
}