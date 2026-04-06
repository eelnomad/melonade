<template>
    <div id="small-projects">
        <div class="controls pH-xl pT-xl pB-l">
            <input
                v-model="search"
                class="search-input"
                type="text"
                placeholder="Search projects..."
            />
            <div class="tag-scroll-wrapper">
                <div class="tag-scroll">
                    <button
                        v-for="tag in allTags"
                        :key="tag"
                        class="tag-btn"
                        :class="{ active: activeTags.has(tag) }"
                        @click="toggleTag(tag)"
                    >{{ tag }}</button>
                </div>
            </div>
        </div>

        <div class="projects-grid pH-xl pB-xl">
            <small-projects-card
                v-for="route in filteredRoutes"
                :key="route.path"
                :route="route"
            />
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import SmallProjectsCard from '@/components/smallProjects/SmallProjectsCard.vue'
import { PROJECT_ROUTES } from '@/router/projects'

const visibleRoutes = computed(() =>
    PROJECT_ROUTES.filter(r => !r.meta?.hidden)
)

const allTags = computed(() => {
    const counts = new Map()
    visibleRoutes.value.forEach(r =>
        (r.tags ?? []).forEach(t => counts.set(t, (counts.get(t) ?? 0) + 1))
    )
    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([tag]) => tag)
})

const activeTags = reactive(new Set())
const search = ref('')

function toggleTag(tag) {
    if (activeTags.has(tag)) activeTags.delete(tag)
    else activeTags.add(tag)
}

const filteredRoutes = computed(() => {
    const q = search.value.trim().toLowerCase()
    return visibleRoutes.value.filter(r => {
        const matchesSearch = !q || r.name.toLowerCase().includes(q)
        const matchesTags = activeTags.size === 0 || (r.tags ?? []).some(t => activeTags.has(t))
        return matchesSearch && matchesTags
    })
})
</script>

<style scoped>
#small-projects {
    min-height: 100vh;
    background-color: whitesmoke;
    color: black;
}

.controls {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.search-input {
    width: 100%;
    padding: 0.65rem 1rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 0.95rem;
    background: white;
    color: black;
    outline: none;
    box-sizing: border-box;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
    transition: border-color 0.15s, box-shadow 0.15s;
}

.search-input::placeholder {
    color: #aaa;
}

.search-input:focus {
    border-color: #aaa;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tag-scroll-wrapper {
    position: relative;
}

.tag-scroll {
    display: flex;
    gap: 0.6rem;
    overflow-x: auto;
    padding: 0.3rem 2.5rem;
    scrollbar-width: none;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 2.5rem, black calc(100% - 2.5rem), transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 2.5rem, black calc(100% - 2.5rem), transparent 100%);
}

.tag-scroll::-webkit-scrollbar {
    display: none;
}

.tag-btn {
    flex-shrink: 0;
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    color: #555;
    text-transform: capitalize;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.tag-btn:hover {
    border-color: #888;
    color: #222;
}

.tag-btn.active {
    background: #333;
    color: white;
    border-color: #333;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding-top: 1.5rem;
}
</style>
