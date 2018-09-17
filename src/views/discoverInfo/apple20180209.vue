<template>
	<div id="apple">
        <div class="wrapper">
            <div class="banner-area">
                <div class="coupon" id="shuangdanCoupon"></div>
            </div>
            <nav class="nav-area">
                <ul>
                    <li v-scroll-to="'#iphone'">iphone</li>
                    <li v-scroll-to="'#mac'">mac</li>
                    <li v-scroll-to="'#ipad'">ipad</li>
                    <li v-scroll-to="'#watch'">watch</li>
                </ul>
            </nav>
            <div class="iphone-area" id="iphone">
                <div class="content_1">
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(738)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(737)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(640)"></div>
                </div>
                <div class="content_2">
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(642)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(659)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(643)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(731)"></div>
                </div>
            </div>
            <div class="mac-area" id="mac">
                <div class="content_1">
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(185)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(241)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(741)"></div>
                </div>
            </div>
            <div class="ipad-area" id="ipad">
                <div class="content_1">
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(231)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(247)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(71)"></div>
                </div>
            </div>
            <div class="watch-area" id="watch">
                <div class="content_1">
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(631)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(615)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(612)"></div>
                </div>
            </div>
            <div class="favor-area">
                <div class="content_2">
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(678)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(733)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(652)"></div>
                    <div class="goods" @click.stop.prevent="linkGoodsUrl(641)"></div>
                </div>
            </div>
            <div class="bottom-area"></div>
            <coupon-model></coupon-model>
        </div>
	</div>
</template>

<script>
import CouponModel from '@/components/activities/couponModel';
import {hostUrl} from '@/api/fetch';
import {goGoodsDetail} from '@/utils/mobile';

export default {
    name: 'apple20180209',
    data() {
        return {

        }
    },
    components:{
       'coupon-model':CouponModel
    },
    methods: {
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
    #apple {
        background:#d73030;
        .banner-area {
            width:100%;
            height:calRem(900rem);
            overflow:hidden;
            background: url('../../assets/img/discoverInfo/apple20180209/apple_banner.png') 0 0 no-repeat;
            background-size: 100% auto;
            position:relative;
            display:flex;
            justify-content:center;
            .coupon {
                width:calRem(640rem);
                height:calRem(130rem);
                background: url('../../assets/img/discoverInfo/apple20180209/apple_coupon.png') 0 0 no-repeat;
                background-size: 100% auto;
                // position: absolute;
                // top:calRem(750rem);
                transform:translateY(calRem(750rem));
                margin:0 auto;
            }
        }
        .nav-area {
            width:100%;
            height:calRem(124rem);
            background: url('../../assets/img/discoverInfo/apple20180209/apple_nav.png') 0 0 no-repeat;
            background-size: 100% auto;
            & ul {
                display:flex;
                box-sizing: border-box;
                padding: 0 calRem(26rem);
                justify-content: space-between;
                & li {
                    background: transparent;
                    width: calRem(170rem);
                    height:calRem(100rem);
                    text-indent: -9999px;
                }
            }
        }
        .iphone-area {
            position:relative;
            padding-top:calRem(158rem);
            background: url('../../assets/img/discoverInfo/apple20180209/iphone.png') 0 0 no-repeat;
            background-size: 100% auto;
            & .content_1 {
                & .goods {
                    width:calRem(700rem);
                    height:calRem(290rem);
                    margin-bottom:calRem(48rem);
                    background: transparent;
                }
            }
            & .content_2 {
                width:100%;
                height:calRem(980rem);
                box-sizing: border-box;
                padding: 0 calRem(68rem);
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .goods {
                    width: calRem(290rem);
                    height:calRem(456rem);
                    margin-bottom:calRem(26rem);
                    background: transparent;
                }
            }
        }
        .mac-area,.ipad-area,.watch-area {
            position:relative;
            padding-top:calRem(176rem);
            background: url('../../assets/img/discoverInfo/apple20180209/mac.png') 0 0 no-repeat;
            background-size: 100% auto;
            padding-bottom:calRem(28rem);
            & .content_1 {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                & .goods {
                    width:calRem(700rem);
                    height:calRem(292rem);
                    margin-bottom:calRem(48rem);
                    background: transparent;
                }
                & .goods:last-child {
                    margin-bottom:0;
                }
            }
        }
        .ipad-area {
            background: url('../../assets/img/discoverInfo/apple20180209/ipad.png') 0 0 no-repeat;
            background-size: 100% auto;
        }
        .watch-area {
            background: url('../../assets/img/discoverInfo/apple20180209/watch.png') 0 0 no-repeat;
            background-size: 100% auto;
        }
        .favor-area {
            background: url('../../assets/img/discoverInfo/apple20180209/favor.png') 0 0 no-repeat;
            background-size: 100% auto;
            position:relative;
            padding-top:calRem(200rem);
            padding-bottom:calRem(28rem);
            .content_2 {
                width:100%;
                height:calRem(980rem);
                box-sizing: border-box;
                padding: 0 calRem(68rem);
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .goods {
                    width: calRem(290rem);
                    height:calRem(456rem);
                    margin-bottom:calRem(26rem);
                    background: transparent;
                }
            }
        }
        .bottom-area {
            height:calRem(620rem);
            background: url('../../assets/img/discoverInfo/apple20180209/bottom.png') 0 0 no-repeat;
            background-size: 100% auto;
        }
    }
</style>
