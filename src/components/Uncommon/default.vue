<template>
  <div>
    <div>
      <span>欢迎管理员：, </span>
      <span
        >当前时间：{{
          year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
        }}</span
      >
      <div class="clock">
        <div class="flip">
          <div class="tText">
            <span>{{ year }}</span>
          </div>
          <div class="line"></div>
        </div>
        <div class="flip">
          <div class="tText">
            <span>{{ month }}</span>
          </div>
          <div class="line"></div>
        </div>
        <div class="flip">
          <div class="tText">
            <span>{{ day }}</span>
          </div>
          <div class="line"></div>
        </div>
      </div>
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
    const ReTime = ref(Time.formatDate(data.nowTime));
    let { year, month, day, hour, min, sec } = Time;
    const updateTime = () => {
      ReTime.value = Time.formatDate(new Date());
      // setTimeout(updateTime,1000)
    };
    setTimeout(updateTime, 1000);
    return {
      ...toRefs(data),
      ReTime,
      year,
      month,
      day,
      hour,
      min,
      sec,
    };
  },
});
</script>

<style lang="scss" scoped>
.clock {
  // background-color: rgb(116, 142, 157);
  // color: blue;
  display: flex;
//   border: 1px solid rgb(124, 118, 118);
  .flip {
    position: relative;
    border: 1px solid rgb(62, 62, 62);
    background-color: rgb(50, 50, 50);
    box-shadow: 0px 0px 8px rgba(56, 56, 56, 0.5);
    width: 60px;
    height: 100px;
    font-size: 70px;
    font-weight: 700;
    text-align: center;
    border-radius: 10px;
    margin: 3px;
    .tText {
      span {
        color: white;
        left: 0;
        right: 0;
        //   background: rgb(50, 50, 50);
      }
    }
    .line {
      bottom: 50%;
      /* top: 0; */
      border-bottom: 2px solid rgb(100, 100, 100);
      position: absolute;
      z-index: 12;
      width: 100%;
      height: 2px;
    }
  }
}
</style>
