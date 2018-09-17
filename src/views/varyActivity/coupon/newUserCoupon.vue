<template>
	<div id="newuser-coupon">
    <div  class="view-wp">
      <div class="view-content">
        <scroll  ref="newUserCoupon" :pullDownRefresh="false" :pullUpLoad="false">
          <div class="wrapper">
            <div class="coupon-area">
              <div class="get-coupon" v-if="!isLogin" @click.stop.prevent="clickGetCoupon(activity)">一键领取</div>
              <div class="get-coupon received" v-if="isLogin&&!needDownload" @click.stop.prevent="goUse">去使用</div>
              <div class="get-coupon download" v-if="isLogin&&needDownload">
                <div @click.stop.prevent="downloadApp">下载APP</div>
                <div @click.stop.prevent="goUse">去使用</div>
              </div>
            </div>
            <div class="choose-area">
              <div class="go-choose" @click.stop.prevent="goGoodsDetail(4100)"><img src="../../../assets/img/varyActivity/coupon/newUserCoupon/choose01.png"></div>
              <div class="go-choose" @click.stop.prevent="goGoodsDetail(1070)"><img src="../../../assets/img/varyActivity/coupon/newUserCoupon/choose02.jpg"></div>
              <div class="go-choose" @click.stop.prevent="goGoodsDetail(275)"><img src="../../../assets/img/varyActivity/coupon/newUserCoupon/choose03.jpg"></div>
            </div>
          </div>
        </scroll>
        <!-- S优惠券弹窗 -->
        <transition name='fade' mode='out-in'>
          <div class="coupon-model" v-if="isShowCoupon">
            <div class="success-area">
              <div class="close" @click.stop.prevent="hideCouponModel()"></div>
              <div class="success-title">领取成功</div>
              <div class="success-coupons">
                <div class="success-coupon-item" v-for="(item, index) in couponItem" :key="index">
                    <img :src="item.imgSrc">
                </div>
              </div>
            </div>
          </div>
        </transition>
        <!-- E优惠券弹窗 -->
        <login-model ref="login" @success="loginSuccess()" :loginProps="loginProps">
          <h2 class="login-title" slot="title">输入领取现金券的手机号</h2>
        </login-model>
      </div>
    </div>
    <set-share ref="share" :shareProps="shareProps" @wxShareSuccess="shareSuccess"></set-share>
	</div>
</template>

