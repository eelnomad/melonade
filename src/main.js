import { createApp } from 'vue'

import axios from 'axios/dist/axios.js'
import HighchartsVue from 'highcharts-vue'

import App from '@/App'
import router from '@/router'
import store from '@/store'


const app = createApp(App)

app.use(store)
app.use(router)
app.use(HighchartsVue)

app.provide('$http', axios)

app.config.productionTip = false
app.mount('#app')