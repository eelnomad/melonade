<!-- MainNav.vue
    MainNav for main page-->
<template>
    <div :style="{color: color}" class="f-col f-center" id="nav">
        <transition name="fade" mode="out-in">
            <div v-show="shown" :class="classes" class="g" id="main-nav">
                <div class="f-row m-l" id="nav-major">
                    <router-link v-for="route in majorRoutes" :to="{name : route.name}">
                        <h2 class="pH-m">{{ route.name }}</h2>
                    </router-link>
                </div>
                <router-link class="m-l" id="nav-logo" :to="{name : 'Landing'}">
                    <h1>Melonade</h1>
                </router-link>
                <div class="f-row f-center m-l" id="nav-minor">
                    <transition name="erase">
                        <button v-show="navStore.hideable" :disabled="scrolled" @click="hide" class="pR-m">
                            <v-icon id="hide-icon" name="fa-regular-eye-slash" scale="1.5" />
                        </button>
                    </transition>
                    <router-link v-for="route in minorRoutes" :to="{name : route.name}">
                        <h3 class="pH-m">{{ route.name }}</h3>
                    </router-link>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import { MAJOR_ROUTES, MINOR_ROUTES } from '@/router/routes'
import { useNavStore } from '@/stores/nav'
import { useThemeStore } from '@/stores/theme'

export default {
    name: 'MainNav',
    setup() {
        const navStore = useNavStore()
        const themeStore = useThemeStore()
        return {
            navStore,
            themeStore,
        }
    },
    data() {
        return {
            hidden: true,
            majorRoutes: MAJOR_ROUTES,
            minorRoutes: MINOR_ROUTES,
            scrolled: false,
        }
    },
    created() {
        window.addEventListener('scroll', this.checkTop)
    },
    beforeDestroy() {},
    destroyed() {
        window.removeEventListener('scroll', this.checkTop)
    },
    methods: {
        checkTop(event) {
            this.scrolled = window.scrollY !== 0
            if (this.scrolled) {
                this.hidden = false
            }
        },
        hide() {
            this.hidden = true
        }
    },
    watch: {
        $route(to, from) {
            this.hide()
        }
    },
    computed: {
        classes() {
            return {
                'nav-scrolled': this.scrolled,
                'nav-unscrolled': !this.scrolled,
            }
        },
        color() {
            return this.scrolled ? 'black' : this.themeStore.color
        },
        shown() {
            return this.navStore.hideable ? !this.hidden : true
        }
    },
    components: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav {
    position: fixed;
    transition: all .25s ease;
    width: 100%;
    z-index: 99;
}

#main-nav {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "major logo minor";
    width: 100%;
}

#nav-logo {
    grid-area: logo;
    justify-self: center;
    align-self: center;
}

#nav-major {
    grid-area: major;
    justify-self: start;
    align-self: center;
}

#nav-minor {
    grid-area: minor;
    justify-self: end;
    align-self: center;
}

#hide-icon {
    color: inherit;
}

.nav-scrolled {
    background-color: whitesmoke;
    border-bottom: gainsboro 1px solid;
    box-shadow: 0 4px 8px rgba(220, 220, 220, 0.3);
}

.nav-unscrolled {
    background-color: transparent;
    border-bottom: transparent 1px solid;
    box-shadow: 0 4px 8px rgba(220, 220, 220, 0.0);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.erase-enter-active,
.erase-leave-active {
    transition: all 0.5s ease;
}

.erase-enter,
.erase-leave-to {
    opacity: 0;
    transform: translate(100%, 0);
    flex-grow: 0 !important;
}

h1 {
    font-size: 1.5rem;
}

button {
    background-color: transparent;
    border: none;
    transition: all 0.5s ease;
}

button:disabled {
    color: lightgray;
}
</style>