<template>
  <div class="home">
    <img alt="Vue logo" src="./../assets/logo.png" />
    {{logined}}
  </div>
</template>

<script>
import SocketClient from './../plugins/SocketClient';
// @ is an alias to /src
export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      srv: {},
      client: null,
      logined: false,
      list: [], //消息内容
      input: '',//输入的聊天信息
    }
  },
  methods: {
    init(url, path) {
      this.list.push('socket connect ' + url);
      this.client = new SocketClient();
      this.client.init(url, path);
      this.client.on('connected', this.connected);
      this.client.on('disconnect', this.disconnected);
      this.client.on('closed', this.closed);
      this.listenSocketEvent(this.client.socket);
    },
    connected() {
      this.logined = false;
      this.list.push('socket connect success');
    },
    disconnected() {
      this.logined = false;
      this.list.push('socket closed');
    },
    closed() {
      this.list = [];
      this.list.push('socket connect failed');
    },
    listenSocketEvent(client) {
      const that = this;
      client.on('success', data => {
        that.logined = true;
        that.list.push(data);
      });

      client.on('chat', data => {
        that.list.push(data);
      });
    },
  },
  created() {
    this.init("https://" + window.location.hostname + ":3000", '/live');
  }
}
</script>
