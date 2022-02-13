// nav.js contains the state for the navigation bar.

export default {
    namespaced: true,
    state: {
        compact: false,
        dim: false,
    },
    getters: {
        navState: state => {
            return state
        },
    },
    mutations: {
        setNavDim(state, bool) {
            state.dim = bool
        },
        setNavCompact(state, val) {
            state.compact = payload
        },
    },
    actions: {},
}