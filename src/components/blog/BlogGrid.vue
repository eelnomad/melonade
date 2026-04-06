<!-- BlogGrid.vue
     Tag filter pills + 3-column card grid. -->
<template>
    <section class="blog-grid-section">
        <div class="blog-grid-header">
            <h2 class="blog-grid-title">Blog</h2>
            <p class="blog-grid-tagline">Thoughts on building things, one project at a time.</p>
        </div>

        <div class="filter-pills">
            <button
                v-for="tag in filterTags"
                :key="tag"
                :class="['filter-pill', { active: activeTag === tag }]"
                @click="activeTag = tag"
            >{{ tag }}</button>
        </div>

        <div class="card-grid">
            <BlogCard v-for="article in filteredArticles" :key="article.slug" :article="article" />
        </div>
    </section>
</template>

<script>
import BlogCard from './BlogCard.vue'

export default {
    name: 'blog-grid',
    components: { BlogCard },
    props: {
        articles: { type: Array, required: true }
    },
    data() {
        return { activeTag: 'All' }
    },
    computed: {
        filterTags() {
            const unique = [...new Set(this.articles.flatMap(a => a.tags ?? []))]
            return ['All', ...unique]
        },
        filteredArticles() {
            if (this.activeTag === 'All') return this.articles
            return this.articles.filter(a => (a.tags ?? []).includes(this.activeTag))
        }
    }
}
</script>

<style scoped>
.blog-grid-section {
    background-color: whitesmoke;
    color: black;
    padding: 4rem 3rem 5rem;
}

.blog-grid-header {
    margin-bottom: 1.5rem;
}

.blog-grid-title {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
}

.blog-grid-tagline {
    color: #666;
    font-size: 1rem;
    margin: 0;
}

.filter-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
}

.filter-pill {
    padding: 0.35rem 1rem;
    border-radius: 999px;
    border: 1.5px solid #ccc;
    background: transparent;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    text-transform: capitalize;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    color: inherit;
}

.filter-pill:hover {
    border-color: #999;
}

.filter-pill.active {
    background: black;
    color: white;
    border-color: black;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

@media (max-width: 900px) {
    .card-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
    .blog-grid-section { padding: 2.5rem 1.25rem 3rem; }
    .card-grid { grid-template-columns: 1fr; }
}
</style>
