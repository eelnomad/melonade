<template>
  <div id="blog">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'blog',
    data () {
      return {
      }
    },
    created () {
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
#blog {
  width: 100%;
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: all .1s ease-in;
  overflow-x: hidden;
}

</style>
