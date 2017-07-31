<!-- HomeNav.vue
     This is the landing page of the website with four quadrants to select what category of routes to look at.-->

<template>
  <router-link id="home-nav" :to="route.name" v-on:mouseenter.native="mouseOver" v-on:mouseleave.native="mouseOver">
    <div class="flex-column" id="home-preview">
      <span></span>
      <h1>{{route.display_name}}</h1>
      <span></span>
    </div>
    <div class="background dim" :style="{ 'background-image': 'url(' + route.background_image + ')' }">
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'home-nav',
  props: ['route'],
  data () {
    return {
      active: false
    }
  },
  methods: {
    mouseOver: function () {
      this.active = !this.active
    }
  },
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
  flex: 1 1 auto;
  position: relative;
  color: white;
  vertical-align: center;
  z-index: 1;
} 

#home-nav:hover {
  display: flex;
  flex: 99 1 auto;
}

#home-preview {
  width: 100%;
  padding: 20px 60px;
}

.background {
  z-index: -99;
  width: 100%;
  height: 101%;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.dim {
  filter: brightness(.5);
}
</style>
