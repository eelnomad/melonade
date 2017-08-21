<!-- BlogPost.vue
     Contains the actual content of the post-->

<template>
  <div class="flex-row" id="blog-post">
    <div class="flex-row" :id="[ headerToggle ? 'post-header-small' : 'post-header-large']">
      <transition name="fade">
        <div v-show="!headerToggle" class="background dim"
             :style="{ 'background-image': 'url(' + post.background_image + ')' }"></div>
      </transition>
      <div class="flex-column" id="post-title">
        <span></span>
        <h1>{{ post.title }}</h1>
      </div>
    </div>
    <span></span>
    <div id="post-content">
      <h4>Created on {{ post.create_date }}</h4>
      <h3>{{ post.body }}</h3>
      <div id="footer-spacer"></div>
    </div>
    <span></span>
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
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
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
        this.scroll = document.body.scrollTop
      },
      toTop: function () {
        document.body.scrollTop = 0
      }
    },
    computed: {
      headerToggle: function () {
        return this.scroll > 50
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #blog-post {
    height: 100%;
    width: 100%;
    position: absolute;
    color: #262626;
    background: white;
  }

  #post-header-large {
    position: fixed;
    font-size: 8vh;
    height: 80vh;
    width: 100%;
    transition: all .5s ease;
    z-index: 1;
    color: white;
    border-color: transparent;
    box-shadow: 0 -10px 10px 10px black;
  }

  #post-header-small {
    position: fixed;
    font-size: 3vh;
    height: 8vh;
    width: 100%;
    transition: all .5s ease;
    z-index: 1;
    color: black;
    border-color: #262626;
    background-color: white;
  }

  #post-title {
    height: 100%;
    width: 100%;
    margin: 0 50px;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom-style: solid;
    border-bottom-width: 3px;
    border-color: inherit;
  }

  #post-content {
    width: 50%;
    margin-top: 80vh;
    padding-bottom: 20vh;
    color: #262626;
  }

  #footer-spacer {
    height: 20vh;
  }

  .background {
    top: 0;
    bottom: 0;
    width: 100vw;
    position: absolute;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
  }

  h1 {
    font-size: inherit;
    line-height: inherit;
  }

  h3 {
    line-height: 3vw;
  }
</style>
