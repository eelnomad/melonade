<!-- SmallProjects.vue
 A hub for routing to smaller projects.-->
<template>
    <div id="small-projects">
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" class="content" />
            </transition>
        </router-view>
        <!-- <div id="small-projects-filter">
      <input v-model="searchQuery" placeholder="Filter Projects">
    </div> -->
        <div
            class="content pT-xxl"
            id="small-projects-list"
        >
            <small-projects-card
                v-for="route in routes"
                :key="route.path"
                :route="route"
                class="card"
            ></small-projects-card>
        </div>
    </div>
</template>
<script>
import SmallProjectsCard from '@/components/smallProjects/SmallProjectsCard'
import { PROJECT_ROUTES } from '@/router/projects'

export default {
    name: 'small-projects',
    data() {
        return {}
    },
    created() {
        this.$store.commit('theme/setTheme', this.$store.getters['theme/themes'].WHITE)
        console.log(this.$route)
        this.addRoutes(PROJECT_ROUTES)
        if (this.$route.params.id) {
            if ((PROJECT_ROUTES.find(route => route.path === this.$route.params.id))) {
                this.$router.go(this.$router.currentRoute)
            } else {
                this.$router.replace({ name: this.$route.name })
            }
        }
    },
    mounted() {},
    methods: {
        addRoutes(routes) {
            const route = this.$route.matched[0]
            route.children.push(...routes)

            // dedup
            route.children = [...new Map(route.children.map(r => [r.path, r])).values()]

            this.$router.addRoute(route)
        }
    },
    computed: {
        routes() {
            return this.$route.matched[0].children.filter(route => route.path != '')
        }
    },
    components: {
        SmallProjectsCard
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#small-projects {}

#small-projects-list {
    display: grid;
    grid-template-columns: 1fr fit-content(600px) 1fr;
    grid-auto-flow: column;
    grid-auto-rows: 200px;
    background-color: whitesmoke;
    color: black;
}

.card {
    grid-column: 2;

}

.content {
    min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>