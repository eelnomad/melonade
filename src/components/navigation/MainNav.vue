<!-- MainNav.vue
     Contains main-nav to appear in all pages-->

<template>
  <div id="main-nav" class="flex-column" v-bind:class="active ? 'main-nav-active' : 'main-nav-inactive'">
    <div id="logo">
      <h1>Melonade</h1>
    </div>
    <div class="flex-row" @mouseenter="toggleActive()" @mouseleave="toggleActive()" id="main-nav-bar">
      <div id="main-nav-item" v-for="route in routes">
        <router-link class="flex-column" :to="route.name" :style="{ 'background-image': 'url(' + route.background_image + ')' }">
          <span></span>
          <h2>{{route.display_name}}</h2>
          <span></span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'main-nav',
    data () {
      return {
        active: false,
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
      },
      toggleActive: function () {
        this.active = !this.active
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #main-nav {
    position: fixed;
    width: 100%;
    z-index: 99;

    -webkit-transition: height .5s ease;
    -moz-transition: height .5s ease;
    -o-transition: height .5s ease;
    transition: height .5s ease;
    transition-delay: .3s;
  }

  .main-nav-inactive {
    min-height: 140px;
    height: 15%;
    font-size: 25px;
    color: white;
  }

  .main-nav-active {
    height: 85%;  
    font-size: 0;
    color: transparent;
  }

  #logo {
    flex: 0 0 auto;
    display: block;
    margin: auto;
    width: 100%;
    color: black;
    text-align: center;
    font-size: 50px;
    background-color: white;
  }

  #main-nav-bar {
    flex: 1 0 50px;
    width: 100%;
    position: relative;
  }

  #main-nav-item {
    display: flex;
    flex-align: center;
    flex: 1 1 auto;
    font-size: inherit;
    color: inherit;

    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }

  #main-nav-item:hover {
    flex: 99 0 auto;
    font-size: 40px;
    color: white;
  }

  a {
    padding: 0 20px;
    width: 100%;
    height: 100%;
    color: inherit;
    font-size: inherit;
    text-align: center;
    vertical-align: center;
    background-position: center;
    background-size: 100vmax;
    box-shadow: inset 0 20px 30px -20px black;
  }

  h1, h2 {
    color: inherit;
    font-size: inherit;
  }
  h2 {
    margin: 10px 0;
  }
</style>
