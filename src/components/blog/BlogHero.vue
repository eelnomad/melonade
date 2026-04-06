<!-- BlogHero.vue
     Full-width dark featured article hero with optional related card. -->
<template>
    <router-link v-if="article" :to="{ name: 'BlogPost', params: { slug: article.slug } }" class="blog-hero" :style="{ backgroundImage: `linear-gradient(to top, rgba(0.85,0,0,0.85) 0%, rgba(0,0,0,0.1) 100%), url('${article.image}')` }">
        <div class="hero-content">
            <div class="hero-left">
                <span class="category-pill" :style="{ backgroundColor: article.categoryColor }">
                    {{ article.category }}
                </span>
                <h1 class="hero-title">{{ article.title }}</h1>
                <p class="hero-excerpt">{{ article.excerpt }}</p>
                <span class="hero-date">{{ article.date }}</span>
            </div>
            <div v-if="related" class="hero-right" @click.prevent>
                <router-link :to="{ name: 'BlogPost', params: { slug: related.slug } }" class="related-card">
                    <div class="related-card-image-wrapper">
                        <img :src="related.image" :alt="related.title" class="related-card-image" />
                    </div>
                    <div class="related-card-body">
                        <span class="related-card-category" :style="{ color: related.categoryColor }">
                            {{ related.category }}
                        </span>
                        <div class="related-card-title">{{ related.title }}</div>
                        <div class="related-card-date">{{ related.date }}</div>
                    </div>
                </router-link>
            </div>
        </div>
    </router-link>
</template>
<script>
export default {
    name: 'blog-hero',
    props: {
        article: { type: Object, required: true },
        related: { type: Object, default: null },
    }
}
</script>
<style scoped>
.blog-hero {
    display: flex;
    align-items: flex-end;
    height: 100vh;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    text-decoration: none;
    padding: 4rem;
    box-sizing: border-box;
    cursor: pointer;
    background-color: black;
    color: white;
}

.hero-content {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    gap: 3rem;
    color: white;
}

.hero-left {
    max-width: 55%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.category-pill {
    display: inline-block;
    align-self: flex-start;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.hero-title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.15;
    margin: 0;
}

.hero-excerpt {
    font-size: 1rem;
    line-height: 1.6;
    opacity: 0.85;
    margin: 0;
}

.hero-date {
    font-size: 0.85rem;
    opacity: 0.65;
}

.hero-right {
    flex-shrink: 0;
    color: black;
}

.related-card {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
    color: #333;
    width: 260px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease;
}

.related-card:hover {
    transform: translateY(-3px);
}

.related-card-image-wrapper {
    aspect-ratio: 16 / 9;
    overflow: hidden;
}

.related-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.related-card-body {
    padding: 0.9rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.related-card-category {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.related-card-title {
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.related-card-date {
    font-size: 0.75rem;
    color: #999;
}

@media (max-width: 768px) {
    .blog-hero {
        padding: 2rem 1.5rem;
    }

    .hero-left {
        max-width: 100%;
    }

    .hero-right {
        display: none;
    }
}
</style>