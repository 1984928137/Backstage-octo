<template>
  <div>
    <div>
      <div class="select-box">
        <el-form :inline="true" :model="userQuireData" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="userQuireData.user" placeholder="搜索" />
          </el-form-item>
          <el-form-item label="详情">
            <el-input v-model="userQuireData.region" placeholder="搜索">
              <!-- <el-option label="Zone one" value="shanghai" /> -->
              <!-- <el-option label="Zone two" value="beijing" /> -->
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="select-table">
        <el-table :data="tableData[userData.page - 1]" style="width: 100%">
          <el-table-column prop="age" label="age" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
    </div>
    <div class="example-pagination-block">
      <el-pagination
        :page-size="5"
        :current-page="pageIndex"
        :default-current-page="1"
        :pager-count="5"
        layout="prev, pager, next"
        :total="userData.count"
        background
        :hide-on-single-page="value"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount, ref, toRefs } from "vue";
import { getUser } from "../../axios/api";
import { InitUserData } from "../../TS/user";

export default defineComponent({
  name: "user",
  setup() {
    const data = reactive(new InitUserData());
    onBeforeMount(async () => {
      console.log("onBeforeMount");
      data.obj = await getUser("")
        .then((res) => {
          data.userData.count = res.data.result.length;
          data.splitArray(res.data.result);
          return res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped></style>
