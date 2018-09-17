<template>
   <div id="lotteryModal" v-if="!app">
      <div class="awards-info">
        <div class="img">
          <img src="../../assets/img/varyActivity/lottery2/notice.png">
        </div>
        <ul class="awards-lists" id="awardsList" :class="{anim:animate}">
          <li v-for='item in awardsItems'>{{item}}</li>
        </ul>
      </div>
      <div class="lottery-area">
         <div class="awards">
           <ul class="awards-ul">
             <li class="award-item" :class="{'active':index==activeIndex,'blank':item.category=='blank'}" v-for="(item,index) in awardsList" :key="index">
               <span class="couponName">{{item.nameBold}}</span>
               <span class="goodsName">{{item.name}}</span>
             </li>
           </ul>
         </div>
         <div class="start-btn " @click="startLottery" :class="{'disabled':remainTimes==0&&lotteryProp.isLogin}">开始抽奖</div>
      </div>
   </div>
</template>

<script>

import Toast from '@/components/toast.js';
import {getLotteryGoods618,getLotteryDrawingTimes618,lotteryDraw618,getWinnerList618} from '@/api/activity.js';
import formData from '@/utils/formData.js';
import {checkApp} from '@/utils/mobile';
import {statisEvent} from '@/utils/statisEvent.js';
import {getUserAgent} from '@/utils/common.js';
export default {
  name: 'lotteryModel',
  props: {
      lotteryProp: {
        type: Object,
        default: function () {
          return { isLogin: false }
        }
      }
  },
  data: function(){
      return {
        app:false,
        userAgent:'',
        activeIndex: -1,
        awardsList:[
          {id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10}
        ],
        remainTimes:1,
        prizeId:null,
        startFlag:true,  //“开始抽奖”按钮开关

        animate:false,
        awardsScrollTime:3000,
        awardsItems:[],
        awardsListLiH : '',

        timer1:'',  // 未获得抽到奖品时，move
        timer2:'',  // 抽到奖品  降速  lowSpeed
        timeFlag: 0,  // 时间标记，抽奖请求时间过长，则返回错误
        popOut:false, // 控制转盘低速转动时间
        popUp:false,  // 抽到奖品后是否弹框
        popUpPrizeInfo:{  // 控制“我的奖品”数据
          name:'',
          nameBold:''
        }
      }
   },
   methods: {
      init () {
        this.app = checkApp();
        this.userAgent = getUserAgent();
        if(!this.app) {
          this.initAwardStyle();
          this.getWinnerList();
          this.getAwardsList();
          this.getRemainTimes();
        }
      },
      awardsScroll(){      //   抽奖通知滚动效果
       let awardsList = document.getElementById('awardsList');
       if(awardsList) {
         awardsList.style.marginTop = this.awardsListLiH;
         this.animate=!this.animate;
         var that = this;
         setTimeout(function(){
           that.awardsItems.push(that.awardsItems[0]);
           that.awardsItems.shift();
           awardsList.style.marginTop='0px';
           that.animate=!that.animate;  // 去除消息回滚的效果
         },this.awardsScrollTime/2);
       }
     },
     // 获奖名单
     getWinnerList() {
       getWinnerList618().then(resp => {
         if(resp.code==200) {
            if(resp.data&&resp.data.length!=0) {
              let dataLen = resp.data.length;
              let awardsList = [];
              for(let i=0; i<dataLen; i++) {
                let txt = '恭喜手机尾号'+resp.data[i].phone+'用户抽中'+resp.data[i].prizeName+resp.data[i].prizeNameBold;
                awardsList.push(txt);
              }
              this.awardsItems = awardsList;
              if(this.awardsItems.length) {   // 如果有中奖名单则滚动中奖名单
                let awardsList = document.getElementById('awardsList');
                let liH = -18/37.52 + 'rem';   //li 的 height 为 18px
                this.awardsListLiH = liH ;
                let _this = this;
                setInterval(_this.awardsScroll,_this.awardsScrollTime);
              }
            }
         }
       }).catch(e => {
         Toast('网络错误，请稍后重试');
       });
     },
      //获取618转盘商品列表
      getAwardsList() {
        getLotteryGoods618().then(resp => {
          if(resp.code==200) {
            this.awardsList = resp.data || [];
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
        if (this.lotteryProp.isLogin) {
          getLotteryDrawingTimes618().then(resp => {
            if(resp.code==200){
              this.remainTimes  = resp.data.residueDrawingTimes;
            }
          }).catch(e=>{
            Toast('网络错误，请稍后重试');
          });
        }
      },
      startLottery() {
        if(!this.startFlag) {
          return;
        }
        this.userStatisEvent('权益一','点击抽奖按钮');  // 数据统计--点击抽奖按钮
        if (!this.lotteryProp.isLogin) {
          this.$emit('loginFaild');
          return;
        } else if (this.remainTimes==0){
          Toast('明天再来试试手气吧');
          return;
        } else if (this.remainTimes!=0&&this.lotteryProp.isLogin) {
          this.timer1 = setInterval(this.move, 100);
          //  抽奖
          this.startFlag = false;
          lotteryDraw618().then(resp => {
            if(resp.code==200){
              this.prizeId = resp.data.prizeId;
              if(!this.prizeId) {
                Toast(resp.data.msg);
                this.stop();
                return ;
              } else {
                this.userStatisEvent('权益一','成功抽奖');  // 数据统计--抽奖成功
              }
              this.remainTimes = resp.data.residueDrawingTimes;
              if(resp.data.category && (resp.data.category=='bonus' || resp.data.category=='special')) {
                let phone = formData.getUserPhone().slice(-4);
                let txt = '恭喜手机尾号'+ phone + '用户抽中'+resp.data.prizeName+resp.data.prizeNameBold;
                this.awardsItems.splice(0, 0, txt);
                this.popUp = true;
                this.popUpPrizeInfo={
                  popUpName:'prizeActive',
                  name:resp.data.prizeName,
                  nameBold:resp.data.prizeNameBold
                }
              } else if (resp.data.category && resp.data.category=='blank') {
                this.popUp = true;
                this.popUpPrizeInfo={
                  popUpName:'prizeNo',
                  name:resp.data.prizeName,
                  nameBold:resp.data.prizeNameBold
                }
              } else {
                this.popUp = false;
              }
              setTimeout(()=>{
                this.lowSpeed();
              },1600);
            } else if (resp.code==401) {
              this.$emit("loginFaild");
              this.stop ();
              this.startFlag = true;
            } else if (resp.code==400){
              Toast(resp.message);
              this.stop ();
              this.startFlag = true;
            }
          }).catch(e=>{
            Toast('网络错误，请稍后重试');
            this.startFlag = true;
          });

        }
      },
      move() {
         let count = this.awardsList.length;
         this.activeIndex ++;
         if (this.activeIndex > count - 1) {
           this.activeIndex = 0;
         }
         if(this.popOut&&this.awardsList[this.activeIndex].id == this.prizeId) {
            this.stop();
         }
         this.timeFlag += 100
         if (this.timeFlag >= 8000 && !this.prizeId) {
            clearInterval(this.timer1);
            clearInterval(this.timer2);
            Toast("当前抽奖人数过多，稍后再来");  // 网络请求错误
            this.startFlag = true;
            this.timeFlag = 0;
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
         this.popOut = false;     // 重新初始化
         this.timeFlag = 0;
         this.startFlag = true;
         if(this.popUp) {
            this.$emit('prizeActive',this.popUpPrizeInfo);
         }
      },
      initAwardStyle() {
        let lis = document.querySelectorAll('.award-item');
        let liH = 59;
        let liW = 102;
        let rootSize = 37.52;
        for(let i=0; i<lis.length; i++) {
          if(i<3) {
            lis[i].style.top = 0;
            lis[i].style.left = i*liW/rootSize+ i*2.5/rootSize + 'rem' ;
          } else if(i>=3&&i<5) {
            lis[i].style.top = (i-2)*liH/rootSize + (i-2)*2.5/rootSize + 'rem';
            lis[i].style.right = 0;
          } else if (i>=5&&i<8) {
            lis[i].style.top = 3*liH/rootSize + 3*2.5/rootSize + 'rem';
            lis[i].style.right = (i-5)*liW/rootSize + (i-5)*2.5/rootSize + 'rem';
          }else if (i>=8&&i<10) {
            lis[i].style.left = 0;
            lis[i].style.top = (10-i)*liH/rootSize + (10-i)*2.5/rootSize + 'rem';
          }
        }
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
   mounted () {
    this.init();
   }
}
</script>
<style lang="scss" scoped>
   $real-px: 37.5;
   @function calRem($px-input){
      @return ($px-input/$real-px)/2;
   }
   .anim{
     transition: all 0.5s;
   }
   #lotteryModal {
     width: calRem(690rem);
     height: calRem(777rem);
     margin: 0 auto;
     background: url("../../assets/img/varyActivity/lottery2/lottery_bg.png") no-repeat center;
     -webkit-background-size: 100%;
     background-size: 100%;
     box-sizing: border-box;
     padding-top: calRem(192rem);
   }
  .awards-info {
    width: calRem(600rem);
    height: calRem(36rem);
    margin: 0 auto calRem(17rem);
    background: #EB2972;
    border-radius: calRem(6rem);
    display: flex;
    transition: all 0.5s linear;
    overflow: hidden;
    .img {
      width: calRem(26rem);
      height: calRem(22rem);
      margin: 0 calRem(12rem) 0 calRem(12rem);
      padding-top: calRem(7rem);
      img {
        width: 100%;
        height: auto;
      }
    }
    ul {
      li {
        width: calRem(520rem);
        display: block;
        height: calRem(36rem);
        line-height: calRem(40rem);
        color: #fff;
        font-size:calRem(22rem);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
      }
    }
  }
  .lottery-area {
    position: relative;
    .awards {
      position: relative;
      .awards-ul {
        position: relative;
        width: calRem(622rem);
        height: calRem(487rem);
        margin: 0 auto;
        li {
          &.active {
            background: url("../../assets/img/varyActivity/lottery2/awardList_bg_active.png") no-repeat center;
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          position: absolute;
          width: calRem(204rem);
          height: calRem(118rem);
          background: url("../../assets/img/varyActivity/lottery2/awardList_bg.png") no-repeat center;
          -webkit-background-size: 100%;
          background-size: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .couponName {
            width:calRem(120rem);
            height:calRem(52rem);
            line-height: calRem(56rem);
            color: #fff;
            font-size: calRem(18rem);
            margin-bottom: calRem(8rem);
            text-align: center;
            background: url("../../assets/img/varyActivity/lottery2/couponName_bg.png") no-repeat top center;
            -webkit-background-size: 100%;
            background-size: 100%;
            box-sizing: content-box;
          }
          &.blank .couponName {
            background: url("../../assets/img/varyActivity/lottery2/blank.png") no-repeat center;
            -webkit-background-size: calRem(49rem);
          }
          .goodsName {
            color: #1D65CF;
            font-size: calRem(20rem);
            text-align: center;
          }
        }
      }
    }
    .start-btn {
      position: absolute;
      text-indent: -9999px;
      width: calRem(203rem);
      height: calRem(203rem);
      top:calRem(143rem);
      left: calRem(243rem);
      background: url("../../assets/img/varyActivity/lottery2/start_active.png") no-repeat center;
      -webkit-background-size: 100%;
      background-size: 100%;
    }
    .start-btn.disabled {
      background: url("../../assets/img/varyActivity/lottery2/start_disabled.png") no-repeat center;
      -webkit-background-size: 100%;
      background-size: 100%;
    }
  }

</style>
