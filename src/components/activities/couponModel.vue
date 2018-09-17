<template>
   <div class="activity-window">
      <!--S 登陆弹框 -->
      <login-model ref="login" @success="loginSuccess()" :loginProps="loginProps">
         <h2 class="title" slot="title">输入领取现金券的手机号</h2>
      </login-model>
      <!--E 登陆弹框 -->
      <transition name='fade' mode='out-in'>
         <!--S 优惠券弹框 -->
         <div id="couponModel" class="activity-modal" v-if="couponModel">
            <div class="coupon-wrapper">
               <div class="title">{{title}}</div>
               <div class="coupon-area">
                  <div class="coupon-img"></div>
                  <div class="conpon-info">{{successTips}}</div>
               </div>
            <div class="receiveBtn activity-confirm" @click.stop.prevent="hideCouponModal()">{{btnCon}}</div>
            </div>
         </div>
         <!--E 优惠券弹框 -->

         <!--S 优惠券已领取弹框提示 -->
         <div id="rcdCouponModel" class="activity-modal" v-if="rcdCouponModel">
            <div class="coupon-wrapper">
               <div class="title">{{title}}</div>
               <div class="coupon-area">
                  <div class="coupon-img"></div>
                  <div class="conpon-info">{{rcdTips}}</div>
               </div>
               <div class="receiveBtn activity-confirm" @click.stop.prevent="hideRcdCouponModal()">{{btnCon}}</div>
            </div>
         </div>
         <!--E 优惠券已领取弹框提示 -->
      </transition>
   </div>
</template>

