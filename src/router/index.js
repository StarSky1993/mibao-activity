import Vue from 'vue';
import Router from 'vue-router';
import _import from './_import';
import {getUserAgent} from '../utils/common';
import {getUa} from '../utils/sensors';

const _ua = getUa();

Vue.use(Router);

let routers = [];

const index = [
  {
    name:'activityIndex',
    path:'/',
    component: _import('index'),
    redirect: { name: 'newUserCoupon' },
  },{
    name:'app',
    path:'/index',
    component: _import('index/index'),
    children :[
      {
        path: 'index20180208',    // App --> 蜜宝首页 “精选活动”
        name: 'index20180208',
        component: _import('index/index20180208')
      }
    ]
  },
];
const lottery = [
  {
    path: '/lottery/:channel',   //抽奖活动页面(带渠道号)
    name: 'lottery0110',
    component: _import('varyActivity/lottery/lottery')
  },{
    path: '/lottery',
    component: _import('varyActivity/lottery/lottery')
  },{
    path: '/kangjia',            //抽奖活动页面入口商品
    name: 'kangjia0110',
    component: _import('varyActivity/lottery/lotteryGoods/kangjia')
  },{
    path: '/apple',
    name: 'apple0110',
    component: _import('varyActivity/lottery/lotteryGoods/apple')
  },{
    path: '/switch',
    name: 'switch0110',
    component: _import('varyActivity/lottery/lotteryGoods/switch')
  },{
    path: '/newYear',
    name: 'newYear0110',
    component: _import('varyActivity/lottery/lotteryGoods/newYear')
  },{
    path: '/travel',
    name: 'travel0110',
    component: _import('varyActivity/lottery/lotteryGoods/travel')
  },
  {
    path: '/a20180618',            //京东618抽奖活动
    name: 'a20180618',
    component: _import('varyActivity/lottery/lottery20180618')
  },
];
const loveLetter = [
  {
    path: '/a20180520',             //  520节日
    name: 'loveLetter20180520',
    component: _import('varyActivity/loverLetter/loveLetter20180520')
  },
];
const scoresQuiz = [
  {
    path: '/a20180625',             //  625 世界杯活动
    name: 'a20180625',
    component: _import('varyActivity/scoresQuiz/a20180625')
  }
];
const wxShareSpread = [
  {
    path: '/a20180725/:channel',             //  微信裂变，新用户注册送手表活动
    name: 'wxFission20180725',
    meta: {
      title: '抖音爆款手表免费送'
    },
    component: _import('varyActivity/wxShareSpread/wxFission20180725/wxFission20180725')
  },
  {
    path: '/a20180725',             //  微信裂变，新用户注册送手表活动
    name: 'wxFission20180725_2',
    meta: {
      title: '抖音爆款手表免费送'
    },
    component: _import('varyActivity/wxShareSpread/wxFission20180725/wxFission20180725')
  }
];
const coupon = [
  {
    path: '/receiveCoupon',        //  App (discoverInfo) --> 领取优惠券页面
    name: 'receiveCoupon',
    component: _import('varyActivity/coupon/receiveCoupon')
  },{
    path: '/newUserCoupon',        //  App  --> 新注册领取优惠券
    name: 'newUserCoupon',
    meta: {
      title: '新人来报道，蜜宝送好礼'
    },
    component: _import('varyActivity/coupon/newUserCoupon')
  },
];
const discoverInfo = [
  {
    path: '/apple0209',            //  2018年苹果 “春节” 活动
    name: 'apple0209',
    component: _import('discoverInfo/apple20180209')
  },{
    path: '/womenDay',             //  2018年3.8 “妇女节” 活动
    name: 'womenDay0308',
    component: _import('discoverInfo/womenDay20180308')
  },{
    path: '/travel51',             //  2018年5.1 “劳动节” 活动
    name: 'travel51',
    component: _import('discoverInfo/travel20180501')
  },{
    path: '/MothersDay',             //  2018年 “母亲节” 活动
    name: 'MothersDay',
    component: _import('discoverInfo/MothersDay2018')
  },{
    path: '/a20180601',             //  2018年6.1 “儿童节” 活动
    name: 'a20180601',
    component: _import('discoverInfo/a20180601')
  },
  {
    path: '/a20180609',             //高考考后活动
    name: 'a20180609',
    component: _import('discoverInfo/a20180609')
  },
  {
    path: '/a20180701',              //7-1苹果特惠
    name: 'a20180701',
    component: _import('discoverInfo/a20180701')
  },
  {
    path: '/a20180711',              //7月商品0元租活动
    name: 'a20180711',
    component: _import('discoverInfo/a20180711')
  },
  {
    path: '/a20180716',              //7月商品1元买断活动
    name: 'a20180716',
    component: _import('discoverInfo/a20180716')
  },
  {
    path: '/a20180723',              //7月天生丽质，女性专题
    name: 'a20180723',
    component: _import('discoverInfo/women20180723')
  },
  {
    path: '/a20180730',              //黑科技
    name: 'a20180730',
    component: _import('discoverInfo/technology20180730')
  },
  {
    path: '/a20180731',              //遇见心动的痕迹  相机镜头速配攻略
    name: 'a20180731',
    component: _import('discoverInfo/camera20180731')
  },{
    path: '/a20180817',
    name: 'freeRent20180817',               //8月0元租活动
    component: _import('discoverInfo/freeRent20180817')
  }
];
const spread = [
  {
    name: 'spreadIndex',
    path: '/show',
    component: _import('spread/index')
  },
  {
    name: 'show010',
    path: '/show/down',
    component: _import('spread/show010')
  },{
    name: 'shareTravel51',
    path: '/show/share_travel51',
    component: _import('spread/shareTravel20180501')
  },{
    name: 'rentPay0',
    path: '/show/rentPay0',
    component: _import('spread/rentPay0')
  },{
    name: 'shareTechnology20180802',             //黑科技促下载App页（促下载）
    path: '/show/a20180802',
    component: _import('spread/shareTechnology20180802')
  },{
    name: 'shareFreeRent20180817',               //8月0元租推广页（促下载）
    path: '/show/a20180817',
    component: _import('spread/shareFreeRent20180817')
  }
];
const maps = [
  {
    name:'oauth2wx',
    path:'/oauth2/oauth2wx',
    component: _import('oauth2/oauth2wx'),
  },
];
const goods = [
  {
    name:'goods',
    path:'/goods',
    component: _import('other/goods'),
  },

];


