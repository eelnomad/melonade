import { createStore } from 'vuex'

export default createStore({
  state: {
    backgroundQueue: [{
      title: '0',
      base_url: 'https://lh3.googleusercontent.com/Y2wYl6KgubHSz3Zvh0GXN7a8_grOTse9fqbFUlwVliu3tk6HEIZNTGl-b5Z0-GYcRZoq9i_s3nFB6mEiHjxKMoaYjrOUNjBgO1GgNXDfKskM-4XB1zTGOFWRYVMOr4AvKWmxr7yRMWMzkakRrzaZe4xIqipojah7CMnY8EZO8V19yGjbdi7pLFWm7GM5fmgBU_HqS-Fu3X_Cmzf_cB6LmgaJLrYElcCEHEIsquzZKOygnR1l_Tuk475BDR-MYKXv9Tj_QQV12utkH9Klgp-D9ugxw2ur_zGEo94LeE8rw7eT-K0eFv2nEs5lCszioDyO2bgioSLMO116eraXtJK3G5FqeXRs5nb5j6Zx9bUtUBXOjq2_mn6y3REG8XxSYy6qpT31aRxM4P-yrjbTJazPMpDLgXAOkGFUy3NwTq2I9Kioil61rouKUqyvxpQda-eJkwl5j794GQhKcSmJA67Tt4Lf6mf9GPWZPdRH6CpQazB2AIP_5Q9oYzU94kritAi3m5tV_CRewOizz29auJ7A9aWJrWKQqFTh1vK-AMPpw0tt9Tf7uoC1wOQm5gPnEsn3UpPNERKVvwnlB611qJ6oyO_tjI-cr98aQybVIqOPmWH_FgmWuMZ9biQlhVkGu_0miBw6o9JXiMyr4mymuz6-B-vKtQOSTYZl4LEDIXgUxrY8KQ=w1980-h1320-no?.jpg'
    }]
  },
  getters: {
    getBackgroundQueue (state) {
      return state.backgroundQueue
    }

  },
  mutations: {
    pushBackgroundQueue (state, payload) {
      if (state.backgroundQueue.length <= 1) {
        state.backgroundQueue.push(payload)
      }
    },
    shiftBackgroundQueue (state) {
      if (state.backgroundQueue.length > 1) {
        state.backgroundQueue.shift()
      }
    }
  },
  actions: {
    pushBackgroundQueue (context, payload) {
      context.commit('pushBackgroundQueue', payload)
    },
    shiftBackgroundQueue (context) {
      context.commit('shiftBackgroundQueue')
    }
  },
  modules: {
  }
})