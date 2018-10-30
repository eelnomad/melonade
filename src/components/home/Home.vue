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
        <img v-for="(image, index) in backgroundQueue" class="photos" :class="{ active : index === 0 }" :src="image.base_url" :key="image.base_url" @load="showNew">
      </transition-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        backgroundQueue: []
      }
    },
    created () {
      this.backgroundQueue.push(this.$store.getters.getBackgroundDetails)
      console.log(this.backgroundQueue)
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    methods: {
      showNew: function () {
        if (this.backgroundQueue.length >= 2) {
          this.backgroundQueue.shift()
        }
      }
    },
    watch: {
      newBackground: function (newBackground) {
        if (this.backgroundQueue.length <= 1 || this.backgroundQueue[0].base_url !== this.newBackground.base_url) {
          this.backgroundQueue.push(this.newBackground)
          console.log(this.backgroundQueue)
        }
      }
    },
    computed: {
      newBackground () {
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
    flex: 0 0 300px;
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
    filter: brightness(60%) grayscale(80%);
  }

  .photos {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
  }

  .active {
    z-index: 1;
  }

  .image-fade-leave-active {
    transition: opacity 2s ease;
    z-index: 2;
  }
  .image-fade-enter, .image-fade-enter-to, .image-fade-leave {
    opacity: 1;
  }
  .image-fade-leave {
    z-index: 2;
  }
  .image-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    z-index: 2;
  }

</style>
