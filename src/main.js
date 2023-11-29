import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.config.productionTip = false

import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { 
	BiChevronCompactUp,
	FaChevronDown,
	FaEllipsisH,
	FaRegularEyeSlash,
	HiMenu
} from "oh-vue-icons/icons";
addIcons(
	BiChevronCompactUp, 
	FaChevronDown, 
	FaEllipsisH, 
	FaRegularEyeSlash,
	HiMenu
);
app.component("v-icon", OhVueIcon);

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

import axios from 'axios'
app.provide('$http', axios)

import router from '@/router'
app.use(router)

app.mount('#app')