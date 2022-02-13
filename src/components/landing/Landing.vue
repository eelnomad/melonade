<!-- PhotoGallery.vue
     This is the landing page of the website.-->

<template>
  <div id="landing" class="pT-xl">
    This will be the intro page!
  </div>
</template>

<script>
  export default {
    name: 'landing',
    data () {
      return {
      }
    },
    created () {
        this.$store.commit('theme/setTheme', this.$store.getters['theme/themes'].WHITE)
    },
    beforeDestroy () {
    },
    destroyed () {
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
  #landing {
    background-color: whitesmoke;
  }
</style>
