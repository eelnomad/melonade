import { Vue, createApp } from 'vue'
import axios from 'axios/dist/axios.js'
import HighchartsVue from 'highcharts-vue'
import App from './App'
import router from './router'
import store from './store'


const app = createApp(App).use(store).use(router).mount('#app')
app.use(HighchartsVue)
app.prototype.$http = axios
app.config.productionTip = false