<!-- ImageThumb.vue
     Thumbnail for images.-->
<template>
    <div
        @click="openModal()"
        id="image"
    >
        <img
            :src="thumbnailReady ? thumbnailURL : null"
        >
        <Teleport to="body">
            <Transition
                mode="out-in"
                name="fade"
            >
                <div
                    v-if="modalFlag"
                    @click="closeModal()"
                    class="f-row f-center"
                    id="image-modal"
                >
                    <font-awesome-icon
                        v-if="!imageReady"
                        icon="ellipsis"
                        id="imageModalLoading"
                        size="5x"
                    />
                    <Transition
                        mode="out-in"
                        name="fade"
                    >
                        <img
                            v-show="imageReady"
                            :src="imageURL"
                        >
                    </Transition>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>
<script>
export default {
    name: 'Image',
    props: {
        src: String,
        preview: String,
        show: Boolean,
    },
    data() {
        return {
            thumbnailURL: this.preview || this.src,
            thumbnailReady: null,
            imageURL: this.src,
            imageReady: null,
            modalFlag: false,
        }
    },
    created() {
        if (this.show) {
            this.openModal()
        }
        this.preloadImage(this.thumbnailURL, () => {
            this.thumbnailReady = true
        })
    },
    beforeDestroy() {},
    destroyed() {},
    methods: {
        closeModal() {
            this.modalFlag = false
        },
        openModal() {
            if (!this.imageURL) {
                return
            }
            this.modalFlag = true
            this.preloadImage(this.imageURL, () => {
                this.imageReady = true
            })
        },
        preloadImage(imageURL, fn) {
            const image = new Image()
            image.onload = fn
            image.src = imageURL
        }
    },
    computed: {},
    components: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style
    lang="scss"
    scoped
>
#image {
    border-radius: 20px;
    overflow: hidden;

    Transition: all .3s ease;
    box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.3);
    transform: translateZ(0) scale(1.001, 1.001);

    &:hover {
        box-shadow: 0 2px 12px 0px rgba(0, 0, 0, 0.5);
        background-color: transparent;
        transform: translateZ(0) scale(1.02);
    }

    & > img {
        width: 101%;
        height: 101%;
        top: -1px;
        left: -1px;
        position: absolute;
        object-fit: cover;

        Transition: all .3s linear;
        filter: grayscale(80%);

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
}

#image-modal {
    z-index: 100;
    height: 100vh;
    width: 100vw;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    background-color: rgba(0,0,0,.9);

    & > img {
        height: 90%;
        width: 100%;
        object-fit: contain;
    }
}

#imageModalLoading {
    color: darkgray;
}

@keyframes shine {
    10% {
        opacity: 1;
        top: 30%;
        left: 130%;
        Transition-property: left, top, opacity;
        Transition-duration: 0.7s, 0.7s, 0.15s;
        Transition-timing-function: ease;
    }

    100% {
        opacity: 0;
        top: 30%;
        left: 130%;
        Transition-property: left, top, opacity;
    }
}

.fade-enter-active,
.fade-leave-active {
    Transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>