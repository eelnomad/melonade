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
      background_image: 'http://www.pptbackgrounds.org/uploads/grass-blue-bright-sky-and-a-dandelion-backgrounds-wallpapers.jpg'
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
      background_image: 'http://www.pptbackgrounds.org/uploads/grass-blue-bright-sky-and-a-dandelion-backgrounds-wallpapers.jpg'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
