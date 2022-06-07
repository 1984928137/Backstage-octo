<template>
  <div>
    <div>
      <div class="select-box">
        <el-form :inline="true" :model="userQuireData" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="userQuireData.user" placeholder="搜索" />
          </el-form-item>
          <el-form-item label="详情">
            <el-select
              v-model="userQuireData.region"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in userData.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="toggleSelection()"
              >Clear selection</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="select-table">
        <el-table
          ref="userTableRef"
          :data="tableData[userData.page - 1]"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @current-change="handleCurrentChanges"
          :default-sort="{ prop: 'price,address,name', order: 'descending' }"
          highlight-current-row
          row-class-name="table-heigth"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="age" width="180">
            <template #default="scope">
              <span v-show="!scope.row.isShow">{{ scope.row.age }}</span>
              <el-input
                v-show="scope.row.isShow"
                v-model="age[scope.$index].value"
                placeholder="Please input"
              />
            </template>
          </el-table-column>
          <el-table-column label="Name" width="180">
            <template #default="scope">
              <span v-show="!scope.row.isShow">{{ scope.row.name }}</span>
              <el-input
                v-show="scope.row.isShow"
                v-model="name[scope.$index].value"
                placeholder="Please input"
              />
            </template>
          </el-table-column>
          <el-table-column label="Address" width="180">
            <template #default="scope">
              <span v-show="!scope.row.isShow">{{ scope.row.address }}</span>
              <el-input
                v-show="scope.row.isShow"
                v-model="address[scope.$index].value"
                placeholder="Please input"
              />
            </template>
          </el-table-column>
          <el-table-column label="role">
            <template #default="scope">
              <span v-show="!scope.row.isShow">{{
                scope.row.role == undefined
                  ? scope.row.role
                  : scope.row.role.toString()
              }}</span>

              <el-select
                v-show="scope.row.isShow"
                v-model="role[scope.$index].value"
                multiple
                placeholder="Select"
                style="width: 240px"
              >
                <el-option
                  v-for="item in userData.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
              <el-button
                size="small"
                type="success"
                @click="confirm(scope.$index, scope.row)"
                >确认</el-button
              >
            </template>
          </el-table-column>
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

<style lang="scss" scoped>
.select-table {
  height: 350px;
}
:deep(.table-heigth){
  height: 50px;
}
</style>
