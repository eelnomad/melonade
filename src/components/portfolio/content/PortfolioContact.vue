<template>
    <page-shell>
        <div class="eyebrow">03 — Contact</div>
        <h2 class="section-title">Let's talk</h2>
        <p class="intro">Open to interesting problems, collaborations, and conversations.</p>
        <div class="channels">
            <a
                v-for="channel in contactLinks"
                :key="channel.id"
                class="channel"
                :href="channel.href"
                :target="isExternal(channel.href) ? '_blank' : null"
                :rel="isExternal(channel.href) ? 'noopener' : null"
                :aria-label="channel.label"
                :title="channel.value"
            >
                <social-icon :name="channel.id" :size="22" />
            </a>
        </div>
    </page-shell>
</template>

<script setup>
import PageShell from '../shared/PageShell.vue'
import SocialIcon from '../shared/SocialIcon.vue'
import { contactLinks, isExternal } from '@/data/contactLinks'
</script>

<style lang="scss" scoped>
.section-title {
    margin-bottom: 20px;
}

.intro {
    max-width: 520px;
    margin: 0 0 52px;
    font-size: clamp(16px, 2.2vw, 19px);
    font-weight: 300;
    line-height: 1.65;
    color: var(--body);
    text-wrap: pretty;
}

// Every channel as a mark, in the row the pinned footer holds elsewhere — which
// is why the footer drops its marks on this page, keeping only the copyright.
// The negative margin pulls the first target's own padding back so its mark
// aligns with the copy's left edge.
.channels {
    display: flex;
    gap: clamp(4px, 2vw, 10px);
    margin-left: -13px;
}

// Overrides the global `.portfolio a` accent color; the box is sized to keep
// the 22px mark inside a 48px pointer target.
.channel {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
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
