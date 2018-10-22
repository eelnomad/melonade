import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Blog from '@/components/home/blog/Blog'
import BlogPost from '@/components/home/blog/BlogPost'
import PhotoGallery from '@/components/home/photoGallery/PhotoGallery'
import About from '@/components/home/about/About'
import SmallProjects from '@/components/home/smallProjects/SmallProjects'
// import League from '@/components/League'
import ShowerThoughts from '@/components/showerThoughts/ShowerThoughts'
import Sudoku from '@/components/sudoku/Sudoku'
import WIP from '@/components/WIP'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'home',
          component: PhotoGallery
        },
        {
          path: 'blog',
          name: 'blog',
          component: Blog,
          children: [
            {
              path: ':id',
              component: BlogPost
            }
          ]
        },
        {
          path: 'smallprojects',
          name: 'smallprojects',
          component: SmallProjects
        },
        {
          path: 'about',
          name: 'about',
          component: About
        }
      ]
    },
    {
      path: '/showerthoughts',
      name: 'showerthoughts',
      component: ShowerThoughts
    },
    {
      path: '/sudoku',
      name: 'sudoku',
      component: Sudoku
    },
    {
      path: '/league',
      name: 'league',
      component: WIP
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
