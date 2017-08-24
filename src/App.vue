<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import 'normalize.css/normalize.css'
  import '../src/css/custom.css'

  export default {
    name: 'app',
    head: {
      title: {
        inner: 'Melonade'
      },
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: 'static/images/favicon.png'
        }
      ]
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    overflow-x: hidden;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
