<template>
  <div>
    <div>
      <span>欢迎管理员：, </span>
      <span>当前时间：{{ ReTime }}</span>
    </div>
    <div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="未处理事务" name="first">
          <div></div>
          未处理事务</el-tab-pane
        >
        <el-tab-pane label="处理进行中" name="second"> 处理进行中</el-tab-pane>
        <el-tab-pane label="已完成任务" name="third"> 已完成任务</el-tab-pane>
      </el-tabs>
      <div>
        <span></span>
      </div>
      <div>
        <span></span>
      </div>
      <div>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { InitData } from "../../TS/default";
import { TimeInit } from "../../TS/commons/time";

export default defineComponent({
  name: "",
  setup() {
    const data = reactive(new InitData());
    const Time = reactive(new TimeInit());
    const ReTime = ref(Time.formatDate(data.nowTime))
    const updateTime = ()=>{
        ReTime.value = Time.formatDate(new Date())
        setTimeout(updateTime,1000)
    }
    setTimeout(updateTime,1000)
    return {
      ...toRefs(data),
      ReTime,
    };
  },
});
</script>

<style lang="scss" scoped></style>
