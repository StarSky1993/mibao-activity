/* 第三方登录
 *  1. 微信
 */
import {getUserAgent} from '@/utils/common.js';
import {thirdPartyLogin} from  '@/api/activity.js';
import {statisEvent} from '@/utils/statisEvent.js';
import {getQueryString} from '@/utils/common.js';
const wxLogin = ()=> {
  let browser = getUserAgent() ;
  if(browser==='wx') {
    // 用户同意授权，获取code
    let code = getWXCode();
    return new Promise((resolve,reject)=>{
      if(code) {
        //计算授权次数
        let routerName = window.location.hash.slice(2).split('?')[0];    // 友盟数据统计 -- 微信授权成功
        statisEvent('微信'+routerName,(getQueryString('channel')?getQueryString('channel'):'')+'微信授权成功');
        //console.log('第三方登录,判断微信号是否绑定蜜宝账号');
        let data = {
          loginMethod: 'weChat',
          authCode:code
        };
        thirdPartyLogin(data).then(resp => {
          //localStorage.removeItem('wx_code');
          localStorage.removeItem('wx_code');
          if(resp.code===200) {
            let data = resp.data || {};
            // 获取到openId，判断绑定信息
            //已绑定，有token
            if(data.token) {
              localStorage.setItem('token',data.token);
              localStorage.setItem('wxBind_json',JSON.stringify(data));
              localStorage.removeItem('open_id');
              resolve({});
            } else if(data.openId) {
              localStorage.setItem('open_id',data.openId);
              localStorage.setItem('wxBind_json',JSON.stringify(data));
              localStorage.removeItem('token');
              //去绑定手机号
              resolve({needBindUser:resp.data.needBindUser||false});
            } else {
              localStorage.removeItem('token');
              localStorage.removeItem('open_id');
              localStorage.removeItem('wxBind_json');
            }
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('open_id');
            localStorage.removeItem('wxBind_json');
            reject();
          }
        }).catch(err => {
          console.log(err);
          reject();
        });
      } else {
       // reject();
      }
    });
  } else {
    console.log("非微信环境");
  }
}
const getWXCode = ()=> {
  let code = localStorage.getItem('wx_code');
  if(code) {
    return code;
  } else {

    //计算授权次数
    let routerName = window.location.hash.slice(2).split('?')[0];    // 友盟数据统计 -- 微信授权成前
    statisEvent('微信'+routerName,(getQueryString('channel')?getQueryString('channel'):'')+'微信授权跳转前');

    /*授权跳转之前保存当前地址，然后在RETURN_PAGE页面里面取出地址返回*/
    localStorage.setItem('oauth_from', window.location.href);
    let wx_auth="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc975efad06e9a41b";
    //授权成功后到oauth2wx中间页
    let REDIRECT_URI = 'https://m.mibaostore.com/oauth2/oauth2wx.html';
    //STATE用来回到发起的服务器页面
    let STATE = window.location.origin + window.location.pathname;
    let authPage = wx_auth + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=snsapi_base&state=' + STATE +  '#wechat_redirect';
    window.location.href = authPage;
  }
}
/**
 * 登录成功的处理
 * */
const loginSuccess = (data)=>{
  let browser = getUserAgent();
  if(browser==='wx') {
    localStorage.setItem('token',data.token);
    localStorage.setItem('wxBind_json',JSON.stringify(data));
    localStorage.removeItem('open_id');
  }
};
export {
  wxLogin,
  loginSuccess
};
