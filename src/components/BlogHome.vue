<!-- BlogHome.vue
     Contains listof posts of specific type to select from.-->

<template>
  <div class="blogHome">
    <h1>{{ $route.params.blog_id }}</h1>
  </div>
</template>

<script>
export default {
  name: 'blogHome',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
