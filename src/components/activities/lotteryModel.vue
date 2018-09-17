<template>
   <div id="lotteryModal">
      <div class="lottery-wrapper">
         <div class="row">
            <div :class="['ltry-item', {activePrize:activeClass[index]}]" v-for="(prize,index) in list1" :id="prize.id" :key="prize.id">
               <span>{{prize.nameBold}}</span>
               <span>{{prize.name}}</span>
            </div>
         </div>
         <div class="row">
            <div :class="['ltry-item', {activePrize:activeClass[9]}]" :id="prizeLists[9].id">
               <span>{{prizeLists[9].nameBold}}</span>
               <span>{{prizeLists[9].name}}</span>
            </div>
            <div class="start-btn"  @click="startLottery()" :class="{active:StartActive}">
               <span>开始抽奖</span>
               <span v-if="remainTimesFlag">（{{remainTimes}}次）</span>
            </div>
            <div :class="['ltry-item', {activePrize:activeClass[4]}]" :id="prizeLists[4].id">
               <span>{{prizeLists[4].nameBold}}</span>
               <span>{{prizeLists[4].name}}</span>
            </div>
         </div>
         <div class="row">
            <div :class="['ltry-item', {activePrize:activeClass[8-index]}]" v-for="(prize, index) in list2" :id="prize.id" :key="prize.id">
               <span>{{prize.nameBold}}</span>
               <span>{{prize.name}}</span>
            </div>
         </div>
      </div>
      <!-- 奖品弹窗 -->
      <transition name='fade2' mode='out-in'>
         <section class="model-mask" v-if="prizeModel">
            <div class="prize-model">
               <div class="prize-content" v-html="prizeContent"></div>
               <div class="confirm-btn" @click.stop.prevent="closePrizeModel()">好的</div>
            </div>
            <div class="close-btn" @click.stop.prevent="closePrizeModel()"></div>
         </section>
      </transition>
   </div>
</template>

<script>

import Toast from '@/components/toast.js';
import apiService from '@/api/activity.js'
import formData from '@/utils/formData.js';
import verify from '@/utils/verify.js';
export default {
  name: 'lotteryModel',
  props: {
      pIsLogin: {
         type: Boolean,
         default: false
      }
  },
  data: function(){
      return {
         isLogin : false,

         startBtnFlag: true,  //抽奖按钮开关
         prizeLists : [{},{},{},{},{},{},{},{},{},{}],  // 奖品列表信息
         prizeId : "",  //抽取奖品id
         prizeContent:"",
         prizeModel: false,

         index: -1,
         count: 10,
         remainTimesFlag:false,
         remainTimes:0,
         remainTimesTransit: 0,  // 存储剩余次数，在奖品模态框关闭后再传递给真正的剩余次数

         timer1:'',  // 未获得抽到奖品时，move
         timer2:'',
         timeFlag: 0, // 时间标记，抽奖请求时间过长，则返回错误
         popOut:false, //抽到奖品后是否弹框
         startFlag:true, //开始按钮开关
         StartActive:false,
         activeClass: [false, false, false, false,false, false,false,false,false,false],
         winPrize:null,
      }
   },
   methods: {
      //获取奖品列表
      getPrizeList() {
         apiService.prizeList().then(resp => {
            if(resp.code==200) {
               this.prizeLists = resp.data || [];
            }
            else {
              Toast(resp.message);
            }
         }).catch(e => {
            Toast('网络错误，请稍后重试');
         });
      },
      // 判断剩余抽奖次数
      getRemainTimes() {
         apiService.getResidueDrawingTimes().then(resp => {
            if(resp.code==200){
               this.remainTimesFlag = true;
               this.remainTimes    = resp.data.residueDrawingTimes;
               this.isLogin = this.pIsLogin;
               this.startBtnStyle();
            } else if (resp.code==401) {
               this.isLogin = false;
               this.$emit("parentNoLogin");
            } else {
               Toast(resp.message);
            }
         }).catch(e=>{
            Toast('网络错误，请稍后重试');
         });
      },
      startLottery() {
         //判断开始按钮是否可以点击
         if(!this.isLogin) {
            this.$emit("showLogin");
            return;
         }
         if(this.remainTimes<=0) {
            this.prizeModel = true;
            this.prizeContent = "非常抱歉，<br/>您的抽奖机会已经用完了~";
            return;
         }
         if(this.startFlag) {  //开始抽奖
            this.startFlag = false ;
            this.timer1 = setInterval(this.move, 100);
            apiService.draw().then(resp => {
               if(resp.code==200){
                  this.remainTimesTransit = resp.data.residueDrawingTimes;
                  let winID  = resp.data.prizeId;
                  this.prizeId = winID;
                  this.prizeContent = resp.data.msg;
                  setTimeout(()=>{
                     this.lowSpeed();
                  },1600);
               } else if (resp.code == 401) {
                  this.isLogin = false;
                  this.$emit("parentNoLogin");  // 通知父元素改变登录状态
               } else {
                  Toast(resp.message);
                  clearInterval(this.timer1);
                  clearInterval(this.timer2);
                  this.startFlag = true;
               }
            }).catch(e=>{
               Toast('网络错误，请稍后重试');
               clearInterval(this.timer1);
               clearInterval(this.timer2);
               this.startFlag = true;
            });
         }

      },
      move() {
         let index = this.index;
         let count = this.count;
         for (let i = 0; i < this.activeClass.length; i++) {
            this.activeClass[i] = false;
         }
         index ++;
         if (index > count - 1) {
            index = 0;
         }

         this.$set(this.activeClass, index, true);
         this.index = index;

         if(this.popOut&&this.prizeLists[index].id == this.prizeId) {
            this.stop();
         }

         this.timeFlag += 100
         if (this.timeFlag >= 10000 && !this.prizeId) {
            clearInterval(this.timer1);
            clearInterval(this.timer2);
            Toast("当前抽奖人数过多，稍后再来");
            this.startFlag = true;
         }
      },

      lowSpeed() {
         clearInterval(this.timer1);
         this.timer2 = setInterval(this.move, 300);
         setTimeout(() => {
            this.popOut = true;
         }, 1000); //降速阶段转1秒
      },
      stop () {
         clearInterval(this.timer1);
         clearInterval(this.timer2);
         //判断是否是再来一次,不是再来一次则弹出模态框
         if(this.prizeContent.trim()) {
            this.prizeModel = true;
         }
         this.remainTimes = this.remainTimesTransit;
         this.popOut = false;     // 重新初始化
         this.timeFlag = 0;
         this.startFlag = true;
      },
      startBtnStyle() {
         if(this.remainTimes>0 && this.isLogin) {
            this.StartActive = true;
         } else {
            this.StartActive = false;
         }
      },
      closePrizeModel() {
         this.prizeModel = false;
         this.remainTimes = this.remainTimesTransit;
         this.startBtnStyle();
      }
   },
   computed: {
      list1() {
          return this.prizeLists.slice(0, 4);
      },
      list2() {
          return this.prizeLists.slice(5, 9).reverse(); 
      }
   },
   mounted () {
      this.getPrizeList();
   }
}
</script>
<style lang="scss" scoped>
   $real-px: 37.5;
   @function calRem($px-input){
      @return ($px-input/$real-px)/2;
   }
   @function doRem($px-input){
      @return $px-input/$real-px;
   }
   .fade2-enter-active {
     transition: all .5s ease;
   }
   .fade2-leave-active {
     transition: all .5s ease;
   }
   .fade2-enter, .fade2-leave-active {
     transform: translateY(10px);
     opacity: 0;
   }
