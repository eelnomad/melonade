<!-- SmallProjectsNav.vue
     This is the landing page of the website with four quadrants to select what category of routes to look at.-->

<template>
  <router-link id="small-projects-nav" :to="route.name">
    <h1>{{route.displayName}}</h1>
    <div class="small-project-nav-background">
    </div>
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
    background-color: rgb(150,150,150,.5);
    width: 350px;
    height: 500px;
    margin: 70px 20px 0px 20px;
    border: 1px solid transparent;
  }

  #small-projects-nav:hover {
    background-color: rgb(200,200,200,.85);
    animation: pulse 2s infinite;
  }
  h1 {
    width: inherit;
    background-color: yellow;
  }


  @-webkit-keyframes pulse {
    0% {-webkit-box-shadow: 0 0 0 0 rgba(255,255,255, 0.4)}
    70%{-webkit-box-shadow: 0 0 0 10px rgba(255,255,255, 0)}
    100%{-webkit-box-shadow: 0 0 0 0 rgba(255,255,255, 0)}
  }
  @keyframes pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(255,255,255, 0.4);
      box-shadow: 0 0 0 0 rgba(255,255,255, 0.4);
    }
    70% {
        -moz-box-shadow: 0 0 0 10px rgba(255,255,255, 0);
        box-shadow: 0 0 0 10px rgba(255,255,255, 0);
    }
    100% {
        -moz-box-shadow: 0 0 0 0 rgba(255,255,255, 0);
        box-shadow: 0 0 0 0 rgba(255,255,255, 0);
    }
  }

</style>
