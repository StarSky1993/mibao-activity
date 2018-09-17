import fetch from './fetch.js'
const apiService = {
	activityGetCode: (data) => fetch({    //通过图片验证码获取短信验证码
        url: '/userLogins/sendCode?phone='+data.tel+"&random="+data.random+"&code="+data.code,
        method: 'get',
        data: data
	}),
	verify: (data) => fetch({  //验证码登录
		url: '/userLogins/sms/login',
		method: 'post',
		data: data
	}),
	getResidueDrawingTimes: () => fetch({  //剩余抽奖次数
		url: '/lottery/getResidueDrawingTimes',
		method: 'get'
	}),
	prizeList: () => fetch({  //获取奖品列表
		url: '/lottery/prizeList',
		method: 'get'
	}),
	draw: () => fetch({  //抽取奖品
		url: '/lottery/draw',
		method: 'post'
	}),
	getDFCoupon: (params) => fetch({      //领券接口
        url: '/user/bonus/receiveCommon',
        method: 'post',
        data: params
	}),
	getHareKey: () => fetch({    //获取抽奖活动吱口令
        url: '/aliShareKey/getAliShareKey?name=lottery',
        method: 'get'
	}),
	getPersonalInfo: ()=> fetch({    // 获取个人信息
        url: '/users/personalInformation',
        method: 'get'
	}),
	// 网易方式登录验证
	getPrepare: (tel) => fetch({   //检验是否需要弹出图片验证码
		url: '/userLogins/prepareSend?phone='+tel,
        method: 'get'
	}),
	getNECaptcha: (params) => fetch({
		url: '/userLogins/send?phone='+params.tel+'&NECaptchaValidate='+params.randomCode+'&type='+params.type,
		method: 'get'
	}),
	pwdLogin: (params) => fetch({  //密码登录
		url: '/userLogins/login',
		method: 'post',
		data: params
	}),
	getCouponInfo: (activity) => fetch({  //根据activityBtn获取优惠券详细信息
		url: '/user/bonus/bonusModelInfo?activityBtn='+activity,
		method: 'get'
	})
}
export default apiService;


/* S 618 抽奖活动 */
export function getLotteryGoods618() {    //  618活动 获取转盘商品
  return fetch({
    url:'/lottery/prizeList',
    method:'get',
  })
}
export function getLotteryDrawingTimes618() {    //  618活动 剩余抽奖次数
  return fetch({
    url:'/lottery/getResidueDrawingTimes',
    method:'get',
  })
}
export function lotteryDraw618() {    //  618活动 抽奖
  return fetch({
    url:'/lottery/draw',
    method:'post',
  })
}
export function getScratchTimes618() {    //  618活动 刮奖次数
  return fetch({
    url:'/lottery/luckyFreeDrawTimes',
    method:'get',
  })
}
export function getScratchResult618() {    //  618活动 提前获知刮奖结果
  return fetch({
    url:'/lottery/preGetDrawLuckyFreeResult',
    method:'get',
  })
}
export function scratch618(id) {    //  618活动 刮奖
  return fetch({
    url:'/lottery/drawLuckyFree/'+ id,
    method:'post',
  })
}
export function getMyPrizeList618() {    //  618活动 转盘抽奖记录
  return fetch({
    url:'/lottery/myPrize',
    method:'get',
  })
}
export function getWinnerList618() {    //  618活动 获奖名单
  return fetch({
    url:'/lottery/winnerList',
    method:'get',
  })
}
/* E 618 抽奖活动 */

/* S 625 世界杯活动 */

