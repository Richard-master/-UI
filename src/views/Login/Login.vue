<template>
    <div>
        <el-form :rules="rules" label-position="left" label-width="70px" ref="loginForm" :model="loginForm"
                 class="loginContainer">
            <h3 class="login-title">系统登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input type="text" auto-complete="false" v-model="loginForm.username"
                          placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" auto-complete="false" v-model="loginForm.password"
                          placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击更换验证码"
                          style="width: 150px;margin-right: 5px"></el-input>
                <img :src="captchaUrl" @click="updateCaptcha"/>
            </el-form-item>
            <el-checkbox v-model="checked" class="login-remember">记住我</el-checkbox>
            <el-button type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    // import {postRequest} from "../utils/api";

    export default {
        name: "Login",
        data() {
            return {
                captchaUrl: '/captcha?time=' + new Date(),
                loginForm: {
                    username: '',
                    password: '',
                    code: '',
                },
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
                },
                checked: true,
            }
        },
        methods: {
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.$router.replace('/home');
                        /*postRequest('/login', this.loginForm).then(resp => {
                            if (resp) {
                                const tokenStr = resp.obj.tokenHead + resp.obj.token;
                                window.sessionStorage.setItem("tokenStr", tokenStr);
                                this.$router.replace('/home')
                            }
                        })*/
                    } else {
                        this.$message.error('请输入所有字段');
                        return false;
                    }
                });
            },
            updateCaptcha() {
                this.captchaUrl = 'captcha?time=' + new Date();
            }
        }
    }
</script>

<style lang="less" scoped>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

        .login-title {
            margin: 10px auto 40px auto;
            text-align: center;
        }

        .login-remember {
            text-align: left;
            margin: 0 0 15px 0;
        }
    }
</style>