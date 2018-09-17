<template>
  <div id="a20180725">
    <div  class="view-wp">
      <div class="view-content">
        <scroll :pullDownRefresh="false" :pullUpLoad="false">
          <transition-group name='slide-mode'>
            <section class="home" :class="{'gdt':channel=='lbgdt'}" key="home" v-if="this.progress=='home'">
              <div class="main">
                <div class="receive">
                  <div class="left">
                    <div class="name">{{channel=='lbgdt'?'限时好礼，火速领取':'限时好礼，免费领取'}}</div>
                    <div class="percentum">
                      <div class="precent" :style="'width:'+remainPrecent+'%'"></div>
                    </div>
                    <div class="des">手表剩余：{{remainPrecent}}%</div>
                  </div>
                  <div class="right">
                    <div class="btn" @click="receiveAwards">立即领取</div>
                  </div>
                </div>
              </div>
              <div class="rules">
                <div class="times">
                  <h4>活动时间</h4>
                  <p>8月3日-8月31日</p>
                </div>
                <div class="con">
                  <h4>活动规则</h4>
                  <p>1. 验证真实手机号码，即可{{channel=='lbgdt'?'':'免费'}}领取价值148元的抖音同款防水纸质手表。</p>
                  <p>2. 每个手机号仅限领取一只手表。</p>
                  <p>3. 款式随机发放，活动解释权归蜜宝所有。</p>
                </div>
              </div>
            </section>
            <section class="payment" key="payment" v-if="this.progress=='payment'">
              <div class="share-tips">
                <img src="../../../../assets/img/varyActivity/wxShareSpread/wxFission20180725/share_tips.png">
              </div>
              <div class="con" :class="{'qrActive':tabName=='qrCode'}">
                <div class="switchTab">
                  <span @click="switchTab('address')">填写地址</span>
                  <span @click="switchTab('qrCode')">包邮领取<i class="freeTag" v-if="tabName=='address'"><img src="../../../../assets/img/varyActivity/wxShareSpread/wxFission20180725/free_tips.png"></i></span>
                </div>
                <div class="addressCon" v-show="tabName=='address'">
                  <div class="des">填写地址支付邮费等待送货上门</div>
                  <div class="name">
                    <h4>收件人</h4>
                    <input type="text" v-model="receiveName" placeholder="请输入收件人信息">
                  </div>
                  <div class="phone">
                    <h4>手机号</h4>
                    <input type="number" v-model="receivePhone" placeholder="请输入手机号">
                  </div>
                  <div class="address">
                    <div class="add-left">
                      <div class="add-left-row1">
                        <h4>收货地址</h4>
                        <input type="text" v-model="addressPCR" placeholder="所在省份/城市/地区"  @click="showAddress" readonly  unselectable="on" onfocus="this.blur()">
                      </div>
                      <div class="add-left-row2">
                        <input type="text" v-model="receiveAdress" placeholder="请输入详细收件地址">
                      </div>
                    </div>
                    <div class="add-right" @click.stop.prevent="addAddress">
                      <span>{{isHadAdd?'确认 修改':'确认'}}</span>
                    </div>
                  </div>
                  <div class="payBtn" @click="payPostage">支付邮费{{payAmount/100}}元</div>
                </div>
                <div class="qrCodeCon" v-show="tabName=='qrCode'">
                  <div class="des">
                    长按识别二维码，回复 “领奖”<br/>
                    立即包邮
                  </div>
                  <div class="qrCode">
                    <img src="../../../../assets/img/varyActivity/wxShareSpread/wxFission20180725/gzhCode.png" @click="enlargeImg">
                    <p>[ 蜜宝租赁 ]</p>
                  </div>
                </div>
              </div>
              <div class="bottom">活动解释权归蜜宝所有</div>
            </section>
            <wx-result key="resultTips" @enlargeImg="enlargeImg" @rePayment="rePayment"  :wxOptResult="wxOptResultProps" v-if="this.progress=='resultTips'"></wx-result>
          </transition-group>
        </scroll>
        <bind-account ref="bindAccount" @bindSuccess="bindSuccess"></bind-account>
        <city-picker v-if="addressFlag" ref="cityPicker" :defaultSelect="addressDefaultProps" @close="closeCityPicker" @select="citySelect"></city-picker>
        <big-img v-if="showImg" @clickit="closeImg" :imgSrc="imgSrc"></big-img>
      </div>
    </div>
    <set-share ref="share" :shareProps="shareProps" @wxShareSuccess="shareSuccess"></set-share>
  </div>
