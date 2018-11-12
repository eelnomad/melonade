<!-- SmallProjects.vue
     A hub for routing to smaller projects.-->

<template>
  <div id="small-projects">
    <div id="small-projects-filter">
      <input v-model="searchQuery" placeholder="Search Here">
    </div>
    <div id="small-projects-content">
      <transition-group 
        name="staggered-fade" 
        v-bind:css="false"
        tag="ul"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave" 
        class="flex-row">
        <small-projects-nav v-for="route in filteredRoutes" :key="route.path" :route="route" :ref="route.name"></small-projects-nav>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import SmallProjectsNav from './SmallProjectsNav'
  import Velocity from 'velocity-animate'
  export default {
    name: 'small-projects',
    data () {
      return {
        searchQuery: ''
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      beforeEnter: function (el) {
        el.style.opacity = 0
        el.style.height = 0
      },
      enter: function (el, done) {
        var delay = el.dataset.index * 150
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 1, height: '500px' },
            { complete: done }
          )
        }, delay)
      },
      leave: function (el, done) {
        var delay = el.dataset.index * 150
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 0, height: 0 },
            { complete: done }
          )
        }, delay)
      }
    },
    computed: {
      routes () {
        return this.$router.options.routes.filter((route) => {
          return route.smallProjects
        })
      },
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
    overflow-y: hidden;
  }

  #small-projects-filter {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 10vh;
  }
  #small-projects-filter > input {
    width: 50%;
    height: 35px;
    border-radius: 7px;
    font-size: 20px;
  }

  #small-projects-content {
    justify-content: space-evenly;
    flex-wrap: wrap;
    overflow-y: auto;
  }
</style>
