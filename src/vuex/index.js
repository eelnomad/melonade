import Vue from 'vue'
import Vuex from 'vuex/dist/vuex.js'

Vue.use(Vuex)

const state = {
  backgroundDetails: {
    base_url: ''
  }
}

const getters = {
  getBackgroundDetails (state) {
    return state.backgroundDetails
  }
}

const mutations = {
  setBackgroundDetails (state, payload) {
    state.backgroundDetails = payload
  }
}

const actions = {
  setBackgroundDetails (context, payload) {
    context.commit('setBackgroundDetails', payload)
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
