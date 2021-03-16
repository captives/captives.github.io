import Vue from "vue";

enum ActionTypes {
    USER_ENTER = "userEnter",
    USER_QUIT = "userQuit",
};

export default {
    namespaced: true,
    state: {
        chat: [],//聊天内容
        list: [],//socket 在线列表
    },
    actions: {
        /**
         * @desc 进入成功
         * @param commit[object]
         * @param data 为已在线用户集合（不包括"我"自己）
         */
        SOCKET_enterSuccess({ commit, dispatch, state }: any, data: any) {
            console.log('enter success', data);
        },

        /**
         * @desc 拒绝进入
         * @param commit[object]
         * @param data[code]错误码
         * @param data[message] 错误原因
         */
        SOCKET_enterReject({ commit }: any, data: any) {
            console.log('enter enterReject', data);
        },
        /**
         * @desc 用户进入
         */
        SOCKET_userEnter({ commit, dispatch }: any, data: any) {
            console.log('enter userEnter', data);
        },

        /**
         * @desc 用户退出
         */
        SOCKET_userQuit({ commit, dispatch }: any, data: any) {
            console.log('enter userQuit', data);
        },

        /**
         * @desc 多客户端登陆, 被踢下线
         * @param commit[object]
         * @param data[message] 错误原因
         */
        SOCKET_offline({ commit }: any, data: any) {
            console.log('enter offline', data);
        },

        /**
         * @desc 其它用户共享的数据
         * @param commit[object]
         * @param data
         */
        SOCKET_share({ commit, dispatch }: any, { event, data }: any) {
            console.log('share', event, data);
        },
    },
    mutations: {
        [ActionTypes.USER_ENTER](state: any, user: any) {

        },
        [ActionTypes.USER_QUIT](state: any, user: any) {

        },
    },
    getters: {
        online(state: any) {
            return (userId: number) => {
                const list: Array<any> = state.list.filter((item: any) => userId === item.userId);
                return list.length > 0;
            }
        }
    }
}