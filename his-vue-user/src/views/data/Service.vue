<template>
    <el-container>
        <el-aside>
            <el-row>
                <el-col>
                    <el-menu router default-active="1" class="el-menu" @open="handleOpen" @close="handleClose"
                        background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b">
                        <el-menu-item index="news">
                            <i class="el-icon-menu"></i>
                            <span slot="title">相关新闻</span>
                        </el-menu-item>
                        <el-menu-item index="project">
                            <i class="el-icon-menu"></i>
                            <span slot="title">项目介绍</span>
                        </el-menu-item>
                        <el-menu-item index="foods">
                            <i class="el-icon-document"></i>
                            <span slot="title">美食服务</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-aside>
        <el-main style="height: 600px;margin: 0">
            <router-view />
        </el-main>
    </el-container>
</template>

<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>
.el-aside {
    height: 550px !important;
    background-color: #409EFF;
    width: unset;
    width:200px !important;
}
.el-menu-item{
    text-align: center;
    margin-left: -30px;
  
}

    
   

</style>