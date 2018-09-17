<template>
	<div id="apple">
        <div class="wrapper">
            <div><img src="../../../../assets/img/varyActivity/goods/apple/01.png"></div>
            <div><img src="../../../../assets/img/varyActivity/goods/apple/02.png" id="shuangdanCoupon"></div>
            <div><img src="../../../../assets/img/varyActivity/goods/apple/03.png"></div>
            <div @click.stop.prevent="linkGoodsUrl(642)"><img src="../../../../assets/img/varyActivity/goods/apple/04.png"></div>
            <div class="row" style="background: rgb(237, 237, 237);">
                <div @click.stop.prevent="linkGoodsUrl(659)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/05.png">
                </div>
                <div @click.stop.prevent="linkGoodsUrl(640)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/06.png">
                </div>
            </div>
            <div class="row" style="background: rgb(237, 237, 237);">
                <div @click.stop.prevent="linkGoodsUrl(643)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/07.png">
                </div>
                <div @click.stop.prevent="linkGoodsUrl(650)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/08.png">
                </div>
            </div>
            <div><img src="../../../../assets/img/varyActivity/goods/apple/09.png"></div>
            <div @click.stop.prevent="linkGoodsUrl(249)"><img src="../../../../assets/img/varyActivity/goods/apple/10.png"></div>
            <div class="row" style="background: rgb(250, 250, 250)">
                <div @click.stop.prevent="linkGoodsUrl(241)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/11.png">
                </div>
                <div @click.stop.prevent="linkGoodsUrl(159)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/12.png">
                </div>
            </div>
            <div><img src="../../../../assets/img/varyActivity/goods/apple/13.png"></div>
            <div @click.stop.prevent="linkGoodsUrl(231)"><img src="../../../../assets/img/varyActivity/goods/apple/14.png"></div>
            <div class="row">
                <div @click.stop.prevent="linkGoodsUrl(247)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/15.png">
                </div>
                <div @click.stop.prevent="linkGoodsUrl(71)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/16.png">
                </div>
            </div>
            <div><img src="../../../../assets/img/varyActivity/goods/apple/17.png"></div>
            <div @click.stop.prevent="linkGoodsUrl(631)"><img src="../../../../assets/img/varyActivity/goods/apple/18.png"></div>
            <div class="row" style="background: #fafafa;">
                <div @click.stop.prevent="linkGoodsUrl(615)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/19.png">
                </div>
                <div @click.stop.prevent="linkGoodsUrl(612)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/20.png">
                </div>
            </div>
            <div><img src="../../../../assets/img/varyActivity/goods/apple/21.png"></div>
            <div class="row" style="background:rgb(255, 255, 255)">
                <div @click.stop.prevent="linkGoodsUrl(678)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/22.png">
                </div>
                <div @click.stop.prevent="linkGoodsUrl(733)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/23.png">
                </div>
            </div>
            <div class="row" style="background:rgb(255, 255, 255);">
                <div @click.stop.prevent="linkGoodsUrl(652)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/24.png">
                </div>
                <div @click.stop.prevent="linkGoodsUrl(674)">
                    <img src="../../../../assets/img/varyActivity/goods/apple/25.png">
                </div>
            </div>
            <div><img src="../../../../assets/img/varyActivity/goods/apple/26.png"></div>
            <coupon-model></coupon-model>
        </div>
	</div>
</template>

<script>
import Headers from '@/components/common/Headers';
import CouponModel from '@/components/activities/couponModel';
import {goGoodsDetail} from '@/utils/mobile';
export default {
    name: 'apple',
    data() {
        return {

        }
    },
    components:{
       'coupon-model':CouponModel,
    },
    methods: {
        linkGoodsUrl(goodsId) {
          goGoodsDetail(goodsId);
        },
    }

}
</script>
<style lang="scss" scoped>
	div,img,a{padding:0;margin:0;}
	img {display:block;border:0;vertical-align:top;}
    .wrapper {
        .row{
            display:flex;
            flex-wrap: nowrap;
            div {
                flex-basis: 50%;
            }
            img{
              width: 100%;
              height: 100%;
            }
        }
    }
</style>
