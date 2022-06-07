<template>
  <!-- <div> -->
    <el-container class="personHead">
      <!-- <el-header> -->
        <Header></Header>
      <!-- </el-header> -->
      <el-container>
        <el-aside width="200px">
          <el-radio-group
          v-model="isCollapse"
          style="
            margin-bottom: 17px;
            width: 129px;
            margin-left: 25px;
            margin-top: 17px;
          "
        >
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
          :default-active= 1
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
            <!-- <el-menu-item
              v-for="(item, index) in router"
              :key="index"
              :index="item.path"
            >
              <el-icon>
                <component :is="item.meta.icon" />
              </el-icon>
              <template #title>{{ item.meta.title }}</template>
            </el-menu-item> -->
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
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import Header from "../common_cpn/header.vue";
import { InitPerson } from "../../TS/person"
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
    const data = reactive(new InitPerson())
    return {
      ...toRefs(data),
      Document,
      Setting
    };
  },
});
</script>

<style lang="scss" scoped>
.personHead{
  display: flex;
  flex-direction: column;
}
</style>
