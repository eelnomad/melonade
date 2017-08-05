<!-- Home.vue
     This is the landing page of the website with four quadrants to select what category of posts to look at.-->

<template>
  <div class="flex-column" id="home">
    <home-nav v-for="route in routes" :key="route.path" :route="route"></home-nav>
  </div>
</template>

<script>
import HomeNav from './HomeNav'

export default {
  name: 'home',
  data () {
    return {
      routes: []
    }
  },
  created () {
    this.routes = this.getRoutes()
  },
  methods: {
    getRoutes: function () {
      return this.$router.options.routes.filter(function (route) {
        return route.level === 'home'
      })
    }
  },
  components: {
    HomeNav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
