<template>
	<div class="a20180817">
    <!--8月0元租-->
    <div  class="view-wp">
      <div class="view-content">
        <scroll :pullDownRefresh="false" :pullUpLoad="false">
          <div class="wrapper">
            <div class="page" @click="pageClick">
              <img src="../../assets/img/spread/shareFreeRent20180817/img.jpg">
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
import apiService from '@/api/activity.js';
import formData from '@/utils/formData.js';
import verify from '@/utils/verify.js';
export default {
    name: 'shareFreeRent20180817',
    data() {
        return {
          isLogin: false,
          loginProps: {
            closeBtnPosition:"top",
            showLoginModel: true,
          },
        }
    },
    components:{
      loginModel
    },
    methods: {
      pageClick() {
        console.log(this.isLogin)
        if(this.isLogin) {
          window.location.href = 'https://m.mibaostore.com/download.html';
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
              _this.isLogin = true;
            } else {
              _this.isLogin = false;
            }
          });
        },100);
      },
      loginSuccess() {
        setTimeout(()=>{
          window.location.href = 'https://m.mibaostore.com/download.html';
        },300);
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
        height: calRem(3268rem);
      }
    }

</style>
