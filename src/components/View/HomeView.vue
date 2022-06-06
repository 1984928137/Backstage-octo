<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="4">
          <img class="header-logo" src="../../assets/img/logo.png" alt="" />
        </el-col>
        <el-col :span="17">
          <h1>后台系统</h1>
        </el-col>
        <el-col class="el-col-btn" :span="3">
          <!-- <div class="grid-content bg-purple" /> -->
          <el-dropdown
            size="large"
            class="drop-A"
            @command="clickCommand"
            type="primary"
            @click="AvatarClick"
          >
            <el-avatar :size="51" src="/src/assets/img/person2.jpeg" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="/person">账户中心</el-dropdown-item>
                <el-dropdown-item>消息通知</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button
            class="btn-text"
            v-for="button in buttons"
            :key="button.text"
            :type="button.type"
            text
            >{{ button.text }}</el-button
          >
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-radio-group
          v-model="isCollapse"
          style="margin-bottom: 20px; width: 126px"
        >
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
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
          <el-sub-menu index="productlist">
            <template #title>
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>商品列表</span>
            </template>

            <el-menu-item-group title="子列表"> </el-menu-item-group>
            <el-menu-item
              v-for="(item, index) in router"
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
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { reactive, ref, defineComponent, toRef, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Document,
  Menu as IconMenu,
  List,
  Setting,
  Avatar,
  Unlock,
  User,
} from "@element-plus/icons-vue";
import { InitHome } from "../../TS/home";

export default defineComponent({
  name: "login",
  components: {
    Document,
    IconMenu,
    List,
    Setting,
    Avatar,
    Unlock,
    User,
  },
  setup() {
    // const document = ref(new Document())
    const data = reactive(new InitHome());
    const buttons = [
      //   { type: '', text: 'plain' },
      { type: "primary", text: "退出" },
    ];
    // const props = defineProps<{ msg: string }>()
    const route = useRoute();

    const router = useRouter()
      .getRoutes()
      .filter((v) => v.meta.homeIsShow);

    return {
      ...toRefs(data),
      buttons,
      router,
      route,
      // submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-logo {
  height: 80px;
}
.el-header {
  height: 80px;
  background-color: rgb(110, 110, 110);
}
h1 {
  text-align: center;
  color: #fff;
  line-height: 80px;
}
.el-col-btn {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.btn-text {
  padding: 8px 15px;
}

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
