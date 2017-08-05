<!-- BlogPost.vue
     Contains the actual content of the post-->

<template>
  <div class="flex-column" id="blog-post" @scroll="handleScroll">
    <div class="flex-row" :id="[ headerToggle ? 'post-header-small' : 'post-header-large']">
      <span></span>
      <div class="flex-column" id="post-title">
        <span></span>
        <h1>{{ post.title }}</h1>
      </div>
      <span></span>
    </div>
    <div class="flex-row" id="post-body">
        <span></span>
      <div id="post-content">
        <h4>Created on {{ post.create_date }}</h4>
        <h3>{{ post.body }}</h3>
      </div>
      <span></span>
    </div>
  </div>
</template>

<script>
// Replace with rest call that returns details of specific post id
import blogdata from '@/../data/blogdata.json'

export default {
  name: 'blog-post',
  data () {
    return {
      post: {},
      scroll: 0
    }
  },
  created () {
    this.post = this.getPost()
  },
  destroyed () {
  },
  methods: {
    getPost: function () {
      for (var i = 0; i < blogdata.length; i++) {
        if (blogdata[i]._id.toString() === this.$route.params.post_id) {
          return blogdata[i]
        }
      }
    },
    handleScroll: function () {
      this.scroll = document.getElementById('blog-post').scrollTop
    },
    toTop: function () {
      document.getElementById('blog-post').scrollTop = 0
    }
  },
  computed: {
    headerToggle: function () {
      return this.scroll > 100
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog-post {
  height: 100%;
  width: 100vw;
  position: absolute;
  color: #262626;
  background: white;
  overflow-x: hidden;
}

#post-header-large {
  position: fixed;
  font-size: 5vw;
  height: 30vh;
  width: 100%;
  transition: all .5s ease;
  z-index: 1;
}

#post-header-small {
  position: fixed;
  font-size: 1.5vw;
  height: 8vh;
  width: 100%;
  transition: all .5s ease;
  z-index: 1;
}

#post-title {
  height: 100%;
  width: 90%;
  align-content: flex-end;
  padding: 0 30px;
  box-sizing: border-box;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  border-color: #262626;
  background: white;
  justify-content: flex-end;
}

#post-body {
  position: relative;
  width: 100%;
  margin-top: 35vh;
  margin-left: 0;
  margin-right: 0;
}

#post-content {
  width: 50%;
  color: #262626;
}

h1 {
  font-size: inherit;
  line-height: inherit;
}

h3 {
  line-height: 3vw;
}
</style>
