<template>
  <!-- 过渡动画 -->
  <transition name="fade">
    <div class="img-view" @click.stop.prevent="bigImg">
      <!-- 遮罩层 -->
      <div class="img-layer"></div>
      <div class="img">
        <img :src="imgSrc">
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: ['imgSrc'],
    methods: {
      bigImg() {
        // 发送事件
        this.$emit('clickit')
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*动画*/
  .fade-enter-active {
    transition: all .5s ease;
  }
  .fade-leave-active {
    transition: all .5s ease;
  }
  .fade-enter, .fade-leave-active {
    transform: translateY(10px);
    opacity: 0;
  }
  /* bigimg */
  .img-view {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
  }
  /*遮罩层样式*/
  .img-view .img-layer {
    position: fixed;
    z-index: 88;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /*不限制图片大小，实现居中*/
  .img-view .img {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 85%;
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 1000;
    }
  }
</style>
