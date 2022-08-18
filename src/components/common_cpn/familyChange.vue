<template>
  <div class="domBox">
    <div class="domBoxHade">
      <ul>
        <li>姓名</li>
        <li>年龄</li>
        <li>与学生关系</li>
        <li>职业</li>
        <li>工作单位</li>
        <li>联系电话</li>
        <li>操作</li>
      </ul>
    </div>
    <div class="domBoxChange">
      <div>
        <el-input v-model="familyMember" autocomplete="off" />
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { exRequest, RouterAPI } from "../../axios/api";
import { InitData } from "../../TS/commons/familyChange";

export default defineComponent({
  name: "familyChange",
  props: {
    familyMember: {
      type: undefined,
    },
  },
  setup(props) {
    const Data = reactive(new InitData());
    const { familyMember } = toRefs(props);
    return {
      ...toRefs(Data),
      familyMember
    };
  },
});
</script>

<style lang="scss" scoped></style>
