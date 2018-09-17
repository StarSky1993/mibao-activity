<template>
  <div id="a20180701">
    <div  class="view-wp">
      <div class="view-content">
        <scroll  :pullDownRefresh="false" :pullUpLoad="false">
          <div class="wrapper">
            <div class="banner-area">
              <img src="../../assets/img/discoverInfo/a20180716/banner.png">
            </div>
            <div class="content">
              <div @click.stop.prevent="goGoodsDetail(1475)"><img src="../../assets/img/discoverInfo/a20180716/content1_1.png"></div>
              <div @click.stop.prevent="goGoodsDetail(3766)"><img src="../../assets/img/discoverInfo/a20180716/content1_2.png"></div>
              <div @click.stop.prevent="goGoodsDetail(3759)"><img src="../../assets/img/discoverInfo/a20180716/content1_3.png"></div>
              <div @click.stop.prevent="goGoodsDetail(3763)"><img src="../../assets/img/discoverInfo/a20180716/content1_4.png"></div>
            </div>
            <div class="content">
              <div @click.stop.prevent="goGoodsDetail(3746)"><img src="../../assets/img/discoverInfo/a20180716/content2_1.png"></div>
              <div @click.stop.prevent="goGoodsDetail(3771)"><img src="../../assets/img/discoverInfo/a20180716/content2_2.png"></div>
              <div @click.stop.prevent="goGoodsDetail(3768)"><img src="../../assets/img/discoverInfo/a20180716/content2_3.png"></div>
              <div @click.stop.prevent="goGoodsDetail(1530)"><img src="../../assets/img/discoverInfo/a20180716/content2_4.png"></div>
            </div>
            <div class="content">
              <div @click.stop.prevent="goGoodsDetail(3724)"><img src="../../assets/img/discoverInfo/a20180716/content3_1.png"></div>
              <div @click.stop.prevent="goGoodsDetail(2752)"><img src="../../assets/img/discoverInfo/a20180716/content3_2.png"></div>
            </div>
            <div class="bottom-area"><img src="../../assets/img/discoverInfo/a20180716/bottom.png"></div>
          </div>
        </scroll>
      </div>
    </div>
    <set-share ref="share" :shareProps="shareProps" @wxShareSuccess="shareSuccess"></set-share>
  </div>
</template>

<script>
  import {hostUrl} from '@/api/fetch.js';
  import {checkApp, goGoodsDetail} from '@/utils/mobile.js';
  import {getUserAgent} from '@/utils/common.js';
  import {statisEvent} from '@/utils/statisEvent.js';
  import setShare from '@/components/setShare';
  import formData from '@/utils/formData.js';
  import apiService from '@/api/activity.js';
  import verify from '@/utils/verify.js';
  export default {
    name: 'a20180716',
    components:{
      'set-share':setShare
    },
    data() {
      return {
        isLogin: false,
        userAgent:'',
        shareProps: {
          title:"好物1元带回家，快来和我一起薅羊毛吧！",
          content:"蓝牙音响，无人机，beats耳机，体脂秤，运动手环……",
          image:window.location.origin + window.location.pathname + require('@/assets/wxshare/20180716.png').substr(2),
          url:window.location.origin + '/activity/#/a20180716'+(this.$route.query.channel?'?channel='+this.$route.query.channel:''),
          activityFlag:"",
          isReqShare:false,
          userRecommendCode:''
        },
      }
    },
    methods: {
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
      getCoupon(coupon) {
        this.$refs.coupon.getCoupon(coupon);
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
          statisEvent('微信1元买断活动',action,label);
        } else if(this.userAgent == 'jd') {
          statisEvent('京东1元买断活动',action,label);
        } else if(this.userAgent == 'mibao') {
          statisEvent('APP1元买断活动',action,label);
        } else if(this.userAgent == 'alipay') {
          statisEvent('支付宝1元买断活动',action,label);
        } else {
          statisEvent('其他渠道1元买断活动',action,label);
        }
      },
    },
    mounted() {
      this.userAgent = getUserAgent();
      this.checkLogin();
      this.userStatisEvent('访问页面');
    }
  }
</script>
<style lang="scss" scoped>
  $real-px: 37.5;
  @function calRem($px-input){
    @return ($px-input/$real-px);
  }
  div,img,a{padding:0;margin:0;display:block;border:0;}
  .view-wp{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .view-content {
      position: absolute;
      height: 100%;
      width: 100%;
    }
  }
  #a20180716 {
    background:#d73030;
    .banner-area {
      width:100%;
    }
    .coupon-area {
      & .flexStyle {
        display:flex;
        div {
          width:50%;
        }
      }
    }
    .content {
      width:100%;
      position: relative;
      .flex {
        display: flex;
      }
      .more {
        position: absolute;
        width:calRem(78rem);
        height: calRem(30rem);
        right: 0;
        top:calRem(18rem);
        text-indent: -9999px;
      }
    }
    .bottom-area {
      width:100%;
    }
  }
</style>
