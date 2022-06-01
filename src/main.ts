import { createApp } from 'vue'
// 引入路由
import { router } from '../src/router/index'
import App from './App.vue'

createApp(App)
    .use(router)
    .mount('#app')
