<template>
    <el-container>
        <el-header class="header">
            <span style="color:#FFFFFF" id="text">在线购票</span>
        </el-header>
        <el-main>
            <el-card id="card">
                <img src="@/assets/cimage/c61.jpg" class="image" alt="">
            </el-card>
            <el-card>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="标准票 280元/人" name="1">
                        <div>适用于所有游客</div>
                    </el-collapse-item>
                    <el-collapse-item title="儿童票 199元/人" name="2">
                        <div>适用于身高1.1-1.4米的儿童</div>
                    </el-collapse-item>
                    <el-collapse-item title="老人票 199元/人" name="3">
                        <div>适用于年满65周岁的人士</div>
                    </el-collapse-item>
                    <el-collapse-item title="免票" name="4">
                        <div>儿童身高＜1.1m免门票。免票人士需有持全票价的成人陪同，每名持票成人限带1名免票人士；</div>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
            <el-card>
                <span style="color:rgb(255, 124, 77)">温馨提示：</span>
                <div>1、购票前请仔细阅读乐园《游客须知》、服务说明和相关公告，游客购票即被视为已认可乐园的相关规定。</div>
                <div>2、身高1.1米（不含1.1米）以下的儿童免票；身高1.1米（含1.1米）—1.4米（不含1.4米）之间的需购儿童票；身高1.4米以上（含1.4米）的游客需购全价票。</div>
                <div>
                    3、免票：1.身高1.1米（不含1.1米）以下儿童；2.一级、二级残疾人士，可持本人有效证件享受免票优惠。每位残疾人士必须由一名陪护人全程陪同入园游玩，如陪护人是其监护人或直系亲属（需为成年人且需提供直系亲属证明），则可免一位陪护人员门票；3.三级残疾人士，可持本人有效证件免票入园。每位残疾人士必须由一名陪护人全程陪同入园游玩（需为成年人、直系亲属）；4.四至十级残疾人士可持本人有效证件享受门票半价优惠政策。5.导游证（非带团导游）、军官证、记者证均不属于免票人士。
                    以上免票和优惠票价人士均须有一名具有监护能力的成人陪同，且每名全价票人士限带一名免票人士和优惠票人士入园。</div>
                <div>4、本票为入园门票，门票一经售出，概不退换，涂改无效，在有效期内使用一次有效（一人一票），副券撕下作废。</div>
                <div>5、假票无效，发现即没收，本乐园保留追究相关法律责任的权利；乐园对门票丢失、失窃、过期概不负责。</div>
                <div>6、导游票持有人必须出示本人的导游证，如证件与本人不符，一经发现，立即没收该导游票。</div>
                <div>
                    7、乐园不保证游客一次入园可游览到园内所有项目，乐园可能由于恶劣天气、特殊活动、设备更新或例行检修，因游客过多，控制入园人数；或其他原因暂停开放部分项目或全部项目，对于游客未能游玩的项目，乐园不予退票，也不承担其他任何赔偿或补偿责任，开园时间的变更不另行通知。
                </div>
                <div>8、门票对乐园另行付费的项目无效，门票可以作商业发票及报销凭证，具体请以园区售票处公示为准。</div>
            </el-card>
        </el-main>
        <el-footer>
            <el-button type="primary" round @click="dialog">点我购票</el-button>
            <el-dialog title="购票信息" :visible.sync="dialogForm">
                <el-form :model="form" rules="formRules">
                  <el-form-item label="购票种类">
                    <el-radio-group v-model="form.category">
                      <el-radio label="标准票"></el-radio>
                      <el-radio label="儿童票"></el-radio>
                      <el-radio label="老人票"></el-radio>
                      <el-radio label="免票"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="姓名">
                    <el-input style="width: 200px; float: left" v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号">
                    <el-input style="width: 200px;" v-model=" form.idNumber" autocomplete="off"></el-input></el-form-item>
                  <el-form-item label="备注">
                    <el-input style="width: 200px;" v-model=" form.memo" autocomplete="off"></el-input></el-form-item>


                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogForm = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
        </el-footer>
    </el-container>
</template>

<script>
export default {
  name: "Server",
  data(){
    return{
      currentUser: [],
      dialogForm:false,
      form:{
        id:0,
        category:'',
        username:'',
        idNumber:'',
        memo:'',
      },
      formRules: {
        name: [
          { required: true, message: '请输入购票人姓名', trigger: 'blur' },
          { max: 10, message: '姓名长度不能超过10个字', trigger: 'blur' }
        ],
        idNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min:18,max: 18, message: '请输入正确的身份证号', trigger: 'blur' }
        ],
        memo: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
      },
    }
  },
    methods: {

      dialog() {
        this.dialogForm = true
        // this.$http.get('/api/ticket/getById/' + this.currentUser.id).then(
        //     res => {
        //         this.form = res.data.data.ticket
        //     }
        // )
      },
      add() {
        this.$http.post('/api/ticket/add',this.form).then(
            res => {
              if(res.data.status === 1){
                this.$message.success(res.data.message)
              }else {
                this.$message.error(res.data.message)
              }
            }
        )
        this.dialogForm = false
      }
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