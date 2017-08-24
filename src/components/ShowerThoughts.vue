<!-- ShowerThoughts.vue
     This is the page that shows Shower Thoughts.-->

<template>
  <div id="shower-thoughts">
    <router-link id="home-button" :to="{name: 'home'}">Home</router-link>
    <div class="overlay">
      <span v-for="i in grid" :class="['opacity-' + i.toString()]"></span>
    </div>
    <transition-group name="fade" :style="{'background': 'transparent'}">
      <div id="thought-bubble" v-for="thought in randomThoughts" :key="thought.key" :style="thought.style">
        <h1>{{thought.thought}}</h1>
      </div>
    </transition-group>
  </div>
</template>

<script>
  // Replace with rest call that returns details of specific post id
  import showa from '@/../data/showerdata.json'

  export default {
    name: 'shower-thoughts',
    data () {
      return {
        thoughts: [],
        grid: [],
        randomThoughts: []
      }
    },
    created () {
      this.thoughts = showa
      this.getGrid()
      this.addRandomThought()
      this.fadeInterval = setInterval(function () {
        this.randomizeFade()
      }.bind(this), 3000)
      this.thoughtInterval = setInterval(function () {
        if (Math.random() < 0.5 - this.randomThoughts.length * 0.1) {
          this.addRandomThought()
        }
        this.removeRandomThought()
      }.bind(this), 1000)
    },
    mounted () {
      window.addEventListener('resize', this.getGrid)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.getGrid)
    },
    methods: {
      addRandomThought: function () {
        if (this.thoughts.length > 0) {
          var randomIndex = Math.floor(Math.random() * this.thoughts.length)
          var temp = this.thoughts[randomIndex]
          temp.style = this.generateStyle(temp.thought.length)
          temp.timer = Math.random() * 4 + 5
          temp.key = Math.random()
          this.randomThoughts.push(temp)
          this.thoughts.splice(randomIndex, 1)
        }
      },
      removeRandomThought: function () {
        for (var i = 0; i < this.randomThoughts.length; i++) {
          this.randomThoughts[i].timer--
          if (this.randomThoughts[i].timer < 0) {
            this.thoughts.push(this.randomThoughts[i])
            this.randomThoughts.splice(i, 1)
            i--
          }
        }
      },
      getGrid: function () {
        var grids = Math.floor(document.documentElement.clientHeight * 8 / document.documentElement.clientWidth * 9)
        while (this.grid.length > grids) {
          this.grid.pop()
        }
        while (this.grid.length < grids) {
          this.grid.push(0)
        }
      },
      randomizeFade: function () {
        for (var i = 0; i < this.grid.length; i++) {
          this.grid[i] = Math.floor(Math.random() * 7) + 1
        }
        this.grid.pop()
        this.grid.push(0)
      },
      generateStyle: function (stringLength) {
        var alignments = ['left', 'right', 'center']
        var height = Math.random() * 40 + 20
        var width = Math.random() * 30 + height
        return {
          'position': 'absolute',
          'width': width + '%',
          'left': Math.floor(Math.random() * (100 - width)) + '%',
          'top': Math.floor(Math.random() * (100 - height)) + '%',
          'font-size': height / Math.max(stringLength, 30) * (Math.random() * 0.5 + 3.75) + 'vw',
          'line-height': height / stringLength * (Math.random() * 0.5 + 5) + 'vw',
          'transition': 'opacity ' + (Math.random() * 2 + 2) + 's ease',
          'text-align': alignments[Math.floor(Math.random() * alignments.length)],
          'overflow': 'hidden'
          // 'background-color': 'white'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #shower-thoughts {
    width: 100%;
    height: 100%;
    position: absolute;
    color: white;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('https://lh3.googleusercontent.com/1pSCTlG7Dj1gM1Obj1QXsLgnPE8MKmkAIX1r4QRml5XjirksSgk-gkh0mzy5m6SqCMHLfzKzYsFTMsS_MDoG-S0YhL5KGKMr_grzn6MPD9XsFQZIuEzmCRQkRge5zFZplCEqr2YnqahoGiUFANUlbHBvV0qbsEQM24wkmTCb2GiA5pdjoWfoDSlh-m-daTvvrPVvb3oJPSxMUI9wEZmLb3UbjdPh5OCJPLjiZj2e_ButTLhCQ9NOTsQxVf33f3GaDkGv6nWVIVtLuA9tVql02lLc4u3LbCXmZucgp5W3wdC3Z0jgwS7aRmA_GM0A6qpiR3Q-VnzUSKxRGC8J1tl-z2vVMfWCHb76a1ihCDE5bI1B9IAEK6czZcIXNRHXvuLRxCvslblnuLFaswwpkMgfnXkDaZEQD5BraQftOR1uaRvoqkciKKforB7d3JrrCDPq6iwMNx6IkGW-4tZ6VHnu9I_PjzTWb63jCYn1wUlm7zMdjxF-uJxtQXzTQ1g7x9pkvJXDWOzNVEOCEohfDYPCY0cGX9iroxRypmRNftigYFGHdLsfTHwovkOBjo6jvfUYpZmCeMKZj_ZJ57036z7xniX2XdCCxuP3Ios8c3e_-iBOMH-5d_s_FxpwpR3vdIioDATmVRoUlp2jwR5AV6uDSn2m3KELnsIdaHJ8jLbOvdpRdw=w1980-h1320-no?.jpg');
    overflow-y: hidden;
  }

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
  }

  .opacity-0 {
    background: rgba(0, 0, 0, .9);
    z-index: -1;
  }

  .opacity-1 {
    background: rgba(0, 0, 0, .1);
    z-index: -1;
  }

  .opacity-2 {
    background: rgba(0, 0, 0, .25);
    z-index: -1;
  }

  .opacity-3 {
    background: rgba(0, 0, 0, .35);
    z-index: -1;
  }

  .opacity-4 {
    background: rgba(0, 0, 0, .45);
    z-index: -1;
  }

  .opacity-5 {
    background: rgba(0, 0, 0, .65);
    z-index: -1;
  }

  .opacity-6 {
    background: rgba(0, 0, 0, .7);
    z-index: -1;
  }

  .opacity-7 {
    background: rgba(0, 0, 0, .8);
    z-index: -1;
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

  #thought-bubble {
    z-index: 5;
    background-color: transparent;
    position: absolute;
  }

  h1 {
    font-size: inherit;
    line-height: inherit;
  }

  span {
    float: left;
    width: 12.5vw;
    height: 12.5vw;
    box-sizing: border-box;
    border: .1px solid #111;
    background: #111;
    z-index: -1;
    transition: background 4s linear;
  }
</style>
