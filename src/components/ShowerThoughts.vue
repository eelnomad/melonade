<!-- ShowerThoughts.vue
     This is the page that shows Shower Thoughts.-->

<template>
  <div id="shower-thoughts">
    <div id="overlay">
      <span v-for="i in grid" :style="{ 'background': 'rgba(0,0,0, ' + i + ')'}"></span>
    </div>
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
        grid: []
      }
    },
    created () {
      this.thoughts = showa
      this.getGrid()
      this.randomizeFade()
      this.interval = setInterval(function () {
        this.randomizeFade()
      }.bind(this), 3000)
    },
    mounted () {
      window.addEventListener('resize', this.getGrid)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.getGrid)
    },
    methods: {
      getGrid: function () {
        this.grid = new Array(Math.floor(document.documentElement.clientHeight * 8 / document.documentElement.clientWidth * 9))
      },
      randomizeFade: function () {
        console.log('running')
        for (var i = 0; i < this.grid.length; i++) {
          this.grid[i] = Math.random() * 0.5
        }
        this.grid.pop()
        this.grid.push(0)
      }
    },
    ready () {
    },
    components: {
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

  .overlay{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    flex-wrap: wrap;
    overflow: none;
  }

  span{
    float:left;
    width: 12.5vw;
    height: 12.5vw;
    box-sizing:border-box;
    opacity:1;
    border-bottom: .1px solid #111;
    border-right: .1px solid #111;
    transition: opacity 3s linear;
  }
</style>
