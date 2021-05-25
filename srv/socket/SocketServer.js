const BaseSocket = require('./BaseSocket');
// const HomeClient = require('./HomeClient');
const RoleType = { PUBLISHER: 1, SUBSCRIBER: 2, 1: "PUBLISHER", 2: "SUBSCRIBER" };

class SocketServer extends BaseSocket {
    constructor(server, path) {
        super(server, path);
        //服务列表,指定房间的服务集合channel
        // this.clients = {};
    }

    socketConnected(socket) {
        const that = this;
        socket.on('register', (data, callback) => {
            console.log('register', JSON.stringify(data));
            socket._user = { ...data, sid: socket.id, time: new Date() };
            if (RoleType[data.role]) {
                socket.join(data.td);
                socket.join(data.td + '-' + data.role);

                // let client = that.clients[data.td];
                // if (client == null) {
                //     client = new HomeClient(data.td);
                //     that.clients[data.td] = client;
                // }

                // const list = client.listen(socket._user);

                socket.td = data.td;
                // socket.emit('list', list);
                socket.to(socket.td).emit('entry', socket._user);
                callback && callback({ td: socket.td, sid: socket.id, time: new Date() });
            } else {
                callback && callback({ error: '无效用户角色,禁止登入', code: 10000 });
            }
        });

        socket.on('subject', (data, callback) => {
            const val = data.data;
            const user = socket._user;
            let client = that.clients[socket.td];

            console.log("subject", socket.td, val);
            if (!socket.td || !user) {
                return callback && callback({ error: '无权限请求', code: 10001 });
            }

            switch (data.type) {
                case "search": //查询题目
                    socket.to(socket.td).emit('page', val);
                    callback && callback(client.searchSubject(val));
                    break;
                case 'start'://开始派题到客户端
                    const auth = client.startSubject(user, val, time => {
                        socket.emit('startTime', time);
                        socket.to(client.td).emit('startTime', time);
                    });

                    if (auth) {
                        const data = client.getSubject(user);
                        delete data.correct;

                        console.log("派送试题", data);
                        socket.to(client.td + '-' + RoleType.SUBSCRIBER).emit('start', data);
                        callback && callback(client.getSubject(user));
                    } else {
                        callback && callback({ error: '无权限请求', code: 10001 });
                    }
                    break;
                case 'answer'://学生提交答案到处理
                    if (user.role === RoleType.SUBSCRIBER) {
                        let result = client.saveResult(user, val);
                        //广而告之结果
                        socket.to(socket.td).emit('reply', result);
                        //返回给自己答题结果
                        callback && callback(result);
                    } else {
                        callback && callback({ error: "该角色不能提交答案", code: 10002 });
                    }
                    break;
                case 'stop':
                    //获取答题排行榜
                    const rankingList = client.stopSubject(user, val);
                    console.log(rankingList);
                    socket.to(socket.td).emit('stop', rankingList);
                    //返回给自己答题结果
                    callback && callback(rankingList);
                    break;
            }
        });

        super.socketConnected(socket);
    }

    socketClosed(socket) {
        socket.to(socket.td).emit('leave', socket._user);
        super.socketClosed(socket);
    }
}

module.exports = SocketServer;