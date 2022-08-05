<template>
    <div>
    <div>
      <el-form :inline="true" :model="studentListData" class="demo-form-inline">
        <el-form-item label="学号">
          <el-input v-model="studentListData.studentID" placeholder="搜索" />
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="studentListData.name" placeholder="搜索">
            <!-- <el-option label="Zone one" value="shanghai" /> -->
            <!-- <el-option label="Zone two" value="beijing" /> -->
          </el-input>
        </el-form-item>
        <el-form-item label="任意条件查询">
          <el-input v-model="anyField" placeholder="搜索" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuireClick">查询</el-button>
          <el-button type="primary" @click="toggleSelection()"
            >Clear selection</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="select-table">
      <el-table
        ref="multipleTableRef"
        row-class-name="table-heigth"
        :data="tableData[studentListData.page - 1]"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        highlight-current-row
        @current-change="handleCurrentChanges"
        :default-sort="{ prop: 'price,address,name', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column sortable label="序号" width="180">
          <template #default="scope">
            <!-- <span v-show="!scope.row.isShow">{{ scope.row.price }}</span> -->
            <span>{{ studentListData.id }}</span>
            <!-- <el-input
              v-show="scope.row.isShow"
              v-model="studentListData.id"
              placeholder="Please input"
            /> -->
          </template>
        </el-table-column>
        <el-table-column sortable label="名字" width="180">
          <template #default="scope">
            <!-- <span v-show="!scope.row.isShow">{{ scope.row.name }}</span> -->
            <span>{{ studentListData.name }}</span>
            <!-- <el-input
              v-show="scope.row.isShow"
              v-model="studentListData.name"
              placeholder="Please input"
            /> -->
          </template>
        </el-table-column>
        <el-table-column sortable label="学号" width="180">
          <template #default="scope">
            <!-- <span v-show="!scope.row.isShow">{{ scope.row.address }}</span> -->
            <!-- <el-input
              v-show="scope.row.isShow"
              v-model="address[scope.$index].value"
              placeholder="Please input"
            /> -->
            <span>{{ studentListData.studentID }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="example-pagination-block">
      <el-pagination
        :page-size="5"
        :current-page="pageIndex"
        :default-current-page="1"
        :pager-count="7"
        layout="prev, pager, next"
        :total="studentListData.count"
        background
        :hide-on-single-page="value"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
    import { defineComponent, onBeforeMount, reactive, Ref, ref, toRefs } from "vue";
import { exRequest, RouterAPI } from "../../axios/api";

import { InitData } from "../../TS/studentList";

    export default defineComponent({
        name:'',
        setup() {
            const Data = reactive(new InitData());
     function productData() {
      return exRequest.get({
        url: RouterAPI.Product,
        data: "",
      });
    }
    onBeforeMount(async () => {
      console.log("onBeforeMount");
      const routerData: Ref = ref();
      routerData.value = await productData();
      // .then((res) => {
      Data.studentListData.count = routerData.value?.result.length;
      Data.splitArray(routerData.value?.result);
      //   return res.data.result;
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    });
            return {
                 ...toRefs(Data),
            }
        }
    })
</script>

<style lang='scss' scoped>

</style>