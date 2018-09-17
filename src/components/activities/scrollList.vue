<template>
  <div class="scrollList-wrapper">
    <ul id="scrollList" :class="{anim:animate}">
      <li v-for='item in scrollItems' :style="style">
        恭喜手机尾号{{item.phone.slice(-4)}}的用户兑换了({{item.bonusName}})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'scrollList',
  props: {
    scrollListProp: {
      type: Object,
      default: function () {
        return {
          style:{},
          scrollTime: 3000,
          scrollLists:[],
        }
      }
    }
  },
  data: function(){
      return {
        style: '',
        animate: false,
        scrollTime:3000,
        scrollItems: []
      }
   },
   methods: {
     intStyle() {
       for(let i in this.scrollListProp.style) {
         if(!isNaN(this.scrollListProp.style[i])) {
           this.style += i + ':' + (this.scrollListProp.style[i]/75) + 'rem;';
         } else {
           this.style += i + ':' + this.scrollListProp.style[i] + ';';
         }
       }
     },
     checkScroll() {
       this.scrollItems = this.scrollListProp.scrollLists;
       if(this.scrollItems.length) {   // 如果有中奖名单则滚动中奖名单
         let _this = this;
         setInterval(_this.scroll,_this.scrollListProp.scrollTime);
       }
     },
     scroll() {
       let liHight = -(this.scrollListProp.style.height || 40)/75 + 'rem';
       let scrollList = document.getElementById('scrollList');
       if(scrollList) {
         scrollList.style.marginTop = liHight;
         this.animate=!this.animate;
         var _this = this;
         setTimeout(function(){
           _this.scrollItems.push(_this.scrollItems[0]);
           _this.scrollItems.shift();
           scrollList.style.marginTop= '0px';
           _this.animate=!_this.animate;  // 去除消息回滚的效果
         },this.scrollListProp.scrollTime/2);
       }
     },
     forceUpdate() {
       //this.intStyle();
       this.checkScroll();
     },
   },

   mounted() {
      this.intStyle();
      this.checkScroll();
   },
}
</script>

<style lang="scss" scoped>
  $real-px: 37.5;
  @function calRem($px-input){
     @return ($px-input/$real-px)/2;
  }
  .anim{
    transition: all 0.5s;
  }
  #scrollList {
    li {
      width: calRem(540rem);
      display: block;
      height: calRem(40rem);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      display: flex;
      align-items: center;
    }
  }
</style>
