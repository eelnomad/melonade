<!-- SmallProjectsNav.vue
     This is the landing page of the website with four quadrants to select what category of routes to look at.-->

<template>
  <router-link id="small-projects-nav" :to="route.name">
    <h1 class="glitch">{{route.display_name}}</h1>
  </router-link>
</template>

<script>
  export default {
    name: 'small-projects-nav',
    props: ['route'],
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
  #small-projects-nav {
    margin: 0 10px 30px 10px;
    padding: 0 2vw;
    flex: 1 0 300px;
    border-radius: 10px;
    background-color: white;
    border-color: lightgray;
    border-style: solid;
    border-width: 1px;
    /*transition: all .5s ease;*/
    /*transition-delay: .1s;*/
    /*display: flex;*/
    /*flex: 1 0 auto;*/
    /*position: relative;*/
    /*color: white;*/
    /*background-size: cover;*/
    /*background-position: center;*/
    /*background-repeat: no-repeat;*/
    font-size: 30px;
    text-align: center;
  }

  #small-projects-nav:hover, #small-projects-nav:focus {
    /*outline: none;*/
    /*display: flex;*/
    /*flex: 99 0 auto;*/
    /*font-size: 4vw;*/
    background-color: whitesmoke;
  }

  .glitch {
    font-size: 130px;
    line-height: 1;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    text-decoration: none;
    color: #fff;
    &:before,
    &:after{
      display: block;
      content: '10';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: .8;
    }
    &:after {
      color: #f0f;
      z-index: -2;
    }
    &:before {
      color: #0ff;
      z-index: -1;
    }
    &:hover {
      &:before {
        animation: glitch-left .3s cubic-bezier(.25, .46, .45, .94) both infinite
      }
      &:after {
        animation: glitch-left-2 .3s cubic-bezier(.25, .46, .45, .94) reverse both infinite
      }
    }
    .small & {
      font-size: 22px;
      font-weight: 400;
      letter-spacing: 2px;
      &:before,
      &:after{
        content: 'Start';
      }
      &:after {
        color: #F40080;
      }
      &:before {
        color: #7FA500;
      }
      &:hover {
      &:before {
          animation: glitch-small .5s cubic-bezier(.25, .46, .45, .94) both infinite
        }
        &:after {
          animation: glitch-small .5s cubic-bezier(.25, .46, .45, .94) reverse both infinite
        }
      }
    }
    .medium & {
      font-size: 40px;
      letter-spacing: 2px;
      text-align: center;
      color: #4222F1;
      &:before,
      &:after{
        content: 'CSS Glitch';
      }
      &:after {
        color: #C487C2;
      }
      &:before {
        color: #00FF02;
      }
      &:hover {
      &:before {
          animation: glitch-medium .5s cubic-bezier(.25, .46, .45, .94) both infinite
        }
        &:after {
          animation: glitch-medium .5s cubic-bezier(.25, .46, .45, .94) reverse both infinite
        }
      }
    }
  }
  @keyframes glitch-small {
      0% {
          transform: translate(0)
      }
      33% {
          transform: translate(2px, 1px)
      }
      66% {
          transform: translate(-1px, -1px)
      }
      to {
          transform: translate(0)
      }
  }
  @keyframes glitch-medium {
      0% {
          transform: translate(0)
      }
      20% {
          transform: translate(-2px, 2px)
      }
      40% {
          transform: translate(-2px, -2px)
      }
      60% {
          transform: translate(2px, 2px)
      }
      80% {
          transform: translate(2px, -2px)
      }
      to {
          transform: translate(0)
      }
  }
  @keyframes glitch-left {
      0% {
          transform: translate(0)
      }
      33% {
          transform: translate(-5px, 3px)
      }
      66% {
          transform: translate(5px, -3px)
      }
      to {
          transform: translate(0)
      }
  }
  @keyframes glitch-left-2 {
      0% {
          transform: translate(0)
      }
      33% {
          transform: translate(-5px, -3px)
      }
      66% {
          transform: translate(5px, 2px)
      }
      to {
          transform: translate(0)
      }
  }
</style>
