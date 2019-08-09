<!-- Blog.vue - Contains list of posts of specific type to select from.-->

<template>
  <div id="blog-post">
    <component :is="dynamicComponent"/>
  </div>
</template>

<script>
  export default {
    name: 'blog-post',
    props: ['id'],
    data () {
      return {
        dynamicComponent: undefined
      }
    },
    created () {
      this.dynamicComponent = () => import('./posts/' + this.id)
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
<style>
#blog-post {
  width: 100%;
  height: 100%;
  color: white;
}

h1 {
  size: 500px;
}

h2 {
  font-size: 10px;
}
</style>
