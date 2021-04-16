import VueSocketIO, { VueSocketOptions } from 'vue-socket.io'
import md5 from 'js-md5';
import Vue from 'vue';

export default (store: any, code: string, secret: string) => {
    return new VueSocketIO({
        debug: process.env.NODE_ENV === "development",
        connection: (() => {
            let host = process.env.VUE_APP_SOCKET_BASEURL;
            let timestamp = Date.now();
            let token = md5(code + timestamp + secret);
            return `${host}?companyCode=${code}&timestamp=${timestamp}&token=${token}`;
        })(),
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_'
        },
        // @ts-ignore
        options: {
            path: "/socket.io",
            autoConnect: true,                //启动自从自动连接
            secure: true,
            transports: ['websocket'],        // ['websocket', 'polling']
            reconnection: true,               //启动重新连接
            reconnectionAttempts: 5,          //最大重试连接次数
            reconnectionDelay: 2000,          //最初尝试新的重新连接等待时间
            reconnectionDelayMax: 10000,      //最大等待重新连接,之前的2倍增长
            timeout: 20000
        }
    });
}