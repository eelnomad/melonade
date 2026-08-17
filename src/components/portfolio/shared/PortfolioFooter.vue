<template>
    <blur-veil edge="bottom" />

    <footer class="portfolio-footer">
        <theme-toggle />

        <div v-if="showSocial" class="social-row">
            <a
                v-for="link in socialLinks"
                :key="link.id"
                class="social"
                :href="link.href"
                target="_blank"
                rel="noopener"
                :aria-label="link.label"
            >
                <social-icon :name="link.id" :size="16" />
            </a>
        </div>

        <small class="copyright">© {{ year }}</small>
    </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { socialLinks } from '@/data/contactLinks'
import BlurVeil from './BlurVeil.vue'
import SocialIcon from './SocialIcon.vue'
import ThemeToggle from './ThemeToggle.vue'

// The bar renders on every route; only the marks are conditional. Contact lays
// the same social marks out inline, below its channel rows, so repeating them
// here would be the second copy on that page — the copyright still shows.
const route = useRoute()
const showSocial = computed(() => route.name !== 'Contact')

const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
// Pinned to the viewport like the nav, so it stays visible while the page
// scrolls underneath. Its own blur veil (z-index 9) reads the content passing
// behind it; PageShell pads by --footer-h so nothing ends up trapped under it.
.portfolio-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    box-sizing: border-box;
    // --footer-h is the bar itself; the home-indicator strip sits below it.
    min-height: calc(var(--footer-h) + var(--safe-bottom));
    // Three columns: the theme toggle, the marks, and the copyright. The outer
    // two are what keep the marks optically centered while the mark on the right
    // stays in flow, so neither can overlap the other on a narrow viewport —
    // which is why column 1 is 1fr and holds the toggle rather than sizing to it.
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 10px
             max(clamp(20px, 6vw, 56px), var(--safe-right))
             calc(10px + var(--safe-bottom))
             max(clamp(20px, 6vw, 56px), var(--safe-left));
}

// Unconditional, like the copyright: the toggle is on every route, including
// Contact, where the marks drop out. Its own box is sized in ThemeToggle.vue.
.theme-toggle {
    grid-column: 1;
    justify-self: start;
}

// The gap lives here rather than on the grid, where it would space the three
// columns instead of the marks.
.social-row {
    grid-column: 2;
    display: flex;
    align-items: center;
    gap: clamp(6px, 2vw, 12px);
}

// Same dim mono register as .rule-label / .eyebrow. <small> needs the explicit
// size or the UA default shrinks it again.
.copyright {
    grid-column: 3;
    justify-self: end;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--dim);
}

// Overrides the global `.portfolio a` accent color; the box is sized to keep
// the 16px mark inside a 40px pointer target.
.social {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    color: var(--dim);
    transition: color 0.2s ease;

    &:hover,
    &:focus-visible {
        color: var(--fg);
    }

    &:focus-visible {
        outline: 1px solid var(--accent);
        outline-offset: 2px;
    }
}
</style>
