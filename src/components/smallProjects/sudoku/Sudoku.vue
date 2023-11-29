<!-- League.vue
	Will contain Sudoku Solving amazingness.-->
<template>
    <div>
        <div class="f-col f-center main" id="sudoku">
        	<div class="controls f-row f-wrap f-center pT-xl f-col-gap-xl">
                <div class="f-col f-center pH-xl">
                    <div>Solve With</div>
                    <div class="f-row f-wrap f-center f-col-gap-s">
                        <button @click='start("Recursion")'>Recursion</button>
                        <button @click='start("Monte")'>Monte Carlo</button>
                        <button @click='stop()'>Stop</button>
                    </div>
                </div>
                <div class="f-col f-center pH-xl">
                    <div>Manage Puzzle</div>
                    <div class="f-row f-center f-wrap f-col-gap-s">
                        <button @click='get()'>Get State</button>
                        <button @click='load()'>Load Puzzle</button>
                        <input type="text" v-model='customPuzzle' />
                   </div> 
                </div>
    	        <div>
    	            {{ current }}
    	            {{ mcFitness }}
    	            {{ mcTemp }}
    	        </div>
    	    </div>
            <div class="display f-row f-center f-grow pB-xl">
    	        <table class="grid f-row">
    	            <td v-for="(key, index) in grid" class="grid-block" :key="index">
    	                <input 
    	                	:class="{'locked': key.locked, 'error': key.conflicts.length > 0}"
    	                	:value="key.value"
    	                	@keyup.delete="userInput(index, $event)"
    	                	@keypress.prevent="userInput(index, $event)"
    	                	class="normal"
    	                />
    	            </td>
    	        </table>
    	    </div>
        </div>
        <div 
            class="article f-row pV-xxl pH-l"
        >
            <span class="f-grow"></span>
            <div class="article-content">
                <div class="section-timestamp">2019-03-15</div>
                <div class="article-title pB-l">Mastering Sudoku with Recursion, Monte Carlo, and Simulated Annealing Methods</div>
                <br/>
                <div class="section-header">Introduction</div>
                <br/>
                <div class="section-body">Welcome to my Sudoku-solving adventure! Sudoku puzzles have captured the hearts and minds of puzzle enthusiasts around the world. In this blog post, we'll explore two powerful methods (of varying efficiencies) for solving Sudoku puzzles: Recursion and Monte Carlo. Whether you're a Sudoku novice or a seasoned pro, these techniques will surely elevate your solving skills.</div>
                <br/>
                <br/>
                <div class="section-header">I. Understanding Sudoku</div>
                <br/>
                <div class="section-body">A crucial aspect of this page was crafting a visually appealing interface. I opted for a simple background image of nature and a slow paced breathing effect, focusing on readability and gentle animations. The shower thoughts were randomly presented across the viewable screen, each with a varying font size to drive home the random nature of shower thoughts. To create a calming ambiance, I incorporated a subtle breathing effect—a gentle fade-in and fade-out for each thought, reminiscent of a peaceful meditation exercise. This effect was achieved using CSS animations, providing visitors with a soothing visual experience.</div>
                <br/>
                <br/>
                <div class="section-header">II. The Recursion Approach</div>
                <br/>
                <div class="section-header">A. What is Recursion?</div>
                <div class="section-body">Recursion involves solving a problem by breaking it down into smaller instances of the same problem. In the context of Sudoku, recursion allows us to tackle the puzzle square by square, simplifying the complex task into more manageable sub-problems.</div>
                <br/>
                <div class="section-header">B. Applying Recursion to Sudoku</div>
                <div class="section-body">Begin with an empty grid and choose a square. Assume a digit and recursively apply the same process until a solution is found or an incorrect assumption is identified. Backtrack and explore alternative paths until the entire puzzle is solved.</div>
                <br/>
                <div class="section-header">C. Pros and Cons of Recursion</div>
                <div class="section-body">Pros: Elegant problem decomposition, well-suited for puzzles with logical dependencies.</div>
                <div class="section-body">Cons: May struggle with puzzles requiring extensive trial and error, potentially leading to inefficiencies.</div>
                <br/>
                <br/>
                <div class="section-header">III. The Monte Carlo Method</div>
                <br/>
                <div class="section-header">A. Introduction to Monte Carlo</div>
                <div class="section-body">Monte Carlo is a probabilistic method that leverages randomness to find solutions. In Sudoku, it involves making educated guesses and iteratively refining them based on the puzzle's constraints.</div>
                <br/>
                <div class="section-header">B. Applying Monte Carlo to Sudoku</div>
                <div class="section-body">Randomly fill in squares with plausible numbers, considering constraints. Evaluate the puzzle's validity, and if incorrect, adjust the guessed numbers. Repeat until a solution is found.</div>
                <br/>
                <div class="section-header">C. Pros and Cons of Monte Carlo</div>
                <div class="section-body">Suitable for puzzles with multiple possible solutions, provides a systematic approach to guessing.</div>
                <div class="section-body">Cons: Relies on randomness, might require more iterations to converge on a solution.</div>
                <br/>
                <div class="section-header">D. Simulated Annealing Variant</div>
                <div class="section-body">While Monte Carlo by itself can be compared to throwing things at a wall and hoping to get lucky, Simulated Annealing allows for controlled randomization by gradually decreasing the randomness over iterations. This helps in exploring the solution space more effectively, especially when Monte Carlo might get stuck in local optima.</div>
                <br/>
                <br/>
                <div class="section-header">IV. Comparing the Methods</div>
                <br/>
                <div class="section-header">A. Efficiency and Speed</div>
                <div class="section-body">Recursion excels in logically structured puzzles, offering a systematic approach. Monte Carlo, on the other hand, handles puzzles with multiple solutions or complex branching more effectively. The choice depends on the nature of the puzzle.</div>
                <br/>
                <div class="section-header">B. Implementation Challenges</div>
                <div class="section-body">Recursion might face challenges in puzzles with limited logical deductions, requiring extensive backtracking. Monte Carlo could take longer if the initial guesses are far from the solution. Experimentation is key to finding the most effective approach.</div>
                <br/>
                <br/>
                <div class="section-header">V. Conclusion</div>
                <br/>
                <div class="section-body">In conclusion, both recursion and Monte Carlo methods provide valuable tools for Sudoku enthusiasts. Whether you prefer the systematic approach of recursion or the probabilistic nature of Monte Carlo, mastering both methods opens new dimensions in puzzle-solving. But maybe pick recursion if you're actually looking to solve your problem in a timely manner.</div>
                <br/>
                <br/>
                <div class="section-header">VI. Next Steps</div>
                <br/>
                <div class="section-header">A. Fine-Tuning Simulated Annealing Parameters</div>
                <div class="section-body">Explore the importance of fine-tuning temperature steps in the Simulated Annealing process. Adjusting temperature schedules can significantly impact the effectiveness of the method in finding optimal solutions.</div>
                <br/>
                <div class="section-header">B. Genetic Algorithms</div>
                <div class="section-body">Discuss the potential of incorporating Genetic Algorithms into Sudoku solving. Genetic Algorithms involve evolving a population of solutions through crossover and mutation, mimicking natural selection processes.</div>
            </div>
            <span class="f-grow"></span>
        </div>
    </div>
