<!-- Blog.vue
     This is the landing page of the website with four quadrants to select what category of posts to look at.-->

<template>
  <div id="blog">
    <template v-for="post in top">
      <router-link :to="post.type">
        <div id="blog-type" :style="{ 'backgroundImage': 'url(' + post.background_image + ')' }">
          <h3>{{post.title}}</h3>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script>
// Replace with restCall that returns most recent post (title, bg_image, date?, type) for each type
import blogdata from '@/../data/blogdata.json'

export default {
  name: 'blog',
  data () {
    return {
      top: [],
      blogdata: blogdata
    }
  },
  created () {
    this.getTop()
  },
  methods: {
    getTop: function () {
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
  padding: 60px 60px 60px 60px;
  box-sizing: border-box;
  filter: blur(5px);
}

#blog-type:hover {
  text-align: right;
  vertical-align: text-bottom;
  filter: blur(0px);
}
</style>
