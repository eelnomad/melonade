// nav.js contains the state for the navigation bar.
import { ref } from 'vue'
import { defineStore } from 'pinia'

const defaultState = {
    collapsed: false,
    hideable: false,
}

export const useNavStore = defineStore('nav', {
    state: () => ({...defaultState}),
    actions: {
        setHideable(val) {
            this.hideable = val
        },
    },
})
