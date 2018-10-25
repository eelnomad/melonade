<!-- Home.vue
     This is the landing page of the website with four quadrants to select what category of posts to look at.-->

<template>
  <div id="home">
    <div id="home-container" class="flex-row">
      <div id="side-nav">
        <h1>Melonade</h1>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/smallprojects">Small Projects</router-link>
          </li>
          <li>
            <router-link to="/about">About</router-link>
          </li>
        </ul>
        <span></span>
      </div>
      <router-view></router-view>
    </div>
    <div id="background" class="darken">
      <transition-group name="image-fade" mode="in-out">
        <img v-for="(image, index) in background" class="photos" :src="image.base_url" :key="image.base_url" @load="showNew">
      </transition-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
      }
    },
    created () {
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    methods: {
      showNew: function () {
        if (this.background.length !== 1) {
          this.$store.dispatch('shiftBackgroundDetails')
          console.log('home')
          console.log(this.background)
        }
      }
    },
    computed: {
      background () {
        return this.$store.getters.getBackgroundDetails
      }
    },
    components: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #home {
    width: 100%;
    height: 100%;
    background-color: gray;
    z-index: -1;
  }

  #home-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
  }

  #side-nav {
    height: 100%;
    flex: 1 0 300px;
    background: rgba(0,0,0,0.5);
    z-index: 99;
    text-align: right;
    padding: 30vh 20px 0 0;
    box-sizing: border-box;
  }

  #side-nav > h1, #side-nav > ul > li > a {
    color: whitesmoke;
  }

  #side-nav > ul {
    list-style-type: none;
  }

  router-view {
    flex: 1 0 auto;
  }

  #background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .darken {
    filter: brightness(40%) grayscale(80%);
  }

  .photos {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
  }

  .image-fade-leave-active {
    transition: opacity 10s linear;
  }
  .image-fade-enter {
    z-index: -1;
  }
  .image-fade-enter-to, .image-fade-leave {
    opacity: 1;
  }
  .image-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transition: opacity 1s;
    opacity: 0;
    z-index: 1;
  }
</style>
