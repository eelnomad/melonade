<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import 'normalize.css/normalize.css'
  import '@/assets/css/custom.css'

  export default {
    name: 'app',
    data () {
      return {
      }
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
    },
    computed: {
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
