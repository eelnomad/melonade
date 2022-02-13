<!-- MainNav.vue
    MainNav for main page-->
<template>
    <div 
        id="main-nav"
        :class="classes"
    >
        <div id="nav-left" class="f-row mL-m">
            <router-link v-for="route in majorRoutes" :to="{name : route.name}" class="mL-l">
                <h2>{{ route.name }}</h2>
            </router-link>
        </div>
        <router-link class="m-l" id="nav-mid" to="/">
            <h1>Melonade</h1>
        </router-link>
        <div id="nav-right" class="f-row mR-m">
            <router-link v-for="route in minorRoutes" :to="{name : route.name}" class="mR-l">
                <h3>{{ route.name }}</h3>
            </router-link>
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import { MAJOR_ROUTES, MINOR_ROUTES } from '@/router'

const { mapGetters, mapActions } = createNamespacedHelpers('nav')

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
        checkTop (event) {
            this.scrolled = window.scrollY !== 0
        }
    },
    watch: {
    },
    computed: {
        classes () {
            return {
                'nav-compact': mapGetters.compact,
                'nav-dim': mapGetters.dim,
                'nav-scrolled': this.scrolled,
                'nav-unscrolled': !this.scrolled,
            }
        }
    },
    components: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main-nav {
    position: fixed;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    z-index: 99;
    transition: all .25s ease;
}

#nav-left {
    grid-column: 1;
    justify-self: start;
    align-self: center;
}

#nav-mid {
    grid-column: 2;
    justify-self: center;
    align-self: center;
}

#nav-right {
    grid-column: 3;
    justify-self: end;
    align-self: center;
}

.nav-dim {
    background-color: rgba(0, 0, 0, .4);
}

.nav-scrolled {
    background-color: whitesmoke;
    color: black;
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