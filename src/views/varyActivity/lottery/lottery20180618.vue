<template>
   <div>
     <div  class="view-wp">
       <div class="view-content">
         <!--S 吸顶tab-->
         <div class="category-tabs" id="fixedTabsWrapper">
           <div class="swiper-container" id="fixedTabs"  ref="fixedTabs">
             <div class="swiper-wrapper">
               <div class="swiper-slide" :class="{'active':index==activeTab}" v-for="(item,index) in tabsData" :key="index" @click="changeTab(index,item)">
                 <span><i></i> {{item}}</span>
               </div>
             </div>
           </div>
           <div class="category-select">
             <img src="../../../assets/img/varyActivity/lottery20180618/category-select.png">
           </div>
         </div>
         <!--E 吸顶tab-->
         <scroll ref="activity" :pullDownRefresh="false" :pullUpLoad="false" :scrollTab="'scrollTab'" :probeType="3" @showTab="showTab()" @hideTab="hideTab()">
           <div class="wrapper" :class="{'app':isInApp}">
             <!--1 转盘抽奖区-->
             <div class="lottery-area" v-show="!isInApp">
               <lottery ref="lotteryModel" :lotteryProp="componentProp" @loginFaild="loginFaild" @prizeActive="prizeActive"></lottery>
               <div class="tips">Tips：天上要掉馅饼啦，砸在实名认证的宝宝头上~~~嘘！</div>
               <div class="button-area">
                 <div @click="showPopUp('rules1')">活动规则></div>
                 <div @click="showMyPrize">我的奖励></div>
               </div>
             </div>
             <!--2 领取优惠券-->
             <div class="vastCoupon-area">
               <div class="title">
                 <img src="../../../assets/img/varyActivity/lottery20180618/vastCoupon_title.png">
               </div>
               <div class="receive-con">
                 <div class="values">
                   <img src="../../../assets/img/varyActivity/lottery20180618/value2388.png">
                 </div>
                 <div class="receive" title="一键领取" @click="receiveVastCoupon">
                   <img src="../../../assets/img/varyActivity/lottery20180618/receiveVastCoupon.png">
                 </div>
               </div>
               <div class="button-area rule-btn">
                 <div @click="showPopUp('rules2')">活动规则></div>
                 <div @click="checkMyCoupon">查看优惠券></div>
               </div>
               <div class="coupon-txt">
                 <img src="../../../assets/img/varyActivity/lottery20180618/arrow_icon1.png">
                 <div>看看神券都有啥</div>
               </div>
               <div class="activity-goods">
                 <div class="category-tabs" id="scrollTab">
                   <div class="swiper-container" id="swiperTab">
                     <div class="swiper-wrapper">
                       <div class="swiper-slide" :class="{'active':index==activeTab}" v-for="(item,index) in tabsData" :key="index" @click="changeTab(index,item)">
                         <span><i></i> {{item}}</span>
                       </div>
                     </div>
                   </div>
                   <div class="category-select">
                     <img src="../../../assets/img/varyActivity/lottery20180618/category-select.png">
                   </div>
                 </div>
                 <div class="category-coupon">
                    <div class="blue-coupon">
                      <div class="coupon" v-for="(item,index) in activityGoods.bonusList.common" :key="index">
                        <div class="price-area">
                          <span><img :src="require('../../../assets/img/varyActivity/lottery20180618/'+item.price+'.png')"></span>
                        </div>
                        <div class="describe-area">
                          <span>立减券</span>
                          <span v-if="item.condition">{{item.condition}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="red-coupon">
                      <div class="coupon" v-for="(item,index) in activityGoods.bonusList.jd" :key="index">
                        <div class="coupon-con">
                          <div class="price-area">
                            <span><img :src="require('../../../assets/img/varyActivity/lottery20180618/'+item.price+'.png')"></span>
                          </div>
                          <div class="describe-area">
                            <span>立减券</span>
                            <span v-if="item.condition">{{item.condition}}</span>
                          </div>
                        </div>
                        <div class="jd">
                          <span>小白信用专属</span>
                          <span>Exclusive coupon</span>
                        </div>
                      </div>
                    </div>
                 </div>
                 <div class="category-goods">
                   <div class="good-item" v-for="(item,index) in activityGoods.goodsInfoList" :key="index" @click="goChooseDetail(item.id,item.name)">
                     <div class="left">
                       <img :src="item.imgUrl">
                     </div>
                     <div class="right">
                       <div class="name">{{item.name}}</div>
                       <div class="prize1">
                         原价：￥ {{item.originalPrize}}
                       </div>
                       <div class="prize2">
                         <div class="mibao_prize">
                           <span>蜜宝价</span>
                           <span>￥<i>{{item.mibaoPrize}}</i>{{item.mibaoUnit}}</span>
                         </div>
                         <div class="discont_prize">
                           <span>券后价</span>
                           <span>￥<i>{{item.discontPrize}}</i>({{item.discontUnit}})</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div class="button-area">
                   <div @click="goGoodscategory">查看更多></div>
                 </div>
               </div>
             </div>
             <!--刮奖区-->
             <div class="scratch-area" v-if="!isInApp">
               <div class="title">
                 <img src="../../../assets/img/varyActivity/lottery20180618/scratch_title.png">
               </div>
               <scratch-card ref="scratchCard" :scratchProp="componentProp" @loginFaild="loginFaild"></scratch-card>
               <div class="button-area scratch">
                 <div @click="showPopUp('rules3')">活动规则></div>
               </div>
             </div>

             <!--底部-->
             <div class="bottom-area">
               <p><span></span>活动最终解释权归蜜宝平台所有<span></span></p>
               <p>如有疑问,可在【我的—客服】中拨打客服电话或咨询在线客服</p>
             </div>

             <!--运动层-->
             <div class="trans-effect">
               <div class="balloon balloon1">
                 <img src="../../../assets/img/varyActivity/lottery20180618/balloon1.png" />
               </div>
               <div class="balloon balloon2">
                 <img src="../../../assets/img/varyActivity/lottery20180618/balloon2.png" />
               </div>
               <div class="cloud">
                 <img src="../../../assets/img/varyActivity/lottery20180618/cloud.png" />
               </div>
             </div>
           </div>
         </scroll>
         <!--弹窗-->
         <transition name='fade' mode='out-in'>
           <pop-up :popUpProps="popUpProps" v-if="popUpFlag" @close="closePopUp"></pop-up>
         </transition>
         <!--登录框-->
         <login-model ref="login" @success="loginSuccess()" :loginProps="loginProps"></login-model>
         <!--回到顶部-->
         <div id="backTop" @click.stop.prevent="backTop">
           <img src="../../../assets/img/varyActivity/lottery20180618/backTop.png">
         </div>
       </div>
     </div>
   </div>
</template>

<script>
import scratchCard from '@/components/activities/scratchCard';
import lottery from '@/components/activities/lotteryModel2.vue';
import apiService from '@/api/activity.js';
import {getMyPrizeList618} from '@/api/activity.js';
import formData from '@/utils/formData.js';
import verify from '@/utils/verify.js';
import Toast from '@/components/toast.js';
import {hostUrl} from '@/api/fetch.js';
import popUp from '@/components/activities/popUpModel618';
import loginModel from '@/components/activities/login';
import goodsInfo618 from '@/json/goodsInfo618.js';
import {goGoodsDetail,checkApp,goSchemeUrlOpenAppUi2} from '@/utils/mobile.js';
import {statisEvent} from '@/utils/statisEvent.js';
import wxapi from '@/utils/wxapi';
import {getUserAgent} from '@/utils/common.js';

export default {
   name: 'a20180618',
   components:{
     scratchCard,
     lottery,
     popUp,
     loginModel
   },
   data: function(){
      return {
        isInApp:false,
        userAgent:'',
        componentProp:{
          isLogin: false,
        },
        popUpProps:{
          name:'',
          lotteryPrizeList:[],
          prizeActive:{}
        },
        loginProps:{
          recommendCode :false,
          style:"yellow",
          closeBtnPosition:"top"
        },
        isLogin: false,
        tabSwiper: {},
        fixedTabSwiper:{},
        activeTab:0,    // 活动商品分类默认选中第一个tab
        tabsData: [],
        activityGoods:{
          bonusList: {},
          goodsInfoList:{}
        },
        popUpFlag: false,
        vastCouponFlag:true,  // “一键领取神券”开关
        vastCouponName:'618yijianlingqu',      // 2388元神券接口参数
      }
   },
  created(){
    this.tabsData = goodsInfo618.tabsData;
    this.rendingActivityGoods();
  },
   methods: {
     showPopUp(name) {
       if(name == 'rules2' && this.isInApp) {
         this.popUpFlag = true;
         this.popUpProps.name = 'rules2App';
       } else {
         this.popUpFlag = true;
         this.popUpProps.name = name;
       }
     },
     closePopUp() {
       this.popUpFlag = false;
     },
     showTab() {
       document.getElementById("backTop").style.display="block";
       this.$refs.fixedTabs.style.display = "block";
     },
     hideTab() {
       this.$refs.fixedTabs.style.display = "none";
       document.getElementById("backTop").style.display="none";
     },
     goChooseDetail(id,name) {
       this.userStatisEvent('权益二','浏览商品');     //  数据统计--浏览商品
       this.userStatisEvent('权益二','浏览商品--'+id+'--'+name);     //  浏览商品id
       setTimeout(function(){
         goGoodsDetail(id);
       },200);
     },
     goGoodscategory() {
       if (this.isInApp) {
         goSchemeUrlOpenAppUi2('category');
       } else {
         window.location.href = hostUrl + "#/tabs/category" ;
       }
     },
     backTop() {
       this.$refs.activity.scrollTo(0,0,300);
       this.$refs.fixedTabs.style.display = "none";
       document.getElementById("backTop").style.display="none";
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
     checkMyCoupon() {
       if(this.isLogin) {
         if(checkApp()) {
           goSchemeUrlOpenAppUi2('coupon');
         } else {
           window.location.href= hostUrl + "#/myAwards";
         }
       } else {
         this.$refs.login.showLoginModel();
       }
     },
     prizeActive(priezInfo) {
       this.popUpProps.prizeActive = priezInfo;
       this.showPopUp(this.popUpProps.prizeActive.popUpName);
     },
     checkLogin() {
       formData.getUserToken();
       let _this = this;
       setTimeout(()=>{
         apiService.getPersonalInfo().then(resp => {
           if(resp.code == 200) {
             verify.setUserInfo(resp.data);
             _this.loginSuccess();
           } else {
             _this.isLogin = false;
           }
         });
       },100);
     },
     loginSuccess () {
       this.isLogin = true;
       this.componentProp.isLogin = true;
       // 获取抽奖次数，刮卡次数，刮卡结果等
       if(!this.isInApp) {
         this.$refs.lotteryModel.getRemainTimes();
         this.$refs.scratchCard.getScratchTimes();
         this.$refs.scratchCard.getScratchResult();
       }
     },
     loginFaild() {
       this.isLogin = false;
       this.componentProp.isLogin = false;
       this.$refs.login.showLoginModel();
     },
     receiveVastCoupon() {   // 一键领取 2388 神券
       if(this.isLogin) {
         if(!this.vastCouponFlag) {
           return;
         }
         let params = {
           "receiveStatus": "CANRECEIVE",
           "activityBtn": this.vastCouponName
         };
         this.vastCouponFlag = false;
         apiService.getDFCoupon(params).then(resp => {
           if(resp.code == 200){
             Toast('恭喜你，领取成功');
             this.userStatisEvent('权益二','成功领取2388优惠券');   // 数据统计
           }else if(resp.code == 400) {
             Toast('你已领过该优惠券');
           } else if (resp.code == 401) {
             this.loginFaild();
           } else {
             Toast(resp.message);
           }
           this.vastCouponFlag = true;
         }).catch(e=>{
           Toast('网络错误，请稍后重试');
           this.vastCouponFlag = true;
         });
       } else {
         this.loginFaild();
       }
     },
     showMyPrize() {        //  活动1
       if(this.isLogin) {
         getMyPrizeList618().then(resp => {
           if(resp.code == 200) {
             let lotteryPrizeList = resp.data || [];
             if(lotteryPrizeList.length) {
               this.popUpProps.lotteryPrizeList = lotteryPrizeList;
               this.showPopUp('hasPrizeList');
             } else {
               this.showPopUp('noPrizeList');
             }
           } else if(resp.code == 401){
             this.loginFaild();
           } else {
             Toast(resp.message);
           }
         });
         this.showPopUp('noPrizeList');
       } else {
         this.loginFaild();
       }
     },
     // 商品分类tab切换
     setSlides() {
       this.fixedTabSwiper =  new Swiper('#fixedTabs',{
         observer: true,
         observeParents:true,
         slidesPerView : 'auto',
         loop: false,
       });
       this.tabSwiper =  new Swiper('#swiperTab',{
         observer: true,
         observeParents:true,
         slidesPerView : 'auto',
         loop: false,
       });
     },
     changeTab(index,item) {       // 移动swiper
       this.userStatisEvent('权益二','一级分类标签--'+item);   // 数据统计
       if(this.activeTab < index){
         if(index > 1){
           this.tabSwiper.slideNext();
           this.fixedTabSwiper.slideNext();
         }
       }else {
         if(index < this.tabsData.length-1){
           this.tabSwiper.slidePrev();
           this.fixedTabSwiper.slidePrev();
         }
       }
       this.activeTab = index;
       this.rendingActivityGoods();
     },
     rendingActivityGoods () {   // 获取类别优惠券及商品
       let len = this.tabsData.length,
           item = this.tabsData[this.activeTab];
       for(let i=0; i<len; i++) {
         if(goodsInfo618.goodsData[i].category == item) {
           this.activityGoods = goodsInfo618.goodsData[i];
           return;
         }
       }
     },
     /*微信分享设置*/
     setShare()
     {
       let shareObj = {
         title: '蜜宝618|狂抽20台iPhone X免费送,超高概率赢免单!', // 分享标题
         desc: '2388元年中神券来助力,满88减50,满288减200!', // 分享描述
         link: window.location.origin + '/activity/#/a20180618?channel=weixinshare', // 分享链接
         imgUrl: window.location.origin + window.location.pathname + require('@/assets/wxshare/share_jd618.png').substr(2), // 分享图标
       };
       wxapi.share(shareObj, function () {
         statisEvent('微信618活动','分享成功');   // 数据统计
       });
     }
   },

   mounted() {
     this.isInApp = checkApp();
     this.userAgent = getUserAgent();
     this.userStatisEvent('访问页面');   // 数据统计
     this.checkLogin();
     this.setSlides();
     this.$nextTick(()=>{
       this.setShare();
    });
   }
}
</script>

<style lang="scss" scoped>
$real-px: 37.5;
@function calRem($px-input){
   @return ($px-input/$real-px)/2;
}
.fade-enter-active {
  transition: all .5s ease;
}
.fade-leave-active {
  transition: all .5s ease;
}
.fade-enter, .fade-leave-active {
  transform: translateY(10px);
  opacity: 0;
}
.view-wp {
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  .view-content {
    position: absolute;
    height: 100%; width: 100%;
  }
}
.button-area {
  display: flex;
  justify-content: center;
  padding: calRem(10px);
  div {
    display: inline-block;
    padding: calRem(4rem) calRem(8rem);
    border-radius: calRem(16rem);
    border: 1px solid #fff;
    color: #fff;
    box-sizing: content-box;
    margin: 0 calRem(6rem);
  }
}
.wrapper {
  padding-top: calRem(875rem);
  background: #37a2f2  url("../../../assets/img/varyActivity/lottery20180618/a_bg.jpg") no-repeat top center;
  background-size: 100%;
}
.wrapper.app {
  padding-top: calRem(960rem);
  background: #37a2f2  url("../../../assets/img/varyActivity/lottery20180618/a_bgApp.jpg") no-repeat top center;
  background-size: 100%;
}
// 活动1 转盘抽奖
.lottery-area {
  margin-bottom: calRem(90rem);
  .tips {
    font-size: calRem(20rem);
    color: #fff;
    margin: calRem(20rem) 0 calRem(18rem);
  }
}
// 活动2 神券领取
// 商品分类tabs样式
.category-tabs {
  height: calRem(72rem);
  background:#F1FA44;
  box-shadow: 0 0 5px #aaac00;
  background-size: cover;
  position: relative;
  .swiper-container {
    width: 100%;
    height: calRem(72rem);
    & .swiper-slide {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      font-size: calRem(24rem);
      color: #1D65CF;
      padding-top: calRem(10rem);
      width: calRem(190rem);
      &.active {
        color: #333;
        font-weight: 500;
        &>span {
          background: #00AAEB;
          color: #fff;
          i {
            background: url("../../../assets/img/varyActivity/lottery20180618/location_icon.png") no-repeat center;
            background-size:100%;
          }
        }
      }
      &>span {
        height: calRem(53rem);
        line-height: calRem(53rem);
        padding: 0 calRem(28rem);
        border-radius:calRem(10rem);
        i {
          display: inline-block;
          margin-top: calRem(14rem);
          width: calRem(19rem);
          height: calRem(23rem);
        }
      }
    }
  }
  .category-select {
    display: none;
    position: absolute;
    right: 0;
    width: calRem(56rem);
    height: calRem(72rem);
    top: 0;
    padding-top: calRem(24rem);
    box-sizing: border-box;
    background: rgba(46,150,238,0.9);
    z-index: 10;
    img {
      width: calRem(26rem);
    }
  }
}
#fixedTabsWrapper {
  box-shadow: none;
  background: transparent;
  &>div {
    background: #fff;
    border-top: 1px solid #3BACF5;
    border-bottom: 1px solid #3BACF5;
    position: fixed;
    z-index: 30;
    display: none;
  }
}
.vastCoupon-area {
  .title {
    width: calRem(419rem);
    height: calRem(175rem);
    margin: 0 auto calRem(25rem);
  }
  .receive-con {
    width: calRem(690rem);
    height: calRem(172rem);
    margin: 0 auto calRem(24rem);
    background: url("../../../assets/img/varyActivity/lottery20180618/vastCoupon_bg.png") no-repeat center;
    -webkit-background-size: contain;
    background-size: 100%;
    padding-left: calRem(80rem);
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    .values {
      width: calRem(306rem);
      height: calRem(74rem);
      margin: calRem(68rem) calRem(30rem) 0 0;
      padding-right: calRem(20rem);
      img {
        width: 100%;
        height: auto;
      }
    }
    .receive {
      margin-top: calRem(72rem);
      width: calRem(180rem);
      height: calRem(76rem);
      animation: heartbeat 1700ms infinite linear;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  .coupon-txt {
    img {
      width: calRem(20rem);
      height: calRem(27rem);
      margin: 0 auto calRem(20rem);
    }
    div {
      font-size:calRem(30rem);
      margin-bottom: calRem(18rem);
      color: #1D65CF;
    }
  }
  .category-coupon {
    width: calRem(690rem);
    margin:calRem(20rem) auto 0;
    min-height: calRem(280rem);
    &>div {    // .blue-coupon  .red-coupon
      margin-bottom: calRem(10rem);
      &>div {   // 优惠券
        padding: calRem(8rem) calRem(32rem) 0;
        box-sizing:border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price-area {
          width: calRem(144rem);
          img {
            width: 100%;
            height: auto;
          }
        }
        .describe-area {
          display: flex;
          flex-direction: column;
          & span:first-child {
            color: #fff;
            font-size: calRem(28rem);
            height: calRem(46rem);
            line-height: calRem(46rem);
            text-align: left;
          }
          & span:nth-child(2) {
            color: #1D65CF;
            font-size: calRem(20rem);
            display: inline-block;
            height: calRem(30rem);
            line-height: calRem(32rem);
            background:#EFEA3A ;
            border-radius: calRem(6rem);
            box-sizing: content-box;
            padding: 0 calRem(3rem);
          }
        }
      }
    }
    .blue-coupon {
      display: flex;
      justify-content: space-between;
      &>div {
        width: calRem(340rem);
        height: calRem(132rem);
        background: url("../../../assets/img/varyActivity/lottery20180618/blue_coupon.png") no-repeat center;
        background-size: contain;
        justify-content: flex-start;
      }
    }
    .red-coupon {
      margin-bottom: calRem(20rem);
      &>div {
        width: calRem(690rem);
        height: calRem(132rem);
        background: url("../../../assets/img/varyActivity/lottery20180618/red_coupon.png") no-repeat center;
        background-size: contain;
        .coupon-con {
          display: flex;
          align-items: center;
          .price-area {
            margin-right: calRem(20rem);
          }
        }
        .jd {
          display: flex;
          flex-direction: column;
          color: #fff;
          display: flex;
          justify-content: center;
          margin-right: calRem(24rem);
          & span:first-child {
            font-size: calRem(28rem);
            margin-bottom: calRem(4rem);
          }
          & span:nth-child(2) {
            font-size: calRem(20rem);
          }
        }
      }
    }
  }
  .category-goods {
    box-sizing:border-box;
    width: calRem(690rem);
    height: calRem(540rem);
    background: #fff;
    border-radius: calRem(8rem);
    margin: 0 auto calRem(26rem);
    box-shadow: 0 0 5px #aaac00;
    .good-item {
      border-bottom: 1px solid #a7cae1;
      display: flex;
      .left {
        padding: calRem(9rem) calRem(18rem);
        width: calRem(224rem);
        height: calRem(160rem);
        overflow: hidden;
        background: #fff;
        margin-right: calRem(30rem);
        img {
          width: 100%;
          height: auto;
        }
      }
      .right {
        padding-top: calRem(20rem);
        .name {
          width: calRem(390rem);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: calRem(24rem);
          color: #1D65CF;
          margin-bottom: calRem(6rem);
          text-align: left;
        }
        .prize1 {
          font-size: calRem(20rem);
          color: #666666;
          text-align: left;
          margin-bottom: calRem(12rem);
        }
        .prize2 {
          width: calRem(278rem);
          height: calRem(84rem);
          background: url("../../../assets/img/varyActivity/lottery20180618/price_compair_bg.png") no-repeat center;
          background-size:contain;
          display: flex;
          &>div {
            width: calRem(140rem);
            height: calRem(82rem);
            align-items: center;
            padding-top: calRem(16rem);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            & span:first-child {
              font-size: calRem(20rem);
              margin-bottom: calRem(3rem);
            }
            & span:last-child {
              font-size: calRem(20rem);
                i {
                  font-size: calRem(30rem);
                  padding: 0 calRem(3rem);
                  font-family: impact;
                }
            }
          }
          .mibao_prize {
            color: #1D65CF;
          }
          .discont_prize {
            color: #EB2972;
          }
        }
      }
    }
    .good-item:last-child {
      border-bottom: 0;
    }
  }
  .button-area {
    justify-content: center;
    div {
      border: 1px solid #1D65CF;
      color: #1D65CF;

    }
  }
  .button-area.rule-btn {

    margin-bottom:calRem(20rem);
    margin-left: calRem(22rem);
  }
}
.scratch-area {
  margin-top: calRem(56rem);

  .title {
    width: calRem(421rem);
    height: calRem(93rem);
    margin: 0 auto calRem(30rem);
    img {
      width: 100%;
      height: auto;
    }
  }
  .button-area {
    justify-content: center;
    background: #fea5d1;
    padding-bottom: calRem(20rem);
    div {
      border: 1px solid #1D65CF;
      color: #1D65CF;
    }
  }
}
.wrapper.app .bottom-area {
  padding-top: calRem(104rem);
  height:calRem(252rem);
}
.bottom-area {
  box-sizing: border-box;
  width: 100%;
  height: calRem(222rem);
  padding-top: calRem(86rem);
  p {
    color: #fff;
    text-align: center;
    margin-bottom: calRem(18rem);
  }
  p:first-child {
    font-size: calRem(20rem);
    span {
      display: inline-block;
      width: calRem(16rem);
      height: calRem(2rem);
      background: #fff;
      vertical-align: middle;
      margin: 0 calRem(9rem);
    }
  }
  p:last-child {
    font-size: calRem(24rem);
  }
}
// 回到顶部
#backTop {
  height: calRem(94rem);
  width: calRem(94rem);
  position: fixed;
  right: calRem(40rem);
  bottom: calRem(150rem);
  z-index: 50;
  display: none;
}
// 动效区
.trans-effect{
  width: 100%;
  height: calRem(560rem);
  position: absolute;
  top: 0;
  left: 0;
  .balloon1 {
    width: calRem(131rem);
    height: calRem(208rem);
    position: absolute;
    top: calRem(40rem);
    left: calRem(33rem);
    animation: moveUpDown 4500ms infinite linear;
  }
  .balloon2 {
    width: calRem(53rem);
    height: calRem(85rem);
    position: absolute;
    top: calRem(175rem);
    right: calRem(20rem);
    animation: moveUpDown2 4500ms infinite linear;
  }
  .cloud {
    width: calRem(152rem);
    height: calRem(82rem);
    position: absolute;
    top: calRem(84rem);
    right: calRem(95rem);
    animation: moveLandscape 4500ms infinite linear;
  }
  img {
    width: 100%;
    height: 100%;
  }
}

@keyframes moveUpDown {
  0% {transform:translateY(calRem(70rem)); }
  45% {transform:translateY(0);}
  100% {transform:translateY(calRem(70rem));}
}
@keyframes moveUpDown2 {
  0% {transform:translateY(calRem(-10rem)); }
  45% {transform:translateY(calRem(10rem));}
  100% {transform:translateY(calRem(-10rem));}
}
@keyframes moveLandscape {
  0% {transform:translateX(calRem(30rem)); }
  45% {transform:translateX(0);}
  100% {transform:translateX(calRem(30rem));}
}
@keyframes heartbeat {
  0% {transform:scale(0.95,0.95); }
  28% {transform:scale(1.04,1.04);}
  38% {transform:scale(0.98,0.98);}
  48% {transform:scale(1.1,1.1);}
  100% {transform:scale(0.95,0.95);}
}
</style>
