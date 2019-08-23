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
        let flex_pct = 20 + Math.floor(Math.random() * 20)
        let height_pct = 25 + Math.floor(Math.random() * 10)
        sortedPhotos[i]['style'] = 'flex: 1 1 ' + flex_pct.toString() + '%;' // height:' + height_pct.toString() + 'vh;'
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
  }

  #photo-list {
    padding: 5% 5% 5% 5%;
    box-sizing: border-box;
    height: 100%;
  }

  .photo {
    display: inline-block;
    overflow: hidden;
  }

  .photo > img{
    width: 100%;
    height: 20vh;
    display: block;
    object-fit: cover;
    transition: transform .5s ease;
  }

  .photo > img:hover {
    transform: scale(1.1);
  }
</style>
