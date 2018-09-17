<template>
   <div id="index_activity">
      <div class="wrapper">
         <!--<div class="activity_1" @click.stop.prevent="goSchemeUrl(linkUrl[0])">
            <img src="../../assets/img/index/20180208/activity01.png">
         </div>-->
         <div class="activity_2" @click.stop.prevent="goSchemeUrl(linkUrl[1])">
            <div class="col-6">
               <img src="../../assets/img/index/20180208/activity02.png">
            </div>
            <div class="col-6" @click.stop.prevent="goSchemeUrl(linkUrl[2])">
               <img src="../../assets/img/index/20180208/activity03.png">
            </div>
         </div>
         <div class="activity_3">
            <div class="col-6" @click.stop.prevent="goSchemeUrl(linkUrl[3])">
               <img src="../../assets/img/index/20180208/activity04.png">
            </div>
            <div class="col-6" @click.stop.prevent="goSchemeUrl(linkUrl[4])">
               <img src="../../assets/img/index/20180208/activity05.png">
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import {hostUrl} from '@/api/fetch.js';
import {goSchemeUrlOpenAppUi} from '@/utils/mobile.js';

export default {
   name: 'indexActivity',
   components:{

   },
   data: function(){
      return {
         linkUrl : [
            hostUrl + 'activity/#/lottery',
            //hostUrl + 'activity/#/apple',
            hostUrl + 'activity/#/a20180701?'+Date.parse(new Date()),
            hostUrl + 'activity/#/travel51?'+Date.parse(new Date()),
            hostUrl + '#/discoverInfo/25?'+Date.parse(new Date()),
            hostUrl + 'activity/#/a20180723?'+Date.parse(new Date())
         ]
      }
   },
   methods: {
     goSchemeUrl(url)
     {
       goSchemeUrlOpenAppUi(url);
     }
   },
   mounted: function() {

   }
}
</script>

<style lang="scss" scoped>
$real-px: 37.5;
@function calRem($px-input){
   @return ($px-input/$real-px)/2;
}
@function doRem($px-input){
   @return $px-input/$real-px;
}
#index_activity
{
   .wrapper {
      background:#fff;
      img {
         display:block;
         width:100%;
         height:auto;
      }
      a {
         display:block;
         margin:0;
         padding:0;
      }
      .activity_1 {
         width:100%;
         overflow: hidden;
         margin:0 auto calRem(20rem);
      }
      .col-6 {
         width:50%;
         box-sizing: border-box;
      }
      .activity_2 {
         width:100%;
         display: flex;
         justify-content: space-between;
         align-items: center;
         & .col-6:nth-child(1) {
            padding-right:calRem(6rem);
            padding-bottom:calRem(6rem);
         }
         & .col-6:nth-child(2) {
            padding-left:calRem(6rem);
            padding-bottom:calRem(6rem);
         }
      }
      .activity_3 {
         width:100%;
         display: flex;
         justify-content: space-between;
         align-items: center;
         & .col-6:nth-child(1) {
            padding-right:calRem(6rem);
            padding-top:calRem(6rem);
         }
         & .col-6:nth-child(2) {
            padding-left:calRem(6rem);
            padding-top:calRem(6rem);
         }
      }
   }
}
</style>
