import Vue from 'vue'
import App from './App'
import router from './router'
import http from './http'
import highcharts from './highcharts'
// import icon from './icon'
import store from './vuex'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  http,
  highcharts,
  // icon,
  store
}).$mount('#app')
