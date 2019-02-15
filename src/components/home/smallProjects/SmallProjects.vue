<!-- SmallProjects.vue
     A hub for routing to smaller projects.-->

<template>
  <div id="small-projects">
    <div id="small-projects-filter">
      <input v-model="searchQuery" placeholder="Filter Projects">
    </div>
    <div id="small-projects-content">
      <transition-group name="staggered-fade" class="flex-row flex-wrap" mode="out-in">
        <small-projects-nav v-for="route in filteredRoutes" :key="route.path" :route="route" :ref="route.name"></small-projects-nav>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import SmallProjectsNav from './SmallProjectsNav'
  // import _ from 'lodash'
  // import Velocity from 'velocity-animate'
  export default {
    name: 'small-projects',
    data () {
      return {
        searchQuery: '',
        routes: []
      }
    },
    created () {
      this.routes = this.$router.options.routes.filter((route) => {
        return route.smallProjects
      })
    },
    mounted () {
    },
    methods: {
    },
    watch: {
    },
    computed: {
      filteredRoutes () {
        if (this.searchQuery === '') {
          return this.routes
        } else {
          var self = this
          var result = this.routes.filter(function (route) {
            return route.displayName.toLowerCase().replace('/\\s/g', '').indexOf(self.searchQuery.toLowerCase().replace('/s/g', '')) >= 0
          })
        }
        if (result.length > 0) {
          return result
        } else {
          return self
        }
      }
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
    justify-content: center;
    align-content: center;
    margin-top: 10vh;
  }
  #small-projects-filter > input {
    width: 50%;
    height: 3vh;
    border-radius: 7px;
    font-size: 20px;
    padding-left: 20px;
  }

  #small-projects-content {
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
    transition: all 1s;
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
    transition-delay: 2s;
    transition: all .5s cubic-bezier(0.77, 0, 0.175, 1);

  }
</style>
