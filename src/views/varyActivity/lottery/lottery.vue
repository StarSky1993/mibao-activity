<template>
   <div id="lottery">
         <section class="wrapper">
            <div class="share-img-btn" @click.stop.prevent="showShare()"></div>
            <div class="main">
               <section class="login-area">
                  <div class="login login-area-btn" @click.stop.prevent="showLogin()">
                     <span class="user-icon"></span>
                     <span>{{loginAreaContent}}</span>
                  </div>
                  <div class="coupon login-area-btn" @click.stop.prevent="checkCoupon()">
                     <span class="coupon-icon"></span>
                     <span>查看获得礼券</span>
                  </div>
               </section>
               <section class="lottery-area">
                  <lottery-model v-on:showLogin="showLogin()" ref="lottery" @parentNoLogin = "stateNoLogin()" :pIsLogin="isLogin"></lottery-model>
               </section>
               <section class="invit-area">
                  <p>
                     活动期间，每邀请一名好友成功注册蜜宝，即可额外获得<br>
                     一次礼券抽奖机会，邀请越多奖励越多，上不封顶！
                  </p>
                  <p>（注：每个商品只可使用一张优惠券）</p>
                  <div class="invit-btn" @click.stop.prevent="showShare()"></div>
               </section>
               <section class="favour-area">
                  <div class="favour-items" v-for="(item, index) in favourItems" :key="index">
                     <div class="favour-item-img">
                        <router-link :to="{name:item.routerName,params:item.routerParams,query:item.routerQuery}">
                           <img :src="item.imgSrc">
                        </router-link>
                     </div>
                     <div class="item-decorate" v-if="item.hasDecorate"></div>
                  </div>
               </section>
            </div>
         </section>
         <!--S 登陆弹框 -->
         <login-model ref="login" @success="loginSuccess()" :loginProps="loginProps"></login-model>
         <!--E 登陆弹框 -->

         <transition name='fade' mode='out-in' >
            <section class="model-mask" v-if="shareModel">
               <div class="share-model">
                  <div class="title">吱口令分享</div>
                  <div class="sub-title">复制以下吱口令，去粘贴给要分享的朋友。</div>
                  <div class="share-code">{{shareCodeMsg}}</div>
                  <div class="confirm-btn" @click.stop.prevent="closeShare()">好的</div>
               </div>
               <div class="close-btn" @click.stop.prevent="closeShare()"></div>
            </section>
         </transition>

   </div>
</template>

<script>

