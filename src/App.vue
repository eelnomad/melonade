<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'normalize.css/normalize.css'

export default {
  name: 'app'
}
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: Bookman, serif;
  }

  a {
    color: #42b983;
  }
</style>
