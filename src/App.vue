<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'normalize.css/normalize.css'
import '../src/css/custom.css'

export default {
  name: 'app'
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
