<template>
    <div class="portfolio">
        <clock-field />
        <portfolio-nav />
        <main class="portfolio-main">
            <router-view />
        </main>
        <portfolio-footer />
    </div>
</template>

<script setup>
import { onUnmounted } from 'vue'

import '@/assets/css/portfolio.scss'
import { initTheme } from '@/composables/useTheme'
import ClockField from './shared/ClockField.vue'
import PortfolioNav from './shared/PortfolioNav.vue'
import PortfolioFooter from './shared/PortfolioFooter.vue'

// The layout is the whole app's lifetime, so this is the one place the system
// preference listener gets attached.
const teardownTheme = initTheme()
onUnmounted(teardownTheme)
</script>

<style lang="scss" scoped>
.portfolio-main { position: relative; z-index: 5; }
</style>
