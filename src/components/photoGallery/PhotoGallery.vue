<!-- PhotoGallery.vue
     This is the landing page of the photo gallery. There should be thumbnails to photos and a hidden modal that appears on selecting a photo.-->
<template>
    <div
        id="photo-gallery"
        class="pT-xxl pB-xxl"
    >
        <Image
            v-for="(photo, index) in photoData"
            :key="photo"
            :preview="thumbnailURL(photo)"
            :src="imageURL(photo)"
            class="photo"
        />
    </div>
</template>
<script>
import photoData from '@/assets/data/photodata.json'
import Image from '@/utils/Image.vue'

export default {
    name: 'photo-gallery',
    data() {
        return {
            photoData: photoData
        }
    },
    beforeCreate() {},
    beforeDestroy() {},
    destroyed() {},
    watch: {},
    methods: {
        thumbnailURL(base) {
            return base + '=w400-h400-no?.jpg'
        },
        imageURL(base) {
            return base + '=w1500-h1500-no?.jpg'
        },
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
        Image
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style
    lang="scss"
    scoped
>
#photo-gallery {
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
</style>