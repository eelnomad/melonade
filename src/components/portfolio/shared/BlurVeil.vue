<template>
    <div class="blur-veil" :class="`blur-veil--${edge}`" aria-hidden="true"></div>
</template>

<script setup>
defineProps({
    // Viewport edge the veil pins to: 'top' (behind the nav) or 'bottom'
    // (behind the footer).
    edge: { type: String, default: 'top' },
})
</script>

<style lang="scss" scoped>
// One masked backdrop-filter behind a fixed bar. The mask holds at full alpha
// across the bar and then ramps to zero over the tail, so the blurred backdrop
// dissolves back into the sharp one instead of ending on a hard edge.
//
// This used to be four stacked layers at 16/8/4/2px, on the theory that a
// progressive radius needs progressive elements. It doesn't work: each layer
// blurs what the one under it already painted, so across the bar the radii
// compound to ~18px and flatten the clock canvas into solid dark. CSS has no
// way to vary blur radius within one element, so a single layer plus an alpha
// ramp is the closest available thing — and it cannot compound.
//
// Blur only: no tint layer, by design. The veil reads as clear frosted glass —
// what shows through is the page behind it, softened, never darkened. If a bar
// needs more contrast, raise --veil-blur; do not add a background gradient.
//
// --veil-hold is the stretch that stays fully blurred and --veil-tail the ramp
// after it. Both are lengths derived from the chrome metrics in portfolio.scss
// rather than percentages of the veil, so the hold always covers its bar plus
// that edge's safe-area inset — nothing here has to be re-derived when a bar
// height changes or a notched phone reports a different inset.
//
// This veil covers the layout viewport and nothing more, and cannot be made to
// cover more. Mobile Safari's viewport is shorter than the screen (an iPhone 17
// sim reports innerHeight 754 against an 874pt screen, with every
// env(safe-area-inset-*) at 0px) and it paints scrolled content outside that
// viewport, behind its own chrome. No blur reaches there: position: fixed is
// clipped out of the strip, and so is anything carrying a backdrop-filter even
// when it is sticky. Extending this element past the edge does nothing — that
// was tried, at 120px, and changed not one pixel. The strip can only be
// covered, never blurred.
.blur-veil {
    --veil-mask: linear-gradient(var(--veil-dir),
        rgb(0 0 0 / 1) 0 var(--veil-hold),
        rgb(0 0 0 / 0.85) calc(var(--veil-hold) + var(--veil-tail) * 0.25),
        rgb(0 0 0 / 0.55) calc(var(--veil-hold) + var(--veil-tail) * 0.5),
        rgb(0 0 0 / 0.22) calc(var(--veil-hold) + var(--veil-tail) * 0.75),
        rgb(0 0 0 / 0) 100%);

    position: fixed;
    left: 0;
    right: 0;
    height: var(--veil-h);
    z-index: 9;
    pointer-events: none;

    // Safari still ships only the prefixed form of both of these.
    -webkit-backdrop-filter: blur(var(--veil-blur));
    backdrop-filter: blur(var(--veil-blur));
    -webkit-mask-image: var(--veil-mask);
    mask-image: var(--veil-mask);
}

.blur-veil--top {
    top: 0;
    --veil-dir: to bottom;
    --veil-h: var(--nav-veil-h);
    --veil-blur: 2px;
    // The nav box, plus any status-bar strip the nav sits below.
    --veil-hold: calc(var(--nav-h) + var(--safe-top));
}

.blur-veil--bottom {
    bottom: 0;
    --veil-dir: to top;
    --veil-h: var(--footer-veil-h);
    --veil-blur: 2px;
    // The footer box, plus any home-indicator strip below it.
    --veil-hold: calc(var(--footer-h) + var(--safe-bottom));
}
</style>
