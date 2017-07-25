import Vue from 'vue'
import Router from 'vue-router'
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
