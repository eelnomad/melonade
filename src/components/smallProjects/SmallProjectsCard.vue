<!-- SmallProjectsNav.vue
     This is the landing page of the website with four quadrants to select what category of routes to look at.-->

<template>
  <router-link id="small-projects-card" :to="{ name: route.name }" @click="toTop">
    <h1>{{route.name}}</h1>
    <h3>{{route.description}}</h3>
  </router-link>
</template>

<script>
  export default {
    name: 'small-projects-card',
    props: ['route'],
    data () {
      return {
      }
    },
    methods: {
      toTop() {
        window.scrollTo(0, 0)
      }
    },
    created () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #small-projects-card {
  }

  h1 {
    font-size: 1.5em;
  }

  h3 {
    font-weight: 500;
  }
</style>
