<template>
	<div id="a20180601">
        <div  class="view-wp">
          <div class="view-content">
            <scroll  :pullDownRefresh="false" :pullUpLoad="false">
                <div class="wrapper">
                    <div class="banner-area">
                        <img src="../../assets/img/discoverInfo/a20180601/banner.png">
                    </div>
                    <div class="coupon-area">
                        <div @click.stop.prevent="getCoupon('61one')"><img src="../../assets/img/discoverInfo/a20180601/coupon01.png"></div>
                        <div @click.stop.prevent="getCoupon('61two')"><img src="../../assets/img/discoverInfo/a20180601/coupon02.png"></div>
                    </div>
                    <div class="content">
                        <div><img src="../../assets/img/discoverInfo/a20180601/content1_1.png"></div>
                        <div @click.stop.prevent="goSchemeUrl(66)"><img src="../../assets/img/discoverInfo/a20180601/content1_2.png"></div>
                        <div @click.stop.prevent="goSchemeUrl(71)"><img src="../../assets/img/discoverInfo/a20180601/content1_3.png"></div>
                        <div @click.stop.prevent="goSchemeUrl(67)"><img src="../../assets/img/discoverInfo/a20180601/content1_4.png"></div>
                        <div @click.stop.prevent="goSchemeUrl(68)"><img src="../../assets/img/discoverInfo/a20180601/content1_5.png"></div>
                        <div @click.stop.prevent="goSchemeUrl(69)"><img src="../../assets/img/discoverInfo/a20180601/content1_6.png"></div>
                        <div @click.stop.prevent="goSchemeUrl(70)"><img src="../../assets/img/discoverInfo/a20180601/content1_7.png"></div>
                    </div>
                    <div class="bottom-area"><img src="../../assets/img/discoverInfo/a20180601/bottom.png"></div>
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
import {goSchemeUrlOpenAppUi, checkApp} from '@/utils/mobile.js';

export default {
    name: 'a20180601',
    data() {
        return {
          linkStr:hostUrl + '#/tab/collectPage/'
        }
    },
    components:{
       'coupon-model':CouponModel
    },
    methods: {
      getCoupon(coupon) {
        this.$refs.coupon.getCoupon(coupon);
      },
      goSchemeUrl(id) {
        if(checkApp()) {
          goSchemeUrlOpenAppUi(this.linkStr + id);
        } else {
          window.location.href = this.linkStr + id;
        }
      }
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
    #a20180601 {
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
        }
        .bottom-area {
            width:100%;
        }
    }
</style>
