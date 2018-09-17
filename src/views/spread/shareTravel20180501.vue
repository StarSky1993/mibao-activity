<template>
	<div id="travel">
        <div  class="view-wp">
          <div class="view-content">
            <scroll  ref="newUserCoupon" :pullDownRefresh="false" :pullUpLoad="false">
                <div class="wrapper">
                    <div class="banner-area">
                        <img src="../../assets/img/spread/shareTravel51/share_travel51_banner.png">
                        <div class="downloadApp" @click.stop.prevent="downloadApp()">下载蜜宝App</div>
                    </div>
                    <div class="coupon-area">
                        <div @click.stop.prevent="getCoupon('chuyou50')"><img src="../../assets/img/discoverInfo/travel20180501/coupon01.png"></div>
                        <div @click.stop.prevent="getCoupon('chuyou100')"><img src="../../assets/img/discoverInfo/travel20180501/coupon02.png"></div>
                        <div @click.stop.prevent="getCoupon('chuyou150')"><img src="../../assets/img/discoverInfo/travel20180501/coupon03.png"></div>
                        <div @click.stop.prevent="getCoupon('chuyou200')"><img src="../../assets/img/discoverInfo/travel20180501/coupon04.png"></div>
                    </div>   
                    <div class="content">
                        <div><img src="../../assets/img/discoverInfo/travel20180501/content1_1.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(1156)"><img src="../../assets/img/discoverInfo/travel20180501/content1_2.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(929)"><img src="../../assets/img/discoverInfo/travel20180501/content1_3.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(658)"><img src="../../assets/img/discoverInfo/travel20180501/content1_4.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(546)"><img src="../../assets/img/discoverInfo/travel20180501/content1_5.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(485)"><img src="../../assets/img/discoverInfo/travel20180501/content1_6.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(301)"><img src="../../assets/img/discoverInfo/travel20180501/content1_7.png"></div>
                    </div>
                    <div class="content">
                        <div><img src="../../assets/img/discoverInfo/travel20180501/content2_1.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(774)"><img src="../../assets/img/discoverInfo/travel20180501/content2_2.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(775)"><img src="../../assets/img/discoverInfo/travel20180501/content2_3.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(791)"><img src="../../assets/img/discoverInfo/travel20180501/content2_4.png"></div>
                    </div>
                    <div class="content">
                        <div><img src="../../assets/img/discoverInfo/travel20180501/content3_1.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(728)"><img src="../../assets/img/discoverInfo/travel20180501/content3_2.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(771)"><img src="../../assets/img/discoverInfo/travel20180501/content3_3.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(550)"><img src="../../assets/img/discoverInfo/travel20180501/content3_4.png"></div>
                    </div>
                    <div class="content">
                        <div><img src="../../assets/img/discoverInfo/travel20180501/content4_1.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(161)"><img src="../../assets/img/discoverInfo/travel20180501/content4_2.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(993)"><img src="../../assets/img/discoverInfo/travel20180501/content4_3.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(932)"><img src="../../assets/img/discoverInfo/travel20180501/content4_4.png"></div>
                    </div>
                    <div class="bottom-area"><img src="../../assets/img/discoverInfo/travel20180501/bottom.png"></div>
                </div>
            </scroll>
            <coupon-model ref="coupon"></coupon-model>
          </div>
        </div>
	</div>
</template>

<script>
import CouponModel from '@/components/activities/couponModel';
import {hostUrl} from '@/api/fetch';
import {goGoodsDetail} from '@/utils/mobile';

export default {
    name: 'shareTravel0501',
    data() {
        return {}
    },
    components:{
       'coupon-model':CouponModel
    },
    methods: {
        getCoupon(coupon) {
            console.log("领取优惠券");
            this.$refs.coupon.getCoupon(coupon);
        },
        linkGoodsUrl(goodsId) {
            goGoodsDetail(goodsId);
        },
        downloadApp() {
            window.open('https://m.mibaostore.com/download.html');
        }
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
    #travel {
        background:#d73030;
        .banner-area {
            width:100%;
            position:relative;
            .downloadApp {
                position:absolute;
                top:  calRem(406rem);
                width: calRem(190rem);
                height: calRem(50rem);
                width:calRem(180rem);
                height:calRem(50rem);
                left: 0;
                right: 0;
                margin:0 auto;
                text-indent: -9999px;
            }
        }
        .coupon-area {
            display:flex;
            flex-wrap:wrap;
            div {
                width:50%;
            }
        }
        .content {
            width:100%;
        }
        .bottom-area {
            width:100%;
        }
    }
</style>
