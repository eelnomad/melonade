<!-- BlogNav.vue - This is the landing page of the website with four quadrants to select what category of routes to look at.-->

<template>
  <router-link id="blog-nav" :to="{name: 'blogPost', params: {id: post.id.toString()}}" append>
    <div class="flex-column" id="blog-preview">
      <h2>{{post.title}}</h2>
      <h4>{{post.create_date}}</h4>
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
  transition: all .3s ease;
  display: flex;
  flex: 1 0 auto;
  position: relative;
  vertical-align: center;
  color: black;
  background-color: white;
  margin: 0% 10%;
}

#blog-nav:hover {
  color: white;
  background-color: rgba(0,0,0,.70);
  display: flex;
  flex: 99 0 auto;
  box-shadow: inset 0 0 5px white;
}

#blog-preview {
  padding: 10px 60px;
}

#blog-nav:focus{
  outline: none;
  transition: all .25s ease;
  background-color: rgba(0,0,0,.80);
  color: white;
}

h2 {
  font-size: 1.75vw;
  line-height: 0px;
}

h4 {
  font-size: 1vw;
  line-height: 0px;
}
</style>
