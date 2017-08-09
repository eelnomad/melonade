<!-- BlogNav.vue
     This is the landing page of the website with four quadrants to select what category of routes to look at.-->

<template>
  <router-link id="blog-nav" :to="{name: 'blogPost', params: {post_id: post._id.toString()}}">
    <div class="flex-column" id="blog-preview">
      <h1>{{post.title}}</h1>
      <h4>{{post.create_date}}</h4>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'blog-nav',
    props: ['post'],
    data () {
      return {}
    },
    methods: {},
    created () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #blog-nav {
    transition: all .3s ease;
    display: flex;
    flex: 1 0 auto;
    position: relative;
    vertical-align: center;
    font-size: 2.5vw;
    color: white;
    background-color: rgba(0,0,0,.5);

  }

  #blog-nav:hover {
    color: black;
    background-color: white;
    display: flex;
    flex: 99 0 auto;
  }

  #blog-preview {
    padding: 20px 60px;
    z-index: 1;
  }

  h1 {
    font-size: inherit;
  }
</style>
