<!-- Blog.vue
     Contains listof posts of specific type to select from.-->

<template>
  <div class="flex-row" id="blog">
  <span></span>
  <div id="blog-content">
    <div id="type-filter">
      <button v-for="type in types" v-on:click="setFilter(type)">
        {{type}}
      </button>
    </div>
    <blog-nav v-for="post in filteredPosts" :key="post._id" :post="post">{{post.title}}</blog-nav>
    </div>
    <span></span>
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
      types: [],
      filter: 'Recent'
    }
  },
  created () {
    this.types = this.getTypes()
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
  height: 100%;
  width: 100%;
  text-align: center;
  color: black;
  position: absolute;
}

#blog-content {
  flex: 3 12 auto;
  background-color: black;
  color: white;
}

.background {
  z-index: -99;
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.dim {
  filter: brightness(.75);
}
</style>
