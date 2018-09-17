/*
 *验证电话号码
 * 日期格式化 ，倒计时时间戳转化为时间
 * 验证是否为空
 * 设置用户token信息
 * queryUrl取值
 */
import formData from '@/utils/formData.js';
import apiService from '@/api/activity.js';
const verification = {
	telCheck: (str) => {
        var pattern = /^1[345789]\d{9}$/;
        if (pattern.test(str)) {
            return true;
        } else {
            return false;
        }
  	},
    isNull: (t)=> {
      if (!t||t=="(null)"||t=='null'||t=='undefined'||t=='NaN') {return true;}else{return false;}
    },
    isEmptyObject: (obj)=>{
       for(var key in obj){
            return false
       };
       return true
    },
    getDateForm: ()=> {
        var date = new Date(),dateForm;
        var weekArr = [
            "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
        ];
        var monthArr = [
          "Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"
        ];
        dateForm = {
          "week": weekArr[date.getDay()],
          "date": date.getDate(),
          "month": monthArr[date.getMonth()]
        };
        return dateForm;
    },
    setUserInfo: (data)=> {
        formData.setUserPhone(data.phone);
        formData.setAuthenticated(data.authenticated);
        formData.setUserInfo(data.uid);
        //formData.setPersonInfo(data);
        formData.setUserJson(data);
    },
    getUrlQuery: function(name) {
      let query = window.location.search.substring(1);
      let vars = query.split("&");
      for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if(pair[0] == name){return pair[1];}
      }
      return('');
    }
}
export default verification;

const countDownTime = function(timeStamp) {
  let day=0, hour=0, minute=0, second=0;
  let timeObj = {};
  let times = timeStamp/1000;
  if(times > 0){
    day = Math.floor(times / (60 * 60 * 24));
    hour = Math.floor(times / (60 * 60)) - (day * 24);
    minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
    second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    timeObj.day = ("0" + day).slice(-2);
    timeObj.hour = ("0" + hour).slice(-2);
    timeObj.minute = ("0" + minute).slice(-2);
    timeObj.second = ("0" + second).slice(-2);
    return timeObj ;
  } else {
    return false;
  }
};

// 按所给的时间格式输出指定的时间
// 例如：
// 输入：formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w')
// 输出：2014-09-05 13:14:20 星期五
const formatDate = function(timeStamp,str) {
  let date = new Date(timeStamp);
  let obj = {
    yyyy:date.getFullYear(),
    yy:(""+ date.getFullYear()).slice(-2),
    M:date.getMonth()+1,
    MM:("0"+ (date.getMonth()+1)).slice(-2),
    d:date.getDate(),
    dd:("0" + date.getDate()).slice(-2),
    H:date.getHours(),
    HH:("0" + date.getHours()).slice(-2),
    h:date.getHours() % 12,
    hh:("0"+date.getHours() % 12).slice(-2),
    m:date.getMinutes(),
    mm:("0" + date.getMinutes()).slice(-2),
    s:date.getSeconds(),
    ss:("0" + date.getSeconds()).slice(-2),
    w:['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
  };
  return str.replace(/([a-z]+)/ig,function($1){return obj[$1]});
};
export {
  formatDate,
  countDownTime
}