import Toast from '@/components/toast.js';
import LotteryModel from '@/components/activities/lotteryModel';
import {host} from '@/api/fetch.js';
import verify from '@/utils/verify.js';
import apiService from '@/api/activity.js';
import {hostUrl} from '@/api/fetch.js';
import formData from '@/utils/formData.js';
import loginModel from '@/components/activities/login';
export default {
   name: 'Lottery',
   components:{
      'lottery-model':LotteryModel,
      'login-model':loginModel
   },
   data: function(){
      return {
         loginAreaContent:"登录/注册",
         isLogin   : false , //是否登录标志位，默认为false，判断登录后更新状态

         shareModel: false,
         shareCodeMsg: "",
         channel: this.$route.params.channel || '', //渠道号

         loginProps:{
            recommendCode :true,
            style:"orange",
            closeBtnPosition:"bottom"
         } ,
         favourItems:[
            {
               imgSrc: require('../../../assets/img/varyActivity/lottery/banner_1.png'),
               routerName: "apple0110",
               routerParams:{},
               routerQuery:{channel: this.$route.params.channel || ''},
               hasDecorate:true
            },
            {
               imgSrc: require('../../../assets/img/varyActivity/lottery/banner_2.png'),
               routerName: "travel0110",
               routerParams:{},
               routerQuery:{},
               hasDecorate:true
            },
            {
               imgSrc: require('../../../assets/img/varyActivity/lottery/banner_3.png'),
               routerName: "kangjia0110",
               routerParams:{},
               routerQuery:{channel: this.$route.params.channel || ''},
               hasDecorate:true
            },
            {
               imgSrc: require('../../../assets/img/varyActivity/lottery/banner_4.png'),
               routerName: "switch0110",
               routerParams:{},
               routerQuery:{},
               hasDecorate:true
            },
            {
               imgSrc: require('../../../assets/img/varyActivity/lottery/banner_5.png'),
               routerName: "newYear0110",
               routerParams:{},
               routerQuery:{},
               hasDecorate:false
            }
         ]
      }
   },

   methods: {
      intLoginState() {
         if(this.isLogin) {
            let phone = formData.getUserPhone();
            this.loginAreaContent = phone.slice(0,3) + "****" + phone.slice(-4);
         } else {
            this.loginAreaContent = "登录/注册";
         }
      },
      stateNoLogin() {
         this.isLogin = false;
         this.loginAreaContent = "登录/注册";
      },
      loginSuccess() {
         this.isLogin = true;
         this.intLoginState();
         this.$refs.lottery.getRemainTimes();
      },
      checkLogin() {
         let token = formData.getUserToken();

        setTimeout(()=>{
           apiService.getPersonalInfo().then(resp => {
             if(resp.code == 200) {
               verify.setUserInfo(resp.data);
               this.loginSuccess();
             } else {
               this.isLogin = false;
             }
           });
         },100);

      },
      showLogin() {
         if(!this.isLogin) {
            this.$refs.login.showLoginModel();
         }
      },

      checkCoupon() {  // 查看优惠券
         if(!this.isLogin) {
            this.$refs.login.showLoginModel();
         } else {
            window.location.href= hostUrl + "#/myAwards";
         }
      },

      getHareKey() {  // 获取吱口令
         apiService.getHareKey().then(resp => {
            if(resp.code==200){
               this.shareCodeMsg = (resp.data || {}).aliShareKey;
            }
         });
      },

      showShare() {
         this.shareModel = true;
      },
      closeShare() {
         this.shareModel = false;
      }
   },

   mounted: function() {
      this.getHareKey();
      this.checkLogin();
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
#lottery
{
   background:#f66554;
   .close-btn {
      width:calRem(68rem);
      height:calRem(68rem);
      margin:0 auto;
      margin-top:calRem(130rem);
      background: url('../../../assets/img/varyActivity/lottery/close.png') top center no-repeat;
      background-size: 100% auto;
   }
}
.wrapper{
   width: 100%;
   background: url('../../../assets/img/varyActivity/lottery/home_bg.png') 0 0 no-repeat;
   background-size: 100% auto;

   .share-img-btn{
      height:calRem(120rem);
      width:calRem(120rem);
      position: absolute;
      right: 0;
      top: 0;
   }
   .main{
      width:calRem(686rem);
      margin:0 auto;
      // 登录模块
      & .login-area {
         height:calRem(64rem);
         padding-top:calRem(832rem);
         padding-left:calRem(44rem);
         padding-right:calRem(44rem);
         display :flex;
         justify-content:space-between;
         align-items:center;
         margin-bottom:calRem(46rem);
      &  .login-area-btn{
            width:calRem(260rem);
            height:calRem(54rem);
            background: linear-gradient(to right, #FFC74F , #FFC26C);
            border-radius: calRem(27rem) ;
            border: 2px solid #CB4135 ;
            display:flex;
            justify-content:center;
            align-items:center;
            span {
               display:block;
               font-family:"PingFangSC-Regular";
               color:#6F3A1A ;
               font-size:calRem(22rem);
            }
            .user-icon{
               width:calRem(20rem);
               height:calRem(23rem);
               background: url('../../../assets/img/varyActivity/lottery/user_icon.png') 0 0 no-repeat;
               background-size: calRem(20rem) calRem(23rem);
               margin-right:calRem(13rem);
            }
            .coupon-icon{
               width:calRem(30rem);
               height:calRem(23rem);
               background: url('../../../assets/img/varyActivity/lottery/coupon_icon.png') center no-repeat;
               background-size: 100% auto;
               margin-right:calRem(13rem);
            }
         }
      }
      // 抽奖模块
      .lottery-area {
         width:calRem(686rem) ;
         height:calRem(610rem);
         background: url('../../../assets/img/varyActivity/lottery/gift_one.png') top no-repeat;
         background-size: 100% auto;
         margin-bottom:calRem(46rem) ;
         overflow:hidden;
      }
      //二重邀请好礼
      .invit-area {
         width:calRem(686rem) ;
         height:calRem(572rem);
         background: url('../../../assets/img/varyActivity/lottery/gift_two.png') center no-repeat;
         background-size: 100% auto;
         overflow:hidden;
         margin-bottom:calRem(46rem) ;
         & p{
            color:#944A21;
            font-size:calRem(20rem);
            line-height:calRem(28rem);
            font-family:"PingFangSC-Regular";
            text-align:center;
         }
         & p:nth-child(1) {
            margin-top:calRem(258rem);
            margin-bottom:calRem(24rem);
            line-height:calRem(34rem);
         }
         & p:nth-child(2) {
            color:#B37451;
            font-size:calRem(18rem);
            margin-bottom:calRem(30rem);
         }
         .invit-btn {
            margin:0 auto;
            width:calRem(460rem);
            height:calRem(100rem);
            background: url('../../../assets/img/varyActivity/lottery/invit_btn.png') center no-repeat;
            background-size: 100% auto;
            color:#6F3A1A ;
            font-size:calRem(28rem);
            line-height:calRem(72rem);
            text-align:center;
            font-family:"PingFangSC-Medium";
         }
      }
      // 三重好礼
      .favour-area{
         width:calRem(686rem);
         padding-top:calRem(266rem);
         padding-bottom:calRem(484rem);
         background: url('../../../assets/img/varyActivity/lottery/gift_three.png') top center no-repeat;
         background-size: 100% auto;
         .favour-items {
            margin-bottom:calRem(2rem);
            .favour-item-img {
               width:calRem(620rem);
               //height:calRem(284rem);
               border-radius:8px;
               overflow:hidden;
               margin:0 auto;
               & a {
                  display:block;
                  & img {
                     display:block;
                     width:100%;
                     height:auto;
                  }
               }
            }
            .item-decorate {
               background: url('../../../assets/img/varyActivity/lottery/item_docorate.png') top center no-repeat;
               background-size: 100% auto;
               margin:0 auto;
               margin-top:calRem(-20rem);
               width:calRem(460rem);
               height:calRem(50rem);
               position:relative;
               top:calRem(10rem);
            }
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

// S 分享框样式
.share-model {
   width:calRem(600rem);
   padding-top:calRem(60rem);
   background:rgba(255,240,218,1);
   border-radius: calRem(20rem);
   margin:0 auto;
   margin-top:calRem(240rem);
   display: flex;
   flex-direction: column;
   justify-content:flex-start;
   align-items: center ;
   & .title {
      height:calRem(86rem);
      text-align:center;
      font-size:calRem(28rem);
      font-family:"PingFangSC-Medium";
      color:rgba(111,58,26,1);
   }
   & .sub-title {
      height:calRem(52rem);
      text-align:center;
      font-size:calRem(24rem);
      font-family:"PingFangSC-Medium";
      color:rgba(149,114,93,1);
   }
   & .share-code {
      width: calRem(468rem);
      padding:calRem(23rem);
      padding-top:calRem(18rem);
      border-radius:calRem(10rem);
      border:1px solid #B99A88 ;
      font-size:calRem(24rem);
      font-family:"PingFangSC-Regular";
      color:rgba(185,154,136,1);
      line-height:calRem(36rem);
      text-align:left;
      margin-bottom:calRem(46rem);
   }
   .confirm-btn {
      width:calRem(510rem);
      height:calRem(68rem);
      line-height:calRem(68rem);
      margin-bottom:calRem(48rem);
      border-radius:calRem(10rem);
      font-size:calRem(24rem);
      font-family:"PingFangSC-Regular";
      color:rgba(111,58,26,1);
      letter-spacing:calRem(6rem);
      background: linear-gradient(to right, #FFC74F, #FFB86C);
   }
}

// E 分享框样式

</style>
