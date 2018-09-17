<template>
   <div id="love-letter">
     <div  class="view-wp">
       <div class="view-content">
         <scroll :bottomArea="0" :topArea="0" :pullDownRefresh="false" :pullUpLoad="false">
           <div class="wrapper">
             <!--S 封面页-->
             <div class="letter-cover" v-if="pageNum == 1">
               <div @click="start()" id="start">戳这里开始测试</div>
             </div>
             <!--E 封面页-->
             <!--S 内容页-->
             <div class="letter-content" v-if="pageNum == 2">
               <!--S 答题内容-->
               <div class="selectContent" :style="{backgroundImage: 'url(' + contentLists[pointer].img + ')'}">
                 <dl :class="{'twoChoose':contentLists[pointer].options.length == 2,'fiveChoose':contentLists[pointer].options.length == 5}">
                   <dd v-for="(item, index) in contentLists[pointer].options">
                     <label :for="item.value" :class="{'active':index == clickIndex}" @click="clickChoose(index)">
                       <span>{{item.option}} </span>
                       {{item.txt}}
                     </label>
                     <input type="radio" :id="item.value" :name="item.name" :value="item.value">
                   </dd>
                 </dl>
               </div>
               <!--S 答题内容-->
             </div>
             <!--S 结果-->
             <div class="letter-result" v-if="pageNum == 3">
               <div class="result" :style="{backgroundImage: 'url(' + resultImg + ')'}">
                 <div class="btn-area">
                   <div @click="testAgain()" class="again">再测一次</div>
                   <div @click="pressOrder()" class="order">点我下单</div>
                 </div>
               </div>
             </div>
             <!--E 结果-->
             <!--S 背景音乐按钮-->
             <div class="music-area">
               <audio id="music" controls autoplay preload loop hidden>
                 <source src="../../../assets/music/FirstLove.mp3" type="audio/mpeg">
                 您的浏览器不支持 audio 元素。
               </audio>
               <div class="musicBg" :class="{'active':bgMusicPlay}" @click='music()'></div>
             </div>
             <!--E 背景音乐按钮-->

           </div>
         </scroll>
       </div>
     </div>
   </div>
</template>

<script>
import {checkApp, deviceJudge} from '@/utils/mobile';
import loveLetter from '@/json/loveLetter20180520.js';
import wxapi from '@/utils/wxapi';

