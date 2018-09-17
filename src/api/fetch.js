import axios from 'axios';
import { getCookie } from '@/utils/cookies.js';
import formData from '@/utils/formData.js';

const host_dev = "http://api.mibaostore.cn/v2_1_9";
//const host_dev = "http://192.168.1.188:8282/v1_2_0";
const host_production = "https://api.mibaostore.com/v2_1_9";

export const host = process.env.BUILD_ENV === 'production' ? host_production : host_dev;

const host_link = "http://m.mibaostore.cn/";
//const host_link = "http://192.168.1.93:9000/";

const host_production_link = "https://m.mibaostore.com/";
export const hostUrl = process.env.BUILD_ENV === 'production' ? host_production_link : host_link;

const img_link = "https://img.mibaostore.cn/";
const img_production_link = "https://img.mibaostore.com/";
export const imageServiceUrl = process.env.BUILD_ENV === 'production' ? img_production_link : img_link;

let service = axios.create({
  baseURL: host,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  }
});

service.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  });
service.interceptors.request.use(function (config) {
  let token = formData.getUserToken();
  if(token) {
    config.headers['token'] = token;
  }
  if(window.sa && window.sa.store) {
    config.headers['cookie_id'] = window.sa.store.getDistinctId();
  }
  if(config.method.toLowerCase() === 'get') {
    config.params = {
      '_t': new Date().getTime(),
      ...config.params,
    }
  } else {
    config.data = {
      '_t': new Date().getTime(),
      ...config.data,
    }
  }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export default service;
