<template>
  <div id="blog-home">
    <div class="blog-content">
      <transition-group name="staggered-fade" class="flex-row flex-wrap" mode="out-in">
        <blog-nav v-for="post in posts" :key="post.id" :post="post"></blog-nav>
      </transition-group>
    </div>
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
      console.log('cry')
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
}

</style>
