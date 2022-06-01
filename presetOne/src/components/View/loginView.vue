<template>
    <div class="login-box">
        <!-- 登录页面 -->
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            status-icon
            :rules="rules"
            label-width="70px"
            class="loginForm"
        >
            <h1>后台管理系统</h1>
            
            <el-form-item label="帐号" prop="userName">
                <el-input v-model="loginForm.userName" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button class="sbt-btn1" type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { InitData } from '../../TS/login';


export default defineComponent({
    name: 'login',
    setup() {
        

        const data = reactive(new InitData())

        const rules = reactive({
            userName: [
                { required: true, message: 'Please input 帐号', trigger: 'blur' },
                { min: 6, max: 20, message: '字符长度在 6 to 20 之间', trigger: 'blur' },
            ],
            password: [
                { required: true, message: 'Please input 密码', trigger: 'blur' },
                { min: 8, max: 15, message: '字符长度在 8 to 15 之间', trigger: 'blur' },
            ],
        })

        // let Form = new InitData()
        // console.log(Form)
        // let submitForm = Form.submitForm

        // const resetForm = (formEl | undefined) => {
        //     if (!formEl) return
        //     formEl.resetFields()
        // }
        return {
            ...toRefs(data),
            rules,
            // submitForm,
        }
    }
})
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    background: url("../../assets/img/login.jpeg");
    padding-top: 200px;

    .loginForm {
        width: 450px;
        padding: 10px;
        background-color: white;
        border-radius: 10px;
        margin: 0 auto;
        .sbt-btn1 {
            width: 100%;
        }
        .el-form-item {
            margin-bottom: 18px;
        }
        h1 {
            text-align: center;
            margin: 20px;
        }
    }
}
</style>