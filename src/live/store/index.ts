import Vue from 'vue'
import Vuex from 'vuex'
// vuex-persistedstate默认持久化所有state，指定需要持久化的state
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)
export default new Vuex.Store({
  state: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  mutations: {},
  actions: {},
  modules: {}
})
