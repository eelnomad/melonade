<template>
    <page-shell centered max-width="none">
        <div class="kicker">
            <span class="kicker-rule"></span>A quiet rule
        </div>

        <blockquote class="quote">Bad data is a loan. The interest is your time.</blockquote>

        <div class="signature">
            <div class="name">Damon Lee <span class="role">— Data &amp; Full-Stack</span></div>
            <p class="tagline">Building reliable data platforms and the products that sit on top of them.</p>
        </div>
    </page-shell>
</template>

<script setup>
import PageShell from '../shared/PageShell.vue'
</script>

<style lang="scss" scoped>
// The shell's fit-content box collapses to the widest child, so at narrow
// widths (where the signature line wraps against the viewport) it spans the
// full column and these two — the flex row and the capped quote — have to
// center themselves rather than inherit it from the box.
.kicker {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 34px;
    animation: fadeUp 0.4s ease both;
}

.kicker-rule {
    width: 20px;
    height: 1px;
    background: var(--accent);
    display: inline-block;
}

.quote {
    margin: 0 auto;
    max-width: 15ch;
    font-family: var(--serif);
    font-weight: 400;
    font-size: clamp(38px, 6.4vw, 84px);
    line-height: 1.08;
    letter-spacing: -0.012em;
    color: var(--heading);
    text-wrap: balance;
    animation: fadeUp 0.45s ease 0.05s both;
    user-select: none;
}

.signature {
    margin-top: clamp(44px, 8vh, 80px);
    animation: fadeUp 0.5s ease 0.12s both;
}

.name {
    font-family: var(--mono);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--soft);
}

.role {
    color: var(--dim);
}

.tagline {
    margin: 12px auto 0;
    max-width: 430px;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.55;
    color: var(--muted);
    text-wrap: pretty;
}
</style>
