<!-- MainNav.vue
	MainNav for main page-->
<template>
    <div id="main-nav">
        yo pizza
    </div>
</template>
<script>
export default {
    name: 'MainNav',
    data() {
        return {}
    },
    created() {},
    beforeDestroy() {},
    destroyed() {},
    methods: {},
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
    components: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main-nav {
	position: fixed;
}
</style>