</template>
<script>
import { Bar } from 'vue-chartjs'

import sudokuRecursive from './SudokuRecursive.js'
import sudokuMonteCarlo from './SudokuMonteCarlo.js'
import sudokuGenetic from './SudokuGenetic.js'

export default {
    name: 'sudoku',
    mixins: [sudokuMonteCarlo, sudokuRecursive, sudokuGenetic],
    components: [Bar],
    data() {
        return {
            current: null,
            grid: [],
            chartOptions: null,
            customPuzzle: ' 1  2 3    2  3 4  5      6  47   5    1    3 7  68   3    4 9    6  1 4  6      '
        }
    },
    created() {
        // Setting up grid
        for (var i = 0; i < 81; i++) {
            var related = []
            var val
            for (var j = 0; j < 9; j++) {
                // Rows
                val = Math.floor(i / 9) * 9 + j
                if (val !== i) {
                    if (related.indexOf(val) === -1) {
                        related.push(val)
                    }
                }
                // Columns
                val = (i % 9) + 9 * j
                if (val !== i) {
                    if (related.indexOf(val) === -1) {
                        related.push(val)
                    }
                }
                // Boxes
                val = (Math.floor(i / 27) * 27 + Math.floor((i % 9) / 3) * 3) + (Math.floor(j / 3) * 9) + (j % 3)
                if (val !== i) {
                    if (related.indexOf(val) === -1) {
                        related.push(val)
                    }
                }
            }

            this.grid.push({
                value: null,
                related: related,
                conflicts: [],
                locked: false
            })
        }
    },
    methods: {
        stop: function() {
            if (this.current === 'Recursion') {
                this.recursiveStop()
            }
            if (this.current === 'Monte') {
                this.mcStop()
            }
            this.current = null
        },
        start: function(type) {
        	this.lockGrid()
            if (type === 'Recursion') {
                this.recursiveSolve()
                this.current = type
            } else if (type === 'Monte') {
                this.mcSolve()
                this.current = type
            }
        },
        load: function() {
            var premade = this.customPuzzle
            this.grid.forEach((grid, i) => {
                grid.value = parseInt(premade[i]) > 0 && parseInt(premade[i]) < 10 ? parseInt(premade[i]) : null
            })
        },
        get: function() {
            var temp = ''
            this.grid.forEach((grid, i) => {
                temp += grid.value?.toString() ?? ' '
            })
            this.customPuzzle = temp
        },
        userInput: function(index, event) {
            // console.log(index)
            var input = parseInt(event.key)
            // Check if input is an integer
            if (input <= 9 && input >= 1) {
                this.setValue(index, input)
            } else {
                this.setValue(index)
            }
        },
        checkValid: function(index) {
            // Check if value is valid
            // console.log(this.grid[index].conflicts)
            return this.grid[index].conflicts.length > 0
        },
        lockGrid: function() {
        	this.grid.forEach((grid) => {
        		grid.locked = (grid.value != null)
        	})
        },
        unlockGrid: function() {
        	this.grid.forEach((grid) => {
    			grid.locked = false
        	})
        },
        setValue: function(index, input = null) {
            // Set value
            this.grid[index].value = input
            // Update conflicts
            for (var r of this.grid[index].related) {
                if (this.grid[r].value === null) {
                    continue
                } else if (this.grid[index].value !== null && this.grid[index].value === this.grid[r].value) {
                    if (this.grid[index].conflicts.indexOf(r) === -1) {
                        // console.log('Adding: ' + r)
                        this.grid[index].conflicts.push(r)
                        this.grid[r].conflicts.push(index)
                    }
                } else {
                    if (this.grid[index].conflicts.indexOf(r) !== -1) {
                        // console.log('Removing: ' + r)
                        this.grid[index].conflicts.splice(this.grid[index].conflicts.indexOf(r), 1)
                        this.grid[r].conflicts.splice(this.grid[r].conflicts.indexOf(index), 1)
                    }
                }
            }
            // this.$forceUpdate()
            // console.log('Index: ' + index)
            // console.log(this.grid[index].conflicts)
        }
    },
    computed: {
        state: function() {
            var result = ''
            for (var i = 0; i < this.grid.length; i++) {
                result += this.grid[i].value ? this.grid[i].value : ' '
            }
            return result
        }
    },
    watch: {},
    mounted() {},
    beforeDestroy() {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sudoku {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    align-items: center;
    color: black;
    background-color: whitesmoke;
    /*background-image: url('https://lh3.googleusercontent.com/UqrZHJ0MVurefzgefF9zCzR3cUGkOQY97ZSx6yiZJycfSLNAy9fpK0VzfmPXZiib9JA459-cPcxke699A8Ovy3Nh4bM8xVv5NsatsBL4gyF6Q3Gp0Xn1ZZshnz4MzSmmCRP4vI2g8dqys0jqOUIDzz2B28ia1AYKPd4NN7_gu2e5sLyD-0X2Pbb_Zi6LNIt20nl15dJjuLI-QaMnYH9EjtBp1qPMLwJFG5q5l3tTbOFgA-Tws1rRJ6sfLNYfywnEKtwzt6_C-uqSfdPlzu_0btVpI3aRZz2zfSr13tkJ3mYAVSnRuG_23laoaG4fhOEIaZGqOUPzNVtDyWojZ2ORWu48YoOM_EpxGAWQ_1S2AH51eiqB-wJaPSZVpkdy_RqBz0_oRePLAfkIVNF-DzNg0qfmYfjn1wMkRXkwRwp0xny0oMh6FCpYbfbC1D4rnSWW_nfCE9CbwhOM-oQfDPzqv4Bwwf3DVqCltLROzgjOa_j9bW_23kop1wK80QeXnFCd506eXKqb_GtHmViQ1Z_KU1lSjF36wbsRsA0Dql5YojNBEnMR_ZsJHNNXYM8mwRSEBOxfgzDEEEwE9rKwNem3oerhJfF8WY6vwDCum23B7aPqZckO8jmq1b7dCxGWNUwsJhqjRKX53De50Gun_NxMQqgnf7OV0JQ-5OA=w1980-h1320-no?.jpg');*/
}

.grid {
    flex-wrap: wrap;
    height: 81vmin;
    width: 81vmin;
}

.grid-block {
    box-sizing: border-box;
    height: 9vmin;
    width: 9vmin;
}

.grid-block>input {
    height: 100%;
    width: 100%;
    font-size: 7vmin;
    text-align: center;
    caret-color: transparent;
}

.grid-block>input:focus {
    background-color: whitesmoke;
    outline: none;
    border-width: 1px;
    border-color: whitesmoke;
}

.error {
    color: red;
    background-color: pink;
}

.locked {
    background-color: lightskyblue;
}

.normal {
    color: black;
}
</style>