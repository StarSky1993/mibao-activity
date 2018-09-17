<template>
	<div id="a20180609">
        <div  class="view-wp">
          <div class="view-content">
            <scroll  :pullDownRefresh="false" :pullUpLoad="false">
                <div class="wrapper">
                    <div class="banner-area">
                        <img src="../../assets/img/discoverInfo/a20180609/banner.png">
                    </div>
                    <div class="coupon-area">
                        <div @click.stop.prevent="getCoupon('gkjy50')"><img src="../../assets/img/discoverInfo/a20180609/coupon01.jpg"></div>
                        <div @click.stop.prevent="getCoupon('gkjy100')"><img src="../../assets/img/discoverInfo/a20180609/coupon02.png"></div>
                    </div>
                    <div class="content">
                        <div><img src="../../assets/img/discoverInfo/a20180609/content1_1.png"></div>
                        <div class="flex">
                          <div @click.stop.prevent="goGoodsDetail(1130)"><img src="../../assets/img/discoverInfo/a20180609/content1_2.png"></div>
                          <div @click.stop.prevent="goGoodsDetail(1132)"><img src="../../assets/img/discoverInfo/a20180609/content1_3.png"></div>
                          <div @click.stop.prevent="goGoodsDetail(734)"><img src="../../assets/img/discoverInfo/a20180609/content1_4.png"></div>
                        </div>
                        <div class="more" @click.stop.prevent="goCategory(73)">查看更多1</div>
                    </div>
                    <div class="content">
                      <div><img src="../../assets/img/discoverInfo/a20180609/content2_1.png"></div>
                      <div class="flex">
                        <div @click.stop.prevent="goGoodsDetail(1070)"><img src="../../assets/img/discoverInfo/a20180609/content2_2.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(1343)"><img src="../../assets/img/discoverInfo/a20180609/content2_3.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(730)"><img src="../../assets/img/discoverInfo/a20180609/content2_4.png"></div>
                      </div>
                      <div class="more" style="top: 0.8rem;" @click.stop.prevent="goCategory(74)">查看更多2</div>
                    </div>
                    <div class="content">
                      <div><img src="../../assets/img/discoverInfo/a20180609/content3_1.png"></div>
                      <div class="flex">
                        <div @click.stop.prevent="goGoodsDetail(32)"><img src="../../assets/img/discoverInfo/a20180609/content3_2.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(31)"><img src="../../assets/img/discoverInfo/a20180609/content3_3.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(33)"><img src="../../assets/img/discoverInfo/a20180609/content3_4.png"></div>
                      </div>
                      <div class="more" style="top: 0.9rem;" @click.stop.prevent="goCategory(78)">查看更多3</div>
                    </div>
                    <div class="content">
                      <div><img src="../../assets/img/discoverInfo/a20180609/content4_1.png"></div>
                      <div class="flex">
                        <div @click.stop.prevent="goGoodsDetail(873)"><img src="../../assets/img/discoverInfo/a20180609/content4_2.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(951)"><img src="../../assets/img/discoverInfo/a20180609/content4_3.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(745)"><img src="../../assets/img/discoverInfo/a20180609/content4_4.png"></div>
                      </div>
                      <div class="more" style="top: 0.9rem;" @click.stop.prevent="goCategory(75)">查看更多4</div>
                    </div>
                    <div class="content">
                      <div><img src="../../assets/img/discoverInfo/a20180609/content5_1.png"></div>
                      <div class="flex">
                        <div @click.stop.prevent="goGoodsDetail(654)"><img src="../../assets/img/discoverInfo/a20180609/content5_2.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(835)"><img src="../../assets/img/discoverInfo/a20180609/content5_3.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(1285)"><img src="../../assets/img/discoverInfo/a20180609/content5_4.png"></div>
                      </div>
                      <div class="more" style="top: 0.9rem;" @click.stop.prevent="goCategory(76)">查看更多5</div>
                    </div>
                    <div class="content">
                      <div><img src="../../assets/img/discoverInfo/a20180609/content6_1.png"></div>
                      <div class="flex">
                        <div @click.stop.prevent="goGoodsDetail(1396)"><img src="../../assets/img/discoverInfo/a20180609/content6_2.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(943)"><img src="../../assets/img/discoverInfo/a20180609/content6_3.png"></div>
                        <div @click.stop.prevent="goGoodsDetail(954)"><img src="../../assets/img/discoverInfo/a20180609/content6_4.png"></div>
                      </div>
                      <div class="more" style="top: 0.7rem;" @click.stop.prevent="goCategory(77)">查看更多6</div>
                    </div>
                    <div class="bottom-area"><img src="../../assets/img/discoverInfo/a20180609/bottom.png"></div>
                </div>
            </scroll>
            <coupon-model ref="coupon"></coupon-model>
          </div>
        </div>
	</div>
</template>

<script>
import CouponModel from '@/components/activities/couponModel';
import {hostUrl} from '@/api/fetch.js';
import {goSchemeUrlOpenAppUi, checkApp, goGoodsDetail} from '@/utils/mobile.js';
import wxapi from '@/utils/wxapi';
import {getUserAgent} from '@/utils/common.js';
import {statisEvent} from '@/utils/statisEvent.js';

export default {
    name: 'a20180609',
    data() {
        return {
          linkStr:hostUrl + '#/tab/collectPage/',
          userAgent:''
        }
    },
    components:{
       'coupon-model':CouponModel
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
        goGoodsDetail(goodsId);
      },
      /*微信分享设置*/
      setShare() {
        let shareObj = {
          title: '一只合格的咸鱼需要哪些装备？考后解压必看', // 分享标题
          desc: '考！完！啦！现在我只想用这些装备当只安静的咸鱼王...',  // 分享描述
          link: window.location.origin + '/activity/#/a20180609?channel=weixin', // 分享链接
          imgUrl: window.location.origin + window.location.pathname + require('@/assets/wxshare/20180609.jpg').substr(2), // 分享图标
        };
        wxapi.share(shareObj, function () {
          if (window._czc) {
            statisEvent('微信高考活动','分享成功');
          }
        });
      },

        userStatisEvent(action,label) {
        if(this.userAgent == 'wx') {
          statisEvent('微信高考活动',action,label);
        } else if(this.userAgent == 'jd') {
          statisEvent('京东高考活动',action,label);
        } else if(this.userAgent == 'mibao') {
          statisEvent('APP高考活动',action,label);
        } else if (this.userAgent == 'alipay') {
          statisEvent('支付宝高考活动',action,label);
        } else {
          statisEvent('其他渠道高考活动',action,label);
        }
      },
    },
  mounted() {
    //   分享
    this.$nextTick(()=>{
      this.setShare();
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
    #a20180609 {
        background:#d73030;
        .banner-area {
            width:100%;
        }
        .coupon-area {
            display:flex;
            div {
                width:50%;
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