export default {
  name: 'loveLetter',
  data() {
        return {
          pageNum:1,
          loveLetterResult: [],
          bgMusicPlay:true,
          pointer:0,
          contentLists:[   // 测试题目
            {
              title:'1、你的意中人是一个？',
              img:require("../../../assets/img/varyActivity/letter/loveLetter20180520/bg_q1.png"),
              options:[
                {option:'A',name:'one',value:'A',txt:'盖世英雄'},
                {option:'B',name:'one',value:'B',txt:'盛世娇宠'}
              ]
            },{
              title:'2、用一个你觉得最贴切的词形容ta？',
              img:require("../../../assets/img/varyActivity/letter/loveLetter20180520/bg_q2_1.png"),
              options:[
                {option:'A',name:'two',value:'A',txt:'萌妹'},
                {option:'B',name:'two',value:'B',txt:'御姐'},
                {option:'A',name:'two',value:'A',txt:'鲜肉'},
                {option:'B',name:'two',value:'B',txt:'大叔'}
              ]
            },{
              title:'3、你理想中的ta是？',
              img:require("../../../assets/img/varyActivity/letter/loveLetter20180520/bg_q3_1.png"),
              options:[
                {option:'A',name:'three',value:'A',txt:'古灵精怪'},
                {option:'B',name:'three',value:'B',txt:'小鸟依人'},
                {option:'C',name:'three',value:'C',txt:'元气满满'},
                {option:'D',name:'three',value:'D',txt:'优雅端庄'},
                {option:'E',name:'three',value:'E',txt:'兰心蕙质'},
                {option:'A',name:'three',value:'A',txt:'风趣幽默'},
                {option:'B',name:'three',value:'B',txt:'体贴温柔'},
                {option:'C',name:'three',value:'C',txt:'阳光开朗'},
                {option:'D',name:'three',value:'D',txt:'成熟稳重'},
                {option:'E',name:'three',value:'E',txt:'文质彬彬'},
              ]
            },{
              title:'4、你觉得ta更愿意去哪个国家旅行？',
              img:require("../../../assets/img/varyActivity/letter/loveLetter20180520/bg_q4.png"),
              options:[
                {option:'A',name:'four',value:'A',txt:'日本'},
                {option:'B',name:'four',value:'B',txt:'法国'},
                {option:'C',name:'four',value:'C',txt:'冰岛'},
                {option:'D',name:'four',value:'D',txt:'西班牙'},
                {option:'E',name:'four',value:'E',txt:'希腊'},
              ]
            },{
              title:'5、你们最近常聊的话题是？',
              img:require("../../../assets/img/varyActivity/letter/loveLetter20180520/bg_q5.png"),
              options:[
                {option:'A',name:'five',value:'A',txt:'电影、音乐'},
                {option:'B',name:'five',value:'B',txt:'旅游、摄影'},
                {option:'C',name:'five',value:'C',txt:'游戏、动画'},
                {option:'D',name:'five',value:'D',txt:'日常、生活'},
                {option:'E',name:'five',value:'E',txt:'美容、健身'},
              ]
            }
          ],
          clickIndex:null,
          result:[],
          resultImg:'',
          end:false
        }
    },
    methods: {
      music(){
        let audio = document.getElementById('music');
        if(audio !== null) {
          if(audio.paused) {
            audio.play();
            this.bgMusicPlay = true;
          } else {
            audio.pause();
            this.bgMusicPlay = false;
          }
        }
      },
      start() {
        this.pageNum ++;
        if (window._czc) {
          _czc.push(['_trackEvent', '520活动', '开始']);
        }
      },
      testAgain() {
        this.pointer=0;
        this.pageNum = 1;
        this.cleanChecked();
        this.clickIndex=null;
      },
      clickChoose(index) {
        this.clickIndex = index;
        let _this = this;
        setTimeout(function() {
          _this.pointerNext();
        },100);
        if (window._czc) {
          _czc.push(['_trackEvent', '520活动', '答题', '第' + (this.pointer+1) +'题']);
        }
      },
      pointerNext() {
        if(!this.end) {
          let chooseName = this.contentLists[this.pointer].options[0].name
          let checkFlag = this.isChecked(chooseName);
          if(!checkFlag) {
            console.log('请选择'); return;
          } else if(this.pointer == 0 && this.result[0] == 'A') {
            this.contentLists[1].options.splice(0, 2);
            this.contentLists[2].options.splice(0, 5);
            this.contentLists[1].img = require("../../../assets/img/varyActivity/letter/loveLetter20180520/bg_q2_2.png");
            this.contentLists[2].img = require("../../../assets/img/varyActivity/letter/loveLetter20180520/bg_q3_2.png");
          } else if(this.pointer == 0 && this.result[0] == 'B') {
            this.contentLists[1].options.splice(2, 2);
            this.contentLists[2].options.splice(5, 5);

          }
        }
        if(this.pointer != this.contentLists.length-1) {
          this.pointer++;
          this.cleanChecked();
          this.clickIndex = null;
        } else {
          this.end = true;
          this.pageNum ++ ;
          this.getLoveLetter();
        }
      },
      isChecked(name) {
        let radios = document.getElementsByName(name);
        let radiosLen = radios.length;
        for(let i=0; i<radiosLen; i++) {
          if(radios[i].checked) {
            this.result.push(radios[i].value);
            return true;
          }
        }
        return false;
      },
      cleanChecked() {
        var radios = document.getElementsByTagName('input');
        for(let item=0;item<radios.length;item++) {
          radios[item].checked = false;
        }
      },
      getLoveLetter() {
        let result = this.result[this.result.length-1];
        let resultArr =  loveLetter[0][result];
        let resultArrLen = resultArr.length;
        let randomNum = parseInt(Math.random()*resultArrLen);
        this.resultImg = loveLetter[0][result][randomNum].img;
      },
      pressOrder() {
        if(deviceJudge()) {
         // window.location.href = 'mibaostore://tenancy';
          setTimeout(()=>{
            window.location.href = 'https://m.mibaostore.com/download.html';
          },200);
        }
        if (window._czc) {
          _czc.push(['_trackEvent', '520活动', '下载']);
        }
      },
      /*微信分享设置*/
      setShare()
      {
        let shareObj = {
          title: '测一测，你的520专属告白情话', // 分享标题
          desc: '叮~你有一封情书待发送！', // 分享描述
          link: window.location.origin + '/activity/#/a20180520', // 分享链接
          imgUrl: window.location.origin + window.location.pathname + require('@/assets/wxshare/2018520.png').substr(2), // 分享图标
        };
        wxapi.share(shareObj, function () {
          if (window._czc) {
            _czc.push(['_trackEvent', '520活动', '分享成功']);
          }
        });
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.setShare();
      });
    }
}
</script>

