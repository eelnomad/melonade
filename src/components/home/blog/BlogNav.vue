<!-- BlogNav.vue - This is the landing page of the website with four quadrants to select what category of routes to look at.-->

<template>
  <router-link id="blog-nav" :to="{name: 'blogPost', params: {id: post.id.toString()}}">
    <div class="flex-column" id="blog-preview">
      <h4>{{post.create_date.substring(0, 10)}}</h4>
      <h2>{{post.title}}</h2>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'blog-nav',
    props: ['post'],
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog-nav {
  transition: all .1s ease;
  flex: 1 0 auto;
  color: whitesmoke;
  font-size: 1vw;
}

#blog-nav:hover, #blog-nav:focus {
  font-size: 1.75vw;
  outline: none;
}

#blog-preview {
  padding: 10px 60px;
}

h2 {
  font-size: inherit;
  line-height: 0px;
}

h4 {
  font-size: 1vw;
  line-height: 0px;
  background-color: red;
  padding: 0;
  margin: 2vw 0 1vw 0;
}
</style>
