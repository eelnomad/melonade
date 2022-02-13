// theme.js contains the color themes as well as a state for the currently selected theme.

const Theme = {
    WHITE: {
        'background-color': 'whitesmoke',
        'color': 'black',
    },
    BLACK: {
        'background-color': 'black',
        'color': 'white',
    },
}

export default {
    namespaced: true,
    state: () => ({
        Theme,
        theme: Theme.WHITE,
    }),
    getters: {
        themes: state => {
            return state.Theme
        },
        themeState: state => {
            return state.theme
        },
    },
    actions: {

    },
    mutations: {
        setTheme(state, val) {
            state.theme = val
        }
    },
}