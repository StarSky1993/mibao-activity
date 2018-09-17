let getUa = function()
{
  var userAgent = window.navigator.userAgent;
  var _ua = '';
  if(userAgent.indexOf('AlipayClient') !== -1)
  {
    _ua =  '支付宝';
  }
  else if(userAgent.indexOf('MicroMessenger') !== -1)
  {
    _ua = '微信';
  }
  else if(userAgent.indexOf('JDJR') !== -1 || userAgent.indexOf('jdapp') !== -1)
  {
    _ua = '京东';
  }
  else if(userAgent.indexOf('mbApp') !== -1)
  {
    _ua = '蜜宝APP';
  }
  else if(userAgent.indexOf('zhaoliangji') !== -1)
  {
    _ua = '找靓机';
  }
  else
  {
    _ua = '普通浏览器';
  }
  
  return _ua;
};

export {getUa};

const sensors = {
  install:function (Vue, options)
  {
    Vue.prototype.$sa = function (eventName,properties){
    
      if(window.sa)
      {
        let prop = {
          platformType:getUa(),
          activityName:eventName,
          ...properties
        };
        window.sa.track('activityEvent', prop);
      }
    };
  }
};

export default sensors;
