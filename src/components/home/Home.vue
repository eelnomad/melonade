<!-- Home.vue
     This is the landing page of the website with four quadrants to select what category of posts to look at.-->

<template>
  <div id="home" v-cloak>
    <transition-group name="fade" mode="in-out" :key="newImage.base_url">
      <img class="photos" :src="newImage.base_url" @load="toggleActive">
    </transition-group>
    <div id="side-nav">

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import photodata from '@/../static/data/photodata.json'

  export default {
    name: 'home',
    data () {
      return {
        loading: false,
        currentImage: {
          base_url: ''
        },
        newImage: {}
      }
    },
    created () {
      this.getNewImage()
      this.imageInterval = setInterval(function () {
        this.getNewImage()
      }.bind(this), 5000)
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    methods: {
      getNewImage: function () {
        this.loading = true
        var tempImage = photodata[Math.floor(Math.random() * photodata.length)]
        tempImage.base_url += 'w1980-h1320-no?.jpg'
        this.newImage = tempImage
      },
      toggleActive: function () {
        this.currentImage = this.newImage
        this.loading = false
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
  }

  #side-nav {
    width: 20%;
    min-width: 300px;
    height: 100%;
    background-color: black;
    filter: opacity(50%);
    z-index: 99;
  }

  .photos {
    height: 100%;
    width: 100%;
    position: absolute;
    object-fit: cover;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transition: opacity 3s;
    opacity: 0;
  }
</style>
