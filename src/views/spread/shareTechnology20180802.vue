<template>
	<div class="a20180802">
    <!--黑科技分享页面-->
    <div  class="view-wp">
      <div class="view-content">
        <scroll :pullDownRefresh="false" :pullUpLoad="false">
          <div class="wrapper">
            <div class="page" @click="pageClick">
              <img src="../../assets/img/spread/shareTechnology20180802/img.jpg">
            </div>
          </div>
        </scroll>
      </div>
    </div>
    <login-model ref="login" @success="loginSuccess()" :loginProps="loginProps"></login-model>
	</div>
</template>

<script>
import loginModel from '@/components/activities/login';
import {hostUrl} from '@/api/fetch';
import {downloadApp} from '@/utils/mobile';
import apiService from '@/api/activity.js';
import formData from '@/utils/formData.js';
import verify from '@/utils/verify.js';
export default {
    name: 'shareTechnologya20180802',
    data() {
        return {
          isLogin: false,
          loginProps: {
            closeBtnPosition:"top",
          },
        }
    },
    components:{
      loginModel
    },
    methods: {
      pageClick() {
        if(this.isLogin) {
          downloadApp('https://m.mibaostore.com/activity/#/a20180730','h5');
        } else {
          this.$refs.login.showLoginModel();
        }
      },
      // 判断登录
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
            }
          });
        },100);
      },
      loginSuccess() {
        this.isLogin = true;
      },
    },
    mounted() {
      this.checkLogin();
    }
}
</script>
<style lang="scss" scoped>
    $real-px: 37.5;
    @function calRem($px-input){
       @return ($px-input/$real-px)/2;
    }
	div,img,a{padding:0;margin:0;display:block;border:0;}
    .view-wp{
      position: fixed;left: 0; right: 0;top: 0; bottom: 0;
      .view-content {
        position: absolute; height: 100%;
        width: calRem(750rem);
        left: 0;right: 0;top: 0;margin: 0 auto;
      }
    }
    .wrapper {
      width: calRem(750rem);
      .page {
        width: 100%;
        height: calRem(6443rem);
      }
    }

</style>
