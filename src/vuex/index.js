import Vue from 'vue'
import Vuex from 'vuex/dist/vuex.js'

Vue.use(Vuex)

const state = {
  header: false
}

const getters = {
  getHeader (state) {
    return state.header
  }
}

const mutations = {
  showHeader (state) {
    state.header = true
  },
  hideHeader (state) {
    state.header = false
  }
}

const actions = {
  showHeader (context) {
    context.commit('showHeader')
  },
  hideHeader (context) {
    context.commit('hideHeader')
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
