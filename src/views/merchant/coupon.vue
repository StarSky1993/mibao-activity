<template>
  <div class="content">
    <div class="box">
      <div class="title">
        <p class="storeImg" >
          <img :src="coupon.merchantShopLogo" alt="" v-if="coupon.merchantShopLogo">
          <img src="../../assets/img/merchant/defaultImg.png" v-else>
        </p>
        <span>{{coupon.bonusModel.merchantNames}}偷偷塞给你一张券</span>
      </div>
      <div class="container1">
        <div class="zhi">
          <i class="gold"></i>
          <div :class="coupon.bonusModel.type=='cash'?'coupon':'coupon2'">
            <div class="num">
              <span :class="(coupon.bonusModel.price/100+'').length< 4 ? 'price' : 'price2'">{{coupon.bonusModel.price/100}}</span>
              <span class="Noka" v-if="coupon.bonusModel.moneyOffRole === -1">无门槛</span>
              <span class="Noka" v-else>满{{coupon.bonusModel.moneyOffRole/100}}可用</span>
            </div>
            <div class="info">
              <h2>{{coupon.bonusModel.name}}</h2>
              <span class="title1" v-if="coupon.bonusModel.note">·{{coupon.bonusModel.note}}</span>
              <span class="title2">·{{coupon.bonusModel.typeStr}}</span>
              <span class="title2">·{{coupon.bonusModel.useStartTime | moment}}至{{coupon.bonusModel.useEndTime | moment}}</span>
            </div>
          </div>
        </div>
        <div class="redBox">
          <p v-if="step === 0">
            <input type="number" class="phoneNum" placeholder="请输入您的手机号" maxlength="11" v-model="phone">
            <button class="submit" @click.stop.prevent="submit()" id="code">点击领取</button>
          </p>

          <div class="success" v-if="step !== 0">
            <div class="top">
              <span class="item1">礼券已放置账户</span>
              <span class="item2">{{phone}}</span>
              <span class="item3" @click.stop.prevent="edit()">修改&gt;</span>
            </div>
            <div class="bottom">
              <span class=""item4>登录App即可使用</span>
            </div>
            <button class="submit2" @click.stop.prevent="use()">立即使用</button>
          </div>

          <i class="plant"></i>
          <i class="people overlay"></i>
        </div>
      </div>
      <div class="rules">
        <h2>·&nbsp;使用规则</h2>
        <ul class="list">
          <li>1.请确保蜜宝账号与领券手机号保持一致</li>
          <li>2.礼券可在下单时抵扣相应费用，每单限使用一张礼券</li>
          <li>3.本券不得兑换现金，不设找零</li>
          <li>4.最终解释权归蜜宝所有</li>
        </ul>
      </div>
      </div>
    <set-share ref="share" :shareProps="shareProps" @wxShareSuccess="shareSuccess"></set-share>
  </div>
</template>

