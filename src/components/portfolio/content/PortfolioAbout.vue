<template>
    <page-shell>
        <div class="eyebrow">02 — About</div>
        <h2 class="section-title">Motivations</h2>

        <div class="prose">
            <p v-for="(para, i) in bio" :key="i">{{ para }}</p>
        </div>

        <div class="rule-label rule-label--spaced">Background</div>
        <dl class="facts">
            <template v-for="fact in background" :key="fact.id">
                <dt>{{ fact.label }}</dt>
                <dd>{{ fact.value }}</dd>
            </template>
        </dl>

        <template v-for="group in skillGroups" :key="group.id">
            <div class="rule-label rule-label--spaced">{{ group.label }}</div>
            <ul class="skills">
                <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
        </template>
    </page-shell>
</template>

<script setup>
import PageShell from '../shared/PageShell.vue'
import { bio, background, skillGroups } from '@/data/about'
</script>

<style lang="scss" scoped>
.section-title {
    margin-bottom: 44px;
}

.prose {
    font-size: clamp(17px, 2.2vw, 20px);
    font-weight: 300;
    line-height: 1.75;
    color: var(--soft);

    p {
        margin: 0 0 24px;
        text-wrap: pretty;
    }

    .last {
        margin-bottom: 0;
    }

    a {
        font: inherit;
    }
}

// Same 56px breathing room PortfolioWork gives its section rules. Kept local in
// both files rather than promoted into portfolio.scss: it is one declaration,
// and the global sheet holds the shared type scale, not layout for two pages.
.rule-label--spaced {
    margin-top: 56px;
}

// A <dl> because these are term/definition pairs. Two columns while there is
// room; the term column is sized to the copy rather than to a fraction of the
// row, so the values line up without a hard-coded width.
.facts {
    margin: 22px 0 0;
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 14px 32px;
    align-items: center;

    dt {
        font-family: var(--mono);
        font-size: 11px;
        font-weight: 400;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--accent);
        // The mono term sits on a shorter line box than the value beside it;
        // this drops it onto the value's first baseline.
        padding-top: 4px;
    }

    dd {
        margin: 0;
        color: var(--body);
        font-weight: 300;
        line-height: 1.6;
        text-wrap: pretty;
    }
}

// Below ~520px the two columns leave the values a few words wide, so the pairs
// stack: the term becomes a heading for the line under it.
@media (max-width: 520px) {
    .facts {
        grid-template-columns: 1fr;
        gap: 6px;

        dt {
            padding-top: 0;
        }

        dd + dt {
            margin-top: 16px;
        }
    }
}

// The separator is a pseudo-element on every item but the first, not a glyph in
// the data: screen readers skip it, and it can never end up orphaned at the end
// of a wrapped line the way ' · ' inside the text would.
.skills {
    list-style: none;
    margin: 22px 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 0;
    color: var(--body);
    font-weight: 300;
    line-height: 1.6;

    li + li::before {
        content: '·';
        color: var(--dim);
        margin: 0 12px;
    }
}
</style>
