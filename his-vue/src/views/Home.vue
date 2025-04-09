<template>
  <!-- 顶层容器 -->
  <el-container class="root_container">

    <!-- 头部区 -->
    <el-header>


      <span>游乐园管理管理系统</span>
      <!-- <span class="user-info" v-if="currentUser.doctorType == 1 || currentUser.doctorType == 2">
        <i class="el-icon-copy-document"></i>科室名称：【{{ deptName }}】
      </span> -->
      <el-button type="primary" @click="logout">退出</el-button>

    </el-header>



    <el-container>

      <!-- 左侧菜单区  -->
      <el-aside width="200px">

        <el-menu background-color="#545c64" text-color="white" active-text-color="#ffd04b" unique-opened router>
          <el-row class="tac">

            <el-col :span="24">
              <el-menu default-active="1" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="manage">
                  <i class="el-icon-menu"></i>
                  <span slot="title">员工管理</span>
                </el-menu-item>
                <el-menu-item index="equipment">
                  <i class="el-icon-document"></i>
                  <span slot="title">设施管理</span>
                </el-menu-item>
                <el-menu-item index="news">
                  <i class="el-icon-setting"></i>
                  <span slot="title">新闻管理</span>
                </el-menu-item>
                <el-menu-item index="food">
                  <i class="el-icon-setting"></i>
                  <span slot="title">美食管理</span>
                </el-menu-item>
                <el-menu-item index="buyticket">
                  <i class="el-icon-setting"></i>
                  <span slot="title">购票记录管理</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-menu>

      </el-aside>

      <!-- 右侧主体区 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view />
      </el-main>



    </el-container>
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
    logout() {
      const result = this.$confirm(
        '是否确认退出系统', '退出确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$http.post('/api/user/logout').then(
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
  }
}

</script>

<style scoped>
.el-header {
  background-color: #545c64;
  color: white;
  font-size: 24px;

  /* 弹性布局 */
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.el-aside {
  background-color: #545c64;
}

.root_container {
  height: 100%;
}

.el-menu {
  border-right: none;
}

.user-info {
  color: ffffff;
  font-size: 16px;
}
</style>