<script>
  //引入手机号校验方法
  import verify from "../../utils/verify.js";
  //提示信息
  import Toast from '@/components/toast.js';
  import {VerifyPhone,PostCouponPhone,getOneCoupon,ShareInfo} from '@/api/activity.js';
  //微信分享
  import setShare from '@/components/setShare';
  export default {
    name: "merchant-coupon",
    data() {
      return {
        //防止表单重复提交
        disabled: false,
        merchantId: '',
        coupon: {
          bonusModel:{
            id: '',
            merchantNames: '',
            type: '',
            price: '' ,
            moneyOffRole: '',
            name: '',
            note: '',
            useEndTime: ''
          },
          merchantShopLogo: ''
        },
        couponType: 1,
        phone: '',
        step:0,
        button: '点击领取',
        id:this.$route.params.id,
        channel:this.$route.query.channel,
        // sending:false,
        check: null,
        validata: null,
        shareProps: {
          title:"",
          content:"",
          // image:window.location.origin + window.location.pathname + require('@/assets/wxshare/camera20180731.jpg').substr(2),
          // url:window.location.origin + '/activity/#/a20180731'+(this.$route.query.channel?'?channel='+this.$route.query.channel:''),
          // isReqShare:false,
          // userRecommendCode:''
          image: '',
          url: window.location.origin + '/activity/#/merchant/coupon/' + this.$route.params.id + (this.$route.query.channel?'?channel='+this.$route.query.channel:'')
        }
      }
    },
    components:{
      'set-share':setShare,
    },
    mounted(){
      let that = this;
      that.getCouponInfo();
      initNECaptcha({
        captchaId: '850fededcf364fe6a5a0064597db2d6d',
        element: '#code',
        mode: 'popup',
        width: '260px',
        onVerify: function (err, data) {
          that.validata = data.validate;
          //手机号验证
          PostCouponPhone({
            id: that.id,
            phone: that.phone,
            channel: that.channel,
            NECaptchaValidate: that.validata,
            captchType: 2
          }).then(resp=>{

            if(resp.code===200)
            {
              that.step = 2;
            }
            else {
              Toast(resp.message);
            }
          })
          if(err) {   //这里对错误进行处理
            that.check.destroy();  //可以执行销毁或者刷 refresh
          }
        }
      }, function(instance) {
        that.check = instance;  //将实例保存到data中
        // console.log(instance);  //注意看一下里面打印出来的一些属性和方法
      }, function(err) {

      })
      //微信分享接口
      ShareInfo({
        id: this.id
      }).then(resp=>{
        if(resp.code === 200) {
          this.shareProps = resp.data;
          this.shareProps.title = resp.data.title;
          this.shareProps.content = resp.data.content;
          this.shareProps.image = resp.data.shareImg;
          this.shareProps.url = resp.data.shareUrl;
        }
      })

    },
    filters:{
      //将后台时间戳转成日期
      moment(timestamp)
      {
        let date = new Date(timestamp);

        let year = date.getFullYear();//年
        let month = date.getMonth()+1;//月份（月份是从0~11，所以显示时要加1）
        let day = date.getDate();//日期
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getMilliseconds();

        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (h < 10) h = "0" + h;
        if (m < 10) m = "0" + m;
        if (s < 10) s = "0" + s;

        return year + '-' + month + '-' + day;
      }
    },
    methods: {
      getCouponInfo()
      {
        getOneCoupon({
          id: this.id,
        }).then(resp=>{
          if(resp.code===200)
          {
            console.log(resp.data)
            this.coupon = resp.data || [];
            this.merchantId = resp.data.bonusModel.merchantIds;
          }
          else
          {
            Toast(resp.message);
          }

        })
      },
      //立即领取
      submit() {
        if(!verify.telCheck(this.phone)) {
          Toast('请输入正确的手机号');
          return;
        }
        //判断手机号是否注册过
        VerifyPhone().then(resp=>{
          let that = this;
          if(resp.code === 200) {
            if(resp.data === true) {
              this.check && this.check.popUp();
              initNECaptcha({
                captchaId: '850fededcf364fe6a5a0064597db2d6d',
                element: '#code',
                mode: 'popup',
                width: '260px',
                onVerify: function (err, data) {
                  that.validata = data.validate;
                  //手机号验证
                  PostCouponPhone({
                    id: that.id,
                    phone: that.phone,
                    channel: that.channel,
                    NECaptchaValidate: that.validata,
                    captchType: 2
                  }).then(resp=>{

                    if(resp.code===200)
                    {
                      that.step = 2;
                    }
                    else {
                      Toast(resp.message);
                    }
                  })
                  if(err) {   //这里对错误进行处理
                    that.check.destroy();  //可以执行销毁或者刷 refresh
                  }
                }
              }, function(instance) {
                that.check = instance;  //将实例保存到data中
                // console.log(instance);  //注意看一下里面打印出来的一些属性和方法
              }, function(err) {

              })
            }
          }
        })
      },
      //修改手机号
      edit() {

        this.step = 0;

      },
      //立即使用
      use() {
        window.location.href = window.location.origin +  '/#/store/storePage/' + this.merchantId;
      },
      shareSuccess() {
        //this.userStatisEvent('微信分享成功');
      },
    }
  }
</script>

