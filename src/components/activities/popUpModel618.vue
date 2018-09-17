<template>
   <div class="popUp">
      <div class="popUp-wrapper" :class="{'rules': popUpProps.name=='rules1'}">
        <div class="close" @click="closePopUp()">
          <div class="line"></div>
          <img src="../../assets/img/varyActivity/popUpModel618/close.png" />
        </div>
        <div class="show">
          <!--没有中奖-->
          <div class="con prizeNo" v-if="popUpProps.name=='prizeNo'">
            <div class="title">没有中奖哦 ~</div>
            <div class="img">
              <img src="../../assets/img/varyActivity/popUpModel618/prize_no.png">
            </div>
            <div class="txt">明天再来试试手气吧</div>
          </div>
          <!--中奖啦-->
          <div class="con prizeActive" v-if="popUpProps.name=='prizeActive'">
            <div class="title">恭喜你中奖啦 ~</div>
            <div class="prizeActiveInfo">
              <p v-if="popUpProps.prizeActive.name">{{popUpProps.prizeActive.name}}</p>
              <p v-if="popUpProps.prizeActive.nameBold">{{popUpProps.prizeActive.nameBold}}</p>
              <p>快去使用吧</p>
            </div>
          </div>
          <!--没有奖励-->
          <div class="con noPrizeList" v-if="popUpProps.name=='noPrizeList'">
            <div class="title">我的奖励</div>
            <div class="img">
              <img src="../../assets/img/varyActivity/popUpModel618/prize_record_no.png" />
            </div>
            <div class="txt">
              <p>您还没有获得奖品哦</p>
              <p>快去抽奖吧 ~</p>
            </div>
          </div>
          <!--奖励列表-->
          <div class="con hasPrizeList" v-if="popUpProps.name=='hasPrizeList'">
            <div class="title">我的奖励</div>
              <div class="lists">
                <div class="item" v-for="(item,index) in popUpProps.lotteryPrizeList" :key="index">
                  <div class="img"><img :src="imageServiceUrl+item.goodsImg" alt="" /></div>
                  <div class="con">
                    <div class="coupon">{{item.prizeNameBold}}</div>
                    <div class="name">{{item.prizeName}}</div>
                    <div class="num"><i class="num-bg"></i><i class="num-txt">X{{item.count}}</i></div>
                  </div>
                </div>
              </div>
          </div>
          <!--规则说明1-->
          <div class="con rules" v-if="popUpProps.name=='rules1'">
            <div class="title">规则说明</div>
            <div class="rules-txt">
              <div class="txt1">
                1、所有京东小白信用用户，6.1-6.20活动期间登录蜜宝，每天可以参与抽奖一次。
              </div>
              <div class="txt1">
                2、抽中的无门槛优惠券及各类免租券将立即发放至蜜宝账号中，可在“我的—优惠券”中查看；抽中iPhone X一年免租券的用户，我们将在2个工作日内联系您并进行后续下单操作。
              </div>
              <div class="txt1">
                3、所有中奖用户均需通过正常的信用审核流程完成下单。完善个人信息可提高您的审核通过率哦。
              </div>
              <div class="txt1">
                4、奖项设置：
                <p>（1）iPhone X一年免租券，限量10张。</p>
                <p>（2）MacBook Air 2017首月免租券，限量50张。</p>
                <p>（3）iPad 2018款首月免租券，限量100张。</p>
                <p>（4）小米9号平衡车，7天免租券，限量200张。</p>
                <p>（5）Switch 游戏机全免券，7天免租券，限量300张。</p>
                <p>（6）大疆晓无人机全免券，3天免租券，限量300张。</p>
                <p>（7）电动牙刷租金全免券，3个月免租券，限量500张。</p>
                <p>（8）Switch游戏卡带租金全免券，14天免租券，限量500张。</p>
                <p>（9）30元全品类优惠券，不限量。</p>
              </div>
            </div>
          </div>
          <!--规则说明2-->
          <div class="con rules" v-if="popUpProps.name=='rules2'">
            <div class="title">规则说明</div>
            <div class="rules-txt shortRules">
              <div class="txt1">
                1、所有京东小白信用用户，6.1-6.20活动期间登录蜜宝，可一次性领取总价值2388元优惠券，每个账号仅限领取一次。
              </div>
              <div class="txt1">
                2、编号¥2388系列优惠券使用有效期均为6.1—6.20。
              </div>
            </div>
          </div>
          <!--规则说明2  App版-->
          <div class="con rules" v-if="popUpProps.name=='rules2App'">
            <div class="title">规则说明</div>
            <div class="rules-txt shortRules">
              <div class="txt1">
                1、6.1-6.20活动期间登录蜜宝，可一次性领取总价值2388元优惠券，每个账号仅限领取一次。
              </div>
              <div class="txt1">
                2、其中有总价值1200元优惠券仅限京东小白信用用户专享，需在京东金融App中搜索蜜宝，租机下单可用。
              </div>
              <div class="txt1">
                3、编号2388元年中神券使用有效期为6.1-6.20。
              </div>
            </div>
          </div>
          <!--规则说明3-->
          <div class="con rules" v-if="popUpProps.name=='rules3'">
            <div class="title">规则说明</div>
            <div class="rules-txt shortRules">
              <div class="txt1">
                1、6.1-6.20期间完成任意订单首付的小白信用用户，可参加“蜜宝幸运免单活动”，参与次数无限制，每租赁成功一款商品即可参与一次。
              </div>
              <div class="txt1">
                2、奖项设置：首期免单和全额免单，我们将在3个工作日内联系您并进行后续返款。
              </div>
              <div class="txt1">
                3、短租类（1月内）商品首期免单即全额免单。综合中奖率10%，快用上编号¥2388优惠券租起来吧！
              </div>
            </div>
          </div>
          <div class="confirm" @click.stop.prevent="closePopUp()">
            <img src="../../assets/img/varyActivity/popUpModel618/btn.png"   />
          </div>
        </div>
      </div>
   </div>
