/*微信sdk api*/
import fetch from '@/api/fetch.js';
const isWx = /(MicroMessenger)/i.test(window.navigator.userAgent);

const wxapi = {
  /*获取sdk签名*/
  getSign:function(){
    //console.log('get sign');
    return fetch({
      url: '/share/wxShareParams',
      method: 'get',
      params:{
        currentLink:window.location.href,
      }
    });
  },
  init: function() {
    //console.log('init');
    return new Promise((resolve,reject)=>{
      this.getSign().then(resp => {
          if (resp.code === 200)
          {
            let config = resp.data || {};
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: config.appId, // 必填，公众号的唯一标识
              timestamp: config.timestamp , // 必填，生成签名的时间戳
              nonceStr: config.nonceStr, // 必填，生成签名的随机串
              signature: config.signature,// 必填，签名
              jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表
            });
            resolve();
          }
          else
          {
            //console.log(resp.message);
            reject();
          }
        }
      );
    });
  },
  shareObj:{},
  shareCallback:null,
  share:function(shareObj,callback){
    if(!isWx)
    {
      //console.log('return');
      return;
    }
    //console.log('share');
    this.shareObj=shareObj || {};
    this.shareCallback = callback;
    this.init().then(
      ()=>{
        wxshare();
      }
    );
  },
  choosePay:function (data,callback) {
    WeixinJSBridge.invoke('getBrandWCPayRequest',
      {
        "appId":data.appId,     //公众号名称，由商户传入
        "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
        "nonceStr":data.nonceStr, //随机串
        "package":data.packageValue,
        "signType":data.signType || "MD5",         //微信签名方式：
        "paySign":data.paySign //微信签名
      },
      function(res){
        console.log(res);
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        if(res.err_msg == "get_brand_wcpay_request:ok" ) {
          //console.log('支付成功');
          callback('ok');
        } else if(res.err_msg == "get_brand_wcpay_request:cancel") {
          callback('cancel');
        } else {
          //console.log('支付失败');
          callback(false);
        }
      }
    );
  },
};

const wxshare = function () {
  /*分享到朋友圈*/
  wx.onMenuShareTimeline({
    title: wxapi.shareObj.title, // 分享标题
    link: wxapi.shareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: wxapi.shareObj.imgUrl, // 分享图标
    success: function () {
      wxapi.shareCallback();
    },
    cancel: function () {
    },
  });

  /*分享给朋友*/
  wx.onMenuShareAppMessage({
    title: wxapi.shareObj.title, // 分享标题
    desc: wxapi.shareObj.desc, // 分享描述
    link: wxapi.shareObj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: wxapi.shareObj.imgUrl, // 分享图标
    type: wxapi.shareObj.type || 'link', // 分享类型,music、video或link，不填默认为link
    dataUrl: wxapi.shareObj.dataUrl ||'', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
      wxapi.shareCallback();
    },
    cancel: function () {
    }
  });

  /*分享到qq空间*/
  wx.onMenuShareQQ({
    title: wxapi.shareObj.title, // 分享标题
    desc: wxapi.shareObj.desc, // 分享描述
    link: wxapi.shareObj.link, // 分享链接
    imgUrl: wxapi.shareObj.imgUrl, // 分享图标
    success: function () {
      wxapi.shareCallback();
    },
    cancel: function () {
    }
  });

  /*分享到腾讯微博*/
  wx.onMenuShareWeibo({
    title: wxapi.shareObj.title, // 分享标题
    desc: wxapi.shareObj.desc, // 分享描述
    link: wxapi.shareObj.link, // 分享链接
    imgUrl: wxapi.shareObj.imgUrl, // 分享图标
    success: function () {
      wxapi.shareCallback();
    },
    cancel: function () {
    }
  });

  /*分享到qq空间*/
  wx.onMenuShareQZone({
    title: wxapi.shareObj.title, // 分享标题
    desc: wxapi.shareObj.desc, // 分享描述
    link: wxapi.shareObj.link, // 分享链接
    imgUrl: wxapi.shareObj.imgUrl, // 分享图标
    success: function () {
      wxapi.shareCallback();
    },
    cancel: function () {
    }
  });
};

wx.ready(function(){
  //console.log('ready');
  wxshare();
});

wx.error(function(res){
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});

//微信支付
window.onBridgeReady = ()=>{
  //console.log('onBridgeReady');

};
if (typeof WeixinJSBridge == "undefined"){
  if( document.addEventListener ){
    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
  }else if (document.attachEvent){
    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
  }
}else{
  onBridgeReady();
}

export default wxapi;
