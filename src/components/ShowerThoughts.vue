<!-- ShowerThoughts.vue
     This is the page that shows Shower Thoughts.-->

<template>
  <div id="shower-thoughts">
    <router-link id="home-button" :to="{name: 'home'}">Home</router-link>
    <div class="overlay">
      <span v-for="i in grid" :class="['opacity-' + i.toString()]"></span>
    </div>
    <transition-group name="fade" :style="{'background': 'transparent'}">
      <div id="thought-bubble" v-for="thought in activeRandomThoughts" :key="thought.key" :style="thought.style" ref="renderedThoughts">
        <h1 :class="{ 'visible' : thought.active }">{{thought.thought}}</h1>
      </div>
    </transition-group>
  </div>
</template>

<script>
  // Replace with rest call that returns details of specific post id
  import showa from '@/../static/data/showerdata.json'
  export default {
    name: 'shower-thoughts',
    data () {
      return {
        thoughts: [],
        oldThoughts: [],
        grid: [],
        randomThoughts: []
      }
    },
    created () {
      this.addRandomThought()
      this.thoughts = showa
      this.getGrid()
      this.fadeInterval = setInterval(function () {
        this.randomizeFade()
      }.bind(this), 3000)
      this.thoughtRemovalInterval = setInterval(function () {
        this.addRandomThought()
        this.activateThought()
        this.removeRandomThought()
      }.bind(this), 1000)
    },
    mounted () {
      window.addEventListener('resize', this.getGrid)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.getGrid)
    },
    computed: {
      activeRandomThoughts () {
        return this.randomThoughts.filter(thought => {
          return thought.active === true
        })
      }
    },
    methods: {
      addRandomThought: function () {
        if (Math.random() < 0.5 - this.randomThoughts.length * 0.1) {
          if (this.thoughts.length > 0) {
            // Random Thought Selection
            var randomIndex = Math.floor(Math.random() * this.thoughts.length)
            var temp = this.thoughts[randomIndex]
            // Styling prep calculations
            var width = Math.random() * 60 + 20
            var left = Math.floor(Math.random() * (100 - width))
            var top = Math.floor(Math.random() * (100 - (Math.random() * 20 + (20 * document.documentElement.clientWidth / document.documentElement.clientHeight))))
            var fontSize = width / Math.max(temp.thought.length, 30) * (Math.random() * 1.5 + 3)
            var lineHeight = width / temp.thought.length * (Math.random() * 0.5 + 5)
            temp.raw = {
              'width': width,
              'left': left,
              'top': top,
              'fontSize': fontSize,
              'lineHeight': lineHeight
            }
            temp.style = this.generateStyle(temp.raw)
            temp.timer = Math.random() * 4 + 5
            temp.key = Math.random()
            temp.active = false
            this.randomThoughts.push(temp)
            this.thoughts.splice(randomIndex, 1)
          } else {
            // Repopulate thoughts after all thoughts have been shown
            this.thoughts = this.oldThoughts
            this.oldThoughts = []
          }
        }
      },
      removeRandomThought: function () {
        for (var i = 0; i < this.randomThoughts.length; i++) {
          if (this.randomThoughts[i].active) {
            if (this.randomThoughts[i].timer < 0) {
              // this.thoughts.push(this.randomThoughts[i])
              this.oldThoughts.push(this.randomThoughts[i])
              this.randomThoughts.splice(i, 1)
              i--
            } else {
              this.randomThoughts[i].timer--
            }
          }
        }
      },
      activateThought: function () {
        switch (this.randomThoughts.length) {
          case 0:
            break
          case 1:
            this.randomThoughts[0].active = true
            break
          default:
            for (var i = 0; i < this.randomThoughts.length; i++) {
              if (!this.randomThoughts[i].active) {
                var status = true
                // Setting to be rendered element properties
                var top = this.randomThoughts[i].raw.top
                var bottom = top + this.randomThoughts[i].raw.fontSize * this.randomThoughts[i].thought.length / this.randomThoughts[i].raw.width * 10
                var left = this.randomThoughts[i].raw.left
                var right = left + this.randomThoughts[i].raw.width
                var area = (right - left) * (bottom - top)
                // Comparing against rendered elements
                for (var j = 0; j < this.$refs.renderedThoughts.length; j++) {
                  // Setting rendered element properties
                  var elemTop = this.$refs.renderedThoughts[j].offsetTop / this.$refs.renderedThoughts[j].offsetParent.clientHeight * 100
                  var elemBottom = (this.$refs.renderedThoughts[j].offsetTop + this.$refs.renderedThoughts[j].clientHeight) / this.$refs.renderedThoughts[j].offsetParent.clientHeight * 100
                  var elemLeft = this.$refs.renderedThoughts[j].offsetLeft / this.$refs.renderedThoughts[j].offsetParent.clientWidth * 100
                  var elemRight = (this.$refs.renderedThoughts[j].offsetLeft + this.$refs.renderedThoughts[j].clientWidth) / this.$refs.renderedThoughts[j].offsetParent.clientWidth * 100
                  var elemArea = (elemRight - elemLeft) * (elemBottom - elemTop)
                  // Comparing for overlap
                  var interHeight = Math.min(bottom, elemBottom) - Math.max(top, elemTop)
                  var interWidth = Math.min(right, elemRight) - Math.max(left, elemLeft)
                  if (interHeight > 0 && interWidth > 0) {
                    var interArea = interHeight * interWidth
                    if (interArea / area > 0.1 || interArea / elemArea > 0.1) {
                      status = false
                    }
                  }
                }
                this.randomThoughts[i].active = status
              }
              if (status) break
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
      generateStyle: function (raw) {
        var alignments = ['left', 'right', 'center']
        return {
          'width': raw.width + '%',
          'left': raw.left + '%',
          'top': raw.top + '%',
          'font-size': raw.fontSize + 'vw',
          'line-height': raw.lineHeight + 'vw',
          'transition': 'opacity ' + (Math.random() * 2 + 2) + 's ease',
          'text-align': alignments[Math.floor(Math.random() * alignments.length)]
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
    z-index: 3;
    position: absolute;
    overflow: hidden;
    margin: 0px 0px;
    background-color: white;
  }
  h1 {
    font-size: inherit;
    line-height: inherit;
    margin: 0px 0px;
  }
  span {
    float: left;
    width: 12.5vw;
    height: 12.5vw;
    box-sizing: border-box;
    text-shadow: 0px 0px 12px black;
    border: .1px solid #111;
    background: #111;
    z-index: -1;
    transition: background 4s linear;
  }
</style>
