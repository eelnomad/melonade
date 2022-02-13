import { createStore } from 'vuex'
import NavModule from '@/store/nav'
import ThemeModule from '@/store/theme'

export default createStore({
    modules: {
      nav: NavModule,
      theme: ThemeModule,
    },
})