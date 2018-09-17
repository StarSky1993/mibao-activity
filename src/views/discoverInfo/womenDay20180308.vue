<template>
	<div id="women-day">
        <div class="wrapper">
            <div class="banner-area">
                <div class="banner"><img src="../../assets/img/discoverInfo/women_day20180308/01.png"></div>
                <div class="coupon" @click.stop.prevent="receiveCoupon()"><img src="../../assets/img/discoverInfo/women_day20180308/02.png"></div>
            </div>
            <div class="section">
                <div class="describe"><img src="../../assets/img/discoverInfo/women_day20180308/03.png"></div>
                <div class="goods" @click.stop.prevent="linkGoodsUrl(925)"><img src="../../assets/img/discoverInfo/women_day20180308/04.png"></div>
                <div class="goods" @click.stop.prevent="linkGoodsUrl(919)"><img src="../../assets/img/discoverInfo/women_day20180308/05.png"></div>
                <div class="goods" @click.stop.prevent="linkGoodsUrl(918)"><img src="../../assets/img/discoverInfo/women_day20180308/06.png"></div>
            </div>
            <div class="section">
                <div class="describe"><img src="../../assets/img/discoverInfo/women_day20180308/07.png"></div>
                <div class="goods" @click.stop.prevent="linkGoodsUrl(734)"><img src="../../assets/img/discoverInfo/women_day20180308/08.png"></div>
                <div class="goods" @click.stop.prevent="linkGoodsUrl(929)"><img src="../../assets/img/discoverInfo/women_day20180308/09.png"></div>
                <div class="goods" @click.stop.prevent="linkGoodsUrl(801)"><img src="../../assets/img/discoverInfo/women_day20180308/10.png"></div>
            </div>
            <div class="section">
                <div class="describe"><img src="../../assets/img/discoverInfo/women_day20180308/11.png"></div>
                <div class="goods" @click.stop.prevent="linkGoodsUrl(596)"><img src="../../assets/img/discoverInfo/women_day20180308/12.png"></div>
                <div class="goods" @click.stop.prevent="linkGoodsUrl(752)"><img src="../../assets/img/discoverInfo/women_day20180308/13.png"></div>
                <div class="goods" @click.stop.prevent="linkGoodsUrl(881)"><img src="../../assets/img/discoverInfo/women_day20180308/14.png"></div>
                <div class="goods" @click.stop.prevent="linkGoodsUrl(557)"><img src="../../assets/img/discoverInfo/women_day20180308/15.png"></div>
            </div>
            <coupon-model ref="coupon"></coupon-model>
        </div>
	</div>
</template>

<script>
import CouponModel from '@/components/activities/couponModel';
import {hostUrl} from '@/api/fetch';
import {goGoodsDetail} from '@/utils/mobile';
import {share} from '@/utils/share';

export default {
    name: 'womenDay0308',
    data() {
        return {

        }
    },
    components:{
       'coupon-model':CouponModel
    },
    methods: {
        receiveCoupon() {
            this.$refs.coupon.getCoupon("womenDay20180308");
        },
        linkGoodsUrl(goodsId) {
          goGoodsDetail(goodsId,'nvshen');
        },
    },
    mounted()
    {
      share.shareWX({title:'女神节，中了你的毒！', logo:require('../../assets/logo/38logo.png')});
    },
}
</script>
<style lang="scss" scoped>
    $real-px: 37.5;
    @function calRem($px-input){
       @return ($px-input/$real-px)/2;
    }
	div,img,a{padding:0;margin:0;display:block;border:0;}
    #women-day {
        background:#fff1f1;
        .wrapper {
            max-width:900px;
            margin:0 auto;
            div{
                width:100%;
            }
            img{
                width:100%;
                height:auto;
            }
        }
    }
</style>
