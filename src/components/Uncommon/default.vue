<template>
  <div class="defBox">
    <!-- 顶部 -->
    <divn class="headBox">
      <span>欢迎管理员：, </span>
      <span>当前时间：</span>
      <div class="clock">
        <div class="flip" style="width: 100px">
          <div class="tText front">
            <span>{{ ReTime[0] }}</span>
          </div>
          <div class="tText back">
            <span>{{ NextTime[0] }}</span>
          </div>
        </div>
        <em class="line"></em>
        <div class="flip">
          <div class="tText front">
            <span>{{ ReTime[1] }}</span>
          </div>
          <div class="tText back">
            <span>{{ NextTime[1] }}</span>
          </div>
        </div>
        <em class="line"></em>
        <div class="flip">
          <div class="tText front">
            <span>{{ ReTime[2] }}</span>
          </div>
          <div class="tText back">
            <span>{{ NextTime[2] }}</span>
          </div>
        </div>
        <em class="interval"></em>
        <div class="flip">
          <div class="tText front">
            <span>{{ ReTime[3] }}</span>
          </div>
          <div class="tText back">
            <span>{{ NextTime[3] }}</span>
          </div>
        </div>
        <em class="divider">:</em>
        <div class="flip">
          <div class="tText front">
            <span>{{ ReTime[4] }}</span>
          </div>
          <div class="tText back">
            <span>{{ NextTime[4] }}</span>
          </div>
        </div>
        <em class="divider">:</em>
        <div class="flip">
          <div class="tText front">
            <span>{{ ReTime[5] }}</span>
          </div>
          <div class="tText back">
            <span>{{ NextTime[5] }}</span>
          </div>
        </div>
      </div>
    </divn>
    <!-- 导航部 -->
    <div style="height: 300px">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="未处理事务" name="first">
          <div></div>
          未处理事务</el-tab-pane
        >
        <el-tab-pane label="处理进行中" name="second">
          <div></div>
          处理进行中</el-tab-pane
        >
        <el-tab-pane label="已完成任务" name="third">
          <div></div>
          已完成任务</el-tab-pane
        >
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

    <!-- 底部 -->
    <div>
      <div class="bottomBoxNav">
        <el-icon><Guide /></el-icon>
        <span>快捷入口</span>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { InitData } from "../../TS/default";
import { TimeInit } from "../../TS/commons/time";
import { Guide } from "@element-plus/icons-vue";

export default defineComponent({
  name: "",
  components: {
    Guide,
  },
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
// .defBox{
//     background-color: #409eff;
// }
.headBox {
  display: flex;
  align-items: center;
}
.clock {
  display: flex;
  align-items: center;
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
      border-bottom: 1px solid rgb(120, 120, 120);
      border-radius: 10px 10px 0 0;
    }

    /* 翻页后的数字 */
    .tText.back {
      position: absolute;
      left: 20%;
      top: 10%;
      border-radius: 0 0 10px 10px;
    }
    // .tText.back:first-child{
    //     left: 15%;
    // }
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
  }

  .flip:first-child {
    .tText.front {
      left: 14%;
    }
    .tText.back {
      left: 14%;
    }
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
      opacity: 0.6;
    }
  }
  // 数字之间的线条，可有可无
  .line {
    border-bottom: 2px solid rgb(100, 100, 100);
    width: 15px;
    height: 2px;
  }
  .divider {
    font-size: 36px;
    // line-height: 102px;
    width: 15px;
    text-align: center;
    font-style: normal;
    color: rgb(51, 50, 50);
    // height: 2px;
  }
  //
  .interval {
    width: 20px;
  }
}

.bottomBoxNav{
    display: flex;
    align-items: center;
    .el-icon{
        color: #409eff;
        margin-right: 4px;
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
