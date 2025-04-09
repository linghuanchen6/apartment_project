<template>
  <div>

    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>美食管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片容器 -->
    <el-card style="margin-top: 30px;">

      <el-input v-model="queryCondition.name" placeholder="美食名称" style="width: 150px"></el-input>
      <el-button type="primary" style="margin-right: 30px" @click="getFoodList">查询</el-button>
      <el-button style="margin-left: 60%;" type="danger" @click="deleteBatch">批量删除</el-button>
      <el-button type="primary" @click="add">添加美食</el-button>
      <!-- 数据表格 -->
      <el-table :data="foodPage.records" style="width: 80%" stripe border
                @selection-change="handleSelectionChange">

        <el-table-column type="selection" />
        <el-table-column type="expand">
          <!-- <template slot-scope="props">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-tag class="tag" type="warning">药品规格:  {{ props.row.drugFormat }}</el-tag>
        <el-tag class="tag" type="success">生产厂家:  {{ props.row.drugFactory }}</el-tag>
      </el-form>
    </template> -->
        </el-table-column>
        <el-table-column prop="id" label="编号" width="180">
        </el-table-column>

        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>

        <el-table-column prop="content" label="介绍">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit"
                       @click="modify(scope.row.id)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete"
                       @click="remove(scope.row.id, scope.row.name)"></el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryCondition.currentPage" :page-sizes="[1, 4, 5, 10]"
                     :page-size="queryCondition.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="foodPage.total">
      </el-pagination>

    </el-card>
    <el-dialog :title="actionType" :visible.sync="OpenDialog" width="30%" center>
      <el-form :model="formData" :rules="formRules" ref="formRef">
        <el-form-item label="编号" label-width="100px" >
          <el-input v-model="formData.id"></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="100px" >
          <el-input v-model.number="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="介绍" label-width="100px" >
          <el-input v-model.number="formData.content"></el-input>
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

      foodPage: {},

      queryCondition: {
        id: '',
        name: '',
        currentPage: 1,
        pageSize: 10,
      },
      OpenDialog: false,
      actionType: '',
      formData: {
        id: '',
        name: '',
        content: '',
        status: 0,
      },
      formRules: {
        name: [
          { required: true, message: '请输入美食名称', trigger: 'blur' },
        ],

        id: [
          { required: true, message: '请设置编号', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入介绍', trigger: 'blur' },
        ],
      },
      foods: [],
    }
  },
  methods: {
    getFoodList() {
      this.$http.get('/api/food/list', { params: this.queryCondition }).then(
          res => {
            console.log(res)
            this.foodPage = res.data.data.foodPage
          }
      )
    },
    handleSizeChange(val) {
      this.queryCondition.pageSize = val;
      this.getFoodList();
    },
    handleCurrentChange(val) {
      this.queryCondition.currentPage = val;
      this.getFoodList();
    },
    handleSelectionChange(val) {
      this.foods = val
    },

    add() {
      this.formData = {}

      this.actionType = '添加美食'

      this.OpenDialog = true
    },
    modify(id) {
      this.$http.get('/api/food/get/' + id).then(
          res => {
            if (res.data.status == 1) {
              this.formData = res.data.data.food;

              this.actionType = '修改美食';

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
              if (this.actionType == '添加美食') {
                this.$http.post('/api/food/add', this.formData).then(
                    res => {
                      if (res.data.status == 1) {
                        this.$message.success(res.data.message)

                        this.getFoodList()
                      } else {
                        this.$message.error(res.data.message)
                      }
                    }
                )
              } else {
                let data = {
                  id: this.formData.id,
                  name: this.formData.name,
                  content: this.formData.content
                }
                this.$http.post('/api/food/modify', data).then(
                    res => {
                      if (res.data.status == 1) {
                        this.$message.success(res.data.message)

                        this.getFoodList()
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

      this.foods.forEach(food => {
        ids += food.id + ','
        names += food.name + ','
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
        this.$http.delete('/api/food/deleteBatch?ids=' + ids).then(
            res => {
              if (res.data.status == 1) {
                this.$message.success(res.data.message)

                this.getFoodList()
              } else {
                this.$message.error(res.data.message)
              }
            }
        )
      }).catch(() => { })
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
        this.$http.delete('/api/food/remove/' + id).then(
            res => {
              if (res.data.status == 1) {
                this.$message.success(res.data.message)

                this.getFoodList()
              } else {
                this.$message.error(res.data.message)
              }
            }
        )
      }).catch(() => { })
    },
  },

  mounted() {

    this.getFoodList();
  }
}

</script>

<style scoped>
.tag {
  margin-right: 20px;
  margin-left: 10px;
}
</style>