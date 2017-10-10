<!-- PhotoGallery.vue
     This is the page that shows the Photo Gallery.-->

<template>
  <div id="photo-gallery">
    <div id="logo">
      <router-link :to="'/'" id="logo">
      Melonade
      </router-link>
    </div>
    <div id="photo-nav-toggle" @click="toggleNav()">
      <icon name="angle-up" height="50px" scale=10 v-if="!showNav"></icon>
      <icon name="angle-down" height="50px" scale=10 v-else></icon>
    </div>
    <div id="photo-nav-next" @click="selectImage(currentId + 1)">
      <icon name="angle-right" scale=10></icon>
    </div>
    <div id="photo-nav-prev" @click="selectImage(currentId - 1)">
      <icon name="angle-left" scale=10></icon>
    </div>
    <transition name="slide-up">
      <div class="flex-row" v-show="showNav" id="photo-nav">
        <div :class="{ 'active' : index == currentId }" id="photo-nav-button" v-for="(photo, index) in photos" @click="selectImage(index)" :style="{ 'background-image': 'url(' + photo.preview_url + ')' }">
          <h1>{{ photo.title }}</h1>
        </div>
      </div>
    </transition>
    <transition-group name="fade">
      <div id="photo-display" v-for="photo in activePhoto" :key="photo.base_url" :style="{ 'background-image': 'url(' + photo.background_url + ')' }">
        <div id="photo-details">
          <h2>{{ photo.title }}</h2>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import photodata from '@/../static/data/photodata.json'

  export default {
    name: 'photo-gallery',
    data () {
      return {
        showNav: false,
        photos: [],
        currentId: 0
      }
    },
    created () {
      this.photos = photodata
      for (var i = 0; i < this.photos.length; i++) {
        this.photos[i]['preview_url'] = this.photos[i]['base_url'] + 'h400-w500-no?.jpg'
        this.photos[i]['background_url'] = this.photos[i]['base_url'] + 'h1450-w1920-no?.jpg'
      }
      this.photoInterval = setInterval(function () {
        if (this.currentId + 1 === this.photos.length) {
          this.currentId = 0
        } else {
          this.currentId++
        }
      }.bind(this), 5000)
    },
    mounted () {
    },
    computed: {
      activePhoto () {
        return [this.photos[this.currentId]]
      }
    },
    beforeDestroy () {
      clearInterval(this.photoInterval)
    },
    methods: {
      toggleNav: function () {
        this.showNav = !this.showNav
      },
      selectImage: function (id) {
        clearInterval(this.photoInterval)
        if (id === this.photos.length) {
          this.currentId = 0
        } else if (id < 0) {
          this.currentId = this.photos.length - 1
        } else {
          this.currentId = id
        }
        this.showNav = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #photo-gallery {
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  #photo-nav-toggle {
    position: fixed;
    text-align: center;
    bottom: 0;
    z-index: 4;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 1s ease;
    opacity: 0;
  }

  #photo-nav-next {
    z-index: 1;
    position: fixed;
    height: 100%;
    width: 10%;
    right: 0;
    opacity: 0;
    display:flex;
    align-items: center;
    justify-content: center;
    transition: all 1s ease;
  }

  #photo-nav-prev {
    z-index: 1;
    position: fixed;
    height: 100%;
    width: 10%;
    left: 0;
    opacity: 0;
    display:flex;
    align-items: center;
    justify-content: center;
    transition: all 1s ease;
  }

  #photo-nav-toggle:hover, #photo-nav-prev:hover, #photo-nav-next:hover {
    opacity: 0.75;
    transition: all 1s ease;
  }

  #photo-nav-toggle:hover {
    -webkit-transform: translateY(-5%);
    transform: translateY(-5%);
  }

  #photo-nav-prev:hover {
    -webkit-transform: translateX(-5%);
    transform: translateX(-5%);
  }

  #photo-nav-next:hover {
    -webkit-transform: translateX(5%);
    transform: translateX(5%);
  }

  #photo-nav {
    position: fixed;
    z-index: 3;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    background: rgba(0,0,0,.5);
    align-content: flex-start;
    overflow-y: auto;
  }

  #photo-nav-button {
    color: white;
    height: 200px;
    flex: 1 1 350px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 1s ease;
    background-size: 200%;
    filter: grayscale(100%);
  }

  #photo-nav-button:hover {
    background-size: 130%;
    transition: all 1s ease;
    filter: grayscale(0%);
  }

  #photo-nav-button h1 {
    height: 100%;
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
    transition: all 1s ease;
  }

  #photo-nav-button h1:hover {
    opacity: 0;
    transition: all 1s ease;
  }

  .active {
    background-color: black;
  }

  #photo-display {
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 1.5s ease;
  }

  #photo-details {
    z-index: 2;
    position: absolute;
    bottom: 5%;
    right: 10%;
    color: white;
    transition: opacity .5s;
    text-shadow: 0 0 5px black;
    width: 40%;
    height: 30%;
    text-align: right;
    vertical-align: bottom;
  }

  #photo-details:hover {
    opacity: 0;
    transition: opacity 1s;
  }

  #logo {
    position: absolute;
    z-index: 2;
    font-family: 'Sacramento', cursive;
    font-size: 9vmin;
    text-align: center;
    margin-top: 5%;
    margin-left: 5%;
    opacity: 0;
    transition: opacity 1s;
  }

  #logo:hover {
    opacity: 1;
    z-index: 2;
    transition: opacity 1s;
  }

  h1 {
    margin: 0;
    position: relative;
    text-align: center;
    transition: all 1s ease;
    text-shadow: 0 0 20px black;
  }

  h2 {
    font-size: 80px;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: default;
  }

  @keyframes pulse {
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-o-keyframes pulse{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-moz-keyframes pulse{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-webkit-keyframes pulse{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }

  .slide-up-enter-active, .slide-up-leave-active {
    transition: all .5s ease-out;
  }

  .slide-up-enter, .slide-up-leave-to {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    overflow-x: hidden;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  a {
    color: white;
  }
</style>
