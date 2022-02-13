<!-- PhotoModal.vue
     Modal for photos.-->
<template>
    <div id="photoModal" class="f-row f-center">
        <img v-show="url" :src="url">
    </div>
</template>
<script>
export default {
    name: 'PhotoModal',
    props: ['src'],
    data() {
        return {
            ready: false,
            url: null,
        }
    },
    created() {
        this.preloadImage(this.src + '=w1500-h1500-no?.jpg')
    },
    beforeDestroy() {},
    destroyed() {},
    methods: {
        preloadImage(url) {
            const image = new Image()
            image.onload = () => {
                this.url = image.src
            }
            image.src = url
        }
    },
    computed: {},
    components: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#photoModal {
    z-index: 100;
    height: 100%;
    width: 100%;

    position: fixed;
    left: 0;
    top: 0;

    background-color: rgba(0,0,0,.9);
}

img {
    height: 90%;
    width: 100%;
    object-fit: contain;
}
</style>