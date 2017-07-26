import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Blog from '@/components/Blog'
import BlogWrapper from '@/components/BlogWrapper'
import BlogHome from '@/components/BlogHome'
import BlogPost from '@/components/BlogPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/:blog_id',
      name: ':blog_id',
      component: BlogWrapper,
      children: [
        {
          path: '',
          component: BlogHome
        },
        {
          path: ':post_id',
          component: BlogPost
        }
      ]
    }
  ]
})
