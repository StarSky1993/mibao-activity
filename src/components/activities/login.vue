<template>
   <div class="activity-window">
      <transition name='fade' mode='out-in'>
         <!--S 登陆弹框 -->
         <div id="loginModel" :class="['activity-modal',loginProps.style]" v-if="loginModel">
            <div class="close-btn-wrapper" v-if="loginProps.closeBtnPosition=='top'">
               <div class="close-btn-top" @click.stop.prevent="hideLoginModel()"></div>
            </div>

            <transition-group name='no-mode-fade'>

              <div class="login-wrapper" v-if="codeMode" key="codeLoginMode">
                 <slot class="title" name="title"></slot>
                 <input type="tel" v-model="phone" placeholder="请输入您要登录或注册的手机号">
                 <div v-show="showCaptcha" id="v_container"></div>
                 <div class="code-verify">
                    <input type="number" placeholder="请输入验证码" v-model="phoneCode">
                    <div :class="{'showTimes': !codeFlag}" @click.stop.prevent="getPrepare()">
                       <span v-if='times < 60 && times > 0 '>{{times}}</span><span>{{phoneCodeContent}}</span>
                    </div>
                 </div>
                 <slot name="inviteCode" v-if="loginProps.recommendCode">
                    <input type="text" class="invite-code" v-model="recommendCode" placeholder="邀请人手机号或邀请码（选填）">
                 </slot>
                 <div class="activity-confirm" @click.stop.prevent="codeLogin()">确定</div>
                 <div class="switch-login" @click.stop.prevent="codeMode=false;showCaptcha= false;">密码登录</div>
              </div>

              <div class="login-wrapper" v-if="!codeMode" key="pwdLoginMode">
                 <slot class="title" name="title"></slot>
                 <input type="tel" v-model="phone" placeholder="请输入您要登录的手机号">
                 <input class="pwd" type="password" v-model="pwd" placeholder="请输入密码" autocomplete="off">
                 <div class="activity-confirm" @click.stop.prevent="pwdLogin()">确定</div>
                 <div class="switch-login" @click.stop.prevent="codeMode=true;showCaptcha= false;">短信登录</div>
              </div>

            </transition-group>

            <div class="close-btn-bottom"  @click.stop.prevent="hideLoginModel()" v-if="loginProps.closeBtnPosition=='bottom'"></div>
         </div>
         <!--E 登陆弹框 -->
      </transition>
      <transition name='fade' mode='out-in'>
         <div class="login-mask" v-if="mask"></div>
      </transition>
   </div>
