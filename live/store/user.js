const ActionType = {
    SET_USER: 'setUser',
    USER_LIST: 'userList',
    USER_ADD: 'userAdd',
    USER_REMOVE: 'userItem'
}

export default {
    namespaced: true,
    state: {
        user: null,
        userList: []
    },
    mutations: {
        [ActionType.SET_USER](state, user) {
            state.user = user;
        },
        [ActionType.USER_LIST](state, list) {
            state.userList = list;
        },
        [ActionType.USER_ADD](state, user) {
            for (let i in state.userList) {
                if (state.userList[i].id === user.id) {
                    state.userList.splice(i, 1);
                }
            }
            state.userList.push(user);
        },
        [ActionType.USER_REMOVE](state, user) {
            for (let i in state.userList) {
                if (state.userList[i].id === user.id) {
                    state.userList.splice(i, 1);
                }
            }
        }
    },
    actions: {
        setUser({ commit }, user){
            commit(ActionType.SET_USER, user);
        },
        initUsers({ commit }, list) {
            commit(ActionType.USER_LIST, list);
        },
        pushUser({ commit }, user) {
            commit(ActionType.USER_ADD, user);
        },
        removeUser({ commit }, user) {
            commit(ActionType.USER_REMOVE, user);
        }
    },
    getters: {
        getUserById: (state) => (id) => {
            return state.userList.find(user => user.id == id);
        }
    }
}