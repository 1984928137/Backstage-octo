<template>
  <div>
    <div>
      <span>欢迎管理员：, </span>
      <span>当前时间：</span>
      <div class="clock">
        <div class="flip">
          <div class="tText front" data-Time="00">
            <span>{{ ReTime[3] }}</span>
          </div>
          <div class="tText back" data-Time="00">
            <span>{{ NextTime[3] }}</span>
          </div>
          <!-- <em class="line"></em> -->
        </div>
        <div class="flip">
          <div class="tText front" data-Time="00">
            <span>{{ ReTime[4] }}</span>
          </div>
          <div class="tText back" data-Time="00">
            <span>{{ NextTime[4] }}</span>
          </div>
          <!-- <em class="line"></em> -->
        </div>
        <div class="flip">
          <div class="tText front" data-Time="00">
            <span>{{ ReTime[5] }}</span>
          </div>
          <div class="tText back" data-Time="00">
            <span>{{ NextTime[5] }}</span>
          </div>
          <!-- <em class="line"></em> -->
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
    let { year, month, day, hour, min, sec } = Time;

    const updateTime = () => {
      // data.NextTime = Time.formatDate()
      data.flipDown();
      //   data.ReTime = Time.formatDate(new Date());
      //   data.NextTime = Time.formatDate(new Date(new Date().getTime() - 1000));

      setTimeout(updateTime, 1000);
    };
    setTimeout(updateTime, 1000);
    return {
      ...toRefs(data),
      //   ReTime,
      year,
      month,
      day,
      hour,
      min,
      sec,
      //   nextTime,
    };
  },
});
</script>

<style lang="scss" scoped>
.clock {
  display: flex;

  //   时钟框架盒子，相对定位，设置边框、字体、大小宽度长度、内外边距、颜色
  .flip {
    position: relative;
    border: 1px solid rgb(62, 62, 62);
    background-color: rgb(50, 50, 50);
    box-shadow: 0px 0px 8px rgba(56, 56, 56, 0.5);
    width: 60px;
    height: 60px;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    border-radius: 10px;
    margin: 3px;

    .tText {
      // 字体颜色
      span {
        color: white;
        left: 50%;
        right: 50%;
      }
    }
    /* 翻页前的数字 */
    .tText.front {
      position: absolute;
      left: 20%;
      top: 10%;
      border-bottom: 1px solid #666;
      border-radius: 10px 10px 0 0;
    }
    /* 翻页后的数字 */
    .tText.back {
      position: absolute;
      left: 20%;
      top: 10%;
      border-radius: 0 0 10px 10px;
    }
    // 翻页前的数字在前面
    .front {
      z-index: 4;
      position: absolute;
      transform-origin: center top;
    }
    // 隐藏后面的数字 ，       opacity: 0;
    .back {
      z-index: 2;
      //   -webkit-transform-origin: center top;
      transform-origin: center top;
      position: absolute;
      opacity: 0;
      /* 180deg */
    }
    // 数字中心的线条，可有可无
    // .line {
    //   bottom: 50%;
    //   left: 0;
    //   border-bottom: 2px solid rgb(100, 100, 100);
    //   position: absolute;
    //   z-index: 12;
    //   width: 100%;
    //   height: 2px;
    // }
  }
  //   设置css动画效果，使用3维rotateX ， frontFlipDown是自定义css动画名称
  .flip.running {
    .front {
      -webkit-transform-origin: center bottom;
      transform-origin: center bottom;
      -webkit-animation: frontFlipDown 0.7s ease-in-out;
      animation: frontFlipDown 0.7s ease-in-out;
      box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
      //   -webkit-backface-visibility: hidden;

      //   在通过 frontFlipDown 翻页时，隐藏背景
      backface-visibility: hidden;
    }
    .back {
      -webkit-animation: backFlipDown 0.7s ease-in-out;
      animation: backFlipDown 0.7s ease-in-out;
      // 显示后面的数字
      opacity: 0.8;
    }
  }
}

// .clock .flip .tText::before, .clock .flip .tText::after {
//     // position: absolute;
//     // content: attr(data-number);
//     left: 0;
//     right: 0;
//     color: white;
//     background: rgb(51, 50, 50);
//     overflow: hidden;
//     -webkit-perspective: 160px;
//             perspective: 160px;
//   }
</style>
