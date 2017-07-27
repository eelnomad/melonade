<!-- Blog.vue
     This is the landing page of the website with four quadrants to select what category of posts to look at.-->

<template>
  <div id="blog">
    <blog-type v-for="post in top" id="blog-type" :key="post._id" :post="post"></blog-type>
  </div>
</template>

<script>
// Replace with restCall that returns most recent post (title, bg_image, date?, type) for each type
import blogdata from '@/../data/blogdata.json'
import BlogType from './BlogType'

export default {
  name: 'blog',
  data () {
    return {
      top: []
    }
  },
  created () {
    this.getTop()
  },
  methods: {
    getTop: function () { // Gets the top post for each category
      blogdata.sort(function (a, b) {
        return (a._id > b._id) ? -1 : ((a._id < b._id) ? 1 : 0)
      })
      var top = []
      var types = []
      for (var i = 0; i < blogdata.length; i++) {
        if (!types.includes(blogdata[i].type)) {
          types.push(blogdata[i].type)
          top.push(blogdata[i])
        }
      }
      this.top = top
    }
  },
  components: {
    BlogType
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
