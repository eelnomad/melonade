<!-- SmallProjectsNav.vue
     This is the landing page of the website with four quadrants to select what category of routes to look at.-->

<template>
  <router-link id="small-projects-nav" :to="route.name" class="flex-column">
    <h1>{{route.displayName}}</h1>
    <h3>{{route.description}}</h3>
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
    background-color: rgb(10,10,10,.55);
    width: 350px;
    height: 250px;
    margin: 10px 20px 40px 20px;
    border: 1px solid transparent;
    border-radius: 5px;
  }

  #small-projects-nav:hover {
    background-color: rgb(25,25,25,.85);
    animation: pulse 2s infinite;
  }

  #small-projects-description {
    overflow-y: auto;
  }
  h1, h3, a {
    color: whitesmoke;
    margin: 20px 25px 0 25px;
  }
  h1 {
    font-size: 2.5em;
    line-height: 1em;
  }
  h3 {
    flex: 0 1 auto;
    font-size: 1.25em;
    line-height: 1.25em;
    margin-bottom: 30px;
    height: 100%;
    overflow-y: auto;
  }


  @-webkit-keyframes pulse {
    0% {-webkit-box-shadow: 0 0 0 0 rgba(35,35,35, 0.4)}
    70%{-webkit-box-shadow: 0 0 0 10px rgba(35,35,35, 0)}
    100%{-webkit-box-shadow: 0 0 0 0 rgba(35,35,35, 0)}
  }
  @keyframes pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(35,35,35, 0.4);
      box-shadow: 0 0 0 0 rgba(35,35,35, 0.4);
    }
    70% {
        -moz-box-shadow: 0 0 0 10px rgba(35,35,35, 0);
        box-shadow: 0 0 0 10px rgba(35,35,35, 0);
    }
    100% {
        -moz-box-shadow: 0 0 0 0 rgba(35,35,35, 0);
        box-shadow: 0 0 0 0 rgba(35,35,35, 0);
    }
  }

</style>
