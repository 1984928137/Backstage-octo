<template>
  <div>
    个人信息
    <div class="straightLine">
      <span></span>
    </div>
    <div>
      <el-form
        ref="basicFormRef"
        :model="basicForm"
        status-icon
        :rules="rules"
        label-width="70px"
        class="loginForm"
      >
        <el-form-item label="帐号名" prop="userName">
          <span v-show="basicForm.isShow[0].value">{{'ss'}}</span>
          <el-input
            v-show="!basicForm.isShow[0].value"
            v-model="basicForm.userName"
            type="text"
            autocomplete="off"
          />
          <el-button v-show="basicForm.isShow[0].value" class="sbt-btn1" type="primary" @click="submitForm()"
            >修改</el-button
          >
          <el-button v-show="!basicForm.isShow[0]" class="sbt-btn1" type="primary" @click="submitForm()"
            >确认</el-button
          >
        </el-form-item>
        <!-- <el-form-item label="密码" prop="password">
          <el-input
            v-model="basicForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item> -->

        <el-form-item label="帐号" prop="accountNumber">
          <el-input v-model="basicForm.accountNumber" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="basicForm.gender" placeholder="请选择">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity count" prop="count">
          <!-- <el-select-v2
            v-model="basicForm.count"
            placeholder="Activity count"
            :options="options"
          /> -->
        </el-form-item>
        <!-- 时间 -->
        <!-- <el-form-item label="Activity time" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="basicForm.date1"
                type="date"
                label="Pick a date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="2">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                v-model="basicForm.date2"
                label="Pick a time"
                placeholder="Pick a time"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item> -->

        <el-form-item label="开关" prop="delivery">
          <el-switch v-model="basicForm.delivery" />
        </el-form-item>
        <el-form-item label="Activity type" prop="type">
          <el-checkbox-group v-model="basicForm.type">
            <el-checkbox label="Online activities" name="type" />
            <el-checkbox label="Promotion activities" name="type" />
            <el-checkbox label="Offline activities" name="type" />
            <el-checkbox label="Simple brand exposure" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="单项选择" prop="resource">
          <el-radio-group v-model="basicForm.resource">
            <el-radio label="Sponsorship" />
            <el-radio label="Venue" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="留言框" prop="desc">
          <el-input v-model="basicForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()"
            >Create</el-button
          >
          <el-button @click="resetForm()">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { InitData } from "../../../TS/persons/basic";

export default defineComponent({
  name: "",
  setup() {
    const data = reactive(new InitData());

    
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
.straightLine {
  height: 1px;
  background-color: rgb(12 12 12);
  width: 98%;
  margin: 3px auto;
}
</style>
