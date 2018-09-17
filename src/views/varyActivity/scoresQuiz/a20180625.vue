<template>
	<div class="a20180625">
    <div  class="view-wp">
      <div class="view-content">
        <div class="category-tabs" ref="fixedTabs">
          <div @click="scrollToModel('location1')"><img src="../../../assets/img/varyActivity/scoresQuiz/a20180625/top01.png"><span>竞猜赢积分</span></div>
          <div @click="scrollToModel('location2')">
            <img src="../../../assets/img/varyActivity/scoresQuiz/a20180625/top02.png">
            <span>积分换好礼<br /><i v-if="userScore!=0">{{userScore}}分</i></span>
          </div>
          <div @click="scrollToModel('location3')"><img src="../../../assets/img/varyActivity/scoresQuiz/a20180625/top03.png"><span>为你推荐</span></div>
        </div>
        <scroll  ref="activity625" :pullDownRefresh="false" :pullUpLoad="false" :scrollTab="'scrollTab'" :probeType="3" @showTab="showTab()" @hideTab="hideTab()">
          <div class="wrapper" :class="{other:userAgent!='wx',noElimination:eliminationTeamList.length == 0}">
            <div class="rules" @click="showPopUp('rules')"></div>
            <section class="top">
              <div class="myScores" id="scrollTab" @click="showMyScore">
                <span>我的积分</span>
                <span v-if="isLogin">{{userScore}}</span>
              </div>
              <div class="sign">
                <span>tips:连续签到，积分加倍哟~</span>
                <span :class="{signed:userSigned,unsigned:!userSigned}" @click="userSign">签到领积分</span>
              </div>
              <div class="moreScore" @click="shareActivity">
                <span>获取更多积分</span>
                <span><img src="../../../assets/img/varyActivity/scoresQuiz/a20180625/moreScore.png"></span>
              </div>
            </section>
            <!--S 竞猜赢积分-->
            <section class="guessing" id="location1">
              <h3 class="section-tit">
                <span><img src="../../../assets/img/varyActivity/scoresQuiz/a20180625/guessing-tit.png"></span>
                <span @click="checkGuessRecord('guessRecord')"><img src="../../../assets/img/varyActivity/scoresQuiz/a20180625/myGuessingBtn.png"></span>
              </h3>
              <div class="elimination" v-if="eliminationTeamList.length != 0">
                <div class="swiper-container" id="groupContainer">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in eliminationTeamList" :key="index">
                      <div class="groupItem">
                        <div class="countDown">倒计时{{eliminationCountHandle[index]&&eliminationCountHandle[index].day!=0?eliminationCountHandle[index].day+'天':''}}{{eliminationCountHandle[index]?eliminationCountHandle[index].hour:''}}:{{eliminationCountHandle[index]?eliminationCountHandle[index].minute:''}}</div>
                        <div class="startTime"><i></i>{{item.worldCupCompetition.startTime}}<i></i></div>
                        <div class="country">
                          <div class="country1" :class="{hasChoosed: item.cuntryFlag == item.worldCupCompetition.flag1}">
                            <div class="scoreRate">赢{{item.worldCupCompetition.country1Odds}}倍</div>
                            <div class="falg-img"><img :src="item.worldCupCompetition.nationalFlag1" :alt="item.worldCupCompetition.country1"></div>
                            <div class="name">{{item.worldCupCompetition.country1}}</div>
                          </div>
                          <div class="vs"></div>
                          <div class="country2" :class="{hasChoosed: item.cuntryFlag == item.worldCupCompetition.flag2}">
                            <div class="scoreRate">赢{{item.worldCupCompetition.country2Odds}}倍</div>
                            <div class="falg-img"><img :src="item.worldCupCompetition.nationalFlag2" :alt="item.worldCupCompetition.country2"></div>
                            <div class="name">{{item.worldCupCompetition.country2}}</div>
                          </div>
                        </div>
                        <div class="supportRate">
                          <div class="figure">
                            <div class="leftRate" :style="{width: item.rateOfSupport1/(item.rateOfSupport1+item.rateOfSupport2)*100+'%'}"></div>
                          </div>
                          <div class="des">当前支持率（{{item.rateOfSupport1}}:{{item.rateOfSupport2}}）</div>
                        </div>
                        <div class="guessBtn" :class="{hasGuessed:item.participated}" @click="guessCountry(index)">{{item.participated?'已参与':'立即竞猜'}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="champion">
                <div class="beforeGuess" v-if="!championAccess">
                  <div class="des">7月4日9:00开启竞猜通道</div>
                  <div class="countTime">
                    <span><i>{{(champCTimeDate.day||'').slice(0,1)}}</i><i>{{(champCTimeDate.day||'').slice(1,2)}}</i><i>天</i></span>
                    <span><i>{{(champCTimeDate.hour||'').slice(0,1)}}</i><i>{{(champCTimeDate.hour||'').slice(1,2)}}</i><i>时</i></span>
                    <span><i>{{(champCTimeDate.minute||'').slice(0,1)}}</i><i>{{(champCTimeDate.minute||'').slice(1,2)}}</i><i>:</i></span>
                    <span><i>{{(champCTimeDate.second||'').slice(0,1)}}</i><i>{{(champCTimeDate.second||'').slice(1,2)}}</i><i>秒</i></span>
                  </div>
                </div>
                <div class="champion-con" v-if="championAccess">
                  <div class="rate">赢{{championWinRate}}倍</div>
                  <div class="countries">
                    <div class="country" :class="{disabled:item.worldCupCountry.eliminated}" @click="guessChampion(index)" v-for="(item,index) in championList" :key="index">
                      <span><img :src="item.worldCupCountry.nationalFlag"></span>
                      <span>{{item.worldCupCountry.country}}</span>
                      <span :class="{hasGuess:item.participated,winner:!item.worldCupCountry.eliminated&&championBorn}">{{!item.worldCupCountry.eliminated&&championBorn?'已夺冠':(item.worldCupCountry.eliminated?'已淘汰':(item.participated?'加注':'支持'))}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!--E 竞猜赢积分-->
            <!--S 积分换好礼-->
            <section class="exchange" id="location2">

              <h3 class="section-tit">
                <span><img src="../../../assets/img/varyActivity/scoresQuiz/a20180625/exchange-tit.png"></span>
                <span @click="checkMyCoupons()"><img src="../../../assets/img/varyActivity/scoresQuiz/a20180625/myBonusBtn.png"></span>
              </h3>

              <!--S 榜单奖品-->
              <div class="prizeHot">
                <div class="prizeTab">
                  <div class="userRanking" :class="{active:prizeHotTab=='userRanking'}" @click="setPrizeHotTab('userRanking')">前10名排行</div>
                  <div class="prizeInfo" :class="{active:prizeHotTab=='prizeInfo'}" @click="setPrizeHotTab('prizeInfo')">奖品信息</div>
                </div>
                <div class="con">
                  <div class="myScore" v-if="isLogin">我的积分：{{userScore}}（{{userRankingNum==0?'未上榜':'第'+userRankingNum+'名'}}）</div>
                  <div class="myScore" v-if="!isLogin">暂未登录</div>
                  <div class="conList">
                    <div class="conList-userRanking" v-show="prizeHotTab=='userRanking'">
                      <div class="tit">
                        <span>排名</span>
                        <span>奖品</span>
                        <span>用户手机号</span>
                        <span>当前积分</span>
                      </div>
                      <table class="userRanking-con">
                        <tr class="userInfo" v-for="(item,index) in userRankingList" :key="index">
                          <td>{{item.num}}</td>
                          <td>{{item.name}}</td>
                          <td>{{item.phone}}</td>
                          <td>{{item.integral}}</td>
                        </tr>
                      </table>
                    </div>
                    <div class="conList-prizeInfo" v-show="prizeHotTab=='prizeInfo'">
                      <div class="swiper-container" id="prizeInfo">
                        <div class="swiper-wrapper">
                          <div class="swiper-slide">
                            <div class="conList-prizeInfo-con">
                              <div class="prizeItem" v-for="(item,index) in prizeGoodsList" :key="index">
                                <img :src="item.imgUrl">
                                <div class="des">
                                  <span>{{item.name}}</span>
                                  <span>({{item.bonus}})</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="des">【截止至7月20日前10名获得】</div>
                </div>
              </div>
              <!--E 榜单奖品-->

              <!--S 奖券兑奖滚动区域-->
              <div class="ticketSuces">
                <div class="scroll-wrapper">
                  <scroll-list :scrollListProp="scrollListProp" ref="scrollList"></scroll-list>
                </div>
              </div>
              <!--E 奖券兑奖滚动区域-->

              <!--积分兑换-->
              <div class="exchange-area">
                <div class="coupon">
                  <div class="coupon-item" v-for="(item,index) in couponList" :key="index">
                    <div class="price">
                      <img :src="require('../../../assets/img/varyActivity/scoresQuiz/a20180625/'+ item.price/100 +'-coupon.png')">
                      <span>元</span>
                    </div>
                    <div class="coupon-des">{{item.note}}</div>
                    <div class="number">剩余：{{item.bonusNumber}}</div>
                    <div class="cost" :class="{disabled:item.bonusNumber==0 || isShowMyAwards}" @click="exchangeCoupon(index)">{{item.integralExchange}}积分兑换</div>
                  </div>
                  <div class="des">兑换奖池每日10:00更新</div>
                </div>
                <!--为你推荐-->
                <div class="switchTab" id="location3">
                  <span :class="{active:activeRcmTabIndex==index}" @click="switchRcmTab(index)" v-for="(item,index) in rcmTabsData" :key="index">{{item}}</span>
                </div>
                <div class="recommend">
                  <div class="tit"><i></i>为你推荐<i></i></div>
                  <div class="goods-con">
                    <div class="goodsItem" @click="goChooseDetail(item.id,item.name)" v-for="(item,index) in rcmGoodsData" :key="index">
                      <div class="goods-des">
                        <div class="goods-des-top">
                          <div class="goods-tit">{{item.name}}</div>
                          <div class="goods-oriPrice">原价：{{item.originalPrize}}元</div>
                        </div>
                        <div class="mibao">
                          <div class="price">
                            <!--<span>蜜宝价</span>-->
                            <span>{{item.mibaoPrize}}元</span>
                          </div>
                          <div class="rentTime">
                            <!--<span>租期</span>-->
                            <span>{{item.mibaoUnit}}</span>
                          </div>
                        </div>
                        <div class="discount">
                          <div class="price">
                            <!--<span>优惠价</span>-->
                            <span>{{item.discontPrize}}元</span>
                          </div>
                          <div class="rentTime">
                            <!--<span>租期</span>-->
                            <span>{{item.discontUnit}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="img">
                        <img :src="item.imgUrl">
                      </div>
                    </div>
                  </div>
                  <div class="more-goods" @click="goGoodscategory">
                    更多商品可用优惠
                    <img src="../../../assets/img/varyActivity/scoresQuiz/a20180625/moreGoods.png">
                  </div>
                </div>
              </div>

            </section>
            <!--E 积分换好礼-->
            <section class="bottom">
              <div class="qrCode" v-if="(userAgent=='wx')">
                <img @click="enlargeImg($event)" src="../../../assets/img/varyActivity/scoresQuiz/a20180625/qrCode.png">
              </div>
              <p class="p1">
                — 活动最终解释权归蜜宝平台所有 —
              </p>
              <p class="p2">
                如有疑问,可在【我的—客服】中拨打 <br />
                客服电话或咨询在线客服
              </p>
            </section>
          </div>
        </scroll>
        <!--登录框-->
        <login-model ref="login" @success="loginSuccess()" :loginProps="loginProps"></login-model>
        <!--S 弹窗-->
        <transition name='fade' mode='out-in'>
          <pop-up :popUpProps="popUpProps" @close="closePopUp" @loginFailed="loginFailed" @switchPopUp="switchPopUp" @refreshModel="refreshModel" v-if="popUpFlag"></pop-up>
        </transition>
        <!--E 弹窗-->
        <big-img v-if="showImg" @clickit="closeImg" :imgSrc="imgSrc"></big-img>
      </div>
    </div>
    <div id="mibaoShareContent" style="display: none">
      {
        "title": "{{shareStringBody.title}}",
        "content": "{{shareStringBody.content}}",
        "image": "{{shareImage}}",
        "url": "{{appShareUrl}}",
        "activityFlag":"worldCup",
        "isReqShare": {{shareStringBody.isReqShare}}
      }
    </div>
	</div>
</template>

<script>
  import popUp from '@/components/activities/popUpModel625';     // 页面弹窗
  import loginModel from '@/components/activities/login';
  import scrollList from '@/components/activities/scrollList';
  import formData from '@/utils/formData.js';
  import apiService from '@/api/activity.js';
  import verify from '@/utils/verify.js';
  import {findSignInfo, receiveSign, userIntegral, firstPartScore, eliminationList,eliminationListLogin, getUserRanking,competitionList,competitionListLogin,getBounsList,exchangeBonus,shareReceiveIntegral,bonusBroadcast} from '@/api/activity.js';
  import Toast from '@/components/toast.js';
  import prizeGoodsList from '@/json/a20180625/prizeGoods10.js';
  import recommendGoodsList from '@/json/a20180625/recommendGoods.js';
  import {goGoodsDetail,deviceJudge,goSchemeUrlOpenAppUi2,interceptContent} from '@/utils/mobile.js';
  import {formatDate, countDownTime} from '@/utils/verify.js';
  import wxapi from '@/utils/wxapi';
  import {getUserAgent} from '@/utils/common.js';
  import {hostUrl} from '@/api/fetch.js';
  import {statisEvent} from '@/utils/statisEvent.js';
  import bigImg from '@/components/common/bigImg';
  import {setCookie,getCookie} from '@/utils/cookies.js';
export default {
    name: 'a20180625',
    components:{
      popUp,
      scrollList,
      loginModel,
      bigImg,
    },
    data() {
        return {
          userAgent:'',
          activityFlag: 'worldCup',
          isLogin: false,
          userSigned: false, // 用户今日是否签到
          userScore:0,
          userRecommendCode:'',
          userRankingNum:0,
          userSginDateList:[],
          loginProps:{
            recommendCode :false,
            style:"yellow",
            closeBtnPosition:"top",
            //recommendCode:true
            channel:'sjb0625',
          },
          // 淘汰赛
          eliminationTeamList:[],
          eliminationCountOrg:[],
          eliminationCountHandle:{},
          // 竞猜冠军
          champCTimeDate:{},
          championWinRate:0,
          championList:[],
          championAccess:true,
          championBorn:false,
          /*S scrollList */
          scrollListProp:{
            style:{
              width: 540,
              height: 50,
              color: '#2556B4',
              fontSize: 20,
            },
            scrollTime:5000,
            scrollLists:[],
          },
          /*E scrollList */
          //积分换好礼
          prizeHotTab: 'userRanking',
          prizeGoodsList:[],
          userRankingList:[],
          exchangeFlag:true,
          isShowMyAwards:false,  // 是否展示前10名奖品
          // 弹窗
          popUpFlag: false,
          popUpProps: {name:'',option:''},

          groupConSwiper: {},
          prizeInfoSwiper: {},
          // 优惠券
          couponList:[],
          // 为你推荐
          rcmTabsData:[],
          rcmGoodsData:[],
          activeRcmTabIndex:0,
          // 分享信息
          shareImage:'',
          wxShareUrl:'',
          appShareUrl:'',
          setShareFlag:true,
          // 放大图片
          imgSrc:require('../../../assets/img/varyActivity/scoresQuiz/a20180625/qrCode.png'),
          showImg:false,
          shareStringBody: {
            "title": "【头条】世界杯猜球宝典：让你3天身家翻6倍！",
            "content": "蜜宝竞猜世界杯，一起免租iPhoneX、Mac、Switch…",
            "image": this.shareImage || "",
            "url": this.appShareUrl || "",
            "activityFlag":"worldCup",
            "isReqShare": false
          },
          shareString:{
            "tagId":"mibaoShareContent",
            "body": ""
          },
        }
    },
    methods: {
      /* 弹窗参数说明：name为参数名字，option为所需参数
       * 1. 第一次进入活动获得100积分 name: firstPartScore
       * 2. 获取更多积分  name: wayGetScore
       * 3. 规则说明： name: rules
       * 4. 积分详情： name: scoreHistory
       * 5. 日历弹窗： name: calendar       option: 后台返回的签到数据
       * 6. 竞猜冠军： name: guessChampion  option: 当前国家数据
       * 7. 淘汰赛竞猜:name: guessCountry   option: 两个国家数据
       * 8. 积分不足： name: guessTips      option: {tips:'lessScore'}
       * 9. 竞猜成功： name: guessTips      option: {tips:'guessSuccess',country:'',slogan:''}
       * 10.我的奖品： name: myCoupons      option:{userRanking:1,isShowAwards:true}
       * 11.竞猜历史/竞猜结果   name: guessRecord
       * 12.前10名中奖提示窗    name: winPrize  option:{userRanking:'当前用户排名'}
       */
      showPopUp(name,option) {
        this.popUpProps.name = name;
        this.popUpProps.option = option?option:'';
        this.popUpFlag = true;
      },
      closePopUp() {
        this.popUpFlag = false;
      },
      switchPopUp(name,option) {
        this.popUpFlag = false;
        let _this = this;
        setTimeout(function(){
          _this.showPopUp(name,option);
        },400)
      },
      loginFailed() {
        this.$refs.login.showLoginModel();
      },
      showTab() {
        this.$refs.fixedTabs.style.display = "flex";
      },
      hideTab() {
        this.$refs.fixedTabs.style.display = "none";
      },
      enlargeImg(e) {
        // 判断是否为安卓机型
        if(deviceJudge() == 2) {
          this.showImg = true;
          this.imgSrc = e.currentTarget.src;
        }
      },
      closeImg() {
        this.showImg = false;
      },
      scrollToModel(location) {
        this.$refs.activity625.scrollToElement('#'+location,300,0,-60);
        //scrollToElement(el, time, offsetX, offsetY, easing)
      },
      // 获取更多积分
      shareActivity() {
        if(!this.isLogin) {
          this.$refs.login.showLoginModel();
          return ;
        } else {
          this.showPopUp('wayGetScore');
        }
      },
      // 查看“我的积分”
      showMyScore() {
        if(this.isLogin) {
          this.showPopUp('scoreHistory');
        } else {
          this.$refs.login.showLoginModel();
        }
      },
      // 查看我的奖品
      checkMyCoupons() {
        if(!this.isLogin) {
          this.$refs.login.showLoginModel();
          return;
        }
        // 判断是否到展示奖品的时间  if true 并且排名在前10
        let options = {};
        if(this.isShowMyAwards && this.userRankingNum<=10 && this.userRankingNum>0) {
           options = {userRanking:this.userRankingNum,isShowAwards:this.isShowMyAwards};
        }
        this.showPopUp('myCoupons',options);
      },
      // 查看“竞猜历史” “竞猜结果”
      checkGuessRecord() {
        if(this.isLogin) {
          this.showPopUp('guessRecord');
        } else {
          this.$refs.login.showLoginModel();
        }
      },
      // 榜单奖品tab切换
      setPrizeHotTab(tabName) {
        this.prizeHotTab = tabName
      },
      // “为你推荐”产品切换
      switchRcmTab(index) {
        this.activeRcmTabIndex = index;
        this.rcmGoodsData =  recommendGoodsList.goodsData[index].goodsInfoList;
      },
      goChooseDetail(id,name) {
        this.userStatisEvent('更多商品');    // 数据统计
        setTimeout(function(){
          goGoodsDetail(id);
        },200);
      },
      goGoodscategory() {                    // 查看更多商品
        this.userStatisEvent('更多商品');    // 数据统计
        setTimeout(function(){
          if (this.userAgent=='mibao') {
            goSchemeUrlOpenAppUi2('category');
          } else {
            window.location.href = hostUrl + "#/tabs/category" ;
          }
        },200);
      },
      // 弹窗关闭时刷新部分模块
      refreshModel(name) {
        if(name=='guessChampion') {
          this.rendingChampionListLogin();
          this.getUserScore();
          this.userRanking();
        } else if(name=='guessCountry') {
          this.rendingEliminationListLogin();
          this.getUserScore();
          this.userRanking();
        }
      },
      //   判断是否登录
      checkLogin() {
        formData.getUserToken();
        let _this = this;
        setTimeout(()=>{
          apiService.getPersonalInfo().then(resp => {
            if(resp.code == 200) {
              verify.setUserInfo(resp.data);
              _this.loginSuccess();
            } else {
              _this.isLogin = false;
              _this.rendingChampionList();     // 冠军赛列表
              _this.rendingEliminationList();  // 淘汰赛列表
              this.intShareSetting();
            }
          });
        },100);
      },
      loginSuccess() {
        this.isLogin = true;
        this.getFirstPartScore();  // 用户第一次参与活动领取100积分
        this.getUserSigned(); // 查询用户签到情况
        this.rendingChampionListLogin(); // 冠军竞猜列表
        this.rendingEliminationListLogin(); // 淘汰赛列表
      },
      setSlides1() {
        // 竞猜赢积分
        this.groupConSwiper =  new Swiper('#groupContainer',{
          observeParents:true,
          observer: true,
          slidesPerView : 'auto',
          loop: false,
        });
      },
      setSlides2(){
        var prizeInfoSwiper = new Swiper('#prizeInfo', {
          observeParents:true,
          observer: true,
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
        });
      },
      // 活动新用户领取100积分
      getFirstPartScore() {
        let params = {
          activityFlag: this.activityFlag
        }
        firstPartScore(params).then(resp => {
          if(resp.code == 200){
            if(resp.data) {
              this.userScore = resp.data;
            }
            this.showPopUp('firstPartScore');
            this.userRanking();
            this.getUserScore();  // 查询用户积分
          } else if (resp.code == 401) {
            this.isLogin = false;
          } else {
            this.userRanking();
            this.getUserScore();  // 查询用户积分
          }
        });
      },
      //  接口查询获取用户积分
      getUserScore() {
        userIntegral(this.activityFlag).then(resp => {
          if(resp.code == 200){
            this.userScore = resp.data.integral;
            this.userRecommendCode = resp.data.code;
            this.userRankingNum = resp.data.userRanking;
            this.isShowMyAwards = resp.data.displayPrized || false;
            if(this.isShowMyAwards&&this.userRankingNum<=10&&this.userRankingNum>0&&!getCookie('timeShowAwards')) {
              setCookie('timeShowAwards',true,30);
              let options = {userRanking:this.userRankingNum};
              this.showPopUp('winPrize',options);
            }
            if(this.setShareFlag) {   // 每次打开页面只设置一次分享信息
              this.intShareSetting();
              this.setShareFlag = false;
            }
          } else if (resp.code == 401) {
            this.isLogin = false;
          } else {
            Toast(resp.message);
          }
        });
      },
      //  查询用户签到情况
      getUserSigned () {
        findSignInfo(this.activityFlag).then(resp => {
          if(resp.code == 200){
            if(resp.data) {
              let signBoolean = new Date(resp.data[resp.data.length-1].signTime).getDate() == new Date().getDate() && new Date(resp.data[resp.data.length-1].signTime).getMonth() == new Date().getMonth();
              if(signBoolean) {
                this.userSigned = true;
              } else {
                this.userSigned = false;
              }
              for(let i=0; i<resp.data.length; i++) {
                this.userSginDateList[i] = resp.data[i].signTime;
              }
            } else {  // data为null时为从未签到情况
              this.userSigned = false;
            }
          } else if (resp.code == 401) {
            this.isLogin = false;
          } else {
            Toast(resp.message);
          }
        });
      },
      //  签到
      userSign() {
        if(this.isLogin) {
          if(this.isShowMyAwards) {  // 活动已结束
            Toast('活动已结束');
            return;
          }
          if (this.userSigned) {
            let calendarData = {
              currentInregral: 0,
              sginDateList: this.userSginDateList,
              totalIntegral: this.userScore
            }
            this.showPopUp('calendar', calendarData);
            return;
          }
          let params = {
            activityFlag: this.activityFlag
          }
          receiveSign(params).then(resp => {
            if(resp.code == 200){
              if (resp.data) {
                this.userSigned = true;
                this.userScore = resp.data.totalIntegral;
                this.userSginDateList.splice(0,this.userSginDateList.length);
                this.userSginDateList = resp.data.sginDateList;
                this.showPopUp('calendar',resp.data);
                this.userRanking();
                this.userStatisEvent('签到成功');    // 数据统计
              }
            }else if(resp.code == 400) {
              if(this.isShowMyAwards) {
                Toast('活动已结束');
                return;
              }
              this.userSigned = true;
            } else if (resp.code == 401) {
              this.isLogin = false;
              this.$refs.login.showLoginModel();
            } else {
              Toast(resp.message);
            }
          }).catch(e=>{
            Toast('网络错误，请稍后重试');
          });
        } else {
          this.$refs.login.showLoginModel();
        }
      },
      // 淘汰赛竞猜
      guessCountry(index) {
        if(!this.isLogin) {                                     // 没有登录
          this.$refs.login.showLoginModel();
          return;
        } else if(this.eliminationTeamList[index].participated) {    // 已参与竞猜
          return;
        } else {
          let options = {data:this.eliminationTeamList[index].worldCupCompetition,userScore:this.userScore,rateOfSupport1:this.eliminationTeamList[index].rateOfSupport1,rateOfSupport2:this.eliminationTeamList[index].rateOfSupport2}
          this.showPopUp('guessCountry',options);
        }
      },
      // 竞猜冠军
      guessChampion(index) {
        if(!this.isLogin) {                                     // 没有登录
          this.$refs.login.showLoginModel();
          return;
        } else if(this.championList[index].worldCupCountry.eliminated) {    // 国家已被淘汰
          return;
        } else if(this.championBorn) {  // 冠军产生，无法竞猜冠军
          Toast('活动已结束');
          return;
        } else {
          let options = {data:this.championList[index],rate:this.championWinRate,userScore:this.userScore}
          this.showPopUp('guessChampion',options);
        }
      },
      // 淘汰赛倒计时
      eliminationCountTime(difStampArr) {
        let _this = this;
        let timer = setInterval(function() {
          for(var i=0;i<difStampArr.length;i++) {
            // countDownTime 传入时间差，计算倒计时时间
            difStampArr[i] = difStampArr[i]-1000;
            if(difStampArr[i]>0) {
              _this.eliminationCountHandle[i] = countDownTime(difStampArr[i]);
              _this.$forceUpdate();
            } else {
              clearInterval(timer);
              if(_this.isLogin) {
                _this.rendingEliminationListLogin();
              } else {
                _this.rendingEliminationList();
              }
            }
          }
        },1000);
      },
      // 竞猜冠军倒计时
      guessChampionCountTime(difStamp) {
        let _this = this;
        let timer2 = setInterval(function() {
          difStamp= difStamp-1000;
          if(difStamp>0) {
            _this.champCTimeDate = countDownTime(difStamp);
            _this.$forceUpdate();
          } else {
            clearInterval(timer2);
            if(_this.isLogin) {
              _this.rendingChampionListLogin();
            } else {
              _this.rendingChampionList();
            }
          }
        },1000);
      },
      // 兑换优惠券
      exchangeCoupon(index) {
        if(!this.isLogin) {
          this.$refs.login.showLoginModel();
          return ;
        } else if(this.isShowMyAwards) {   //活动已结束
          Toast('活动已结束');
          return;
        } else if(this.couponList[index].bonusNumber == 0) {
          Toast('目前剩余数量不足，兑换奖池每日10：00更新');
          return ;
        } else if(this.userScore < this.couponList[index].integralExchange) {
          Toast('您的积分不足，目前账户积分'+this.userScore);
          return ;
        } else if (!this.exchangeFlag) {
          return ;
        } else {
          this.exchangeFlag = false;
          exchangeBonus(this.couponList[index].id).then(resp => {
            if(resp.code == 200){
              Toast('恭喜兑换成功');
              this.couponList[index].bonusNumber = resp.data.bonusNum;
              this.getUserScore();
              this.userRanking();
              let obj = {
                "bonusName": this.couponList[index].price/100+'元'+this.couponList[index].note,
                "phone": formData.getUserPhone()
              }
              this.scrollListProp.scrollLists.splice(0, 0, obj);
             // this.getBonusBroadcast();
              this.userStatisEvent('兑换优惠券');    // 数据统计
            }else if (resp.code == 401) {
              this.isLogin = false;
              this.$refs.login.showLoginModel();
            } else {
              Toast(resp.message);
            }
            let _this = this;
            setTimeout(function(){
              _this.exchangeFlag = true;
            },5000);
          }).catch(e=>{
            Toast('网络错误，请稍后重试');
            let _this = this;
            setTimeout(function(){
              _this.exchangeFlag = true;
            },5000);
          });
        }
      },
      /* S 不需要登录时的渲染 */
      //  淘汰赛竞猜列表
      rendingEliminationList() {
        eliminationList().then(resp => {
          if(resp.code == 200){
            if(resp.data) {
              this.eliminationTeamList = resp.data || [];
              for(let i=0; i<this.eliminationTeamList.length; i++) {
                this.eliminationTeamList[i].worldCupCompetition.startTime = formatDate(this.eliminationTeamList[i].worldCupCompetition.competitionTime,'M月dd日HH:mm');
                this.eliminationCountOrg[i]=this.eliminationTeamList[i].timeDifference;
              }
              this.eliminationCountTime(this.eliminationCountOrg);
              let _this = this;
              setTimeout(function() {
                _this.setSlides1();
              },100);
            }
          }else {
            Toast(resp.message);
          }
        });
      },
      // 冠军竞猜列表
      rendingChampionList() {
        competitionList().then(resp => {
          if(resp.code == 200) {
            if(resp.data) {
              this.championAccess = resp.data.enabled;
              if(resp.data.enabled) {
                this.championWinRate = resp.data.multiple;
                this.championList = resp.data.guessingCompetitionBeanList.slice(0,8) || [];
                this.checkIsChampionBorn();
              } else {
                this.guessChampionCountTime(resp.data.timeDifference);
              }
            }
          }
        });
      },
      checkIsChampionBorn() {  // 判断是否产生冠军
        let list = this.championList||[];
        let listLen = list.length;
        let remainCountry = 0;
        for(let i=0; i<listLen; i++) {
          if(!list[i].worldCupCountry.eliminated) {
            remainCountry ++;
          }
        }
        if(remainCountry==1) {
          this.championBorn = true;
        }
      },
      // 积分前10名排行榜
      userRanking() {
        this.userRankingList.splice(0,this.userRankingList.length);
        let prizeListLen = this.prizeGoodsList.length;
        getUserRanking(this.activityFlag).then(resp => {
          if(resp.code == 200){
            // 拼接积分排行数据
            for(let i=0; i<prizeListLen; i++) {
              let obj = {};
              obj.num = ('0'+(i+1)).slice(-2);
              obj.name = this.prizeGoodsList[i].name+'('+this.prizeGoodsList[i].bonus+')';
              obj.phone = resp.data[i]? resp.data[i].phone.slice(0,3)+'****'+resp.data[i].phone.slice(-4) : '';
              obj.integral = resp.data[i]? resp.data[i].integral : '';
              this.userRankingList.push(obj);
            }
          }
        });
      },
      // 优惠券
      // 优惠券轮播
      getBonusBroadcast() {
        bonusBroadcast().then(resp => {
          if(resp.code == 200){
            this.scrollListProp.scrollLists = (resp.data || []).reverse().slice(0,30) || [];
            //this.scrollListProp.scrollLists=[{'bonusName':"优惠券名称",'phone':"17777777777"},{'bonusName':"优惠券名称",'phone':"17777777777"}];
            this.$refs.scrollList.forceUpdate();
          }
        });
      },
      rendingCoupon() {
        getBounsList(this.activityFlag).then(resp => {
          if(resp.code == 200){
            this.couponList = resp.data || [];
          }
        });
      },
      rendingPage() {
        this.rcmTabsData = recommendGoodsList.tabsData; // 推荐商品
        this.rcmGoodsData = recommendGoodsList.goodsData[this.activeRcmTabIndex].goodsInfoList;
        this.prizeGoodsList = prizeGoodsList;           //  奖品列表/积分排行榜
        this.userRanking();
        this.rendingCoupon();  // 优惠券
        this.getBonusBroadcast(); // 优惠券轮播
      },
      /* E 不需要登录时的渲染 */
      /* S 登录后重新渲染淘汰赛与冠军竞猜 */
      rendingEliminationListLogin() {
        eliminationListLogin().then(resp => {
          if(resp.code == 200){
            if(resp.data) {
              this.eliminationTeamList = resp.data || [];
              for(let i=0; i<this.eliminationTeamList.length; i++) {
                this.eliminationTeamList[i].worldCupCompetition.startTime = formatDate(this.eliminationTeamList[i].worldCupCompetition.competitionTime,'M月dd日HH:mm');
                this.eliminationCountOrg[i]=this.eliminationTeamList[i].timeDifference;
              }
              this.eliminationCountTime(this.eliminationCountOrg);
              let _this = this;
              setTimeout(function() {
                _this.setSlides1();
              },100);
            }
          }else {
            Toast(resp.message);
          }
        });
      },
      rendingChampionListLogin() {
        competitionListLogin().then(resp => {
          if(resp.code == 200){
            if(resp.data) {
              this.championAccess = resp.data.enabled;
              if(resp.data.enabled) {
                this.championWinRate = resp.data.multiple;
                this.championList = resp.data.guessingCompetitionBeanList.slice(0,8) || [];
                this.checkIsChampionBorn();
              } else {
                this.guessChampionCountTime(resp.data.timeDifference);
              }
            }
          }
        });
      },
      /* E 登录后重新渲染淘汰赛与冠军竞猜 */
      // 分享领取积分
      shareReceiveIntegral() {
        let params = {
          activityFlag: this.activityFlag
        };
        shareReceiveIntegral(params).then(resp => {
          if(this.isShowMyAwards) {   //活动已结束
            Toast('活动已结束');
            return;
          }
          if(resp.code == 200) {
            Toast('分享成功');
            this.getUserScore();
            this.userRanking();
          } else {
            Toast(resp.message);
          }
        });
      },
      /*微信分享设置*/
      intWxShare() {
        this.shareImage= window.location.origin + window.location.pathname + require('@/assets/wxshare/20180625-2.png').substr(2);
        if(!this.isLogin) {
          this.wxShareUrl = window.location.origin + '/activity/#/a20180625?share=weixinshare';
          this.appShareUrl = window.location.origin + '/activity/#/a20180625';
        } else {
          this.wxShareUrl = window.location.origin + '/activity/#/a20180625?share=weixinshare&recommendCode=' + this.userRecommendCode;
          this.appShareUrl = window.location.origin + '/activity/#/a20180625?recommendCode=' + this.userRecommendCode;
        }
      },
      intShareSetting() {
        this.intWxShare(); // 重置微信分享路径
        this.setShare();  // 重新设置微信分享内容
        if(this.isLogin) {
          this.shareStringBody.isReqShare = true;
        }
        this.shareStringBody.image = this.shareImage || "";
        this.shareStringBody.url = this.appShareUrl || "";
        this.shareString.body = JSON.stringify(this.shareStringBody);
        interceptContent(this.shareString);   //  重设app分享内容
      },
      setShare() {
        let _this = this;
        let shareObj = {
          title: _this.shareStringBody.title,
          desc : _this.shareStringBody.content,
          link : _this.wxShareUrl,
          imgUrl: window.location.origin + window.location.pathname + require('@/assets/wxshare/20180625-2.png').substr(2),
        };
        wxapi.share(shareObj, function () {
          _this.shareReceiveIntegral();
          statisEvent('微信世界杯活动','分享');
        });
      },
      //  根据userAgent触发不同的统计数据
      //  action:访问页面/分享成功/更多商品/签到成功；  label:用于更详细的描述
      userStatisEvent(action,label) {
        if(this.userAgent == 'wx') {
          statisEvent('微信世界杯活动',action,label);
        } else if(this.userAgent == 'jd') {
          statisEvent('京东世界杯活动',action,label);
        } else if(this.userAgent == 'mibao') {
          statisEvent('APP世界杯活动',action,label);
        } else if(this.userAgent == 'alipay') {
          statisEvent('支付宝世界杯活动',action,label);
        } else {
          statisEvent('其他渠道世界杯活动',action,label);
        }
      },
    },
    mounted() {
      this.userAgent = getUserAgent();
      this.userStatisEvent('访问页面');    // 数据统计
      this.checkLogin();
      this.rendingPage();     //  渲染页面
      this.setSlides2();      // 我的奖品
    }
}
</script>
<style lang="scss" scoped>
    $real-px: 37.5;
    @function calRem($px-input){
       @return ($px-input/$real-px)/2;
    }
    .fade-enter-active { transition: all .5s ease;}
    .fade-leave-active { transition: all .5s ease;}
    .fade-enter, .fade-leave-active {transform: translateY(10px);opacity: 0;}
	  div,img,a{padding:0;margin:0;display:block;border:0;}
    td,tr,table {padding:0;margin:0;}
    .view-wp{
      position: fixed;left: 0; right: 0;top: 0; bottom: 0;
      .view-content {
        position: absolute; height: 100%;
        width: calRem(750rem);
        left: 0;
        right: 0;
        top: 0;
        margin: 0 auto;
      }
    }
    .wrapper{
      background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/bg.jpg") no-repeat center top;
      background-size: 100% auto;
      padding-bottom: calRem(160rem);
      position: relative;
      .bottom {
        color: #fff;
        margin-top: calRem(64rem);
        & .qrCode {
          width: calRem(320rem);
          height: calRem(355rem);
          margin: 0 auto calRem(20rem);
        }
        & .p1 {
          width: calRem(480rem);
          margin:0 auto calRem(12rem);
          text-align: center;
          font-size: calRem(24rem);
        }
        & .p2 {
          width: calRem(480rem);
          margin:0 auto;
          text-align: center;
          font-size: calRem(20rem);
          line-height: calRem(26rem);
        }
      }
    }
    .wrapper.other {
      background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/bg-ali.jpg") no-repeat center top;
      background-size: 100% auto;
      padding-bottom: calRem(156rem);
      position: relative;
      .bottom {
        color: #fff;
        margin-top: calRem(140rem);
        & .p1 {
          width: calRem(480rem);
          margin:0 auto calRem(12rem);
          text-align: center;
          font-size: calRem(24rem);
        }
        & .p2 {
          width: calRem(480rem);
          margin:0 auto;
          text-align: center;
          font-size: calRem(20rem);
          line-height: calRem(26rem);
        }
      }
    }
    .wrapper.noElimination {
      background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/bg2.jpg") no-repeat center top;
      background-size: 100% auto;
      padding-bottom: calRem(148rem);
      position: relative;
      .bottom {
        color: #fff;
        margin-top: calRem(96rem);
        & .qrCode {
          width: calRem(320rem);
          height: calRem(355rem);
          margin: 0 auto calRem(20rem);
        }
      }
    }
    .wrapper.other.noElimination {
      background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/bg-ali2.jpg") no-repeat center top;
      background-size: 100% auto;
      padding-bottom: calRem(156rem);
      position: relative;
      .bottom {
        color: #fff;
        margin-top: calRem(140rem);
      }
    }
    .category-tabs {
      box-sizing: border-box;
      width: calRem(750rem);
      height: calRem(98rem);
      padding: 0 calRem(26rem);
      background: rgba(0,0,0,0.8);
      position: fixed;
      z-index: 30;
      display: none;
      justify-content: space-between;
      align-items: center;
      & div {
        width: calRem(204rem);
        height: calRem(62rem);
        border: calRem(4rem) solid #46A3FE;
        background: #BEE3FF;
        border-radius: calRem(40rem);
        display: flex;
        justify-content: center;
        align-items: center;
        & img {
          width: calRem(57rem);
          height: calRem(57rem);
          display: inline-block;
          margin-right: calRem(4rem);
        }
        & span {
          font-size:calRem(24rem);
          color: #0D55BA;
          & i {
            font-size:calRem(20rem);
            text-align: left;
            display: inline-block;
            text-align: left;
            width: 100%;
          }
        }
      }
    }
    .rules {
      position: absolute;
      width: calRem(78rem);
      height: calRem(60rem);
      background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/rules.png") no-repeat center top;
      background-size: contain;
      top: 0;
      right: calRem(20rem);
      z-index: 1;
    }
    .section-tit {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 0 calRem(16rem);
      justify-content: space-between;
      & span:first-child {
        display: inline-block;
        height: calRem(32rem);
        & img {
          height: calRem(32rem);
          width: auto;
        }
      }
      & span:nth-child(2) {
        width: calRem(120rem);
        height: calRem(31rem);
        color: #fff;
        display: flex;
        & img {
          width: 100%;
          height: auto;
        }
      }
    }
    // 头部
    .top {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: calRem(580rem) calRem(16rem) 0;
      position: relative;
      .myScores {
        width: calRem(150rem);
        height: calRem(62rem);
        background: #C5E2FF;
        border: calRem(4rem) solid #5FA3F7;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: calRem(40rem);
        & span:first-child {
          color: #2556B4;
          font-size: calRem(20rem);
         // margin-bottom: calRem(3rem);
        }
        & span:last-child {
          color: #2556B4;
          font-size: calRem(20rem);
          background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/myScores.png") no-repeat left top;
          background-size: calRem(24rem) calRem(27rem);
          padding-left: calRem(28rem);
          padding-top: calRem(4rem);
          height:calRem(24rem);
        }
      }
      .sign {
        width: calRem(310rem);
        display: flex;
        flex-direction: column;
        justify-content: center;
        & span:first-child{
          font-size: calRem(20rem);
          color: #5fa3f7;
          padding-bottom: calRem(4rem);
        }
        & span:last-child{
          display: inline-block;
          width: calRem(310rem);
          height: calRem(66rem);
          background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/sign-active.png") no-repeat left top;
          background-size: cover;
          text-indent:-9999px;
        }
        & span.signed {
          background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/signed.png") no-repeat left top;
          background-size: cover;
        }
        & span.unsigned {
          animation: heartbeat 1300ms infinite linear;
        }
      }
      .moreScore {
        width: calRem(150rem);
        height: calRem(62rem);
        background: #ffc4da;
        border: calRem(4rem) solid #d6707b;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: calRem(40rem);
        & span:first-child {
          color: #cf3647;
          font-size: calRem(20rem);
          //margin-bottom: calRem(2rem);
        }
        & span:last-child {
          width: calRem(65rem);
          height: calRem(24rem);
          /*color: #2556B4;*/
          /*font-size: calRem(20rem);*/
        }
      }
    }
    // 竞猜赢积分
    .guessing {
      .section-tit {
        margin: calRem(30rem) 0 calRem(20rem);
      }
      .elimination {  // 淘汰赛
        margin-bottom: calRem(28rem);
        height: calRem(466rem);
        .swiper-container {
          width: 100%;
          padding: 0 calRem(20rem);
          box-sizing: border-box;
          & .swiper-wrapper {
            display: flex;
            width: calRem(356rem);
          }
        }
        .groupItem {
          width: calRem(356rem);
          height: calRem(466rem);
          background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/elimi-group-bg.png") no-repeat center top;
          background-size: contain;
          .countDown {
            text-align: center;
            color: #fff;
            font-size: calRem(20rem);
            height: calRem(52rem);
            line-height: calRem(52rem);
            margin-bottom: calRem(14rem);
          }
          .startTime {
            width: calRem(222rem);
            height: calRem(34rem);
            background: #5FA3F7;
            margin: 0 auto;
            border-radius: calRem(17rem);
            color: #fff;
            font-size: calRem(24rem);
            display: flex;
            justify-content: center;
            align-items: center;
            & i {
              display: inline-block;
              width: calRem(13rem);
              height: calRem(2rem);
              background: #fff;
              margin: 0 calRem(10rem);
            }
          }
          .country {
            width:calRem(336rem);
            height: calRem(168rem);
            margin: calRem(28rem) auto calRem(28rem);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .vs {
              width: calRem(63rem);
              height: calRem(35rem);
              background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/vs.png") no-repeat center;
              background-size: contain;
            }
            .country1,.country2 {
              width: calRem(134rem);
              height: calRem(168rem);
              border-radius: calRem(8rem);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .scoreRate {
                height: calRem(35rem);
                line-height: calRem(38rem);
                text-align: center;
                font-size: calRem(20rem);
                color: #2b65cd;
              }
              .falg-img {
                box-sizing: border-box;
                height: calRem(88rem);
                width: calRem(88rem);
                border: calRem(4rem) solid #518cec;
                border-radius: 100%;
                background: #fff;
                overflow: hidden;
              }
              .name {
                height: calRem(44rem);
                line-height: calRem(44rem);
                color: #2b65cd;
                font-size: calRem(24rem);
                text-align: center;
                position: relative;
              }
            }
            .country1.hasChoosed,.country2.hasChoosed {
              .name:after {
                content: '.';
                display: block;
                text-indent: -9999px;
                width: calRem(30rem);
                height: calRem(30rem);
                background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/hasChoosed.png") no-repeat center;
                background-size: contain;
                position: absolute;
              }
            }
            .country1.hasChoosed {
              .name:after {
                right: calRem(-36rem);
                top: calRem(6rem);
              }
            }
            .country2.hasChoosed {
              .name:after {
                left: calRem(-36rem);
                top: calRem(6rem);
              }
            }
          }
          .supportRate {
            width: calRem(240rem);
            margin: 0 auto calRem(12rem);
            .figure {
              width: calRem(222rem);
              height: calRem(20rem);
              border: calRem(2rem) solid #518cec;
              border-radius: calRem(4rem);
              overflow: hidden;
              background: #2b65cd;
              margin: 0 auto calRem(10rem);
              position: relative;
              .leftRate {
                height: calRem(20rem);
                background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/leftRate-bg.png") no-repeat top right;
                background-size: auto 100%;
                //width: 70%;
                position: absolute;
                left: 0;
                top: 0;
              }
            }
            .des {
              font-size: calRem(20rem);
              color: #2b65cd;
            }
          }
          .guessBtn {
            width: calRem(211rem);
            height: calRem(73rem);
            font-size: calRem(30rem);
            color: #fff;
            line-height: calRem(60rem);
            text-align: center;
            background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/guessBtn-bg.png") no-repeat center;
            background-size: contain;
            margin: 0 auto;
          }
          .guessBtn.hasGuessed {
            background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/hasGuessedBtn-bg.png") no-repeat center;
            background-size: contain;
            color:#a8a6a7;
          }
        }
      }
      .champion {
        width: calRem(720rem);
        height: calRem(485rem);
        margin: 0 auto;
        .beforeGuess {
          box-sizing: border-box;
          width: calRem(720rem);
          height: calRem(485rem);
          padding-top: calRem(104rem);
          background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/guessChampion-count-bg.png") no-repeat center top;
          background-size: contain;
          .des {
            color: #fff;
            font-size: calRem(20rem);
            text-align: center;
            margin-bottom: calRem(12rem);
          }
          .countTime {
            width: calRem(516rem);
            height: calRem(70rem);
            background: #fec104;
            border-radius: calRem(40rem);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            & span {
              font-size: calRem(26rem);
              display: flex;
              align-items: center;
              justify-content: center;
              & i:first-child {
                margin-right: calRem(3rem);
              }
              & i:first-child,& i:nth-child(2) {
                width: calRem(38rem);
                height: calRem(38rem);
                background: #fff;
                color: #cf3746;
                border-radius: calRem(3rem);
                display: flex;
                align-items: center;
                justify-content: center;
                background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/champion-countTime-bg.png") no-repeat center top;
                background-size: contain;
              }
              & i:last-child {
                color: #ab5e18;
                margin: 0 calRem(7rem);
              }
            }
          }
        }
        .champion-con {
          width: calRem(720rem);
          height: calRem(485rem);
          background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/guessChampion-bg.png") no-repeat center top;
          background-size: contain;
          .rate {
            width:calRem(696rem);
            font-size: calRem(24rem);
            height: calRem(46rem);
            line-height: calRem(44rem);
            padding: calRem(20rem) calRem(26rem) 0 0;
            text-align: right;
            background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/champion-rate-bg.png") no-repeat right calRem(20rem);
            background-size: calRem(114rem) calRem(48rem);
            color: #fff;
            margin-bottom: calRem(14rem);
          }
          .countries {
            width: calRem(628rem);
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin: 0 auto;
            .country {
              width: calRem(140rem);
              height: calRem(188rem);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              margin-bottom: calRem(14rem);
              & span:first-child {
                box-sizing: border-box;
                height: calRem(88rem);
                width: calRem(88rem);
                border: calRem(4rem) solid #518cec;
                border-radius: calRem(100rem);
                background: #fff;
                overflow: hidden;
                position: relative;
                & img {
                  height: calRem(84rem);
                  width: calRem(84rem);
                  border-radius: 100%;
                }
              }
              & span:nth-child(2) {
                height: calRem(40rem);
                line-height: calRem(40rem);
                color: #2b65cd;
                font-size: calRem(24rem);
                text-align: center;
              }
              & span:nth-child(3) {
                width: calRem(116rem);
                height: calRem(46rem);
                border-radius: calRem(4rem);
                background: #518bec;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: calRem(24rem);
              }
              & span.hasGuess {
                background: #fac949;
                color: #9b4b1a;
              }
              & span.winner {
                background: #e11d42;
                color: #fff;
              }
            }
            .country.disabled {
              & span:first-child:before {
                content: "";
                display: block;
                height: calRem(86rem);
                width: calRem(86rem);
                border-radius: calRem(100rem);
                position: absolute;
                top: 0;
                bottom: 0;
                background: #4578da;
                opacity: 0.4;
                z-index: 1;
              }
              & span:nth-child(3) {
                background: #d9d7d8;
                color: #a8a6a7;
              }
            }
          }
        }
      }
    }
    // 积分换好礼
    .exchange {
      .section-tit {
        margin: calRem(30rem) 0 calRem(24rem);
      }
      // 榜单用户及奖品
      .prizeHot {
        .prizeTab {
          width: calRem(654rem);
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          & div {
            box-sizing: border-box;
            width: calRem(322rem);
            height: calRem(63rem);
            font-size: calRem(28rem);
            color: #2556B4;
            border:calRem(4rem) solid #4578DA;
            border-bottom: 0;
            background: #fff;
            padding-top: calRem(16rem);
            border-top-left-radius: calRem(10rem);
            border-top-right-radius: calRem(10rem);
          }
          & div.active {
            color: #9C491B;
            border:calRem(4rem) solid #D98626;
            border-bottom: 0;
            background: #FAC949;
          }
        }
        .con {
          box-sizing: border-box;
          width: calRem(710rem);
          height: calRem(868rem);
          border:calRem(4rem) solid #4578DA;
          border-radius: calRem(12rem);
          background: #fff;
          margin: 0 auto;
          box-shadow: 0 0 8px #1747a4;
          .myScore {
            height: calRem(40rem);
            padding-top: calRem(20rem);
            text-align: center;
            color: #2556B4;
            font-size: calRem(20rem);
          }
          .conList {
            .conList-userRanking {
              height: calRem(748rem);
              width: calRem(672rem);
              margin: 0 auto;
              .tit {
                box-sizing: border-box;
                width: calRem(652rem);
                height: calRem(42rem);
                padding-left: calRem(30rem);
                font-size: calRem(20rem);
                color: #fff;
                background: #5fa3f8;
                border-radius: calRem(36rem);
                display: flex;
                align-items: center;
                margin:0 auto calRem(18rem);
                & span {display: inline-block;font-size: calRem(20rem)}
                & span:first-child {
                  width: calRem(60rem);
                  text-align: left;
                }
                & span:nth-child(2) {
                  width: calRem(288rem);
                  text-align: center;
                }
                & span:nth-child(3) {
                  width: calRem(156rem);
                  text-align: left;
                }
                & span:nth-child(4) {
                  width: calRem(110rem);
                  text-align: left;
                }
              }
              .userRanking-con {
                border: calRem(2rem) solid #c0ddff;
                border-collapse: collapse;
                border-left: 0;
                border-right: 0;
                margin: 0 auto;
                width: calRem(630rem);
                table-layout: fixed;
                .userInfo {
                  & td {
                    border: calRem(2rem) solid #c0ddff;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    height: calRem(68rem);
                    color: #2556B4;
                  }
                  & td:first-child {
                    width: calRem(72rem);
                    border-left: 0;
                  }
                  & td:nth-child(2) {
                    width: calRem(280rem);
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-indent: calRem(14rem);
                  }
                  & td:nth-child(3) {
                    width: calRem(164rem);
                  }
                  & td:nth-child(4) {
                    width: calRem(136rem);
                    border-right: 0;
                  }
                }
                .userInfo:first-child {
                  & td:first-child {
                    text-indent: -9999px;
                    background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/ranking01.png") no-repeat center;
                    background-size: calRem(42rem) calRem(51rem);
                  }
                }
                .userInfo:nth-child(2) {
                  & td:first-child {
                    text-indent: -9999px;
                    background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/ranking02.png") no-repeat center;
                    background-size: calRem(42rem) calRem(51rem);
                  }
                }
                .userInfo:nth-child(3) {
                  & td:first-child {
                    text-indent: -9999px;
                    background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/ranking03.png") no-repeat center;
                    background-size: calRem(42rem) calRem(51rem);
                  }
                }
              }
            }
            .conList-prizeInfo {
              height: calRem(748rem);
              width: calRem(672rem);
              margin: 0 auto;
              .swiper-container {
                width: 100%;
                height: 100%;
                .swiper-wrapper {
                  .swiper-slide {
                    height: auto;
                  }
                }
              }
              .conList-prizeInfo-con {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
              }
              .prizeItem {
                position: relative;
                width: calRem(220rem);
                height: calRem(216rem);
                border-radius: calRem(8rem);
                overflow: hidden;
                margin-bottom: calRem(7rem);
                & .des {
                  width: calRem(220rem);
                  height: calRem(66rem);
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  & span {
                    color: #2556B4;
                    font-size: calRem(24rem);
                    display: inline-block;
                    width: calRem(220rem);
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }
                  & span:last-child {
                    font-size: calRem(20rem);
                    margin-top: calRem(8rem);
                  }
                }
              }
            }
          }
          .des {
            height: calRem(34rem);
            padding-top: calRem(20rem);
            text-align: center;
            color: #2556B4;
            font-size: calRem(20rem);
          }
        }
      }
      // 兑奖成功信息滚动区
      .ticketSuces {
        box-sizing: border-box;
        width: calRem(698rem);
        height: calRem(80rem);
        background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/scrollList-bg.png") no-repeat center;
        background-size: contain;
        margin: calRem(26rem) auto calRem(8rem);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .scroll-wrapper {
          padding-left: calRem(100rem);
          height: calRem(50rem);
          width: calRem(560rem);
          overflow: hidden;
          background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/whistle.png") no-repeat calRem(6rem) center;
          background-size: calRem(75rem) calRem(40rem);
        }
      }
      // 积分兑换
      .exchange-area {
        .switchTab {
          height: calRem(68rem);
          display: flex;
          justify-content: space-around;
          align-items: center;
          background: #FAC949;
          box-shadow: 0 0 10px #023d83;
          & span {
            padding: calRem(12rem) calRem(10rem);
            border-radius: calRem(6rem);
            color: #9C491B;
            font-size: calRem(24rem);
          }
          & span.active {
            color: #fff;
            background: #5FA3F7;
          }
        }
        .coupon {
          width: calRem(728rem);
          height: calRem(728rem);
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .des {
            width: calRem(716rem);
            padding: calRem(10rem) 0 calRem(30rem);
            color: #fff;
            text-align: center;
            font-size: calRem(20rem);
          }
          .coupon-item {
            width: calRem(362rem);
            height: calRem(328rem);
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: calRem(4rem);
            .price {
              height: calRem(68rem);
              padding-top: calRem(40rem);
              margin-bottom: calRem(20rem);
              display: flex;
              align-items: flex-end;
              align-items: center;
              & img {
                /*width: calRem(220rem);*/
                /*height: calRem(82rem);*/
                /*margin-right: calRem(4rem);*/
              }
              & span {
                color: #fff;
                font-size: calRem(30rem);
                padding-top: calRem(24rem);
                transform: skewX(-8deg);
              }
            }
            .coupon-des {
              color: #fff;
              font-size: calRem(24rem);
              text-align: center;
              margin-bottom: calRem(44rem);
            }
            .number {
              color: #2556B4;
              font-size: calRem(20rem);
              text-align: center;
              margin-bottom: calRem(12rem);
            }
            .cost {
              width: calRem(246rem);
              height: calRem(68rem);
              line-height: calRem(68rem);
              background: #FAC949;
              color: #9C491B;
              text-align: center;
              border-radius: calRem(4rem);
              box-shadow: 0 0 calRem(16rem) #FAC949;
            }
            .cost.disabled {
              background: #d9d7d8;
              color: #a8a6a7;
              box-shadow: 0 0 calRem(10rem) #cac9c9;
            }
          }
          .coupon-item:first-child {
            background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/remCoupon01.png") no-repeat center;
            background-size: contain;
            .price img {
              width: calRem(139rem);
              height: calRem(68rem);
            }
          }
          .coupon-item:nth-child(2) {
            background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/remCoupon02.png") no-repeat center;
            background-size: contain;
            .price img {
              width: calRem(142rem);
              height: calRem(68rem);
            }
          }
          .coupon-item:nth-child(3) {
            background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/remCoupon03.png") no-repeat center;
            background-size: contain;
            .price img {
              width: calRem(176rem);
              height: calRem(68rem);
            }
          }
          .coupon-item:nth-child(4) {
            background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/remCoupon04.png") no-repeat center;
            background-size: contain;
            .price img {
              width: calRem(209rem);
              height: calRem(68rem);
            }
          }
        }
        // 为你推荐
        .recommend {
          .tit {
            color: #fff;
            font-size: calRem(28rem);
            margin: calRem(24rem) 0 calRem(10rem);
            display: flex;
            align-items: center;
            justify-content: center;
            & i {
              display: inline-block;
              height: 1px;
              transform: scaleY(0.5);
              background: #fff;
              width: calRem(160rem);
              margin:0 calRem(20rem);
            }
          }
          .goods-con {
            width: calRem(738rem);
            margin: 0 auto;
            .goodsItem {
              box-sizing: border-box;
              width: calRem(738rem);
              height: calRem(266rem);
              background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/recommend01-bg.png") no-repeat center;
              background-size: contain;
              display: flex;
              justify-content: space-between;
              .goods-des {
                box-sizing: border-box;
                width: calRem(364rem);
                margin-right: calRem(20rem);
                padding:calRem(22rem) 0 0 calRem(28rem);
                .goods-des-top {
                  height: calRem(112rem);
                  .goods-tit {
                    color: #fff;
                    font-size: calRem(30rem);
                    max-height: calRem(64rem);
                    margin-bottom: calRem(8rem);
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                  }
                  .goods-oriPrice {
                    color: #fff;
                    font-size: calRem(20rem);
                    text-align: left;
                  }
                }
                .mibao,.discount {
                  width: calRem(288rem);
                  height:calRem(46rem);
                  //background: #dadada;
                  border-radius: calRem(6rem);
                  overflow: hidden;
                  display: flex;
                  line-height: 1;
                  padding-top: calRem(2rem);
                  & div {
                    width: calRem(135rem);
                    padding-left: calRem(9rem);
                    display: flex;
                    align-items: center;
                    & span {
                      font-size: calRem(38rem);
                      color: #fff;
                      font-weight: 600;
                      padding-left: calRem(22rem);
                    }
                  }
                  & div:nth-child(2) {
                    //background: #c9c9c9;
                    & span {
                      color: #a9a7a7;
                      font-weight: 600;
                    }
                  }
                }
                .mibao {
                  background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/mibao-price.png") no-repeat center top;
                  background-size: contain;
                }
                .discount {
                  background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/discont-price.png") no-repeat center top;
                  background-size: contain;
                  margin-top: calRem(10rem);
                  & div:nth-child(2) {
                   // background: #CF3647;
                    & span {
                      color: #FAC949;
                    }
                  }
                }
              }
              .img {
                width: calRem(350rem);
                height: calRem(266rem);
                display: flex;
                align-items: center;
                justify-content: center;
                & img {
                  width: calRem(265rem);
                  height: calRem(226rem);
                }
              }
            }
            .goodsItem:nth-child(2n) {
              background: url("../../../assets/img/varyActivity/scoresQuiz/a20180625/recommend02-bg.png") no-repeat center;
              background-size: contain;
              flex-direction: row-reverse;
              justify-content: space-between;
              .goods-des {
                width: calRem(330rem);
              }
            }
          }
          .more-goods {
            width: calRem(272rem);
            height: calRem(48rem);
            margin: calRem(20rem) auto 0;
            border: calRem(4rem) solid #5FA3F7;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #2556B4;
            font-size: calRem(24rem);
            background: #c3e2fe;
            border-radius: calRem(30rem);
            & img {
              width: calRem(16rem);
              height: calRem(16rem);
              margin-left: calRem(12rem);
              display: inline-block;
            }
          }
        }
      }
    }
    @keyframes heartbeat {
      0% {transform: scale(0.95,0.95);}
      30% {transform:scale(1.05,1.05);}
      100% {transform:scale(0.95,0.95);}
    }
</style>
