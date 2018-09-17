<template>
  <div class="scratch-con">
    <div class="txt">
      你有<i>{{freeDrawTime}}</i>次抽免单机会，快去下单吧
    </div>
    <div class="scratchModel" @touchstart.stop.prevent="checkScratch()">
      <div id="scratch" :class="{'active':scratchActive}">
        <div id="card">
          <p>{{prizeTxt}}</p>
          <p>{{prizeInfo}}</p>
        </div>
        <div class="card-cover" v-if="(freeDrawTime==0 && scratch)||!scratchProp.isLogin"></div>
      </div>
    </div>
  </div>
</template>

<script>
import LuckyCard from '@/components/scratchCard.js';
import {getScratchTimes618,getScratchResult618,scratch618} from '@/api/activity.js';
import Toast from '@/components/toast.js';
import {statisEvent} from '@/utils/statisEvent.js';
import {getUserAgent} from '@/utils/common.js';
export default {
  name: 'scratchModel',
  props: {
    scratchProp: {
      type: Object,
      default: function () {
        return { isLogin: false }
      }
    }
  },
  data: function(){
      return {
        userAgent:'',
        freeDrawTime: 0,
        scratchArea:0.2,       // 刮奖面积，取值 0-1
        scratchActive:false,   // 是否中奖样式
        scratchId:0,
        scratchCover:true,     // 禁止刮奖遮罩层
        resultTxt: {
          FIRST_TERM_FREE:{
            active:true,
            txt:'把妹要用高科技，摆脱单身神助力',
            prize:'首期免租券',
          },
          ALL_FREE:{
            active:true,
            txt:'山有木兮木有枝，你咋才来呐',
            prize:'全额免租券',
          },
          BLANK:{
            active:false,
            txt:'给你一个爱的么么哒',
            prize:'谢谢参与',
          }
        },
        prizeTxt:'',
        prizeInfo:''
      }
   },
   methods: {
     initLuckyCard() {
       let _this = this;
       LuckyCard.case({
         ratio: _this.scratchArea,
         coverImg:require('../../assets/img/varyActivity/scratchCard/scratch_cover.png')
       }, function() {
         _this.scratch();
         this.clearCover();
       });
     },
     checkScratch() {
       if(!this.scratchProp.isLogin) {
         this.$emit('loginFaild');
         return ;
       }
       if(!this.freeDrawTime) {
         Toast("您有0次抽免单机会，快去下单吧");
         return ;
       }
     },
     getScratchTimes() {
       if(this.scratchProp.isLogin) {
         let _this = this;
         getScratchTimes618().then(resp => {
           if(resp.code==200){
             this.freeDrawTime  = resp.data.luckyFreeDrawTime || 0;
             if (this.freeDrawTime) {
               this.initLuckyCard();
             }
           }
         }).catch(e=>{
           Toast('网络错误，请稍后重试');
         });
       }
     },
     getScratchResult() {
       if(this.scratchProp.isLogin) {
         getScratchResult618().then(resp => {
           if(resp.code==200) {
             this.scratchId = resp.data.id;
             if(resp.data.drawResult) {
               this.prizeTxt = this.resultTxt[resp.data.drawResult].txt;
               this.prizeInfo = this.resultTxt[resp.data.drawResult].prize;
               this.scratchActive = this.resultTxt[resp.data.drawResult].active;
             }
           }
         }).catch(e=>{
           Toast('网络错误，请稍后重试');
         });
       }
     },
     scratch() {
       scratch618(this.scratchId).then(resp => {
         if(resp.code==200){
           this.freeDrawTime--;
           this.scratch = false;
           this.userStatisEvent('权益三','刮奖');// 数据统计--刮奖次数
         }else if(resp.code==400) {
           Toast(resp.message);
         } else if(resp.code==401) {
           this.$emit('loginFaild');
         } else {
           Toast(resp.message);
         }
       }).catch(e=>{
         Toast('网络错误，请稍后重试');
       });
     },
     //  根据userAgent触发不同的统计数据
     //  action：访问页面/分享成功/权益XX
     //  label： 用于更详细的描述触发权益XX
     userStatisEvent(action,label) {
       if(this.userAgent == 'wx') {
         statisEvent('微信618活动',action,label);
       } else if(this.userAgent == 'jd') {
         statisEvent('京东618活动',action,label);
       } else if(this.userAgent == 'mibao') {
         statisEvent('APP618活动',action,label);
       } else {
         statisEvent('其他渠道618活动',action,label);
       }
     },
   },

   mounted() {
     this.userAgent = getUserAgent();
     this.getScratchTimes();
     this.getScratchResult();
   },
}
</script>

<style lang="scss" scoped>
$real-px: 37.5;
@function calRem($px-input){
   @return ($px-input/$real-px)/2;
}
.scratch-con {
  width: calRem(682rem);
  height: calRem(330rem);
  margin: 0 auto calRem(18rem);
  background: url("../../assets/img/varyActivity/scratchCard/scratchM_bg.png") no-repeat center;
  background-size: 100%;
  .txt {
    height: calRem(52rem);
    padding-top: calRem(42rem);
    color: #1D65CF;
    font-size: calRem(24rem);
    text-align: center;
    i {
      padding: 0 calRem(4rem);
      color: #EB2972;
      font-size: calRem(30rem);
    }
  }
}
.scratchModel {
  width: calRem(612rem);
  height: calRem(178rem);
  margin: 0 auto;
}
// 最外层
#scratch {
  width: calRem(612rem);
  height: calRem(178rem);
  position: relative;
  box-sizing: border-box;
}
// 刮开显示背景
#card {
  width: calRem(612rem);
  height: calRem(178rem);
  height: 100%;
  font-size: 40px;
  text-align: center;
  background: url("../../assets/img/varyActivity/scratchCard/scratch_bg.png") no-repeat center;
  background-size: contain;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  box-sizing: border-box;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p:first-child {
    color: #8f8f8f;
    text-align: center;
    font-size: calRem(22rem);
    height: calRem(40rem);
    line-height: calRem(40rem);
  }
  p:last-child {
    color: #888;
    text-align: center;
    font-size: calRem(30rem);
    letter-spacing: calRem(14rem);
    height: calRem(40rem);
    line-height: calRem(40rem);
  }
}
.active #card{
  background: url("../../assets/img/varyActivity/scratchCard/scratch_active_bg.png") no-repeat center;
  background-size: contain;
  p {
    color: #EB2972;
  }
}
.card-cover {
  width: calRem(612rem);
  height: calRem(178rem);
  position: absolute;
  left: 0;
  top: 0;
  background: url("../../assets/img/varyActivity/scratchCard/scratch_cover.png") no-repeat center;
  background-size: contain;
  z-index: 10;
}

</style>
