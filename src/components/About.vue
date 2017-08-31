<template>
  <div id="about">
    <div id="animation">
      <div id="sky">
        <div v-for="i in stars" :style="i"></div>
        <div id="star-effect"></div>
        <div id="moon">
          <div id="crater"></div>
        </div>
      </div>
      <div id="third-layer"></div>
      <div id="second-layer"></div>
      <div id="first-layer">
        <div v-for="i in boxes" id="small-one" :class="[location, 'first']"></div>
        <div id="person-layer"></div>
        <div id="ground"></div>
      </div>
    </div>
    <h1>About me</h1>
    <h2>Just a dreamer :) ... wow this is hideous </h2>
  </div>
</template>

<script>
  import '../assets/css/newyork.css'

  export default {
    name: 'about',
    data () {
      return {
        stars: [],
        location: 'newyork',
        boxes: []
      }
    },
    created () {
      this.setStars()
      this.boxes.push(0)
      this.building = setInterval(function () {
        this.boxes.push(0)
      }.bind(this), 10000)
    },
    methods: {
      setStars: function () {
        var total = Math.random() * 300 + 200
        for (var i = 0; i < total; i++) {
          var size = Math.max(Math.floor((Math.random() + Math.random()) * 2), 1)
          this.stars.push({
            'position': 'absolute',
            'width': size + 'px',
            'height': size + 'px',
            'left': (Math.random() * 100) + '%',
            'top': (Math.random() * 100) + '%',
            'background': 'white',
            'z-index': '-4'
          })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #about {
    width: 100%;
    height: 100%;
    position: absolute;
    color: white;
  }

  #animation {
    position: fixed;
    background: black;
    height: 100%;
    width: 100%;
    z-index: -5;
  }

  #sky {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -5;
  }

  #third-layer {
    z-index: -3;
  }

  #second-layer {
    z-index: -2;
  }

  #first-layer {
    z-index: -1;
  }

  #ground {
    position: absolute;
    bottom: 0;
    left: 0vw;
    width: 200vw;
    height: 10vh;
    background: #000026;
    z-index: 1;
  }

  .first {
    position: absolute;
    height: 25vh;
    width: 25%;
    left: 100vw;
    bottom: 10vh;
    z-index: 2;
    -webkit-animation: slide 15s linear infinite;
    -moz-animation: slide 15s linear infinite;
    animation: slide 15s linear infinite;
  }

  #moon {
    position: absolute;
    left: 75%;
    top: 10%;
    width: 15vw;
    height: 15vw;
    border-radius: 50%;
    background: #EEE;
  }

  #crater {
    left: 85vw;
    top: 10vw;
    width: 1vw;
    height: 1vw;
    background: none;
    border-radius: 50%;
    box-shadow:
      4vw 3vw 0 0.2vw rgba(0,0,0,.1),
      8vw 7vw 0 -0.1vw rgba(0,0,0,.1),
      5vw 7vw 0 0.5vw rgba(0,0,0,.1),
      12vw 6vw 0 0.05vw rgba(0,0,0,.1),
      9vw 9vw 0 0.7vw rgba(0,0,0,.1),
      4vw 11vw 0 0.1vw rgba(0,0,0,.1);
  }

  #star-effect {
    position: absolute;
    height: 100%;
    width: 100%;
    background:transparent url('/static/images/star_effect.png') repeat top center;
    z-index:-4;
    -moz-animation:move-twink-back 500s linear infinite;
    -webkit-animation:move-twink-back 500s linear infinite;
    animation:move-twink-back 500s linear infinite;
  }

  #twinkling::before {
    opacity: 0;
  }

  #twinkling::after {
    opacity: 0;
  }

  @-webkit-keyframes slide
  {
    100% { transform: translate3d(-200vw,0,0) }
  }​
  
  @-moz-keyframes slide
  {
    100% { transform: translate3d(-200vw,0,0) }
  }
  
  @keyframes slide
  {
    100% { transform: translate3d(-200vw,0,0) }
  }

  @-webkit-keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }

  @-moz-keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }

  @keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }
</style>
