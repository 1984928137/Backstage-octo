import { createRouter, createWebHistory } from 'vue-router'


// 引入组件

const route = [
    {
        path: '/',
        name: 'home',
        component: () => import("../components/View/HomeView.vue"),
        // meta: { qss: false },
        props: true,
        redirect: '/productlist',
        children: [
            {
                path: 'order',
                name: 'order',
                component: () => import('../components/Uncommon/Order.vue'),
                meta: {
                    homeChildren: true,
                    title: '订单',
                    icon: 'List'
                }
            },
            {
                path: 'productlist',
                name: 'productlist',
                component: () => import('../components/Uncommon/ProductList.vue'),
                meta: {
                    // homeChildren: true,
                    // title: '订单',
                    // icon: 'List'
                }
            },
            {
                path: 'user',
                name: 'user',
                component: () => import('../components/Uncommon/User.vue'),
                meta: {
                    // homeChildren: true,
                    // title: '订单',
                    // icon: 'List'
                }
            },
            {
                path: 'role',
                name: 'role',
                component: () => import('../components/View/roleView.vue'),
                meta: {
                    // homeChildren: true,
                    // title: '订单',
                    // icon: 'List'
                }
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../components/View/loginView.vue"),
        // meta: { qss: false },
        props: true
    },
    {
        path: '/Snake',
        name: 'Snake',
        component: () => import("../components/Uncommon/Snake.vue"),
        meta: { qss: false },
        props: true
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: route
})

export {
    router
}