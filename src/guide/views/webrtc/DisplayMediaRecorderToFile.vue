<template>
  <el-main class="center">
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">预览</el-divider>
        <video
          class="video-item"
          :srcObject.prop="localStream"
          autoplay
        ></video>
      </el-col>
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">录制</el-divider>
        <el-form :model="form" label-width="100px">
          <el-form-item label="文件名">
            <el-input
              v-model="form.name"
              clearable
              :disabled="form.connected"
            ></el-input>
          </el-form-item>
          <el-form-item label="服务器地址">
            <el-input v-model="form.url" clearable :disabled="form.connected">
              <el-button
                slot="append"
                :icon="form.connected ? 'el-icon-connection' : 'el-icon-link'"
                @click="runWebSocket"
              ></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="recording" type="danger" @click="stopRecorder"
              >停止录制</el-button
            >
            <el-button v-else type="success" @click="startRecorder"
              >开启录制</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <StreamTracks v-model="localStream"></StreamTracks>
    <el-tag v-if="error" class="error" type="danger">{{ error }}</el-tag>
  </el-main>
</template>
<script>
import StreamTracks from "./../../components/StreamTracks";
export default {
  name: "DisplayMediaRecorder",
  components: { StreamTracks },
  data() {
    return {
      form: {
        connected: false,
        name: "Recorder",
        url: "wss://local.uuabc.com:2020",
      },
      socket: null,
      localStream: null,
      options: {
        audio: true,
        video: {
          width: { exact: 720 },
          height: { exact: 405 },
        },
      },
      recording: false,
      mediaRecorder: null,
      error: null,
    };
  },
  destroyed() {
    //recorder-core
    // 录音默认输出mp3格式，另外可选wav格式；有限支持ogg(beta)、webm(beta)、amr(beta)格式；
    // 支持任意格式扩展（前提有相应编码器）
  },
  methods: {
    runWebSocket() {
      if ("WebSocket" in window) {
        if (this.form.connected) {
          this.socket.close();
          this.socket = null;
          this.form.connected = false;
        } else {
          var ws = (this.socket = new WebSocket(this.form.url));
          ws.onopen = () => {
            this.form.connected = true;
            ws.send(
              JSON.stringify({ event: "register", name: this.form.name })
            );
          };

          ws.onmessage = (event) => {};

          ws.onclose = () => {
            this.form.connected = false;
          };
        }
      } else {
        alert("您的浏览器不支持 WebSocket!");
      }
    },
    sendMessage(data) {
      //数据传递，这里通过socket传递到服务器上
      console.log(data);
      if (this.form.connected) {
        this.socket.send(JSON.stringify(data));
      }
    },
    startRecorder() {
      const that = this;
      return new Promise((resolve, reject) => {
        //启动媒体设备
        this.getDisplayMedia()
          .then((stream) => {
            this.localStream = stream;
            stream.oninactive = function () {
              this.recording = false;
              console.log("媒体流关闭 - 停止录制");
            };

            this.startRecoding(stream);
            resolve(stream);
          })
          .catch(function (error) {
            that.error = error;
            console.log("navigator.getUserMedia error: ", error);
            reject(error);
          });
      });
    },
    getDisplayMedia() {
      if (navigator.getDisplayMedia) {
        return navigator.getDisplayMedia({ video: true, audio: true });
      } else if (navigator.mediaDevices.getDisplayMedia) {
        return navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
      } else {
        return navigator.mediaDevices.getUserMedia({
          video: { mediaSource: "screen" },
          audio: true,
        });
      }
    },
    startRecoding(stream) {
      var options = { mimeType: "video/webm;codecs=h264" };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + " is not Supported");
        options = { mimeType: "video/webm;codecs=vp9" };

        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.log(options.mimeType + " is not Supported");
          options = { mimeType: "video/webm;codecs=vp8" };

          if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.log(options.mimeType + " is not Supported");
            options = { mimeType: "video/webm" };

            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
              console.log(options.mimeType + " is not Supported");
              options = { mimeType: "" };
            }
          }
        }
      }

      try {
        console.log("Recorder", options);
        this.mediaRecorder = new MediaRecorder(stream, options);
      } catch (e) {
        alert(
          "Exception while creating MediaRecorder: " +
            e +
            ". mimeType: " +
            options.mimeType
        );
      }

      console.log(
        "Created MediaRecorder",
        this.mediaRecorder,
        "with options",
        options
      );
      this.mediaRecorder.onstart = (event) => {
        this.recording = true;
        this.sendMessage({
          event: "START_REC_BLOB",
          uid: "user.id",
        });
      };

      this.mediaRecorder.onstop = (event) => {
        this.recording = false;
        this.sendMessage({
          event: "STOP_REC_BLOB",
          uid: "user.id",
        });
        console.log("Recorder stopped: ", event);
      };

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          const reader = new FileReader();
          reader.onerror = (error) => {
            console.error("媒体流转换到blob数据失败", error);
          };

          reader.onloadend = () => {
            this.sendMessage({
              event: "REC_BLOB",
              blob: reader.result,
              uid: "user.id",
            });
          };

          reader.readAsBinaryString(event.data);
        }
      };

      this.mediaRecorder.onerror = (event) => {
        this.error = event;
      };

      this.mediaRecorder.start(200); // 数据收集200ms
      console.log("MediaRecorder started", this.mediaRecorder);
    },
    stopRecorder() {
      if (this.mediaRecorder && this.recording) {
        this.mediaRecorder.stop();
      }

      this.localStream.getTracks().forEach((track) => track.stop());
    },
  },
};
</script>
<style lang="stylus" scoped>
.video-item {
  height: 270px;
  width: 480px;
  background: #333;
  margin-right: 10px;
}
</style>
