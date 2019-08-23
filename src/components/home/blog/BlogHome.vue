<template>
  <div id="blog-home">
    <transition-group id="blog-list" name="staggered-fade" class="flex-column" mode="out-in">
      <blog-nav v-for="post in posts" :key="post.id" :post="post"></blog-nav>
    </transition-group>
  </div>
</template>

<script>
  // Replace with rest call that returns 10 posts (title, preview, bg_image, date) for that type maybe
  import blogdata from '@/assets/data/blogdata.json'
  import BlogNav from './BlogNav'

  export default {
    name: 'blog-home',
    data () {
      return {
        posts: []
      }
    },
    created () {
      this.posts = blogdata
    },
    destroyed () {
    },
    methods: {
    },
    computed: {
    },
    components: {
      BlogNav
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog-home {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

#blog-list {
  margin: 0 20%;
  padding-bottom: 100px;
  border-right: 2px solid gray;
  text-align: right;
}

</style>
