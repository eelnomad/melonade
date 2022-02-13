export default {
  methods: {
    calculateDependencies: function (index) {
      var row = []
      var col = []
      var box = []

      var rowStart = Math.floor(index / 9) * 9
      var colStart = index % 9
      var boxStart = Math.floor(index / 27) * 27 + Math.floor((index % 9) / 3) * 3

      for (var i = 0; i < 9; i++) {
        row.push(rowStart + i)
      }
      for (var j = 0; j < 9; j++) {
        col.push(colStart + 9 * j)
      }
      for (var k = 0; k < 9; k++) {
        box.push(boxStart + (Math.floor(k / 3) * 9) + (k % 3))
      }
      return [row, col, box]
    },
    resetGrid: function () {
    }
  },
  created () {
  }
}