<style lang="scss" scoped>
  $real-rem: 37.5;
  @function calRem($rem-input){
    @return ($rem-input/$real-rem);
  }
  img {
    border: none;
  }
  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-bottom: calRem(40rem);
    background-color: #0232b8;
    .box {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: calRem(700rem);
      position: absolute;
      background-image: url("../../assets/img/merchant/background.png");
      background-repeat: no-repeat;
      background-size: 100% calRem(615rem);
      .title {
        display: flex;
        position: absolute;
        width: calRem(345rem);
        height: calRem(40rem);
        line-height: calRem(40rem);
        opacity: 0.65;
        background: #000000;
        margin-top: calRem(11rem);
        margin-left: calRem(15rem);
        border-radius: calRem(8rem);
        margin-bottom: calRem(19rem);
      .storeImg {
        width: calRem(28rem);
        height: calRem(28rem);
        background-color: #fff;
        border-radius: 50%;
        border: none;
        margin: calRem(6rem) calRem(10rem) calRem(6rem) calRem(15rem);
        box-sizing: border-box;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      span {
        display: block;
        height: calRem(40rem);
        line-height: calRem(40rem);
        font-size: calRem(14rem);
        font-family: PingFangSC-Regular;
        color: #E2E2E2;
      }
    }
    .container1 {
      width: calRem(342rem);
      height: calRem(392rem);
      margin: 0 auto;
      position: absolute;
      left: calRem(25rem);
      top: calRem(70rem);
      .zhi {
        width: calRem(350rem);
        height: calRem(392rem);
        background: url("../../assets/img/merchant/red_packets2.png") no-repeat;
        background-size: calRem(342rem) 100%;

      .gold {
        display: block;
        width: calRem(43.5rem);
        height: calRem(44.5rem);
        position: absolute;
        right:  calRem(20rem);
        top: 0;
        background: url("../../assets/img/merchant/gold.png") no-repeat;
        background-size: 100% 100%;
      }
      .coupon {
        display: flex;
        width: calRem(290rem);
        height: calRem(94rem);
        background: url("../../assets/img/merchant/miquan.png") no-repeat;
        background-size: calRem(290rem) calRem(94rem);
        position: absolute;
        left: calRem(17rem);
        top: calRem(64rem);
        padding: calRem(6rem) calRem(7rem);
        box-sizing: border-box;
        .num {
          width: calRem(168rem);
          height: calRem(70rem);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .price {
            max-width: calRem(83rem);
            overflow:hidden;
            padding-left: calRem(10rem);
            box-sizing: border-box;
            font-family: PingFangSC-Medium;
            font-size: calRem(22rem);
            color: #FF0000;
            line-height: calRem(22rem);
            position: relative;
            &:after {
              position: absolute;
              display: block;
              content: '¥';
              font-size: calRem(14rem);
              left: calRem(0rem);
              top: calRem(2rem);
            }
          }
          .price2 {
            max-width: calRem(83rem);
            overflow:hidden;
            padding-left: calRem(6rem);
            box-sizing: border-box;
            font-family: PingFangSC-Medium;
            font-size: calRem(16rem);
            color: #FF0000;
            line-height: calRem(22rem);
            position: relative;
            &:after {
              position: absolute;
              display: block;
              content: '¥';
              font-size: calRem(12rem);
              left: calRem(-1rem);
              top: calRem(2rem);
            }
          }
          .Noka {
            max-width: calRem(83rem);
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            box-sizing: border-box;
            margin-top: calRem(4rem);
            padding: calRem(2rem) calRem(8rem);
            background: #CFB98B;
            color: #fff;
            border-radius: calRem(2rem);
          }
        }
        .info {
          width: calRem(385rem);
          height: calRem(80rem);
          display: flex;
          text-align: left;
          flex-direction: column;
          h2 {
            width: calRem(150rem);
            height: calRem(22rem);
            text-align: left;
            line-height: calRem(22rem);
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            font-size: calRem(16rem);
            color: #333333;
            margin-top: calRem(10rem);
            margin-left: calRem(13rem);
          }
          .title1 {
            width: calRem(150rem);
            height: calRem(14rem);
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            font-family: PingFangSC-Regular;
            font-size: calRem(12rem);
            margin-left: calRem(10rem);
            color: #B6B6B6;
            margin-top: calRem(2rem);
          }
          .title2 {
            margin-top: calRem(5rem);
            margin-left: calRem(10rem);
            font-family: PingFangSC-Regular;
            font-size: calRem(12rem);
            color: #B6B6B6;
            line-height: calRem(12rem);
            text-align: left;
          }
        }
      }
      .coupon2 {
        display: flex;
        width: calRem(290rem);
        height: calRem(94rem);
        background: url("../../assets/img/merchant/baoquan.png") no-repeat;
        background-size: calRem(290rem) calRem(94rem);
        position: absolute;
        left: calRem(17rem);
        top: calRem(64rem);
        padding: calRem(6rem) calRem(7rem);
        box-sizing: border-box;
        .num {
          width: calRem(168rem);
          height: calRem(70rem);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .price {
            max-width: calRem(83rem);
            overflow:hidden;
            padding-left: calRem(10rem);
            box-sizing: border-box;
            font-family: PingFangSC-Medium;
            font-size: calRem(22rem);
            color: #FF0000;
            line-height: calRem(22rem);
            position: relative;
            &:after {
              position: absolute;
              display: block;
              content: '¥';
              font-size: calRem(14rem);
              left: calRem(0rem);
              top: calRem(2rem);
            }
          }
          .price2 {
            max-width: calRem(83rem);
            overflow:hidden;
            padding-left: calRem(6rem);
            box-sizing: border-box;
            font-family: PingFangSC-Medium;
            font-size: calRem(16rem);
            color: #FF0000;
            line-height: calRem(22rem);
            position: relative;
            &:after {
              position: absolute;
              display: block;
              content: '¥';
              font-size: calRem(12rem);
            }
          }
          .Noka {
            max-width: calRem(83rem);
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            box-sizing: border-box;
            margin-top: calRem(4rem);
            padding: calRem(2rem) calRem(8rem);
            background: #CFB98B;
            color: #fff;
            border-radius: calRem(2rem);
          }
        }
        .info {
          width: calRem(385rem);
          height: calRem(80rem);
          display: flex;


          flex-direction: column;
          h2 {
            width: calRem(132rem);
            height: calRem(22rem);
            line-height: calRem(22rem);
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            font-size: calRem(16rem);
            color: #333333;
            margin-top: calRem(10rem);
            margin-left: calRem(13rem);
          }
          .title1 {
            width: calRem(132rem);
            height: calRem(14rem);
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            font-family: PingFangSC-Regular;
            font-size: calRem(12rem);
            margin-left: calRem(10rem);
            color: #B6B6B6;
            margin-top: calRem(2rem);
          }
          .title2 {
            margin-top: calRem(5rem);
            margin-left: calRem(13rem);
            font-family: PingFangSC-Regular;
            font-size: calRem(12rem);
            color: #B6B6B6;
            line-height: calRem(12rem);
            text-align: left;
          }
        }
      }
      }
      .redBox {
        width: calRem(350rem);
        height: calRem(280rem);
        background: url("../../assets/img/merchant/red_packets1.png") no-repeat;
        background-size: calRem(365rem) calRem(280rem);
        position: absolute;
        bottom: calRem(-25rem);
        left: calRem(-18rem);
        .phoneNum::-webkit-input-placeholder{text-align: center;}
        .phoneNum {
          display: block;
          width: calRem(260rem);
          height: calRem(40rem);
          line-height: calRem(40rem);
          font-size: calRem(14rem);
          text-align: center;
          box-sizing: border-box;
          border-radius: calRem(100rem);
          background: #fff;
          outline: none;
          position: absolute;
          bottom: calRem(110rem);
          left: 50%;
          margin-left: calRem(-130rem);
        }
        .success {
          display: flex;
          flex-direction: column;
          width: calRem(260rem);
          height: calRem(68rem);
          position: absolute;
          left: 50%;
          bottom: calRem(60rem);

          margin-left: calRem(-130rem);
          .top {

            height: calRem(17rem);
            .item1 {
              font-family: PingFangSC-Regular;
              font-size: calRem(12rem);
              color: #A21003;
            }
            .item2 {
              font-family: PingFangSC-Regular;
              font-size: calRem(12rem);
              color: #FBD404;
            }
            .item3 {
              font-family: PingFangSC-Regular;
              font-size: calRem(12rem);
              color: #FBD404;
            }
          }

          .bottom {
            height: calRem(12rem);
            margin-top: calRem(7rem);
            font-family: PingFangSC-Regular;
            font-size: calRem(12rem);
            color: #FBD404;
            line-height: calRem(12rem);
            .item4 {
              font-family: PingFangSC-Regular;
              font-size: calRem(12rem);
              color: #FBD404;
            }
          }
        }
        .submit {
          display: block;
          width: calRem(260rem);
          height: calRem(40rem);
          border-radius: calRem(100rem);
          background: #f9e04e;
          outline: none;
          border: none;
          position: absolute;
          bottom: calRem(55rem);
          left: 50%;
          margin-left: calRem(-130rem);
          color: #6f3800;
          font-size: calRem(15rem);
        }
        .submit2 {
          display: block;
          width: calRem(260rem);
          height: calRem(40rem);
          border-radius: calRem(100rem);
          background: #f9e04e;
          outline: none;
          border: none;
          position: absolute;
          bottom: calRem(-20rem);
          left: 50%;
          margin-left: calRem(-130rem);
          color: #6f3800;
          font-size: calRem(15rem);
        }
        .plant {
          width: calRem(89rem);
          height: calRem(61.5rem);
          position: absolute;
          bottom: calRem(15rem);
          left: calRem(-4rem);
          background: url("../../assets/img/merchant/plant.png") no-repeat;
          background-size: 100% 100%;
        }
        .people {
          width: calRem(123.5rem);
          height: calRem(170.5rem);
          position: absolute;
          right: calRem(-20rem);
          bottom: calRem(-35rem);
          background: url("../../assets/img/merchant/people.png");
          background-size: 100%;
        }
      }
    }
      .rules {
        position: absolute;
        top: calRem(440rem);
        width: 100%;
        height: calRem(120rem);
        padding-left: calRem(14rem);
        margin-top: calRem(50rem);
        box-sizing: border-box;
        display: flex;
        justify-content: start;
        text-align: left;
        flex-direction: column;
        color: #5482FD;
        h2 {
          margin-top: calRem(7rem);;
          font-family: PingFangSC-Medium;
          font-size: calRem(14rem);
          color: #5482FD;
          letter-spacing: 0;
          line-height: calRem(14rem);
          display: block;
          height: calRem(14rem);
        }
        .list {
          font-size: calRem(12rem);
          li {
            margin-top: calRem(5rem);
          }
        }
      }
  }
  }
  /*允许穿透图片点击事件*/
   .overlay {
     pointer-events: none;
   }
</style>
