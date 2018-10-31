<!-- SmallProjects.vue
     A hub for routing to smaller projects.-->

<template>
  <div id="small-projects" class="flex-row">
    <div v-for="col in columns" class="small-project-col flex-column">
      <small-projects-nav v-for="route in routes" :key="route.path" :route="route" :ref="route.name"></small-projects-nav>
    </div>
  </div>
</template>

<script>
  import SmallProjectsNav from './SmallProjectsNav'

  export default {
    name: 'small-projects',
    data () {
      return {
        columns: 0
      }
    },
    created () {
      window.addEventListener('resize', this.setColumns)
    },
    mounted () {
      this.setColumns()
      console.log(this.$refs)
    },
    methods: {
      setColumns: function () {
        this.columns = Math.max(Math.floor(this.$el.clientWidth / 400), 1)
      }
    },
    computed: {
      routes () {
        return this.$router.options.routes.filter((route) => {
          return route.smallProjects
        })
      }
    },
    components: {
      SmallProjectsNav
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #small-projects {
    width: 100%;
    height: 100%;
    justify-content: center;
  }

  .small-project-col {
    flex: 0 0 370px;
    align-items: center;
  }
</style>
