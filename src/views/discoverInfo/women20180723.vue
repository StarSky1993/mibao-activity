<template>
	<div id="women20180723">
    <!--天生丽质，女性专题-->
    <div  class="view-wp">
      <div class="view-content">
        <scroll  :pullDownRefresh="false" :pullUpLoad="false">
          <div class="wrapper">
            <div class="banner-area">
              <img src="../../assets/img/discoverInfo/women20180723/banner.png">
            </div>
            <div class="content content1">
              <div class="flex">
                <div @click.stop.prevent="goGoodsDetail(919)"><img src="../../assets/img/discoverInfo/women20180723/content1_1.png"></div>
                <div @click.stop.prevent="goGoodsDetail(2850)"><img src="../../assets/img/discoverInfo/women20180723/content1_2.png"></div>
                <div @click.stop.prevent="goGoodsDetail(925)"><img src="../../assets/img/discoverInfo/women20180723/content1_3.png"></div>
              </div>
              <div class="flex">
                <div @click.stop.prevent="goGoodsDetail(943)"><img src="../../assets/img/discoverInfo/women20180723/content1_4.png"></div>
                <div @click.stop.prevent="goGoodsDetail(954)"><img src="../../assets/img/discoverInfo/women20180723/content1_5.png"></div>
                <div @click.stop.prevent="goGoodsDetail(2849)"><img src="../../assets/img/discoverInfo/women20180723/content1_6.png"></div>
              </div>
            </div>
            <div class="content content2">
              <div><img src="../../assets/img/discoverInfo/women20180723/content2.png"></div>
              <div class="flex">
                <div @click.stop.prevent="goGoodsDetail(4130)"><img src="../../assets/img/discoverInfo/women20180723/content2_1.png"></div>
                <div @click.stop.prevent="goGoodsDetail(4080)"><img src="../../assets/img/discoverInfo/women20180723/content2_2.png"></div>
                <div @click.stop.prevent="goGoodsDetail(4119)"><img src="../../assets/img/discoverInfo/women20180723/content2_3.png"></div>
              </div>
            </div>
            <div class="content content3">
              <div><img src="../../assets/img/discoverInfo/women20180723/content3.png"></div>
              <div class="flex">
                <div @click.stop.prevent="goGoodsDetail(1482)"><img src="../../assets/img/discoverInfo/women20180723/content3_1.png"></div>
                <div @click.stop.prevent="goGoodsDetail(1325)"><img src="../../assets/img/discoverInfo/women20180723/content3_2.png"></div>
                <div @click.stop.prevent="goGoodsDetail(2871)"><img src="../../assets/img/discoverInfo/women20180723/content3_3.png"></div>
              </div>
            </div>
            <div class="content content4">
              <div><img src="../../assets/img/discoverInfo/women20180723/content4.png"></div>
              <div class="flex">
                <div @click.stop.prevent="goGoodsDetail(4085)"><img src="../../assets/img/discoverInfo/women20180723/content4_1.png"></div>
                <div @click.stop.prevent="goGoodsDetail(4067)"><img src="../../assets/img/discoverInfo/women20180723/content4_2.png"></div>
              </div>
            </div>
            <div class="bottom-area"><img src="../../assets/img/discoverInfo/women20180723/bottom.png"></div>
          </div>
        </scroll>
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
    name: 'women20180723',
    components:{
      'set-share':setShare
    },
    data() {
        return {
          isLogin: false,
          userAgent:'',
          shareProps: {
            title:"雅萌美容仪，低至9.63元/天",
            content:"颜值即正义，拯救熬夜肌！",
            image:window.location.origin + window.location.pathname + require('@/assets/wxshare/women20180723.png').substr(2),
            url:window.location.origin + '/activity/#/a20180723'+(this.$route.query.channel?'?channel='+this.$route.query.channel:''),
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
          statisEvent('微信20180723女性专题活动',action,label);
        } else if(this.userAgent == 'jd') {
          statisEvent('京东20180723女性专题活动',action,label);
        } else if(this.userAgent == 'mibao') {
          statisEvent('APP20180723女性专题活动',action,label);
        } else if(this.userAgent == 'alipay') {
          statisEvent('支付宝20180723女性专题活动',action,label);
        } else {
          statisEvent('其他渠道20180723女性专题活动',action,label);
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
    #women20180723 {
      background:#fff1f1;
      .wrapper {
        margin:0 auto;
        .content {
          width:100%;
          position: relative;
          .flex {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-start;
          }
        }
      }
    }
</style>
