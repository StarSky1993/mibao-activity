// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie';
// Tell Vue to use the plugin
import 'lib-flexible'
import 'normalize.css'
import '@/styles/index.scss'
import crypto from 'crypto';
import scroll from '@/components/scroll'

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo);

Vue.component('scroll',scroll);
Vue.use(scroll);

import Picker from 'mint-ui/lib/picker';
import 'mint-ui/lib/picker/style.css';
Vue.component(Picker.name, Picker);

Vue.prototype.crypto = crypto;
Vue.use(VueCookie);
Vue.config.productionTip = false;

const debug = process.env.NODE_ENV !== 'production';
Vue.config.devtools = debug;

import ChangeTitle from './directive/ChangeTitle';
Vue.use(ChangeTitle);

import sensors from './utils/sensors';
Vue.use(sensors);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
