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
      window.removeEventListener('focus', this.startBackgroundInterval)
      window.removeEventListener('blur', this.stopBackgroundInterval)
    },
    destroyed () {
    },
    methods: {
      startBackgroundInterval: function () {
        this.stopBackgroundInterval()
        this.backgroundInterval = setInterval(function () {
          this.pushBackground()
        }.bind(this), 8000)
      },
      stopBackgroundInterval: function () {
        clearInterval(this.backgroundInterval)
      },
      pushBackground: function () {
        // Prevent queue from piling up
        if (this.$store.getters.getBackgroundQueue.length !== 1) {
          return null
        } else {
          // Stops redundant mutation of background details
          do {
            var newBackground = Object.assign({}, photodata[Math.floor(Math.random() * photodata.length)])
            newBackground.base_url += 'w1980-h1320-no?.jpg'
          } while (newBackground.base_url === this.background.base_url)
          this.$store.dispatch('pushBackgroundQueue', newBackground)
        }
      }
    },
    computed: {
      background () {
        return this.$store.getters.getBackgroundQueue[0]
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
