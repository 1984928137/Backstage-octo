<template>
  <div>
    <div>
      <div class="select-box">
        <el-form :inline="true" :model="quireRole" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="quireRole.name" placeholder="搜索" />
          </el-form-item>
          <el-form-item label="详情">
            <el-select
              v-model="quireRole.role"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in options"
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
            <el-button type="primary" @click="confirm()">新增</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--  -->
      <div class="select-table">
        <el-table
          ref="userTableRef"
          :data="tableData[roleData.page - 1]"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @current-change="handleCurrentChanges"
          :default-sort="{ prop: 'price,permission,name', order: 'descending' }"
          highlight-current-row
          row-class-name="table-heigth"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="Name" width="180">
            <template #default="scope">
              <span>{{ scope.row.name }}</span>
              <!-- <el-input
                v-show="scope.row.isShow"
                v-model="name[scope.$index].value"
                placeholder="Please input"
              /> -->
            </template>
          </el-table-column>
          <el-table-column label="permission" width="180">
            <template #default="scope">
              <span v-show="!scope.row.isShow">{{ scope.row.permission }}</span>
              <!-- <el-input
                v-show="scope.row.isShow"
                v-model="permission[scope.$index].value"
                placeholder="Please input"
              /> -->
            </template>
          </el-table-column>
          <el-table-column label="role">
            <template #default="scope">
              <span>{{
                scope.row.role == undefined
                  ? scope.row.role
                  : scope.row.role.toString()
              }}</span>

              <!-- <el-select
                v-show="scope.row.isShow"
                v-model="role[scope.$index].value"
                multiple
                placeholder="Select"
                style="width: 240px"
              >
                <el-option
                  v-for="item in roleData.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select> -->
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="small"
                type="success"
                @click="confirm(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-button size="small" type="success" @click="vats()"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="fromVal">
        <el-form-item label="考试名称" :label-width="formLabelWidth">
          <div v-show="isNameShow">
            <div>
              <span>
                {{
                  fromVal.examName == "" ? "还未填写考试名称" : fromVal.examName
                }}
              </span>
            </div>
            <el-button
              size="small"
              type="success"
              @click="isNameShow = !isNameShow"
              >填写</el-button
            >
          </div>
          <div v-show="!isNameShow">
            <div>
              <el-input v-model="fromVal.examName" autocomplete="off" />
            </div>
            <el-button
              size="small"
              type="success"
              @click="isNameShow = !isNameShow"
              >确定</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="监考老师" :label-width="formLabelWidth">
          <div v-show="isTeachShow">
            <div>
              <span>
                {{
                  fromVal.examTeachName == ""
                    ? "请“选择”监考老师"
                    : fromVal.examTeachName
                }}
              </span>
            </div>
            <el-button
              size="small"
              type="success"
              @click="isTeachShow = !isTeachShow"
              >选择</el-button
            >
          </div>
          <div v-show="!isTeachShow">
            <div>
              <el-select
                v-model="fromVal.examTeachName"
                class="m-2"
                placeholder="Select"
                size="large"
              >
                <el-option
                  v-for="(item, index) in teacherListData"
                  :key="index"
                  :label="item.value"
                  :value="item.value"
                  :disabled="isDisabled == item.value"
                />
              </el-select>
            </div>
            <el-button
              size="small"
              type="success"
              @click="isTeachShow = !isTeachShow"
              >确定</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="考试日期" :label-width="formLabelWidth">
          <!-- <el-input v-model="fromPermission.role" autocomplete="off" /> -->
          <div v-show="isDateShow">
            <div>
              <span>
                {{
                  fromVal.examDate == ""
                    ? "还未选择日期"
                    : fromVal.examDate == undefined
                    ? "还未选择日期"
                    : Time.reDate(fromVal.examDate)
                }}
              </span>
            </div>
            <el-button
              size="small"
              type="success"
              @click="isDateShow = !isDateShow"
              >选择时间</el-button
            >
          </div>
          <div v-show="!isDateShow">
            <div>
              <el-date-picker
                v-model="fromVal.examDate"
                type="date"
                placeholder="时间"
              />
            </div>
            <el-button
              size="small"
              type="success"
              @click="isDateShow = !isDateShow"
              >确定</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="考试时间" :label-width="formLabelWidth">
          <div v-show="!isShow">
            <div>
              <el-time-select
                v-model="fromVal.startTime"
                :max-time="fromVal.endTime"
                class="mr-4"
                placeholder="Start time"
                start="08:00"
                step="00:15"
                end="18:30"
              />
              <el-time-select
                v-model="fromVal.endTime"
                :min-time="fromVal.startTime"
                placeholder="End time"
                start="08:00"
                step="00:15"
                end="18:30"
              />
            </div>
            <el-button size="small" type="success" @click="isShow = !isShow"
              >确定</el-button
            >
          </div>
          <div v-show="isShow">
            <div>
              <span
                >{{ fromVal.startTime == "" ? "00:00" : fromVal.startTime }}--{{
                  fromVal.endTime == "" ? "00:00" : fromVal.endTime
                }}</span
              >
            </div>
            <el-button size="small" type="success" @click="isShow = !isShow"
              >选择时间</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="考试人数" :label-width="formLabelWidth">
          <el-input v-model="fromPermission.role" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="vats">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <div class="example-pagination-block">
      <el-pagination
        :page-size="5"
        :current-page="pageIndex"
        :default-current-page="1"
        :pager-count="5"
        layout="prev, pager, next"
        :total="roleData.count"
        background
        :hide-on-single-page="value"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
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
import { InitRole } from "../../TS/role";
import { TimeInit } from "../../TS/commons/time";

export default defineComponent({
  name: "",
  setup() {
    const data = reactive(new InitRole());
    const Time = new TimeInit();
    function getRole() {
      return exRequest.get({
        url: RouterAPI.UserMenus,
        data: "",
        params: "",
      });
    }
    onBeforeMount(async () => {
      console.log("onBeforeMount");
      const routerData: Ref = ref();
      routerData.value = await getRole();

      // .then((res) => {
      data.roleData.count = routerData.value?.result.length;
      for (let index = 0; index < routerData.value?.result.length; index++) {
        routerData.value.result[index].role = routerData.value.result[
          index
        ].role
          ?.toString()
          .split(",");
      }
      data.splitArray(routerData.value.result);

      // };
      // as();
      data.getRouterTeachData()
      console.log(data.teacherListData);
      //   return res.data.result;
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    });
    return {
      ...toRefs(data),
      Time,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.table-heigth) {
  height: 50px;
}
.select-table {
  height: 350px;
}
</style>