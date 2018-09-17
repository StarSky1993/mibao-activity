<template>
	<div id="a20180731">
    <!-- 遇见心动的痕迹 相机镜头速配攻略 20180731 -->
    <div  class="view-wp">
      <div class="view-content">
        <scroll  :pullDownRefresh="false" :pullUpLoad="false">
          <div class="wrapper">
            <div class="banner-area">
              <h2><img src="../../assets/img/discoverInfo/camera20180731/title.png" alt="看见心动的痕迹"></h2>
            </div>
            <div class="coupons-area">
              <h4><img src="../../assets/img/discoverInfo/camera20180731/coupons-tit.png"></h4>
              <div class="coupons-wraper">
                <div class="swiper-container" id="couponSlides">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide coupon" @click.stop.prevent="getCoupon('xindongdehenji20')"><img src="../../assets/img/discoverInfo/camera20180731/coupon20.png"></div>
                    <div class="swiper-slide coupon" @click.stop.prevent="getCoupon('xindongdehenji30')"><img src="../../assets/img/discoverInfo/camera20180731/coupon30.png"></div>
                    <div class="swiper-slide coupon" @click.stop.prevent="getCoupon('xindongdehenji50')"><img src="../../assets/img/discoverInfo/camera20180731/coupon50.png"></div>
                    <div class="swiper-slide coupon" @click.stop.prevent="getCoupon('xindongdehenji100')"><img src="../../assets/img/discoverInfo/camera20180731/coupon100.png"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="goods-con">
              <h4><img src="../../assets/img/discoverInfo/camera20180731/title01.png" alt="全能套机"></h4>
              <div class="flex">
                <div class="goods" @click.stop.prevent="goGoodsDetail(275)"><img src="../../assets/img/discoverInfo/camera20180731/goods1_01.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(280)"><img src="../../assets/img/discoverInfo/camera20180731/goods1_02.png"></div>
              </div>
              <div class="flex">
                <div class="goods" @click.stop.prevent="goGoodsDetail(929)"><img src="../../assets/img/discoverInfo/camera20180731/goods1_03.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(533)"><img src="../../assets/img/discoverInfo/camera20180731/goods1_04.png"></div>
              </div>
              <div class="flex">
                <div class="goods" @click.stop.prevent="goGoodsDetail(771)"><img src="../../assets/img/discoverInfo/camera20180731/goods1_05.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(2789)"><img src="../../assets/img/discoverInfo/camera20180731/goods1_06.png"></div>
              </div>
            </div>
            <div class="goods-con">
              <h4><img src="../../assets/img/discoverInfo/camera20180731/title02.png" alt="唯美人像"></h4>
              <div class="row">
                <div class="goods" @click.stop.prevent="goGoodsDetail(1062)"><img src="../../assets/img/discoverInfo/camera20180731/goods2_01.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(1059)"><img src="../../assets/img/discoverInfo/camera20180731/goods2_02.png"></div>
              </div>
            </div>
            <div class="goods-con">
              <h4><img src="../../assets/img/discoverInfo/camera20180731/title03.png" alt="壮丽旅拍"></h4>
              <div class="row">
                <div class="goods" @click.stop.prevent="goGoodsDetail(1136)"><img src="../../assets/img/discoverInfo/camera20180731/goods3_01.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(1029)"><img src="../../assets/img/discoverInfo/camera20180731/goods3_02.png"></div>
              </div>
            </div>
            <div class="goods-con">
              <h4><img src="../../assets/img/discoverInfo/camera20180731/title04.png" alt="乖巧萌宠"></h4>
              <div class="row">
                <div class="goods" @click.stop.prevent="goGoodsDetail(1089)"><img src="../../assets/img/discoverInfo/camera20180731/goods4_01.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(1072)"><img src="../../assets/img/discoverInfo/camera20180731/goods4_02.png"></div>
              </div>
            </div>
            <div class="goods-con">
              <h4><img src="../../assets/img/discoverInfo/camera20180731/title05.png" alt="自拍神器"></h4>
              <div class="row">
                <div class="goods" @click.stop.prevent="goGoodsDetail(814)"><img src="../../assets/img/discoverInfo/camera20180731/goods5_01.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(824)"><img src="../../assets/img/discoverInfo/camera20180731/goods5_02.png"></div>
              </div>
            </div>
          </div>
        </scroll>
        <coupon-model ref="coupon"></coupon-model>
      </div>
    </div>
    <set-share ref="share" :shareProps="shareProps" @wxShareSuccess="shareSuccess"></set-share>
	</div>
</template>

