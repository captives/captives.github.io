const BaseSocket = require('./../socket/BaseSocket');
const pty = require('node-pty');
const os = require('os');

const isWindows = os.platform() === 'win32'
const shell = isWindows ? 'powershell.exe' : 'bash';



class Xterm extends BaseSocket {
    constructor(server, path) {
        super(server, path);
        this.ptys = {};
    }

    socketConnected(socket) {
        const ptyProcess = pty.spawn(shell, [], {
            name: 'xterm-256color',
            cols: 80,
            rows: 30,
            cwd: isWindows ? process.env.USERPROFILE : process.env.HOME,
            env: Object.assign({ TEST: "Environment vars work" }, process.env),
            useConpty: true
        });

        //发送数据
        ptyProcess.onData(data => {
            // process.stdout.write(data);
            socket.emit('message', data);
        });

        super.socketConnected(socket);
        socket.emit('title', socket.id);

        socket.on('message', (data) => {
            ptyProcess.write(data);
        });

        this.ptys[socket.id] = ptyProcess;
    }

    socketClosed(socket) {
        console.log(this.path, 'close--------------', socket.id);
        const ptyProcess = this.ptys[socket.id];
        ptyProcess.kill();
        delete this.ptys[socket.id];

        super.socketClosed(socket);
    }
}

module.exports = Xterm;