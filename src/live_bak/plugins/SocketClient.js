import SocketEvent from "./SocketEvent";

class SocketClient extends SocketEvent {
  constructor() {
    super();
  }

  listen(socket) {
    super.listen(socket);
    socket.on("entry", (data) => this.emit("entry", data));
    socket.on("list", (data) => this.emit("list", data));
    socket.on("leave", (data) => this.emit("leave", data));
    socket.on("start", (data) => this.emit("start", data));
    socket.on("startTime", (data) => this.emit("startTime", data));
    socket.on("reply", (data) => this.emit("reply", data));
    socket.on("stop", (data) => this.emit("stop", data));

    socket.on("page", (data) => this.emit("page", data));

    socket.on("share", (data, user) => {
      data.event
        ? this.emit("share", data.event, data.data, user)
        : console.log("share", data);
    });
  }

  register(td, id, name, role, callback) {
    this.socket.emit("register", { td, id, name, role }, callback);
  }

  subject(type, data, callback) {
    if (this.connected) {
      this.connected && this.socket.emit("subject", { type, data }, callback);
    }
  }
}

export default SocketClient;
