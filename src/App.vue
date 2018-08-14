<template>
  <div id="app">
    <main-nav v-show="active"></main-nav>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import MainNav from './components/navigation/MainNav'
  import 'normalize.css/normalize.css'
  import './assets/css/custom.css'

  export default {
    name: 'app',
    data () {
      return {
      }
    },
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
    },
    created () {
      if (!localStorage.getItem('melonade_device_id')) {
        var d = Date.now()
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0
          d = d / 16 | 0
          return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
        })
        localStorage.setItem('melonade_device_id', uuid)
      }
    },
    components: {
      MainNav
    },
    computed: {
      active () {
        return this.$store.getters.getHeader
      }
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

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
