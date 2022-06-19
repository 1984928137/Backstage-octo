<template>
  <el-container class="personHead">
      <Header></Header>
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
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
import Header from "../common_cpn/header.vue";
import Aside from "../common_cpn/aside.vue"
import { InitHome } from "../../TS/home";


export default defineComponent({
  name: "login",
  setup() {
    // const document = ref(new Document())
    const data = reactive(new InitHome());
    
    // const props = defineProps<{ msg: string }>()

    return {
      ...toRefs(data),
      Header,
      Aside
      // submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-logo {
  height: 80px;
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
