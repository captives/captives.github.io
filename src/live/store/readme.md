const { commit, dispatch, state, rootState, rootGetters } = store

1、模块A的actions 调用模块B中的actions方法
- commit('receive', data) // 调用当前模块的 mutations
- dispatch('vip/get', { value:1 }, {root: true})// 调用其他模块的 actions

2、模块A的actions 调用模块B中的mutations
- commit('receive', data) // 调用当前模块的 mutations
- commit('vip/receive', data, { root: true }) // 调用其他模块的 mutations

3、调用其它模块的Getters
- console.log(rootGetters['vip/get']) // 打印其他模块的 getters

4、调用其它模块的Getters
- console.log(state) // 打印当前 state
- console.log(rootState) // 打印根 state
- console.log(rootState.vip) // 打印其他模块的 state


- { root: true } 申明不是当前模块的