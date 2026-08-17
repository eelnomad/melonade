// Static imports, not lazy chunks. Vue Router awaits an async component factory
// before it confirms navigation, so a dynamic import stalls the first click to
// each route on a network round-trip. Four small pages over one shared layout —
// there is nothing here worth splitting.
import PortfolioLayout from '@/components/portfolio/PortfolioLayout.vue'
import PortfolioLanding from '@/components/portfolio/content/PortfolioLanding.vue'
import PortfolioWork from '@/components/portfolio/content/PortfolioWork.vue'
import PortfolioAbout from '@/components/portfolio/content/PortfolioAbout.vue'
import PortfolioContact from '@/components/portfolio/content/PortfolioContact.vue'

const PORTFOLIO_ROUTES = [{
        name: 'Landing',
        path: '',
        component: PortfolioLanding,
        meta: {
            title: 'Damon Lee',
            metaTags: [{
                name: 'description',
                content: 'Damon Lee - Senior Engineer, Data & Full-Stack. Building reliable data platforms and the products that sit on top of them.'
            }],
        },
    },
    {
        name: 'Work',
        path: 'work',
        component: PortfolioWork,
        meta: {
            title: 'Damon Lee - Work',
            metaTags: [{
                name: 'description',
                content: 'Professional experience and side projects.'
            }],
        },
    },
    {
        name: 'About',
        path: 'about',
        component: PortfolioAbout,
        meta: {
            title: 'Damon Lee - About',
            metaTags: [{
                name: 'description',
                content: 'A bit of background.'
            }],
        },
    },
    {
        name: 'Contact',
        path: 'contact',
        component: PortfolioContact,
        meta: {
            title: 'Damon Lee - Contact',
            metaTags: [{
                name: 'description',
                content: 'Get in touch.'
            }],
        },
    },
]

export const routes = [
    {
        path: '/',
        component: PortfolioLayout,
        children: PORTFOLIO_ROUTES,
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/',
    }
]
