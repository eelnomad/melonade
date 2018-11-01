<!-- ShowerThoughts.vue
     This is the page that shows Shower Thoughts.-->

<template>
  <div id="shower-thoughts">
    <router-link id="home-button" to="/">Home</router-link>
    <div class="overlay">
      <span v-for="i in grid" :class="['opacity-' + i.toString()]"></span>
    </div>
    <transition-group name="fade" :style="{'background': 'transparent'}">
      <a id="thought-bubble" v-for="thought in activeRandomThoughts" :key="thought.key" :style="thought.style" :href="thought.url">
        <h1 :class="{ 'visible' : thought.active }">{{thought.thought}}</h1>
      </a>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: 'shower-thoughts',
    data () {
      return {
        thoughts: [],
        oldThoughts: [],
        grid: [],
        randomThoughts: [],
        access_token: ''
      }
    },
    created () {
      this.getToken()
      this.getShowerThoughts()
      this.getGrid()
      this.startMagic()
    },
    mounted () {
      window.addEventListener('resize', this.getGrid)
      window.addEventListener('focus', this.startMagic)
      window.addEventListener('blur', this.stopMagic)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.getGrid)
      window.removeEventListener('focus', this.startMagic)
      window.removeEventListener('blur', this.stopMagic)
      this.stopMagic()
    },
    computed: {
      activeRandomThoughts () {
        return this.randomThoughts.filter(thought => {
          return thought.active === true
        })
      }
    },
    methods: {
      startMagic: function () {
        this.fadeInterval = setInterval(function () {
          this.randomizeFade()
        }.bind(this), 3000)
        this.thoughtInterval = setInterval(function () {
          this.addRandomThought()
          this.removeRandomThought()
        }.bind(this), 1000)
      },
      stopMagic: function () {
        clearInterval(this.fadeInterval)
        clearInterval(this.thoughtInterval)
      },
      getToken: function () {
        if (localStorage.getItem('reddit_refresh') <= Math.floor(Date.now() / 1000)) {
          this.newRedditToken()
        }
        this.access_token = localStorage.getItem('reddit_access_token')
      },
      newRedditToken: function () {
        var data = new URLSearchParams()
        data.append('grant_type', 'https://oauth.reddit.com/grants/installed_client')
        data.append('device_id', localStorage.getItem('melonade_device_id'))
        this.$http.post('https://www.reddit.com/api/v1/access_token', data, {
          auth: {
            username: 'TOF_jt6LhZBi1w',
            password: ''
          }
        }).then(response => {
          localStorage.setItem('reddit_access_token', 'Bearer ' + response.data.access_token)
          localStorage.setItem('reddit_refresh', Math.floor(Date.now() / 1000) + 3600)
          this.access_token = localStorage.getItem('reddit_access_token')
          console.log('refreshed token')
        }).catch(error => {
          console.log(error)
          localStorage.removeItem('reddit_access_token')
        })
      },
      getShowerThoughts: function () {
        this.$http.get('https://oauth.reddit.com/r/showerthoughts/rising?limit=100', {
          headers: {
            Authorization: this.access_token
          }
        }).then(response => {
          for (var thought in response['data']['data']['children']) {
            this.thoughts.push({
              'thought': response['data']['data']['children'][thought]['data']['title'],
              'url': response['data']['data']['children'][thought]['data']['url']
            })
          }
        }).catch(error => {
          console.log(error)
          this.getToken()
          this.getShowerThoughts()
        })
      },
      addRandomThought: function () {
        if (Math.random() < 0.5 - this.randomThoughts.length * 0.1) {
        // if (Math.random() < 1) {
          if (this.thoughts.length > 0) {
            // Random Thought Selection
            var randomIndex = Math.floor(Math.random() * this.thoughts.length)
            var temp = this.thoughts[randomIndex]
            // Styling prep calculations
            var width = Math.random() * 60 + 20
            var rows = Math.ceil(Math.random() + Math.random() + Math.random())
            var fontSize = Math.max(1, Math.min(7, width * Math.max(1.25, rows) / temp.thought.length / 0.65))
            var height = fontSize * rows * 2.6
            var left = Math.floor(Math.random() * (100 - width))
            var top = Math.floor(Math.random() * (100 - height - 10))
            var lineHeight = fontSize * (Math.random() * 0.6 + 1.2)
            if (!temp.url) temp.url = 'https://www.reddit.com/r/Showerthoughts'
            temp.raw = {
              'width': width,
              'height': height,
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
            // this.thoughts = this.oldThoughts
            this.getShowerThoughts()
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
          } else {
            this.activateThought(this.randomThoughts[i])
          }
        }
      },
      activateThought: function (thought) {
        // console.log(thought.thought)
        var status = true
        // Setting to be rendered element properties
        var top = thought.raw.top
        var bottom = top + thought.raw.height
        var left = thought.raw.left
        var right = left + thought.raw.width
        var area = (right - left) * (bottom - top)
        // Comparing against rendered elements
        for (var i = 0; i < this.randomThoughts.length; i++) {
          if (this.randomThoughts[i].active) {
            // Setting rendered element properties
            var elemTop = this.randomThoughts[i].raw.top
            var elemBottom = elemTop + this.randomThoughts[i].raw.height
            var elemLeft = this.randomThoughts[i].raw.left
            var elemRight = elemLeft + this.randomThoughts[i].raw.width
            var elemArea = (elemRight - elemLeft) * (elemBottom - elemTop)
            var interHeight = Math.min(bottom, elemBottom) - Math.max(top, elemTop)
            var interWidth = Math.min(right, elemRight) - Math.max(left, elemLeft)
            // Debugging
            // console.log(Math.floor(elemTop) + ' vs ' + Math.floor(top))
            // console.log(Math.floor(elemBottom) + ' vs ' + Math.floor(bottom))
            // console.log(Math.floor(elemLeft) + ' vs ' + Math.floor(left))
            // console.log(Math.floor(elemRight) + ' vs ' + Math.floor(right))
            // console.log('interHeight: ' + interHeight)
            // console.log('interWidth: ' + interWidth)
            // Comparing for overlap
            var interArea = interHeight * interWidth
            if (Math.min(interHeight, interWidth) > 0) {
              if (Math.max(interArea / area, interArea / elemArea) > 0) {
                status = false
              }
            }
          }
        }
        thought.active = status
        // console.log('status: ' + status)
      },
      getGrid: function () {
        console.log(document.documentElement)
        var grids = Math.ceil(document.documentElement.clientHeight * 8 / document.documentElement.clientWidth) * 8
        while (this.grid.length > grids) {
          this.grid.pop()
        }
        while (this.grid.length < grids) {
          this.grid.push(0)
        }
      },
      randomizeFade: function () {
        for (var i = 0; i < this.grid.length; i++) {
          if (Math.random() > 0) {
            this.grid[i] = Math.floor(Math.random() * 7) + 1
          }
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
    height: 100%;
    color: white;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('https://lh3.googleusercontent.com/PRZt9UFlJ3EVyk1S-kC7gwbBHEkG06sjG2aVlCiabI_hNqncSI4fnHLFcaAFBoJHceoB6hZwQZYOD8kyHqxWBNf3Zkuk-qf8q6Kv6zgNwsBQouo-1xlKS5BT6uN-jBEB9K3ARzktZNTeRGqBJwzk8OikCdlk2qAm0jSbKSwXw_4zmMqGQQG-GKw1WDDmXmF7gJ4aCbjBJ4_WQqjssh66jQoZ6hga0kyAul4eF_I3oCRZFOeQDs3YtPvvKEvEmgPO374VcwBl_AIzkyTZTUVVZAB8_AHu8uJ8pYsENSRNSeBuv8Pea_d11wI3ySZtwBx7n_jh7r7B6VqfknPJhWrIynpKjtvvivaoSxnJXiCFxm99cuSe_7Wr8sNZ3qRHjCs8GPW81POCcEpRpkWT2Tf86AXaPwTfolSPAxspLtxwMg4RYM412lrUkQwafsO9M5jpewanID-wfxFwUgidEMx_oXap4rqb5RuK-bHkdgxaBDB_MLyF1TCog2BSany4Q9q2QT0DaQ307L2x_J4uc2X8H2OaU8esEOiFRhJN3rHYi6xh54PLcjipIJQXHoDnIiS9A1c8EjVBekjBqr9GsGBlfbRAUN_hMkWmEs80yBt368Lalz5W_uPHE9A3AE4v5bfLIB0HSXjewlFuUii3UEg4NwCQRYr6WgqTT8c=w1980-h1320-no?.jpg');
    overflow-y: hidden;
    transition: opacity 3s;
  }
  .overlay {
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
    position: absolute;
    overflow: hidden;
    margin: 0px 0px;
    cursor: pointer;
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
  a {
    color: white;
  }
</style>
