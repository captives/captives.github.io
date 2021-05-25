var io = require('socket.io');
class BaseSocket {
    constructor(server, path) {
        this.sockets = {};
        this.path = path;
        const that = this;
        console.log(this.path, 'BaseSocket', server.address());
        const socketServer = io().listen(server, { path: path });
        socketServer.use(function(socket, next) {
            socket.address = (socket.handshake.headers['x-forwarded-for'] ||
                socket.request.connection.remoteAddress ||
                socket.handshake.address).replace("::ffff:", "");
            socket.userAgent = socket.handshake.headers['user-agent'];
            socket.query = socket.handshake.query;
            //报错给客户端
            //return next(new Error('Authentication error'));
            next();
        });

        socketServer.on('connection', function(socket) {
            console.log(this.path, "new socket", socket.id, socket.address, JSON.stringify(socket.query));
            that.socketConnected(socket);
        });

        this.socketServer = socketServer;
    };

    socketConnected(socket) {
        const that = this;
        //断开连接
        socket.on('disconnect', () => {
            console.log(that.path, 'disconnect --------', socket && socket.id);
            that.socketClosed(socket);
        });

        //错误
        socket.on('error', function(err) {
            console.error(err);
        });

        that.sockets[socket.id] = socket;
        console.log(this.path, 'connect ...', socket.id);
    };

    socketClosed(socket) {
        //移除列表中 socket
        delete this.sockets[socket.id];
        socket && socket.disconnect();
    }

    //向指定通道内发消息
    broadcastToRoom(td, event, data) {
        delete data.td;
        this.socketServer.to(td).emit(event, data);
    }
}

module.exports = BaseSocket;