export function firstPartScore(params) {    //  活动新用户领取100积分
  return fetch({
    url:'/activity/receiveIntegral',
    method:'post',
    data:params
  })
}
export function userIntegral(activityFlag) {    //  查看用户积分
  return fetch({
    url:'/activity/userIntegral?activityFlag='+activityFlag,
    method:'get'
  })
}
export function scoreRecord(activityFlag) {    //  用户积分记录
  return fetch({
    url:'/activity/findIntegralRecord?activityFlag='+activityFlag,
    method:'get'
  })
}
export function findSignInfo(activityFlag) {    //  查询用户是否签到
  return fetch({
    url:'/activity/findSignInfo?activityFlag='+activityFlag,
    method:'get',
  })
}
export function receiveSign(params) {    //  用户签到
  return fetch({
    url:'/activity/receiveSignIntegral',
    method:'POST',
    data:params
  })
}
export function eliminationList() {    //  淘汰赛竞猜列表----未登录
  return fetch({
    url:'/activity/findLatelyCompetition',
    method:'get'
  })
}
export function eliminationListLogin() {    //  淘汰赛竞猜列表----登录后
  return fetch({
    url:'/activity/findLatelyCompetitionLogin',
    method:'get'
  })
}
export function competitionList() {    //  冠军竞猜列表----未登录
  return fetch({
    url:'/activity/findWinCompetition',
    method:'get'
  })
}
export function competitionListLogin() {    //  冠军竞猜列表----登录后
  return fetch({
    url:'/activity/findWinCompetitionLogin',
    method:'get',
  })
}
export function winCompetition(params) {    //  冠军竞猜
  return fetch({
    url:'/activity/winCompetition',
    method:'post',
    data:params
  })
}
export function winCountry(params) {    //  淘汰赛胜负竞猜
  return fetch({
    url:'/activity/victoryOrDefeatCompetition',
    method:'post',
    data:params
  })
}
export function getUserRanking(activityFlag) {     // 用户积分前十名排行
  return fetch({
    url:'/activity/findIntegralRanking?activityFlag='+activityFlag,
    method:'get'
  })
}
export function getBounsList(activityFlag) {     // 优惠券列表
  return fetch({
    url:'/activity/findBonusByActivity?activityFlag='+activityFlag,
    method:'get'
  })
}
export function exchangeBonus(id) {     // 优惠券兑换
  return fetch({
    url:'/activity/exchangeBonus/'+ id,
    method:'post'
  })
}
export function guessHistory() {     // 竞猜历史
  return fetch({
    url:'/activity/guessingCompetition',
    method:'get'
  })
}
export function guessResult() {     // 竞猜结果
  return fetch({
    url:'/activity/guessingCompetitionResult',
    method:'get'
  })
}
export function shareReceiveIntegral(params) {     // 分享后领取积分
  return fetch({
    url:'/activity/shareReceiveIntegral',
    method:'post',
    data:params
  })
}
export function userInvitationCount() {     // 查询已邀请人数
  return fetch({
    url:'/activity/userInvitationCount',
    method:'get'
  })
}
export function userPrize() {     // 我的奖品
  return fetch({
    url:'/activity/userPrize',
    method:'get'
  })
}
export function bonusBroadcast() {     // 优惠券兑奖成功轮播
  return fetch({
    url:'/activity/bonusBroadcast',
    method:'get'
  })
}
/* E 625 世界杯活动 */

/* S 725 微信裂变 */
/**第三方登录
 * loginMethod:
 * 微信：weChat
 * */
export function thirdPartyLogin(data) {
  return fetch({
    url: "/thirdPartyLogin/" + data.loginMethod,
    method: 'post',
    data:data,
  })
}
/** 绑定第三方账户获取手机验证码
 *  userType:
 *  weChat 支付宝账户绑定
 */
export function getThirdAccountCode(data) {
  return fetch({
    url: "/thirdPartyLogin/sendCode",
    method: 'get',
    params:data,
  })
}

/** 绑定第三方账户
 *  userType:
 *  weChat 支付宝账户绑定
 */
export function bindThirdAccount(userType,data) {
  return fetch({
    url: "/thirdPartyLogin/" + userType + "/bindUser",
    method: 'put',
    data:data,
  })
}
/**
 * 第三方登录图形验证码校验
 * */
export function thirdPartyVerifyCode(data) {
  return fetch({
    url: "/thirdPartyLogin/verifyCode?phone="+data.tel+"&NECaptchaValidate="+data.randomCode+"&type="+data.type,
    method: 'get',
  })
}
// 判断用户参加活动的进度  //微信裂变
export function wxFissionInfo() {
  return fetch({
    url: "/fissionActivity/orderInfo",
    method: 'get',
  })
}
// 裂变活动新增地址
export function wxFissionNewAddress(data) {
  return fetch({
    url: "/fissionActivity/newAddress",
    method: 'post',
    data:data,
  })
}
// 裂变活动修改地址
export function wxFissionEditAddress(id,data) {
  return fetch({
    url: "/fissionActivity/editAddress/"+id,
    method: 'put',
    data:data,
  })
}
// 裂变活动邮费支付
export function wxFissionPaymet(data) {
  return fetch({
    url: "/fissionActivity/payment",
    method: 'post',
    data:data,
  })
}
// 裂变活动手表领取百分比
export function wxFissionRcvPrecent() {
  return fetch({
    url: "/fissionActivity/receivePrecent",
    method: 'get'
  })
}
/* E 725 微信裂变 */



//用户输入手机号领一张优惠券活动  2018.08.13


//该手机号是否注册过
export function VerifyPhone() {
  return fetch({
    url: "/userLogins/isSendCode",
    method: 'post',
  })
}

//手机号领取优惠券
export function PostCouponPhone(data) {
  return fetch({
    url: "/userLogins/receiveBonus/login/" + data.id,
    method: 'post',
    data: data
  })
}
//获取优惠券
export function getOneCoupon(data) {
  return fetch({
    url: "/user/bonus/merchantBonusModelDetail/" + data.id,
    method: 'get',
    data: data
  })
}
//微信分享接口
export function ShareInfo(data) {
  return fetch({
    url: "/share/BonusShareInfo/" + data.id,
    method: 'get',
    data: data
  })
}


