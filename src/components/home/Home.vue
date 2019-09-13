<!-- Home.vue
 This is the landing page of the website with four quadrants to select what category of posts to look at.-->

 <template>
  <div id="home">
    <div id="home-container" class="flex-row">
      <div id="side-nav" class="flex-column">
        <router-link :to="{ name: 'home' }">
          <h1>Melonade</h1>
        </router-link>
        <router-link :class="route.type" class="side-nav-item" v-for="route in routes" :key="route.path" :to="{ name: route.name ? route.name : route.childName }">
          {{ route.displayName }}
        </router-link>
        <span></span>
      </div>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div id="background" class="darken">
      <transition-group name="image-fade">
        <img v-for="(image, index) in backgroundQueue" class="photos" :class="{ active : index === 0 }" :src="image.base_url" :key="image.base_url" @load="shiftBackground">
      </transition-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
      }
    },
    created () {
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    methods: {
      shiftBackground: function () {
        this.$store.dispatch('shiftBackgroundQueue')
      }
    },
    watch: {
    },
    computed: {
      backgroundQueue () {
        return this.$store.getters.getBackgroundQueue
      },
      routes () {
        return this.$router.options.routes.find((route) => {
          return route.path === '/'
        }).children
      }
    },
    components: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home {
  width: 100%;
  height: 100%;
  background-color: #303030;
  position: absolute;
}

#home-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  overflow-y: hidden;
}

#side-nav {
  height: 100%;
  flex: 0 0 300px;
  z-index: 99;
  padding: 30vh 20px 0 50px;
  box-sizing: border-box;
  background: rgba(0,0,0,0.5);
}
.side-nav-item {
  padding: 5px 0;
}

.side-nav-item:hover {
  font-weight: bold;
}

.major {
  color: whitesmoke;
  font-size: 1.2em;
}

.minor {
  color: whitesmoke;
  font-size: 1em;
}

router-view {
  flex: 1 0 auto;
}

#background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.darken {
  filter: brightness(60%) grayscale(80%);
}

.photos {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
}

.active {
  z-index: 1;
}

.image-fade-leave-active {
  transition: opacity 3s ease-in-out;
  z-index: 2;
}
.image-fade-enter, .image-fade-enter-to, .image-fade-leave {
  opacity: 1;
}
.image-fade-leave {
  z-index: 2;
}
.image-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  z-index: 2;
}
.fade-enter-active, .fade-leave-active {
  transition: all .1s ease-in;
  overflow-x: hidden;
}
</style>
