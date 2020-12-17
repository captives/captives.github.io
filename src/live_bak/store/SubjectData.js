const ActionType = {
  START_SUBJECT: "start",
  INIT_LIST: "initList",
  ADD_RESULT: "addResult",
  RESET: "reset",
};

export default {
  namespaced: true,
  state: {
    //是否在进行中
    starting: false,
    list: [], //答题列表
  },
  mutations: {
    //开始答题
    [ActionType.START_SUBJECT](state, data) {
      state.starting = true;
    },
    [ActionType.INIT_LIST](state, list) {
      state.list = list;
    },
    [ActionType.ADD_RESULT](state, data) {
      state.list.push(data);
    },
    //结束答题
    [ActionType.RESET](state, data) {
      state.starting = false;
      state.list = [];
    },
  },
  actions: {
    startSubject({ commit }, data) {
      commit(ActionType.START_SUBJECT, data);
    },
    initResults({ commit }, list) {
      commit(ActionType.INIT_LIST, list);
    },
    addResult({ commit }, data) {
      commit(ActionType.ADD_RESULT, data);
    },
    stopSubject({ commit }, data) {
      commit(ActionType.RESET, data);
    },
  },
  getters: {
    getResultById: (state) => (id) => {
      return state.list.find((user) => user.id == id);
    },
  },
};
