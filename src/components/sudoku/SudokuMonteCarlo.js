export default {
  methods: {
    mcChangeCost: function (key, oldVal, newVal) {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 9; j++) {
          if (key !== this.grid[key].related[i][j]) {
            if (oldVal === this.grid[this.grid[key].related[i][j]].value) {
              this.grid[key].cost--
              this.grid[this.grid[key].related[i][j]].cost--
            } else if (newVal === this.grid[this.grid[key].related[i][j]].value) {
              this.grid[key].cost++
              this.grid[this.grid[key].related[i][j]].cost++
            }
          }
        }
      }
      this.$set(this.grid[key], 'value', newVal)
    },
    mcStep: function () {
      this.mcInProgress = true
      this.mcLoop++
      while (this.mcLoop % 25 !== 0) {
        var cost = 0
        this.mcVariableSquares.forEach(function (key) {
          var newVal = this.mcRandomValue(key)
          // If value didn't change, skip logic
          if (newVal !== this.grid[key].value) {
            // If new cost is less than old cost, keep changes
            var newCost = this.mcIndividualCost(key, newVal)
            if (newCost <= this.grid[key].cost) {
              this.mcChangeCost(key, this.grid[key].value, newVal)
            } else {
              if (Math.random() < Math.exp((this.grid[key].cost - newCost) / this.mcTemperature)) {
                this.mcChangeCost(key, this.grid[key].value, newVal)
              }
            }
          }
          // Push new cost to end of list and check if === 0
          cost = this.mcTotalCost()
          if (cost <= 0) {
            this.$refs.highstock.chart.series[0].addPoint([Date.now(), cost], false)
            this.$refs.highstock.chart.series[1].addPoint([Date.now(), this.mcTemperature], false)
            this.$refs.highstock.chart.redraw()
            return this.stop()
          }
        }.bind(this))
        this.$refs.highstock.chart.series[0].addPoint([Date.now(), cost], false)
        this.$refs.highstock.chart.series[1].addPoint([Date.now(), this.mcTemperature], false)
        this.mcLoop++
      }
      if (this.mcLoop % 100 === 0) {
        this.mcTemperature *= 0.99
      }
      if (this.mcTemperature <= this.mcTemperatureThreshold) this.mcTemperature = this.mcTemperatureMax * Math.pow(0.8, this.mcLoop / 12000)
      if (this.mcTemperature <= this.mcTemperatureThreshold) this.mcLoop = 0
      this.mcInProgress = false
      return false
    },
    mcSolve: function () {
      if (!this.start()) return false
      // Reinit MonteCarlo Setup
      this.$refs.highstock.chart.series[0].setData([])
      this.$refs.highstock.chart.series[1].setData([])
      this.mcVariableSquares = []
      this.mcIndex = 0
      this.mcLoop = 0
      // Collect all squares that need to be filled in and fill them in
      for (var key in this.grid) {
        if (this.grid[key].value === '') {
          this.mcVariableSquares.push(key)
          this.$set(this.grid[key], 'value', this.mcRandomValue(key))
        }
      }
      if (this.mcVariableSquares.length === 0) return this.stop()
      // Calculate cost for all squares
      for (key in this.grid) {
        this.$set(this.grid[key], 'cost', this.mcIndividualCost(key, this.grid[key].value))
      }
      this.mcInterval = setInterval(function () {
        if (!this.pause && !this.mcInProgress) this.solving = !this.mcStep()
      }.bind(this), this.displayInterval)
      this.mcGraphInterval = setInterval(function () {
        this.$refs.highstock.chart.redraw()
      }.bind(this), 3000)
    },
    mcTotalCost: function () {
      var cost = 0
      for (var key in this.grid) {
        cost += this.grid[key].cost
      }
      return cost
    },
    mcRandomValue: function (key) {
      // return this.grid[key].possible[Math.floor(Math.random() * this.grid[key].possible.length)]
      return '123456789'[Math.floor(Math.random() * 9)]
    },
    mcIndividualCost: function (key, value) {
      var cost = 0
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 9; j++) {
          if (value === this.grid[this.grid[key].related[i][j]].value && key !== this.grid[key].related[i][j]) cost++
        }
      }
      return cost
    }
  },
  created () {
    this.mcTemperature = this.mcTemperatureMax
    this.mcChartOptions = {
      chart: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        shadow: {
          color: 'rgba(0, 0, 0, 0.5)',
          opacity: 0.2,
          width: 10
        },
        style: {
          fontFamily: 'Quicksand, sans-serif'
        },
        marginRight: 40,
        spacingTop: 20
      },
      rangeSelector: {
        buttons: [
          {
            count: 10,
            type: 'second',
            text: '10S'
          }, {
            count: 1,
            type: 'minute',
            text: '1M'
          }, {
            count: 5,
            type: 'minute',
            text: '5M'
          }, {
            type: 'all',
            text: 'All'
          }
        ],
        inputEnabled: false,
        selected: 1
      },
      title: {
        text: 'MonteCarlo Cost History',
        style: {
          color: 'white',
          marginTop: '20px',
          fontSize: '24px'
        }
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Cost',
        data: [],
        yAxis: 0
      }, {
        name: 'Temperature',
        data: [],
        dashStyle: 'shortdash',
        yAxis: 1,
        color: 'orange'
      }],
      xAxis: [{
        labels: {
          style: {
            color: 'white'
          }
        }
      }],
      yAxis: [{
        opposite: true,
        labels: {
          style: {
            color: 'white'
          }
        },
        offset: 25
      }, {
        opposite: false,
        inside: true,
        labels: {
          style: {
            color: 'white'
          }
        },
        offset: -10
      }]
    }
  }
}
