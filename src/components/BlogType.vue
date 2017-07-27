<!-- Blog.vue
     This is the landing page of the website with four quadrants to select what category of posts to look at.-->

<template>
  <router-link :to="post.type + '/' + post._id" v-on:mouseover.native="mouseOver" v-on:mouseleave.native="mouseOver">
    <div class="background" :style="{ 'background-image': 'url(' + post.background_image + ')' }">
      <div id="blog-category" v-if="!active" :style="{ 'color': post.font_preview_color }">
        <h1>{{post.type}}</h1>
      </div>
      <div id="blog-preview" v-else :style="{ 'color': post.font_preview_color }">
        <h2>{{post.title}}</h2>
        <h3>{{post.body}}</h3>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'blogType',
  props: ['post'],
  data () {
    return {
      active: false
    }
  },
  methods: {
    mouseOver: function () {
      this.active = !this.active
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog-type {
  transition: all .5s ease;
  display: flex;
  flex: 1 0 auto;
} 

#blog-type:hover {
  flex: 99 1 auto;
}

#blog-category {
  transition: all .5s ease;
  padding: 20px 60px;
  z-index: -1;
}

#blog-preview {
  transition: all .5s ease;
  padding: 60px 60px;
  z-index: -1;
}
</style>
