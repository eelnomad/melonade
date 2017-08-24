<!-- Blog.vue
     Contains listof posts of specific type to select from.-->

<template>
  <div class="flex-row" id="blog">
    <div class="flex-row" id="blog-header">
      <span></span>
        <div class="flex-column" id="blog-header-content">
            <div id="logo">
              <router-link :to="'/'" id="logo">
              Melonade
              </router-link>
            </div>
          <span></span>
          <div id="blog-filter">
            <button :class="{'selected' : type === filter}" v-for="type in types" @click="setFilter(type)">
              {{type}}
            </button>
          </div>
        </div>
      <span></span>
    </div>
    <span></span>
    <div id="blog-listing">
      <div id="blog-banner" :style="{ 'background-image': 'url(' + randomPost.background_image + ')' }"></div>
      <blog-nav v-for="post in filteredPosts.slice(0,10)" :key="post._id" :post="post"></blog-nav>
      <div id="footer-spacer"></div>
    </div>
    <span></span>
  </div>
</template>

<script>
// Replace with rest call that returns 10 posts (title, preview, bg_image, date) for that type maybe
import blogdata from '@/../static/data/blogdata.json'
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
    },
    randomPost () {
      return this.posts[Math.floor(Math.random() * this.posts.length)]
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
  height: 100%;
  position: absolute;
}

#blog-header {
  position: fixed;
  width: 100vw;
  height: 18vmin;
  z-index: 1;
  background-color: white;
}

#blog-header-content {
  width: 85%;
}

#logo {
  font-family: 'Sacramento', cursive;
  font-size: 9vmin;
  text-align: center;
  padding: 0 10vw;
  margin-top: 3vmin;
  margin-bottom: 0;
}

#blog-filter {
  display: inline;
  white-space: nowrap;
  text-align: center;
  margin-top: 0;
  border-bottom-style: solid;
  border-bottom-color: #262626;
  border-bottom-width: 1px;
  border-top-style: solid;
  border-top-color: #262626;
  border-top-width: 1px;
}

#blog-listing {
  text-align: left;
  margin-top: 18vmin;
  width: 80%;
}

#blog-banner {
  height: 60vh;
  margin-bottom: 3px;
  background-color: grey;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 2px 5px -2px black;
}

#footer-spacer {
  height: 20vh;
}

button {
  transition: all .25s ease;
  background-color: white;
  padding: .75vmin 2vmin;
  border-style: none;
  color: black;
  font-family: 'Fredericka the Great', cursive;
  font-size: 1.8vmin;
}

button:hover, button:focus, .selected {
  outline: none;
  transition: all .25s ease;
  background-color: rgba(0,0,0,.80);
  color: white;
}

a {
  color: black;
}

</style>
