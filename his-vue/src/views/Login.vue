<template>
  <body>
    <div id="cc"></div>
    <div>
      <el-form :model="formData" :rules="formRules" ref="formRef">
        <h3>用户登录</h3>
        <el-form-item prop="openid">
          <el-input v-model="formData.openid" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
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
        openid: '',
        password: '',
      },
      formRules: {
        openid: [
          { required: true, message: '用户名', trigger: 'blur' },
          { max: 10, message: '用户名长度不能超过10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { max: 10, message: '密码长度不能超过10个字符', trigger: 'blur' }
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
            this.$http.post('/api/user/login', this.formData).then(
              res => {
                if (res.data.status == 1) {
                  this.currentUser = res.data.data.currentUser

                  sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser))
                  const name = res.data.data.name
                  const createTime = res.data.data.createTime
                  if (this.remember) {
                    localStorage.setItem("loginInfo", JSON.stringify(this.formData))
                  } else {
                    localStorage.removeItem("loginInfo")
                  }

                  this.$router.push({ path: '/home', query: { name, createTime } })
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
    if (localStorage.getItem("loginInfo") != null) {
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
    background-image: url("../assets/image/front2.jpg");
  }

  66% {
    background-image: url("../assets/image/front3.jpg");
  }

  100% {
    background-image: url("../assets/image/front4.jpg");
  }
}</style>
