import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/main/MainPage'
import Landing from '@/components/main/landing/Landing'
import BlogPost from '@/components/main/blog/BlogPost'
import BlogHome from '@/components/main/blog/BlogHome'
import Blog from '@/components/main/blog/Blog'
import PhotoGallery from '@/components/main/photoGallery/PhotoGallery'
import About from '@/components/main/about/About'
import SmallProjects from '@/components/main/smallProjects/SmallProjects'
// import League from '@/components/League'
import ShowerThoughts from '@/components/standalone/showerThoughts/ShowerThoughts'
import Sudoku from '@/components/standalone/sudoku/Sudoku'


const routes = [
{
  path: '/',
  component: MainPage,
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
  },
  {
    path: 'contact',
    name: 'contact',
    component: () => import('@/components/standalone/WIP'),
    displayName: 'Contact',
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
  component: () => import('@/components/standalone/WIP'),
  smallProjects: true,
  displayName: 'League of Legends Analysis',
  description: 'The dream is to someday perform some analysis on top of League of Legends data. That\'s the dream...'
},
{
  path: '/:catchAll(.*)',
  redirect: '/',
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