<script>
import apiService from '@/api/activity.js';
import verify from "@/utils/verify.js";
import Toast from '@/components/toast.js';
import {host} from '@/api/fetch.js';
import formData from '@/utils/formData.js';
import loginModel from '@/components/activities/login';
export default {
  name: 'couponModal',
  components: {
      loginModel
  },
  data: function(){
      return {
         activityBtn: '', //获取优惠券名称
         title   :'领取提示',
         rcdTips :'您已领取过某优惠券',
         btnCon  :'我知道了',

         couponModel:   false,
         rcdCouponModel:false,

         isLogin: false, // 是否登录标志
         couponFlag:true, //获取优惠券按钮标志位
         channel:this.$route.query.channel, //渠道号
         loginProps:{
            recommendCode :false,
            style:"pink",
            closeBtnPosition:"top"
         }
      }
   },
   methods: {
      showCouponModal() {
         this.couponModel = true;
      },
      hideCouponModal() {
         this.couponModel = false;
      },
      showRcdCouponModal() {
         this.rcdCouponModel = true;
      },
      hideRcdCouponModal() {
         this.rcdCouponModel = false;
      },
      //判断是否登录
      checkLogin() {
        let _this = this;
        let token = formData.getUserToken();
        setTimeout(function () {
          apiService.getPersonalInfo().then(resp => {
            if(resp.code == 200) {
              verify.setUserInfo(resp.data);
              _this.isLogin = true;
            }
          });
        },300);
      },
      loginSuccess() {
        this.isLogin = true;
        this.getCoupon(this.activityBtn);
      },
      // 获取优惠券
      getCoupon(activity) {
         if(!this.couponFlag) {
            return;
         }
         this.activityBtn = activity;
         if(this.isLogin) {
            this.checkCouponShow(activity);
         } else {
            this.$refs.login.showLoginModel();
         }
      },
      checkCouponShow(activity) {
         if(!this.isLogin){
            return;
         }
         let params = {
            "receiveStatus": "CANRECEIVE",
            "activityBtn": activity
         };
         this.couponFlag = false;
         apiService.getDFCoupon(params).then(resp => {
            if(resp.code == 200){
            	let bonus = resp.data || [];
            	let num = bonus.length || 0;
	            if (num == 1) {
	              this.successTips = '恭喜您成功领取' + bonus[0].echoBonusModel.name;
	            } else {
	              this.successTips = '恭喜您成功领取' + num + '张优惠券';
	            }
                this.showCouponModal();
            }else if(resp.code == 400) {
                this.rcdTips = resp.message;
                this.showRcdCouponModal();
            } else if (resp.code == 401) {
              this.isLogin = false;
              this.$refs.login.showLoginModel();
            } else {
               Toast(resp.message);
            }
            this.couponFlag = true;
         }).catch(e=>{
            Toast('网络错误，请稍后重试');
            this.couponFlag = true;
         });
      },

      eventInit() //初始化dom点击事件
      {
        if(!window.discover)
        {
          document.addEventListener('click', this.clickFn, false);
          window.discover = true;
        }
      },
      clickFn(e) {
      	let target = e.target;
      	let idName = this.$route.query.id || verify.getUrlQuery('id');
        if(target.id == 'kangjiaCoupon') {
          this.getCoupon('20171222');
        }
        else if(target.id == 'shuangdanCoupon') {
          this.getCoupon('20180101');
        }
        else if(idName && target.id == idName) {
          let activity = target.getAttribute('data-hongbao');
          this.getCoupon(activity);
        }
        e.preventDefault();
      }
   },

   mounted: function() {
      this.checkLogin();
      this.eventInit();
   },
   beforeDestroy()
    {
      if(window.discover)
      {
        document.removeEventListener('click',this.clickFn);
        window.discover = false;
      }
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
.activity-window {
  position: absolute;
  top: 0;
  left: 0;
  // S 登录及优惠券弹窗公共样式
  .activity-modal {
     position:fixed;
     width:100%;
     height:100%;
     z-index:10;
     background: rgba(10,10,10,0.5);
     .close-btn-wrapper {
        width: calRem(600rem);
        margin: 0 auto;
        & .close-btn {
           width: calRem(70rem);
           height:calRem(100rem);
           margin-left:calRem(530rem);
           margin-top: calRem(180rem);
           background: url('../../assets/img/varyActivity/coupon/close.png') 0 0 no-repeat;
           background-size: 100%;
        }
     }
     & .title {
        width: 100%;
        text-align: center;
        font-size: calRem(26rem);
        color: #fff;
        height: calRem(72rem);
        line-height:calRem(72rem);
        background-image:url('../../assets/img/varyActivity/coupon/active-title.png');
        background-repeat:no-repeat;
        background-size:100%;
     }
     .activity-confirm {
        width: calRem(552rem);
        height: calRem(100rem);
        line-height: calRem(106rem);
        align-self:center;
        background: url('../../assets/img/varyActivity/coupon/active-coupon.png') 0 0 no-repeat;
        background-size: 100%;
        margin-bottom: calRem(24rem);
        letter-spacing:calRem(6rem);
        text-align: center;
        font-size: calRem(30rem);
        border-radius: calRem(10rem);
        color: #fff;
     }
     // 优惠券公共样式
     .coupon-wrapper {
        width: calRem(600rem);
        margin: 0 auto;
        margin-top: calRem(340rem);
        background: #fff;
        border-radius: calRem(20rem);
        display: flex;
        flex-direction: column;
        justify-content:flex-start;
        align-items: center ;
       .coupon-area {
           //height:calRem(306rem);
           display: flex;
           flex-direction: column;
           justify-content:flex-start;
           align-items: center ;
           padding-top:calRem(24rem);
           .coupon-img{
              width:calRem(250rem);
              height:calRem(250rem);
              background-repeat:no-repeat;
              background-size:100%;
           }
           .conpon-info{
              //height:calRem(44rem);
              line-height:calRem(44rem);
              font-size:calRem(32rem);
              //color:#F74271;
              width: calRem(476rem);
			        /*white-space: nowrap;*/
			        /*text-overflow: ellipsis;*/
			        /*overflow: hidden;*/
           }
        }
     }
  }
  // E 登录及优惠券弹窗公共样式

  // S 领取优惠券弹框
  #couponModel .coupon-area .coupon-img {
     background-image:url('../../assets/img/varyActivity/coupon/active-packet.png');
  }
  #couponModel .coupon-area .conpon-info { color:#F74271;; }
  // E 领取优惠券弹框

  // S 优惠券已领取提示弹框
  #rcdCouponModel .coupon-wrapper .title {
     background-image:url('../../assets/img/varyActivity/coupon/disabled-title.png');
  }
  #rcdCouponModel .coupon-area .coupon-img {
     background-image:url('../../assets/img/varyActivity/coupon/disabled-packet.png');
  }
  #rcdCouponModel .coupon-area .conpon-info { color:#666; }
  #rcdCouponModel .activity-confirm {
     background-image: url('../../assets/img/varyActivity/coupon/disabled-coupon.png');
  }
  // E 优惠券已领取提示弹框
}
</style>
