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
                @click="handleChange(scope.$index, scope.row)"
                >修改权限</el-button
              >
              <!-- <el-button
                size="small"
                type="success"
                @click="confirm(scope.$index, scope.row)"
                >确认</el-button
              > -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="fromPermission">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="fromPermission.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-input v-model="fromPermission.role" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addRole">Confirm</el-button>
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
import { defineComponent, onBeforeMount, reactive, ref, toRefs } from "vue";
import { getRole } from "../../axios/api";
import { InitRole } from "../../TS/role";

export default defineComponent({
  name: "",
  setup() {
    const data = reactive(new InitRole());
    onBeforeMount(async () => {
      console.log("onBeforeMount");
      data.obj = await getRole("")
        .then((res) => {
          data.roleData.count = res.data.result.length;
          for (let index = 0; index < res.data.result.length; index++) {
            res.data.result[index].role = res.data.result[index].role
              ?.toString()
              .split(",");
          }
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
