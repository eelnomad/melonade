<!-- BlogPost.vue
     Renders a single blog article from markdown content. -->
<template>
    <div id="blog-post">
        <!-- Hero -->
        <div class="post-hero" :style="article ? { backgroundImage: `linear-gradient(to top, rgba(0.85) 0%, rgba(0.1) 100%), url('${article.image}')` } : {}">
            <div v-if="article" class="post-hero-content">
                <span class="category-pill" :style="{ backgroundColor: article.categoryColor }">
                    {{ article.category }}
                </span>
                <div class="post-date">{{ article.date }}</div>
                <h1 class="post-title">{{ article.title }}</h1>
            </div>
        </div>
        <!-- Body -->
        <div class="post-body-wrapper">
            <div v-if="notFound" class="post-not-found">
                Article not found.
            </div>
            <div v-else-if="htmlContent" class="post-body" v-html="htmlContent"></div>
            <div v-else class="post-loading">Loading…</div>
            <div v-if="article && article.projectSlug" class="post-project-link">
                <router-link :to="{ path: '/projects/' + article.projectSlug }">
                    Try the interactive version →
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { marked } from 'marked'
import articles from '@/assets/data/articles.json'

// Static import map — Vite requires literal strings for ?raw imports
const markdownModules = {
    showerthoughts: () => import('@/assets/content/showerthoughts.md?raw'),
    sudoku: () => import('@/assets/content/sudoku.md?raw'),
}

export default {
    name: 'blog-post',
    data() {
        return {
            article: null,
            htmlContent: null,
            notFound: false,
        }
    },
    // watch with immediate:true is required because App.vue uses keep-alive —
    // created() alone won't re-fire when navigating between /blog/slug1 and /blog/slug2
    watch: {
        '$route.params.slug': {
            handler() { this.loadContent() },
            immediate: true,
        }
    },
    methods: {
        async loadContent() {
            this.htmlContent = null
            this.notFound = false
            const slug = this.$route.params.slug
            const article = articles.find(a => a.slug === slug)
            if (!article || !markdownModules[slug]) {
                this.notFound = true
                return
            }
            const raw = await markdownModules[slug]()
            this.htmlContent = marked.parse(raw.default)
            this.article = article
        }
    }
}
</script>
<style scoped>
#blog-post {
    min-height: 100vh;
    background-color: whitesmoke;
}

.post-hero {
    height: 45vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: flex-end;
    padding: 2.5rem 3rem;
    background-color: black;
}

.post-hero-content {
    max-width: 800px;
    color: white;
}

.category-pill {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
}

.post-date {
    font-size: 0.85rem;
    opacity: 0.75;
    margin-bottom: 0.5rem;
}

.post-title {
    font-size: clamp(1.5rem, 4vw, 2.75rem);
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
}

.post-body-wrapper {
    max-width: 800px;
    margin: 0 auto;
    padding: 3rem 2rem 5rem;
    color: black;
}

.post-not-found,
.post-loading {
    font-size: 1.2rem;
    color: #888;
    padding: 2rem 0;
}

/* Prose styles for v-html rendered markdown */
.post-body :deep(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin: 2rem 0 0.75rem;
    line-height: 1.3;
}

.post-body :deep(h2) {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 2rem 0 0.75rem;
    line-height: 1.3;
}

.post-body :deep(h3) {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 1.5rem 0 0.5rem;
    line-height: 1.3;
}

.post-body :deep(p) {
    font-size: 1.05rem;
    line-height: 1.9;
    font-weight: 500;
    margin: 0 0 1.25rem;
}

.post-body :deep(ul),
.post-body :deep(ol) {
    font-size: 1.05rem;
    line-height: 1.9;
    padding-left: 1.5rem;
    margin: 0 0 1.25rem;
}

.post-body :deep(li) {
    margin-bottom: 0.4rem;
}

.post-body :deep(blockquote) {
    border-left: 4px solid #ccc;
    padding: 0.5rem 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #555;
}

.post-body :deep(code) {
    font-family: monospace;
    background: #eee;
    padding: 0.1em 0.35em;
    border-radius: 3px;
    font-size: 0.9em;
}

.post-body :deep(pre) {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 1.25rem;
    border-radius: 6px;
    overflow-x: auto;
    margin: 1.5rem 0;
}

.post-body :deep(pre code) {
    background: none;
    padding: 0;
    font-size: 0.9rem;
}

.post-body :deep(strong) {
    font-weight: 700;
}

.post-body :deep(hr) {
    border: none;
    border-top: 1px solid #ddd;
    margin: 2rem 0;
}

.post-project-link {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #ddd;
}

.post-project-link a {
    font-size: 1rem;
    font-weight: 700;
    color: #4f8ef7;
    text-decoration: none;
}

.post-project-link a:hover {
    text-decoration: underline;
}
</style>