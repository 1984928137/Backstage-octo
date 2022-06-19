<template>
  <el-header>
    <el-row :gutter="20">
      <el-col :span="4">
        <img class="header-logo" src="../../assets/img/logo.png" alt="" />
      </el-col>
      <el-col :span="15">
        <h1>{{ val }}</h1>
      </el-col>
      <el-col class="el-col-btn" :span="5">
        <!-- <div class="grid-content bg-purple" /> -->
        <el-dropdown
          size="large"
          class="drop-Arav"
          @command="clickCommand"
          type="primary"
          @click="AvatarClick"
          style="width: 90px;"
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
        <div class="btnBox">
          <el-button
            class="btn-text"
            v-for="button in buttons"
            :key="button.text"
            :type="button.type"
            text
            @click="button.click"
            v-show="button.show"
            >{{ button.text }}</el-button
          >
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts">
import { defineComponent, reactive, toRef, ref, toRefs, watch } from "vue";
import { RouteLocationRaw, Router, useRoute, useRouter } from "vue-router";
import { InitHead } from "../../TS/commons/header";

export default defineComponent({
  name: "",
  setup() {
    const route: RouteLocationRaw = useRoute();
    const router: Router = useRouter();
    const data = reactive(new InitHead());
    // const show = toRefs(data).avatarShow
    watch(
      () => route.path,
      (to, from) => {
        if (to == "/person") {
          data.changeShow(false);
          data.val = "个人中心";
          data.backHomeShow = true;
        }
        if (from == "/person") {
          data.changeShow(true);
        }
        console.log(to, from, route.query);
      },
      {
        deep: true,
        immediate: true,
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
  padding: 0px 20px 0px 20px;
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
  margin: 0;
}
.btnBox{
  display: flex;
  flex-direction: row;
  padding: 0;
  margin-left: 10px;
}
.drop-Arav{
  display: flex;
  justify-content: center;
}
</style>
