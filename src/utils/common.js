import {checkApp} from '@/utils/mobile.js';
const getQueryString =function(name)
{
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg) || window.location.href.substr(window.location.href.lastIndexOf('?') + 1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
};

const getUserAgent =function()
{
  let userAgent = window.navigator.userAgent;
  if(userAgent.indexOf('AlipayClient') !== -1)
  {
    return 'alipay';
  }
  else if(userAgent.indexOf('MicroMessenger') !== -1)
  {
    return 'wx';
  }
  else if(userAgent.indexOf('JDJR') !== -1 || userAgent.indexOf('jdapp') !== -1)
  {
    return 'jd';
  }
  else if(userAgent.indexOf('mbApp') !== -1 && checkApp())
  {
    return 'mibao';
  }
  else if(userAgent.indexOf('zhaoliangji') !== -1)
  {
    return 'zlj';
  }
  else
  {
    return 'other';
  }
};

export {
  getQueryString,
  getUserAgent,
}
