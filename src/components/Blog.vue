<!-- Blog.vue
     Contains listof posts of specific type to select from.-->

<template>
  <div id="blog">
    <div id="blog-filter">
      <button v-for="type in types" v-on:click="setFilter(type)">
        {{type}}
      </button>
    </div>
    <div class="flex-row" id="blog-content">
      <span></span>
      <div id="blog-listing">
        <router-link v-for="post in filteredPosts" :key="post._id" :to="{name: 'blogPost', params: {post_id: post._id.toString()}}">
          <div id="post-preview" v-on:mouseenter="setImage(post.background_image)">
            <h1>{{post.title}}</h1>
          </div>
        </router-link>
      </div>
      <span></span>
    </div>
    <transition name="fade">
      <div id="background" :style="{ 'background-image': 'url(' + background_image + ')' }"></div>
      </transition>
  </div>
</template>

<script>
// Replace with rest call that returns 10 posts (title, preview, bg_image, date) for that type maybe
import blogdata from '@/../data/blogdata.json'

export default {
  name: 'blog',
  data () {
    return {
      background_image: '',
      posts: blogdata,
      types: [],
      filter: 'Recent'
    }
  },
  created () {
    this.types = this.getTypes()
    this.background_image = this.posts[0].background_image
  },
  destroyed () {
  },
  methods: {
    setImage: function (image) {
      this.background_image = image
    },
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
#blog {
  width: 100vw;
  height: 100%;
  text-align: center;
  position: absolute;
  transition: opacity .5s ease;
}

#blog-filter {
  background: none;
}

#blog-content {
  width: 100vw;
}

#blog-listing {
  width: 60%;
  background-color: transparent;
}

a{
  color: white;
}

#background {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  transition: opacity 1s ease;
  z-index: -1;
  filter: brightness(.5);
}
</style>
