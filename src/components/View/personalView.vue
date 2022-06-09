<template>
  <!-- <div> -->
  <el-container class="personHead">
    <!-- <el-header> -->
    <Header></Header>
    <!-- </el-header> -->
    <el-container>
      <el-aside width="200px">
        <el-container
          style="
            margin-bottom: 21px;
            display: flex;
            width: 190px;
            justify-content: center;
            align-items: center;
            margin-top: 21px;
          "
        >
          <el-header
            ><el-avatar
              v-show="!isCollapse"
              :size="51"
              src="/src/assets/img/person2.jpeg"
          /></el-header>
          <el-main><span>name</span></el-main>
        </el-container>
        <el-menu
          active-text-color="rgb(126 190 255)"
          background-color="#545c64"
          text-color="#fff"
          :default-active="1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          unique-opened
          router
        >
          <!-- <el-sub-menu index="productlist">
            <template #title>
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>帐号管理</span>
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
          </el-sub-menu> -->

          <el-menu-item index="/basic">
            <el-icon>
              <icon-menu />
            </el-icon>
            <template #title>
              <span>帐号管理</span>
            </template>
          </el-menu-item>

          <el-menu-item index="3">
            <el-icon>
              <!-- <document /> -->
              <document></document>
            </el-icon>
            <template #title>消息通知</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <template #title>修改密码</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <template #title>绑定邮箱</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <template #title>绑定手机号</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import Header from "../common_cpn/header.vue";
import { InitPerson } from "../../TS/person";
import {
  Document,
  Menu as IconMenu,
  List,
  Setting,
  Avatar,
} from "@element-plus/icons-vue";

export default defineComponent({
  name: "",
  components: {
    Document,
    IconMenu,
    List,
    Setting,
    Avatar,
  },
  setup() {
    const data = reactive(new InitPerson());
    return {
      ...toRefs(data),
      Document,
      Setting,
    };
  },
});
</script>

<style lang="scss" scoped>
.personHead {
  display: flex;
  flex-direction: column;
}
.el-main {
  margin: 0;
  padding: 0;
}
</style>
