<!-- PhotoGallery.vue
     This is the landing page of the website with four quadrants to select what category of posts to look at.-->

<template>
  <div id="photo-gallery" class="flex-row">
    <h1>{{ background.title }}</h1>
  </div>
</template>

<script>
  import photodata from '@/../static/data/photodata.json'

  export default {
    name: 'photo-gallery',
    data () {
      return {
      }
    },
    created () {
      this.startBackgroundInterval()
      window.addEventListener('focus', this.startBackgroundInterval)
      window.addEventListener('blur', this.stopBackgroundInterval)
    },
    beforeDestroy () {
      this.stopBackgroundInterval()
    },
    destroyed () {
    },
    methods: {
      startBackgroundInterval: function () {
        this.stopBackgroundInterval()
        this.newBackground()
        this.backgroundInterval = setInterval(function () {
          this.newBackground()
        }.bind(this), 8000)
      },
      stopBackgroundInterval: function () {
        clearInterval(this.backgroundInterval)
      },
      newBackground: function () {
        var tempImage = photodata[Math.floor(Math.random() * photodata.length)]
        tempImage.base_url += 'w1980-h1320-no?.jpg'
        // Stops redundant mutation of background details
        if (tempImage.base_url !== this.background.base_url) {
          this.$store.dispatch('setBackgroundDetails', tempImage)
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
  #photo-gallery {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  #photo-gallery > h1 {
    color: whitesmoke;
  }
</style>
