<template>
	<div id="a20180730">
    <!-- 黑科技 20180730 -->
    <div  class="view-wp">
      <div class="view-content">
        <scroll  :pullDownRefresh="false" :pullUpLoad="false">
          <div class="wrapper">
            <div class="banner-area">
              <div class="coupons" @click.stop.prevent="getCoupon('jd0730_200')">
                <img src="../../assets/img/discoverInfo/technology20180730/coupon.png">
              </div>
            </div>
            <div class="goods-con">
              <h4><img src="../../assets/img/discoverInfo/technology20180730/title01.png" alt="万有引力，始于苹果"></h4>
              <div class="row">
                <div class="goods" @click.stop.prevent="goGoodsDetail(5271)"><img src="../../assets/img/discoverInfo/technology20180730/goods1_01.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(3739)"><img src="../../assets/img/discoverInfo/technology20180730/goods1_02.png"></div>
              </div>
            </div>
            <div class="goods-con">
              <h4><img src="../../assets/img/discoverInfo/technology20180730/title02.png" alt="与爱豆一起，照亮你的美"></h4>
              <div class="row">
                <div class="goods" @click.stop.prevent="goGoodsDetail(4235)"><img src="../../assets/img/discoverInfo/technology20180730/goods2_01.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(4317)"><img src="../../assets/img/discoverInfo/technology20180730/goods2_02.png"></div>
              </div>
              <div class="row">
                <div class="goods" @click.stop.prevent="goGoodsDetail(3725)"><img src="../../assets/img/discoverInfo/technology20180730/goods2_03.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(4166)"><img src="../../assets/img/discoverInfo/technology20180730/goods2_04.png"></div>
              </div>
            </div>
            <div class="goods-con">
              <h4><img src="../../assets/img/discoverInfo/technology20180730/title03.png" alt="我爱的，不一样"></h4>
              <div class="row">
                <div class="goods" @click.stop.prevent="goGoodsDetail(4193)"><img src="../../assets/img/discoverInfo/technology20180730/goods3_01.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(978)"><img src="../../assets/img/discoverInfo/technology20180730/goods3_02.png"></div>
              </div>
              <div class="row">
                <div class="goods" @click.stop.prevent="goGoodsDetail(1026)"><img src="../../assets/img/discoverInfo/technology20180730/goods3_03.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(641)"><img src="../../assets/img/discoverInfo/technology20180730/goods3_04.png"></div>
              </div>
            </div>
            <div class="goods-con">
              <h4><img src="../../assets/img/discoverInfo/technology20180730/title04.png" alt="Are you ok? 我“肾”好"></h4>
              <div class="row">
                <div class="goods" @click.stop.prevent="goGoodsDetail(2764)"><img src="../../assets/img/discoverInfo/technology20180730/goods4_01.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(4195)"><img src="../../assets/img/discoverInfo/technology20180730/goods4_02.png"></div>
              </div>
            </div>
            <div class="goods-con">
              <h4><img src="../../assets/img/discoverInfo/technology20180730/title05.png" alt="做自己最荣耀"></h4>
              <div class="row">
                <div class="goods" @click.stop.prevent="goGoodsDetail(1068)"><img src="../../assets/img/discoverInfo/technology20180730/goods5_01.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(5273)"><img src="../../assets/img/discoverInfo/technology20180730/goods5_02.png"></div>
              </div>
              <div class="row2">
                <div class="goods" @click.stop.prevent="goGoodsDetail(2744)"><img src="../../assets/img/discoverInfo/technology20180730/goods5_03.png"></div>
              </div>
            </div>
            <div class="goods-con">
              <h4><img src="../../assets/img/discoverInfo/technology20180730/title06.png" alt="原来我可以这么美"></h4>
              <div class="row">
                <div class="goods" @click.stop.prevent="goGoodsDetail(1743)"><img src="../../assets/img/discoverInfo/technology20180730/goods6_01.png"></div>
                <div class="goods" @click.stop.prevent="goGoodsDetail(4080)"><img src="../../assets/img/discoverInfo/technology20180730/goods6_02.png"></div>
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
    name: 'a20180730',
    components:{
      'set-share':setShare,
      'coupon-model':CouponModel
    },
    data() {
        return {
          isLogin: false,
          userAgent:'',
          shareProps: {
            title:"向往的生活，先从自己种草开始！",
            content:"通过实在的优惠，获得实在的科技感。品牌手机特惠月，满300立减200！",
            image:window.location.origin + window.location.pathname + require('@/assets/wxshare/technology20180730.png').substr(2),
            url:window.location.origin + '/activity/#/a20180730'+(this.$route.query.channel?'?channel='+this.$route.query.channel:''),
            isReqShare:false,
            userRecommendCode:''
          },
        }
    },
    methods: {
      getCoupon(coupon) {
        this.$refs.coupon.getCoupon(coupon);
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
          statisEvent('微信20180730黑科技活动',action,label);
        } else if(this.userAgent == 'jd') {
          statisEvent('京东20180730黑科技活动',action,label);
        } else if(this.userAgent == 'mibao') {
          statisEvent('APP20180730黑科技活动',action,label);
        } else if(this.userAgent == 'alipay') {
          statisEvent('支付宝20180730黑科技活动',action,label);
        } else {
          statisEvent('其他渠道20180730黑科技活动',action,label);
        }
      },
    },
    mounted() {
      this.userAgent = getUserAgent();
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
    #a20180730 {
      .wrapper {
        margin:0 auto;
        background: #0e102e;
        .banner-area {
          box-sizing: border-box;
          padding-top: calRem(532rem);
          width: calRem(750rem);
          height: calRem(760rem);
          background: url("../../assets/img/discoverInfo/technology20180730/banner.png") no-repeat top center;
          background-size: contain;
          margin-bottom: calRem(30rem);
          .coupons {
            width: calRem(658rem);
            height: calRem(198rem);
            margin: 0 auto;
          }
        }
        .goods-con {
          overflow: hidden;
          & h4 {
            width: auto;
            height: calRem(53rem);
            padding: 0;
            margin: calRem(50rem) auto ;
          }
          & .row {
            width: calRem(690rem);
            display: flex;
            justify-content: space-between;
            margin: 0 auto calRem(30rem);
            .goods {
              width: calRem(330rem);
              height: calRem(480rem);
            }
          }
          & .row2 {
            width: calRem(690rem);
            margin: 0 auto calRem(30rem);
            .goods {
              width: calRem(690rem);
              height: calRem(282rem);
            }
          }
        }
        .goods-con:nth-child(2) h4 {width: calRem(434rem);}
        .goods-con:nth-child(3) h4 {width: calRem(517rem);}
        .goods-con:nth-child(4) h4 {width: calRem(374rem);}
        .goods-con:nth-child(5) h4 {width: calRem(496rem);}
        .goods-con:nth-child(6) h4 {width: calRem(339rem);}
        .goods-con:nth-child(7) h4 {width: calRem(409rem);}
        .goods-con:last-child {
          padding-bottom: calRem(312rem);
          background: url("../../assets/img/discoverInfo/technology20180730/bottom.png") no-repeat bottom center #0e102e;
          background-size: contain;
        }
      }
    }
</style>
