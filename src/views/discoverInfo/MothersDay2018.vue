<template>
	<div id="MothersDay">
        <div  class="view-wp">
          <div class="view-content">
            <scroll :pullDownRefresh="false" :pullUpLoad="false">
                <div class="wrapper">
                    <div class="banner-area">
                        <img src="../../assets/img/discoverInfo/Mothers_day/banner.png">
                    </div>
                    <div class="coupon-area">
                        <div @click.stop.prevent="getCoupon('mother30')"><img src="../../assets/img/discoverInfo/Mothers_day/coupon01.png"></div>
                        <div @click.stop.prevent="getCoupon('mother50')"><img src="../../assets/img/discoverInfo/Mothers_day/coupon02.png"></div>
                        <div @click.stop.prevent="getCoupon('mother120')"><img src="../../assets/img/discoverInfo/Mothers_day/coupon03.png"></div>
                        <div @click.stop.prevent="getCoupon('mother250')"><img src="../../assets/img/discoverInfo/Mothers_day/coupon04.png"></div>
                    </div>
                    <div class="content">
                        <div><img src="../../assets/img/discoverInfo/Mothers_day/content1_1.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(925)"><img src="../../assets/img/discoverInfo/Mothers_day/content1_2.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(871)"><img src="../../assets/img/discoverInfo/Mothers_day/content1_3.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(919)"><img src="../../assets/img/discoverInfo/Mothers_day/content1_4.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(833)"><img src="../../assets/img/discoverInfo/Mothers_day/content1_5.png"></div>
                    </div>
                    <div class="content">
                        <div @click.stop.prevent="linkGoodsUrl(462)"><img src="../../assets/img/discoverInfo/Mothers_day/content2_1.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(458)"><img src="../../assets/img/discoverInfo/Mothers_day/content2_2.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(557)"><img src="../../assets/img/discoverInfo/Mothers_day/content2_3.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(556)"><img src="../../assets/img/discoverInfo/Mothers_day/content2_4.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(357)"><img src="../../assets/img/discoverInfo/Mothers_day/content2_5.png"></div>
                        <div @click.stop.prevent="linkGoodsUrl(1265)"><img src="../../assets/img/discoverInfo/Mothers_day/content2_6.png"></div>
                    </div>
                    <div class="bottom-area"><img src="../../assets/img/discoverInfo/Mothers_day/bottom.png"></div>
                </div>
            </scroll>
            <coupon-model ref="coupon"></coupon-model>
          </div>
        </div>
	</div>
</template>

<script>
import CouponModel from '@/components/activities/couponModel';
import {goGoodsDetail} from '@/utils/mobile';

export default {
    name: 'MothersDay',
    data() {
        return {}
    },
    components:{
       'coupon-model':CouponModel
    },
    methods: {
        getCoupon(coupon) {
            this.$refs.coupon.getCoupon(coupon);
        },
        linkGoodsUrl(goodsId) {
            goGoodsDetail(goodsId);
        },
    }
}
</script>
<style lang="scss" scoped>
    $real-px: 37.5;
    @function calRem($px-input){
       @return ($px-input/$real-px)/2;
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
    #MothersDay {
        background:#d73030;
        .banner-area {
            width:100%;
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
