<!-- Blog.vue
     Contains listof posts of specific type to select from.-->

<template>
  <div id="blog">
    <div class="flex-row">
      <span></span>
      <div id="logo">Melonade</div>
      <span></span>
    </div>
    <div class="flex-row">
      <span></span>
      <div id="blog-filter">
        <button :class="{'selected' : type === filter}" v-for="type in types" @click="setFilter(type)">
          {{type}}
        </button>
      </div>
      <span></span>
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
  position: absolute;
  transition: opacity .5s ease;
}

#logo {
  font-family: 'Sacramento', cursive;
  font-size: 80px;
  text-align: center;
  margin-top: 35px;
  margin-bottom: 0;
  width: 80%;
  border-bottom-style: solid;
  border-bottom-color: #262626;
  border-bottom-width: 1px;
}

#blog-filter {
  text-align: center;
  width: 80%;
  border-bottom-style: solid;
  border-bottom-color: #262626;
  border-bottom-width: 1px;
}

#blog-listing {
  text-align: left;
  width: 60%;
}

button {
  transition: all .25s ease;
  background-color: white;
  border-style: none;
  color: black;
  font-family: 'Fredericka the Great', cursive;
  font-size: 2vw;
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
