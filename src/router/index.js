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
      sideNav: true,
      children: [
        {
          path: '',
          name: 'photogallery',
          component: PhotoGallery,
          displayName: 'Home'
        },
        {
          path: 'blog',
          name: 'blog',
          component: Blog,
          displayName: 'Blog',
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
          component: SmallProjects,
          displayName: 'Small Projects'
        },
        {
          path: 'about',
          name: 'about',
          component: About,
          displayName: 'About'
        }
      ]
    },
    {
      path: '/showerthoughts',
      name: 'showerthoughts',
      component: ShowerThoughts,
      smallProjects: true,
      displayName: 'Shower Thoughts'
    },
    {
      path: '/sudoku',
      name: 'sudoku',
      component: Sudoku,
      smallProjects: true,
      displayName: 'Sudoku Solver'
    },
    {
      path: '/league',
      name: 'league',
      component: WIP,
      smallProjects: true,
      displayName: 'League of Legends Analysis'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
