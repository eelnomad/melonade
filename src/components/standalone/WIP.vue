<!-- League.vue
     Will contain League of Legends analytics.-->

<template>
  <div 
    id="wip"
    class="f-row f-center"
  >
    Whoops, sorry. There's nothing here yet.
  </div>
</template>

<script>
  export default {
    name: 'wip',
    data () {
      return {}
    },
    created () {
    },
    methods: {
      back: function () {
        this.$router.go(-1)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #wip {
    background-color: darkgrey;
  }

  #wip-text {
    height: 100%;
    text-align: center;
    z-index: 1;
  }
</style>