//商户相关
const merchant = [
  {
    name:'merchantCoupon',
    path:'/merchant/coupon/:id',
    component: _import('merchant/coupon'),
  },

];



routers = routers.concat(lottery);
routers = routers.concat(loveLetter);
routers = routers.concat(coupon);
routers = routers.concat(scoresQuiz);
routers = routers.concat(wxShareSpread);
routers = routers.concat(discoverInfo);
routers = routers.concat(spread);
routers = routers.concat(index);
routers = routers.concat(maps);
routers = routers.concat(goods);
routers = routers.concat(merchant);


const router = new Router({
  routes: routers
});

/*友盟统计主动发送数据*/
router.beforeEach((to, from, next)=>{
  if (window._czc) {
    let location = window.location;
    let contentUrl = location.pathname + location.hash;
    let refererUrl = '/';
    window._czc.push(['_trackPageview', contentUrl, refererUrl]);
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

router.afterEach((to, from) => {

  if(window.sa) {
    sa.quick('autoTrackSinglePage',{
      $title:to.meta.title || '蜜宝',
      title:to.meta.title || '蜜宝',
      $url_path:decodeURIComponent(to.path),
      path:decodeURIComponent(to.path),
      params:JSON.stringify(to.params),
      query:JSON.stringify(to.query),
      platformType:_ua,
    });
  }

});

export default router;


