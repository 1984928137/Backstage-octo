<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import Snake from './components/Uncommon/Snake.vue'

// 在main.ts引入一下css，不然弹窗会没有样式
import "element-plus/dist/index.css";
import { ref } from "vue";
import { ElConfigProvider } from "element-plus";

// import Com_button from './components/common_cpn/com_button.vue'

const icon = ref("Delete");
const size = ref("small");
const zIndex = ref(3000);
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <Snake msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <!-- <el-config-provider :size="'large'" :z-index="zIndex"> -->
  <!-- <Com_button :icon="icon"></Com_button> -->
  <!-- <snake /> -->
  <router-view></router-view>
  <!-- </el-config-provider> -->
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
