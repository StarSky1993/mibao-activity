<template>
  <div id="kangjia">
    <div class="wrapper">
      <div><img src="../../../../assets/img/varyActivity/goods/kangjia/01.png"></div>
      <div><img src="../../../../assets/img/varyActivity/goods/kangjia/02.png"  id="kangjiaCoupon"></div>
      <div><img src="../../../../assets/img/varyActivity/goods/kangjia/03.png"></div>
      <div @click.stop.prevent="linkGoodsUrl(553)"><img src="../../../../assets/img/varyActivity/goods/kangjia/04.png"></div>
      <div @click.stop.prevent="linkGoodsUrl(556)"><img src="../../../../assets/img/varyActivity/goods/kangjia/05.png"></div>
      <div @click.stop.prevent="linkGoodsUrl(560)"><img src="../../../../assets/img/varyActivity/goods/kangjia/06.png"></div>
      <div><img src="../../../../assets/img/varyActivity/goods/kangjia/07.png"></div>
      <div @click.stop.prevent="linkGoodsUrl(554)"><img src="../../../../assets/img/varyActivity/goods/kangjia/08.png"></div>
      <div @click.stop.prevent="linkGoodsUrl(555)"><img src="../../../../assets/img/varyActivity/goods/kangjia/09.png"></div>
      <div @click.stop.prevent="linkGoodsUrl(557)"><img src="../../../../assets/img/varyActivity/goods/kangjia/10.png"></div>
      <div>
        <div class="row">
          <div @click.stop.prevent="linkGoodsUrl(140)">
            <img src="../../../../assets/img/varyActivity/goods/kangjia/11.png">
          </div>
          <div @click.stop.prevent="linkGoodsUrl(31)">
            <img src="../../../../assets/img/varyActivity/goods/kangjia/12.png">
          </div>
        </div>
        <div class="row">
          <div @click.stop.prevent="linkGoodsUrl(458)">
            <img src="../../../../assets/img/varyActivity/goods/kangjia/13.png">
          </div>
          <div @click.stop.prevent="linkGoodsUrl(104)">
            <img src="../../../../assets/img/varyActivity/goods/kangjia/14.png">
          </div>
        </div>
      </div>
      <coupon-model></coupon-model>
    </div>
  </div>
</template>

<script>
import Headers from '@/components/common/Headers';
import CouponModel from '@/components/activities/couponModel';
import {goGoodsDetail} from '@/utils/mobile';
export default {
  name: 'kangjia',
  data() {
        return {

        }
    },
    methods: {
      linkGoodsUrl(goodsId) {
        goGoodsDetail(goodsId);
      },
    },
    components:{
        'coupon-model':CouponModel,
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
        img{
              width: 100%;
              height: 100%;
        }
      }
    }
  }
</style>