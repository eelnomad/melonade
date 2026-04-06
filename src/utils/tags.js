import TAGS from '@/assets/data/tags.json'

const tagMap = Object.fromEntries(TAGS.map(t => [t.name, t]))

/** Returns the tag object { name, color } or null if not found. */
export function getTag(name) {
    return tagMap[name] ?? null
}
