<template>
  <div>
    <!-- 个人信息修改弹窗 -->

    <el-dialog v-model="dialogFormVisible" title="个人信息">
      <!-- <el-table  :show-header="false"	>
      <el-table-column property="date" label="Date" width="150" >

      </el-table-column>
      <el-table-column property="name" label="Name" width="200" ></el-table-column>
      <el-table-column property="address" label="Address" ></el-table-column>
    </el-table> -->
      <el-form :model="formData" ref="ruleFormRef">
        <div>
          <!--  -->
          <div class="divTr">
            <div class="divTd">
              <el-form-item
                label="学号"
                :label-width="formLabelWidth"
                class="divWth1"
                prop="studentID"
              >
                <el-input v-model="formData.studentID" autocomplete="off" />
              </el-form-item>
            </div>
            <div class="divTd">
              <el-form-item
                label="姓名"
                :label-width="formLabelWidth"
                class="divWth2"
                prop="name"
              >
                <el-input v-model="formData.name" autocomplete="off" />
              </el-form-item>
            </div>
            <div class="divTd">
              <el-form-item
                label="性别"
                :label-width="formLabelWidth"
                class="divWth3"
                prop="sex"
              >
                <el-radio-group v-model="formData.sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <!--  -->
          <div class="divTr">
            <div class="divTd">
              <el-form-item
                label="联系电话"
                :label-width="formLabelWidth"
                class="divWth1"
                prop="phone"
              >
                <el-input v-model="formData.phone" autocomplete="off" />
              </el-form-item>
            </div>
            <div class="divTd">
              <el-form-item
                label="民族"
                :label-width="formLabelWidth"
                class="divWth2"
                prop="nationality"
              >
                <el-input v-model="formData.nationality" autocomplete="off" />
              </el-form-item>
            </div>
            <div class="divTd">
              <el-form-item
                label="身份证号"
                :label-width="formLabelWidth"
                class="divWth3"
                prop="IDcard"
              >
                <el-input v-model="formData.IDcard" autocomplete="off" />
              </el-form-item>
            </div>
          </div>
          <!--  -->
          <div class="divTr">
            <div class="divTd">
              <el-form-item
                label="出生日期"
                :label-width="formLabelWidth"
                class="divWth1"
                prop="time"
              >
                <!-- <el-input v-model="formData.time" type="date" autocomplete="off" /> -->
                <el-date-picker
                  v-model="formData.time"
                  type="date"
                  placeholder="Pick a day"
                />
              </el-form-item>
            </div>
            <div class="divTd">
              <el-form-item
                label="是否住宿"
                :label-width="formLabelWidth"
                class="divWth2"
                prop="boarding"
              >
                <el-radio-group v-model="formData.boarding">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="divTd">
              <el-form-item
                label="户口类型"
                :label-width="formLabelWidth"
                class="divWth3"
                prop="accountType"
              >
                <el-select
                  v-model="formData.accountType"
                  class="m-2"
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <!--  -->
          <div class="divTr">
            <div class="divTd">
              <el-form-item
                label="户口所在地"
                prop="accountLocation"
                class="formitem"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 3 }"
                  resize="none"
                  v-model="formData.accountLocation"
                  autocomplete="off"
                />
              </el-form-item>
            </div>
          </div>
          <!--  -->
          <div class="divTr">
            <div class="divTd txtHg">
              <el-form-item
                label="家庭经济情况"
                prop="familyFinancialSituation"
                class="formitem"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 3 }"
                  resize="none"
                  v-model="formData.familyFinancialSituation"
                  autocomplete="off"
                />
              </el-form-item>
            </div>
          </div>
          <!--  -->
          <div class="divTr">
            <div class="divTd">
              <el-form-item
                label="户籍地"
                class="formitem"
                prop="censusRegister"
              >
                <el-input
                  v-model="formData.censusRegister"
                  autocomplete="off"
                />
              </el-form-item>
            </div>
          </div>
          <!--  -->
          <div class="divTr">
            <div class="divTd">
              <el-form-item
                label="现住址:"
                class="formitem"
                prop="currentAddress"
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 3 }"
                  resize="none"
                  v-model="formData.currentAddress"
                  autocomplete="off"
                />
              </el-form-item>
            </div>
          </div>
          <!--  -->
          <div class="divTr">
            <div class="divTd">
              <el-form-item label="是否留守儿童" prop="whetherChildren">
                <el-radio-group v-model="formData.whetherChildren">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="divTd">
              <el-form-item label="留守儿童情况" prop="behindChildren">
                <el-input
                  v-model="formData.behindChildren"
                  autocomplete="off"
                />
              </el-form-item>
            </div>
          </div>
          <!--  -->
          <div class="divTr">
            <div class="divTd">
              <el-form-item
                label="家庭主要成员情况"
                class="formitem"
                prop="familyMember"
              >
                <el-input v-model="formData.familyMember" autocomplete="off" />
              </el-form-item>
            </div>
          </div>
          <!--  -->
          <div class="divTr">
            <div class="divTd">
              <el-form-item label="获奖情况" class="formitem" prop="awards">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 3 }"
                  resize="none"
                  v-model="formData.awards"
                  autocomplete="off"
                />
              </el-form-item>
            </div>
          </div>
          <!--  -->
          <div class="divTr">
            <div class="divTd">
              <el-form-item label="特长" class="formitem" prop="specialty">
                <el-input
                  v-model="formData.specialty"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 3 }"
                  resize="none"
                  autocomplete="off"
                />
              </el-form-item>
            </div>
          </div>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >Submit</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, Ref } from "vue";
import { exRequest, RouterAPI } from "../../axios/api";
import { TimeInit } from "../../TS/commons/time";
// import {StudentList} from '../../TS/studentList';
import type { StudentList } from "../../TS/studentList";
import { InitPopup } from "../../TS/commons/InformationPopup";
import { type } from "os";
// const FormData: Ref<T> = ref<T>()

function Person(firstName: StudentList) {
  return firstName;
}

export default defineComponent({
  name: "",
  props: {
    formDatas: {},
    dialogFormVisible: {
      type: Boolean,
    },
  },
  setup(props) {
    const Data = reactive(new InitPopup());
    const { formDatas, dialogFormVisible } = toRefs(props);
    console.log("f", formDatas.value, dialogFormVisible.value);
    Data.dialogFormVisible = dialogFormVisible.value;
    console.log("d", Data.dialogFormVisible);
    return {
      ...toRefs(Data),
      // dialogFormVisible
    };
  },
});
</script>

<style lang="scss" scoped>
.divTr {
  display: flex;
  .divTd:last-child {
    border-right: solid 1px;
  }
}

.divTd {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  // margin: 5px;
  height: 60px;
  padding-left: 5px;
  padding-right: 5px;
  border-top: solid 1px;
  // border-bottom: solid 1px;
  border-left: solid 1px;
}
.divTr:last-child {
  .divTd:last-child {
    border-bottom: solid 1px;
    margin-bottom: 18px;
  }
}
.formitem {
  width: 100%;
  display: flex;
  align-items: center;
}
.divWth1 {
  width: 235px;
}
.divWth2 {
  width: 189px;
}
.divWth3 {
  width: 215px;
}
.txtHg {
  height: 75px;
}
.el-form-item {
  margin-bottom: 0;
}
.el-form-item__label {
  justify-content: space-around;
}
</style>
