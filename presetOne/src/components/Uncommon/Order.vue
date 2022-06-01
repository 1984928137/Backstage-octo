<template>
  <div>
    订单列表 router
    <el-tag>Tag 1</el-tag>
    <el-tag class="ml-2" type="success">Tag 2</el-tag>
    <el-tag class="ml-2" type="info">Tag 3</el-tag>
    <el-tag class="ml-2" type="warning">Tag 4</el-tag>
    <el-tag class="ml-2" type="danger">Tag 5</el-tag>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";


export default defineComponent({
  name: "",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
