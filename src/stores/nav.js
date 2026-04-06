// nav.js contains the state for the navigation bar.
import { ref } from 'vue'
import { defineStore } from 'pinia'

const defaultState = {
    collapsed: false,
    hideable: false,
    navOnDark: true,
}

export const useNavStore = defineStore('nav', {
    state: () => ({...defaultState}),
    getters: {
        navColor: (state) => state.navOnDark ? 'white' : 'black',
    },
    actions: {
        setHideable(val) {
            this.hideable = val
        },
        setNavOnDark(val) {
            this.navOnDark = val
        },
    },
})
