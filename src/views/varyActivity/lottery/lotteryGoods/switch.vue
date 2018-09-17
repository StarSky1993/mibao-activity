<template>
   <div id="switch-html">
   		<div class="wrapper">
   			<div><img src="../../../../assets/img/varyActivity/goods/switch/01.jpg"></div>
		    <div @click.stop.prevent="linkGoodsUrl(342)"><img src="../../../../assets/img/varyActivity/goods/switch/02.jpg"></div>
		    <div><img src="../../../../assets/img/varyActivity/goods/switch/03.jpg"></div>
		    <div @click.stop.prevent="linkGoodsUrl(387)"><img src="../../../../assets/img/varyActivity/goods/switch/04.jpg"></div>
		    <div><img src="../../../../assets/img/varyActivity/goods/switch/05.jpg"></div>
		    <div @click.stop.prevent="linkGoodsUrl(390)"><img src="../../../../assets/img/varyActivity/goods/switch/06.jpg"></div>
		    <div><img src="../../../../assets/img/varyActivity/goods/switch/07.jpg"></div>
		    <div @click.stop.prevent="linkGoodsUrl(401)"><img src="../../../../assets/img/varyActivity/goods/switch/08.jpg"></div>
			  <div><img src="../../../../assets/img/varyActivity/goods/switch/09.jpg"></div>
		    <div @click.stop.prevent="linkGoodsUrl(408)"><img src="../../../../assets/img/varyActivity/goods/switch/10.jpg"></div>
		    <div><img src="../../../../assets/img/varyActivity/goods/switch/11.jpg"></div>
		    <div class="row">
          <div @click.stop.prevent="linkGoodsUrl(339)">
            <img src="../../../../assets/img/varyActivity/goods/switch/12.jpg">
          </div>
          <div @click.stop.prevent="linkGoodsUrl(340)">
            <img src="../../../../assets/img/varyActivity/goods/switch/13.jpg">
          </div>
		    </div>
		    <div><img src="../../../../assets/img/varyActivity/goods/switch/14.jpg"></div>
   		</div>
   </div>
</template>

<script>
import Headers from '@/components/common/Headers';
import {goGoodsDetail} from '@/utils/mobile';
export default {
  name: 'switchhtml',
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
        background: #2e80d6;
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