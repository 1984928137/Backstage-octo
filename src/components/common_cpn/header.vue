<template>
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
          <el-avatar
            v-show="avatarShow"
            :size="51"
            :data-s="avatarShow"
            src="/src/assets/img/person2.jpeg"
          />
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
</template>

<script lang="ts">
import { defineComponent, reactive, toRef, ref, toRefs, watch } from "vue";
import { RouteLocationRaw, useRoute } from "vue-router";
import { InitHead } from "../../TS/commons/header";

export default defineComponent({
  name: "",
  setup() {
    const route: RouteLocationRaw = useRoute();
    const data = reactive(new InitHead());
    // const show = toRefs(data).avatarShow
    watch(
      () => route.path,
      (to, from) => {
        if (to == "/person") {
          data.changeShow(false);
        }
        if (from == "/person") {
          data.changeShow(true);
        }
        console.log(to, from);
      },
      {
        deep: true,
        immediate:true
      }
    );
    return {
      ...toRefs(data),
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
  width: 100%;
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
</style>
