<!-- BlogPost.vue
     Contains the actual content of the post-->

<template>
  <div class="blogPost">
      <router-link id="wip-button" :to="{name: 'home'}">Not the best button, I know, but at least it will take you home</router-link> 
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
    this.post = this.getPost()
  },
  methods: {
    getPost: function () {
      for (var i = 0; i < blogdata.length; i++) {
        if (blogdata[i]._id === this.$route.params.post_id) {
          return blogdata[i]
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blogPost {
  background-color: black;
}
</style>
