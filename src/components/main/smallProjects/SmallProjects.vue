<!-- SmallProjects.vue
 A hub for routing to smaller projects.-->

 <template>
  <div id="small-projects">
    <div id="small-projects-filter">
      <input v-model="searchQuery" placeholder="Filter Projects">
    </div>
    <div id="small-projects-content">
      <transition-group name="staggered-fade" class="flex-row flex-wrap" mode="out-in">
        <small-projects-nav v-for="route in filteredRoutes" :key="route.path" :route="route"></small-projects-nav>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import SmallProjectsNav from './SmallProjectsNav'
  export default {
    name: 'small-projects',
    data () {
      return {
        searchQuery: '',
        activeQuery: undefined,
        routes: [],
        filteredRoutes: []
      }
    },
    created () {
      this.routes = this.$router.options.routes.filter((route) => {
        return route.smallProjects
      })
      this.filteredRoutes = this.routes
    },
    mounted () {
    },
    methods: {
    },
    watch: {
      searchQuery: function () {
        if (this.activeQuery !== undefined) { 
          clearTimeout(this.activeQuery) 
        }
        this.activeQuery = setTimeout(() => {
          var result = undefined
          if (this.searchQuery === '') {
            result = this.routes
          } else {
            result = this.routes.filter((route) => {
              return route.displayName.toLowerCase().replace('/\\s/g', '').indexOf(this.searchQuery.toLowerCase().replace('/s/g', '')) >= 0
            })
          }
          if (result.length > 0) {
            this.filteredRoutes = result
          }
          this.activeQuery = undefined
        }, 250)
      }
    },
    computed: {
    },
    components: {
      SmallProjectsNav
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#small-projects {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#small-projects-filter {
  display: flex;
  flex: 0 0 150px;
  justify-content: center;
  align-items: flex-end;
}
#small-projects-filter > input {
  width: 50%;
  height: 30px;
  border-radius: 7px;
  font-size: 20px;
  padding: 10px 20px 10px 20px;
}

#small-projects-content {
  flex: 1 1 80vh;
  overflow-y: overlay;
  width: 100%;
  margin-top: 5vh;
  padding-bottom: 10vh;
  height: 87vh;
}

.flex-row {
  justify-content: space-evenly;
}


.staggered-fade-enter {
  opacity: 0;
}

.staggered-fade-enter-active {
  transition: all .5s;
}

.staggered-fade-leave {
}

.staggered-fade-leave-active {
  transition: all .3s;
  opacity: 0;
  transform: translate(0, 100vh);
  position: absolute;
}

.staggered-fade-move {
  transition-delay: 1s;
  transition: all .5s cubic-bezier(0.77, 0, 0.175, 1);
}
</style>
