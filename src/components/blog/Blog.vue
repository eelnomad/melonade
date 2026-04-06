<!-- Blog.vue
     Blog home page: featured hero + article card grid. -->
<template>
    <div id="blog">
        <BlogHero :article="featuredArticle" :related="relatedArticle" />
        <BlogGrid :articles="articles" />
    </div>
</template>

<script setup>
import articles from '@/assets/data/articles.json'
import BlogHero from '@/components/blog/BlogHero.vue'
import BlogGrid from '@/components/blog/BlogGrid.vue'

const featuredArticle = articles.find(a => a.featured)
const relatedArticle = articles.find(a => !a.featured) ?? null
</script>

<style scoped>
#blog {
    min-height: 100vh;
}
</style>
