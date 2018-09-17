<template>
  <div id="mibaoShareContent" style="display: none;">
    {
      "title": "{{shareBody.title}}",
      "content": "{{shareBody.content}}",
      "image": "{{shareBody.image}}",
      "url": "{{shareBody.url}}",
      "activityFlag":"{{shareBody.activityFlag}}",
      "isReqShare": {{shareBody.isReqShare}}
    }
  </div>
</template>

<script>
  import {interceptContent} from '@/utils/mobile.js';
  import wxapi from '@/utils/wxapi';
  export default {
    props: {
      shareProps: {
        type: Object,
        default: function () {
          return {
            title:"",
            content:"",
            image:"",
            url:"",
            activityFlag:"",
            isReqShare:false,
            userRecommendCode:"",
          }
        }
      },
    },
    data() {
      return {
        shareBody: {
          "title"  : "",
          "content": "",
          "image"  : "",
          "url"    :  "",
          "activityFlag":"",
          "isReqShare"  : false
        },
        shareObj: {
          "tagId":"mibaoShareContent",
          "body" : ""
        }
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.int();
      });
    },
    methods: {
      int() {   // 根据传入参数设置分享数据
        this.shareBody.title = this.shareProps.title||"";
        this.shareBody.content = this.shareProps.content||"";
        this.shareBody.image = this.shareProps.image||"";
        this.shareBody.url = this.shareProps.url||"";
        this.shareBody.activityFlag = this.shareProps.activityFlag||"";
        this.shareBody.isReqShare?this.shareProps.isReqShare:this.shareBody.isReqShare;
        this.setAppShare();
        this.setWxShare();
      },
      setAppShare() {
        this.shareObj.body = JSON.stringify(this.shareBody);
        interceptContent(this.shareObj);   //  重设app分享内容
      },
      setWxShare() {
        let _this = this;
        let shareObj = {
          title: _this.shareBody.title,
          desc : _this.shareBody.content,
          link : _this.shareBody.url,
          imgUrl: _this.shareBody.image,
        };
        wxapi.share(shareObj, function () {
          _this.$emit('wxShareSuccess');
        });
      },
      // 登录后根据需要，分享链接填入用户邀请码
      loginShare() {
        if(this.shareProps.isReqShare) {
          this.shareBody.isReqShare = true;    // app分享成功后请求接口标志
        }
        if(this.shareProps.userRecommendCode) {
          let queryFlag = this.hasQuery();
          if(this.$route.query&&queryFlag) {
            this.shareBody.url += '&recommendCode=' + this.shareProps.userRecommendCode;
          } else {
            this.shareBody.url += '?recommendCode=' + this.shareProps.userRecommendCode;
          }
        }
        this.setAppShare();
        this.setWxShare();
      },
      hasQuery() {
        let hashUrl = this.shareBody.url.split("#")[1];
        let arr = hashUrl.split("?");
        if(arr.length<=1) return false;
        return true;
      }
    },
  }
</script>

<style scoped lang="scss" scoped>
</style>
