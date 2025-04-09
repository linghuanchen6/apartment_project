<template>
    <el-container id="body">
    <el-main>
    <div>
        <el-form :model="formData" :rules="formRules" ref="formRef">
            <h3>用户注册</h3>
            <el-form-item prop="name">
                <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item prop="username">
                <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="formData.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input v-model="formData.phone" placeholder="请输入电话号"></el-input>
            </el-form-item>
            <el-form-item prop="email">
                <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>

            <el-button type="primary" @click="registerU">注册</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
        </el-form>
    </div>
</el-main>
</el-container>
</template>

<script>
export default {

    data() {

        return {
            formData: {
                username: '',
                password: '',
            },
            formRules: {
                username: [
                    { required: true, message: '用户名', trigger: 'blur' },
                    { max: 10, message: '用户名长度不能超过10个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { max: 18, message: '密码长度不能超过18个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { max: 11, message: '手机号长度不能超过11位', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { max: 11, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { max: 20, message: '请输入正确邮箱', trigger: 'blur' }
                ],
            },
            currentUser: {},
            remember: false,
        }
    },

    methods: {
        registerU() {
            this.$refs.formRef.validate(
                valid => {
                    if (valid) {
                        this.$http.post('/api/server/register', this.formData).then(
                            res => {
                                if (res.data.status == 1) {
                                    // this.currentUser = res.data.data.currentUser
                                    // sessionStorage.setItem("currentUser",JSON.stringify(this.currentUser))
                                    this.$router.push('/login')
                                    this.$router.go(0)
                                    this.$message.success(res.data.message)
                                } else {
                                    this.$message.error(res.data.message)
                                }
                            }
                        )
                    }
                }
            )
        },
        reset() {
            this.formData = {}
        }

    },




    mounted() {
        if (localStorage.getItem("currentUser") != null) {
            this.formData = JSON.parse(localStorage.getItem("currentUser"))
        }
    }
}
</script>

<style scoped>
#body {
    background-image: url("@/assets/image/front1.png");
    background-size: cover;
    background-position: center;
}

.el-form {
    width: 300px;
    margin: 40px auto;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 0px 20px lightgray;
    text-align: center;
}
</style>