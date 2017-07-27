<!-- BlogHome.vue
     Contains listof posts of specific type to select from.-->

<template>
  <div id="blogHome">
    <h1>{{ $route.params.blog_id }}</h1>
    <template v-for="post in postList">
      <router-link :to="post.type + '/' + post._id.toString()">
        <div id="postItem" :style="{ 'backgroundImage': 'url(' + post.background_image + ')' }">
          <h2>{{ post.title }}</h2>
          <h4>{{ post.create_date}}</h4>
          <h3>{{ post.body }}</h3>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script>
// Replace with rest call that returns 10 posts (title, preview, bg_image, date) for that type
import blogdata from '@/../data/blogdata.json'

export default {
  name: 'blogHome',
  data () {
    return {
      postList: []
    }
  },
  created () {
    this.getPosts()
  },
  methods: {
    getPosts: function () {
      var postList = []
      for (var i = 0; i < blogdata.length; i++) {
        if (blogdata[i].type === this.$route.params.blog_id) {
          postList.push(blogdata[i])
        }
      }
      this.postList = postList
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
