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
        <div id="small-projects-list" class="content pT-xxl">
            <small-projects-card v-for="route in routes" :key="route.path" :route="route" class="card"></small-projects-card>
        </div>
    </div>
</template>
<script>
import SmallProjectsCard from '@/components/smallProjects/SmallProjectsCard'
import { PROJECT_ROUTES } from '@/router/projects'

export default {
    name: 'small-projects',
    data() {
        return {
        }
    },
    created() {
        this.addRoutes(PROJECT_ROUTES)
        this.addRoutes(PROJECT_ROUTES)
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
    watch: {},
    computed: {
        loadPage() {
            if (this.$route.params.id === null) {
                return null
            } else if (this.$route.params.id) {
                this.$router.replace({ name: this.$route.name })
                return null
            }
            return photoData[this.$route.params.id]
        },
        routes() {
          return this.$route.matched[0].children
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
    background-color: white;
    color: black;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-flow: column;
    grid-auto-rows: 200px;
}

.card {
    grid-column: 3;
    grid-column-end: span 3;

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