<!-- MainNav.vue
     Contains main-nav to appear in all pages-->

<template>
  <div id="main-nav" class="flex-column" v-bind:class="active === -1 ? 'main-nav-inactive' : 'main-nav-active'">
    <router-link :to="'home'">
      <div id="logo">
        <h1>Melonade</h1>
      </div>
    </router-link>
    <div class="flex-row" @mouseleave="set_active(-1)" @click="set_active(-1)" id="main-nav-bar">
      <div id="main-nav-item" v-for="route, index in routes" @mouseenter="set_active(index)" v-bind:class="active === index ? 'main-nav-item-active' : 'main-nav-item-inactive'">
        <router-link class="flex-column nav-item" :to="route.name" :style="{ 'background-image': 'url(' + route.background_image + ')' }">
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
        active: -1,
        routes: []
      }
    },
    created () {
      this.routes = this.$router.options.routes.filter(function (route) {
        return route.level === 'home'
      })
    },
    methods: {
      set_active: function (value) {
        this.active = value
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
    height: 75px;
    font-size: 25px;
    color: white;
  }

  .main-nav-active {
    height: 50vmin;
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
    background-color: transparent;
  }

  #main-nav-bar {
    flex: 1 0 50px;
    width: 100%;
    position: relative;
  }

  #main-nav-item {
    display: flex;
    background-color: dimgrey;

    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }

  .main-nav-item-inactive {
    flex: 1 1 0;
    font-size: inherit;
    color: inherit;
  }

  .main-nav-item-active {
    flex: 8 0 0;
    font-size: 40px;
    color: white;
  }

  .nav-item {
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
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }
  h2 {
    margin: 10px 0;
  }

</style>
