<template>
  <div id="about">
    <div id="animation">
      <div id="sky">
        <div v-for="(i, index) in stars" :style="i" :key="index"></div>
        <div id="star-effect"></div>
        <div id="sky-color"></div>
        <div id="moon">
          <div id="crater"></div>
        </div>
      </div>
    </div>
<!--     <h1>About me</h1>
  <h2>Just a dreamer :) ... wow this is hideous </h2> -->
</div>
</template>

<script>
  export default {
    name: 'about',
    data () {
      return {
        stars: [],
        location: 'newyork',
        layerOne: []
      }
    },
    created () {
      this.setStars()
      this.layerOne.push(Math.random())
      this.building = setInterval(function () {
        this.layerOne.push(Math.random())
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
            'z-index': '-4',
            'border-radius': '50%'
          })
        }
      }
    },
    components: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#about {
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

#layer-three {
  z-index: -3;
}

#layer-two {
  z-index: -2;
}

#layer-one {
  z-index: -1;
}

#ground {
  position: absolute;
  bottom: 0;
  left: 0vw;
  width: 200vw;
  height: 10vh;
  background: #000026;
  z-index: -1;
}

.first {
  position: absolute;
  height: 25vh;
  width: 25%;
  left: 100vw;
  bottom: 10vh;
  z-index: -1;
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
  box-shadow: 0 0 150px -20px #EEE;
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
  background:transparent url("~@/assets/images/star_effect.png") repeat top center;
  z-index:-4;
  animation: star-effect 500s linear infinite;
}

#sky-color {
  height: 100%;
  width: 100%;
  opacity: .5;
  background: #0F002E;
  background: linear-gradient(to bottom right, black, #0F001C, #1F084C);
}

@keyframes slide
{
  100% { transform: translate3d(-200vw,0,0) }
}
@keyframes star-effect {
  from {background-position:0 0;}
  to {background-position:-10000px 5000px;}
}
#home-button {
  bottom: 0;
  right: 0;
  margin: 20px 50px;
  padding: 10px 20px;
  position: absolute;
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
#home-button:hover {
  border-bottom-width: 2px;
  outline: none;
}
</style>
