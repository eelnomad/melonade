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
html, body {
  width: 100%;
  height: 100%;
  font-family: Bookman, serif;
}

#app {
  width: 100%;
  height: 100%;
}

.background {
  display: flex;
  position: relative;
  z-index: -99;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

a {
  text-decoration: none;
}
</style>
