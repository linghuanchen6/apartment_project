<template>
    <el-container>
        <el-header class="header">
            <span style="color:#FFFFFF" id="text">相关新闻</span>
        </el-header>
        <el-main>
            <el-card id="card">
                <img src="@/assets/cimage/c31.jpg" class="image">
            </el-card>
            <el-card>
                <!-- <el-card shadow="hover" class="card" style="width: 400px" :body-style="{ padding: '0px' }">
                    <el-image style="float: left;width: 75%;height: 200px" :src="car.photo" />
                    <div style="padding-top: 20px">
                        <span style="padding-left: 16px;margin-top: 20px;font-size: 13px">{{ car.name }}</span>
                        <el-button style="padding-left: 16px;" size="mini" type="text">前往查看</el-button>
                    </div>
                </el-card> -->
                <el-collapse accordionc v-for="news in newsList">
                    <el-collapse-item :title="news.title">
                        <div>{{news.abstracts}}</div>
                        <div>{{news.content}}</div>
                    </el-collapse-item>

                </el-collapse>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "News",
    data() {
        return {
            newsListTemp: [],
            newsList: [],
        }
    },
    methods:{
        get(){
            this.$http.get('/api/news/list').then(
                res => {
                    if(res.data.status === 1){
                        this.newsList = res.data.data.newsVoList
                    }
                }
            )
        }
    },
   
    mounted(){
        this.get()
    }
}
</script>

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
</style>