<script>
import CouponModel from '@/components/activities/couponModel';
import {hostUrl} from '@/api/fetch';
import {goGoodsDetail} from '@/utils/mobile';
import setShare from '@/components/setShare';
import {getUserAgent} from '@/utils/common.js';
import {statisEvent} from '@/utils/statisEvent.js';
import formData from '@/utils/formData.js';
import apiService from '@/api/activity.js';
import verify from '@/utils/verify.js';
export default {
    name: 'a20180731',
    components:{
      'set-share':setShare,
      'coupon-model':CouponModel
    },
    data() {
        return {
          isLogin: false,
          userAgent:'',
          couponSlides:{},
          shareProps: {
            title:"陪你看世界，晒照赢好礼，品牌相机最高直降100元！",
            content:"单反、镜头限时特惠，最高立减100！蜜宝摄影赛，晒出心动时刻！",
            image:window.location.origin + window.location.pathname + require('@/assets/wxshare/camera20180731.jpg').substr(2),
            url:window.location.origin + '/activity/#/a20180731'+(this.$route.query.channel?'?channel='+this.$route.query.channel:''),
            isReqShare:false,
            userRecommendCode:''
          },
        }
    },
    methods: {
      getCoupon(coupon) {
        this.$refs.coupon.getCoupon(coupon);
      },
      setSlides() {
        this.couponSlides =  new Swiper('#couponSlides',{
          observeParents:true,
          observer: true,
          slidesPerView : 'auto',
          loop: false,
        });
      },
      //   判断是否登录
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
      loginSuccess() {
        this.isLogin = true;
        this.shareProps.userRecommendCode = JSON.parse(localStorage.getItem('userJson')).code || '';
        this.$refs.share.loginShare();
      },
      goGoodsDetail(goodsId) {
        let _this = this;
        _this.userStatisEvent('查看商品',goodsId);
        setTimeout(function() {
          goGoodsDetail(goodsId);
        },200);
      },
      shareSuccess() {
        this.userStatisEvent('微信分享成功');
      },
      userStatisEvent(action,label) {
        if(this.userAgent == 'wx') {
          statisEvent('微信20180731看见心动的痕迹',action,label);
        } else if(this.userAgent == 'jd') {
          statisEvent('京东20180731看见心动的痕迹',action,label);
        } else if(this.userAgent == 'mibao') {
          statisEvent('APP20180731看见心动的痕迹',action,label);
        } else if(this.userAgent == 'alipay') {
          statisEvent('支付宝20180731看见心动的痕迹',action,label);
        } else {
          statisEvent('其他渠道20180731看见心动的痕迹',action,label);
        }
      },
    },
    mounted() {
      this.userAgent = getUserAgent();
      this.setSlides();
      this.checkLogin();
      this.userStatisEvent('访问页面');
    },
}
</script>
<style lang="scss" scoped>
    $real-px: 37.5;
    @function calRem($px-input){
       @return ($px-input/$real-px)/2;
    }
	  div,img,a{padding:0;margin:0;display:block;border:0;}
    .view-wp{
      position: fixed;left: 0; right: 0;top: 0; bottom: 0;
      .view-content {
        position: absolute; height: 100%;
        width: calRem(750rem);
        left: 0;right: 0;top: 0;margin: 0 auto;
      }
    }
    #a20180731 {
      .wrapper {
        margin:0 auto;
        background: #0e102e;
        background: url("../../assets/img/discoverInfo/camera20180731/bg.jpg") no-repeat top center;
        background-size: 100% auto;
        padding-bottom: calRem(256rem);
        .banner-area {
          width: 100%;
          overflow: hidden;
          height: calRem(1040rem);
          position: relative;
          & h2 {
            position: absolute;
            width: calRem(670rem);
            height: calRem(288rem);
            top: calRem(66rem);
            left: calRem(30rem);
            animation: zoom 2500ms cubic-bezier(0.4, 0, 1, 1);
          }
        }
        .coupons-area {
          & h4 {
            padding: 0;
            margin: calRem(40rem) auto calRem(34rem);
            width: calRem(326rem);
            height: calRem(55rem);
          }
          & .coupons-wraper {
            width: 100%;
            height: calRem(240rem);
            display: flex;
            margin-bottom: calRem(46rem);
            .swiper-container {
              width: 100%;
              box-sizing: border-box;
              padding: 0 calRem(10rem);
              & .swiper-wrapper {
                display: flex;
              }
            }
            & .coupon {
              flex-shrink: 0;
              width: calRem(210rem);
              height: calRem(240rem);
              margin:0 calRem(10rem);
            }
          }
        }
        .goods-con {
          overflow: hidden;
          width: 100%;
          & h4 {
            width: auto;
            height: calRem(182rem);
            padding: 0;
            margin: calRem(18rem) auto calRem(30rem);
          }
          & .row {
            width: calRem(710rem);
            margin: 0 auto;
            .goods {
              width: calRem(710rem);
              height: calRem(214rem);
              margin-bottom:calRem(30rem);
            }
          }
          & .flex {
            display: flex;
            justify-content: space-between;
            width: calRem(710rem);
            margin: 0 auto calRem(30rem);
            .goods {
              width: calRem(340rem);
              height: calRem(378rem);
            }
          }
        }
      }
      @keyframes zoom {
        0% {opacity: 0.7;transform: scale(0.9);}
        65% {opacity: 0.7;transform: scale(0.9);}
        100% {opacity: 1;transform: scale(1);}
      }
    }
</style>
