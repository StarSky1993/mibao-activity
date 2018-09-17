<template>
	<div class="bindAccount">
    <transition name='fade' mode='out-in'>
      <div class="wrapper" v-if="isShow">
        <div class="content">
          <div class="closeBtn" @click.prevent.stop="closeModel"></div>
          <div class="phone">
            <h4>手机号</h4>
            <div class="inputRow">
              <input type="number" placeholder="请输入你的手机号" v-model="phone">
              <span :class="{'disabled':!phoneCodeFlag}" @click="getPrepare">{{phoneCodeContent}}</span>
            </div>
          </div>
          <div id="v_container" v-show="showCaptcha"></div>
          <div class="phoneCode">
            <h4>验证码</h4>
            <div class="inputRow">
              <input type="text" placeholder="请输入短信验证码" v-model="phoneCode">
            </div>
          </div>
          <div class="bindBtn" @click.prevent.stop="submit">立即绑定</div>
        </div>
        <div class="mask" @click.prevent.stop="getPrepare"></div>
      </div>
    </transition>
  </div>
</template>
<script>
  import Toast from '@/components/toast.js';
  import verify from "@/utils/verify.js";       // 手机号验证
  import {getThirdAccountCode,bindThirdAccount,thirdPartyVerifyCode} from '@/api/activity.js';   // 接口文件
  import {getUserAgent} from '@/utils/common.js';  // 判断浏览器环境
  import {loginSuccess} from '@/utils/LoginHelper.js'; // 账号绑定成功
  import {statisEvent} from '@/utils/statisEvent.js';
  const COMPONENT_NAME = 'bindAccount'
  export default {
    name: COMPONENT_NAME,
    props: {
      bindAccountProps : {
        type: Object,
        default: function () {
          return {
            promotionChannel: "",
          }
        }
      }
    },
    data() {
    	return {
    	  routerName:this.$route.meta.title || this.$route.path.slice(1) || '',
    	  userAgent:'',
        isShow: false,
        phone:'',
        phoneCode:'',
        phoneCodeContent:'获取验证码',
        phoneCodeFlag:true,
        times:60,
        showCaptcha:false, // 是否展示网易图片验证
        submitFlag:true,
        channel:this.$route.params.channel || this.$route.query.channel || '',
	    }
    },
    methods: {
      closeModel() {
        this.isShow = false;
      },
      showModel() {
        this.isShow = true;
      },
      getPrepare() {
        // 标志位判断，是否可以获取验证码
        if(!this.phoneCodeFlag) {
          return;
        }
        // 验证手机号是否正确
        if(!(this.phone && verify.telCheck(this.phone))) {
          Toast("请输入正确的手机号码"); return;
        }
        this.userStatisEvent((this.channel?this.channel:'')+'获取验证码');                     // 友盟数据统计--获取验证码
        let _this = this;
        let data  = {
          phone : this.phone
        };
        getThirdAccountCode(data).then((resp) =>{
          /*S 需要弹出图形验证码*/
          if(resp.code==2) {
            this.showCaptcha = true;
            initNECaptcha({
              captchaId: '850fededcf364fe6a5a0064597db2d6d',
              element: '#v_container',
              mode: 'float',
              //width: '316px',
              onVerify: function(err, data) {  /*S=图形验成功*/
                if(!data) {  // 图形没有验证成功则data为undefined
                  _this.phoneCodeFlag = true;
                  return;
                }
                let params={
                  'tel': _this.phone,
                  'randomCode': data.validate,
                  'type': 2
                }
                thirdPartyVerifyCode(params).then(resp => {  /*S==根据网易验证码发送短信*/
                  if(resp.code == 200) {
                    Toast("验证码已发送");
                    //倒计时
                    _this.phoneCodeFlag = false;
                    _this.countDown();
                  } else {
                    Toast(resp.message);
                    _this.phoneCodeFlag = true;
                  }
                  _this.showCaptcha = false;
                });/*E==根据网易验证码发送短信*/
              }/*E=图形验成功*/
            }, function onload(instance) {
              //console.log('初始化成功');
            });
            /*E 需要弹出图形验证码*/
          } else if(resp.code==200) {
            Toast("验证码已发送");
            // 页面显示验证码倒计时
            _this.phoneCodeFlag = false;
            _this.countDown();
          } else {
            Toast(resp.message);
            _this.phoneCodeFlag = true;
          }
        });
      },
      countDown() {
        let _this = this;
        let interval = setInterval(function () {
          _this.times--;
          _this.phoneCodeContent = _this.times+"秒";
          if (_this.times <= 0) {
            _this.phoneCodeContent = "再次获取"
            _this.phoneCodeFlag = true;
            _this.codeFlag = true;
            _this.times = 60;
            clearInterval(interval);
          }
        }, 1000);
      }, // E 获取验证码倒计时
      submit() {
        if(!this.submitFlag) {
          return;
        }
        if(!(this.phone && verify.telCheck(this.phone))) {
          Toast("请输入正确的手机号码"); return;
        }
        if(verify.isNull(this.phoneCode)){
          Toast("请输入您的手机验证码");
          return;
        }
        if(this.userAgent == 'wx') {
          let wxJson = JSON.parse(localStorage.getItem('wxBind_json') || '{}');
          let data = {
            userType: wxJson.userType||'',
            phone: this.phone,
            openId: wxJson.openId||'',
            channel: this.$route.params.channel || this.$route.query.channel || '',                               //推广渠道
            promotionChannel: this.bindAccountProps.promotionChannel||this.$route.params.promotionChannel || this.$route.query.promotionChannel || '',    // 活动渠道
            recommendCode: this.$route.query.recommendCode || this.$route.query.recommendcode || '',
            code: this.phoneCode,
          };
          this.submitFlag = false;
          bindThirdAccount(data.userType,data).then(resp=>{
            if(resp.code == 200) {
              loginSuccess(resp.data || {});
              this.closeModel();
              this.$emit('bindSuccess');
              this.userStatisEvent((this.channel?this.channel:'')+'绑定手机号成功');                     // 友盟数据统计--绑定手机号成功
            } else {
              Toast(resp.message);
            }
            let _this = this;
            setTimeout(function() {
              _this.submitFlag = true;
            },2000);
          }).catch(err=>{
            console.log(err);
            this.submitFlag = true;
          });
        } else {
          this.submitFlag = true;
          console.log('请在微信环境下操作');
        }
      }, // E 提交表单
      // 友盟数据统计
      userStatisEvent(action,label) {
        if(!this.routerName) {        // 根据传入title，统计页面数据
          return ;
        }
        if(this.userAgent == 'wx') {
          statisEvent('微信'+this.routerName,action,label);
        } else if(this.userAgent == 'jd') {
          statisEvent('京东'+this.routerName,action,label);
        } else if(this.userAgent == 'mibao') {
          statisEvent('APP'+this.routerName,action,label);
        } else if(this.userAgent == 'alipay') {
          statisEvent('支付宝'+this.routerName,action,label);
        } else {
          statisEvent('其他渠道'+this.routerName,action,label);
        }
      },
    },
    mounted() {
      this.userAgent = getUserAgent();
    }
  }
