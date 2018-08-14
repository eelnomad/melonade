<!-- Home.vue
     This is the landing page of the website with four quadrants to select what category of posts to look at.-->

<template>
  <div class="flex-column" id="home">
    <div id="header-block"></div>
    <div class="flex-row">
      <div id="home-text">
        <h1>About this Site</h1>
        <h3>So this is an attempt at being creative while learning something new. The entire webpage is built off of Vue. There is a montecarlo sudoku solver somewhere in here as well as relaxing showerthoughts to look at. Enjoy!</h3>
      </div>
      <div id="update-text">
        <h1>Update Tracker</h1>
        <h3>This may be an update tracker in the future.</h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        routes: []
      }
    },
    created () {
      this.$store.dispatch('showHeader')
    },
    destroyed () {
    },
    methods: {
    },
    components: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #home {
    width: 100%;
    position: absolute;
  }

  #header-block {
    min-height: 140px;
    height: 20%;
  }

  #home-text {
    margin: 3% 6% 5% 15%;
    width: 60%;
  }

  #update-text {
    margin: 3% 15% 5% 6%;
  }
</style>
