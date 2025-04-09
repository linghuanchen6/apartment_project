<template>
  <div>

    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购票记录管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片容器 -->
    <el-card style="margin-top: 30px;">

<!--      <el-input v-model="queryCondition.name" placeholder="设施名称" style="width: 150px"></el-input>-->
<!--      <el-button type="primary" style="margin-right: 30px" @click="getEquipmentList">查询</el-button>-->
      <el-button style="margin-left: 70%;" type="danger" @click="deleteBatch">批量删除</el-button>
<!--      <el-button type="primary" @click="add">添加设施</el-button>-->
      <!-- 数据表格 -->
      <el-table :data="ticketPage.records" style="width: 80%" stripe border
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

        <el-table-column prop="category" label="购票种类" width="180">
        </el-table-column>

        <el-table-column prop="name" label="购票人"width="180">
        </el-table-column>
        <el-table-column prop="idNumber" label="身份证号" width="180">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-icon-delete"
                       @click="remove(scope.row.id, scope.row.name)"></el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryCondition.currentPage" :page-sizes="[1, 4, 5, 10]"
                     :page-size="queryCondition.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="ticketPage.total">
      </el-pagination>

    </el-card>
  </div>
</template>

<script>

export default {

  //组件使用的数据

  data() {

    return {

      ticketPage: {},
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
        category: '',
        memo:'',
        idNumber:'',
        status: 0,
      },
      tickets: [],
    }
  },
  methods: {
    getTicketList() {
      this.$http.get('/api/ticket/list', { params: this.queryCondition }).then(
          res => {
            console.log(res)
            this.ticketPage = res.data.data.ticketPage
          }
      )
    },
    handleSizeChange(val) {
      this.queryCondition.pageSize = val;
      this.getTicketList();
    },
    handleCurrentChange(val) {
      this.queryCondition.currentPage = val;
      this.getTicketList();
    },
    handleSelectionChange(val) {
      this.tickets = val
    },
    deleteBatch() {

      let ids = ''
      let names = ''

      this.tickets.forEach(tickets => {
        ids += tickets.id + ','
        names += tickets.name + ','
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
        this.$http.delete('/api/ticket/deleteBatch?ids=' + ids).then(
            res => {
              if (res.data.status == 1) {
                this.$message.success(res.data.message)

                this.getTicketList()
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
        this.$http.delete('/api/ticket/remove/' + id).then(
            res => {
              if (res.data.status == 1) {
                this.$message.success(res.data.message)

                this.getTicketList()
              } else {
                this.$message.error(res.data.message)
              }
            }
        )
      }).catch(() => { })
    },
  },

  mounted() {

    this.getTicketList();
  }
}

</script>

<style scoped>
.tag {
  margin-right: 20px;
  margin-left: 10px;
}
</style>