<!-- SmallProjects.vue
     A hub for routing to smaller projects.-->

<template>
  <div id="small-projects">
    <div id="header-block"></div>
    <div class="flex-row" id="small-projects-wrapper">
      <small-projects-nav v-for="route in routes" :key="route.path" :route="route"></small-projects-nav>
    </div>
  </div>
</template>

<script>
  import SmallProjectsNav from './SmallProjectsNav'

  export default {
    name: 'small-projects',
    data () {
      return {
        routes: []
      }
    },
    created () {
      this.$store.dispatch('hideHeader')
      this.routes = this.$router.options.routes.filter(function (route) {
        return route.level === 'smallProjects'
      })
    },
    methods: {
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
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: white;
  }

  #header-block {
    min-height: 140px;
    height: 20%;
  }

  #small-projects-wrapper {
    padding-top: 10px;
    margin: 0 50px;
    height: 150px;
    flex-wrap: wrap;
  }
</style>