<style lang="scss" scoped>
  $real-px: 37.5;
  @function calRem($px-input){
    @return ($px-input/$real-px)/2;
  }
	div,img,a,dl,dd,dt,label{padding:0;margin:0;}
	img {display:block;border:0;vertical-align:top;}
  #love-letter input{-webkit-appearance:radio; visibility: hidden;display: none;}
  .view-wp{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .view-content {
      position: absolute;
      height: 100%;
      width: 100%;
    }
  }
	.wrapper {
    width: 100%;
    height:100vh ;
    overflow: hidden;
    // 情书封面
    .letter-cover {
      width: 100%;
      height: 100%;
      background:url("../../../assets/img/varyActivity/letter/loveLetter20180520/bg_cover.png") no-repeat center;
      -webkit-background-size: contain;
      background-size: cover;
      position: relative;
      div {
        text-indent: -9999px;
        background: url("../../../assets/img/varyActivity/letter/loveLetter20180520/start_btn.png") no-repeat center;
        background-size: cover;
        width: calRem(479rem);
        height: calRem(154rem);
        position: absolute;
        bottom: calRem(71rem);
        left: 0;right: 0; margin: 0 auto;
        animation: heartbeat 1500ms infinite linear;
      }
    }
    .letter-content {
      width: 100%;
      height: 100%;
      background:url("../../../assets/img/varyActivity/letter/loveLetter20180520/content_bg.png") no-repeat center;
      -webkit-background-size: contain;
      background-size: cover;
    }
    .selectContent {
      width: 100%;
      height: 100%;
      background:url("../../../assets/img/varyActivity/letter/loveLetter20180520/bg_q1.png") no-repeat center;
      -webkit-background-size: contain;
      background-size: cover;
      position: relative;
      dl {
        height: 100%;
        box-sizing: border-box;
      }
      .twoChoose {
        padding-top: 56vh;
        dd {
          label {
            display: block;
            width: calRem(556rem);
            height: calRem(108rem);
            background:url("../../../assets/img/varyActivity/letter/loveLetter20180520/aBtn_long.png") no-repeat center;
            -webkit-background-size: contain;
            background-size: contain;
            margin: 0 auto;
            line-height:calRem(92rem);
            font-size:calRem(32rem);
            font-family:PingFangSC-Regular;
            color: #3C55C1;
          }
          margin-bottom: calRem(100rem);
        }
      }
      .fiveChoose {
        padding-top: 50vh;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        position: relative;
        dd {
          flex-grow: 1;
          position: relative;
          /*&:nth-child(odd) {
            label {
              left: calRem(-30rem);
            }
          }
          &:nth-child(even) {
            label {
              right: calRem(-30rem);
            }
          }
          &:last-child {
            label {
              left: 0;right: 0;
            }
          }*/
          label {
            position: relative;
            display: block;
            width: calRem(356rem);
            height: calRem(108rem);
            background:url("../../../assets/img/varyActivity/letter/loveLetter20180520/aBtn_short.png") no-repeat center;
            -webkit-background-size: contain;
            background-size: contain;
            margin: 0 auto;
            line-height:calRem(96rem);
            font-size:calRem(32rem);
            font-family:PingFangSC-Regular;
            color: #3C55C1;
          }
          margin-bottom: calRem(75rem);
        }
      }
      label.active {
        font-weight: bold;
      }
    }
    .letter-result {
      width: 100%;
      height: 100%;
      background:url("../../../assets/img/varyActivity/letter/loveLetter20180520/result_bg.png") no-repeat center;
      -webkit-background-size: contain;
      background-size: cover;
    }
    .result {
      width: 100%;
      height: 100%;
      background:no-repeat center;
      -webkit-background-size: contain;
      background-size: cover;
      .btn-area {
        position: absolute;
        bottom: calRem(46rem);
        width: 90%;
        height: calRem(105rem);
        right:0;
        left: 0;
        margin: 0 auto;
        display: flex;
        div {
          text-indent: -9999px;
          width: calRem(292rem);
          height: calRem(105rem);
          left: 0;right: 0; margin: 0 auto;
          &.again {
            background: url("../../../assets/img/varyActivity/letter/loveLetter20180520/again_btn.png") no-repeat center;
            background-size: cover;
          }
          &.order {
            background: url("../../../assets/img/varyActivity/letter/loveLetter20180520/order_btn.png") no-repeat center;
            background-size: cover;
          }
        }
      }
    }
    .music-area {
      position: fixed;
      z-index: 999;
      top: 20px;
      right: 16px;
      .musicBg {
        width: calRem(60rem);
        height: calRem(60rem);
        background: url("../../../assets/img/varyActivity/letter/loveLetter20180520/music_icon.png") no-repeat center;
        background-size: contain;
        &.active {
          animation: rotate 2500ms infinite linear;
        }
      }
    }
    @keyframes rotate {
      0%   { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }
    @keyframes heartbeat {
      0% {transform:scale(0.9,0.9); opacity:1; }
      30% {transform:scale(1,1);opacity:0.9;}
      100% {transform:scale(0.9,0.9); opacity:1;}
    }
    @keyframes heartbeat2 {
      0% {opacity:1;}
      30% {opacity:0.9;}
      100% {opacity:1;}
    }
  }
</style>
