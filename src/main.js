import { createApp } from 'vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaChevronDown, FaEllipsisH } from "oh-vue-icons/icons";

import axios from 'axios'
import HighchartsVue from 'highcharts-vue'

import App from './App.vue'
import router from '@/router'
import store from '@/store'

addIcons(FaChevronDown, FaEllipsisH);

const app = createApp(App)

app.use(store)
app.use(router)
app.use(HighchartsVue)
app.component("v-icon", OhVueIcon);

app.provide('$http', axios)

app.config.productionTip = false
app.mount('#app')