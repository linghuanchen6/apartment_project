<template>
  <body>
    <div id="cc"></div>
    <div>
      <el-form :model="formData" :rules="formRules" ref="formRef">
        <h3>用户登录</h3>
        <el-form-item prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
        
      </el-form>
    </div>
  </body>
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
          {  message: '用户名', trigger: 'blur' },
          { max: 10, message: '用户名长度不能超过10个字符', trigger: 'blur' }
        ],
        password: [
          {  message: '请输入登录密码', trigger: 'blur' },
          { max: 10, message: '密码长度不能超过10个字符', trigger: 'blur'}
        ],
      },
      currentUser: {},

      remember: false,
    }
  },

  methods: {
    login() {
      this.$refs.formRef.validate(
        valid => {
          if (valid) {
            this.$http.post('/api/server/login', this.formData).then(
              res => {
                if (res.data.status == 1) {
                  this.currentUser = res.data.data.currentUser

                  sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser))
                  this.$router.push( '/home' )
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
      this.formData = JSON.parse(localStorage.getItem("loginInfo"))
    }
  }
}
</script>

<style scoped>
.el-form {
  width: 300px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px lightgray;
  text-align: center;
}
#cc {
  height: 30%;
}

body {
  background-image: url("../assets/image/front1.png");
  background-size: cover;
  background-position: center;
  animation: slideshow 10s infinite;
}

@keyframes slideshow {
  0% {
    background-image: url("../assets/image/front1.png");
  }

  33% {
    background-image: url("../assets/image/front2.png");
  }

  66% {
    background-image: url("../assets/image/front3.png");
  }

  100% {
    background-image: url("../assets/image/front4.png");
  }
}</style>