</template>
<script>
import apiService from '@/api/activity.js';
import verify from "@/utils/verify.js";
import Toast from '@/components/toast.js';
import {host} from '@/api/fetch.js';
import formData from '@/utils/formData.js';
import {checkApp,goApplicationLogin} from '@/utils/mobile.js';
import {getUserAgent} from '@/utils/common.js';
export default {
   name: 'loginModel',
   props:{
      loginProps : {
         type: Object,
         default: function () {
           return {
             recommendCode: false,
             style:'pink',
             closeBtnPosition:"top",
             channel:'',
             showLoginModel: false,
           }
         }
      }
   },
   data: function(){
      return {
         userAgent:'',
         codeMode: true,       // 值为true时表示“短信登录”，false时为“密码登录”
         isLogin   : false,
         loginModel: false,
         mask      : false,
         phone        : "",    // 用户输入手机号
         code         : "",    // 用户输入随机码
         showCaptcha  : false, // 是否出现滑块验证

         phoneCode    : "",    // 用户输入手机验证码
         codeFlag     : true,    // 手机验证码能否发送标志位
         phoneCodeContent: "获取验证码",
         times        : 60,
         recommendCode : '',
         codeLoginFlag: true,  // 用户短信验证“确定登录”开关
         channel:this.loginProps.channel||this.$route.params.channel || this.$route.query.channel || verify.getUrlQuery('qd'),
         promotionChannel:this.loginProps.promotionChannel||this.$route.params.promotionChannel || this.$route.query.promotionChannel,
         merchantId:this.$route.query.merchantId || '',
         mid:this.$route.query.mid || '',
         pwd:'',
         pwdLoginFlag:true,
      }
   },
   methods: {
     checkLogin() {
       let _this = this;
       let token = formData.getUserToken();
       setTimeout(function () {
         apiService.getPersonalInfo().then(resp => {
           if(resp.code == 200) {
             verify.setUserInfo(resp.data);
             _this.isLogin = true;
           }
         });
       },300);
     },
      showLoginModel() {
         //如果在mibao里，调用原生登录
         if(this.userAgent == 'mibao'&&!this.loginProps.showLoginModel) {
           goApplicationLogin();
         } else {
           this.loginModel = true;
           this.mask       = true;
         }
      },
      hideLoginModel() {
         this.loginModel = false;
         this.mask       = false;
         this.showCaptcha= false;
      },
      /*S网易验证码登录*/
      getPrepare(){
          const _this = this;
          if(!_this.codeFlag) {
            return;
          }
          if(!(this.phone && verify.telCheck(this.phone))) {
            Toast("请输入正确的手机号码"); return;
          } else {
              _this.codeFlag = false;
              apiService.getPrepare(_this.phone).then((resp) => {
               if(resp.code==2){
                     _this.showCaptcha = true;
                      initNECaptcha({
                          captchaId: '850fededcf364fe6a5a0064597db2d6d',
                          element: '#v_container',
                          mode: 'float',
                          //width: '316px',
                          onVerify: function(err, data) {
                           if(!data) {
                                 // _this.showCaptcha = false;
                                  _this.codeFlag = true;
                              return;
                           }
                              let params={
                                  'tel': _this.phone,
                                  'randomCode': data.validate,
                                  'type': 2
                              }
                             // _this.showCaptcha = false;
                              apiService.getNECaptcha(params).then(resp => {
                                  if(resp.code == 200) {
                                      Toast("验证码已发送");
                                      _this.codeFlag = false;
                                      //倒计时
                                      let interval=setInterval(function () {
                                          _this.times--;
                                          _this.phoneCodeContent = "秒";
                                          if (_this.times <= 0) {
                                              _this.phoneCodeContent = "再次获取";
                                              _this.codeFlag = true;
                                              _this.times = 60;
                                              clearInterval(interval);
                                          }
                                      }, 1000);
                                  } else {
                                      _this.codeFlag = true;
                                      Toast(resp.message);
                                  }
                              })
                          }
                      }, function onload(instance){
                          //console.log('success');
                      })
                  } else if(resp.code==200) {
                      Toast("验证码已发送");
                      _this.codeFlag = false;
                      //倒计时
                      let interval = setInterval(function () {
                          _this.times--;
                          _this.phoneCodeContent = "秒";
                          if (_this.times <= 0) {
                              _this.phoneCodeContent = "再次获取"
                              _this.codeFlag = true;
                              _this.times = 60;
                              clearInterval(interval);
                          }
                      }, 1000);
                  } else {
                      _this.codeFlag = true;
                      Toast(resp.message);
                  }
              })
          }
      },
      codeLogin() {
          var _this = this;
          if(!_this.codeLoginFlag){
            return;
          }
          if(!(_this.phone && verify.telCheck(_this.phone))) {
            Toast("请输入正确的手机号码"); return;
          }
          if(verify.isNull(_this.phoneCode)){
              Toast("请输入您的手机验证码");
              return;
          }
          if(_this.recommendCode && _this.recommendCode.trim().length == 11) {
            if(!verify.telCheck(_this.recommendCode)) {
              Toast("请输入正确的邀请人手机号");
              return ;
            } else if (_this.recommendCode.trim() == _this.phone.trim()) {
               Toast("邀请人手机号不能与当前注册手机号相同");
               return ;
            }
          }
          if(_this.recommendCode && _this.recommendCode.trim().length != 6 && _this.recommendCode.trim().length != 11) {
            Toast("请输入正确的邀请人邀请码");
            return ;
          }
          _this.codeLoginFlag = false;
          const params = {
              "phone": this.phone,
              "code": this.phoneCode,
              "channel": this.channel,
              "promotionChannel": this.promotionChannel,
              "recommendCode": this.recommendCode || (this.$route.query.recommendCode || ''),
              "deviceType": "OTHER",
              "ingressType": "WEB",
              "genre": "activity",
              "merchantId":this.merchantId,
              "mid":this.mid,
          }
          apiService.verify(params).then(resp => {
            if(resp.code == 200) {
              _this.loginSuccess(resp);
            }
            else {
              Toast(resp.message);
            }
            _this.codeLoginFlag = true;
          }).catch(e=>{
            Toast('网络错误，请稍后重试');
            _this.codeLoginFlag = true;
          });
      },
      pwdLogin() {
        var _this = this;
        if(!this.pwdLoginFlag){
          return;
        }
        if(!(this.phone && verify.telCheck(this.phone))) {
          Toast("请输入正确的手机号码"); return;
        }
        if(_this.pwd == ''){
            Toast("请输入密码"); return;
        } else {
          _this.pwdLoginFlag = false;
          var md5=this.crypto.createHash('md5');
          md5.update(this.pwd);
          var pw = md5.digest('hex');
          const params = {
              "phone": this.phone,
              "password": pw,
              "channel": this.channel,
              "promotionChannel": this.promotionChannel,
              "recommendCode": this.recommendCode || (this.$route.query.recommendCode || ''),
              "deviceType": "OTHER",
              "ingressType": "WEB",
              "genre": "activity",
              "merchantId":this.merchantId,
              "mid":this.mid,
          };

          apiService.pwdLogin(params).then(resp => {
            if(resp.code == 200) {
              _this.loginSuccess(resp);
            }
            else {
              Toast(resp.message);
            }
            _this.pwdLoginFlag = true;
          }).catch(e=>{
            Toast('网络错误，请稍后重试');
            _this.pwdLoginFlag = true;
          });
        }
      },
      loginSuccess(resp) {
        localStorage.clear();

        let data = resp.data || {};
        localStorage.setItem('ignore',1);
        localStorage.setItem('token', data.token);
        localStorage.setItem('authenticated', data.authenticated);
        localStorage.setItem('userPhone',data.phone);
        localStorage.setItem('userJson',JSON.stringify(data));

        formData.setUserToken(resp.data.token);
        verify.setUserInfo(resp.data);
        this.isLogin = true;    // 更新登录状态
        this.hideLoginModel(); // 关闭登录框并领取优惠券
        this.$emit('success');
      }
      /*E网易验证码登录*/
   },
   mounted: function() {
     this.checkLogin();
     this.userAgent = getUserAgent();
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
.no-mode-fade-enter-active, .no-mode-fade-leave-active {
  transition: all 0.5s
}
.no-mode-fade-enter, .no-mode-fade-leave-active {
  opacity: 0;
}
.no-mode-fade-enter {
  transform: translateX(310px);
}
.no-mode-fade-leave-active {
  transform: translateX(-310px);
}

.activity-window {
   position: absolute;
   top: 0;
   left: 0;
   .activity-modal {
      position:fixed;
      width:100%;
      height:100%;
      padding-top:calRem(180rem);
      z-index:10;
      left: 0;right:0;top:0;
      //background: rgba(10,10,10,0.5);
      .close-btn-wrapper {
        width: calRem(600rem);
        margin: 0 auto;
        & .close-btn-top {
            width: calRem(70rem);
            height:calRem(100rem);
            margin-left:calRem(530rem);
            //margin-top: calRem(180rem);
            background: url('../../assets/img/varyActivity/coupon/close.png') 0 0 no-repeat;
            background-size: 100%;
        }
     }
     & .login-wrapper{
        position:absolute;
         width: calRem(600rem);
         left:0;right:0;
         margin: 0 auto;
         background: #fff;
         border-radius: calRem(20rem);
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: flex-start;
        & input {
            border: 1px solid #CFCFCF;
            border-radius: calRem(10rem);
            color: #666;
            font-size: calRem(24rem);
            height: calRem(68rem);
            line-height: calRem(68rem);
            background: #fff;
            padding: 0 calRem(23rem);
         }
         &>input {
            width: calRem(510rem);
            margin: 0 auto;
            margin-top: calRem(60rem);
            box-sizing: border-box;
         }
         #v_container {
            position: relative;
            width: calRem(510rem);
            margin: 0 auto;
            margin-top: calRem(32rem);
         }
         .pwd {
           margin-top: calRem(32rem);
         }
         & .code-verify {
            margin: 0 auto;
            margin-top: calRem(32rem);
            width: calRem(510rem);
            display: flex;
            justify-content: space-between;
            align-items: center;
            &>input {
               width: calRem(272rem);
            }
            &>div {
               height: calRem(70rem);
               width:calRem(146rem);
               line-height: calRem(70rem);
               text-align: center;
               font-size: calRem(24rem);
               border-radius: calRem(10rem);
               color: #fff;
               background: linear-gradient(to right, #ec618b, #f74271);
            }
            &>img {
               height: calRem(70rem);
               width: calRem(146rem);
            }
            & .showTimes{
               background:#b73356;
               span {
                  color:#f9a9be;
               }
            }
         }
         .invite-code {
            margin-top: calRem(32rem);
         }
         .activity-confirm {
            width: calRem(552rem);
            height: calRem(100rem);
            line-height: calRem(106rem);
            align-self:center;
            background: url('../../assets/img/varyActivity/coupon/active-coupon.png') 0 0 no-repeat;
            background-size: 100%;
            margin-top: calRem(32rem);
            margin-bottom: calRem(0rem);
            letter-spacing:calRem(6rem);
            text-align: center;
            font-size: calRem(30rem);
            border-radius: calRem(10rem);
            color: #fff;
         }
         .switch-login {
            height:calRem(56rem);
            margin-left:calRem(368rem);
            color: #ff5985;
            font-size:calRem(24rem);
            width: calRem(164rem);
            line-height: calRem(56rem);
            margin-bottom: calRem(20rem);
            background: url('../../assets/img/comm/switch_p.png') right center no-repeat;
            background-size:calRem(28rem);
         }
      }
      & .close-btn-bottom {
         width:calRem(68rem);
         height:calRem(510rem);
         margin:0 auto;
         margin-top:calRem(130rem);
         background: url('../../assets/img/varyActivity/lottery/close.png') bottom center no-repeat;
         background-size: 100% auto;
      }
   }
   // 橘色登录框样式
   .orange {
      & .login-wrapper{
         background:rgba(255,240,218,1);
        & input {
            background: transparent;
            color: #6F3A1A;
            border:1px solid #B99A88;
            &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                color: #B99A88; opacity:1;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
                color: #B99A88;opacity:1;
            }
            &:-ms-input-placeholder{
                color: #B99A88;opacity:1;
            }
            &::-webkit-input-placeholder{
                color: #B99A88;opacity:1;
            }
         }
         & .code-verify {
            margin: 0 auto;
            margin-top: calRem(32rem);
            width: calRem(510rem);
            display: flex;
            justify-content: space-between;
            align-items: center;
            &>input {
               width: calRem(240rem);
            }
            &>div {
               width:calRem(190rem);
               background: linear-gradient(to right, #FFC74F, #FFB86C);
               & span {
                  color:#6F3A1A;
                  line-height:calRem(72rem);
               }
            }
            .showTimes {
               background: linear-gradient(to right, #FFC74F, #FFB86C);
               opacity:0.5;
               & span {
                  color:#6F3A1A;
                  line-height:calRem(70rem);
               }
            }
            &>img {
               width: calRem(190rem);
            }
         }
         .invite-code {
            margin-top: calRem(32rem);
         }
         .activity-confirm {
            background: linear-gradient(to right, #FFC74F, #FFB86C);
            font-family:"PingFangSC-Regulars";
            font-size:calRem(26rem);
            color:rgba(111,58,26,1);
            width: calRem(510rem);
            height:calRem(68rem);
            line-height:calRem(70rem);
            margin-top:calRem(48rem);
            margin-bottom: calRem(14rem);
         }
         .switch-login {
            margin-bottom: calRem(20rem);
            height:calRem(56rem);
            margin-left:calRem(368rem);
            color: #d87526;
            width: calRem(164rem);
            line-height: calRem(56rem);
            margin-bottom: calRem(20rem);
            background: url('../../assets/img/comm/switch_o.png') right center no-repeat;
            background-size:calRem(28rem);
         }
      }
   }

   .login-mask {
      position:fixed;
      left: 0;right:0;top:0;
      width:100%;
      height:100%;
      z-index:8;
      background: rgba(10,10,10,0.5);
   }
}
</style>
