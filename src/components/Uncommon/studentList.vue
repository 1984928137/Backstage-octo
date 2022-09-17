<template>
  <div>
    <!-- 顶部查询框 -->
    <div>
      <el-form :inline="true" :model="quireData" class="demo-form-inline">
        <el-form-item label="按时间" class="dateItem">
          <el-date-picker
            v-model="timeValue1"
            type="daterange"
            :start-placeholder="Times.reTime(defaultTime[0])"
            :end-placeholder="Times.reTime(defaultTime[1])"
            :default-time="defaultTime"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            @change="OnTimeClick(timeValue1)"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="按条件查询" class="dateItem">
          <el-select
            class="FieldSelect"
            v-model="FieldValue"
            placeholder="Select"
            size="large"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="anyField" placeholder="搜索" class="anyField" />
        </el-form-item>

        <el-form-item class="dateItem btn-w">
          <div class="btn-df">
            <el-button type="primary" @click="onQuireClick">查询</el-button>
            <el-button type="primary" @click="onRestoreClick"
              >取消查询</el-button
            >
            <el-button type="primary" @click="toggleSelection()"
              >清除全选</el-button
            >
          </div>
        </el-form-item>
        <el-form-item class="dateItem">
          <el-button type="primary" @click="AddNews">添加学生信息</el-button>
          <el-button type="primary" @click="tableToExcel">导出</el-button>
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
            <span>{{
              scope.row.sex == 0 ? "女" : scope.row.sex == 1 ? "男" : "中性"
            }}</span>
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
    const Times = new TimeInit();
    onBeforeMount(async () => {
      console.log("onBeforeMount");
      const routerData: Ref = ref();
      routerData.value = await Data.getStudentListData();
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
      InformationPopup.value.changeBoon(Datas, false, "studentList");
    };
    let AddNews = () => {
      // let Datas = Data.tableData[Data.studentListData.page - 1][index];
      InformationPopup.value.changeBoon(Data.formData, true, "studentList");
    };
    return {
      ...toRefs(Data),
      Times,
      InformationPopup,
      handleEdit,
      AddNews,
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
.dateItem {
  margin-right: 18px;
}
.dateItem.btn-w {
  width: 200px;
}
.btn-df {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.el-button {
  margin-bottom: 7px;
}
.anyField {
  width: 270px;
  height: 40px;
}
.FieldSelect {
  width: 130px;
}
</style>
