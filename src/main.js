import { createApp } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios/dist/axios.js'
import HighchartsVue from 'highcharts-vue'

import App from '@/App'
import router from '@/router'
import store from '@/store'

library.add(faCircleLeft)
library.add(faCircleRight)

const app = createApp(App)

app.use(store)
app.use(router)
app.use(HighchartsVue)
app.component('font-awesome-icon', FontAwesomeIcon)

app.provide('$http', axios)

app.config.productionTip = false
app.mount('#app')