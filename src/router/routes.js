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
            navOnDark: false,
        },
    },
    {
        name: 'Projects',
        path: '/projects',
        component: () => import('@/components/smallProjects/SmallProjects.vue'),
        meta: {
            title: 'Melonade - Projects',
            metaTags: [{
                name: 'description',
                content: 'A list of projects.'
            }],
            navOnDark: false,
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
}]

export const routes = [
    ...MAJOR_ROUTES,
    ...MINOR_ROUTES,
    {
        name: 'Home',
        path: '/',
        redirect: { name: 'Blog' }
    },
    {
        name: 'Blog',
        path: '/blog',
        component: () => import('@/components/blog/Blog.vue'),
        meta: {
            title: 'Melonade - Blog',
            metaTags: [{
                name: 'description',
                content: 'Blog posts and articles.'
            }],
            navOnDark: true,
        },
    },
    {
        name: 'BlogPost',
        path: '/blog/:slug',
        component: () => import('@/components/blog/BlogPost.vue'),
        meta: {
            title: 'Melonade - Blog',
            navOnDark: true,
        },
    },
    ...PROJECT_ROUTES.map(r => ({ ...r, path: `/projects/${r.path}` })),
    {
        path: '/:pathMatch(.*)',
        redirect: { name: 'Blog' },
    }
]