export default {
  data () {
    return {
      recursiveGrid: {},
      stack: []
    }
  },
  methods: {
    possible: function (index) {
      var values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      for (var col of this.grid[index].related) {
        if (this.grid[col].value) {
          values.splice(values.indexOf(parseInt(this.grid[col].value)), 1)
        }
      }
      this.$set(this.recursiveGrid, index, values)
    },
    recursive: function () {
      for (var key in this.grid) {
        this.possible(key)
      }
      console.log(this.recursiveGrid)
    }
  }
}
