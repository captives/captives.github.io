<template>
  <el-main class="center">
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Session</el-divider>
        <el-form label-width="80px">
          <el-form-item label="Session:">
            <el-input v-model="userName">
              <el-button
                slot="append"
                type="primary"
                icon="el-icon-user"
                @click="joinSession"
                >进入</el-button
              >
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Local</el-divider>
        <canvas ref="canvas" class="video-item"></canvas>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col class="center" :span="6">
        <el-divider>Session</el-divider>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import { OpenVidu } from "openvidu-browser";
import { createSession, createToken } from "./../../plugins/OpenVidu";
export default {
  name: "HelloWorld",
  data() {
    return {
      userName: "SessionA3",
      OV: null,
      session: null,
    };
  },
  destroyed() {
    this.leaveSession();
  },
  methods: {
    joinSession() {
      this.OV = new OpenVidu();
      this.session = this.OV.initSession();
      this.session.on("streamCreated", ({ stream }) => {
        this.session.subscribe(stream, "subscriber");
      });

      this.getToken(this.userName).then((token) => {
        this.session
          .connect(token)
          .then(() => {
            var publisher = this.OV.initPublisher("publisher");
            this.session.publish(publisher);
          })
          .catch((error) => {
            console.log(
              "There was an error connecting to the session:",
              error.code,
              error.message
            );
          });
      });
    },
    leaveSession() {
      if (this.session) {
        this.session.disconnect();
      }
    },
    getToken(userName) {
      return createSession(userName).then((sessionId) =>
        createToken(sessionId)
      );
      return new Promise((resolve) => {
        resolve({
          id:
            "wss://demos.openvidu.io:4443?sessionId=SessionA3&token=cw7hwfosiiaeycxn&role=PUBLISHER&version=2.11.0&turnUsername=WEI52Q&turnCredential=e5r15f",
          session: "SessionA3",
          role: "PUBLISHER",
          data: "",
          token:
            "wss://demos.openvidu.io:4443?sessionId=SessionA3&token=cw7hwfosiiaeycxn&role=PUBLISHER&version=2.11.0&turnUsername=WEI52Q&turnCredential=e5r15f",
        });
      });
    },
  },
};
</script>
