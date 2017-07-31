<!-- Blog.vue
     Contains listof posts of specific type to select from.-->

<template>
  <div id="blog">
    <div id="type-filter">
      <ul v-for="type in Object.keys(types)" v-on:click="toggle(type)">
        <button>
        {{type}}
        </button>
      </ul>
    </div>
    <blog-nav v-for="post in filteredPosts" :key="post._id" :post="post">{{post.title}}</blog-nav>
  </div>
</template>

<script>
// Replace with rest call that returns 10 posts (title, preview, bg_image, date) for that type maybe
import blogdata from '@/../data/blogdata.json'
import BlogNav from './BlogNav'

export default {
  name: 'blog',
  data () {
    return {
      posts: blogdata,
      types: {}
    }
  },
  created () {
    this.types = this.getTypes()
  },
  methods: {
    toggle: function (type) {
      this.types[type] = !this.types[type]
    },
    getTypes: function () {
      var types = {}
      for (var i = 0; i < blogdata.length; i++) {
        types[blogdata[i].type] = false
      }
      return types
    }
  },
  computed: {
    filteredPosts () {
      return this.posts.filter(post => {
        return this.types[post.type]
      })
    }
  },
  components: {
    BlogNav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog {
  width: 100%;
  text-align: center;
  color: black;
}
ul {
  text-align: center;
  display: inline;
}
</style>
