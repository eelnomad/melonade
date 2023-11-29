import { THEMES } from '@/stores/theme'

import { PROJECT_ROUTES } from './projects'

export const MAJOR_ROUTES = [{
        name: 'Photos',
        path: '/photos/:id?',
        component: () => import('@/components/photoGallery/PhotoGallery.vue'),
        meta: {
            title: 'Melonade - Photos',
            metaTags: [{
                name: 'description',
                content: 'A gallery of photos.'
            }],
            theme: THEMES.WHITE
        },
    },
]

export const MINOR_ROUTES = [{
        name: 'About',
        path: '/about',
        component: () => import('@/components/about/About.vue'),
        meta: {
            title: 'Melonade - About',
            metaTags: [{
                name: 'description',
                content: 'A bit about Melonade.'
            }],
        },
    }
]

export const routes = [
    ...MAJOR_ROUTES,
    ...MINOR_ROUTES,
    // {
    //     name: 'Home',
    //     path: '/',
    //     redirect: { name: 'Projects'}
    // },
    {
        name: 'Projects',
        path: '/projects',
        component: () => import('@/components/smallProjects/SmallProjects.vue'),
        children: [
            {
                path: '',
                component: () => import('@/components/landing/Landing.vue'),
                name: 'Landing',
            },
            ...PROJECT_ROUTES
        ],
        meta: {
            title: 'Melonade - Projects',
            metaTags: [{
                name: 'description',
                content: 'A list of projects.'
            }]
        }
    },
    {
        path: '/:pathMatch(.*)',
        redirect: { name: 'Landing'},
    }
]