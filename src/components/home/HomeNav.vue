<!-- HomeNav.vue
     This is the landing page of the website with four quadrants to select what category of routes to look at.-->

<template>
  <router-link class="dim" id="home-nav" :to="route.name" :style="{ 'background-image': 'url(' + route.background_image + ')' }">
    <div class="flex-column" id="home-preview">
      <span></span>
      <h1>{{route.display_name}}</h1>
      <span></span>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'home-nav',
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
  #home-nav {
    transition: all .5s ease;
    transition-delay: .1s;
    display: flex;
    flex: 1 0 auto;
    position: relative;
    color: white;
    vertical-align: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-size: 2.5vw;
  }

  #home-nav:hover, #home-nav:focus {
    outline: none;
    display: flex;
    flex: 99 0 auto;
    font-size: 4vw;
  }

  #home-preview {
    width: 100%;
    padding: 10px 60px;
    z-index: 1;
  }

  h1 {
    font-size: inherit;
  }
</style>