</script>
<style lang="scss" scoped>
$real-px: 37.5;
@function calRem($px-input){@return ($px-input/$real-px)/2;}
div,img,a{padding:0;margin:0;display:block;border:0;}
input {color:#333;}
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
.wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;left: 0;
  z-index: 10;
  overflow: hidden;
  .content {
    box-sizing: border-box;
    position: absolute;
    top: 0;left: 0;right:0;
    margin: calRem(180rem) auto;
    z-index: 11;
    background: #fff;
    width: calRem(560rem);
    height: calRem(692rem);
    border-radius: calRem(10rem);
    padding: calRem(180rem) calRem(40rem) 0;
    .closeBtn {
      position: absolute;
      width: calRem(44rem);
      height: calRem(44rem);
      position: absolute;
      right:calRem(40rem);
      top: calRem(64rem);
      &:before {
        content: "";
        display: inline-block;
        width: calRem(44rem);
        height: calRem(2rem);
        border-radius: calRem(2rem);
        background: #050505;
        transform: rotate(45deg);
        position: absolute;
        right:calRem(0rem);
        top: calRem(20rem);
      }
      &:after {
        content: "";
        display: inline-block;
        width: calRem(44rem);
        height: calRem(2rem);
        border-radius: calRem(2rem);
        background: #050505;
        transform: rotate(-45deg);
        position: absolute;
        right:calRem(0rem);
        top: calRem(20rem);
      }
    }
    #v_container {
      height: calRem(88rem);
      margin-bottom: calRem(40rem);
    }
    .phone,.phoneCode {
      & h4 {
        font-size: calRem(32rem);
        color: #050505;
        text-align: left;
        font-weight: bold;
        padding: 0;
        margin: 0;
      }
      .inputRow {
        width: calRem(480rem);
        height: calRem(88rem);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: calRem(2rem) solid #D8D8D8;
        & input {
          height: calRem(88rem);
          line-height: calRem(88rem);
          border: 0;
          outline: 0;
          background: transparent;
        }
      }
    }
    .phone {
      margin-bottom: calRem(40rem);
      .inputRow {
        & input {
          width: calRem(320rem);
          margin-right: calRem(16rem);
        }
        & span {
          display: block;
          width: calRem(152rem);
          height: calRem(48rem);
          line-height: calRem(48rem);
          background: #3C38B6;
          color: #fff;
          font-size: calRem(24rem);
          text-align: center;
          border-radius: calRem(200rem);
        }
        & span.disabled {
          background: #b9b9b9;
          color: #000;
        }
      }
    }
    .phoneCode {
      margin-bottom: calRem(92rem);
      .inputRow {
        & input {
          width: calRem(480rem);
        }
      }
    }
    .bindBtn {
      width: calRem(318rem);
      height: calRem(82rem);
      background: url("../../assets/img/comm/bindAccount/bind_btn01.png") no-repeat center;
      background-size: contain;
      margin: 0 auto;
      text-indent: -9999px;
    }
  }
  .mask {
    position: absolute;
    top: 0;left: 0;
    width: 100%;
    height: 100%;
    background: rgba(10,10,10,0.5);
  }
}
</style>
