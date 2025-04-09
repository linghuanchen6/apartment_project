<template>
  <div>

    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片容器 -->
    <el-card style="margin-top: 30px;">

      <el-input v-model="queryCondition.title" placeholder="新闻名称" style="width: 150px"></el-input>
      <el-button type="primary" style="margin-right: 30px" @click="getNewList">查询</el-button>
      <el-button style="margin-left: 60%;" type="danger" @click="deleteBatch">批量删除</el-button>
      <el-button type="primary" @click="add">添加新闻</el-button>
      <!-- 数据表格 -->
      <el-table :data="newPage.records" style="width: 100%" stripe border
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

        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>

        <el-table-column prop="abstracts" label="摘要">
        </el-table-column>
        <el-table-column prop="content" label="内容" width="300">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit"
                       @click="modify(scope.row.id)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete"
                       @click="remove(scope.row.id, scope.row.title)"></el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryCondition.currentPage" :page-sizes="[1, 4, 5, 10]"
                     :page-size="queryCondition.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="newPage.total">
      </el-pagination>

    </el-card>
    <el-dialog :title="actionType" :visible.sync="OpenDialog" width="30%" center>
      <el-form :model="formData" :rules="formRules" ref="formRef">
        <el-form-item label="编号" label-width="100px" >
          <el-input v-model="formData.id"></el-input>
        </el-form-item>
        <el-form-item label="标题" label-width="100px" >
          <el-input v-model.number="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要" label-width="100px" >
          <el-input v-model.number="formData.abstracts"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="100px" >
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

      newPage: [],

      queryCondition: {
        id: '',
        title: '',
        currentPage: 1,
        pageSize: 10,
      },
      OpenDialog: false,
      actionType: '',
      formData: {
        id: '',
        title: '',
        abstracts:'',
        content:'',
        status: 0,
      },
      formRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],

        abstracts: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ]
      },
      news: [],
    }
  },
  methods: {
    getNewList() {
      this.$http.get('/api/news/lists', { params: this.queryCondition }).then(
          res => {
            console.log(res)
            this.newPage = res.data.data.newsPage
          }
      )
    },
    handleSizeChange(val) {
      this.queryCondition.pageSize = val;
      this.getNewList();
    },
    handleCurrentChange(val) {
      this.queryCondition.currentPage = val;
      this.getNewList();
    },
    handleSelectionChange(val) {
      this.news = val
    },

    add() {
      this.formData = {}

      this.actionType = '添加新闻'

      this.OpenDialog = true
    },
    modify(id) {
      this.$http.get('/api/news/get/' + id).then(
          res => {
            if (res.data.status == 1) {
              this.formData = res.data.data.news;

              this.actionType = '修改新闻';

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
              if (this.actionType == '添加设施') {
                this.$http.post('/api/news/add', this.formData).then(
                    res => {
                      if (res.data.status == 1) {
                        this.$message.success(res.data.message)

                        this.getNewList()
                      } else {
                        this.$message.error(res.data.message)
                      }
                    }
                )
              } else {
                let data = {
                  id: this.formData.id,
                  title: this.formData.title,
                  abstracts: this.formData.abstracts,
                  content: this.formData.content,
                }
                this.$http.post('/api/news/modify', data).then(
                    res => {
                      if (res.data.status == 1) {
                        this.$message.success(res.data.message)

                        this.getNewList()
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
      let titles = ''

      this.news.forEach(news => {
        ids += news.id + ','
        titles += news.title + ','
      })

      ids = ids.substring(0, ids.length - 1)
      titles = titles.substring(0, titles.length - 1)

      const result = this.$confirm(
          '是否确认删除【' + titles + '】', '删除确认',
          {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }
      ).then(() => {
        console.log(ids)
        this.$http.delete('/api/news/deleteBatch?ids=' + ids).then(
            res => {
              if (res.data.status == 1) {
                this.$message.success(res.data.message)

                this.getNewList()
              } else {
                this.$message.error(res.data.message)
              }
            }
        )
      }).catch(() => { })
    },

    remove(id, title) {

      this.$confirm(
          '是否确认删除【' + title + '】', '删除确认',
          {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }
      ).then(() => {
        this.$http.delete('/api/news/remove/' + id).then(
            res => {
              if (res.data.status == 1) {
                this.$message.success(res.data.message)

                this.getNewList()
              } else {
                this.$message.error(res.data.message)
              }
            }
        )
      }).catch(() => { })
    },
  },

  mounted() {

    this.getNewList();
  }
}

</script>

<style scoped>
.tag {
  margin-right: 20px;
  margin-left: 10px;
}
</style>