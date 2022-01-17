<!-- PhotoGallery.vue
     This is the landing page of the website with four quadrants to select what category of posts to look at.-->

<template>
  <div id="photo-gallery">
    <div id="photo-list" class="flex-row flex-wrap">
      <div class="photo" v-for="photo in sortedPhotos" :key="photo.id" :style="photo.style">
        <img :src="photo.preview">
      </div>
    </div>
  </div>
</template>

<script>
  import photoData from '@/assets/data/photodata.json'

  export default {
    name: 'photo-gallery',
    data () {
      return {
        sortedPhotos: []
      }
    },
    created () {
      var sortedPhotos = photoData.sort((a, b) => b.id - a.id)
      for (var i = 0; i < sortedPhotos.length; i++) {
        sortedPhotos[i]['preview'] = sortedPhotos[i]['base_url'] += 'w200-h100-no?.jpg'
        sortedPhotos[i]['full'] = sortedPhotos[i]['base_url'] += 'w2000-h1000-no?.jpg'
        sortedPhotos[i]['style'] = 'flex: 1 1 ' + (200 + 4 * this.asciiToInt(sortedPhotos[i]['base_url'])) + 'px;' // height:' + height_pct.toString() + 'vh;'
      }
      this.sortedPhotos = sortedPhotos
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    watch: {
    },
    methods: {
      asciiToInt: function (input) {
        var result = 0
        for (var i = 0; i < input.length; i++) {
          result += input.charCodeAt(i)
        }
        return result % 100
      }
    },
    computed: {
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
    overflow-y: auto;
    background-color: rgb(0,0,0,.5);
  }

  #photo-list {
    padding: 1% 1% 1% 1%;
    box-sizing: border-box;
  }

  .photo {
    margin: 7px 8px;
    display: inline-block;
    overflow: hidden;
  }

  .photo > img {
    width: 100%;
    height: 350px;
    display: block;
    object-fit: cover;
    /*filter: grayscale(100%);*/
    transition: transform .5s ease, filter .1s ease;

  }

  .photo > img:hover {
    /*filter: grayscale(0%);*/
    transform: scale(1.1);
  }
</style>
