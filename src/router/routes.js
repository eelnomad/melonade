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
    {
        name: 'Projects',
        redirect: { name: 'SmallProjects' },
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
}]

export const routes = [
    ...MAJOR_ROUTES,
    ...MINOR_ROUTES,
    // {
    //     name: 'Home',
    //     path: '/',
    //     redirect: { name: 'Projects'}
    // },
    {
        path: '',
        component: () => import('@/components/landing/Landing.vue'),
        name: 'Landing',
    },
    {
        path: '/projects',
        children: [{
                name: 'SmallProjects',
                path: '',
                component: () => import('@/components/smallProjects/SmallProjects.vue'),
                meta: {
                    title: 'Melonade - Projects',
                    metaTags: [{
                        name: 'description',
                        content: 'A list of projects.'
                    }]
                },
            },
            ...PROJECT_ROUTES
        ],
    },
    {
        path: '/:pathMatch(.*)',
        redirect: { name: 'Landing' },
    }
]