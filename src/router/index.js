import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Landing from '@/components/home/landing/Landing'
import BlogPost from '@/components/home/blog/BlogPost'
import BlogHome from '@/components/home/blog/BlogHome'
import Blog from '@/components/home/blog/Blog'
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
          name: 'home',
          component: Landing,
          displayName: 'Home',
          type: 'major'
        },
        {
          path: 'blog',
          childName: 'blog',
          component: Blog,
          displayName: 'Blog',
          type: 'major',
          children: [
            {
              name: 'blogPost',
              path: ':id',
              component: BlogPost,
              props: true
            },
            {
              name: 'blog',
              path: '',
              component: BlogHome
            }
          ]
        },
        {
          path: 'photo',
          name: 'photo',
          component: PhotoGallery,
          displayName: 'Photos',
          type: 'major'
        },
        {
          path: 'smallprojects',
          name: 'smallprojects',
          component: SmallProjects,
          displayName: 'Small Projects',
          type: 'major'
        },
        {
          path: 'about',
          name: 'about',
          component: About,
          displayName: 'About',
          type: 'minor'
        }
      ]
    },
    {
      path: '/showerthoughts',
      name: 'showerthoughts',
      component: ShowerThoughts,
      smallProjects: true,
      displayName: 'Shower Thoughts',
      description: 'A simple screensaver alternative that pulls the top posts from the /r/showerthoughts sub-reddit and displays them in a breath-like manner across the page.'
    },
    {
      path: '/sudoku',
      name: 'sudoku',
      component: Sudoku,
      smallProjects: true,
      displayName: 'Sudoku Solver',
      description: 'A sudoku solver showcasing the power of recursion and Monte Carlo methods when solving sudoku. Can also be used to just play sudoku!'
    },
    {
      path: '/league',
      name: 'league',
      component: WIP,
      smallProjects: true,
      displayName: 'League of Legends Analysis',
      description: 'The dream is to someday perform some analysis on top of League of Legends data. That\'s the dream...'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