</template>

<script>
import Toast from '@/components/toast.js';
import {getUserAgent} from '@/utils/common.js';
import {wxLogin} from '@/utils/LoginHelper.js';
import wxResult from '@/components/common/wxOptResult';
import bindAccount from '@/components/common/bindingAccount';
import cityPicker from '@/components/common/cityPicker';
import apiService from '@/api/activity.js';
import {wxFissionInfo,wxFissionNewAddress,wxFissionEditAddress,wxFissionPaymet,wxFissionRcvPrecent} from '@/api/activity.js';
import wxapi from '@/utils/wxapi';
import bigImg from '@/components/common/bigImg';
import {deviceJudge} from '@/utils/mobile.js';
import formData from '@/utils/formData.js';
import verify from "@/utils/verify.js";
import setShare from '@/components/setShare';
import {statisEvent} from '@/utils/statisEvent.js';
export default {
  name: 'wxFission20180725',
  components:{
    wxResult,
    bindAccount,
    cityPicker,
    bigImg,
    setShare
  },
  data() {
    return {
      userAgent:'',
      channel:this.$route.params.channel||this.$route.query.channel||'',
      //needBindUser:sessionStorage.getItem('needBindUser'),
      progress:'',  // 页面进度
      remainPrecent: 70 , // 手表剩余百分比  默认70
      // S 收货信息
      payAmount: 1500,  // 需支付金额
      isHadAdd:false,   // 是否填写过地址
      receiveName:'',   //收件人姓名
      receivePhone:'',  //收件人手机号
      addressPCR:'',  // 省市区结合体
      province:'',    // 省
      city    :'',    // 市
      regoin  :'',    // 区
      receiveAdress:'', //详细地址
      addressId:'',
      tabName :'qrCode', // 支付页面tab切换
      addressFlag : false,
      addAddressFlag:true,  // 修改地址标识位，每5秒修改一次，防止重复点击
      paymentFlag   : true,
      // E 收货信息
      wxOptResultProps: {
        rstPage: '',
        options: {}
      },
      addressDefaultProps: {
        province:'',
        city:    '',
        regoin:  ''
      },
      shareProps: {
        title:"抖音爆款纸手表，戳这里0元免费领~",
        content:"呐！别说有好事不告诉你啊，戳下这里，跟我一起0元拿个抖音同款手表~",
        image:window.location.origin + window.location.pathname + require('@/assets/wxshare/wxFission20180725.jpg').substr(2),
        url:window.location.origin + '/activity/#/a20180725'+(this.$route.query.channel||this.$route.params.channel?'?channel='+this.$route.query.channel||this.$route.params.channel:''),
        isReqShare:false,
        userRecommendCode:''
      },
      showImg: false, // 二维码弹窗
      imgSrc:require('../../../../assets/img/varyActivity/wxShareSpread/wxFission20180725/gzhCode.png'),
    }
  },
  methods: {
    // 页面初始化，判断跳转页面
    initPage() {
      this.userAgent = getUserAgent();
      if(this.userAgent!=='wx') {  // 非微信环境，打开失败
        this.openFaild();
        return ;
      }
      this.getReceivePrecent();   // 手表剩余量
      if((JSON.parse(localStorage.getItem('wxBind_json')) || '{}').token) {     //已绑定手机号
        this.getFissionInfo();
        this.getUserInfo();
      } else {                                                                      //未绑定手机号
        this.progress = 'home';
        if(this.$route.query.hasOwnProperty('binduser'||'bindUser')) {
          //this.needBindUser = true;
          this.$refs.bindAccount.showModel();
        }
      }
    },
    // 获取活动填写进度
    getFissionInfo() {
      this.paymentFlag = false;     // 查询信息时不能支付
      wxFissionInfo().then(resp => {
        if(resp.code == 200) {
          let data = resp.data || {};
          this.payAmount = data.payAmount;
          if(data.orderFissionActivity) {
            this.receiveName = data.orderFissionActivity.name || '';
            this.receivePhone = data.orderFissionActivity.phone || '';
            this.addressDefaultProps.province = this.province = data.orderFissionActivity.province || '';
            this.addressDefaultProps.city     = this.city = data.orderFissionActivity.city || '';
            this.addressDefaultProps.regoin   = this.regoin = data.orderFissionActivity.regoin || '';
            this.addressPCR = this.province+this.city+this.regoin;
            this.receiveAdress = data.orderFissionActivity.receiveAdress || '';
            this.addressId = data.orderFissionActivity.id || '';
            this.isHadAdd = true;   // “已经添加过地址”标志位
            if(data.orderFissionActivity.status && data.orderFissionActivity.status=='pending_pay') {
              this.progress = 'payment';
            } else {
              this.progress = 'resultTips';
              this.wxOptResultProps.rstPage = 'paySuccess';
            }
          } else {
            this.progress = 'home'; // 未填写收货信息，则跳转到首页让用户领取手表
          }
          this.paymentFlag = true;
        } else {
          Toast(resp.message);
          this.progress = 'home';
          this.paymentFlag = true;
        }
      }).catch(err=>{
        console.log('网络错误，请稍后重试');
        this.progress = 'home';
        this.paymentFlag = true;
      });
    },
    // 根据token获取用户信息(主要获取邀请码)
    getUserInfo() {
      formData.getUserToken();
      let _this = this;
      setTimeout(()=>{
        apiService.getPersonalInfo().then(resp => {
          if(resp.code == 200) {
            verify.setUserInfo(resp.data);
            _this.loginSuccess();
          }
        });
      },100);
    },
    loginSuccess() {
      this.shareProps.userRecommendCode = JSON.parse(localStorage.getItem('userJson')).code || '';
      this.$refs.share.loginShare();
    },
    /******S home页*******/
    // 判断奖品领取进度
    getReceivePrecent() {
      wxFissionRcvPrecent().then(resp => {
        if(resp.code == 200) {
          let data = resp.data || {};
          this.remainPrecent = (100 - data.receivePrecent*100) || 0 ;
        } else {
          Toast(resp.message);
        }
      });
    },
    // 首页奖品领取
    receiveAwards() {
      this.userStatisEvent((this.channel?this.channel:'')+'首页立即领取');     // 友盟数据统计
      // 非微信环境，打开失败
      if(this.userAgent!=='wx') {
        this.openFaild();
        return ;
      }
      if(this.remainPrecent <=0) {
        Toast('手表已领完');
        return;
      }
      let wxJson = JSON.parse(localStorage.getItem('wxBind_json') || '{}');
      if(wxJson.needBindUser) {
        //this.needBindUser = true;
        this.$refs.bindAccount.showModel();
      } else if(wxJson.token){
        //this.needBindUser = false;
        this.receivePhone = wxJson.phone;
        this.progress = 'payment';
      } else {
        // 请重新授权
        Toast('授权失败');
        wxLogin();
      }
    },
    // 第三方账号绑定成功
    bindSuccess() {
      this.progress = 'payment';
      this.receivePhone = (JSON.parse(localStorage.getItem('wxBind_json')) || '{}').phone || '';
      this.getUserInfo();   // 获取用户邀请码
    },
    /******E home页*******/
    /******* S 地址填写页 *******/
    //  地址填写与“包邮领取”切换
    switchTab(name) {
      this.tabName = name;
    },
    showAddress() {
      this.addressFlag = true;
      //this.$refs.cityPicker.showCityPicker();
    },
    closeCityPicker() {
      this.addressFlag = false;
    },
    // 选择地址后赋值给页面变量
    citySelect(arg) {
      this.addressDefaultProps.province = this.province = arg.province;
      this.addressDefaultProps.city   = this.city   = arg.city;
      this.addressDefaultProps.regoin = this.regoin = arg.regoin;
      this.addressPCR = this.province + this.city + this.regoin;
      this.addressFlag = false;
    },
    // 新增地址/修改地址
    addAddress() {
      if(!this.trimSpace(this.receiveName)) {Toast('请填写收件人'); return;}
      if(!(this.receivePhone && verify.telCheck(this.receivePhone))) {Toast("请输入正确的手机号码"); return;}
      if(!this.addressPCR) {Toast("请选择收货地址"); return;}
      if(!this.trimSpace(this.receiveAdress)) {Toast("请输入详细收件地址"); return;}
      if(!this.addAddressFlag) {
        return ;
      }
      let params = {
        name    : this.receiveName,
        phone   : this.receivePhone,
        province: this.province,
        city    : this.city,
        regoin  : this.regoin,
        receiveAdress:this.receiveAdress,
        fissoned:true
      };
      this.addAddressFlag = false;
      this.paymentFlag = false;     // 保存信息时不能支付
      if(!this.isHadAdd) {  // 新增地址
        wxFissionNewAddress(params).then(resp => {
          if(resp.code == 200) {
            Toast('保存收货信息成功');
            this.isHadAdd = true;
            this.getFissionInfo();   // 查询地址信息，赋值地址id
            this.userStatisEvent((this.channel?this.channel:'')+'确认收货信息');          //  友盟数据统计--确认收货信息
          } else {
            Toast(resp.message);
            this.paymentFlag = true;
          }
          // 5秒后才可编辑地址
          let _this = this;
          setTimeout(function() {
            _this.addAddressFlag = true;
          },5000);
        }).catch(err =>{
          console.log('网络错误，请稍后重试');
          this.addAddressFlag = true;
          this.paymentFlag = true;
        });
      } else {            // 修改地址
        wxFissionEditAddress(this.addressId,params).then(resp => {
          if(resp.code == 200) {
            Toast('保存收货信息成功');
            this.isHadAdd = true;
            this.getFissionInfo();   // 查询地址信息，赋值地址id
            this.userStatisEvent((this.channel?this.channel:'')+'确认收货信息');          //  友盟数据统计--确认收货信息
          } else {
            Toast(resp.message);
            this.paymentFlag = true;
          }
          // 5秒后才可编辑地址
          let _this = this;
          setTimeout(function() {
            _this.addAddressFlag = true;
          },5000);
        }).catch(err =>{
          console.log('网络错误，请稍后重试')
          this.addAddressFlag = true;
          this.paymentFlag = true;
        });
      }
    },
    // 支付邮费
    payPostage() {
      // 填写地址验证
      if(!this.isHadAdd) {  Toast('请保存收货信息'); return ; }
      if(!this.paymentFlag) { return; }
      let params = {
        returnUrl: window.location.origin+'/activity/#/a20180725',
      };
      this.paymentFlag = false;
      this.userStatisEvent((this.channel?this.channel:'')+'支付邮费');                      // 友盟数据统计--发起支付邮费
      wxFissionPaymet(params).then(resp => {
        if(resp.code == 200) {
          let _this = this;
          let data = resp.data || {};
          if(data.zero) {      // 0元支付  zero:true
            _this.progress = 'resultTips';
            _this.wxOptResultProps.rstPage = 'paySuccess';
            _this.paymentFlag = true;
            _this.userStatisEvent((_this.channel?_this.channel:'')+'成功支付邮费');               // 友盟数据统计--成功支付邮费
          } else {
            wxapi.choosePay(data,function (msg) {
              if(msg && msg=='ok') {
                _this.paymentFlag = true;
                _this.progress = 'resultTips';
                _this.wxOptResultProps.rstPage = 'paySuccess';
                _this.userStatisEvent((_this.channel?_this.channel:'')+'成功支付邮费');          //  友盟数据统计--成功支付邮费
              } else if(msg && msg=='cancel') {
                Toast('取消支付');
                _this.paymentFlag = true;
                _this.userStatisEvent((_this.channel?_this.channel:'')+'取消支付邮费');          //  友盟数据统计--取消支付邮费
              } else {
                Toast('支付失败');
                _this.wxOptResultProps.rstPage = 'payFaild';
                _this.wxOptResultProps.options = data;
                _this.progress = 'resultTips';
                _this.paymentFlag = true;
                _this.userStatisEvent((_this.channel?_this.channel:'')+'支付邮费失败');
              }
              _this.paymentFlag = true;
            });
          }
        } else {
          Toast(resp.message);
          this.paymentFlag = true;
        }
      }).catch(err =>{
        console.log('网络错误，请稍后重试');
        this.paymentFlag = true;
      });
    },
    /* S 地址填写页 切换 “填写地址”、“包邮领取” */
     // 去除字符串前后空格
    trimSpace(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    // 非微信环境，跳转打开失败页面
    openFaild() {
      this.progress = 'resultTips';
      this.wxOptResultProps.rstPage = 'openFaild';
    },
    // 弹出二维码
    enlargeImg(e) {
      if(deviceJudge() == 2) {  // 判断是否为安卓机型
        if(typeof(e) == 'object') {     // 本页二维码放大
          this.showImg = true;
          this.imgSrc = e.currentTarget.src;
        } else if(typeof(e) == 'string') {  // 组件二维码放大
          this.showImg = true;
          this.imgSrc = e;
        }
      }
    },
    closeImg() {
      this.showImg = false;
    },
    shareSuccess() {
      this.userStatisEvent((this.channel?this.channel:'')+'微信分享成功');
    },
    rePayment() {
      this.progress = 'payment';
    },
    userStatisEvent(action,label) {
      if(this.userAgent == 'wx') {
        statisEvent('微信20180725微信裂变',action,label);
      } else if(this.userAgent == 'jd') {
        statisEvent('京东20180725微信裂变',action,label);
      } else if(this.userAgent == 'mibao') {
        statisEvent('APP20180725微信裂变',action,label);
      } else if(this.userAgent == 'alipay') {
        statisEvent('支付宝20180725微信裂变',action,label);
      } else {
        statisEvent('其他渠道20180725微信裂变',action,label);
      }
    },
  },
  beforeMount() {
    if(this.channel=='lbgdt') {  // 广点通渠道中，修改分享内容
      this.shareProps.title = "邀请你加入群聊";
      this.shareProps.content = "“蜜小宝”邀请你加入群聊每日红包福利群，进入可查看详情。";
      this.shareProps.image = window.location.origin + window.location.pathname + require('@/assets/wxshare/wxFission20180725gdt.jpg').substr(2);
    }
  },
  mounted() {
    this.initPage();
  },
  beforeRouteEnter(from,to,next) {
    if(getUserAgent()=="wx") {
      console.log("进入登录授权步骤");
      wxLogin().then(()=>{
        next();
      },()=>{
        console.log('wxFission 授权失败');
        next();
      });
    } else {
      console.log('请在微信环境下打开');
      next();
    }
  },
}
</script>
<style lang="scss" scoped>
  $real-px: 37.5;
  @function calRem($px-input){@return ($px-input/$real-px)/2;}
  div,img,a{padding:0;margin:0;display:block;border:0;}
  input {
    &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #05073E; opacity:1;
    }
    &::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #05073E;opacity:1;
    }
    &:-ms-input-placeholder{
      color: #05073E;opacity:1;
    }
    &::-webkit-input-placeholder{
      color: #05073E;opacity:1;
    }
  }
  .slide-mode-enter-active, .slide-mode-leave-active { // 用于页面之间切换效果
    transition: all 0.3s
  }
  .slide-mode-enter, .slide-mode-leave-active {
    opacity: 0;
  }
  .slide-mode-enter {
    transform: translateX(310px);
  }
  .slide-mode-leave-active {
    transform: translateX(-310px);
  }
  .view-wp{
    position: fixed;left: 0;right: 0;top: 0;bottom: 0;
    background: #433fcb;
    .view-content {
      position: absolute;height: 100%;width: calRem(750rem);left: 0;right: 0;top: 0;margin: 0 auto;
    }
  }
  #a20180725 {
    // 首页样式
    .home {
      background: #433fcb;
      .main {
        box-sizing: border-box;
        width: calRem(750rem);
        height: calRem(1240rem);
        background: url("../../../../assets/img/varyActivity/wxShareSpread/wxFission20180725/home_bg.png") no-repeat top center;
        background-size: contain;
        padding-top: calRem(1028rem);
        .receive {
          box-sizing: border-box;
          width: calRem(728rem);
          height: calRem(200rem);
          padding-top: calRem(56rem);
          background: url("../../../../assets/img/varyActivity/wxShareSpread/wxFission20180725/home_receiveBox_bg.png") no-repeat center;
          background-size: contain;
          margin: 0 auto;
          display: flex;
          .left {
            box-sizing: border-box;
            width: calRem(490rem);
            padding-left: calRem(40rem);
            .name {
              font-size: calRem(32rem);
              color: #FCF000;
              text-shadow: 0 1px 7px #0D0E45;
              margin-bottom: calRem(14rem);
              text-align: left;
            }
            .percentum {
              width: calRem(350rem);
              height: calRem(8rem);
              background: #090B6F;
              border-radius: calRem(8rem);
              margin-bottom: calRem(14rem);
              position: relative;
            }
            .percentum .precent {
              width: 35%;
              height: calRem(8rem);
              border-radius: calRem(8rem);
              position: absolute;
              left: 0;
              bottom: 0;
              background: repeating-linear-gradient(-60deg,#433fbc,#433fbc 3px,#8a92e4 3px,#8a92e4 5px);
            }
            .des {
              font-size: calRem(24rem);
              color: #7B7DD2;
              text-align: left;
            }
          }
          .right {
            padding-top: calRem(10rem);
            .btn {
              width: calRem(188rem);
              height: calRem(82rem);
              background: url("../../../../assets/img/varyActivity/wxShareSpread/wxFission20180725/home_btn.png") no-repeat center;
              background-size: contain;
              text-indent: -9999px;
            }
          }
        }
      }
      // 广点通渠道下替换图片，不再出现0元字样
      &.home.gdt {
        & .main {
          background: url("../../../../assets/img/varyActivity/wxShareSpread/wxFission20180725/home_bg_gdt.png") no-repeat top center;
          background-size: contain;
        }
      }
      .rules {
        padding-bottom: calRem(20rem);
        .times,.con {
          width: calRem(670rem);
          margin: 0 auto;
          position: relative;
          padding-top: calRem(16rem);
          padding-bottom: calRem(30rem);
          & h4 {
            font-weight: normal;
            color: #8A92E4;
            font-size: calRem(28rem);
            text-align: left;
            height: calRem(60rem);
            line-height: calRem(60rem);
            padding: 0;
            margin: 0;
          }
          & p {
            color: #8A92E4;
            font-size: calRem(26rem);
            line-height: calRem(40rem);
            text-align: left;
          }
        }
        .times:after {
          content: "";
          display: block;
          width: 100%;
          height: calRem(2rem);
          background: #8A92E4;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
    // 支付页面/填写地址页面
    .payment {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: url("../../../../assets/img/varyActivity/wxShareSpread/wxFission20180725/payment_bg.png") no-repeat top center #433fcb;
      background-size: 100% auto;
      padding-top: calRem(360rem);
      overflow: hidden;
      & .share-tips {
        width: calRem(268rem);
        height:calRem(80rem);
        position: absolute;
        right: calRem(16rem);
        top: calRem(14rem);
      }
      & .con {
        position: relative;
        z-index: 1;
        width: calRem(720rem);
        height: calRem(698rem);
        margin: 0 auto calRem(88rem);
        background: url("../../../../assets/img/varyActivity/wxShareSpread/wxFission20180725/address_bg.png") no-repeat center;
        background-size: contain;
        &.qrActive {
          background: url("../../../../assets/img/varyActivity/wxShareSpread/wxFission20180725/qrCode_bg.png") no-repeat center;
          background-size: contain;
        }
        .switchTab {
          width: calRem(720rem);
          height: calRem(100rem);
          display: flex;
          justify-content: flex-start;
          & span {
            display: inline-block;
            width: calRem(270rem);
            height: calRem(100rem);
            text-indent: -9999px;
            position: relative;
            & i {
              position: absolute;
              width: calRem(126rem);
              height: calRem(40rem);
              left: calRem(216rem);
              top: calRem(40rem);
              animation: bounce 3s infinite linear;
            }
          }

        }
        .addressCon {
          width: calRem(630rem);
          margin: 0 auto;
          .des {
            height: calRem(110rem);
            line-height: calRem(110rem);
            font-size: calRem(26rem);
            color: #DBDBFF;
            text-align: left;
          }
          .name,.phone {
            box-sizing: border-box;
            width: calRem(630rem);
            height: calRem(88rem);
            background: #2D2F92;
            border-radius: calRem(36rem);
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: calRem(20rem);
            & h4 {
              font-weight: normal;
              font-size: calRem(24rem);
              color: #CCCDFE;
              width: calRem(164rem);
              height: calRem(40rem);
              line-height: calRem(40rem);
              text-align: center;
              margin: 0;
              padding: 0;
              border-right: calRem(2rem) solid #5F5CC9;
            }
            & input {
              width: calRem(440rem);
              height: calRem(88rem);
              border: 0;
              background: transparent;
              text-indent: calRem(16rem);
              color: #CCCDFE;
            }
          }
          .address {
            background: #2D2F92;
            border-radius: calRem(36rem);
            width: calRem(630rem);
            height: calRem(180rem);
            position: relative;
            .add-left {
              box-sizing: border-box;
              padding: 0 calRem(120rem) 0 calRem(30rem);
              position: relative;
              .add-left-row1 {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: calRem(88rem);
                border-bottom: calRem(2rem) solid #5F5CC9;
                & h4 {
                  font-weight: normal;
                  font-size: calRem(24rem);
                  color: #CCCDFE;
                  width: calRem(134rem);
                  height: calRem(40rem);
                  line-height: calRem(40rem);
                  text-align: left;
                  margin: 0;
                  padding: 0;
                  border-right: calRem(2rem) solid #5F5CC9;
                }
                & input  {
                  width: calRem(340rem);
                  height: calRem(88rem);
                  border: 0;
                  background: transparent;
                  text-indent: calRem(16rem);
                  color: #CCCDFE;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
              .add-left-row2 {
                display: flex;
                justify-content: flex-start;
                & input {
                  width: calRem(480rem);
                  height: calRem(88rem);
                  border: 0;
                  background: transparent;
                  //text-indent: calRem(16rem);
                  color: #CCCDFE;
                  &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    text-indent: calRem(150rem);
                  }
                  &::-moz-placeholder { /* Mozilla Firefox 19+ */
                    text-indent: calRem(150rem);
                  }
                  &:-ms-input-placeholder{
                    text-indent: calRem(150rem);
                  }
                  &::-webkit-input-placeholder{
                    text-indent: calRem(150rem);
                  }
                }
              }
            }
            .add-right {
              width: calRem(100rem);
              height: calRem(180rem);
              background: #6466C3;
              border-radius: 0 calRem(36rem) calRem(36rem) 0;
              position: absolute;
              right: 0;bottom: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              & span {
                font-size: calRem(24rem);
                color: #1F2177;
                display: inline-block;
                width: calRem(66rem);
              }
            }
          }
          & .payBtn {
            width: calRem(318rem);
            height: calRem(82rem);
            line-height: calRem(68rem);
            background: url("../../../../assets/img/varyActivity/wxShareSpread/wxFission20180725/payment_btn.png") no-repeat center;
            background-size: contain;
            position: absolute;
            bottom: calRem(-20rem);
            left: 0;right:0;
            margin: 0 auto;
            font-size: calRem(26rem);
            text-align: center;
            color: #FFFFFF;
          }
        }
        .qrCodeCon {
          width: calRem(630rem);
          margin: 0 auto;
          padding-top: calRem(40rem);
          .des {
            font-size: calRem(26rem);
            color: #DBDBFF;
            text-align: center;
            line-height: calRem(40rem);
            margin-bottom: calRem(46rem);
          }
          .qrCode {
            width: calRem(300rem);
            margin: 0 auto;
            & img {
              width: calRem(300rem);
              height: calRem(300rem);
              margin-bottom: calRem(26rem);
            }
            & p {
              font-size: calRem(24rem);
              color: #DBDBFF;
            }
          }
        }
      }
      & .bottom {
        width: 100%;
        text-align: center;
        font-size: calRem(26rem);
        color: #8A92E4;
        padding-bottom: calRem(40rem);
        //position: absolute;
        //bottom: 3vh;
        //z-index: 0;
      }
    }
    @keyframes bounce {
      from,38%, 50%, 62%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        transform: translate3d(0,0,0);
      }

      44%, 56% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, calRem(-8rem), 0);
      }

    }
  }
</style>

