<template>
  <div>
    <!-- 顶部查询框 -->
    <div>
      <el-form :inline="true" :model="quireData" class="demo-form-inline">
        <el-form-item label="学号">
          <el-input v-model="quireData.studentID" placeholder="搜索" />
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="quireData.name" placeholder="搜索">
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
    <!-- 表格信息展示 -->
    <div class="select-table">
      <el-table
        ref="multipleTableRef"
        row-class-name="table-heigth"
        :data="tableData[studentListData.page - 1]"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        highlight-current-row
        @current-change="handleCurrentChanges"
        :default-sort="{
          prop: 'studentID,name,time,nationality,phone,sex,boarding,createdatetime,role',
          order: 'descending',
        }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column sortable prop="studentID" label="学号" width="150">
          <template #default="scope">
            <!-- <span v-show="!scope.row.isShow">{{ scope.row.price }}</span> -->
            <span>{{ scope.row.studentID }}</span>
            <!-- <el-input
              v-show="scope.row.isShow"
              v-model="studentListData.id"
              placeholder="Please input"
            /> -->
          </template>
        </el-table-column>
        <el-table-column sortable prop="name" label="名字" width="150">
          <template #default="scope">
            <!-- <span v-show="!scope.row.isShow">{{ scope.row.name }}</span> -->
            <span>{{ scope.row.name }}</span>
            <!-- <el-input
              v-show="scope.row.isShow"
              v-model="studentListData.name"
              placeholder="Please input"
            /> -->
          </template>
        </el-table-column>
        <el-table-column sortable prop="time" label="出生年月" width="150">
          <template #default="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="nationality" label="民族" width="150">
          <template #default="scope">
            <span>{{ scope.row.nationality }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="phone" label="手机号码" width="150">
          <template #default="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="sex" label="性别" width="150">
          <template #default="scope">
            <span>{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="boarding" label="是否寄宿" width="150">
          <template #default="scope">
            <span>{{ scope.row.boarding }}</span>
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="createdatetime"
          label="创建时间"
          width="150"
        >
          <template #default="scope">
            <span>{{ Times.reTime(scope.row.createdatetime) }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="role" label="身份" width="150">
          <template #default="scope">
            <span>{{ scope.row.role }}</span>
          </template>
        </el-table-column>

        <!-- 按钮编辑 -->
        <el-table-column label="操作">
          <template #default="scope">
            <!-- handleEdit(scope.$index, scope.row) -->
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
    <!-- 分页功能 -->
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
  <!-- 个人信息修改弹窗 -->

  <InformationPopup
    :formDatas="formData"
    ref="InformationPopup"
    :dialogFormVisible="dialogFormVisible"
  ></InformationPopup>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  Ref,
  ref,
  toRefs,
} from "vue";
import { exRequest, RouterAPI } from "../../axios/api";
import { TimeInit } from "../../TS/commons/time";
import { InitData } from "../../TS/studentList";
import InformationPopup from "../common_cpn/InformationPopup.vue";
import type { StudentList } from "../../TS/studentList";

export default defineComponent({
  name: "studentList",

  setup() {
    const Data = reactive(new InitData());
    function getStudentListData() {
      return exRequest.get({
        url: RouterAPI.StudentList,
        data: "",
      });
    }
    const Times = new TimeInit();
    onBeforeMount(async () => {
      console.log("onBeforeMount");
      const routerData: Ref = ref();
      routerData.value = await getStudentListData();
      Data.studentQuierData = routerData.value?.result;
      // .then((res) => {
      Data.studentListData.count = routerData.value?.result.length;
      Data.splitArray(routerData.value?.result);
      //   return res.data.result;
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    });
    const InformationPopup = ref();
    let handleEdit = (index: number, row: StudentList) => {
      let Datas = Data.tableData[Data.studentListData.page - 1][index];
      InformationPopup.value.changeBoon(Datas);
    };
    return {
      ...toRefs(Data),
      Times,
      InformationPopup,
      handleEdit,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.cell) {
  text-align: center;
}
.select-table {
  height: 400px;
}
:deep(.table-heigth) {
  height: 50px;
}
.dialogBox {
  background-color: rgb(215, 211, 211);
}
</style>
