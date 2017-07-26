<!-- Blog.vue
     This is the landing page of the website with four quadrants to select what category of posts to look at.-->

<template>
  <div id="blog">
    <template v-for="type in blogdata">
      <div id="blog-type" v-bind:style="{ 'backgroundImage': 'url(' + type.background_image + ')' }">
        <router-link :to="type.type">{{type.type}}</router-link>
      </div>
    </template>
  </div>
</template>

<script>
import blogdata from '@/../blogdata.json'
export default {
  name: 'blog',
  data () {
    return {
      types: [],
      blogdata: blogdata
    }
  },
  created () {
    this.getTypes()
  },
  methods: {
    getTypes: function () {
      var types = []
      for (var i = 0; i < blogdata.length; i++) {
        if (!types.includes(blogdata[i].type)) {
          types.push(blogdata[i].type)
        }
      }
      this.types = types
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog {
  width: 100%;
  height: 100%;
  column-count: 2;
  column-gap: 0px;
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
