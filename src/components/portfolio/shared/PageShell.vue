<template>
    <section class="page-shell" :class="{ 'page-shell--centered': centered }">
        <div class="shell-content" :style="{ maxWidth }">
            <span class="scrim-blob scrim-blob--a" aria-hidden="true"></span>
            <span class="scrim-blob scrim-blob--b" aria-hidden="true"></span>
            <slot />
        </div>
    </section>
</template>

<script setup>
defineProps({
    // Width of the content column. Pass 'none' for pages whose children set their own.
    maxWidth: { type: String, default: '760px' },
    // Landing's geometry: full-height, centered both ways, own fade choreography.
    centered: { type: Boolean, default: false },
})
</script>

<style lang="scss" scoped>
// The nav and footer are both pinned, so the padding clears them: 132px for the
// nav band, and the footer's own height on top of the 100px tail so the last
// line of a page can scroll clear of the bar. Both bars grew by their safe-area
// inset under viewport-fit=cover, so these clearances carry the same insets.
.page-shell {
    position: relative;
    box-sizing: border-box;
    padding: calc(132px + var(--safe-top))
             max(clamp(20px, 6vw, 56px), var(--safe-right))
             calc(100px + var(--footer-h) + var(--safe-bottom))
             max(clamp(20px, 6vw, 56px), var(--safe-left));
    animation: fadeUp 0.35s ease both;
}

// z-index makes this a stacking context, which keeps the ::before vignette
// behind the copy but still above the clock canvas.
.shell-content {
    position: relative;
    z-index: 1;
    width: 100%;
    margin: 0 auto;

    // Pushes the canvas back behind the copy — darkening it in the dark theme,
    // washing it out in the light one, since the ink is the ground's own.
    // Anchored to the content box rather than to .page-shell, so it tracks the
    // text instead of the page padding; the negative inset puts the fade just
    // outside the text on every page. --scrim-peak is a token because a pale
    // wash hides less than a dark one and the light theme has to push harder.
    //
    // Flat background-color under a mask, not a radial-gradient of the ink, and
    // the same for the blobs below. Both forms paint identically, but a
    // background-image cannot be transitioned, so on a theme swap the scrim
    // would snap to the new ink while the ground behind it was still fading —
    // a bright ellipse blooming in the middle of a dark page, or the reverse.
    // background-color does transition, which puts the whole mass on one clock.
    // The mask carries the falloff the gradient stops used to: 0.77 at the
    // center against 1 at 50% is the old 0.40-against-0.52 ratio, and the light
    // theme's 0.55-against-0.70 is the same ratio, so one mask serves both.
    &::before {
        content: '';
        position: absolute;
        inset: -8% -10%;
        z-index: -1;
        pointer-events: none;
        background-color: rgb(from var(--bg) r g b / var(--scrim-peak));
        --scrim-mask: radial-gradient(ellipse at center,
            rgb(0 0 0 / 0.77) 0%,
            rgb(0 0 0 / 1) 50%,
            rgb(0 0 0 / 0) 78%);
        -webkit-mask-image: var(--scrim-mask);
        mask-image: var(--scrim-mask);
    }
}

// Two soft blobs of the same ink drifting under the base scrim, so the outer
// edge of the scrim mass slowly morphs instead of sitting still over the moving
// clock field. The base ::before above is deliberately the part that does NOT
// move: it alone carries the contrast under the copy, so no phase of the drift
// can thin the scrim out where the text is.
//
// They come in pairs because one element can only translate and scale rigidly,
// which reads as a drifting cloud; it takes two overlapping blobs on loops that
// never resync for the union boundary to actually change shape.
.scrim-blob {
    position: absolute;
    // Wide enough that the drift stays well outside the text box.
    inset: -34% -28%;
    z-index: -1;
    pointer-events: none;
    // Masked flat fill for the same reason as the base scrim above: so the ink
    // cross-fades with the ground instead of snapping ahead of it. The mask is
    // static paint and rides along with translate/scale, so the two animations
    // below stay on the compositor.
    background-color: rgb(from var(--bg) r g b / var(--scrim-blob));
    -webkit-mask-image: var(--scrim-mask);
    mask-image: var(--scrim-mask);
}

// translate and scale as individual properties, not the transform shorthand:
// that is what lets one element run two animations of different lengths at once
// without the later one overwriting the earlier. Both are compositor-only.
.scrim-blob--a {
    --scrim-mask: radial-gradient(ellipse 62% 58% at 35% 40%,
        rgb(0 0 0 / 1) 0%,
        rgb(0 0 0 / 0) 70%);
    animation: blobDriftA 29s ease-in-out infinite alternate,
               blobBreatheA 41s ease-in-out infinite alternate;
}

// Negative delays so the pair never starts in phase.
.scrim-blob--b {
    --scrim-mask: radial-gradient(ellipse 58% 62% at 68% 62%,
        rgb(0 0 0 / 1) 0%,
        rgb(0 0 0 / 0) 70%);
    animation: blobDriftB 34s ease-in-out -13s infinite alternate,
               blobBreatheB 47s ease-in-out -21s infinite alternate;
}

@keyframes blobDriftA {
    from { translate: -4% -3%; }
    to   { translate: 4% 3%; }
}

@keyframes blobDriftB {
    from { translate: 3% 4%; }
    to   { translate: -3% -4%; }
}

@keyframes blobBreatheA {
    from { scale: 0.94; }
    to   { scale: 1.06; }
}

@keyframes blobBreatheB {
    from { scale: 1.06; }
    to   { scale: 0.94; }
}

.page-shell--centered {
    // Exactly one viewport tall, so Landing never scrolls. The padding insets
    // the content box past both pinned bars, which leaves justify-content
    // centering the copy in the band between them.
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    // 100dvh now spans the full screen, safe areas included, so these clearances
    // carry the insets too or the copy centers off the band between the bars.
    padding: calc(120px + var(--safe-top))
             max(clamp(20px, 6vw, 56px), var(--safe-right))
             calc(90px + var(--footer-h) + var(--safe-bottom))
             max(clamp(20px, 6vw, 56px), var(--safe-left));
    animation: none;

    .shell-content {
        // Shrink to the widest child (the quote's own max-width) instead of
        // spanning the shell, so the vignette hugs the text.
        width: fit-content;
    }

    // That fit-content box is narrow, so the percentage insets above would
    // resolve to a tight halo here. Widen them so the drift reads at viewport
    // scale on Landing rather than as a ring around the quote.
    .scrim-blob {
        inset: -70% -50%;
    }
}
</style>
