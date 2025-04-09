<template>
    <el-container>
      <el-header style="display: inline-block;margin-left: 150px">
        <el-image style="width: 80px;height: 80px;float: left;cursor: pointer;margin-top: 25px" :src="require('F:\\HIS\\his-vue-user\\src\\assets\\cimage\\touhou1.jpg')"></el-image>
        <el-descriptions style="float: left;margin-top: 15px;margin-left: 50px" border>
            <el-descriptions-item>
              <template slot="label"><i class="el-icon-user"></i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
              &nbsp;&nbsp;&nbsp;&nbsp;{{currentUser.username}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"><i class="el-icon-mobile-phone"></i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手机号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ currentUser.phone }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"><i class="el-icon-mobile-phone"></i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;昵称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ currentUser.name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="el-icon-user"></i>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮箱&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
            &nbsp;&nbsp;&nbsp;&nbsp;{{currentUser.email}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </el-descriptions-item>
        </el-descriptions>
        <el-button style="margin-left: 60px;margin-top: 18px" type="primary" @click="dialog">修改</el-button>
        <el-dialog title="修改个人资料" :visible.sync="dialogForm">
          <el-form :model="form">
            <el-form-item label="用户名"><el-input style="width: 120px" v-model="form.username" autocomplete="off"></el-input></el-form-item>
            <el-form-item label="昵称"><el-input style="width: 120px;float: left" v-model="form.name" autocomplete="off"></el-input></el-form-item>
            <el-form-item label="手机号"><el-input  v-model="form.phone" autocomplete="off"></el-input></el-form-item>
            <el-form-item label="邮箱"><el-input v-model="form.email" autocomplete="off"></el-input></el-form-item>
            
  
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogForm = false">取 消</el-button>
            <el-button type="primary" @click="modify">确 定</el-button>
          </div>
        </el-dialog>
      </el-header>
    </el-container>
  
  </template>
  
  <script>
  
  export default {
    name: "Server",
    data() {
      return{
        currentUser: [],
        dialogForm:false,
        form:{
          id:0,
          name:'',
          username:'',
          phone:'',
          email:'',
        }
      }
    },
    methods:{
      dialog(){
        this.dialogForm = true
        this.$http.get('/api/server/getById/'+this.currentUser.id).then(
            res => {
              this.form = res.data.data.server
            }
        )
      },
      modify(){
        this.$http.put('/api/server/modify',this.form).then(
            res => {
              if(res.data.status==1){
                this.$message.success(res.data.message)
                this.dialogForm = false
                this.getForm()
              }else{
                this.$message.error(res.data.message)
                this.dialogForm = false
              }
            },
        )
      },
      getForm(){
        if(sessionStorage.getItem("currentUser")!= null){
          this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
        }
        this.$http.get('/api/server/getById/'+this.currentUser.id).then(
            res => {
              this.currentUser = res.data.data.server
            }
        )
      }
    },
    mounted() {
      this.getForm();
    }
  }
  </script>
  
  <style scoped>
  .tou{
    width: 80px;
    height: 80px;
    border-radius: 130px;
    float: left;
    margin-left: 100px;
  }
  
  </style>
  