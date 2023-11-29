// theme.js contains the color themes as well as a state for the currently selected theme.
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const THEMES = {
    WHITE: {
        'background-color': 'whitesmoke',
        'color': 'black',
    },
    BLACK: {
        'background-color': 'black',
        'color': 'white',
    },
}

const defaultState = {
    theme: THEMES.BLACK
}

export const useThemeStore = defineStore('theme', {
    state: () => ({...defaultState}),
    getters: {
        color: (state) => state.theme.color,
    },
    actions: {
        setTheme(val) {
            this.theme = val
        },
    },
})
