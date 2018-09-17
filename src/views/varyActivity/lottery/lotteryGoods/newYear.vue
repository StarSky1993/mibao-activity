<template>
    <div id="new-year">
        <div class="wrapper">
            <div><img src="../../../../assets/img/varyActivity/goods/new_year/01.png"></div>
            <div @click.stop.prevent="linkGoodsUrl(534)"><img src="../../../../assets/img/varyActivity/goods/new_year/02.png"></div>
            <div @click.stop.prevent="linkGoodsUrl(300)"><img src="../../../../assets/img/varyActivity/goods/new_year/03.png"></div>
            <div><img src="../../../../assets/img/varyActivity/goods/new_year/04.png"></div>
            <div @click.stop.prevent="linkGoodsUrl(560)"><img src="../../../../assets/img/varyActivity/goods/new_year/05.png"></div>
            <div @click.stop.prevent="linkGoodsUrl(356)"><img src="../../../../assets/img/varyActivity/goods/new_year/06.png"></div>
            <div @click.stop.prevent="linkGoodsUrl(462)"><img src="../../../../assets/img/varyActivity/goods/new_year/07.png"></div>
            <div><img src="../../../../assets/img/varyActivity/goods/new_year/08.png"></div>
            <div>
                <div class="row">
                    <div @click.stop.prevent="linkGoodsUrl(693)">
                        <img src="../../../../assets/img/varyActivity/goods/new_year/09.png">
                    </div>
                    <div @click.stop.prevent="linkGoodsUrl(758)">
                        <img src="../../../../assets/img/varyActivity/goods/new_year/10.png">
                    </div>
                </div>
                <div class="row">
                    <div @click.stop.prevent="linkGoodsUrl(596)">
                        <img src="../../../../assets/img/varyActivity/goods/new_year/11.png">
                    </div>
                    <div @click.stop.prevent="linkGoodsUrl(638)">
                        <img src="../../../../assets/img/varyActivity/goods/new_year/12.png">
                    </div>
                </div>
            </div>
            <div><img src="../../../../assets/img/varyActivity/goods/new_year/13.png"></div>
        </div>
    </div>
</template>

<script>
import Headers from '@/components/common/Headers';
import {goGoodsDetail} from '@/utils/mobile';
export default {
  name: 'newYear',
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