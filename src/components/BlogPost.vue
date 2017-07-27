<!-- BlogPost.vue
     Contains the actual content of the post-->

<template>
  <div class="blogPost">
    <h1>{{ $route.params.blog_id }}</h1>
    <h2>{{ post.title }}</h2>
    <h4>{{ post.create_date }}</h4>
    <h3>{{ post.body }}</h3>
  </div>
</template>

<script>
// Replace with rest call that returns details of specific post id
import blogdata from '@/../data/blogdata.json'

export default {
  name: 'blogPost',
  data () {
    return {
      post: {}
    }
  },
  created () {
    this.getPost()
  },
  methods: {
    getPost: function () {
      for (var i = 0; i < blogdata.length; i++) {
        if (blogdata[i]._id.toString() === this.$route.params.post_id) {
          this.post = blogdata[i]
        }
      }
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
