<!-- SmallProjectsNav.vue
     This is the landing page of the website with four quadrants to select what category of routes to look at.-->

<template>
  <router-link id="small-projects-nav" :to="route.name">
    <h1 class="glitch">{{route.display_name}}</h1>
  </router-link>
</template>

<script>
  export default {
    name: 'small-projects-nav',
    props: ['route'],
    data () {
      return {}
    },
    methods: {},
    created () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #small-projects-nav {
    margin: 0 10px 30px 10px;
    padding: 0 2vw;
    flex: 1 0 300px;
    border-radius: 10px;
    background-color: lightgray;
    border-color: lightgray;
    border-style: solid;
    border-width: 1px;
    transition: all .5s;
    color: white;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-size: 24px;
    text-align: left;
  }

  h1 {
    text-align: inherit;
    font-size: inherit;
  }

  #small-projects-nav:hover, #small-projects-nav:focus {
    outline: none;
    display: flex;
    flex: 20 0 auto;
    font-size: 2vw;
    background-color: white;
    color: gray;
    text-align: center;
  }
</style>
