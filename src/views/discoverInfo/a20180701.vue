<template>
	<div id="a20180701">
        <div  class="view-wp">
          <div class="view-content">
            <scroll  :pullDownRefresh="false" :pullUpLoad="false">
                <div class="wrapper">
                    <div class="banner-area">
                        <img src="../../assets/img/discoverInfo/a20180701/banner.png">
                    </div>
                    <div class="coupon-area">
                      <div @click.stop.prevent="getCoupon('apple07_50')"><img src="../../assets/img/discoverInfo/a20180701/coupon01.png"></div>
                        <div class="flexStyle">
                          <div @click.stop.prevent="getCoupon('apple07_100')"><img src="../../assets/img/discoverInfo/a20180701/coupon02.png"></div>
                          <div @click.stop.prevent="getCoupon('apple07_200')"><img src="../../assets/img/discoverInfo/a20180701/coupon03.png">
                        </div>
                       </div>
                    </div>
                    <div class="content">
                        <div><img src="../../assets/img/discoverInfo/a20180701/content1_1.png"></div>
                        <div class="flex">
                          <div @click.stop.prevent="goGoodsDetail(741)"><img src="../../assets/img/discoverInfo/a20180701/content1_2.png"></div>
                          <div @click.stop.prevent="goGoodsDetail(1401)"><img src="../../assets/img/discoverInfo/a20180701/content1_3.png"></div>
                          <div @click.stop.prevent="goGoodsDetail(1188)"><img src="../../assets/img/discoverInfo/a20180701/content1_4.png"></div>
                        </div>
                    </div>
                    <div class="content">
                      <div><img src="../../assets/img/discoverInfo/a20180701/content2_1.png"></div>
                      <div class="flex">
                        <div @click.stop.prevent="goGoodsDetail(1744)"><img src="../../assets/img/discoverInfo/a20180701/content2_2.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(659)"><img src="../../assets/img/discoverInfo/a20180701/content2_3.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(1513)"><img src="../../assets/img/discoverInfo/a20180701/content2_4.png"></div>
                      </div>
                      <div class="flex">
                        <div @click.stop.prevent="goGoodsDetail(687)"><img src="../../assets/img/discoverInfo/a20180701/content2_5.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(657)"><img src="../../assets/img/discoverInfo/a20180701/content2_6.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(1379)"><img src="../../assets/img/discoverInfo/a20180701/content2_7.png"></div>
                      </div>
                      <div class="flex">
                        <div @click.stop.prevent="goGoodsDetail(1140)"><img src="../../assets/img/discoverInfo/a20180701/content2_8.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(231)"><img src="../../assets/img/discoverInfo/a20180701/content2_9.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(1285)"><img src="../../assets/img/discoverInfo/a20180701/content2_10.png"></div>
                      </div>
                    </div>
                    <div class="content">
                      <div><img src="../../assets/img/discoverInfo/a20180701/content3_1.png"></div>
                      <div class="flex">
                        <div @click.stop.prevent="goGoodsDetail(1403)"><img src="../../assets/img/discoverInfo/a20180701/content3_2.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(740)"><img src="../../assets/img/discoverInfo/a20180701/content3_3.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(631)"><img src="../../assets/img/discoverInfo/a20180701/content3_4.png"></div>
                      </div>
                    </div>
                    <div class="bottom-area" v-if="userAgent=='wx'"><img @click="enlargeImg($event)" src="../../assets/img/discoverInfo/a20180701/bottom.png"></div>
                    <div class="bottom-area" v-if="userAgent!='wx'"><img src="../../assets/img/discoverInfo/a20180701/bottom02.png"></div>
                </div>
            </scroll>
            <coupon-model ref="coupon"></coupon-model>
          </div>
          <big-img v-if="showImg" @clickit="closeImg" :imgSrc="imgSrc"></big-img>
        </div>
        <div id="mibaoShareContent" style="display: none">
          {
          "title": "{{appShareStringBody.title}}",
          "content": "{{appShareStringBody.content}}",
          "image": "{{shareImage}}",
          "url": "{{shareUrl}}",
          "activityFlag":"{{appShareStringBody.activityFlag}}",
          "isReqShare": {{appShareStringBody.isReqShare}}
          }
        </div>
	</div>
