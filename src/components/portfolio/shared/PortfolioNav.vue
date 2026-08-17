<template>
    <blur-veil edge="top" />

    <nav class="portfolio-nav">
        <router-link class="nav-link" :to="{ name: 'Landing' }">Home</router-link>
        <div class="nav-links">
            <router-link class="nav-link" :to="{ name: 'Work' }">Work</router-link>
            <router-link class="nav-link" :to="{ name: 'About' }">About</router-link>
            <router-link class="nav-link" :to="{ name: 'Contact' }">Contact</router-link>
        </div>
    </nav>
</template>

<script setup>
import BlurVeil from './BlurVeil.vue'
</script>

<style lang="scss" scoped>
.portfolio-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px 20px;
    // The box reaches the screen edge so its veil can too; the padding is what
    // keeps the links out of the status bar and, in landscape, the notch.
    padding: calc(20px + var(--safe-top))
             max(clamp(20px, 5vw, 56px), var(--safe-right))
             20px
             max(clamp(20px, 5vw, 56px), var(--safe-left));
}

.nav-links {
    display: flex;
    align-items: center;
    gap: clamp(16px, 3vw, 34px);
}

.nav-link {
    font-family: var(--mono);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    line-height: 1;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover,
    &.router-link-exact-active {
        color: var(--fg);
    }
}
</style>
