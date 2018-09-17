<template>
   <div class="popUp">
      <div class="popUp-wrapper">
        <!-- 1. 规则介绍    竞猜规则/积分规则 -->
        <div class="rules" v-if="popUpProps.name=='rules'">
          <div class="closeBtn" @click.stop.prevent="closePopUp"></div>
          <div class="modelMain">
            <div class="top">
              <button :class="{'btn-blue':rulesBox!='guess','btn-yellow':rulesBox=='guess'}" @click.stop.prevent="switchRules('guess')">竞猜规则</button>
              <button :class="{'btn-blue':rulesBox!='score','btn-yellow':rulesBox=='score'}" @click.stop.prevent="switchRules('score')">积分规则</button>
            </div>
            <div class="rules-con">
              <div v-if="rulesBox == 'guess'">
                <div class="field">
                  <h3 class="field-title">一、冠军大竞猜</h3>
                  <div class="rules-txt">
                    <p class="red">
                      1、奖励积分随比赛进行阶段递减，越早支持冠军队，所获奖励越高！
                      <span>
                      （例：8进4前竞猜正确奖励8倍积分，半决赛前竞猜正确则奖励4倍积分）
                      </span>
                    </p>
                    <p>
                      2、可支持多个球队，但所支持球队被淘汰时不返还竞猜积分；
                    </p>
                    <p>
                      3、竞猜后可对已支持的球队加注，但加注后奖励将根据当前赛段变动，参考规则1；
                    </p>
                    <p>
                      4、比赛时段暂停竞猜，无法支持已被淘汰球队；
                    </p>
                    <p class="red">
                      5、所有奖励积分在决出冠军后发放。
                    </p>

                  </div>
                </div>
                <div class="field">
                  <h3 class="field-title">二、胜负二选一</h3>
                  <div class="rules-txt">
                    <p class="red">
                      1、支持相应球队后会扣除相应积分，比赛结束后根据对应倍率发放竞猜奖励，竞猜错误不返还积分；
                    </p>
                    <p>
                      2、竞猜胜负奖励积分倍率会根据队伍支持率变动；
                    </p>
                    <p>
                      3、比赛开始后无法竞猜相应队伍；
                    </p>
                    <p>
                      4、在【竞猜历史】中可查看个人竞猜记录与积分投注、发放的情况；
                    </p>
                    <p>
                      5、在【我的积分】中可查看领取及积分的获得记录。
                    </p>
                  </div>
                </div>
                <p class="des">
                  ※活动最终解释权归蜜宝平台所有
                  <br />
                  如有疑问，可在【我的—客服】中拨打客服电话或咨询在线客服
                </p>
              </div>
              <div v-if="rulesBox == 'score'">
                <div class="field">
                  <h3 class="field-title">一、积分说明</h3>
                  <div class="rules-txt">
                    <p class="red">
                      1、首次参与可以领取100竞猜积分；（开启竞猜冠军环节后，调整为500竞猜积分）；
                    </p>
                    <p>
                      2、每日签到可以获得竞猜积分，持续签到奖励更多！
                      <span>（例：首日签到可获得5积分，第二日可获得10积分，第三日15积分，以此类推，持续签到5天或断签后重新计算）；</span>
                    </p>
                    <p class="red">
                      3、累积猜对3场时，额外奖励100积分，猜对5场额外奖励300积分，猜对7场额外奖励500积分，猜对10场额外奖励1000积分；
                    </p>
                  </div>
                </div>
                <div class="field">
                  <h3 class="field-title">二、邀请规则</h3>
                  <div class="rules-txt">
                    <p class="red">
                      1、每日第一次分享活动页面可获得50竞猜积分；
                    </p>
                    <p class="red">
                      2、分享活动页，成功邀请1位好友注册并参与活动，可以获得50竞猜积分，每日最多可邀5人（开启竞猜冠军环节后，每邀请1位好友注册并参与，可以获得200竞猜积分）。
                    </p>
                  </div>
                </div>
                <div class="field">
                  <h3 class="field-title">三、兑换规则</h3>
                  <div class="rules-txt">
                    <p class="red">
                      1、截止至7月20日，竞猜积分排行榜前10名的用户可获得惊喜奖励；
                      <span>第1名 IPhone X 1台（一年免租）</span>
                      <span>第2名 MacBook Air（2017款）（一年免租）</span>
                      <span>第3名 oppo R15手机 R15梦镜版（一年免租）</span>
                      <span>第4名 小米MIX2（一年免租）</span>
                      <span>第5名 坚果3（一年免租）</span>
                      <span>第6名 DJI/大疆 御 Mavic PRO 1台（30天免租）</span>
                      <span>第7名 Beats Studio3 Wireless无线降噪蓝牙耳机（3个月免租）</span>
                      <span>第8名 佳能新款750D 18-55（30天免租）</span>
                      <span>第9名 GoPro6 新款水下相机 运动相机（30天免租）</span>
                      <span>第10名 喵游包邮switch主机游戏套餐（30天免租）</span>
                    </p>
                    <p class="red">
                      2、截止至7月20日，可用当前已拥有竞猜积分自由兑换奖池商品或优惠券；
                    </p>
                    <p>
                      3、竞猜积分兑换优惠券的奖池每日10:00进行更新。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 2. 我要竞猜    竞猜历史/竞猜结果 -->
        <div class="guess" v-if="popUpProps.name=='guessRecord'">
          <div class="closeBtn" @click.stop.prevent="closePopUp"></div>
          <div class="modelMain">
            <div class="top">
              <button :class="{'btn-blue':guessInfoBox!='history','btn-yellow':guessInfoBox=='history'}" @click.stop.prevent="switchGuessInfo('history')">竞猜历史</button>
              <button :class="{'btn-blue':guessInfoBox!='result','btn-yellow':guessInfoBox=='result'}" @click.stop.prevent="switchGuessInfo('result')">竞猜结果</button>
            </div>
            <div class="guess-con">
              <div class="guess-history" v-if="guessInfoBox == 'history'">
                <div class="field" v-if="guessHistoryList.length!=0" v-for="(item,index) in guessHistoryList" :key="index">
                  <h3 class="field-title"><i></i>{{item.date}}<i></i></h3>
                  <div class="history-item" v-for="(i,index2) in (item.guessingResultsBean||[])" :key="index2">
                    <span>[{{i.title}}]</span>
                    <span>{{i.content}}</span>
                  </div>
                </div>
                <div v-if="guessHistoryList.length==0" class="noData">暂无竞猜历史</div>
              </div>
              <div class="guess-result" v-if="guessInfoBox == 'result'">
                <div class="result-item"  v-if="guessResultList.length!=0" v-for="(item,index) in guessResultList" :key="index">
                  <div class="tit">{{item.competitionProcess}}</div>
                  <div class="country">
                    <div class="country1" :class="{win:item.beatCountry==item.worldCupCompetition.flag1,choosed:item.cuntryFlag==item.worldCupCompetition.flag1}">
                      <div class="ctryName">{{item.worldCupCompetition.country1}}</div>
                      <div class="ctryFlag">
                        <img :src="item.worldCupCompetition.nationalFlag1">
                      </div>
                    </div>
                    <div class="vs"></div>
                    <div class="country2" :class="{win:item.beatCountry==item.worldCupCompetition.flag2,choosed:item.cuntryFlag==item.worldCupCompetition.flag2}">
                      <div class="ctryName">{{item.worldCupCompetition.country2}}</div>
                      <div class="ctryFlag">
                        <img :src="item.worldCupCompetition.nationalFlag2">
                      </div>
                    </div>
                  </div>
                  <div class="score" :class="{victory:item.victoryDefeat == true}">{{item.victoryDefeat?'+':'-'}}{{item.integral}}</div>
                </div>
                <div v-if="guessResultList.length==0" class="noData">暂无竞猜结果</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 3. 竞猜提示    竞猜成功/积分不足 -->
        <div class="winScore guessTips" v-if="popUpProps.name=='guessTips'">
          <div class="closeBtn" @click.stop.prevent="closePopUp"></div>
          <div class="modelMain">
            <!--竞猜成功-->
            <div v-if="popUpProps.option.tip=='guessSuccess'">
              <div class="section-one">
                <div class="tips-txt">恭喜竞猜成功</div>
                <div class="tips-img"><img src="../../assets/img/varyActivity/popUpModel625/guess200.png"></div>
                <div class="tips-des">
                  <span>{{popUpProps.option.country}}：{{popUpProps.option.slogan}}</span>
                </div>
              </div>
              <div class="section-two">
                <div @click.stop.prevent="checkGuessHistory">查看我的竞猜</div>
              </div>
            </div>
            <!--竞猜失败  积分不足-->
            <div v-if="popUpProps.option.tip=='lessScore'">
              <div class="section-one">
                <div class="tips-txt">竞猜失败</div>
                <div class="tips-img"><img src="../../assets/img/varyActivity/popUpModel625/score-disable.png"></div>
                <div class="tips-des">
                  <span>非常抱歉，积分不足</span>
                  <span>快去领取吧~</span>
                </div>
              </div>
              <div class="section-two">
                <div @click.stop.prevent="closePopUp" @click="moreScore">获取更多积分</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 4. 竞猜-选择球队 淘汰赛 -->
        <div class="winScore chooseCountry" v-if="popUpProps.name=='guessCountry'">
          <div class="closeBtn" @click.stop.prevent="closePopUp"></div>
          <div class="modelMain">
            <div class="section-one">
              <div class="tips-txt">请确认你选择的球队</div>
              <div class="country">
                <div class="country1" @click.stop.prevent="setActiveData((popUpProps.option.data||{}).flag1,(popUpProps.option.data||{}).country1)" :class="{active:activeCountryData.flag == (popUpProps.option.data||{}).flag1}">
                  <div class="scoreRate">赢{{(popUpProps.option.data||{}).country1Odds}}倍</div>
                  <div class="falg-img"><img :src="(popUpProps.option.data||{}).nationalFlag1" :alt="(popUpProps.option.data||{}).country1"></div>
                  <div class="name">{{(popUpProps.option.data||{}).country1}}</div>
                </div>
                <div class="vs"></div>
                <div class="country2" @click.stop.prevent="setActiveData((popUpProps.option.data||{}).flag2,(popUpProps.option.data||{}).country2)" :class="{active:activeCountryData.flag == (popUpProps.option.data||{}).flag2}">
                  <div class="scoreRate">赢{{(popUpProps.option.data||{}).country2Odds}}倍</div>
                  <div class="falg-img"><img :src="(popUpProps.option.data||{}).nationalFlag2" :alt="(popUpProps.option.data||{}).country2"></div>
                  <div class="name">{{(popUpProps.option.data||{}).country2}}</div>
                </div>
              </div>
              <div class="supportRate">
                <div class="figure">
                  <div class="leftRate" :style="{width: popUpProps.option.rateOfSupport1/(popUpProps.option.rateOfSupport1+popUpProps.option.rateOfSupport2)*100+'%'}"></div>
                </div>
                <div class="des">当前支持率（{{popUpProps.option.rateOfSupport1}}:{{popUpProps.option.rateOfSupport2}}）</div>
              </div>
            </div>
            <div class="section-two">
              <input type="number" placeholder="请输入积分" @input="handleInputScore" v-model="score">
              <div :class="{disable:(score.length==0 || isNaN(score))}" @click.stop.prevent="guessCountry">支持</div>
            </div>
          </div>
        </div>
        <!-- 5. 竞猜-竞猜冠军 -->
        <div class="winScore chooseCountry guessChampion" v-if="popUpProps.name=='guessChampion'">
          <div class="closeBtn" @click.stop.prevent="closePopUp"></div>
          <div class="modelMain">
            <div class="section-one">
              <div class="tips-txt">竞猜冠军</div>
              <div class="country">
                <div class="country1">
                  <div class="scoreRate">赢{{popUpProps.option.rate}}倍</div>
                  <div class="falg-img"><img :src="popUpProps.option?popUpProps.option.data.worldCupCountry.nationalFlag:''" :alt="popUpProps.option?popUpProps.option.data.worldCupCountry.country:''"></div>
                  <div class="name">{{popUpProps.option?popUpProps.option.data.worldCupCountry.country:''}}</div>
                  <i class="chooseMark"></i>
                </div>
              </div>
            </div>
            <div class="section-two">
              <input type="number" placeholder="请输入积分" @input="handleInputChampionScore" v-model="championScore">
              <div :class="{disable:(championScore.length==0 || isNaN(championScore))}" @click="guessChampion">支持</div>
            </div>
          </div>
        </div>
        <!-- 6. 我的奖品 -->
        <div class="myAwards" v-if="popUpProps.name=='myCoupons'">
          <div class="closeBtn" @click.stop.prevent="closePopUp"></div>
          <div class="modelMain">
            <div class="hasAwards" v-if="bonusList.length!=0||rankingAwardsFlag">
              <div class="topAwards" v-if="rankingAwardsFlag" :class="{number1:rankingAwards.ranking==1,number2:rankingAwards.ranking==2,number3:rankingAwards.ranking==3}">
                <div class="left">
                  <div class="ranking">
                    <img class="medalImg" v-if="rankingAwards.ranking<4" :src="require('../../assets/img/varyActivity/popUpModel625/myAwards/medal0'+rankingAwards.ranking+'.png')">
                    <img class="rankingImg" :src="rankingAwards.rankingImg">
                  </div>
                  <div class="des">{{rankingAwards.name}} ({{rankingAwards.bonus}})</div>
                </div>
                <div class="right">
                  <img :src="rankingAwards.awardsImg">
                </div>
              </div>
              <div v-if="bonusList.length!=0">
                <div class="awards-item" v-for="(item,index) in bonusList" :key="index">
                  <div class="left">
                    <div class="yuan">
                      <img :class="{'coupon30':item.price/100==30,'coupon50':item.price/100==50,'coupon100':item.price/100==100,'coupon200':item.price/100==200}" :src="require('../../assets/img/varyActivity/popUpModel625/'+ item.price/100 +'.png')">
                      <span>元</span>
                    </div>
                    <div class="des">{{item.bonusModelNote}}</div>
                  </div>
                  <div class="right">
                    <span>数量：X {{item.bonusNum}}</span>
                    <span @click.stop.prevent="goGoodscategory">立即下单</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="noAwards" v-else>暂无奖品信息</div>
          </div>
        </div>
        <!-- 7. 签到日历 -->
        <div class="signed" v-if="popUpProps.name=='calendar'">
          <div class="closeBtn" @click.stop.prevent="closePopUp"></div>
          <div class="modelMain">
            <div class="tips">
              <div class="tips-time">
                <span :class="{disable:disablePre}" @click.stop.prevent="preMonth()">上月</span>
                <span>
                  <img src="../../assets/img/varyActivity/popUpModel625/date-icon.png">
                  {{iYear}}<i>-</i>{{iMonth}}
                </span>
                <span :class="{disable:disableNext}" @click.stop.prevent="nextMonth()">下月</span>
              </div>
              <div class="tips-txt">已连续签到<span>{{continueSignDay}}</span>天</div>
            </div>
            <div class="score">当前积分：{{popUpProps.option.totalIntegral || ''}}</div>
            <div class="canlendar" :class="{July:July}">
              <div class="date">
                <div class="day"  v-for="(n,index) in signedCanlendar" :class="{active:n}">
                  <span></span>
                  <span>{{index+1}}日</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 8. 积分详情 -->
        <div class="scoreHistory" v-if="popUpProps.name=='scoreHistory'">
          <div class="closeBtn" @click.stop.prevent="closePopUp"></div>
          <div class="modelMain">
            <div class="tit">
              <span>当前积分：{{userScoreRecord.totalIntegral}}</span>
              <span @click.stop.prevent="moreScore">获取更多积分</span>
            </div>
            <div class="con" v-if="userScoreRecord.worldCupUserIntegralRecordList && (userScoreRecord.worldCupUserIntegralRecordList||[]).length!=0">
              <div class="scoreItem" v-for="(item,index) in userScoreRecord.worldCupUserIntegralRecordList" :key="index">
                <span>{{item.remarks}}<i :class="{out:item.entryExitType==-1}">{{item.entryExitType==-1?'-'+item.integral:'+'+item.integral}}</i></span>
                <span>{{item.createTime}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 9. 第一次进入活动，获得100积分 -->
        <div class="winScore firstPart" v-if="popUpProps.name=='firstPartScore'">
          <div class="closeBtn" @click.stop.prevent="closePopUp"></div>
          <div class="modelMain">
            <div class="section-one">
              <div class="tips-txt">恭喜获得500积分</div>
              <div class="tips-img"><img src="../../assets/img/varyActivity/popUpModel625/score-active.png"></div>
              <div class="tips-des">
                <span>立即参与竞猜</span>
                <span>兑换超多优惠好礼</span>
              </div>
            </div>
            <div class="section-two">
              <div @click.stop.prevent="closePopUp">我知道了</div>
            </div>
          </div>
        </div>
        <!-- 10. 获取更多积分 -->
        <div class="wayGetScore" v-if="popUpProps.name=='wayGetScore'">
          <div class="closeBtn" @click.stop.prevent="closePopUp"></div>
          <div class="tips">
            <span class="des">点击右上角进行分享邀请</span>
            <span class="img"><img src="../../assets/img/varyActivity/popUpModel625/share-arrow.png"></span>
          </div>
          <div class="modelMain">
            <p>关注微信公众号：[<span style="font-weight: bold">蜜宝租赁</span>]<br /> <span class="red">每日分享本活动</span>即得50积分</p>
            <p><span class="red">每邀请1位好友</span>得200积分</p>
            <p>每日仅限邀请5位好友</p>
            <ul>
              <li v-for="i in 5" :class="{active:(i<=inviteNum)}"></li>
            </ul>
            <div class="getScore-img"></div>
          </div>
        </div>
        <!-- 11. 前10名中奖提示弹窗 -->
        <div class="winScore winPrize" v-if="popUpProps.name=='winPrize'">
          <div class="closeBtn" @click.stop.prevent="closePopUp"></div>
          <div class="modelMain">
            <div class="section-one">
              <div class="tips-txt">恭喜你获得 <i>第{{winPrizeInfo.ranking}}名</i></div>
              <div class="tips-img"><img :src="winPrizeInfo.imgUrl"></div>
              <div class="tips-des">
                <span>{{winPrizeInfo.name}}</span>
                <span>({{winPrizeInfo.bonus}})</span>
              </div>
            </div>
            <div class="section-two">
              <div @click.stop.prevent="checkMyAwards">查看我的奖品</div>
            </div>
          </div>
        </div>
      </div>
   </div>
</template>

<script>
import {imageServiceUrl} from '@/api/fetch.js';
import {scoreRecord, winCompetition, winCountry, guessHistory, guessResult,userInvitationCount,userPrize} from '@/api/activity.js';
import Toast from '@/components/toast.js';
import {formatDate} from '@/utils/verify.js';
import {getUserAgent} from '@/utils/common.js';
import {hostUrl} from '@/api/fetch.js';
import {statisEvent} from '@/utils/statisEvent.js';
import popUpPrizeGoodsList from '@/json/a20180625/popUpPrizeGoods10.js';
export default {
  name: 'popUp625',
  props: {
    popUpProps: {
      type: Object,
      default: function () {
        return {
          name: '',
          option: {}
        }
      }
    }
  },
  data: function(){
      return {
        userAgent:'',
        activityFlag:'worldCup',
        //  竞猜规则 / 积分规则
        rulesBox:'guess',
        // 2. 竞猜历史 / 竞猜结果
        guessInfoBox:'history',
        guessHistoryList:[],
        guessResultList:[],
        // 4. 淘汰赛
        activeCountryData: {
          flag:'',
          country:''
        },
        score: '',
        guessCountryFlag:true,
        // 5. 竞猜冠军
        championScore:'',
        guessChampionFlag:true,
        // 6. 我的奖品
        bonusList:[] ,
        rankingAwardsFlag:false,
        rankingAwards:{
          ranking:"",
          name:"",
          bonus:"",
          awardsImg:"",
          rankingImg:"",
        },
        // 8. 积分历史记录
        userScoreRecord:{
          totalIntegral:0,
          worldCupUserIntegralRecordList:[]
        },
        // 7. 签到日历
        iYear    : 0, // 当前年份
        iMonth   : 0, // 当前月份
        calendarRange  : [6,7],
        July:false,   // 当前月份是否为7月
        signedCanlendar: [],
        signList:[],  // 签到数据
        disableNext : false,
        disablePre  : false,
        continueSignDay:0, // 连续签到天数
        // 10.用户邀请人数
        inviteNum: 0,
        // 11. 弹出奖品信息
        winPrizeInfo: {
          ranking: 0,
          name:'',
          bonus:'',
          imgUrl:''
        },
      }
   },
   methods: {
     closePopUp() {
       this.$emit("close");
     },
     // 竞猜规则/积分规则
     switchRules(rules) {
        this.rulesBox = rules;
     },
     switchGuessInfo(guessInfo) {
       this.guessInfoBox = guessInfo;
     },
     handleInputScore() {
       this.score = this.score.replace(/[^\d]/g,'');
     },
     handleInputChampionScore() {
       this.championScore = this.championScore.replace(/[^\d]/g,'');
     },
     // 查看我的竞猜
     checkGuessHistory() {
       this.$emit("switchPopUp","guessRecord");
     },
     // 查看我的奖品
     checkMyAwards() {
       let options = {userRanking:this.winPrizeInfo.ranking,isShowAwards:true};
       this.$emit("switchPopUp","myCoupons",options);
     },
     // 2.1 竞猜历史
     getGuessHistory() {
       guessHistory().then(resp => {
         if(resp.code == 200){
           if(resp.data) {
             this.guessHistoryList = resp.data || [];
           }
         } else if (resp.code == 401) {
           this.$emit("loginFailed");
         } else {
           Toast(resp.message);
         }
       });
     },
     // 2.2 竞猜结果
     getGuessResult() {
       guessResult().then(resp => {
         if(resp.code == 200){
           if(resp.data) {
             this.guessResultList = resp.data || [];
           }
         } else if (resp.code == 401) {
           this.$emit("loginFailed");
         } else {
           Toast(resp.message);
         }
       });
     },
     // 3. 获取更多积分
     moreScore() {
       this.$emit("switchPopUp","wayGetScore");
     },
     // 4. 淘汰赛
     setActiveData(flag,country) {
       this.activeCountryData.flag = flag;
       this.activeCountryData.country = country;
     },
     guessCountry() {  //score
        if(!this.activeCountryData.flag) {
          Toast('请选择球队');
        } else if(this.score.length==0) {
          Toast('请输入积分');
          return;
        } else if(isNaN(this.score)) {
          Toast('积分格式不正确');
          return;
        } else if(this.score == 0) {
          Toast('投注积分不能为0');
          return;
        } else if(this.popUpProps.option.userScore == 0) {
          let options = {tip:'lessScore'};  // 弹出积分不足弹窗
          this.$emit("switchPopUp",'guessTips',options);
          return;
        } else if(this.score > this.popUpProps.option.userScore) {
          Toast('您的积分不足，目前账户积分'+this.popUpProps.option.userScore);
          return;
        } else if(!this.guessCountryFlag) {
          return ;
        } else {
          let params = {
            activityFlag: this.activityFlag,
            competitionCountryFlag: this.activeCountryData.flag,
            competitionId: this.popUpProps.option.data.id,
            integral:this.score
          }
          this.guessCountryFlag = false;
          winCountry(params).then(resp => {
            if(resp.code == 200){
              const options = {
                tip: 'guessSuccess',
                country: this.activeCountryData.country,
                slogan: resp.data.slogan
              }
              this.$emit("switchPopUp",'guessTips',options);
              this.$emit("refreshModel",'guessCountry');
              this.userStatisEvent('胜负竞猜','投注成功');
            } else if (resp.code == 401) {
              this.$emit("loginFailed");
            } else {
              Toast(resp.message);
            }
            let _this = this;
            setTimeout(function(){
              _this.guessCountryFlag = true;
            },5000);
          }).catch(e=>{
            Toast('网络错误，请稍后重试');
            let _this = this;
            setTimeout(function(){
              _this.guessCountryFlag = true;
            },5000);
          });
        }
     },
     // 5. 竞猜冠军
     guessChampion() {
       if(this.championScore.length==0) {
         Toast('请输入积分');
         return;
       } else if(isNaN(this.championScore)) {
         Toast('积分格式不正确');
         return;
       } else if(this.championScore == 0) {
         Toast('投注积分不能为0');
         return;
       } else if(this.popUpProps.option.userScore == 0) {
         let options = {tip:'lessScore'};  // 弹出积分不足弹窗
         this.$emit("switchPopUp",'guessTips',options);
         return;
       } else if(this.championScore > this.popUpProps.option.userScore) {
         Toast('您的积分不足，目前账户积分'+this.popUpProps.option.userScore);
         return;
       } else if(!this.guessChampionFlag) {
         return;
       } else {
         let params = {
           activityFlag: this.activityFlag,
           competitionCountryFlag: this.popUpProps.option.data.worldCupCountry.flag,
           integral:this.championScore
         }
         this.guessChampionFlag = false;
         winCompetition(params).then(resp => {
           if(resp.code == 200){
             const options = {
               tip: 'guessSuccess',
               country: this.popUpProps.option.data.worldCupCountry.country,
               slogan: resp.data.slogan
             }
             this.$emit("switchPopUp",'guessTips',options);
             this.$emit("refreshModel",'guessChampion');
             this.userStatisEvent('冠军球队','投注成功');
           } else if (resp.code == 401) {
             this.$emit("loginFailed");
           } else {
             Toast(resp.message);
           }
           let _this = this;
           setTimeout(function(){
             _this.guessChampionFlag = true;
           },5000);
         }).catch(e=>{
           Toast('网络错误，请稍后重试');
           let _this = this;
           setTimeout(function(){
             _this.guessChampionFlag = true;
           },5000);
         });
       }
     },
     // 6. 我的奖品
     getMyBonus() {
       userPrize().then(resp => {
         if(resp.code == 200){
           if(resp.data) {
              this.bonusList = resp.data;
           }
         } else {
           Toast(resp.message);
         }
       })
     },
     goGoodscategory() {   // 立即下单--跳转分类页面
       this.userStatisEvent('立即下单');    // 数据统计
       setTimeout(function(){
         if (this.userAgent=='mibao') {
           goSchemeUrlOpenAppUi2('category');
         } else {
           window.location.href = hostUrl + "#/tabs/category" ;
         }
       },200);
     },
     // 7. 签到日历
     initSigned() {
       let date   = new Date();
       this.iYear   = date.getFullYear();
       this.iMonth   = ('0'+(date.getMonth()+1)).slice(-2);
       this.signedRending(this.iMonth);
     },
     preMonth() {
       if(this.iMonth-1 >= this.calendarRange[0] && this.iMonth-1 <= this.calendarRange[1]) {
         this.iMonth = ('0' + (parseInt(this.iMonth) - 1)).slice(-2);
         this.signedRending(this.iMonth);
       }
     },
     nextMonth() {
       let month = parseInt(this.iMonth);
       if(month+1 >= this.calendarRange[0] && month+1 <= this.calendarRange[1]) {
         this.iMonth = ('0' + (month + 1)).slice(-2);
         this.signedRending(this.iMonth);
       }
     },
     //  返回描述是否签到的数组
     signedRending(month) {
       let dayNum = new Date(this.iYear,this.iMonth,0).getDate();
       this.signedCanlendar = [];
       for (let i=1; i<=dayNum; i++) {
         this.signedCanlendar.push(this.compareDate(i,month));
       }
     },
     compareDate(day,iMonth) {
       let signList = this.signList;
       for(let j=0; j<signList.length; j++) {
         let date = new Date(signList[j]);
         if(date.getDate() == day && date.getMonth()+1 == iMonth) {
           return true;
         }
       }
       return false;
     },
     // 判断连续签到天数
     checkContinueSignDay(stampArr) { // 最近签到的在最后
       let len = stampArr.length;
       let day = 1;
       for(let i=len-1; i>0; i--) {
         let month = new Date(stampArr[i]).getMonth();
         let date = new Date(stampArr[i]).getDate();
         let newStamp = Date.parse(new Date(2018,month,date,0,0,0));
         let difDay = (newStamp-stampArr[i-1])/1000/ (60 * 60 * 24);
         if(difDay <= 1) {
           day ++;
         } else {
           break;
         }
       }
       return day;
     },
     // 8. 积分详情
     scoreHistory() {
       scoreRecord(this.activityFlag).then(resp => {
         if(resp.code == 200){
           if(resp.data) {
             let data = resp.data;
             let listLen = data.worldCupUserIntegralRecordList.length;
             for(let i = 0; i<listLen; i++) {
               data.worldCupUserIntegralRecordList[i].createTime = formatDate(data.worldCupUserIntegralRecordList[i].createTime,'yyyy-MM-dd HH:mm');
             }
             this.userScoreRecord = data;
           }
         } else if (resp.code == 401) {
           this.$emit("loginFailed");
         } else {
           Toast(resp.message);
         }
       });
     },
     // 10. 获取用户邀请人数
     getInviteNum() {
       userInvitationCount().then(resp => {
         if(resp.code == 200){
           if(resp.data) {
             this.inviteNum = resp.data;
           }
         }
       })
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
     if(this.popUpProps.name == 'scoreHistory') {   // 积分历史
       this.scoreHistory();
     } else if(this.popUpProps.name == 'calendar') {  // 签到日历
       this.signList = this.popUpProps.option.sginDateList || [];
       this.continueSignDay = this.checkContinueSignDay(this.signList);
       if(this.popUpProps.option.currentIntegral) {
         Toast('您已连续签到'+ this.continueSignDay +'天，获得+' + this.popUpProps.option.currentIntegral+'积分');
       }
       this.initSigned();
     } else if(this.popUpProps.name == 'guessRecord') { // 竞猜历史/竞猜结果
       this.getGuessHistory();
       this.getGuessResult();
     } else if(this.popUpProps.name == 'wayGetScore') { // 获取更多积分--邀请人数
       this.getInviteNum();
     } else if(this.popUpProps.name == 'myCoupons') {   // 我的奖品
       this.getMyBonus();
       // 判断用户排名及是否展示奖品信息
       if(this.popUpProps.option&&this.popUpProps.option.length!=0&&this.popUpProps.option.userRanking<=10&&this.popUpProps.option.userRanking>0) {
         let _this = this;
         popUpPrizeGoodsList.forEach(function(value, index) {
           if(value.ranking==_this.popUpProps.option.userRanking) {
             _this.rankingAwards = value;
           }
         });
         if(_this.popUpProps.option.isShowAwards) this.rankingAwardsFlag = _this.popUpProps.option.isShowAwards;
       }
     } else if(this.popUpProps.name == 'winPrize') {    // 7.20前10名弹窗
       let _this = this;
       popUpPrizeGoodsList.forEach(function(value, index) {
         if(value.ranking==_this.popUpProps.option.userRanking) {
           _this.winPrizeInfo = value;
         }
       });
     }
   },
   watch: {
    iMonth: function(newVal,oldVal) {
      if(newVal>=this.calendarRange[1]) {
        this.disableNext = true;
      } else {
        this.disableNext = false;
      }
      if(newVal<=this.calendarRange[0]) {
        this.disablePre = true;
      } else {
        this.disablePre = false;
      }
      if(newVal == 7) {
        this.July = true;
      } else {
        this.July = false;
      }
    },
   },

   //score
}
</script>

<style lang="scss" scoped>
  button,ul,li {padding: 0;margin: 0;}
$real-px: 37.5;
@function calRem($px-input){
   @return ($px-input/$real-px)/2;
}
// S -----公共样式------
.btn-blue {
  width: calRem(252rem);
  padding: calRem(20rem) 0;
  line-height: 1;
  font-size:calRem(28rem);
  color: #fff;
  text-align: center;
  border: calRem(4rem) solid #4578DA;
  background: #2556B4;
  border-radius: calRem(10rem);
  box-sizing: content-box;
}
.btn-yellow {
  width: calRem(252rem);
  height: calRem(68rem);
  line-height: calRem(68rem);
  font-size:calRem(28rem);
  color: #9C491B;
  text-align: center;
  border: calRem(4rem) solid #D99011;
  background: #FAC949;
  border-radius: calRem(10rem);
  box-sizing: content-box;
}
.closeBtn {
  width: calRem(48rem);
  height: calRem(48rem);
  background: url("../../assets/img/varyActivity/popUpModel625/closeBtn.png") no-repeat center;
  background-size: contain;
}
.field {
  width: calRem(612rem);
  margin: 0 auto calRem(28rem);
  position: relative;
  border: calRem(2rem) solid #608DE0;
  border-radius: calRem(8rem);
  .field-title {
    height: calRem(34rem);
    line-height: calRem(34rem);
    background: #5FA3F7;
    border-radius: calRem(17rem);
    color: #fff;
    font-size: calRem(24rem);
    display: inline-flex;
    align-items: center;
    padding: 0 calRem(25rem);
    font-weight: normal;
    position: relative;
    margin: 0 auto;
    top: calRem(-17rem);
    & i {
      width: calRem(13rem);
      height: calRem(2rem);
      background: #fff;
    }
    & i:first-child {
      margin-right: calRem(8rem);
    }
    & i:last-child {
      margin-left: calRem(8rem);
    }
  }
}
// E -----公共样式------
.popUp {
  position:fixed;
  width:100%;
  height:100%;
  z-index:99;
  background: rgba(10,10,10,0.8);
  left: 0; top:0;
  overflow: hidden;
}
// 1. 规则介绍    竞猜规则/积分规则
.rules {
  position: relative;
  width: calRem(750rem);
  margin: calRem(160rem) auto 0;
  .closeBtn {
    position: absolute;
    right: calRem(54rem);
    top: 0;
  }
  .modelMain {
    height: calRem(895rem);
    box-sizing: border-box;
    padding-top: calRem(170rem);
    background: url("../../assets/img/varyActivity/popUpModel625/rules-bg.png") no-repeat center;
    background-size: contain;
    .top {
      display: flex;
      justify-content: center;
      margin-bottom: calRem(20rem);
      button:first-child {
        margin-right: calRem(16rem);
      }
    }
    .rules-con {
      height: calRem(544rem);
      overflow-y: scroll;
      padding-top: calRem(18rem);
      & div {
        p.des {
          color: #4578DA;
          font-size: calRem(20rem);
          line-height: calRem(26rem);
          width: calRem(588rem);
          margin: 0 auto calRem(6rem);
          text-align: left;
        }
      }
      .rules-txt {
        font-size: calRem(20rem);
        text-align: left;
        padding: 0 calRem(22rem) calRem(14rem);
        color: #4578DA;
        p {
          line-height: calRem(26rem);
          margin-bottom: calRem(6rem);
          span {
            color: #5FA3F7;
            display: block;
          }
        }
        p.red {
          color: #BF3439;
        }
      }
    }
  }
}
// 2. 我要竞猜    竞猜历史/竞猜结果
.guess {
  position: relative;
  width: calRem(750rem);
  margin: calRem(160rem) auto 0;
  .closeBtn {
    position: absolute;
    right: calRem(54rem);
    top: 0;
  }
  .modelMain {
    height: calRem(832rem);
    box-sizing: border-box;
    padding-top: calRem(170rem);
    background: url("../../assets/img/varyActivity/popUpModel625/guess-bg.png") no-repeat center;
    background-size: contain;
    .top {
      display: flex;
      justify-content: center;
      margin-bottom: calRem(20rem);
      button:first-child {
        margin-right: calRem(16rem);
      }
    }
    .guess-con {
      height: calRem(500rem);
      .noData {
        height: calRem(400rem);
        line-height: calRem(280rem);
        color: #4578DA;
      }
      .guess-history {
        padding-top: calRem(26rem);
        height: calRem(466rem);
        overflow: scroll;
        .history-item {
          height: calRem(46rem);
          box-sizing: content-box;
          padding: 0 calRem(22rem);
          display: flex;
          justify-content: flex-start;
          align-items: center;
          background: #fff;
          span {
            color: #608DE0;
            font-size: calRem(20rem);
            text-align: left;
          }
          & span:first-child {
            width: calRem(130rem);
          }
          & span:nth-child(2) {
            width: calRem(440rem);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .history-item:nth-child(2n+1) {
          background: #E9F1FF;
        }
        .history-item:last-child {
          border-radius: 0 0 calRem(8rem) calRem(8rem);
        }
      }
      .guess-result {
        position: relative;
        width: calRem(634rem);
        margin: 0 auto;
        height: calRem(500rem);
        overflow-y: scroll;
        .result-item {
          height: calRem(74rem);
          display: flex;
          background: #fff;
          align-items: center;
          .tit {
            width: calRem(82rem);
            height: calRem(38rem);
            line-height: calRem(38rem);
            background: url("../../assets/img/varyActivity/popUpModel625/game-tit-bg.png") no-repeat left center;
            background-size: contain;
            color: #9C491B;
            display: inline-flex;
            align-items: center;
            text-indent: calRem(8rem);
            font-size: calRem(18rem);
          }
          .country {
            width: calRem(400rem);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 calRem(20rem) 0 calRem(12rem);
            .vs {
              width: calRem(36rem);
              height: calRem(22rem);
              background: url("../../assets/img/varyActivity/popUpModel625/vs.png") no-repeat center;
              background-size: contain;
              margin: 0 calRem(10rem);
            }
            .country1,.country2 {
              position: relative;
              width: calRem(174rem);
              height: calRem(49rem);
              border-radius: calRem(25rem);
              border: calRem(4rem) solid #4578DA;
              display: flex;
              position: relative;
              background: #fff;
              .ctryName {
                width: calRem(98rem);
                height: calRem(49rem);
                color: #2556B4;
                display: inline-flex;
                align-items: center;
                font-size: calRem(18rem);
                justify-content: center;
              }
              .ctryFlag {
                width: calRem(56rem);
                height: calRem(56rem);
                border-radius: 100%;
                border: calRem(4rem) solid #4578DA;
                position: absolute;
                background: #fff;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 100%;
                }
              }
            }
            .country1 {
              border-right: none;
              .ctryName {
                justify-content: flex-end;
                margin-right: calRem(11rem);
              }
              .ctryFlag {
                right: calRem(-4rem);
                top: 50%;
                margin-top: calRem(-32rem);
              }
            }
            .country1.win:before {
              content: ' ';
              width: calRem(27rem);
              height: calRem(30rem);
              background: url("../../assets/img/varyActivity/popUpModel625/cup.png") no-repeat center;
              background-size: contain;
              position: absolute;
              right: calRem(-14rem); top: calRem(-14rem);
              z-index: 1;
            }
            .country1.choosed:after {
              content: ' ';
              width: calRem(36rem);
              height: calRem(24rem);
              background: url("../../assets/img/varyActivity/popUpModel625/chooseMark-ico2.png") no-repeat center;
              background-size: contain;
              position: absolute;
              left: calRem(-4rem); top: calRem(-4rem);
              z-index: 1;
            }
            .country2 {
              border-left: none;
              justify-content: flex-end;
              .ctryName {
                justify-content: flex-start;
              }
              .ctryFlag {
                left: calRem(-4rem);
                top: 50%;
                margin-top: calRem(-32rem);
              }
            }
            .country2.win:before {
              content: ' ';
              width: calRem(27rem);
              height: calRem(30rem);
              background: url("../../assets/img/varyActivity/popUpModel625/cup.png") no-repeat center;
              background-size: contain;
              position: absolute;
              left: calRem(-14rem); top: calRem(-14rem);
              transform: rotate(-60deg);
              z-index: 1;
            }
            .country2.choosed:after {
              content: ' ';
              width: calRem(36rem);
              height: calRem(24rem);
              background: url("../../assets/img/varyActivity/popUpModel625/chooseMark-ico.png") no-repeat center;
              background-size: contain;
              position: absolute;
              right: calRem(-4rem); top: calRem(-4rem);
              z-index: 1;
              border-top-right-radius:calRem(25rem);
            }
          }
          .score {
            width: calRem(108rem);
            height: calRem(32rem);
            color: #A9A7A7;
            background: #D9D8D8;
            font-size: calRem(20rem);
            border-radius: calRem(18rem);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-left: calRem(3rem);
          }
          .score.victory {
            color: #fff;
            background: #CF3647;
          }
        }
        .result-item:nth-child(2n) {
          background: #E9F1FF;
        }
      }
    }
  }
}
// 3. 竞猜提示    竞猜成功/积分不足
.winScore {
  position: relative;
  width: calRem(540rem);
  margin: calRem(200rem) auto 0;
  .closeBtn {
    position: absolute;
    right: 0;
    top: calRem(-48rem);
  }
  .modelMain {
    height: calRem(637rem);
    box-sizing: border-box;
    padding-top: calRem(156rem);
    background: url("../../assets/img/varyActivity/popUpModel625/winScore-bg.png") no-repeat center;
    background-size: contain;
    .section-one {
      height: calRem(346rem);
      .tips-txt {
        width: calRem(261rem);
        padding: calRem(4rem) 0;
        background: #5FA3F7;
        color: #fff;
        border-radius: calRem(17rem);
        margin: 0 auto;
        text-align: center;
      }
    }
    .section-two {
      height: calRem(122rem);
    }
  }
}
.guessTips {
  .modelMain {
    .tips-img {
      width: calRem(247rem);
      height: calRem(167rem);
      margin: calRem(32rem) auto calRem(20rem);
    }
    .tips-des {
      color: #4578DA;
      & span {
        display: block;
        text-align: center;
        width:calRem(430rem);
        margin: 0 auto calRem(5rem);
        font-size: calRem(24rem);
        line-height: calRem(26rem);
      }
    }
  }
  .section-two {
    overflow: hidden;
    & div {
      width: calRem(398rem);
      height: calRem(88rem);
      background: url("../../assets/img/varyActivity/popUpModel625/knowBtn-bg.png") no-repeat center;
      background-size: contain;
      box-sizing: border-box;
      padding-top: calRem(25rem);
      color: #fff;
      font-size: calRem(30rem);
      margin: 0 auto;
    }
  }
}
// 4. 竞猜 -- 选择球队
.chooseCountry {
  .section-one {
    .country {
      width:calRem(388rem);
      height: calRem(168rem);
      margin: calRem(30rem) auto calRem(30rem);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .vs {
        width: calRem(63rem);
        height: calRem(35rem);
        background: url("../../assets/img/varyActivity/popUpModel625/vs.png") no-repeat center;
        background-size: contain;
        margin: 0 calRem(10rem);
      }
      .country1,.country2 {
        width: calRem(134rem);
        height: calRem(168rem);
        background: #e0edfe;
        border-radius: calRem(8rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
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
          line-height: calRem(46rem);
          color: #2b65cd;
          font-size: calRem(24rem);
          text-align: center;
        }
      }
      .country1.active,.country2.active {
        background: #4578da;
        position: relative;
        & div {
          color: #fff;
        }
        &:before {
          content: '.';
          text-indent: -9999px;
          width: calRem(36rem);
          height: calRem(24rem);
          background: url("../../assets/img/varyActivity/popUpModel625/chooseMark-ico.png") no-repeat center;
          background-size: contain;
          position: absolute;
          right: calRem(-6rem); top: calRem(-6rem);
          z-index: 1;
        }
      }
    }
    .supportRate {
      width: calRem(240rem);
      margin: 0 auto;
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
          background: url("../../assets/img/varyActivity/popUpModel625/leftRate-bg.png") no-repeat top right;
          background-size: auto 100%;
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
  }
  .section-two {
    display: flex;
    justify-content: center;
     & input {
       width: calRem(242rem);
       height: calRem(88rem);
       border-radius: calRem(6rem);
       text-align: center;
       font-size: calRem(24rem);
       margin-right: calRem(20rem);
       color:#4578DA;
     }
     & input::-webkit-input-placeholder{
       color:#4578DA;
     }
     & input::-moz-placeholder{   /* Mozilla Firefox 19+ */
       color:#4578DA;
     }
     & input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
       color:#4578DA;
     }
     & input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
       color:#4578DA;
     }
     & div {
       width: calRem(198rem);
       height: calRem(88rem);
       background: url("../../assets/img/varyActivity/popUpModel625/supportBtn-bg.png") no-repeat center;
       background-size: contain;
       color: #fff;
       box-sizing: border-box;
       padding-top: calRem(25rem);
       font-size: calRem(30rem);
     }
     & div.disable {
       color: rgba(255,255,255,0.5);;
     }
  }
}
// 5. 竞猜 -- 竞猜冠军
.guessChampion {
  .section-one {
    .country {
      justify-content: center;
      .country1 {
        background: #4578da;
        position: relative;
        overflow: hidden;
        & div.scoreRate, & div.name {
          color: #fff;
        }
        & .chooseMark {
          width: calRem(36rem);
          height: calRem(24rem);
          background: url("../../assets/img/varyActivity/popUpModel625/chooseMark-ico.png") no-repeat center;
          background-size: contain;
          position: absolute;
          right: calRem(-6rem); top: calRem(-6rem);
        }
      }
    }
  }
}
// 6. 我的奖品
.myAwards {
  position: relative;
  width: calRem(750rem);
  margin: calRem(160rem) auto 0;
  .closeBtn {
    position: absolute;
    right: calRem(54rem);
    top: 0;
  }
  .modelMain {
    height: calRem(832rem);
    box-sizing: border-box;
    padding-top: calRem(170rem);
    background: url("../../assets/img/varyActivity/popUpModel625/myAwards-bg.png") no-repeat center;
    background-size: contain;
    .noAwards {
      font-size: calRem(30rem);
      color: #4578DA;
      text-align: center;
      padding-top: calRem(225rem);
    }
    .hasAwards {
      width: calRem(576rem);
      height: calRem(576rem);
      overflow-y: scroll;
      padding-top: calRem(24rem);
      margin: 0 auto;
      .awards-item,.topAwards {
        width: calRem(576rem);
        height: calRem(116rem);
        overflow: hidden;
        margin-bottom: calRem(20rem);
        display: flex;
        .left {
          box-sizing: border-box;
          width: calRem(344rem);
          height: calRem(116rem);
          padding-left: calRem(40rem);
          padding-top: calRem(4rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          .yuan {
            display: flex;
            margin-bottom: calRem(10rem);
            & img {
              width: calRem(160rem);
              height: calRem(60rem);
              margin-right: calRem(4rem);
            }
            .coupon30 {
              width: calRem(97rem);
              height: calRem(47rem);
            }
            .coupon50 {
              width: calRem(99rem);
              height: calRem(47rem);
            }
            .coupon100 {
              width: calRem(123rem);
              height: calRem(47rem);
            }
            .coupon200 {
              width: calRem(151rem);
              height: calRem(47rem);
            }
            & span{
              color: #fff;
              font-size: calRem(20rem);
              padding-top: calRem(24rem);
              transform: skewX(-8deg);
            }
          }
          .des {
            color: #fff;
            font-size: calRem(20rem);
            text-align: left;
            line-height: 1;
          }
        }
        .right {
          width: calRem(232rem);
          height: calRem(116rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          & span:first-child {
            color: #2556B4;
            margin-bottom: calRem(10rem);
          }
          & span:last-child {
            width: calRem(152rem);
            height: calRem(46rem);
            line-height: calRem(46rem);
            background: #FAC949;
            color: #9C491B;
            text-align: center;
            border-radius: calRem(6rem);
            box-shadow: 0 0 calRem(16rem) #FAC949;
          }
        }
      }
      .awards-item:first-child {
        background: url("../../assets/img/varyActivity/popUpModel625/coupons-bg01.png") no-repeat center;
        background-size: contain;
      }
      .awards-item:nth-child(2) {
        background: url("../../assets/img/varyActivity/popUpModel625/coupons-bg02.png") no-repeat center;
        background-size: contain;
      }
      .awards-item:nth-child(3) {
        background: url("../../assets/img/varyActivity/popUpModel625/coupons-bg03.png") no-repeat center;
        background-size: contain;
      }
      .awards-item:nth-child(4) {
        background: url("../../assets/img/varyActivity/popUpModel625/coupons-bg04.png") no-repeat center;
        background-size: contain;
      }
      .topAwards {
        background: url("../../assets/img/varyActivity/popUpModel625/myAwards/myAwards-bg04.png") no-repeat center;
        background-size: contain;
        &.number1 {
          background: url("../../assets/img/varyActivity/popUpModel625/myAwards/myAwards-bg01.png") no-repeat center;
          background-size: contain;
        }
        &.number2 {
          background: url("../../assets/img/varyActivity/popUpModel625/myAwards/myAwards-bg02.png") no-repeat center;
          background-size: contain;
        }
        &.number3 {
          background: url("../../assets/img/varyActivity/popUpModel625/myAwards/myAwards-bg03.png") no-repeat center;
          background-size: contain;
        }
        .left {
          align-items: flex-start;
          .ranking {
            height: calRem(48rem);
            margin-bottom: calRem(6rem);
            display: flex;
            .medalImg {
              width: calRem(40rem);
              height: calRem(48rem);
              margin-right: calRem(12rem);
            }
            .rankingImg {
              width: auto;
              height: calRem(43rem);
            }
          }
        }
        .right {
          & img {
            width: calRem(186rem);
          }
        }
      }
    }
  }
}
// 7. 签到日历
.signed {
  position: relative;
  width: calRem(750rem);
  margin: calRem(160rem) auto 0;
  .closeBtn {
    position: absolute;
    right: calRem(54rem);
    top: 0;
  }
  .modelMain {
    height: calRem(824rem);
    box-sizing: border-box;
    padding-top: calRem(180rem);
    background: url("../../assets/img/varyActivity/popUpModel625/signed-bg.png") no-repeat center;
    background-size: contain;
    .tips {
      width: calRem(472rem);
      height: calRem(34rem);
      background: #5FA3F7;
      border-radius: calRem(17rem);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto calRem(15rem);
      .tips-time {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: calRem(18rem);
        & span {
          color: #2B65CD;
          display: inline-block;
        }
        & span.disable {
          opacity: 0.5;
        }
        & span:first-child {
          width: calRem(37rem);
          height: calRem(34rem);
          background: url("../../assets/img/varyActivity/popUpModel625/arrowL-icon.png") no-repeat center;
          background-size: contain;
          text-indent: -9999px;
        }
        & span:nth-child(2) {
          width: calRem(160rem);
          height: calRem(34rem);
          background: url("../../assets/img/varyActivity/popUpModel625/date-border.png") no-repeat center;
          background-size: contain;
          margin: 0 calRem(4rem);
          display: flex;
          justify-content: center;
          align-items: center;
          & img {
            width: calRem(18rem);
            height: calRem(20rem);
            margin-right: calRem(5rem);
          }
          & i {
            padding: 0 calRem(8rem);
          }
        }
        & span:last-child {
          width: calRem(37rem);
          height: calRem(34rem);
          background: url("../../assets/img/varyActivity/popUpModel625/arrowR-icon.png") no-repeat center;
          background-size: contain;
          text-indent: -9999px;
        }
      }
      .tips-txt {
        font-size: calRem(24rem);
        color: #fff;
        & span {
          color: #FAC949;
          padding: 0 calRem(8rem);
          font-weight: bold;
        }
      }
    }
    .score {
      color: #4578DA;
      font-size: calRem(20rem);
      text-align: center;
      margin-bottom: calRem(16rem);
    }
    .canlendar {
      width: calRem(548rem);
      height: calRem(480rem);
      background: url("../../assets/img/varyActivity/popUpModel625/date-bg.png") no-repeat center calRem(9rem);
      background-size: contain;
      margin: 0 auto;
      .date {
        width: calRem(492rem);
        height: calRem(440rem);
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        .day {
          width: calRem(70rem);
          margin-bottom: calRem(28rem);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          & span:first-child {
            width: calRem(38rem);
            height: calRem(42rem);
            background: url("../../assets/img/varyActivity/popUpModel625/unsign.png") no-repeat center;
            background-size: contain;
            display: inline-block;
            margin: 0 auto;
          }
          & span:last-child {
            color: #2B65CD;
            font-size: calRem(20rem);
            text-align: center;
            display: inline-block;
            margin: calRem(8rem) auto 0;
          }
        }
        .day.active span:first-child {
          background: url("../../assets/img/varyActivity/popUpModel625/signed.png") no-repeat center;
          background-size: contain;
        }
      }
    }
    .canlendar.July {
      background: url("../../assets/img/varyActivity/popUpModel625/date-bg-7.png") no-repeat center calRem(9rem);
      background-size: contain;
    }
  }
}
// 8. 积分详情
.scoreHistory {
  position: relative;
  width: calRem(750rem);
  margin: calRem(160rem) auto 0;
  .closeBtn {
    position: absolute;
    right: calRem(54rem);
    top: 0;
  }
  .modelMain {
    height: calRem(824rem);
    box-sizing: border-box;
    padding-top: calRem(170rem);
    background: url("../../assets/img/varyActivity/popUpModel625/scoreHistory-bg.png") no-repeat center;
    background-size: contain;
    .tit {
      box-sizing: border-box;
      padding-left: calRem(24rem);
      width: calRem(612rem);
      margin: 0 auto calRem(14rem);
      display: flex;
      justify-content: flex-start;
      & span {
        color: #4578DA;
        font-size: calRem(20rem);
        display: inline-block;
        text-align: left;
      }
      & span:first-child {
        width: calRem(228rem);
      }
      & span:last-child {
        border-bottom: calRem(2rem) solid #4578DA;
      }
    }
    .con {
      width: calRem(612rem);
      border: calRem(2rem) solid #4578DA;
      border-radius: calRem(8rem);
      overflow: hidden;
      margin: 0 auto;
      max-height: calRem(544rem);
      overflow-y: scroll;
      .scoreItem {
        box-sizing: border-box;
        padding:0 calRem(24rem);
        height: calRem(46rem);
        background: #fff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        & span {font-size:calRem(20rem);display: inline-block;}
        & span:first-child {
          color: #457ada;
          width: calRem(340rem);
          text-align: left;
          & i {
            color: #cf3647;
            padding: 0 calRem(8rem);
            font-weight: bold;
          }
          & i.out {
            color: #ffc401;
          }
        }
        & span:last-child {
          color: #4578da;
        }
      }
      .scoreItem:nth-child(2n) {
        background: #E9F1FF;
      }
    }
  }
}
// 9. 第一次进入活动，获得100积分
.firstPart {
  .modelMain {
    background: url("../../assets/img/varyActivity/popUpModel625/firstPart-bg.png") no-repeat center;
    background-size: contain;
    .tips-img {
      width: calRem(247rem);
      height: calRem(167rem);
      margin: calRem(32rem) auto calRem(20rem);
    }
    .tips-des {
      color: #4578DA;
      & span {
        display: block;
        text-align: center;
        margin-bottom: calRem(5rem);
      }
    }
  }
  .section-two {
    overflow: hidden;
    & div {
      width: calRem(398rem);
      height: calRem(88rem);
      background: url("../../assets/img/varyActivity/popUpModel625/knowBtn-bg.png") no-repeat center;
      background-size: contain;
      box-sizing: border-box;
      padding-top: calRem(25rem);
      color: #fff;
      font-size: calRem(30rem);
      margin: 0 auto;
    }
  }
}
// 10.获取更多积分
.wayGetScore {
  position: relative;
  width: calRem(750rem);
  margin: calRem(120rem) auto 0;
  .closeBtn {
    position: absolute;
    right: calRem(54rem);
    top: 0;
    z-index: 500;
  }
  .tips {
    position: absolute;
    width: calRem(280rem);
    right: calRem(34rem);
    top: calRem(-80rem);
    & .des {
      display: block;
      font-size: calRem(24rem);
      color: #fff;
      margin-bottom: calRem(18rem);
      text-align: right;
    }
    & .img {
      display: block;
      width: calRem(67rem);
      height: calRem(46rem);
      margin-left: calRem(124rem);
      & img {
        width: 100%;
        height: auto;
      }
    }
  }
  .modelMain {
    height: calRem(860rem);
    box-sizing: border-box;
    padding-top: calRem(90rem);
    background: url("../../assets/img/varyActivity/popUpModel625/moreSocre-bg.png") no-repeat center top;
    background-size: contain;
    position: relative;
    & p {
      color: #4578DA;
      font-size: calRem(24rem);
      letter-spacing: calRem(2rem);
      line-height: calRem(32rem);
      .red {
        color: #CF3647;
      }
    }
    & p:first-child {
      margin-bottom: calRem(24rem);
      padding-top: calRem(140rem);
    }
    & p:nth-child(2) {
      //margin-bottom: calRem(4rem);
    }
    & p:nth-child(3) {
      font-size: calRem(20rem);
      margin-bottom: calRem(14rem);
      letter-spacing: calRem(1rem);
      line-height: calRem(30rem);
    }
    & ul {
      width: calRem(350rem);
      margin: 0 auto calRem(20rem);
      display: flex;
      justify-content: space-between;
      & li {
        width: calRem(54rem);
        height: calRem(54rem);
        background: url("../../assets/img/varyActivity/popUpModel625/user-ico.png") no-repeat center;
        background-size: contain;
      }
      & li.active {
        background: url("../../assets/img/varyActivity/popUpModel625/user-active-ico.png") no-repeat center;
        background-size: contain;
      }
    }
    .getScore-img {
      width: calRem(467rem);
      height: calRem(394rem);
      background: url("../../assets/img/varyActivity/popUpModel625/getScore.png") no-repeat center;
      background-size: contain;
      position: absolute;
      left: 0; right:0; top:calRem(432rem);
      border-bottom: 0;
      margin: 0 auto;
    }
  }
}
// 11.前10名中奖提示弹窗
.winPrize {
  .modelMain {
    background: url("../../assets/img/varyActivity/popUpModel625/winPrize-bg.png") no-repeat center;
    background-size: contain;
    .tips-txt {
      i {
        color: #FAC949;
      }
    }
    .tips-img {
      width: calRem(308rem);
      height: calRem(170rem);
      margin: calRem(28rem) auto calRem(20rem);
    }
    .tips-des {
      color: #4578DA;
      & span {
        display: block;
        text-align: center;
        margin-bottom: calRem(5rem);
      }
    }
  }
  .section-two {
    overflow: hidden;
    & div {
      width: calRem(398rem);
      height: calRem(88rem);
      background: url("../../assets/img/varyActivity/popUpModel625/knowBtn-bg.png") no-repeat center;
      background-size: contain;
      box-sizing: border-box;
      padding-top: calRem(25rem);
      color: #fff;
      font-size: calRem(30rem);
      margin: 0 auto;
    }
  }
}
</style>
