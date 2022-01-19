<!-- HomePage.vue
 The overarching landing page.-->
<template>
    <div 
    	id="main"
    	class="f-col"
	>
        <MainNav />
        <router-view v-slot="{ Component }">
	        <transition name="fade" mode="out-in">
	            <component :is="Component" class="content"/>
	        </transition>
	    </router-view>
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
    methods: {},
    watch: {},
    computed: {},
    components: {
        MainNav
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main {
	height: 100vh;
	width: 100vw;
	overflow-y: none;
}

.content {
	height: 100%;
	width: 100%;
	overflow-y: auto;
}
</style>