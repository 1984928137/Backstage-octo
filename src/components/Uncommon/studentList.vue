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
            <el-button size="small" @click="dialogFormVisible = true"
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

  <el-dialog v-model="dialogFormVisible" title="个人信息" class="dialogBox">
    <!-- <el-table  :show-header="false"	>
      <el-table-column property="date" label="Date" width="150" >

      </el-table-column>
      <el-table-column property="name" label="Name" width="200" ></el-table-column>
      <el-table-column property="address" label="Address" ></el-table-column>
    </el-table> -->
    <el-form :model="tableData">
      <table>
        <tr>
          <td>
            <el-form-item label="学号" :label-width="formLabelWidth">
              <el-input
                v-model="tableData[studentListData.page - 1][0].studentID"
                autocomplete="off"
              />
            </el-form-item>
          </td>
          <td>
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
          <td>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio-group v-model="tableData[studentListData.page - 1][0].sex">
                <el-radio label="Sponsorship" />
                <el-radio label="Venue" />
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
          <td>
            <el-form-item label="民族" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
          <td>
            <el-form-item label="身份证号" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="出生日期" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
          <td>
            <el-form-item label="是否住宿" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
          <td>
            <el-form-item label="户口类型" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="户口所在地" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="家庭经济情况" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="户籍所在地" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="现住址" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="是否留守儿童" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
          <td>
            <el-form-item label="留守儿童情况" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item
              label="家庭主要成员情况"
              :label-width="formLabelWidth"
            >
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="获奖情况" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="特长" :label-width="formLabelWidth">
              <el-input v-model="tableData[studentListData.page - 1][0].name" autocomplete="off" />
            </el-form-item>
          </td>
        </tr>
      </table>

      <el-form-item>
        <el-button type="primary" @click="">Submit</el-button>
        <el-button @click="">Reset</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
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
    return {
      ...toRefs(Data),
      Times,
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
