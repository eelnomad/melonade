<!-- BlogNav.vue
     Contains listof posts of specific type to select from.-->

<template>
  <div id="blog-nav">
    <div id="blog-filter">
      <button v-for="type in types" v-on:click="setFilter(type)">
        {{type}}
      </button>
    </div>
    <div class="flex-row">
      <span></span>
      <div id="blog-listing">
        <router-link id="blog-nav" v-for="post in filteredPosts" :key="post._id" :to="{name: 'blogPost', params: {post_id: post._id.toString()}}">
          <h1>{{post.title}}</h1>
          <h4>{{post.create_date}}</h4>
        </router-link>
      </div>
      <span></span>
    </div>
  </div>
</template>

<script>
// Replace with rest call that returns 10 posts (title, preview, bg_image, date) for that type maybe
import blogdata from '@/../data/blogdata.json'

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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog-nav {
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

#blog-nav {
  background-color: black;
}

#blog-nav:hover {
  background-color: grey;
}

a{
  color: black;
}

</style>
