<template>
    <router-link class="project-card" :to="{ name: route.name }" target="_blank" rel="noopener noreferrer">
        <span class="new-tab-icon">↗</span>
        <div class="card-body">
            <h2>{{ route.name }}</h2>
            <p class="description">{{ route.description }}</p>
        </div>
        <div class="card-footer f-row f-wrap f-col-gap-s f-row-gap-s">
            <span v-for="tag in resolvedTags" :key="tag.name" class="tag" :style="{ backgroundColor: tag.color, color: 'white' }">{{ tag.name }}</span>
        </div>
    </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { getTag } from '@/utils/tags'

const props = defineProps(['route'])

const resolvedTags = computed(() =>
    (props.route.tags ?? []).map(name => getTag(name)).filter(Boolean)
)
</script>

<style scoped>
.project-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.25rem;
    text-decoration: none;
    color: black;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    height: 160px;
}

.project-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.new-tab-icon {
    position: absolute;
    top: 0.75rem;
    right: 0.9rem;
    font-size: 0.85rem;
    color: #bbb;
    transition: color 0.15s ease;
    line-height: 1;
}

.project-card:hover .new-tab-icon {
    color: #888;
}

.card-body {
    flex: 1;
}

h2 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

.description {
    font-size: 0.85rem;
    font-weight: 500;
    color: #555;
    line-height: 1.4;
}

.card-footer {
    margin-top: 1rem;
}

.tag {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    text-transform: capitalize;
}
</style>
