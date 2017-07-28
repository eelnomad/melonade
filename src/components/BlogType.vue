<!-- Blog.vue
     This is the landing page of the website with four quadrants to select what category of posts to look at.-->

<template>
  <router-link :to="post.type + '/' + post._id" v-on:mouseenter.native="mouseOver" v-on:mouseleave.native="mouseOver">
    <div id="blog-preview" v-show="!active">
      <span></span>
      <h1>{{post.type}}</h1>
      <span></span>
    </div>
    <div id="blog-preview" v-show="active">
      <h2>{{post.title}}</h2>
      <h3>{{post.body}}</h3>
      <span></span>
      <button id="blog-type-button" :to="post.type">
        <router-link :to="post.type">
          More {{post.type}}
        </router-link>
      </button>
    </div>
    <div class="background dim" :style="{ 'background-image': 'url(' + post.background_image + ')' }">
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
  flex: 1 1 auto;
  position: relative;
  color: white;
  vertical-align: center;
  z-index: 1;
} 

#blog-type:hover {
  display: flex;
  flex: 99 1 auto;
}

#blog-preview {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 60px;
}

#blog-type-button {
  background-color: transparent;
  background-repeat: no-repeat;
  border-style: solid;
  border-width: 1px;
  border-bottom-width: 3px;
  border-color: white;
  color: white;
  float: right;
  outline-width: 1px;
  outline-color: white;
  cursor: pointer;
  z-index: 2;
}

a {
  color: white;
}

#blog-type-button:hover {
  border-bottom-width: 2px;
}

.background {
  z-index: -99;
  width: 100%;
  height: 101%;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.dim {
  filter: brightness(.5);
}
</style>
