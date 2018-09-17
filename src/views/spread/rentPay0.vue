<template>
	<div id="rentPay0">
    <div @click="downloadApp"><img src="../../assets/img/spread/rentPay0/img.png"></div>
	</div>
</template>

<script>
  import {getUserAgent} from '@/utils/common.js';
export default {
    name: 'rentPay0',
    data() {
        return {}
    },
    methods: {
      downloadApp() {
        if (getUserAgent()!=='mibao') {
          window.location.href = 'https://m.mibaostore.com/download.html';
        }
      },
    }
}
</script>
<style lang="scss" scoped>
    $real-px: 37.5;
    @function calRem($px-input){
       @return ($px-input/$real-px);
    }
	  div,img,a{padding:0;margin:0;display:block;border:0;}
    #rentPay0 {
      width: 100%;
      height: 100%;
      & img {
        width: 100%;
        height: auto;
      }
    }
</style>
