<!-- PhotoGallery.vue
     This is the landing page of the photo gallery. There should be thumbnails to photos and a hidden modal that appears on selecting a photo.-->
<template>
    <div id="photo-gallery" class="pT-xxl pB-xxl">
        <photo-thumb v-for="(photo, index) in photoData" :key="photo" :src="photo" class="photo" @click="navigate(index)" />
        <transition name="fade" mode="out-in">
            <photo-modal v-if="selectedImage" :src="selectedImage" @click="navigate(-1)" />
        </transition>
    </div>
</template>
<script>
import photoData from '@/assets/data/photodata.json'

import PhotoModal from './PhotoModal.vue'
import PhotoThumb from './PhotoThumb.vue'

export default {
    name: 'photo-gallery',
    data() {
        return {
            photoData: photoData
        }
    },
    created() {
        this.$store.commit('nav/setNavDim', false)
        this.$store.commit('theme/setTheme', this.$store.getters['theme/themes'].WHITE)
    },
    beforeDestroy() {},
    destroyed() {},
    watch: {},
    methods: {
        navigate(index) {
            if (index >= 0) {
                this.$router.push({ name: this.$route.name, params: { id: index, internal: true } })
            } else if (this.$route.params.internal) {
                this.$router.go(-1)
            } else {
                this.$router.replace({ name: this.$route.name })
            }
        }
    },
    computed: {
        selectedImage() {
            if (this.$route.params.id === null) {
                return null
            } else if (this.$route.params.id > photoData.length - 1 || this.$route.params.id < 0 || isNaN(this.$route.params.id)) {
                this.$router.replace({ name: this.$route.name })
                return null
            }
            return photoData[this.$route.params.id]
        }
    },
    components: {
        PhotoModal,
        PhotoThumb
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#photo-gallery {
    background-color: whitesmoke;
    display: grid;
    row-gap: 1.5rem;
    column-gap: 1rem;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: 10vw;
    grid-auto-flow: column;
}

$gridMapping: (1: 3,
2: 5,
3: 1,
4: 7,
5: 4,
6: 2,
7: 6);

.photo {
    grid-row-end: span 2;
    // border: white 1px solid;
}

@each $i,
$c in $gridMapping {
    .photo:nth-child(7n + #{$i}) {
        grid-column: $c + 1;
    }

    @if $i>4 {
        .photo:nth-child(#{$i}) {
            grid-row-start: 2;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>