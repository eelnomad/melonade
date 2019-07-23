import Vue from 'vue'
import axios from 'axios/dist/axios.js'
import HighchartsVue from 'highcharts-vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(HighchartsVue)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
