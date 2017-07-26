<!-- BlogWrapper.vue
     Wraps the BlogHome and BlogPost. Doesn't show anything itself.-->

<template>
  <div class="blogWrapper">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'blogWrapper',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
