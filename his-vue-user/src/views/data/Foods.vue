<template>
    <el-container>
        <el-header class="header">
            <span style="color:#FFFFFF" id="text">美食相关</span>
        </el-header>
        <el-main>
            <el-card id="card">
                <img src="@/assets/cimage/c51.jpg"
                class="image">
            </el-card>
          <el-card style="margin-top: 30px;">
            <el-input v-model="queryConditionName" placeholder="美食名称" style="width: 150px"></el-input>
            <el-button type="primary" style="margin-right: 30px" @click="getFoodList">查询</el-button>
          </el-card>
          <el-row :gutter="20">
            <el-col :span="4" v-for="ele in foodPage.records" :key="ele.id">
              <el-card style="margin-top: 20px;height: 240px" >
                <div class="left">
                  <div style="padding-top: 16px">
                    <span class="name">{{ ele.name }}</span>
                  </div>
                  <div class="content">
                    <span style="margin-left: 24px">{{ ele.content }}</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-card style="margin-top: 20px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="queryCondition.currentPage" :page-sizes="[1, 4, 5, 10]"
                           :page-size="queryCondition.pageSize" layout="total, sizes, prev, pager, next, jumper"
                           :total="foodPage.total">
            </el-pagination>
          </el-card>
        </el-main>
    </el-container>
</template>

<style>
#card{
    display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.header{
    font-size: 30px;
    font-weight: bold;
    background-color: rgb(255, 124, 77);
}

.left {
  float: left;
}

.content {
  margin-top: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #7b7b7b;
}
 

</style>

<script>
export default {
    data() {
        return {
          foodPage: [],
          queryCondition: {
            id: '',
            name: '',
            content: '',
            currentPage: 1,
            pageSize: 12,
          },
          queryConditionName: '',
        };
    },
   methods: {
    getFoodList() {
      this.$http.get('/api/food/lists', {
        params: {
          name: this.queryConditionName,
          currentPage: this.queryCondition.currentPage,
          pageSize: 12,
        }
      }).then(
          res => {
            console.log(res)
            this.foodPage = res.data.data.foodList
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
  },
  mounted() {

    this.getFoodList();
  }
}
</script>