<template>
    <el-container>
        <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
        <el-main id="background">
            <img src="@/assets/cimage/c22.png" class="image">
            <div>
                <el-container>
                    <el-header class="header">
                        <span style="color:#FFFFFF" id="text">园区介绍</span>
                    </el-header>
                    <el-main>
                        <div id="a1">
                            <div id="a2">
                                <div id="a3">
                                    <div>
                                        <img src="@/assets/cimage/c21.jpg" class="image2">
                                        <el-col :span="1" style="margin-left: 0px;">
                                            <img src="@/assets/cimage/c23.png" class="image3">
                                        </el-col>
                                        <el-col :span="16" style="margin-left: 150px;">
                                            <el-card>

                                                <div style="padding:30px;">
                                                    <div>
                                                        <span>东方辉针游乐场位于郑州市郑州新区，是一个以高科技为主要表现形式，以科幻和互动体验为特色，以先进的技术和构思为理念的文化科技主题乐园。
                                                            园区项目涵盖现代科技、科学幻想、神话传说、历史文化主题表演等多个方面，形式新颖，内容丰富适合不同年龄层次游客的需要。</span>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </div>
                                    <div>
                                        <el-col :span="16" style="margin-top: 80px;margin-left: 20px">
                                            <el-card>

                                                <div style="padding:30px;">
                                                    <div>
                                                        <span>东方辉针游乐场由飞越极限、恐龙危机、海螺湾、逃出恐龙岛、唐古拉雪山、暴风眼、
                                                          极地快车、星球达人秀、飞翔之歌、电影魔术大揭秘、生命之光、聊斋、宇宙小勇士等20多个大型
                                                          主题项目区组成，涵盖主题项目、游乐项目、休闲及景观项目200多项，其中包括许多领跑世界的超大
                                                          型游乐项目，绝大多数项目老少皆宜。</span>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                        <el-col :span="1" style="margin-left: -10px;">
                                            <img src="@/assets/cimage/c24.png" class="image4">
                                        </el-col>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </el-main>
                </el-container>



            </div>

        </el-main>

    </el-container>
</template>

<script>
export default {
    name: "apartment",
    methods: {
        detail() {
            this.$router.push('/')
        }
    }
}
</script>



<style scoped>
#a1 {
    margin-left: 200px;
    margin-right: 200px;
    height: 820px;

    background-color: rgb(255, 124, 77);

}

#a2 {
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 50px;
    height: 800px;

    background-color: rgb(255, 255, 255);

}

#a3 {
    margin-left: 120px;
    margin-right: 130px;
    margin-bottom: 50px;
    height: 760px;

    background-color: rgb(144, 190, 255);

}

.image {
    margin-left: 260px;
}

.image2 {
    margin-left: 0px;
}

.image3 {
    margin-top: 280px;
    height: 120px;
    width: 200px;
}

.image4 {
    margin-top: 220px;
    height: 120px;
    width: 200px;
}

.header {
    margin-left: 220px;
    margin-right: 220px;
    height: 80px !important;
    background-color: rgb(255, 124, 77);
}

#text {
    margin-left: 30px;
    font-size: 30px;
    font-weight: bold;
}


/* #background {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-image: linear-gradient(90deg,
            cyan,
            rgb(0, 123, 255));
    background-size: 400%;
    animation: myanimation 10s infinite;

}
@keyframes myanimation {
        0% {
            background-position: 0% 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0% 50%;
        }
    } */
</style>