import {hostUrl} from '@/api/fetch.js';
import router from '@/router';


/*ios和android交互*/

//检查是否在app中打开
const checkApp = ()=>{
  if(window.navigator.userAgent.indexOf('mbApp') !== -1 || window.inApp || window.mibao || (window.webkit && !(/(AlipayClient|MicroMessenger|JDJR|jdapp)/i).test(navigator.userAgent) ))
  {
    return true;
  }
  else
  {
    return false;
  }
};

//判断设备类型
const deviceJudge = ()=> {
  //1-IOS;2-Android
  let u = navigator.userAgent,
    app = navigator.appVersion;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isAndroid) {
    return 2;
  }
  else if(isiOS) {
    return 1;
  }
  else {
    return 0;
  }
};

//通过Scheme Url打开APP指定页面并传入相应的参数
const goSchemeUrlOpenAppUi = (url) => {
  if(checkApp()) {
    let schemeUrl = 'mibaostore://tenancy/h5/?url=' + url;
    if(deviceJudge() === 1) {
      window.webkit.messageHandlers.openAppUiBySchemeUrl.postMessage(encodeURIComponent(schemeUrl));
    } else if(deviceJudge() === 2) {
      window.mibao.openAppUiBySchemeUrl(encodeURIComponent(schemeUrl));
    }
  }
  else
  {
    window.location.href = url;
  }
};
const goSchemeUrlOpenAppUi2 = (name) => {
  let schemeUrl = 'mibaostore://tenancy';
  if(name === 'category') {      // app分类页面
    schemeUrl = schemeUrl + '/tab/1';
  } else if(name === 'coupon') { // app优惠券页面
    schemeUrl = schemeUrl + '/coupons/list/';
  } else {
    schemeUrl = schemeUrl + '/tab/0';
  }
  if(deviceJudge() === 1) {
    window.webkit.messageHandlers.openAppUiBySchemeUrl.postMessage(encodeURIComponent(schemeUrl));
  } else if(deviceJudge() === 2) {
    window.mibao.openAppUiBySchemeUrl(encodeURIComponent(schemeUrl));
  }
};

//打开商品详情页
const goGoodsDetail = (id, channel) => {
  if(checkApp()) {
    let schemeUrl = 'mibaostore://tenancy/pd/detail?gid=' + id + (channel?'&channel='+channel:'');
    if(deviceJudge() === 1) {
      try {
        window.webkit.messageHandlers.openAppUiBySchemeUrl.postMessage(encodeURIComponent(schemeUrl));
        // setTimeout(()=>{
        //   window.location.href = hostUrl + '#/choose/' + id +"?schemeUrl="+ encodeURIComponent(schemeUrl) ;
        // },500);
      }
      catch(e) {}
    }
    else if(deviceJudge() === 2) {
      window.mibao.openAppUiBySchemeUrl(encodeURIComponent(schemeUrl));
      //window.location.href = 'intent://' + 'tenancy/pd/detail?gid=' + id + '#Intent;scheme=mibaostore;package=com.geek.mibao;category=android.intent.category.BROWSABLE;action=android.intent.action.VIEW;end';
    }
  }
  else {
    window.location.href = hostUrl + '#/choose/' + id + (channel?'?channel='+channel:'');
  }
};

//  通知app接收分享内容
const interceptContent = (contentObj) => {
  if(checkApp()) {
    if(deviceJudge() === 1) {
        window.webkit.messageHandlers.onInterceptTagContent.postMessage(contentObj);
    }
    else if(deviceJudge() === 2) {
      window.mibao.onInterceptTagContent(contentObj)
    }
  }
};



//获取用户token
window.tokenCallListener = null;

const getToken = (call) => {
  if(!call) {
    return '';
  }
  if(deviceJudge() === 1) {
    window.tokenCallListener = call;
    window.webkit.messageHandlers.getToken.postMessage({});
  }
  else if(deviceJudge() == 2) {
    let t = window.mibao.getToken();
    call(t);
  }
  else
  {
    return '';
  }
};


//打开登录页面
const goApplicationLogin = () => {
  //isCallback:登录完成后是否需要回调，
  //true登录成功后回调js方法javascript:nativeBridgeJsLoginComplate();

  // let l = localStorage.getItem('toLogin');
  // if(l)
  // {
  //   localStorage.removeItem('toLogin');
  //   setTimeout(function () {
  //     window.location.reload();
  //   },9);
  // }
  // else
  // {
  //   localStorage.setItem('toLogin',1);
    setTimeout(function () {
      if(deviceJudge() === 1)
      {
        let parajson = '{"isCallBack":' + 'true' + '}';
        window.webkit.messageHandlers.showLogin.postMessage(parajson);
      } else if(deviceJudge() == 2) {
        window.mibao.showLogin('true');
      }
    },100);
  //}

};

//  S 在页面中唤起app，如若失败则跳转下载链接
const downloadApp = (url,type)=> {
  if(type) {
    if(type.toLowerCase() == 'h5') {
      openAPPH5Url(url);
    }
  } else {
    openAPPH5Url(url);
  }
  setTimeout(()=>{
    openDownload();
  },1200);
};

const openDownload = () => {
  if(deviceJudge() === 1) {
    window.location.href = "https://itunes.apple.com/cn/app/%E8%9C%9C%E5%AE%9D-%E7%A7%9F%E8%B5%81%E5%B9%B3%E5%8F%B0/id1302755294?mt=8";
  } else {
    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.geek.mibao";
  }
};
const openAPPH5Url = (url) => {
  if(deviceJudge() === 1) {
    window.location.href = getAndroidOpenUrl('tenancy/h5/?url=' + url,true);
  } else {
    window.location.href = getAndroidOpenUrl('tenancy/h5/?url=' + url,true);
  }
};
const getAndroidOpenUrl = (target,isTrue) => {
  let url = '';
  if(isTrue) {
    url = 'mibaostore://' + target;
  } else {
    url = 'intent://' + target + '#Intent;scheme=mibaostore;package=com.geek.mibao;category=android.intent.category.BROWSABLE;action=android.intent.action.VIEW;end';
  }
  return url;
};
//  E 在页面中唤起app，如若失败则跳转下载链接

//ios token 回调
window.iosGetTokenSuccess = function (t) {
  if(window.tokenCallListener) {
    window.tokenCallListener(t);
  }
};

//登录成功回调
window.nativeBridgeJsLoginComplate = function () {
  window.location.reload();
  getToken(function (t) {
    window.token = t;
  });
};

//加载完成回调
window.nativeBridgeJsLoadComplate = function () {
  window.inApp = true;
};

export {
  deviceJudge,
  goSchemeUrlOpenAppUi,
  goSchemeUrlOpenAppUi2,
  goApplicationLogin,
  goGoodsDetail,
  getToken,
  checkApp,
  interceptContent,
  downloadApp,
};
