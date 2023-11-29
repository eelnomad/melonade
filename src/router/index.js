import { createRouter, createWebHashHistory } from 'vue-router'

import { useNavStore } from '@/stores/nav'
import { useThemeStore } from '@/stores/theme'

import { routes } from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
})

router.beforeEach((to, from, next) => {
    const navStore = useNavStore()
    const themeStore = useThemeStore()
    if ('meta' in to) {
        if ('theme' in to.meta) {
            themeStore.setTheme(to.meta.theme)
        } else {
            themeStore.$reset()
        }
        if ('hideable' in to.meta) {
            navStore.setHideable(to.meta.hideable)
        } else {
            navStore.$reset()
        }
    }
    next()
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