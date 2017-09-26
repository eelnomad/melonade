<!-- PhotoGallery.vue
     This is the page that shows the Photo Gallery.-->

<template>
  <div id="photo-gallery">
    <button id="photo-nav-toggle" @click="toggleNav()">Toggle</button>
    <transition name="slide-left">
    <div class="flex-row" v-show="showNav" id="photo-nav">
      <div :class="{ 'active' : index == currentId }" id="photo-nav-button" v-for="(photo, index) in photos" @click="selectImage(index)" :style="{ 'background-image': 'url(' + photo.background_url + ')' }">
          <h1>{{ photo.title }}</h1>
      </div>
    </div>
    </transition>
    <transition-group name="fade">
      <div id="photo-display" v-for="photo in activePhoto" :key="photo.base_url" :style="{ 'background-image': 'url(' + photo.background_url + ')' }">
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
        this.photos[i]['preview_url'] = this.photos[i]['base_url'] + 'h275-w350-no?.jpg'
        this.photos[i]['background_url'] = this.photos[i]['base_url'] + 'h1450-w1920-no?.jpg'
      }
      this.photoInterval = setInterval(function () {
        if (this.currentId + 1 === this.photos.length) {
          this.currentId = 0
        } else {
          this.currentId++
        }
        console.log(this.currentId)
      }.bind(this), 5000)
    },
    mounted () {
    },
    computed: {
      activePhoto () {
        return [this.photos[this.currentId]]
      }
    },
    methods: {
      toggleNav: function () {
        this.showNav = !this.showNav
        console.log(this.showNav)
      },
      selectImage: function (id) {
        clearInterval(this.photoInterval)
        this.currentId = id
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
    z-index: 1;
    width: 100%;
  }

  #photo-nav {
    position: fixed;
    z-index: 1;
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
    filter: grayscale(50%);
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
    transition: all 3s ease;
  }

  h1 {
    margin: 0;
    position: relative;
    text-align: center;
    transition: all 1s ease;
  }

  .slide-left-enter-active, .slide-left-leave-active {
    transition: all .5s ease-out;
  }

  .slide-left-enter, .slide-left-leave-to {
    transform: translateY(100%);
  }
</style>
