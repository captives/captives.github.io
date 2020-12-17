<template>
  <el-main>
    <el-header> Node WebRTC Recorder </el-header>
    <el-row class="video-container">
      <video :srcObject.prop="localStream" autoplay></video>
    </el-row>
    <el-row class="center">
      <el-switch
        v-model="selectValue"
        active-text="屏幕"
        inactive-text="摄像头"
      >
      </el-switch>
      <el-button v-if="recording" type="danger" @click="stopRecorder"
        >停止录制</el-button
      >
      <el-button v-else type="primary" @click="startRecorder"
        >开始录制</el-button
      >
    </el-row>
  </el-main>
</template>
<script>
import fetch from "node-fetch";
import { RTCPeerConnection, RTCSessionDescription } from "wrtc";
const host = "https://local.uuabc.com:2020";
const prefix = "/wrtc";
export default {
  name: "NodeWebRTCRecorder",
  data() {
    return {
      selectValue: false,
      recording: false, //录制中
      localStream: null,
      peerConnection: null,
    };
  },
  mounted() {},
  methods: {
    async beforeAnswer(peerConnection) {
      const constraint = { video: true, audio: true };

      if (this.selectValue) {
        this.localStream = await window.navigator.mediaDevices.getDisplayMedia(
          constraint
        );
      } else {
        this.localStream = await window.navigator.mediaDevices.getUserMedia(
          constraint
        );
      }

      this.localStream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, this.localStream));

      const { close } = peerConnection;
      peerConnection.close = () => {
        this.localStream.getTracks().forEach((track) => track.stop());
        this.localStream = null;
        return close.apply(this, arguments);
      };
    },
    enableStereoOpus(sdp) {
      return sdp.replace(/a=fmtp:111/, "a=fmtp:111 stereo=1\r\na=fmtp:111");
    },
    async createConnection(options) {
      options = {
        beforeAnswer() {},
        stereo: false,
        ...options,
      };
      const { beforeAnswer, stereo } = options;
      const response = await fetch(`${host}${prefix}/connections`, {
        method: "POST",
      });
      console.log("connections", response);
      const remotePeerConnection = await response.json();
      console.log("remotePeerConnection", remotePeerConnection);

      const { id } = remotePeerConnection;
      const localPeerConnection = new RTCPeerConnection({
        sdpSemantics: "unified-plan",
      });

      localPeerConnection.close = () => {
        this.recording = false;
        fetch(`${host}${prefix}/connections/${id}`, { method: "delete" })
          .then((res) => {
            console.log("-- close ---");
          })
          .catch((err) => {
            console.log("-- close  error ---", err);
          });
      };

      try {
        await localPeerConnection.setRemoteDescription(
          remotePeerConnection.localDescription
        );

        await beforeAnswer(localPeerConnection);
        this.recording = true;
        const originalAnswer = await localPeerConnection.createAnswer();
        const updatedAnswer = new RTCSessionDescription({
          type: "answer",
          sdp: stereo
            ? this.enableStereoOpus(originalAnswer.sdp)
            : originalAnswer.sdp,
        });
        await localPeerConnection.setLocalDescription(updatedAnswer);

        await fetch(`${host}${prefix}/connections/${id}/remote-description`, {
          method: "POST",
          body: JSON.stringify(localPeerConnection.localDescription),
          headers: { "Content-Type": "application/json" },
        });
        return localPeerConnection;
      } catch (error) {
        localPeerConnection.close();
        throw error;
      }
    },
    async startRecorder() {
      this.peerConnection = await this.createConnection({
        beforeAnswer: this.beforeAnswer,
      });
    },
    stopRecorder() {
      if (this.peerConnection) {
        this.peerConnection.close();
        // this.peerConnection = null;
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.videoContainer {

  video {
    height: 100%;
    width: 100%;
  }
}
</style>