</template>

<script>
import CouponModel from '@/components/activities/couponModel';
import {hostUrl} from '@/api/fetch.js';
import {goSchemeUrlOpenAppUi, checkApp, goGoodsDetail,deviceJudge,interceptContent} from '@/utils/mobile.js';
import wxapi from '@/utils/wxapi';
import {getUserAgent} from '@/utils/common.js';
import {statisEvent} from '@/utils/statisEvent.js';
import bigImg from '@/components/common/bigImg';
export default {
    name: 'a20180701',
    data() {
        return {
          linkStr:hostUrl + '#/tab/collectPage/',
          userAgent:'',
          showImg:false,
          imgSrc:'',
          appshareString: {
            "tagId":"mibaoShareContent",
            "body": ""
          },
          appShareStringBody: {
            "title": "【苹果美学】3000月薪，也能用上苹果全系列产品",
            "content": "蜜宝邀请你一起免押租iPhoneX、Mac...",
            "image": this.shareImage || "",
            "url": this.appShareUrl || "",
            "activityFlag":"apple20180701",
            "isReqShare": false
          },
          shareImage:'',
          shareUrl:'',
          appShareUrl:'',
        }
    },
    components:{
       'coupon-model':CouponModel,
       'big-img':bigImg
    },
    methods: {
      getCoupon(coupon) {
        this.$refs.coupon.getCoupon(coupon);
      },
      goCategory(id) {
        if(checkApp()) {
          goSchemeUrlOpenAppUi(this.linkStr + id);
        } else {
          window.location.href = this.linkStr + id;
        }
      },
      goGoodsDetail(goodsId) {
        let _this = this;
        setTimeout(function() {
          _this.userStatisEvent('点击商品',goodsId);
          goGoodsDetail(goodsId);
        },200);
      },
      enlargeImg(e) {
        // 判断是否为安卓机型
        if(deviceJudge() == 2) {
          this.showImg = true;
          this.imgSrc = require('../../assets/img/discoverInfo/a20180701/qrCode.png');
        }
      },
      closeImg() {
        this.showImg = false;
      },
      /*微信分享设置*/
      setShare() {
        let shareObj = {
          title: '明人不装暗X，你请我吃顿饭，我给你个iPhoneX', // 分享标题
          desc: '说起来你可能不信，一顿午饭钱，可以换来个iPhone X',  // 分享描述
          link: this.shareUrl, // 分享链接
          imgUrl: this.shareImage, // 分享图标
        };
        wxapi.share(shareObj, function () {
          if (window._czc) {
            statisEvent('微信07-01苹果特惠','分享成功');
          }
        });
      },
      intShareSetting() {
        this.shareUrl    = window.location.origin + '/activity/#/a20180701?share=weixin';
        this.appShareUrl = window.location.origin + '/activity/#/a20180701';
        this.shareImage  = window.location.origin + window.location.pathname + require('@/assets/wxshare/20180701.jpg').substr(2);
        this.setShare();    // 微信分享设置
        this.appShareStringBody.image = this.shareImage || "";
        this.appShareStringBody.url = this.appShareUrl || "";
        this.appshareString.body = JSON.stringify(this.appShareStringBody);
        interceptContent(this.appshareString);   //  重设app分享内容
      },
      userStatisEvent(action,label) {
        if(this.userAgent == 'wx') {
          statisEvent('微信07-01苹果特惠',action,label);
        } else if(this.userAgent == 'jd') {
          statisEvent('京东07-01苹果特惠',action,label);
        } else if(this.userAgent == 'mibao') {
          statisEvent('App07-01苹果特惠',action,label);
        } else if (this.userAgent == 'alipay') {
          statisEvent('支付宝07-01苹果特惠',action,label);
        } else {
          statisEvent('其他渠道07-01苹果特惠',action,label);
        }
      },
    },
  mounted() {
    //   分享
    this.$nextTick(()=>{
      this.intShareSetting();
    });
    //   访问渠道统计
    this.userAgent = getUserAgent();
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
    #a20180701 {
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
