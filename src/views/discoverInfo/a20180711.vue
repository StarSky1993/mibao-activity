<template>
	<div id="a20180711">
    <!--商品0元租-->
    <div  class="view-wp">
      <div class="view-content">
        <scroll  :pullDownRefresh="false" :pullUpLoad="false">
          <div class="wrapper">
            <div class="rules-button" @click="openRules">活动规则</div>
            <section class="banner-area">
              <div class="plant1">
                <img src="../../assets/img/discoverInfo/a20180711/plant1.png">
              </div>
              <div class="plant2">
                <img src="../../assets/img/discoverInfo/a20180711/plant2.png">
              </div>
              <div class="plant3">
                <img src="../../assets/img/discoverInfo/a20180711/plant3_1.png">
                <img src="../../assets/img/discoverInfo/a20180711/plant3_2.png">
              </div>
              <div class="plant4">
                <img src="../../assets/img/discoverInfo/a20180711/plant4.png">
              </div>
              <div class="frag1">
                <img src="../../assets/img/discoverInfo/a20180711/banner-frag1.png">
              </div>
              <div class="frag2">
                <img src="../../assets/img/discoverInfo/a20180711/banner-frag2.png">
              </div>
            </section>
            <section class="counpon-area">
              <div class="img" @click.stop.prevent="getCoupon('0yuan')"><img src="../../assets/img/discoverInfo/a20180711/coupon-img.png"></div>
            </section>
            <section class="goods-area">
              <div class="model1">
                <div class="model1-item" v-for="(item,index) in modelList1" :key="index" @click="goGoodsDetail(item.id,item.name)">
                  <img :src="item.goodsImg">
                  <div class="goods-info">
                    <div class="name">{{item.name}}</div>
                    <div class="des">
                      <div class="op"> <i>蜜宝价:</i><span>{{item.mibaoPrice}}元</span> ({{item.mibaoUnit}}) </div>
                      <div class="rt">租期：{{item.rentTime}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="model2">
                <div class="model-item" v-for="(item,index) in modelList2" :key="index" @click="goGoodsDetail(item.id,item.name)">
                  <img :src="item.goodsImg">
                  <div class="goods-info">
                    <div class="name">{{item.name}}</div>
                    <div class="des">
                      <div class="op"> <i>蜜宝价:</i><span>{{item.mibaoPrice}}元</span> ({{item.mibaoUnit}}) </div>
                      <div class="rt">租期：{{item.rentTime}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="model3">
                <div class="model-item" v-for="(item,index) in modelList3" :key="index" @click="goGoodsDetail(item.id,item.name)">
                  <img :src="item.goodsImg">
                  <div class="goods-info">
                    <div class="name">{{item.name}}</div>
                    <div class="des">
                      <div class="op"> <i>蜜宝价:</i><span>{{item.mibaoPrice}}元</span> ({{item.mibaoUnit}}) </div>
                      <div class="rt">租期：{{item.rentTime}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="more-actvity">
              <div v-for="(item, index) in moreActivity" :key="index" @click="goActivity(item.linkUrl)"><img :src="item.imgUrl"></div>
            </section>
          </div>
        </scroll>
        <coupon-model ref="coupon"></coupon-model>
        <transition name='fade' mode='out-in'>
          <div class="rule-area" v-if="rulesFlag">
          <div class="mask"></div>
          <div class="content">
            <div class="text">
              <p>1. 免租券将根据具体商品进行首月免租（其中商品意外保险需要用户自行承担）；</p>
              <p>2. 免租券领取后有效期为1天；</p>
              <p>3. 仅限活动场景内所展示商品使用；</p>
              <p>4. 活动商品有库存数量限制，请确定剩余数量后进行下单；</p>
              <p>5. 如有疑问，可在【我的—客服】中拨打客服电话或咨询在线客服 ；</p>
              <p>6. 活动最终解释权归蜜宝平台所有。</p>
            </div>
            <div class="close" @click.prevent.stop="closeRules">关闭</div>
          </div>
        </div>
        </transition>
      </div>
    </div>
    <set-share ref="share" :shareProps="shareProps" @wxShareSuccess="shareSuccess"></set-share>
	</div>
</template>

<script>
import CouponModel from '@/components/activities/couponModel';
import {hostUrl} from '@/api/fetch.js';
import {goSchemeUrlOpenAppUi, checkApp, goGoodsDetail} from '@/utils/mobile.js';
import rentPay0 from '@/json/rentPay0/rentPay0.js';
import {getUserAgent} from '@/utils/common.js';
import {statisEvent} from '@/utils/statisEvent.js';
import setShare from '@/components/setShare';
export default {
    name: 'a20180711',
    data() {
        return {
          modelList1:[],
          modelList2:[],
          modelList3:[],
          moreActivity:[],
          rulesFlag: false,
          userAgent:'',
          shareProps: {
            title:"恭喜您获得一张免租券（有限期1天）！",
            content:"iPhone X、Switch及更多商品，仅需0元租！",
            image:window.location.origin + window.location.pathname + require('@/assets/wxshare/20180711.png').substr(2),
            url:window.location.origin + '/activity/#/a20180711'+(this.$route.query.channel?'?channel='+this.$route.query.channel:''),
            activityFlag:"",
            isReqShare:false,
            userRecommendCode:''
          },
        }
    },
    components:{
       'coupon-model':CouponModel,
       'set-share':setShare
    },
    methods: {
      getCoupon(coupon) {
        this.$refs.coupon.getCoupon(coupon);
      },
      goGoodsDetail(goodsId,goodsName) {
        this.userStatisEvent('查看商品',goodsId+'—'+goodsName);
        setTimeout(function() {
          goGoodsDetail(goodsId);
        },200);
      },
      openRules() {
        this.rulesFlag = true;
      },
      closeRules() {
        this.rulesFlag = false;
      },
      goActivity(linkUrl) {
        goSchemeUrlOpenAppUi(linkUrl);
      },
      shareSuccess() {
        this.userStatisEvent('微信分享成功');
      },
      userStatisEvent(action,label) {
        if(this.userAgent == 'wx') {
          statisEvent('微信商品0元租',action,label);
        } else if(this.userAgent == 'jd') {
          statisEvent('京东商品0元租',action,label);
        } else if(this.userAgent == 'mibao') {
          statisEvent('App商品0元租',action,label);
        } else if (this.userAgent == 'alipay') {
          statisEvent('支付宝商品0元租',action,label);
        } else {
          statisEvent('其他渠道商品0元租',action,label);
        }
      },
    },
    mounted() {
      this.modelList1 = rentPay0.model1;
      this.modelList2 = rentPay0.model2;
      this.modelList3 = rentPay0.model3;
      this.moreActivity = rentPay0.moreActivity;

      this.userAgent = getUserAgent();
      this.userStatisEvent('访问页面');
    }
}
</script>
<style lang="scss" scoped>
    $real-px: 37.5;
    @function calRem($px-input){
       @return ($px-input/$real-px)/2;
    }
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
        width: calRem(750rem);
        margin: 0 auto;
        left:0;right:0;
      }
    }
    #a20180711 {
        background:#fff;
        .wrapper {
          background: url("../../assets/img/discoverInfo/a20180711/wrapper-bg.png") no-repeat center top;
          background-size: 100% auto;
          padding-bottom: calRem(264rem);
          position: relative;
          .rules-button {
            width: calRem(200rem);
            height: calRem(68rem);
            padding-top: calRem(4rem);
            font-size: calRem(40rem);
            text-align: center;
            line-height: calRem(68rem);
            border: calRem(2rem) solid #6C5AEC;
            color: #6C5AEC;
            transform: scale(0.5);
            position: absolute;
            right: calRem(-38rem);
            top: calRem(4rem);
            border-radius: calRem(40rem);
            background:rgba(255,255,255,0.7);
            z-index: 3;
          }
          .banner-area {
            width: 100%;
            height: calRem(687rem);
            position: relative;
            overflow: hidden;
            & div {
              position: absolute;
            }
            & .plant1 {
              width: calRem(232rem);
              height: calRem(284rem);
              bottom: calRem(-188rem);
              left: calRem(10rem);
              animation: move1 7000ms infinite linear;
              transform-origin: left bottom;
            }
            & .plant2 {
              width: calRem(154rem);
              height: calRem(206rem);
              bottom: calRem(-110rem);
              right: calRem(0rem);
              animation: move2 3500ms infinite linear;
              transform-origin: right bottom;
            }
            & .plant3 {
              right: 0;
              top: 0;
              animation: move3 3500ms infinite linear;
              transform-origin: right top;
              & img:first-child {
                width: calRem(129rem);
                height: calRem(193rem);
                top: calRem(-52rem);
                right: calRem(-4rem);
                position: absolute;
              }
              & img:nth-child(2) {
                width: calRem(108rem);
                height: calRem(124rem);
                top: calRem(-68rem);
                right: calRem(68rem);
                position: absolute;
              }
            }
            & .plant4 {
              width: calRem(81rem);
              height: calRem(90rem);
              top: calRem(90rem);
              left: calRem(-3rem);
              animation: move4 3500ms infinite linear;
              transform-origin: left top;
            }
            .frag1 {
              width: calRem(148rem);
              height: calRem(87rem);
              bottom: calRem(-16rem);
              right: calRem(92rem);
            }
            .frag2 {
              width: calRem(66rem);
              height: calRem(47rem);
              top: calRem(87rem);
              right: calRem(73rem);
            }
          }
          .counpon-area {
            padding: calRem(78rem) 0 calRem(28rem);
            & .img{
              & img {
                width: calRem(660rem);
                height: calRem(144rem);
                margin: 0 auto;
              }
            }
          }
          .goods-area {
            .model1,.model2,.model3 {
              padding: calRem(104rem) 0 0;
            }
            .model1 {
              width: calRem(724rem);
              margin: 0 auto calRem(30rem);
              .model1-item {
                width: calRem(724rem);
                height: calRem(200rem);
                position: relative;
                & img {
                  position: absolute;
                  width: calRem(724rem);
                  height: calRem(200rem);
                  top: 0;right: 0;left: 0;bottom: 0;
                  margin: 0 auto;
                  z-index: 0;
                }
                .goods-info {
                  position: relative;
                  z-index: 1;
                  padding-left: calRem(300rem);
                  padding-top: calRem(32rem);
                  .name {
                    text-align: left;
                    color: #201870;
                    font-size: calRem(20rem);
                    margin-bottom: calRem(14rem);
                  }
                  .des {
                    display: flex;
                    align-items: flex-end;
                    .op {
                      color: #A7A7A7;
                      font-size: calRem(18rem);
                      text-align: left;
                      margin-right: calRem(30rem);
                      position: relative;
                      & span {
                        font-size: calRem(30rem);
                      }
                      & i {
                        color: #c1c1c1;
                      }
                    }
                    .op:after {
                      content: '';
                      display: block;
                      width: 106%;
                      height: calRem(2rem);
                      transform: scaleY(0.5);
                      position: absolute;
                      bottom: calRem(12rem);
                      left: -3%;
                      background: #A7A7A7;
                    }
                    .rt {
                      color: #A7A7A7;
                      font-size: calRem(18rem);
                      text-align: left;
                    }
                  }
                }
              }
            }
            .model2 .model-item {
              box-shadow: 0 0 calRem(8rem) #106ad3;
            }
            .model3 .model-item {
              box-shadow: 0 0 calRem(8rem) #7440df;
            }
            .model2,.model3 {
              margin: 0 auto;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              width: calRem(704rem);
              .model-item {
                width: calRem(345rem);
                height: calRem(368rem);
                position: relative;
                margin-bottom: calRem(30rem);
                & img {
                  position: absolute;
                  width: calRem(345rem);
                  height: calRem(368rem);
                  top: 0;right: 0;left: 0;bottom: 0;
                  margin: 0 auto;
                  z-index: 0;
                }
                .goods-info {
                  position: relative;
                  z-index: 1;
                  padding-top: calRem(202rem);
                  .name {
                    width: calRem(220rem);
                    margin: 0 auto calRem(8rem);
                    text-align: center;
                    color: #201870;
                    font-size: calRem(20rem);
                    height: calRem(46rem);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                  .des {
                    display: flex;
                    align-items: flex-end;
                    width: calRem(326rem);
                    margin: 0 auto;
                    justify-content: space-between;
                    .op {
                      color: #A7A7A7;
                      font-size: calRem(18rem);
                      text-align: left;
                      position: relative;
                      & span {
                        font-size: calRem(30rem);
                      }
                      & i {
                        color: #c1c1c1;
                      }
                    }
                    .op:after {
                      content: '';
                      display: block;
                      width: 106%;
                      height: calRem(2rem);
                      transform: scaleY(0.5);
                      position: absolute;
                      bottom: calRem(12rem);
                      left: -3%;
                      background: #A7A7A7;
                    }
                    .rt {
                      color: #A7A7A7;
                      font-size: calRem(18rem);
                      text-align: left;
                    }
                  }
                }
              }
            }
          }
          .more-actvity {
            padding-top: calRem(92rem);
            & div {
              width: calRem(724rem);
              height: calRem(170rem);
              margin: 0 auto;
              & img {
                width: 100%;
              }
            }
          }
        }
        .rule-area {
          position: fixed;
          top: 0;left: 0;
          width: 100%;height: 100%;
          z-index: 10;
          .mask {
            position: absolute;
            top: 0;left: 0;
            width: 100%;height: 100%;
            z-index: 10;
            background: rgba(10,10,10,0.8);
          }
          .content {
            position: fixed;
            top: 0;left: 0; right:0;
            padding-top: calRem(200rem);
            width: calRem(586rem);
            margin: 0 auto;
            z-index: 12;
            .text {
              width: calRem(586rem);
              height: calRem(563rem);
              background: url("../../assets/img/discoverInfo/a20180711/rules-bg.png") no-repeat center top;
              background-size: 100% auto;
              margin-bottom: calRem(70rem);
              box-sizing: border-box;
              padding-top: calRem(140rem);
              & p {
                width: calRem(490rem);
                margin: 0 auto calRem(24rem);
                color: #201870;
                font-size: calRem(22rem);
                text-align: left;
                line-height: calRem(28rem);
              }
            }
            .close {
              width: calRem(48rem);
              height: calRem(48rem);
              text-indent: -999px;
              background: url("../../assets/img/discoverInfo/a20180711/close.png") no-repeat center top;
              background-size: contain;
              margin: 0 auto;
            }
          }
        }
        @keyframes move1 {
          0% {transform:rotate(0deg); }
          23% {transform:rotate(-8deg);}
          50% {transform:rotate(1deg);}
          73% {transform:rotate(-10deg);}
          100% {transform:rotate(0deg);}
        }
        @keyframes move2 {
          0% {transform:rotate(6deg); }
          45% {transform:rotate(0deg);}
          100% {transform:rotate(6deg);}
        }
        @keyframes move3 {
          0% {transform:rotate(-3deg) scale(1); }
          45% {transform:rotate(5deg) scale(0.98);}
          100% {transform:rotate(-3deg) scale(1);}
        }
        @keyframes move4 {
          0% {transform:rotate(0deg); }
          45% {transform:rotate(10deg);}
          100% {transform:rotate(0deg);}
        }
    }
</style>
