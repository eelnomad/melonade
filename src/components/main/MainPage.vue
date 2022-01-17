<!-- HomePage.vue
 The overarching landing page.-->
<template>
    <div id="main">
        <MainNav />
        <div id="home-container" class="flex-row">
            <div id="side-nav" class="flex-column">
                <router-link :to="{ name: 'home' }">
                    <h1>Melonade</h1>
                </router-link>
                <div class="flex-column side-nav-block">
                    <router-link class="major" v-for="route in majorRoutes" :key="route.path" :to="{ name: route.name ? route.name : route.childName }">
                        {{ route.displayName }}
                    </router-link>
                </div>
                <div class="flex-column side-nav-block">
                    <router-link class="minor" v-for="route in minorRoutes" :key="route.path" :to="{ name: route.name ? route.name : route.childName }">
                        {{ route.displayName }}
                    </router-link>
                </div>
                <span></span>
            </div>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
import MainNav from '@/components/main/MainNav.vue'

export default {
    name: 'MainPage',
    data() {
        return {}
    },
    created() {},
    beforeDestroy() {},
    destroyed() {},
    methods: {
        shiftBackground: function() {
            this.$store.dispatch('shiftBackgroundQueue')
        }
    },
    watch: {},
    computed: {
        backgroundQueue() {
            return this.$store.getters.getBackgroundQueue
        },
        majorRoutes() {
            return this.$router.options.routes.find((route) => {
                return route.path === '/'
            }).children.filter(route => {
                return route.type === 'major'
            })
        },
        minorRoutes() {
            return this.$router.options.routes.find((route) => {
                return route.path === '/'
            }).children.filter(route => {
                return route.type === 'minor'
            })
        }
    },
    components: {
        MainNav
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main {
    background-color: whitesmoke;
    height: 100%;
    width: 100%;
}
</style>