<template>
    <div>
        <el-row class="comBtn-1">
            <el-button :icon="icons" type="primary">Primary</el-button>
        </el-row>
    </div>
</template>

<script setup lang='ts'>
import {    ref, toRef } from 'vue'
// 引入element 的icon图标
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'

const props = defineProps<{ icon: string }>()

let icons = Search
const iconStr = props.icon
if (iconStr == "Delete") {
    icons = Delete
}

const count = ref(0)
</script>

<style>
</style>