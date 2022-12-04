<!-- ShowerThoughts.vue
		 This is the page that shows Shower Thoughts.-->
<template>
    <div id="shower-thoughts">
        <TransitionGroup name="fade">
            <a
                v-for="(thought, index) in thoughtQueue"
                v-show="thought.active"
                :href="thought.url"
                :key="index"
                :style="thought.style"
                class="thought-bubble"
                target="_blank"
            >
                {{thought.title}}
            </a>
        </TransitionGroup>
    </div>
</template>
<script>
export default {
    name: 'shower-thoughts',
    inject: ['$http'],
    data() {
        return {
            alignments: ['left', 'right', 'center'],
            reddit: {
                after: '',
                expires: 0,
                token: null,
            },
            thoughts: {},
            thoughtQueue: {},
        }
    },
    created() {
        this.thoughtInterval = setInterval(() => {
        	this.queueThought()
        	this.processThoughts()
        }, 1000)
    },
    mounted() {},
    beforeUnmount() {
        clearInterval(this.thoughtInterval)
    },
    computed: {},
    methods: {
        queueThought: function() {
            if (Math.random() < 0.5 - Object.keys(this.thoughtQueue).length * 0.1) {
            	const thoughtKeys = Object.keys(this.thoughts)
                if (thoughtKeys.length < 5 && !this.fetchingThoughts) {
                    this.getThoughts()
                }

                if (thoughtKeys.length === 0) {
                    return
                }
                // Random thought selection
                var key = thoughtKeys[Math.random() * thoughtKeys.length << 0]
                var temp = this.thoughts[key]
                temp.id = key
                if (!temp.url) temp.url = 'https://www.reddit.com/r/Showerthoughts'
                // Generate style
                var width = Math.floor(Math.random() * 60 + 20)
                var rows = Math.ceil(Math.random() + Math.random() + Math.random())
                var fontSize = Math.floor(Math.max(1, Math.min(7, width * Math.max(1.25, rows) / temp.title.length / 0.65)) * 100) / 100
                var height = Math.floor(fontSize * rows * 2.6 * 100) / 100
                var left = Math.floor(Math.random() * (100 - width))
                var top = Math.floor(Math.random() * (100 - height - 10))
                var lineHeight = Math.floor(fontSize * (Math.random() * 0.6 + 1.2) * 100) / 100
                temp.raw = {
                    top: top,
                    left: left,
                    height: height,
                    width: width,
                }
                temp.style = {
                    'width': width + '%',
                    'left': left + '%',
                    'top': top + '%',
                    'font-size': fontSize + 'vw',
                    'line-height': lineHeight + 'vw',
                    'transition': 'opacity ' + (Math.floor((Math.random() * 2 + 2) * 100) / 100) + 's ease',
                    'text-align': this.alignments[Math.floor(Math.random() * this.alignments.length)]
                }
                temp.timer = Math.random() * 4 + 6
                temp.active = false
                this.thoughtQueue[key] = temp
                delete this.thoughts[key]
            }
        },
        activateThought: function(thought) {
            var status = true
            // Setting to be rendered element properties
            var top = thought.raw.top
            var bottom = top + thought.raw.height
            var left = thought.raw.left
            var right = left + thought.raw.width
            var area = (right - left) * (bottom - top)
            // Comparing against rendered elements
            Object.values(this.thoughtQueue).forEach(existingThought => {
                if (existingThought.active) {
                    // Setting rendered element properties
                    var elemTop = existingThought.raw.top
                    var elemBottom = elemTop + existingThought.raw.height
                    var elemLeft = existingThought.raw.left
                    var elemRight = elemLeft + existingThought.raw.width
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
            })
            thought.active = status
        },
        processThoughts: function() {
            Object.values(this.thoughtQueue).forEach(thought => {
                if (thought.active) {
                    if (thought.timer < 0) {
                        delete this.thoughtQueue[thought.id]
                    }
                    thought.timer--
                } else {
                    this.activateThought(thought)
                }
            })
        },
        getThoughts: function() {
            if (Date.now() > this.reddit.expires && !this.fetchingToken) {
                this.getToken()
                return setTimeout(this.getThoughts, 500)
            }

            this.fetchingThoughts = true
            const url = 'https://oauth.reddit.com/r/showerthoughts/hot?limit=100&after=' + this.reddit.after
            this.$http.get(url, {
                headers: {
                    Authorization: this.reddit.token
                }
            }).then(response => {
                response.data.data.children.forEach(thought => {
                    this.thoughts[thought.data.id] = {
                        title: thought.data.title,
                        url: thought.data.url
                    }
                })
                this.fetchingThoughts = false
            }).catch(error => {
                this.fetchingThoughts = false
                console.log(error)
            })
        },
        getToken: function() {
            this.fetchingToken = true
            var data = new URLSearchParams()
            data.append('grant_type', 'https://oauth.reddit.com/grants/installed_client')
            data.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE')

            this.$http.post('https://www.reddit.com/api/v1/access_token', data, {
                auth: {
                    username: 'TOF_jt6LhZBi1w',
                    password: '',
                }
            }).then(response => {
                this.reddit.after = response.after
                this.reddit.token = 'Bearer ' + response.data.access_token
                this.reddit.expires = Date.now() + response.data.expires_in
                this.fetchingToken = false
            }).catch(error => {
                this.fetchingToken = false
                console.log(error)
            })
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#shower-thoughts {
    color: white;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://lh3.googleusercontent.com/PRZt9UFlJ3EVyk1S-kC7gwbBHEkG06sjG2aVlCiabI_hNqncSI4fnHLFcaAFBoJHceoB6hZwQZYOD8kyHqxWBNf3Zkuk-qf8q6Kv6zgNwsBQouo-1xlKS5BT6uN-jBEB9K3ARzktZNTeRGqBJwzk8OikCdlk2qAm0jSbKSwXw_4zmMqGQQG-GKw1WDDmXmF7gJ4aCbjBJ4_WQqjssh66jQoZ6hga0kyAul4eF_I3oCRZFOeQDs3YtPvvKEvEmgPO374VcwBl_AIzkyTZTUVVZAB8_AHu8uJ8pYsENSRNSeBuv8Pea_d11wI3ySZtwBx7n_jh7r7B6VqfknPJhWrIynpKjtvvivaoSxnJXiCFxm99cuSe_7Wr8sNZ3qRHjCs8GPW81POCcEpRpkWT2Tf86AXaPwTfolSPAxspLtxwMg4RYM412lrUkQwafsO9M5jpewanID-wfxFwUgidEMx_oXap4rqb5RuK-bHkdgxaBDB_MLyF1TCog2BSany4Q9q2QT0DaQ307L2x_J4uc2X8H2OaU8esEOiFRhJN3rHYi6xh54PLcjipIJQXHoDnIiS9A1c8EjVBekjBqr9GsGBlfbRAUN_hMkWmEs80yBt368Lalz5W_uPHE9A3AE4v5bfLIB0HSXjewlFuUii3UEg4NwCQRYr6WgqTT8c=w1980-h1320-no?.jpg');
    overflow-y: hidden;
}

.thought-bubble {
    position: absolute;
    overflow: hidden;
    margin: 0px 0px;
    cursor: pointer;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>