<script>
import Toast from '@/components/toast.js';
import apiService from '@/api/activity.js';
import {checkApp,goApplicationLogin,goGoodsDetail,goSchemeUrlOpenAppUi2} from '@/utils/mobile.js';
import loginModel from '@/components/activities/login';
import formData from '@/utils/formData.js';
import verify from "@/utils/verify.js";
import {getUserAgent} from '@/utils/common.js';
import {statisEvent} from '@/utils/statisEvent.js';
import setShare from '@/components/setShare';
export default {
    name: 'receiveCoupon',
    components: {
      loginModel,
      setShare
    },
    data() {
        return {
            userAgent: '',
            channel:this.$route.query.channel||this.$route.params.channel||'',
            needDownload:false,
            activity:'new_user_coupon',
            couponFlag:true,   //防止重复点击,
            isShowCoupon: false,
            isLogin: false,     // 是否登录
            isReceived:false,    //判断是否领取
            couponItem:[{
                    imgSrc:require("../../../assets/img/varyActivity/coupon/newUserCoupon/188.png")
                },{
                    imgSrc:require("../../../assets/img/varyActivity/coupon/newUserCoupon/100.png")
                },{
                    imgSrc:require("../../../assets/img/varyActivity/coupon/newUserCoupon/50.png")
                },{
                    imgSrc:require("../../../assets/img/varyActivity/coupon/newUserCoupon/30.png")
                },{
                    imgSrc:require("../../../assets/img/varyActivity/coupon/newUserCoupon/20.png")
                }],
            loginProps:{
              recommendCode :false,
              style:"pink",
              closeBtnPosition:"top",
              showLoginModel: false,
            },
            shareProps: {
              title:"快来领388元红包，上千款最流行的宝贝，按天租着用！",
              content:"刚发现个薅羊毛的好地方，精选好物0元起！",
              image:window.location.origin + window.location.pathname + require('@/assets/wxshare/newUserCoupon.png').substr(2),
              url:window.location.origin + '/activity/#/newUserCoupon'+(this.$route.query.channel?'?channel='+this.$route.query.channel:''),
              isReqShare:false,
              userRecommendCode:''
            },
        }
    },
    methods: {
        showCouponModel() {
            this.isShowCoupon = true;
        },
        hideCouponModel() {
          this.isShowCoupon = false;
        },
        downloadApp () {
          if(this.userAgent == 'mibao') {
            this.isShowCoupon = false;
          } else {
            window.location.href = "https://m.mibaostore.com/download.html";
          }
        },
        goGoodsDetail(goodsId) {   // 跳转app商品详情页
            goGoodsDetail(goodsId);
        },
        shareSuccess() {
           console.log('页面分享成功');
        },
        checkLogin() {        //  判断是否登录
           let _this = this;
           let token = formData.getUserToken();
           setTimeout(function () {
             apiService.getPersonalInfo().then(resp => {
               if(resp.code == 200) {
                 verify.setUserInfo(resp.data);
                 _this.isLogin = true;
                 _this.loginSuccess();
               }
             });
           },200);
        },
        loginSuccess() {
          this.isLogin = true;
          this.checkCoupon(this.activity);
          this.shareProps.userRecommendCode = JSON.parse(localStorage.getItem('userJson')).code || '';
          this.$refs.share.loginShare();
        },
        // 用户登录成功 -- 去使用
        goUse() {
          if(this.userAgent == 'mibao') {
            goSchemeUrlOpenAppUi2();
          } else {
            window.location.href = window.location.origin;
          }
        },
        // 用户未登录 -- 领取优惠券
        clickGetCoupon(activity) {
            if(!this.isLogin) {  // 未登录-->登录
              this.$refs.login.showLoginModel();
            } else if (this.isReceived) { // 已领取优惠券-->return
                Toast("您已领取过该优惠券");
                return;
            } else {
                this.checkCoupon(activity);
            }
        },
        checkCoupon(activity) {
            if(!this.couponFlag) {
                return;
            }
            let params = {
                "receiveStatus": "CANRECEIVE",
                "activityBtn": activity
            };
            this.couponFlag = false;
            apiService.getDFCoupon(params).then(resp => {
                if(resp.code == 200){
                    this.isShowCoupon = true;
                    this.isReceived = true;
                }else if(resp.code == 400) {
                    this.isReceived = true;
                    //Toast("该优惠券仅限新人领取");
                    Toast("您已领取过该优惠券");
                } else if (resp.code == 401) {
                    this.isLogin = false;
                } else {
                   Toast(resp.message);
                }
                this.couponFlag = true;
            }).catch(e=>{
                Toast('网络错误，请稍后重试');
                this.couponFlag = true;
            });
        },
        intPage() {
            this.userAgent = getUserAgent();
            //needDownload 展示下载按钮
            if(this.userAgent=='alipay'||this.userAgent=='jd'||this.userAgent=='mibao') {
              this.needDownload = false;
            } else {
              this.needDownload = true;
            }
            // app环境，原生登录/弹窗登录
            if(this.$route.query.showLoginModel) {
              this.loginProps.showLoginModel = true;
            }
        },
    },
    mounted() {
        this.checkLogin();
        this.intPage();
        this.$sa('388新人礼包',{channel:this.channel||''});
        statisEvent('388新人礼包'+this.channel||'','访问页面');
    }
}
</script>
<style lang="scss" scoped>
  $real-px: 37.5;
  @function calRem($px-input){
    @return ($px-input/$real-px)/2;
  }
  .view-wp
  {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    .view-content
    {
      position: absolute;
      height: 100%;
      width: calRem(750rem);
      left: 0;
      right: 0;
      top: 0;
      margin: 0 auto;
    }
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
	div,img,a{padding:0;margin:0;display:block;border:0;}
  .login-title {
    width: 100%;
    text-align: center;
    font-size: calRem(26rem);
    color: #fff;
    height: calRem(72rem);
    line-height:calRem(72rem);
    background:url('../../../assets/img/varyActivity/coupon/active-title.png') no-repeat center;
    background-size:100%;
  }
    #newuser-coupon {
        background: #57d8a0;
        .wrapper {
            background: url("../../../assets/img/varyActivity/coupon/newUserCoupon/bg.jpg") 0 0 no-repeat;
            background-size:100%;
            overflow:hidden;
            display: flex;
            flex-flow: column;
            align-items: center;
            padding-bottom:calRem(204rem);
            .coupon-area{
                width:calRem(710rem);
                height:calRem(466rem);
                margin-top:calRem(592rem);
                margin-bottom:calRem(60rem);
                display: flex;
                justify-content:center;
                position:relative;
                .get-coupon{
                    text-indent: -9999px;
                    width:calRem(632rem);
                    height:calRem(100rem);
                    background:url("../../../assets/img/varyActivity/coupon/newUserCoupon/receive_coupon.png") 0 0 no-repeat;;
                    background-size:100%;
                    position:absolute;
                    top:calRem(376rem); left:0;right:0;
                    margin: 0 auto;
                }
                .get-coupon.received {
                    background:url("../../../assets/img/varyActivity/coupon/newUserCoupon/active_receive_coupon.png") 0 0 no-repeat;;
                    background-size:100%;
                }
                .get-coupon.download {
                  background:url("../../../assets/img/varyActivity/coupon/newUserCoupon/download.png") 0 0 no-repeat;;
                  background-size:100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  & div {
                    height: 100%;
                    width: 50%;
                    flex-grow: 1;
                    text-indent: -9999px;
                  }
                }
            }
            .choose-area {
                width:calRem(710rem);
                height:calRem(560rem);
                padding-top:calRem(100rem);
                display: flex;
                flex-flow: column;
                align-items: center;
                .go-choose{
                    width:calRem(660rem);
                    margin-top:calRem(18rem);
                }
            }
        }
        // S 优惠券弹窗样式
        .coupon-model{
            position:fixed;
            top:0;
            left:0;
            right:0;
            bottom:0;
            width:100%;
            height:100%;
            z-index:10;
            background: rgba(10,10,10,0.9);
            .success-area {
                position:absolute;
                top:calRem(150rem); left: 0; right: 0;
                margin:0 auto;
                //height:calRem(508rem);
                width:calRem(570rem);
                padding:calRem(170rem) 0 calRem(60rem);
                background:url("../../../assets/img/varyActivity/coupon/newUserCoupon/success.png") 0 0 no-repeat;;
                background-size:100%;
                display: flex;
                flex-flow: column;
                align-items: center;
                .close {
                    width:calRem(52rem);
                    height:calRem(52rem);
                    background:url("../../../assets/img/varyActivity/coupon/newUserCoupon/close.png") 0 0 no-repeat;;
                    background-size:cover;
                    position: absolute;
                    right:calRem(-30rem);
                    top:calRem(24rem);
                }
                .success-title {
                    width:calRem(300rem);
                    height:calRem(70rem);
                    line-height:calRem(70rem);
                    text-align:center;
                    font-size:calRem(38rem);
                    color:#fff;
                    font-family:"SourceHanSansCN-Regular";
                    letter-spacing: 1px;
                    margin-bottom:calRem(44rem);
                }
                .success-coupons {
                    width:calRem(462rem);
                    height:calRem(456rem);
                    overflow:scroll;
                    .success-coupon-item {
                        margin-bottom:calRem(10rem);
                    }
                }
                .success-btns {
                    width:calRem(540rem);
                    height:calRem(114rem);
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    justify-content: space-around;
                    & div {
                        width:calRem(462rem);
                        height:calRem(70rem);
                        line-height:calRem(68rem);
                        color:#fff;
                        font-size:calRem(28rem);
                        font-family:"SourceHanSansCN-Bold";
                        letter-spacing: 1px;
                        background:url("../../../assets/img/varyActivity/coupon/newUserCoupon/back02.png") 0 0 no-repeat;
                        background-size:100%;
                    }
                    // & div:first-child {
                    // width:calRem(230rem);
                    // height:calRem(64rem);
                    //     background:url("../../../assets/img/varyActivity/coupon/newUserCoupon/back.png") 0 0 no-repeat;
                    //     background-size:100%;
                    // }
                    // & div:last-child {
                    //     background:url("../../../assets/img/varyActivity/coupon/newUserCoupon/check.png") 0 0 no-repeat;
                    //     background-size:100%;
                    // }
                }
            }
        }
        // E 优惠券弹窗样式
    }
</style>
