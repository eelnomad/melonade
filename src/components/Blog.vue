<template>
  <div id="blog">
    <template v-for="type in types">
      <div id="blog-type">
        <router-link :to="type.name">{{type.name}}</router-link>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'blog',
  data () {
    return {
      types: [
        {'name': 'Shower Thoughts'},
        {'name': 'Programming'},
        {'name': 'Life'},
        {'name': 'Photos'},
        {'name': 'Pizza'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog {
  width: 100%;
  height: 100%;
  column-count:         2;
  column-gap:           0px;
}

#blog-type {
  width: 100% !important;
  height: 50% !important;
  text-align: right;
  vertical-align: text-bottom;
  padding: 60px 60px 60px 60px;
  box-sizing: border-box;
}
</style>
