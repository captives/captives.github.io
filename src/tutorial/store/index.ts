import Vue from "vue";
import Vuex from "vuex";
// vuex-persistedstate默认持久化所有state，指定需要持久化的state
import createPersistedState from "vuex-persistedstate";
import user from './user';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { user },
  plugins: [
    //默认localStorage
    createPersistedState(),//{ storage: window.sessionStorage }
  ]
});
