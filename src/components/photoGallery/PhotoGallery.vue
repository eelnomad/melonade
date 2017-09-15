<!-- PhotoGallery.vue
     This is the page that shows the Photo Gallery.-->

<template>
  <div id="photo-gallery">
    <button id="photo-nav-toggle" @click="toggleNav()">Toggle</button>
    <transition name="slide-left">
    <div v-show="showNav" id="photo-nav-bar">
      <div id="photo-nav" v-for="(photo, index) in photos">
        <div id="photo-nav-button" :class="{ 'active' : index == currentId}" @click="selectImage(index)">
          <h1>{{ photo.title }}</h1>
        </div>
      </div>
    </div>
    </transition>
    <transition-group name="fade">
      <div id="photo-display" v-for="photo in activePhoto" :key="photo.base_url" :style="{ 'background-image': 'url(' + photo.base_url + 'h1920-w1450-no?.jpg' + ')' }">
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
      localStorage.setItem('test', 'pizza')
      this.photos = photodata
      this.photoInterval = setInterval(function () {
        if (this.currentId + 1 === this.photos.length) {
          this.currentId = 0
        } else {
          this.currentId++
        }
        console.log(this.currentId)
      }.bind(this), 9000)
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
    z-index: 2;
    width: 300px;
  }

  #photo-nav-bar {
    position: fixed;
    z-index: 1;
    width: 300px;
    height: 100%;
    background: rgba(0,0,0,.5);
  }

  #photo-nav-button {
    width: 100%;
    height: 75px;
    color: white;
  }

  .active {
    background: rgba(0,0,0,.75);
  }

  #photo-display {
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 4s ease;
  }

  h1 {
    margin: 0;
    position: relative;
    text-align: center;
    top: 50%;
    transform: translateY(-50%); 
  }

  .slide-left-enter-active, .slide-left-leave-active {
    transition: all .5s ease-out;
  }

  .slide-left-enter, .slide-left-leave-to {
    transform: translateX(-300px);
  }
</style>
