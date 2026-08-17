<template>
    <!-- The label names the destination, not the current state: a screen reader
         reaches this as an action, and "dark theme" alone would not say which
         way pressing it goes. -->
    <button
        type="button"
        class="theme-toggle"
        :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
        @click="toggleTheme"
    >
        <!-- Sun shows in dark mode, moon in light: each is the theme the click
             would take you to, matching the label. Both are stroked and take
             their paint from the button via currentColor. -->
        <svg
            v-if="theme === 'dark'"
            class="theme-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            aria-hidden="true"
            focusable="false"
        >
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.4v2.6M12 19v2.6M4.2 12H1.6M22.4 12h-2.6M6.5 6.5 4.6 4.6M19.4 19.4l-1.9-1.9M17.5 6.5l1.9-1.9M4.6 19.4l1.9-1.9" />
        </svg>

        <svg
            v-else
            class="theme-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M20.5 14.6A8.8 8.8 0 0 1 9.4 3.5a8.8 8.8 0 1 0 11.1 11.1Z" />
        </svg>
    </button>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<style lang="scss" scoped>
// Same box as PortfolioFooter's .social marks — a 16px glyph centered in a 40px
// pointer target — so the two sit on one optical line and --footer-h still holds.
// Unlike those, this is a <button>, so it has to shed the UA chrome first;
// nothing in this codebase resets buttons. It needs no color re-declaration
// though: the global `.portfolio a` accent rule does not match a button.
.theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    border-radius: 4px;
    background: none;
    font: inherit;
    color: var(--dim);
    cursor: pointer;
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

.theme-icon {
    display: block;
}
</style>
