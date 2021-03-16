export default {
    namespaced: true,
    state: {
        name: "----",
        age: 10
    },
    mutations: {
        setUserData(state: any, data: any) {
            state.name = data.name;
            state.age = data.age;
        }
    },
    actions: {
        setData({ commit }: any, data: any) {
            commit('setUserData', data);
        }
    },
    getters: {
        toString(state: any) {
            return "姓名:" + state.name + ", 年龄" + state.age;
        },
        toAge(state: any) {
            return state.age;
        }
    }
}