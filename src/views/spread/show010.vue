<template>
  <div id="show010">
    <!-- <scroll  :pullDownRefresh="false" :pullUpLoad="false" style="width: 100%;height: 100%;"> -->
      <span @click.stop.prevent="download()" class="button1" :style="styleobj1" :class="{active:Ani}">
        <img src="../../assets/img/detail/button1.png" alt="按钮">
        <span class="icon" v-show="!iffalg"></span>
      </span>
      <div class="content">
        <img src="../../assets/img/detail/background2.png" alt="蜜宝租赁平台">
      </div>
    <!-- </scroll> -->
</div>
</template>

<script>
export default {
  name: 'show010',
  data()
  {
  	return{
      imgsrc:'../../assets/img/detail/background1.png',
      styleobj1:{},
      iffalg:false,
      Ani:false
  	}
  },
  methods:{
    download(){
      window.open('https://m.mibaostore.com/download.html');
    },
    scrolltop(){
      var scroll = document.documentElement.scrollTop||document.body.scrollTop
//      console.log(scroll)
//      console.log(window)
      var parents = scroll/innerHeight;
//      console.log(parents)


      // 0.8549931600547196
      if (parents >= 1) {
        this.Ani = true;

        this.styleobj1 = {position: 'fixed',left: '17.6%;',top: -0.67+'rem'}
      }else{
        this.Ani = false;
        this.styleobj1 = {position: 'absolute'}
      }
    }
  },
  mounted(){

    window.addEventListener('scroll',this.scrolltop);
  },
  beforeRouteEnter(to, from, next){
    document.getElementById("app-main").style.overflow = 'visible';
    document.getElementById("app-main").style.height = 'auto';
    document.getElementById("app").style.height = 'auto';
    document.body.style.height = 'auto';
    next();
  },
   beforeRouteLeave(to, from, next){
    document.getElementById("app-main").style.overflow = 'auto';
    document.getElementById("app-main").style.height = '100%';
    document.getElementById("app").style.height = '100%';
    document.body.style.height = '100%';
    next();
   }

}
</script>
<style lang="less" scoped>

	#show010{
		width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
   img{
    display: block;
   }
    .active{
      animation:myAni1 1s;
      @keyframes myAni1
      {
        0% {opacity: 0;}
        50% {opacity: 0.5;}
        100% {opacity: 1;}
      }
    }
    .button1{
        width: 6.5rem;
        height: 2.4375rem;
        display: block;
        position: absolute;
        left: 0;right:0;margin:0 auto;
        top: 24.2%;


      img{
        width: 100%;
        height: 100%;
      }
      .icon{
        display: block;
        width: 20px;
        height: 14px;
        position: absolute;
        left: 44.9%;
        top: 90%;
        background: url("../../assets/img/detail/arrow1.png") 0 0 no-repeat;
        background-size: contain;

        animation: myAni 2s ease-in-out infinite;

        @keyframes myAni
        {
          0% {opacity: 1;}
          50% {opacity: 0.2;}
          100% {opacity: 1;}
        }
      }
    }
  }
</style>
