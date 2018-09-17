<template>
	<div class="wxOptResult">
    <!--微信操作结页：支付、绑定、打开失败-->
    <section class="resultTips">
      <div class="share-tips">
        <img src="../../assets/img/comm/wxOptResult/share_tips.png">
      </div>
      <div class="rst-main">
        <!--S 支付成功-->
        <div class="paySuccess" v-if="wxOptResult.rstPage=='paySuccess'">
          <div class="top">
            <div class="ico">
              <img src="../../assets/img/comm/wxOptResult/paySuccess_ico.png">
            </div>
            <div class="des">
              <h4>支付成功</h4>
              <p>
                恭喜！<br/>
                您已成功领取一只抖音同款防水纸表！<br/>
                奖品将在<span>7个工作日内</span>陆续发放，<br/>
                感谢您的耐心等待！<br/>
              </p>
            </div>
          </div>
          <div class="bottom">
            <div class="img"><img src="../../assets/img/comm/wxOptResult/kfCode.png" @click="enlargeImg"></div>
            <div class="des">
              手表物流信息可致电客服热线：400-813-0066 <br/>
              或长按识别上方蜜宝客服二维码获取
            </div>
          </div>
        </div>
        <!--E 支付成功-->
        <!--S 支付失败-->
        <div class="payFaild" v-if="wxOptResult.rstPage=='payFaild'">
          <div class="top">
            <div class="ico">
              <img src="../../assets/img/comm/wxOptResult/fail_ico.png">
            </div>
            <div class="des">
              <h4>支付失败</h4>
              <button @click="repay">重新支付</button>
            </div>
          </div>
          <div class="bottom">
            <div class="img"><img src="../../assets/img/comm/wxOptResult/kfCode.png" @click="enlargeImg"></div>
            <div class="des">
              支付遇到问题？ <br/>
              长按识别上方蜜宝客服二维码咨询吧！
            </div>
          </div>
        </div>
        <!--E 支付失败-->
        <!--S 绑定成功-->
        <div class="bindSuccess" v-if="wxOptResult.rstPage=='bindSuccess'">
          <div class="top">
            <div class="ico">
              <img src="../../assets/img/comm/wxOptResult/bindSuccess_ico.png">
            </div>
            <div class="des">
              <h4>绑定成功</h4>
              <p>
                哇！<br/>
                你已获得领取资格<br/>
                赶快去公众号领取你的专属二维码吧
              </p>
            </div>
          </div>
          <div class="bottom">
            <div class="img"><img src="../../assets/img/comm/wxOptResult/kfCode.png" @click="enlargeImg"></div>
            <div class="des">
              手表领取攻略可致电客服热线：400-813-0066 <br />
              或长按识别上方蜜宝客服二维码获取
            </div>
          </div>
        </div>
        <!--E 绑定成功-->
        <!--S 打开失败-->
        <div class="failCon" v-if="wxOptResult.rstPage=='openFaild'">
          <div class="top">
            <div class="ico">
              <img src="../../assets/img/comm/wxOptResult/openFaild_ico.png">
            </div>
            <div class="des">
              <h4>打开失败</h4>
              <p>
                请前往微信<br/>
                搜索公众号<i>【蜜宝租赁】</i>参与活动哦<br/>
                或截图保存本页面<br/>
                在微信使用“扫一扫”识别打开
              </p>
            </div>
          </div>
          <div class="bottom">
            <div class="img"><img src="../../assets/img/comm/wxOptResult/gzhCode.png" @click="enlargeImg"></div>
            <div class="des">[ 蜜宝租赁 ]</div>
          </div>
        </div>
        <!--E 打开失败-->
      </div>
    </section>
    <big-img v-if="showImg" @clickit="closeImg" :imgSrc="imgSrc"></big-img>
  </div>
