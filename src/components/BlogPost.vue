<!-- BlogPost.vue
     Contains the actual content of the post-->

<template>
  <div class="flex-column" id="blog-post" :style="{ 'background-image': 'url(' + post.background_image + ')' }" v-on:scroll="handleScroll">
    <div class="flex-row" v-bind:id="[ headerToggle ? 'post-header-small' : 'post-header-large']">
      <span></span>
      <div id="post-title">
        <h1>{{ post.title }}</h1>
      </div>
      <span></span>
    </div>
    <div class="flex-row dim" id="post-body">
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
      document.body.scrollTop = 0
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
  height: 100vh;
  width: 100vw;
  position: absolute;
  color: white;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  overflow-y: scroll;
}

#post-header-large {
  position: fixed;
  font-size: 3vw;
  height: 30vh;
  width: 100%;
  transition: all .5s ease;
  background-image: inherit;
}

#post-header-small {
  position: fixed;
  font-size: 2vw;
  height: 10vh;
  width: 100%;
  transition: all .5s ease;
  background-image: inherit;
}

#post-title {
  width: 100%;
  padding: 1% 30px 0px 30px;
  align-self: flex-end;
  box-sizing: border-box;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  border-color: white;
}

#post-body {
  position: relative;
  margin-top: 40vh;
  margin-bottom: 80vh;
}

#post-content {
  width: 60%;
}

h1 {
  font-size: inherit;
}

h3 {
  line-height: 35px;
}

.dim:before {
  position: fixed;
}
</style>
