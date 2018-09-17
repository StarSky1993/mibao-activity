//import { getCookie,setCookie} from '@/utils/cookies.js';
import Vue from 'vue';
import {checkApp,getToken} from "./mobile";

const formData = {
	getUserToken: () => {
   
    let token = Vue.cookie.get("token")|| localStorage.getItem('token') || window.token;
    if (token && token !=='undefined') {
      return decodeURI(token).replace(/\"/g, "");
    } else {
  
      try
      {
        getToken(function (t) {
          window.token = t;
  
          if (t && t !=='undefined') {
            return t;
          }
          else {
            return false;
          }
        });
      }
      catch (err)
      {
        return false;
      }
      
    }
	  
  	},
  	setUserToken: (token) => {
  		let t = '"' + token + '"';
      Vue.cookie.set('token', t, 7);
      localStorage.setItem('token',token);
  	},
  	getUserPhone: () => {
        let userPhone = Vue.cookie.get("userPhone")|| localStorage.getItem('userPhone');
        if (userPhone && userPhone !=='undefined') {
          return decodeURI(userPhone).replace(/\"/g, "");
        } else {
          return false;
        }
  	},
  	setUserPhone: (userPhone) => {
  		let p = '"' + userPhone + '"';
  		Vue.cookie.set('userPhone', p, 7);
      localStorage.setItem('userPhone',userPhone);
  	},
    setAuthenticated:(authenticated) => {
      if(authenticated!=="undefined") {
        Vue.cookie.set('authenticated', authenticated, 7);
        localStorage.setItem('authenticated',authenticated);
      }
    },
    setUserInfo:(uid) => {
      if(uid && uid!=="undefined") {
        let myCookie = {
          'userId': uid
        };
        Vue.cookie.set('userInfo', JSON.stringify(myCookie), 7);
        localStorage.setItem('userInfo',JSON.stringify(myCookie));
      }
    },
    setPersonInfo:(data) => {
      let personInfo = JSON.stringify(data);
      Vue.cookie.set('personInfo', personInfo, 7);
      localStorage.setItem('personInfo',personInfo);
    },
    setUserJson:(data) => {
      let userJson = JSON.stringify(data);
      Vue.cookie.set('userJson', userJson, 7);
      localStorage.setItem('userJson',userJson);
    }
}
export default formData;