</template>
<script>
  import {getUserAgent} from '@/utils/common.js';
  import wxapi from '@/utils/wxapi';
  import Toast from '@/components/toast.js';
  import bigImg from '@/components/common/bigImg';
  import {deviceJudge} from '@/utils/mobile.js';
  const COMPONENT_NAME = 'wxOptResult'
  export default {
    name: COMPONENT_NAME,
    components:{
      bigImg
    },
    props: {
      wxOptResult: {
        type: Object,
        default: function () {
          return {
            rstPage:'',
            options:{},
          }
        }
    	}
    },
    data() {
    	return {
    	  paymentFlag: true,
        showImg: false, // 二维码弹窗
        imgSrc:require('../../assets/img/comm/wxOptResult/kfCode.png'),
      }
    },
    methods: {
      repay() {
        // let _this = this;
        // let data = this.wxOptResult.options || {};
        // _this.paymentFlag = false;
        // wxapi.choosePay(data,function (success) {
        //   if(success) {
        //     _this.progress = 'resultTips';
        //     _this.wxOptResultProps.rstPage = 'paySuccess';
        //   } else {
        //     Toast('支付失败');
        //   }
        //   _this.paymentFlag = true;
        // });
        this.$emit('rePayment');
      },
      enlargeImg(e) {
        // 判断是否为安卓机型
        if(deviceJudge() == 2) {
          this.$emit('enlargeImg',e.currentTarget.src);
        }
      },
      closeImg() {
        this.showImg = false;
      },
    },
    mounted() {
      if(getUserAgent() == 'wx') {
        this.$emit('openFaild');
      }
    }
  }
</script>
<style lang="scss" scoped>
  $real-px: 37.5;
  @function calRem($px-input){@return ($px-input/$real-px)/2;}
  div,img,a{padding:0;margin:0;display:block;border:0;}
  .wxOptResult {
    .resultTips {
        height: 101vh;
        background: url("../../assets/img/comm/wxOptResult/result_bg.png") no-repeat top center #433fcb;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        & .share-tips {
          width: calRem(268rem);
          height:calRem(80rem);
          position: absolute;
          right: calRem(16rem);
          top: calRem(6rem);
        }
        .rst-main {
          width: 92vw;
          padding-top: calRem(90rem);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          // 打开失败
          .failCon,.paySuccess,.payFaild,.bindSuccess {
            width: 100%;
            background: #fff;
            border-radius: calRem(10rem);
            & .top {
              background: #fff;
              position: relative;
              border-radius: calRem(10rem);
              border-bottom: 1px dashed #D6D6D6;
              padding: calRem(110rem) 0 calRem(60rem) 0;
              &:before,&:after {
                content: "";
                display: block;
                width: calRem(20rem);
                height: calRem(40rem);
                background: #433fcb;
                position: absolute;
                bottom: calRem(-20rem);
              }
              &:before {
                border-radius: 0 calRem(40rem) calRem(40rem) 0;
                left: -1px;
              }
              &:after {
                border-radius: calRem(40rem) 0 0 calRem(40rem);
                right: 0;
              }
              & .ico {
                width: calRem(220rem);
                height: calRem(220rem);
                position: absolute;
                top: calRem(-110rem);
                left: 0;right: 0;margin: 0 auto;
              }
              & .des {
                & h4 {
                  font-size: calRem(44rem);
                  color: #050505;
                  font-weight: bold;
                  padding: 0 0 3% 0;
                  margin: 0;
                }
                & p {
                  font-size: calRem(26rem);
                  color: #000000;
                  text-align: center;
                  line-height: calRem(40rem);
                  & i {
                    color: #433fcb;
                  }
                  & span {
                    color: #FF5235;
                    text-decoration: underline;
                  }
                }
                & button {
                  width: calRem(630rem);
                  height: calRem(88rem);
                  line-height: calRem(88rem);
                  background: #FF5235 ;
                  color: #fff;
                  text-align: center;
                  outline: 0;
                  border: 0;
                  border-radius: calRem(200rem);
                  letter-spacing: calRem(1rem);
                  margin: 10% 0 7%;
                  font-size: calRem(28rem);
                }
              }
            }
            & .bottom {
              background: #fff;
              border-radius: calRem(10rem);
              padding-bottom: 8%;
              & .img {
                width: calRem(300rem);
                height: calRem(300rem);
                margin: 0 auto;
                padding: 8% 0 5% 0;
              }
              & .des {
                font-size: calRem(24rem);
                color: #838383;
                text-align: center;
                line-height: calRem(38rem);
              }
            }
          }
          .bindSuccess .top .des p {
            padding: calRem(24rem) 0 calRem(30rem) 0;
          }
        }
      }
  }

</style>
