<template>
    <div>
        <el-carousel indicator-position="outside" style="margin: 0px">
            <el-carousel-item v-for="item in photo" :key="item.index">
                <el-image :src="item.url" />
            </el-carousel-item>
        </el-carousel>
        <div>
            <div> <!-- 分界线 -->
                <span style="font-size: 20px;font-weight: bold;margin-left: 670px">快速了解</span>
                <el-divider>针对用户需求---进行快速了解</el-divider>
            </div>
            <div > <!-- 跳转页面图片-->
                <el-row style="margin-left: 220px;">
                    <el-col :span="4" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 1 : 0">
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="@/assets/cimage/c13.jpg"
                                class="image">
                            <div style="padding: 14px;">
                                <div class="bottom clearfix">
                                    <el-button @click="$router.push('/apartment')" type="text" class="button">园区介绍</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4" style="margin-left: 60px;">
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="@/assets/cimage/c11.jpg"
                                class="image">
                            <div style="padding: 14px;">
                               
                                <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time>
                                    <el-button @click="$router.push('/project')" type="text" class="button">项目介绍</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4" style="margin-left: 60px;">
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="@/assets/cimage/c12.jpg"
                                class="image">
                            <div style="padding: 14px;">
                                
                                <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time>
                                    <el-button @click="$router.push('/news')" type="text" class="button">相关新闻</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="4" style="margin-left: 60px;">
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                class="image">
                            <div style="padding: 14px;">
                            
                                <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time>
                                    <el-button @click="$router.push('/foods')" type="text" class="button">美食餐饮</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div style="padding-top: 30px"> <!-- 租车Q&A -->
                <span style="font-size: 20px;font-weight: bold;margin-left: 656px">游玩Q&A</span>
                <el-divider>每一个阶段，都值得留下美好时刻</el-divider>
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-row :gutter="16" style="margin-top:10px;">
                            <el-col :span="12">
                                <el-card style="height: 240px" shadow="hover">
                                    <div style="border-bottom:#909399 solid 1px;height: 30px">
                                        <el-button type="warning" size="mini" round>Q1</el-button>
                                        <span style="font-weight: bold">游玩注意事项</span>
                                    </div>
                                    <div style="margin-top: 10px">事项1：如有身高 130m 以下儿童游玩,进场人员必须有大人陪同
                                    </div>
                                    <div>事项2：穿着舒适。穿着舒适的鞋子和适合当天天气的衣物，因为需要很多步行。</div>
                                    <div>事项3：自带雨衣和水。园区内的雨衣和水较贵，建议自带。</div>
                                    <div style="margin-bottom: 10px">事项4：保管个人物品。将个人财务存放在储物柜，贵重物品建议寄存。</div>
                                </el-card>
                            </el-col>
                            <el-col :span="12">
                                <el-card style="height: 240px" shadow="hover">
                                    <div style="border-bottom:#909399 solid 1px;height: 30px">
                                        <el-button type="warning" size="mini" round>Q2</el-button>
                                        <span style="font-weight: bold"> 有哪些网络预订方式?</span>
                                    </div>
                                    <div style="margin-top: 10px">App：通过应用市场下载辉针游乐App进行预订。</div>
                                    <div>小程序：在微信和支付宝平台搜索“辉针游乐”关键词找到小程序进行预订。</div>
                                    <div>触屏版：浏览器中输入dongfanghuizhen.cn进行预订。</div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="8">
                        <el-card style="margin-top:10px;height: 240px" shadow="hover">
                            <div style="border-bottom:#909399 solid 1px;height: 30px">
                                <el-button type="warning" size="mini" round>Q3</el-button>
                                <span style="font-weight: bold"> 有哪些购票流程?</span>
                            </div>
                            <div style="margin-top: 10px">第1步：游览了解所喜欢的设施。</div>
                            <div>第2步：了解票价，选择相应的游玩者。</div>
                            <div>第3步：进行微信或者支付宝进行支付。</div>
                            <div>第4步：订单确认，完成购票，入园前向工作人员厨师即可。</div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Current",
    data() {
        return {
            photo: [
                { index: 1, url: require('F:\\HIS\\his-vue-user\\src\\assets\\cimage\\c1.jpg') },
                { index: 2, url: require('F:\\HIS\\his-vue-user\\src\\assets\\cimage\\c2.jpg') },
                { index: 3, url: require('F:\\HIS\\his-vue-user\\src\\assets\\cimage\\c3.jpg') },
            ],
            currentDate: '',
            carList: []
        }
    },
    methods: {
        detail() {
            this.$router.push('/')
        }
    },
    mounted() {
        // 网页打开时 自动向后端发送请求
        this.$axios.get('/api/car/hotList').then(
            res => {
                this.carList = res.data.data.carList
            }
        )
    }
}
</script>

<style scoped>
.el-card {
    padding: 0 !important;
}

.el-image {
    /* 宽高和最外层 ElCarousel 控件宽高一致 */
    width: 100%;
    height: 450px;
    object-fit: cover;
}
.button{
    margin-left: 40px; 
    font-size: 20px
}
.image{
    height: 250px;
}
</style>