<!-- blogNav.vue
     This is the landing page of the website with four quadrants to select what category of routes to look at.-->

<template>
  <router-link id="blog-nav" :to="{name: 'blogPost', params: {post_id: post._id.toString()}}" v-on:mouseenter.native="mouseOver" v-on:mouseleave.native="mouseOver">
    <div class="flex-column" id="blog-preview">
      <span></span>
      <h1>{{post.title}}</h1>
      <h1>{{post.body}}</h1>
      <span></span>
    </div>
    <div class="background dim" :style="{ 'background-image': 'url(' + post.background_image + ')' }">
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'blog-nav',
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
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog-nav {
  transition: all .5s ease;
  transition-delay: .1s;
  display: flex;
  flex: 1 1 auto;
  position: relative;
  color: black;
  vertical-align: center;
  z-index: 1;
}

#blog-nav:hover {
  background-color: grey;
}
</style>