#lotteryModal{
   .lottery-wrapper {
      width:calRem(638rem);
      padding-top:calRem(250rem);
      margin:0 auto;
      .row {
         display:flex;
         flex-wrap:nowrap;
         justify-content:center;
         .ltry-item {
            width:calRem(159rem);
            height:calRem(110rem);
            //margin-bottom:calRem(8rem);
            background: url('../../assets/img/varyActivity/components/lottery/lottery_bg.png') 0 0 no-repeat;
            background-size: 100% 100%;
            display:flex;
            flex-direction: column;
            justify-content:center;
            align-items:center;
            & span:nth-child(1) {
               font-size: calRem(28rem);
               font-family:HYYaKuHeiW , "PingFangSC-Regular";
               color:rgba(118,85,46,1);
               font-weight:800;
               margin-bottom:calRem(2rem);
            }
            & span:nth-child(2) {
               font-size: calRem(16rem);
               color:#76552E;
               line-height: calRem(36rem);
            }
         }
         .activePrize {
            background: url('../../assets/img/varyActivity/components/lottery/lottery_bg_active.png') 0 0 no-repeat;
            background-size: 100% 100%;
         }
         .start-btn {
            width:calRem(315rem);
            height:calRem(110rem);
            //margin-bottom:calRem(8rem);
            background: url('../../assets/img/varyActivity/components/lottery/lottery_start.png') 0 0 no-repeat;
            background-size: 100% 100%;
            display:flex;
            flex-direction: column;
            justify-content:center;
            align-items:center;
            font-family:"PingFangSC-Regular";
            font-weight:bold;
            & span {
               color : #fff;
               opacity:0.44;
            }
            & span:nth-child(1){
               font-size: calRem(32rem);
            }
            & span:nth-child(2) {
               font-size: calRem(14rem);
               line-height: calRem(26rem);
            }
         }
         .start-btn.active {
            & span {
               opacity:1;
            }
         }
      }

   }
   .model-mask {
      position:fixed;
      width:100%;
      height:100%;
      z-index:10;
      top:0;
      left:0;
      background: rgba(10,10,10,0.5);
   }
   .close-btn {
      width:calRem(68rem);
      height:calRem(68rem);
      margin:0 auto;
      margin-top:calRem(150rem);
      background: url('../../assets/img/varyActivity/lottery/close.png') top center no-repeat;
      background-size: 100% auto;
   }
   // 抽奖奖品弹出框
   .prize-model {
      width:calRem(600rem);
      height:calRem(372rem);
      background:rgba(255,240,218,1);
      border-radius: calRem(20rem);
      margin:0 auto;
      margin-top:calRem(390rem);
      display: flex;
      flex-direction: column;
      justify-content:flex-start;
      align-items: center ;
      .prize-content {
         width:calRem(510rem);
         height:calRem(256rem);
         font-size:calRem(28rem);
         font-family:"PingFangSC-Regular";
         color:rgba(149,114,93,1);
         line-height:calRem(48rem);
         display: inline-flex;
         justify-content: center;
         align-items: center;
      }
      .confirm-btn {
         width:calRem(510rem);
         height:calRem(68rem);
         line-height:calRem(68rem);
         border-radius:calRem(10rem);
         font-size:calRem(24rem);
         font-family:"PingFangSC-Regular";
         color:rgba(111,58,26,1);
         letter-spacing:calRem(6rem);
         background: linear-gradient(to right, #FFC74F, #FFB86C);
      }
   }
}
</style>