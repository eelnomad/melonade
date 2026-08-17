// Theme state: light or dark, nothing else.
//
// The contract with the rest of the app is a single attribute — data-theme on
// <html>, always a concrete 'light' or 'dark'. The inline script in index.html
// sets it before the first paint (stored choice, else the system preference);
// everything here only ever changes it afterwards. CSS therefore never has to
// ask prefers-color-scheme, which it could not do anyway: a media query cannot
// express "the visitor overrode their system."
//
// Module-level ref rather than a store — there is no Pinia here and one boolean
// does not justify one. Every importer shares this instance.

import { ref } from 'vue'

const STORAGE_KEY = 'melonade-theme'
const SWAP_MS = 250

const theme = ref(readAttr())

let swapTimer = null

function readAttr() {
    const t = document.documentElement.dataset.theme
    return t === 'light' ? 'light' : 'dark'
}

// Wrapped because Safari throws on localStorage in private mode rather than
// returning null, and a dead toggle is a worse failure than a forgotten one.
function readStored() {
    try {
        const t = localStorage.getItem(STORAGE_KEY)
        return t === 'light' || t === 'dark' ? t : null
    } catch {
        return null
    }
}

function writeStored(next) {
    try {
        localStorage.setItem(STORAGE_KEY, next)
    } catch {
        // Ignore: the theme still applies for this session.
    }
}

function applyTheme(next, { animate = true } = {}) {
    // The transition class has to land before the attribute, or the first frame
    // of the swap paints the new palette with no transition attached to it.
    if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const root = document.documentElement
        root.classList.add('theme-transition')
        // Clearing first keeps a rapid second click from stranding the class:
        // the earlier timer would otherwise strip it mid-way through the swap.
        clearTimeout(swapTimer)
        swapTimer = setTimeout(() => root.classList.remove('theme-transition'), SWAP_MS)
    }

    document.documentElement.dataset.theme = next
    theme.value = next

    // <meta name="theme-color"> tints browser chrome, and it is markup rather
    // than CSS — so read the ground back off the document instead of keeping a
    // second copy of it here. Safe by construction, the same way ClockField's
    // read is: the attribute above is already set, and unregistered custom
    // properties don't interpolate, so this never catches a mid-cross-fade
    // value. If the read comes back empty the dark default in index.html stands.
    const ground = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta && ground) meta.setAttribute('content', ground)
}

export function toggleTheme() {
    const next = theme.value === 'dark' ? 'light' : 'dark'
    writeStored(next)
    applyTheme(next)
}

function onSystemChange(e) {
    // Only while the visitor has never chosen: once they have, their choice
    // outranks the OS for good, so an appearance schedule can't undo a click.
    if (readStored()) return
    applyTheme(e.matches ? 'light' : 'dark')
}

// Called once, from PortfolioLayout. Returns a teardown for symmetry with the
// component lifecycle, though the layout lives for the whole session.
export function initTheme() {
    applyTheme(readAttr(), { animate: false })

    // Captured rather than read back off the module in the teardown, so a
    // remount can't leave the previous caller's cleanup detaching its listener.
    const query = window.matchMedia('(prefers-color-scheme: light)')
    query.addEventListener('change', onSystemChange)

    return () => {
        query.removeEventListener('change', onSystemChange)
        clearTimeout(swapTimer)
    }
}

export function useTheme() {
    return { theme, toggleTheme }
}
