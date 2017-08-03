<!-- Blog.vue
     Contains listof posts of specific type to select from.-->

<template>
  <div id="blog">
    <div id="blog-header">
      <div id="blog-filter">
        <button v-for="type in types" v-on:click="setFilter(type); toTop">
          {{type}}
        </button>
      </div>
    </div>
    <div class="flex-row" id="blog-content">
      <span></span>
      <div id="blog-listing">
        <blog-nav v-for="post in filteredPosts" :key="post._id" :post="post">{{post.title}}</blog-nav>
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
      posts: blogdata,
      types: [],
      filter: 'Recent',
      scroll: 0
    }
  },
  created () {
    this.types = this.getTypes()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
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
    },
    handleScroll: function () {
      this.scroll = document.body.scrollTop
    },
    toTop: function () {
      document.body.scrollTop = 10
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
  width: 100%;
  text-align: center;
  position: absolute;
  overflow-y: auto;
}

#blog-header {
  width: 100%;
  position: fixed;
  z-index: 5;
}

#blog-content {
  width: 100%;
  height: 100vh;
  color: white;
}

#blog-listing {
  width: 65%;
  flex: 1 0 auto;
}

#blog-top {
  position: fixed;
  bottom: 5%;
  right: 7%;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
</style>
