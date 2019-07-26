<!-- Blog.vue - Contains list of posts of specific type to select from.-->

<template>
  <div id="blog">
    <component :is="dynamicComponent"/>
  </div>
</template>

<script>
  import blogdata from '@/assets/data/blogdata.json'
  export default {
    name: 'blog',
    data () {
      return {
        dynamicComponent: undefined
      }
    },
    created () {
      console.log(this.$route.params)
      if (this.$route.params) {
        this.dynamicComponent = BlogHome
      }
    },
    destroyed () {
    },
    methods: {
    },
    computed: {
    },
    components: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
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
