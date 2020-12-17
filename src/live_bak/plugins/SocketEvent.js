import socketio from "socket.io-client";
import BaseEvent from "./BaseEvent";

class SocketEvent extends BaseEvent {
  constructor() {
    super();
    this.count = 5;
    this.connected = false;
  }

  init(url, path) {
    this.manager = {
      path: path,
      secure: true,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 3,
    };
    console.log(url, path);
    this.socket = socketio.connect(url, this.manager);
    this.listen(this.socket);
  }

  listen(socket) {
    socket.on("connect", () => {
      this.connected = true;
      console.log("socket connected");
      this.emit("connected");
    });

    //连接时发生错误
    socket.on("connect_error", (err) => {
      console.error("socket io", "connect error", err);
      this.connected = false;
    });

    //连接时超时
    socket.on("connect_timeout", () => {
      console.log("socket io", "connect_timeout");
      this.connected = false;
    });

    //断开连接时触发
    socket.on("disconnect", () => {
      console.log("socket io", "disconnect");
      this.connected = false;
      this.emit("disconnect", this.connected);
    });

    //成功重连后触发,num连接尝试次数
    socket.on("reconnect", (num) => {
      console.log("socket io", "reconnect", num);
    });

    //试图重新连接时触发
    socket.on("reconnect_attempt", () => {
      console.log("socket io", "reconnect attempt");
    });

    //试图重新连接中触发, num连接尝试次数
    socket.on("reconnecting", (num) => {
      console.log("socket io", "reconnecting", num);
      this.emit("reconnect", num, this.manager.reconnectionAttempts);
    });

    //重联尝试错误,err
    socket.on("reconnect_error", (err) => {
      console.error("socket io", "reconnect error", err);
      this.connected = false;
    });

    //重连失败
    socket.on("reconnect_failed", () => {
      console.log("socket io", "reconnect failed");
      this.connected = false;
      this.emit("closed");
    });

    socket.on("error", (err) => {
      console.error("socket io", "error", err);
      this.connected = false;
      this.emit("error");
    });
  }

  //广播消息通道
  broadcast(eventName, data) {
    if (this.connected) {
      this.socket.emit(eventName, data);
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
      this.emit("closed");
    }
  }
}

export default SocketEvent;
