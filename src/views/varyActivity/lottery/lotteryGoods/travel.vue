<template>
  <div id="travel">
    <div class="wrapper">
        <div><img src="../../../../assets/img/varyActivity/goods/travel/01.png"></div>
        <div @click.stop.prevent="linkGoodsUrl(259)"><img src="../../../../assets/img/varyActivity/goods/travel/02.png"></div>
        <div @click.stop.prevent="linkGoodsUrl(533)"><img src="../../../../assets/img/varyActivity/goods/travel/03.png"></div>
        <div @click.stop.prevent="linkGoodsUrl(546)"><img src="../../../../assets/img/varyActivity/goods/travel/04.png"></div>
        <div @click.stop.prevent="linkGoodsUrl(275)"><img src="../../../../assets/img/varyActivity/goods/travel/05.png"></div>
        <div @click.stop.prevent="linkGoodsUrl(231)"><img src="../../../../assets/img/varyActivity/goods/travel/06.png"></div>
        <div @click.stop.prevent="linkGoodsUrl(342)"><img src="../../../../assets/img/varyActivity/goods/travel/07.png"></div>
        <div @click.stop.prevent="linkGoodsUrl(300)"><img src="../../../../assets/img/varyActivity/goods/travel/08.png"></div>
        <div @click.stop.prevent="linkGoodsUrl(635)"><img src="../../../../assets/img/varyActivity/goods/travel/09.png"></div>
        <div @click.stop.prevent="linkGoodsUrl(539)"><img src="../../../../assets/img/varyActivity/goods/travel/10.png"></div>
        <div @click.stop.prevent="linkGoodsUrl(648)"><img src="../../../../assets/img/varyActivity/goods/travel/11.png"></div>
        <div><img src="../../../../assets/img/varyActivity/goods/travel/12.png"></div>
    </div>
  </div>
</template>

<script>
import Headers from '@/components/common/Headers';
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