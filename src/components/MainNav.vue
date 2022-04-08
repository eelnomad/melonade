<!-- MainNav.vue
    MainNav for main page-->
<template>
    <div
        :class="classes"
        id="main-nav"
    >
        <div
            class="f-row mL-m"
            id="nav-major"
        >
            <router-link
                v-for="route in majorRoutes"
                :to="{name : route.name}"
                class="mL-l"
            >
                <h2 :style="{color: color}">{{ route.name }}</h2>
            </router-link>
        </div>
        <router-link
            class="m-l"
            id="nav-logo"
            to="/"
        >
            <h1 :style="{color: color}">Melonade</h1>
        </router-link>
        <div
            class="f-row mR-m"
            id="nav-minor"
        >
            <router-link
                v-for="route in minorRoutes"
                :to="{name : route.name}"
                class="mR-l"
            >
                <h3 :style="{color: color}">{{ route.name }}</h3>
            </router-link>
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import { MAJOR_ROUTES, MINOR_ROUTES } from '@/router'

const { mapGetters: navGetters } = createNamespacedHelpers('nav')
const { mapGetters: themeGetters } = createNamespacedHelpers('theme')

export default {
    name: 'MainNav',
    data() {
        return {
            majorRoutes: MAJOR_ROUTES,
            minorRoutes: MINOR_ROUTES,
            scrolled: false
        }
    },
    created() {
        window.addEventListener('scroll', this.checkTop)
    },
    beforeDestroy() {},
    destroyed() {
        window.removeEventListener('scroll', this.checkTop)
    },
    methods: {
        checkTop(event) {
            this.scrolled = window.scrollY !== 0
        }
    },
    watch: {},
    computed: {
        ...navGetters([
            'navState'
        ]),
        ...themeGetters([
            'theme'
        ]),
        classes() {
            return {
                'nav-compact': this.navState.compact,
                'nav-hidden': this.navState.hide,
                'nav-scrolled': this.scrolled,
                'nav-unscrolled': !this.scrolled,
            }
        },
        color() {
            return this.scrolled ? 'black' : this.theme.color
        }
    },
    components: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style 
    lang="scss"
    scoped>
#main-nav {
    position: fixed;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "major logo minor";
    z-index: 99;
    transition: all .25s ease;
}

#nav-logo {
    grid-area: logo;
    justify-self: center;
    align-self: center;
}

#nav-major {
    grid-area: major;
    justify-self: start;
    align-self: center;
}

#nav-minor {
    grid-area: minor;
    justify-self: end;
    align-self: center;
}

.nav-scrolled {
    background-color: whitesmoke;
    border-bottom: gainsboro 1px solid;
    box-shadow: 0 4px 8px rgba(220, 220, 220, 0.3);
}

.nav-unscrolled {
    background-color: transparent;
    border-bottom: transparent 1px solid;
    box-shadow: 0 4px 8px rgba(220, 220, 220, 0.0);
}

h1 {
    font-size: 1.5rem;
}
</style>