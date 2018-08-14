// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import head from './head'
import http from './http'
import highcharts from './highcharts'
import icon from './icon'
import store from './vuex'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  head,
  http,
  highcharts,
  icon,
  store,
  template: '<App/>',
  components: { App }
})
