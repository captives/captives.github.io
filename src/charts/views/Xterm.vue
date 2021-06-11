<template>
    <el-main>
        <div ref="container" class="fill"></div>
    </el-main>
</template>
<script>
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import * as io from "socket.io-client/dist/socket.io.js";

export default {
    name: "Xterm",
    data() {
        return {
            term: null,
            socket: null,
        };
    },
    methods: {
        initSocket() {
            const url = process.env.VUE_APP_SOCKET_XTERM_URL + "/";
            console.log(url);
            this.socket = io.connect(url, { transports: ["websocket"], path: "/xterm" });
            this.socket.on("connect", () => {});

            this.socket.on("disconnect", (err) => {
                console.log(`WEBSOCKET SERVER DISCONNECTED: ${err}`);
                this.socket.io.reconnection(false);
            });
        },
    },
    mounted() {
        this.initSocket();
        const term = new Terminal({
            rendererType: "canvas", // 渲染类型
            rows: 40, // 行数
            convertEol: true, // 启用时，光标将设置为下一行的开头
            scrollback: 100, // 终端中的回滚量
            disableStdin: false, // 是否应禁用输入。
            cursorStyle: "underline", // 光标样式
            cursorBlink: true, //光标闪烁
            fontSize: 26, //字体大小
            theme: {
                // foreground: "yellow", // 字体
                background: "#405261", // 背景色
                cursor: "help", // 设置光标
            },
        });

        this.socket.on("title", (data) => {
            term.clear();
            document.title = data;
        });

        this.socket.on("message", (data) => {
            // 服务端消息
            term.write(data);
        });

        term.onTitleChange((title) => {
            document.title = title;
        });

        term.onData((e) => {
            this.socket.emit("message", e);
        });

        // 大小自适应
        window.addEventListener("resize", function () {
            term.fit();
            term.scrollToBottom();
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        term.open(this.$refs.container);

        term.clear();
        term.writeln("Welcome to xterm.js \r\n + This is a local terminal emulation, without a real terminal in the back-end.\r\n");
        term.writeln("Type some keys and commands to play around. \r\n $ Connecting....");

        term.focus();
        //调整终端的大小以及行和列适配父级元素
        fitAddon.fit();
    },
};
</script>


<style lang="stylus" scoped>
.fill {
    height: 100%;
    position: relative;

    >>> .terminal {
        outline: none;
        padding: 20px 10px 0 20px;
        position: absolute;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
    }
}
</style>