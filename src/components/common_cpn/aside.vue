<template>
  <el-radio-group
    v-model="isCollapse"
    style="
      margin-bottom: 17px;
      width: 129px;
      margin-left: 25px;
      margin-top: 17px;
    "
  >
    <el-radio-button :label="false">
      <el-icon><ArrowRightBold /></el-icon>
    </el-radio-button>
    <el-radio-button :label="true">
      <el-icon><ArrowLeftBold /></el-icon>
    </el-radio-button>
  </el-radio-group>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    :default-active="route.path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    unique-opened
    router
  >
    <el-menu-item index="/default">
      <el-icon><House /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-sub-menu index="list">
      <template #title>
        <el-icon>
          <icon-menu />
        </el-icon>
        <span>商品列表</span>
      </template>

      <el-menu-item-group title="子列表"> </el-menu-item-group>
      <el-menu-item
        v-for="(item, index) in routerArr"
        :key="index"
        :index="item.path"
      >
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item index="3">
      <el-icon>
        <!-- <document /> -->
        <document></document>
      </el-icon>
      <template #title>日志文档</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <setting />
      </el-icon>
      <template #title>系统设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { InitAside } from "../../TS/commons/aside";
import {
  Document,
  Menu as IconMenu,
  List,
  Setting,
  Avatar,
  Unlock,
  User,
  House,
  ArrowLeftBold,
  ArrowRightBold,
} from "@element-plus/icons-vue";

export default defineComponent({
  name: "",
  components: {
    Document,
    IconMenu,
    List,
    Setting,
    Avatar,
    Unlock,
    User,
    House,
    ArrowLeftBold,
    ArrowRightBold,
  },
  setup() {
    const data = reactive(new InitAside());
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

span.el-radio-button__inner {
  width: 63px;
}
.el-aside {
  height: calc(100vh - 80px);
}
.el-main {
  height: calc(100vh - 80px);
  overflow-y: auto;
}
</style>
