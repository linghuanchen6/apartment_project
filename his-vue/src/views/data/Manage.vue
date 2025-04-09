<template>
  <div>

    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col :span="4">
        <el-card id="c1" >
          <div style="font-weight: bold;margin-bottom: 40px">
            员工总数
          </div>
          <div style="font-weight: bold;font-size: 40px" >
            {{employCount}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" style="margin-left: 80px;">
        <el-card id="c2">
          <div style="font-weight: bold;margin-bottom: 40px">
            设施总数
          </div>
          <div style="font-weight: bold;font-size: 40px" >
            {{equipmentCount}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" style="margin-left: 80px;">
        <el-card id="c3">
          <div style="font-weight: bold;margin-bottom: 40px">
            新闻总数
          </div>
          <div style="font-weight: bold;font-size: 40px" >
            {{newsCount}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" style="margin-left: 80px;">
        <el-card id="c4">
          <div style="font-weight: bold;margin-bottom: 40px">
            购票总数
          </div>
          <div style="font-weight: bold;font-size: 40px" >
            {{ticketCount}}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 卡片容器 -->
    <el-card style="margin-top: 30px;">

      <el-input v-model="queryCondition.name" placeholder="员工姓名" style="width: 150px"></el-input>
      <el-button type="primary" style="margin-right: 30px" @click="getEmployList">查询</el-button>
      <el-button style="margin-left: 60%;" type="danger" @click="deleteBatch">批量删除</el-button>
      <el-button type="primary" @click="add">添加员工</el-button>
      <!-- 数据表格 -->
      <el-table :data="employPage.records" style="width: 80%" stripe border @selection-change="handleSelectionChange">

        <el-table-column type="selection" />
        <el-table-column type="expand">
          <!-- <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-tag class="tag" type="warning">药品规格:  {{ props.row.drugFormat }}</el-tag>
                <el-tag class="tag" type="success">生产厂家:  {{ props.row.drugFactory }}</el-tag>
              </el-form>
            </template> -->
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>

        <el-table-column prop="username" label="账号" width="180">
        </el-table-column>

        <el-table-column prop="phone" label="手机号">
        </el-table-column>
        <el-table-column prop="updateTime" label="最后操作时间">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="modify(scope.row.id)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete"
              @click="remove(scope.row.id, scope.row.name)"></el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryCondition.currentPage" :page-sizes="[1, 4, 5, 10]" :page-size="queryCondition.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="employPage.total">
      </el-pagination>

    </el-card>
    <el-dialog :title="actionType" :visible.sync="OpenDialog" width="30%" center>
      <el-form :model="formData" :rules="formRules" ref="formRef">
        <el-form-item label="员工姓名" label-width="100px" :label-width="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" label-width="100px" :label-width="username">
          <el-input v-model.number="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="100px" :label-width="phone">
          <el-input v-model.number="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="100px" :label-width="sex">
          <el-input v-model.number="formData.sex"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" label-width="100px" :label-width="idNumber">
          <el-input v-model.number="formData.idNumber"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" :label-width="password">
          <el-input v-model.number="formData.password"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer">
        <el-button @click="OpenDialog = false">取 消</el-button>
        <el-button type="primary" @click="addOrModify">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {

  //组件使用的数据

  data() {

    return {
      employCount:'',
      equipmentCount:'',
      newsCount:'',
      ticketCount:'',
      employPage: {},

      queryCondition: {
        name: '',
        username: '',
        currentPage: 1,
        pageSize: 10,
      },
      OpenDialog: false,
      actionType: '',
      formData: {
        id: 0,
        name: '',
        username: '',
        phone: 0,
        sex: '',
        idNumber: '',
        password: '',
      },
      formRules: {
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          { max: 10, message: '员工名称的长度不能超过十个字符', trigger: 'blur' }
        ],

        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { max: 10, message: '账号的长度不能超过十个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' },
          { type: 2, message: '性别只有一个字', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { max: 20, message: '手机号的长度不能超过二十个字符', trigger: 'blur' }
        ],
        idNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { max: 20, message: '请输入正确的身份证号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { max: 20, message: '请输入正确的密码', trigger: 'blur' }
        ],
      },
      employs: [],
    }
  },
  methods: {
    getEmployList() {
      this.$http.get('/api/employ/list', {params: this.queryCondition}).then(
          res => {
            console.log(res)
            this.employPage = res.data.data.employPage
          }
      )
    },
    handleSizeChange(val) {
      this.queryCondition.pageSize = val;
      this.getEmployList();
    },
    handleCurrentChange(val) {
      this.queryCondition.currentPage = val;
      this.getEmployList();
    },
    handleSelectionChange(val) {
      this.employs = val
    },

    add() {
      this.formData = {}

      this.actionType = '添加员工'

      this.OpenDialog = true
    },
    modify(id) {
      this.$http.get('/api/employ/get/' + id).then(
          res => {
            if (res.data.status == 1) {
              this.formData = res.data.data.employ;

              this.actionType = '修改用户';

              this.OpenDialog = true;

            } else {
              this.$message.error(res.data.message)
            }
          }
      )
    },
    addOrModify() {
      this.$refs.formRef.validate(
          valid => {
            if (valid) {
              if (this.actionType == '添加员工') {
                this.$http.post('/api/employ/add', this.formData).then(
                    res => {
                      if (res.data.status == 1) {
                        this.$message.success(res.data.message)

                        this.getEmployList()
                      } else {
                        this.$message.error(res.data.message)
                      }
                    }
                )
              } else {
                let data = {
                  id: this.formData.id,
                  name: this.formData.name,
                  username: this.formData.username,
                  phone: this.formData.phone,
                  sex: this.formData.sex,
                  idNumber: this.formData.idNumber,
                  password: this.formData.password
                }
                this.$http.post('/api/employ/modify', data).then(
                    res => {
                      if (res.data.status == 1) {
                        this.$message.success(res.data.message)

                        this.getEmployList()
                      } else {
                        this.$message.error(res.data.message)
                      }
                    }
                )
              }
              this.OpenDialog = false
            } else {
              this.$message.error("输入数据有误，请检查后再提交")
            }
          }
      )
    },
    deleteBatch() {

      let ids = ''
      let names = ''

      this.employs.forEach(employ => {
        ids += employ.id + ','
        names += employ.name + ','
      })

      ids = ids.substring(0, ids.length - 1)
      names = names.substring(0, names.length - 1)

      const result = this.$confirm(
          '是否确认删除【' + names + '】', '删除确认',
          {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }
      ).then(() => {
        console.log(ids)
        this.$http.delete('/api/employ/deleteBatch?ids=' + ids).then(
            res => {
              if (res.data.status == 1) {
                this.$message.success(res.data.message)

                this.getEmployList()
              } else {
                this.$message.error(res.data.message)
              }
            }
        )
      }).catch(() => {
      })
    },

    remove(id, name) {

      this.$confirm(
        '是否确认删除【' + name + '】', '删除确认',
        {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$http.delete('/api/employ/remove/' + id).then(
          res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.message)

              this.getEmployList()
            } else {
              this.$message.error(res.data.message)
            }
          }
        )
      }).catch(() => { })
    },
    getCount() {
      this.$http.post('/api/employ/count').then(
          res => {
            if(res.data.status === 1){
              this.employCount = res.data.data.count
              console.log(this.employCount)
            }else {
              this.$message.error(res.data.message)
            }
          }
      )
    },
    getCount2() {
      this.$http.post('/api/equipment/count').then(
          res => {
            if(res.data.status === 1){
              this.equipmentCount = res.data.data.count
              console.log(this.equipmentCount)
            }else {
              this.$message.error(res.data.message)
            }
          }
      )

    },
    getCount3() {
      this.$http.post('/api/news/count').then(
          res => {
            if(res.data.status === 1){
              this.newsCount = res.data.data.count
              console.log(this.newsCount)
            }else {
              this.$message.error(res.data.message)
            }
          }
      )
    },
    getCount4() {
      this.$http.post('/api/ticket/count').then(
          res => {
            if(res.data.status === 1){
              this.ticketCount = res.data.data.count
              console.log(this.ticketCount)
            }else {
              this.$message.error(res.data.message)
            }
          }
      )
    },
  },

  mounted() {
    this.getCount();
    this.getCount2();
    this.getCount3();
    this.getCount4();
    this.getEmployList();
  }
}

</script>

<style scoped>

#c1{
  background-color: coral;

}
#c2{
  background-color: aqua;
}
#c3{
  background-color: chartreuse;
}
#c4{
  background-color: burlywood;
}
.tag {
  margin-right: 20px;
  margin-left: 10px;
}
</style>