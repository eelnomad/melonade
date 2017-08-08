<!-- Blog.vue
     Contains listof posts of specific type to select from.-->

<template>
  <div id="blog">
    <div id="blog-filter">
      <button v-for="type in types" v-on:click="setFilter(type)">
        {{type}}
      </button>
    </div>
    <div class="flex-row">
      <span></span>
      <div id="blog-listing" class="flex-column">
        <blog-nav v-for="post in filteredPosts" :key="post._id" :post="post"></blog-nav>
      </div>
      <span></span>
    </div>
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
      posts: [],
      types: [],
      filter: 'Recent'
    }
  },
  created () {
    this.posts = blogdata
    this.types = this.getTypes()
  },
  destroyed () {
  },
  methods: {
    setFilter: function (type) {
      this.filter = type
    },
    getTypes: function () {
      var types = ['Recent']
      for (var i = 0; i < blogdata.length; i++) {
        if (!types.includes(blogdata[i].type)) {
          types.push(blogdata[i].type)
        }
      }
      return types
    }
  },
  computed: {
    filteredPosts () {
      return this.posts.filter(post => {
        return post.type === this.filter || this.filter === 'Recent'
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
  width: 100vw;
  height: 100%;
  text-align: center;
  position: absolute;
  transition: opacity .5s ease;
}

#blog-filter {
}

#blog-listing {
  text-align: left;
  width: 60%;
}

a{
  color: black;
}

</style>
