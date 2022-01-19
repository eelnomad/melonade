import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/',
        component: () => import('@/components/main/MainPage'),
        children: [{
                path: '',
                component: () => import('@/components/main/landing/Landing'),
                displayName: 'Home',
            },
            {
                path: 'blog',
                component: () => import('@/components/main/blog/Blog'),
                displayName: 'Blog',
                children: [{
                        path: ':id',
                        component: () => import('@/components/main/blog/BlogPost'),
                        props: true
                    },
                    {
                        path: '',
                        component: () => import('@/components/main/blog/BlogHome'),
                    }
                ]
            },
            {
                path: 'photo',
                component: () => import('@/components/main/photoGallery/PhotoGallery'),
                displayName: 'Photos',
            },
            {
                path: 'smallprojects',
                component: () => import('@/components/main/smallProjects/SmallProjects'),
                displayName: 'Small Projects',
            },
            {
                path: 'about',
                component: () => import('@/components/main/about/About'),
                displayName: 'About',
            },
            {
                path: 'contact',
                component: () => import('@/components/standalone/WIP'),
                displayName: 'Contact',
            }
        ]
    },
    {
        path: '/showerthoughts',
        component: () => import('@/components/standalone/showerThoughts/ShowerThoughts'),
        displayName: 'Shower Thoughts',
        description: 'A simple screensaver alternative that pulls the top posts from the /r/showerthoughts sub-reddit and displays them in a breath-like manner across the page.'
    },
    {
        path: '/sudoku',
        component: () => import('@/components/standalone/sudoku/Sudoku'),
        displayName: 'Sudoku Solver',
        description: 'A sudoku solver showcasing the power of recursion and Monte Carlo methods when solving sudoku. Can also be used to just play sudoku!'
    },
    {
        path: '/league',
        component: () => import('@/components/standalone/WIP'),
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