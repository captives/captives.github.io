// vuex-persistedstate默认持久化所有state，指定需要持久化的state
import createPersistedState from "vuex-persistedstate";
import Vue from 'vue';
import Vuex from 'vuex';
import SocketStore from './socket';
import UserStore from './user';
import RoomStore from './room';
import TeacherStore from './teacher'

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    RoomStore,
    UserStore,
    TeacherStore,
    SocketStore,
  }
});
