<template>
    <div id="melonade" :style="theme">
        <main-nav />
        <router-view v-slot="{ Component }">
            <keep-alive>
                <transition name="fade" mode="out-in">
                    <component :is="Component" class="content" />
                </transition>
            </keep-alive>
        </router-view>
    </div>
</template>
<script>
import '@/assets/css/custom.scss'
import MainNav from '@/components/MainNav.vue'

export default {
    name: 'melonade',
    data() {
        return {}
    },
    created() {
        // if (!localStorage.getItem('melonade_device_id')) {
        //     var d = Date.now()
        //     var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        //         var r = (d + Math.random() * 16) % 16 | 0
        //         d = d / 16 | 0
        //         return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
        //     })
        //     localStorage.setItem('melonade_device_id', uuid)
        // }
    },
    components: {
        MainNav
    },
    computed: {
        theme() {
            return this.$store.getters['theme/theme']
        }
    }
}
</script>
<style lang="scss" scoped>
#melonade {
    transition: background-color 0.25s linear;
}

.content {
    min-height: 100vh;
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