</template>

<script>
import {imageServiceUrl} from '@/api/fetch.js';
export default {
  name: 'popUp',
  props: {
    popUpProps: {
      type: Object,
      default: function () {
        return {
          name: '',
          lotteryPrizeList:[],
          prizeActive:{}
        }
      }
    }
  },
  data: function(){
      return {
        hostUrl:''
      }
   },
   methods: {
     closePopUp() {
       this.$emit("close");
     }
   },
   mounted() {
    this.imageServiceUrl = imageServiceUrl.slice(0,-1);
   },
}
</script>

<style lang="scss" scoped>
$real-px: 37.5;
@function calRem($px-input){
   @return ($px-input/$real-px)/2;
}
.popUp {
  position:fixed;
  width:100%;
  height:100%;
  z-index:99;
  background: rgba(10,10,10,0.8);
  left: 0; top:0;
  overflow: hidden;
 }
.popUp-wrapper {
  width: calRem(520rem);
  margin: 0 auto;
  padding-top: calRem(240rem);
  .close {
    position: relative;
    width: calRem(520rem);
    img {
      position: absolute;
      right: 0;
      width: calRem(36rem);
      height: calRem(36rem);
    }
    & .line {
      position: absolute;
      right: calRem(16rem);
      top: calRem(35rem);
      width: calRem(4rem);
      height: calRem(162rem);
      background: #8be9ff;
    }
  }
}

