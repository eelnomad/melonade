import { createRouter, createWebHashHistory } from 'vue-router'

export const MAJOR_ROUTES = [{
        name: 'Photos',
        path: '/photos/:id?',
        component: () => import('@/components/photoGallery/PhotoGallery'),
        meta: {
            title: 'Melonade - Photos',
            metaTags: [{
                name: 'description',
                content: 'A gallery of photos.'
            }]
        }
    },
]

export const MINOR_ROUTES = [{
        name: 'About',
        path: '/about',
        component: () => import('@/components/about/About'),
        meta: {
            title: 'Melonade - About',
            metaTags: [{
                name: 'description',
                content: 'A bit about Melonade.'
            }]
        }
    }
]

const routes = [
    ...MAJOR_ROUTES,
    ...MINOR_ROUTES,
    {
        name: 'Home',
        path: '/',
        redirect: '/projects',
        // component: () => import('@/components/landing/Landing'),
        // meta: {
        //     title: 'Melonade',
        //     metaTags: [{
        //         name: 'description',
        //         content: 'Home page.'
        //     }]
        // }
    },
    {
        name: 'Projects',
        path: '/projects',
        component: () => import('@/components/smallProjects/SmallProjects'),
        children: [
            {
                path: '',
                component: () => import('@/components/landing/Landing'),
            }
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
        redirect: '/projects',
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

router.afterEach((to, from, next) => {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title;
    } else if (previousNearestWithMeta) {
        document.title = previousNearestWithMeta.meta.title;
    }

    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    if (!nearestWithMeta) return next();

    nearestWithMeta.meta.metaTags.map(tagDef => {
            const tag = document.createElement('meta');

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key]);
            });

            tag.setAttribute('data-vue-router-controlled', '');

            return tag;
        })
        .forEach(tag => document.head.appendChild(tag));
});

export default router