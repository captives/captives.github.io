<template>
  <el-container>公共聊天室</el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "./../api/index";

interface User {
  id: string;
  name: string;
}
@Component({
  name: "ChatRoom",
})
export default class ChatRoom extends Vue {
  private user: any = { uid: null, name: null };
  private userList: Array<User> = [];

  private created() {
    api.user().then(({ success, user }: any) => {
      if (success) {
        this.user.name = user.name;
        this.user.uid = user.time;
        //@ts-ignore
        this.$socket.emit("register", {
          role: 1,
          td: this.$route.params.td,
          name: user.name,
        });
      }
    });
  }
}
</script>
<style lang="stylus" scoped>
.el-container {
  background-image: radial-gradient(#ffffff, #f1edd4);
}
</style>
