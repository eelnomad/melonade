<!-- ShowerThoughts.vue
		 This is the page that shows Shower Thoughts.-->
<template>
    <div>
        <div id="shower-thoughts"
        class="main f-col f-center f-grow">
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
        <div 
            class="article f-row pT-xxl pB-xl"
        >
            <span class="f-grow"></span>
            <div class="article-content">
                <div class="article-timestamp">2023-11-15</div>
                <div class="article-title pB-l">
                Shower Thoughts! A relaxing way to sit back and enjoy the entropy that is the human mind.
                </div>
                <br/>
                <div class="section-header">*Note: Due to API changes, this page no longer interacts with Reddit's API.</div>
                <br/>
                <div class="section-body">In the fast-paced world of the internet, moments of serenity are often hard to come by. Amidst the hustle and bustle of online interactions, there exists a unique corner on the web where users can unwind and let their thoughts flow freely—the realm of Shower Thoughts. Shower thoughts are those fleeting, often profound ideas that occur to us when we least expect them. Inspired by this concept, I embarked on a creative journey to build a tranquil online space dedicated to showcasing these musings. In this article, I will share my experience of designing and developing a web page that elegantly displays shower thoughts fetched from Reddit's API, complete with a soothing breathing effect. Join me as I delve into the details of this implementation.</div>
                <br/>
                <br/>
                <div class="section-header">Exploring Reddit's API:</div>
                <br/>
                <div class="section-body">To bring my vision to life, I utilized Reddit's API, a powerful resource that taps into the collective mind of the internet. After obtaining the necessary API credentials, I set out to retrieve shower thoughts—captivating snippets of wisdom shared by Reddit users of /r/showerthoughts. Through API requests, I fetch a curated selection of these thoughts, ensuring a diverse and engaging collection for visitors to experience.</div>
                <br/>
                <br/>
                <div class="section-header">Designing the User Interface:</div>
                <br/>
                <div class="section-body">A crucial aspect of this page was crafting a visually appealing interface. I opted for a simple background image of nature and a slow paced breathing effect, focusing on readability and gentle animations. The shower thoughts were randomly presented across the viewable screen, each with a varying font size to drive home the random nature of shower thoughts. To create a calming ambiance, I incorporated a subtle breathing effect—a gentle fade-in and fade-out for each thought, reminiscent of a peaceful meditation exercise. This effect was achieved using CSS animations, providing visitors with a soothing visual experience.</div>
                <br/>
                <br/>
                <div class="section-header">Implementing the Breathing Effect:</div>
                <br/>
                <div class="section-body">The trickiest part of this page was randomizing the font size and appearance location of each thought while keeping it constrained in the initial viewable bounds. My process started with generating a random width and number of rows within some constraints for how wide and tall the thought would appear on the screen. Then, based off of those numbers and because this was meant to be a quick project, I created a generalized formula for how large the font size and element heights should be. After that, they're placed in a queue to be displayed on the screen. A process runs through the queue and any shower thoughts what won't be overlapping with any currently existing elements and begins the transition process. Each thought only lasts on the screen for a short amount of time, randomly decided by math.rand(), before they fade back out, completing the lifecycle of a thought on the page.</div>
                <br/>
                <br/>
                <div class="section-header">Conclusion:</div>
                <br/>
                <div class="section-body">Building a web page to display shower thoughts with a breathing effect proved to be a delightful and meditative endeavor. By harnessing the power of Reddit's API and combining it with creative design and animations, I created a serene online space where visitors can immerse themselves in the wisdom of the internet community. This project not only provided a platform for the expression of diverse thoughts but also served as a reminder of the beauty that emerges when technology and creativity harmonize. As the virtual page gently breathes in and out, it invites users to relax, reflect, and appreciate the profound musings that shower thoughts have to offer.</div>
            </div>
            <span class="f-grow"></span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'shower-thoughts',
    inject: ['$http'],
    data() {
        return {
            alignments: ['left', 'right', 'center'],
            isVisible: true,
            reddit: {
                after: '',
                expires: 0,
                token: null,
            },
            useReddit: false,
            thoughts: {},
            thoughtQueue: {},
            thoughtInterval: null,
            tokenBackOff: 100,
            tokenInterval: null,
        }
    },
    created() {
        // Listen for visibility change events
        document.addEventListener("visibilitychange", this.handleVisibilityChange);

        this.thoughtInterval = setInterval(() => {
            if (this.isVisible) {
                this.queueThought()
                this.processThoughts()
            }
        }, 1000)
    },
    mounted() {},
    beforeUnmount() {
        document.removeEventListener("visibilitychange", this.handleVisibilityChange)
        clearInterval(this.thoughtInterval)
        clearInterval(this.tokenInterval)
    },
    computed: {},
    methods: {
        handleVisibilityChange() {
          // Update the isVisible property based on the page visibility state
          this.isVisible = !document.hidden;
        },
        queueThought: function() {
            if (Math.random() < 0.5 - Object.keys(this.thoughtQueue).length * 0.1) {
            	const thoughtKeys = Object.keys(this.thoughts)
                if (thoughtKeys.length < 5 && !this.fetchingThoughts && this.useReddit) {
                    this.getThoughts()
                } else if (!this.useReddit && Object.keys(this.thoughtQueue) == 0) {
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
                    'transition': 'opacity ' + (Math.floor((Math.random() * 2 + 2) * 100) / 100) + 's ease-in',
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
            if (!this.useReddit) {
                this.thoughts = {
                    1: {
                        title: 'pies'
                    },
                    2: {
                        title: 'pizza'
                    },
                    3: {
                        title: 'cake'
                    },
                    4: {
                        title: "imagine if these were actual shower thoughts and not just pies, cake, or pizza"
                    }
                }
                return
            }
            this.fetchingThoughts = true

            if (Date.now() > this.reddit.expires) {
                if (!this.fetchingToken) {
                    this.getToken()
                }
                this.tokenInterval = setTimeout(this.getThoughts, this.tokenBackOff)
                return
            }

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
                this.tokenBackOff = 300
                this.fetchingToken = false
            }).catch(error => {
                this.tokenBackOff *= 2
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
    font-size: 40px;
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