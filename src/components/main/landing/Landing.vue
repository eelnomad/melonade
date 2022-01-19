<!-- PhotoGallery.vue
     This is the landing page of the website.-->

<template>
  <div id="landing">
    This will be the intro page!
  </div>
</template>

<script>
  import photodata from '@/assets/data/photodata.json'

  export default {
    name: 'landing',
    data () {
      return {
        photoData: photodata
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
            var newBackground = Object.assign({}, this.photoData[Math.floor(Math.random() * this.photoData.length)])
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
  #landing {
  }

  #landing > h3 {
    color: whitesmoke;
    text-align: right;
    margin: 0 2vw 2vh 0;
  }
</style>
