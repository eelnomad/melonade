<!-- BlogCard.vue
     A single article card for the blog grid. -->
<template>
    <router-link :to="{ name: 'BlogPost', params: { slug: article.slug } }" class="blog-card">
        <div class="card-image-wrapper">
            <img :src="article.image" :alt="article.title" class="card-image" loading="lazy" />
            <div class="tag-pills">
                <span v-for="tag in resolvedTags" :key="tag.name" class="tag-pill" :style="{ backgroundColor: tag.color }">
                    {{ tag.name }}
                </span>
            </div>
        </div>
        <div class="card-body">
            <div class="card-meta">
                <span class="card-byline">{{ article.date }}</span>
            </div>
            <div class="card-title">{{ article.title }}</div>
            <div class="card-excerpt">{{ article.excerpt }}</div>
        </div>
    </router-link>
</template>
<script>
import { computed } from 'vue'
import { getTag } from '@/utils/tags'

export default {
    name: 'blog-card',
    props: {
        article: { type: Object, required: true }
    },
    setup(props) {
        const resolvedTags = computed(() =>
            (props.article.tags ?? []).map(name => getTag(name)).filter(Boolean)
        )
        return { resolvedTags }
    }
}
</script>
<style scoped>
.blog-card {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-image-wrapper {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.tag-pills {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
}

.tag-pill {
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 700;
    color: white;
    text-transform: capitalize;
    letter-spacing: 0.05em;
}

.card-body {
    padding: 1.1rem 1.25rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
}

.card-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.card-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #ddd;
    flex-shrink: 0;
}

.card-byline {
    font-size: 0.78rem;
    color: #888;
}

.card-title {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-excerpt {
    font-size: 0.88rem;
    color: #666;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>