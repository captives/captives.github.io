enum ActionTypes {
    SET_ROOM = 'setRoom',
}

/**
 * 此模块维护当前教室的属性
 */
export default {
    namespaced: true,
    state: {
        padding: 20,
        ratio: 1, //窗体缩放
        page: 1, //页码
        completed: false,   //教室信息获取成功
        supported: true,    //支持上课
        networkLevel: 1, //网络质量等级
    },
    mutations: {
        [ActionTypes.SET_ROOM](state: any, data: any) {
            for (var key in data) {
                state[key] = data[key];
            }
        }
    },
    actions: {
        setRoom({ commit }: any, payload: any) {
            commit(ActionTypes.SET_ROOM, payload);
        },
        onResize({ state, commit }: any, { element, whiteBoard, padding }: any) {
            if (element) {
                const contentWidth = element.parentElement.clientWidth - (padding || state.padding) * 2;
                const contentHeight = element.parentElement.clientHeight - (padding || state.padding) * 2;
                console.log('视窗宽高', contentWidth, contentHeight, "内容宽高", element.offsetWidth, element.offsetHeight);
                let ratio = contentWidth / element.offsetWidth;
                const height = element.offsetHeight * ratio;
                if (height > contentHeight) {
                    ratio = contentHeight / element.offsetHeight;
                }
                commit(ActionTypes.SET_ROOM, { ratio: Number(ratio), padding: padding || state.padding });
            }

            setTimeout(() => {
                let data = { wrapperRect: {}, whiteBoardRect: {} };
                data.wrapperRect = element && element.getBoundingClientRect();
                data.whiteBoardRect = whiteBoard && whiteBoard.getBoundingClientRect();
                commit(ActionTypes.SET_ROOM, data);
            }, 50);
        }
    },
    getters: {
        domStyle(state: any) {
            return {
                position: 'absolute',
                left: '50%',
                top: '50%',
                'transform-origin': 'left top',
                transform: `scale(${state.ratio}) translate(-50%,-50%)`,
                '-moz-transform': `scale(${state.ratio}) translate(-50%,-50%)`,
            };
        },
        appid(state: any): string {
            if (state.settings && state.settings.agora_app_id) {
                return state.settings.agora_app_id;
            }

            return "";
        },
        //agora app token;
        appToken(state: any): string {
            return state.appToken || null;
        },
        setting(state: any): any {
            return state.setting;
        }
    }
}