.show {
  width: calRem(520rem);
  height: calRem(530rem);
  margin-top: calRem(80rem);
  background: url("../../assets/img/varyActivity/popUpModel618/popUpBg_1.png") no-repeat center;
  background-size:contain;
  position: relative;
  z-index: 100;
  box-sizing:border-box;
  padding-top: calRem(50rem);
  .con {
    margin: 0 auto;
    .title {
      font-size: calRem(30rem);
      color: #fff;
      text-align: center;
      margin-bottom: calRem(20rem);
    }
    .img {
      margin: 0 auto;
    }
    .txt {
      color: #fff;
      text-align: center;
    }
  }
  .con.prizeNo {
    width: calRem(450rem);
    .img {
      margin-bottom: calRem(18rem);
    }
    .txt {
      font-size: calRem(30rem);
    }
  }
  .con.noPrizeList {
    width: calRem(450rem);
    .img {
      width: calRem(290rem);
      margin-bottom: calRem(8rem);
    }
    .txt {
      p:first-child{
        font-size: calRem(24rem);
        margin-bottom: calRem(8rem);
      }
      P:last-child {
        font-size: calRem(22rem);
      }
    }
  }
  .con.prizeActive {
    width: calRem(456rem);
    height: calRem(419rem);
    background: url("../../assets/img/varyActivity/popUpModel618/prize_active.png") no-repeat center;
    background-size: contain;
    .prizeActiveInfo {
      padding-top: 54px;
      p{
        color: #fff;
        text-align: center;
      }
      p:nth-child(1) {
        font-size: calRem(24rem);
        margin-bottom: calRem(28rem);
      }
      p:nth-child(2) {
        font-weight: 600;
        font-size: calRem(30rem);
        margin-bottom: calRem(32rem);
      }
      p:nth-child(3) {
        font-size: calRem(20rem);
      }
    }
  }
  .lists {
    width: calRem(450rem);
    height: calRem(290rem);
    position: absolute;
    left: 0; right:0;
    margin: 0 auto;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      position: relative;
      margin-top: calRem(31rem);
      margin-bottom: calRem(22rem);
      .img {
        //border: 1px solid #0368A9;
        border-radius: 100%;
        height: calRem(62rem);
        width: calRem(62rem);
        overflow: hidden;
        position: absolute;
        z-index: 111;
        left: 50%;
        margin-left: calRem(-31rem);
        top: calRem(-31rem);
        background: #fff;
        img {
          width: 100%;
          height: auto;
        }
      }
      .con {
        overflow: hidden;
        position: relative;
        width: calRem(212rem);
        height: calRem(122rem);
        border-radius: calRem(6rem);
        border: 1px solid #0368A9;
        background: #FF9BC7;
        .coupon {
          width: calRem(120rem);
          height: calRem(52rem);
          line-height:calRem(54rem);
          color: #fff;
          font-size: calRem(18rem);
          background:url("../../assets/img/varyActivity/popUpModel618/couponName_bg.png") no-repeat center;
          background-size: contain;
          margin: calRem(34rem) auto calRem(7rem);
        }
        .name {
          color: #EB2972;
          font-size: calRem(20rem);
          text-align: center;
        }
        .num {
          position: absolute;
          width: calRem(70rem);
          height: calRem(70rem);
          top: 0;
          right: 0;
          .num-txt {
            color: #fff;
            font-size: calRem(16rem);
            letter-spacing: calRem(-2rem);
            position: absolute;
            text-align: right;
            right: calRem(7rem);
            top: calRem(4rem);
          }
          .num-bg {
            width: calRem(70rem);
            height: calRem(70rem);
            border-radius: 100%;
            position: absolute;
            background:#f95794 ;
            top: calRem(-40rem);
            right: calRem(-25rem);
          }
        }
      }
    }
  }
  .con.rules {
    .title {
      margin-bottom: calRem(30rem);
    }
    .rules-txt {
      width: calRem(450rem);
      height: calRem(600rem);
      overflow-y: scroll;
      margin:0 auto;
      color: #fff;
      text-align: left;
      padding-bottom: calRem(34rem);
      box-sizing: border-box;
      .txt1{
        font-size: calRem(24rem);
        line-height: calRem(30rem);
        margin-bottom: calRem(16rem);
        p {
          font-size: calRem(22rem);
          margin-bottom: calRem(8rem);
        }
      }
    }
    .rules-txt.shortRules {
      height: calRem(264rem);
      overflow-y: scroll;
      padding-bottom: calRem(32rem);
    }
  }
}
.popUp-wrapper.rules {
  padding-top: calRem(100rem);
  & .show {
    width: calRem(519rem);
    height: calRem(842rem);
    margin-top: calRem(80rem);
    background: url("../../assets/img/varyActivity/popUpModel618/popUpBg_2.png") no-repeat center;
    background-size:contain;
  }
}
.confirm {
  width: calRem(508rem);
  height: calRem(134rem);
  box-sizing:border-box;
  padding-top: calRem(28rem);
  background: url("../../assets/img/varyActivity/popUpModel618/btn_bg.png") no-repeat center;
  background-size:contain;
  position: absolute;
  bottom:calRem(10rem);
  left: 0; right: 0;
  margin: 0 auto;
  box-shadow: 0px -3px 10px #2094eb;
  img {
    width: calRem(386rem);
    height: calRem(81rem);
    display: block;
    margin: 0 auto;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
}

</style>
