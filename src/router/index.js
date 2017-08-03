import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Blog from '@/components/Blog'
import BlogPost from '@/components/BlogPost'
// import League from '@/components/League'
// import About from '@/components/About'
import WIP from '@/components/WIP'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      description: 'You are Home!'
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog,
      display_name: 'My Blog',
      description: 'Here is my blog!',
      level: 'home',
      background_image: 'https://lh3.googleusercontent.com/fECq0OTWM0BXM0X0eACz9CnXnnGZODYgcEjk2cktRyc_a4sPlZmbCfGSC3GxM6oruGgDVK42OBBlwE71BWEjR8vs-Ye7TY7_i5SaSLL4n6DXFyCpxzPwY9PGtmhyb8vLS5YW-PJuTx75rzubPMqxoeocVwKglDJUkohB6UmWjBYwHlwi81yjdQ-DAEBr1TrprJGw7UaGzhYXhgk3b7LIvmWMqfLLa8s5ufmtAkD9GxIaPNkE_EZj2OxZsAO5sfaR0TNqvCOJ1gMuie70KuRyaPnnTjmZ-YLe0eN5184hg1EJn6G5S__U4jyw8c6CydBiXRiMQVGVNSUWx--x1SL-1_bTGK5sU9DwgfSravqhdQlMUENo5RA2PkJem-lmfFfP5kMBdnspLET7vuSgs5v2hmAgrk-rRHaGe2u1SJFI_zu03RijeB2ql5VGViDOLZzgdwvnBwriIYeQlha5OZdouk4zoTd73xX_9LrEj-4aTI0WFj06vXAj8Rnra0drYzr-rWNG5lAbJERFTvBEIyab9MINKT2fE7Kq2v1GuA644CwLK6lJlmXJbJLErFdCsyGZkMJXijztsNSdbeVWUg1-BPHAgoFhX03stLvQhwU_bwLZEWVKIQI67UJu2OLtr-wE6_uljm4pOv5pI1aJXeIOR6EomPn2IaS8JGNjsjvzSjekgw=w2398-h1598-no'
    },
    {
      path: '/blog/:post_id',
      name: 'blogPost',
      component: BlogPost,
      background_image: 'http://www.pptbackgrounds.org/uploads/grass-blue-bright-sky-and-a-dandelion-backgrounds-wallpapers.jpg'
    },
    {
      path: '/league',
      name: 'league',
      component: WIP,
      display_name: 'League of Legends Analysis',
      description: 'Hopefully some fancy league of legends analytics',
      level: 'home',
      background_image: 'http://www.pptbackgrounds.org/uploads/grass-blue-bright-sky-and-a-dandelion-backgrounds-wallpapers.jpg'
    },
    {
      path: '/about',
      name: 'about',
      component: WIP,
      display_name: 'About me!',
      description: 'About me!',
      level: 'home',
      background_image: 'https://lh3.googleusercontent.com/jtDAKoOKj-n2tkDhAj7CeR_0NqOlOwvZlDpAlOcFzGlau-SUsQph_oyrart1-uE11F9yG7O139V7vJ0sFpWr3p7Can6o8eIqd2VSrj0STHBBD8ObeejvIClod95EM5g_9sstI7cKyuN1uGsdQ5O76hEQVjB1zxv6vQM_8LCaWEhFpsN5oPpTPPuIdnZE9nURksyiu5CpakUYj_NDX5XePRyPtmzt6mAaQ1EKPz_luvVNUb6lurIocZkDMOiHjCTJ5MqG1IUg1mpzOl-H5_LBBJGO4V0TH5Wi33KsbFUfdrXdk7_T_2gp_WQki4587d3zBJU8bQueOBrGCYiWD8Yv0X0XHLEPB6xl_Zn-o39HXNpC-K8o72rDNNqMPsSNqwPY_lUuTSXLefWATha2YnRP6h3blIzJwsxtOJVaFgPzpZ_dSO_foP6Ys9VFzsIkUv6l_avNWiPRNTlBohnDZXS_pLcMpsw8HlyL_sMT41FHgzijGci_Z0kJQ0rOw5NTdILMyxuNvyb4AbX8VxqkKph3wqeHsacYB_K9nzONNGNSZxzn92KA5T6zdRKQQCRZYeXXnc1mQO-0DdPsXGNWhW2jWynaFzL65Fy46cTE4Zq9rqLqt-TRpO5_EDeK372BBQFPPaFeub6tIz9QxyZA8m0ZE-q2r64Eo4Ig7R4Wpm8P3-QoRQ=w2398-h1598-no'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
