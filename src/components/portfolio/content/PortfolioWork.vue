<template>
    <page-shell max-width="880px">
        <div class="eyebrow">01 — Professional</div>
        <h2 class="section-title">Work &amp; projects</h2>

        <template v-for="(section, i) in workSections" :key="section.id">
            <div class="rule-label" :class="{ 'rule-label--spaced': i > 0 }">{{ section.label }}</div>

            <div v-for="entry in section.entries" :key="entry.id" class="entry">
                <h3 class="entry-name">{{ entry.name }}</h3>
                <div class="entry-body">
                    <div class="entry-role">{{ entry.role }}</div>
                    <div v-if="entry.meta" class="entry-meta">{{ entry.meta }}</div>
                    <p class="entry-copy">{{ entry.description }}</p>
                    <component
                        :is="entry.to ? 'router-link' : 'a'"
                        v-if="entry.to || entry.href"
                        v-bind="linkAttrs(entry)"
                        class="entry-link"
                        :aria-label="`${linkLabel(entry)} — ${entry.name}`"
                    >{{ linkLabel(entry) }}<span class="entry-arrow" aria-hidden="true">{{ entry.to ? '→' : '↗' }}</span></component>
                </div>
            </div>
        </template>

        <div class="more">
            <span class="more-mark"></span>More to come
        </div>
    </page-shell>
</template>

<script setup>
import PageShell from '../shared/PageShell.vue'
import { workSections } from '@/data/work'

// The link line is one <component :is> rather than an <a> / <router-link> pair,
// so its label and arrow are written once. 'router-link' resolves because
// main.js registers it globally via .use(router).
//
// The two branches take disjoint attribute sets, and each has to be *absent*
// from the other rather than bound to null: RouterLink merges fallthrough attrs
// over the <a> it renders, so a null `href` from here would wipe out the one it
// resolved from `to` and emit a dead anchor.
const linkAttrs = (entry) => entry.to
    ? { to: entry.to }
    : { href: entry.href, target: '_blank', rel: 'noopener' }

// Not isExternal() from contactLinks: that helper exists to keep mailto: out of
// target="_blank", and work entries have no mail channel — the href / to split
// already carries the distinction here.
const linkLabel = (entry) => entry.linkText ?? (entry.to ? 'Read more' : 'Visit')
</script>

<style lang="scss" scoped>
.section-title {
    margin-bottom: 60px;
}

.rule-label {
    &--spaced {
        margin-top: 56px;
    }
}

// The hover wash is a pseudo-element rather than a background on .entry itself
// so it can overhang the row on both sides — a band the entry sits inside, not
// a box clamped to the first and last glyph. Everything else stays put: the
// copy keeps its alignment with the title above, and both rules keep their
// text width, so the wash is the only thing that reaches past them. Absolute
// positioning also keeps the pseudo-element out of the flex flow, where it
// would otherwise become an item and push the row's columns around.
.entry {
    // z-index makes this a stacking context, which pins the -1 wash between
    // PageShell's scrim below and this row's own copy above.
    position: relative;
    z-index: 0;
    border-bottom: 1px solid var(--rule);
    padding: 26px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px 24px;
    // Top-aligned, not baseline. Baseline alignment locks the body's first line
    // — the 11px role — to the name's baseline, which sits ~28px down inside a
    // 30px serif line box; that offset pushed the whole body past the row's top
    // edge and left the role floating mid-row. Starting both columns at the
    // same edge is what makes the role read as the heading of the block below.
    align-items: center;

    &::before {
        content: '';
        position: absolute;
        // Bleeds into the shell's side padding, which bottoms out at 20px, so
        // the overhang never reaches the viewport edge on a phone. Written
        // low-to-high because clamp() still wants min <= max.
        inset: 0 clamp(-24px, -2vw, -12px);
        z-index: -1;
        // The tint is painted as a gradient rather than a flat fill so the band
        // has no vertical edge to catch — it ramps up from nothing over the
        // overhang and the first stretch of copy, holds across the middle, and
        // ramps back down. Long ramps on purpose: at --hover-wash's couple of
        // percent, a short one still reads as a line. Doing it in the background
        // beats masking the fill, which would want a -webkit- twin for Safari.
        background: linear-gradient(
            to right,
            transparent,
            var(--hover-wash) clamp(48px, 12%, 120px),
            var(--hover-wash) calc(100% - clamp(48px, 12%, 120px)),
            transparent
        );
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    &:hover::before {
        opacity: 1;
    }
}

.entry-name {
    flex: 1 1 200px;
    font-family: var(--serif);
    font-weight: 400;
    font-size: 30px;
    // Instrument Serif's normal leading is ~1.28em, some 20px of it empty space
    // above the glyphs — at the top of a flex row that reads as a gap under the
    // rule. 1.1 trims it and still leaves a wrapped two-line name room.
    // .section-title in portfolio.scss does the same thing with 1.
    line-height: 1.1;
    margin: 0;
}

.entry-body {
    flex: 2 1 320px;
}

.entry-role {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 8px;
}

// Year / stack / status, sitting between the role and the copy.
.entry-meta {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.08em;
    color: var(--dim);
    margin-bottom: 8px;
}

.entry-copy {
    margin: 0;
    color: var(--body);
    font-weight: 300;
    line-height: 1.6;
}

// Overrides the global `.portfolio a` accent so the line reads as a quiet
// affordance until hovered — the same muted → fg treatment as the nav links.
.entry-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 14px;
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
    transition: color 0.2s ease;

    &:hover,
    &:focus-visible {
        color: var(--fg);
    }

    &:focus-visible {
        outline: 1px solid var(--accent);
        outline-offset: 3px;
    }
}

.entry-arrow {
    transition: translate 0.2s ease;

    .entry-link:hover & {
        translate: 2px -2px;
    }
}

.more {
    padding: 26px 0;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--dim);
    font-family: var(--mono);
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.06em;
}

.more-mark {
    width: 8px;
    height: 8px;
    border: 1px dashed var(--rule-soft);
}
</style>
