<template>
  <el-container>
    <div>
      <el-header class="header">
        <!--      <el-menu router-->
        <!--          :default-active="home" mode="horizontal" @select="handleSelect"-->
        <!--          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">-->
        <div id="app">
          <el-menu router mode="horizontal" background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item style="width: 130px;height: 50px;"> <img src="@/assets/image/logo.png" disabled
                style="height: 50px;width: 50px;margin-left: 0px; margin-top: 0px" /></el-menu-item>
            <el-menu-item index="current" style="margin-left: 50px;">首页</el-menu-item>
            <el-menu-item index="apartment">主题乐园</el-menu-item>
            <el-menu-item index="service">游客服务</el-menu-item>
            <el-menu-item index="ticket">在线购票</el-menu-item>
            <!--v-if显示条件：currentUser.log 即当前有用户正在登录 即显示登录、注册、订单管理等-->
            <el-button v-if="this.currentUser.log != 1" style="margin-top: 10px;margin-left: 90px"
              @click="login">登录</el-button>
            <el-button v-if="this.currentUser.log != 1" style="margin-top: 10px;margin-left: 25px"
              @click="registerUser">注册</el-button>
            <el-dropdown v-if="currentUser.log == 1 " style="margin-top: 18px;margin-left: 25px">
              <span style="cursor: pointer;font-size: 18px;color: #dddddd;">{{ currentUser.username }}</span><i
                class="el-icon-arrow-down" style="margin-left:8px;color: #dddddd"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toUser">个人资料</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button style="margin-left: 40px;margin-right: 20px" type="info"><i
                class="el-icon-phone-outline"></i>400-000-000</el-button>
          </el-menu>
        </div>
      </el-header>
    </div>
    <el-main style="height: 600px;margin: 0">
      <router-view />
    </el-main>
    <el-footer class="footer">

      <div style="margin-top: 30px;margin-left: 115px;">
        <el-row :gutter="20">
          <el-col :span="2"><span style="color: #FFFFFF">友情链接：</span></el-col>
          <el-col :span="3"><a href="https://www.fangte.com/activities/"><span
                style="color: #FFFFFF">精彩活动</span></a></el-col>
          <el-col :span="3"><a href="https://www.fangte.com/help/about.html"><span
                style="color: #FFFFFF">关于方特</span></a></el-col>
          <el-col :span="3"><a href="https://www.fangte.com/help/newsList.html"><span
                style="color: #FFFFFF">新闻公告</span></a></el-col>
          <el-col :span="3"><a href="https://www.fangte.com/help/sitemap.html"><span
                style="color: #FFFFFF">网站地图</span></a></el-col>
          <el-col :span="3"><a href="https://www.shanghaidisneyresort.com/disneytown-rules/"><span
                style="color: #FFFFFF">迪士尼小镇须知</span></a></el-col>
          <el-col :span="3"><a href="https://www.shanghaidisneyresort.com/wishing-star-park-rules/"><span
                style="color: #FFFFFF">星愿公园须知</span></a></el-col>
          <el-col :span="3"><a href="https://wan.cncn.com/"><span style="color: #FFFFFF">欣欣旅游</span></a></el-col>
        </el-row>
      </div>
    </el-footer>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      currentUser: {},

      openid: this.$route.query.openid,

      name: this.$route.query.name,
    }
  },
  methods: {
    login(){
      //点击登录 跳转至登录页面
      this.$router.push("/login")
      console.log(this.currentUser)
    },
    toUser(){
      //跳转至个人资料页面
      this.$router.push('/center')
    },
    registerUser(){
      this.$router.push('/register').then(

      )
    },
    logout() {
      const result = this.$confirm(
        '是否确认退出系统', '退出确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$http.post('/api/server/logout').then(
          res => {
            if (res.data.status == 1) {
              sessionStorage.removeItem("currentUser")

              localStorage.removeItem("loginInfo")

              this.$message.success(res.data.message)

              this.$router.push("/login")
            }
          }
        )
      }).catch(() => { })

    }
  },
  mounted() {

    if (sessionStorage.getItem("currentUser") != null) {
      this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    }
    console.log(this.currentUser)
  }
}

</script>

<style scoped>
.el-menu-item {
  font-size: 20px;
  width: 200px;
  text-align: center;
}

.el-header {
  background-color: white;
  color: #140C40;

  /* 弹性布局 */
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.footer {
  height: 90px !important;
  background-color: #409EFF
}

.header {
  background-color: #409EFF
}

.font {
  color: #FFFFFF
}

.root_container {
  height: 100%;
}

.user-info {
  color: ffffff;
  font-size: 16px;
}
</style>