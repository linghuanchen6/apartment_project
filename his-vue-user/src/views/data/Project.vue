<template>
  <el-container>
    <el-header class="header">
      <span style="color:#FFFFFF" id="text">项目介绍</span>
    </el-header>
    <el-main>
      <el-card id="card">
        <img src="@/assets/cimage/c32.png" class="image">
      </el-card>
      <el-card>
        <el-row>
          <el-col :span="9">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in photo" :key="item.index">
                <el-image :src="item.url"/>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="12" style="margin-left: 40px;">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="极地快车" name="1">
                <div>
                  集合战斗机特技动作，模拟飞行员身心体验，极地快车来自久负盛名的过山车生产国度-荷兰，是最经典的回旋式过山车之一。
                </div>
                <div>
                  奇异的倒退提升，迅猛的极速俯冲，多次上下捻转颠倒.…...似鹰击长空，若剑指苍穹，令观者欢欣惊叹，能给乘坐者失重、离心状态下的惊险之乐。
                </div>
              </el-collapse-item>
              <el-collapse-item title="欢乐天地" name="2">
                <div>欢乐天地是由国内众多经典刺激的机械游乐项目组成的多主题项目区，包括</div>
                <div>
                  大摆锤、波浪翻滚、转转杯、海盗船、高空飞翔、双层转马、UFO、空中飞舞、旋转小蜜蜂、梦幻极限跳水.....个个精彩纷呈，带您畅游云霄，体验极限欢愉!
                </div>
              </el-collapse-item>
              <el-collapse-item title="暴风眼" name="3">
                <div>狭长的轨道扭曲360°后形成圆环、优雅神秘，暴风一般的速度转体720°后半空骤停、</div>
                <div>
                  急速倒退，创造出疯狂刺激的风中旅程，世界顶级圆环过山车暴风眼加入多种高空运动体验元素,让忐忑和刺激的感觉交织考验您的极限!
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <!--                  <el-col>-->
          <!--                    <el-card v-if="car.isNew == 1" shadow="hover" class="card" style="margin-top: 20px;" :body-style="{ padding: '0px' }">-->
          <!--                      <el-image style="float: left;width: 32%;" :src="car.photo"/>-->
          <!--                      <div class="left">-->
          <!--                        <div style="padding-top: 16px">-->
          <!--                          <span class="name">{{car.name}}</span>-->
          <!--                        </div>-->
          <!--                        <div class="content">-->
          <!--                          <span style="margin-left: 24px">{{car.detail}}</span>-->
          <!--                        </div>-->
          <!--                        <div class="tag">-->
          <!--                          <el-tag size="mini" style="margin-left: 24px" type="danger">{{ car.color }}</el-tag>-->
          <!--                          &lt;!&ndash;v-if显示条件： 如果车辆是新车（isNew为1）则显示该新车标签&ndash;&gt;-->
          <!--                          <el-tag v-if="car.isNew == 1" size="mini" style="margin-left: 16px">全新</el-tag>-->
          <!--                        </div>-->
          <!--                      </div>-->
          <!--                      <div class="right">-->
          <!--                        <span style="font-weight: bold;margin-left: 30px">￥{{ car.price }}</span>/日均-->
          <!--                        <el-button style="margin-left: 10px;margin-top: -2px" size="small" @click="buy(car.id)">预定</el-button>-->
          <!--                      </div>-->
          <!--                    </el-card>-->
          <!--                  </el-col>-->
        </el-row>


      </el-card>
      <el-card style="margin-top: 30px;">
        <el-input v-model="queryConditionName" placeholder="设施名称" style="width: 150px"></el-input>
        <el-button type="primary" style="margin-right: 30px" @click="getEquipmentList">查询</el-button>
      </el-card>
      <el-row :gutter="20">
        <el-col :span="4" v-for="ele in equipmentPage.records" :key="ele.id">
          <el-card style="margin-top: 20px">
            <div class="left">
              <div style="padding-top: 16px">
                <span class="name">{{ ele.name }}</span>
              </div>
              <div class="content">
                <span style="margin-left: 24px">{{ ele.location }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-card style="margin-top: 20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryCondition.currentPage" :page-sizes="[1, 4, 5, 10]"
                     :page-size="queryCondition.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="equipmentPage.total">
      </el-pagination>
      </el-card>

    </el-main>
  </el-container>
</template>

<style>
#card {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
}

.header {
  font-size: 30px;
  font-weight: bold;
  background-color: rgb(255, 124, 77);
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
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
      equipmentPage: [],
      activeName: '1',
      queryCondition: {
        id: '',
        name: '',
        location: '',
        currentPage: 1,
        pageSize: 12,
      },
      queryConditionName: '',
      photo: [
        {index: 1, url: require('F:\\HIS\\his-vue-user\\src\\assets\\cimage\\c41.jpg')},
        {index: 2, url: require('F:\\HIS\\his-vue-user\\src\\assets\\cimage\\c42.jpg')},
        {index: 3, url: require('F:\\HIS\\his-vue-user\\src\\assets\\cimage\\c43.jpg')},
      ],
    };
  },
  methods: {
    getEquipmentList() {
      this.$http.get('/api/equipment/lists', {
        params: {
          name: this.queryConditionName,
          currentPage: this.queryCondition.currentPage,
          pageSize: 12,
        }
      }).then(
          res => {
            console.log(res)
            this.equipmentPage = res.data.data.equipmentList
          }
      )
    },
    handleSizeChange(val) {
      this.queryCondition.pageSize = val;
      this.getEquipmentList();
    },
    handleCurrentChange(val) {
      this.queryCondition.currentPage = val;
      this.getEquipmentList();
    },
  },
  mounted() {

    this.getEquipmentList();
  }
}
</script>

