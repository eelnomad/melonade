// nav.js contains the state for the navigation bar.

export default {
    namespaced: true,
    state: {
        compact: false,
    },
    getters: {
        navState: state => {
            return state
        },
    },
    mutations: {
        setNavCompact(state, val) {
            state.compact = payload
        },
    },
    actions: {},
}