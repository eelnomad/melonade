<!-- PhotoThumb.vue
     Thumbnail for photos.-->
<template>
    <div id="photo-thumb">
        <img :src="url">
    </div>
</template>
<script>
export default {
    name: 'PhotoThumb',
    props: ['src'],
    data() {
        return {
            url: null
        }
    },
    created() {
        this.preloadImage(this.src + '=w400-h400-no?.jpg')
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
#photo-thumb {
    border-radius: 20px;
    overflow: hidden;
    transition: all .3s ease;
    box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.3);
        transform: scale(1.01);
    &:hover {
        box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.5);
        background-color: transparent;
        transform: scale(1.02);
    }
}

img {
    width: 100%;
    height: 100%;
    filter: grayscale(80%);
    object-fit: cover;
    transition: all .3s linear;
    transform: scale(1.01);

    &:hover {
        filter: grayscale(0%);
    }

    &::before {
        content: '';
        background-color: gainsboro;
        position: absolute;
        height: 100%;
        width: 100%;
    }

    &::after {
        content: '';
        position: absolute;
        top: -110%;
        left: -210%;
        height: 150%;
        width: 200%;
        background: linear-gradient(to right,
            rgba(255, 255, 255, 0.13) 0%,
            rgba(255, 255, 255, 0.13) 77%,
            rgba(255, 255, 255, 0.5) 92%,
            rgba(255, 255, 255, 0.0) 100%);
        transform: rotate(30deg);
        animation: shine 9s ease-in-out infinite;
    }
}

@keyframes shine {
    10% {
        opacity: 1;
        top: 30%;
        left: 130%;
        transition-property: left, top, opacity;
        transition-duration: 0.7s, 0.7s, 0.15s;
        transition-timing-function: ease;
    }

    100% {
        opacity: 0;
        top: 30%;
        left: 130%;
        transition-property: left, top, opacity;
    }
}
</style>