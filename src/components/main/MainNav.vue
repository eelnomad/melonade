<!-- MainNav.vue
	MainNav for main page-->
<template>
    <div 
    	id="main-nav"
    	class="f-row f-center"
	>
        <router-link
            class="m-m"
            to="/"
        >
    	   <h1> Melonade </h1> 
        </router-link>
        <span class="f-grow"></span>
    	<router-link 
            v-for="route in routes" 
            :to="route.path"
            class="mR-m"
        >
            {{ route.displayName }}
        </router-link>
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
        routes() {
            return this.$router.options.routes.find((route) => {
                return route.path === '/'
            }).children
        }
    },
    components: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main-nav {
    background-color: whitesmoke;
    box-shadow: inset 0 -1em 1em -1em black;
}
</style>