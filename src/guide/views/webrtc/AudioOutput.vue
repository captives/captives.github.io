<template>
  <el-main class="center">
    <url-input v-model="url" :list="$videoList"></url-input>

    <video
      ref="localVideo"
      class="video-item"
      :src="url"
      controls
      loop
      autoplay
    ></video>

    <!-- 媒体设备列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="label" label="名称"></el-table-column>
      <el-table-column
        prop="kind"
        label="类型"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column prop="deviceId" label="设备ID"></el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="changeDevice(scope.row)"
            >选择</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-tag v-if="error" class="error" type="danger">{{ error }}</el-tag>

    <vue-source
      src="guide/views/webrtc/AudioOutput.vue"
      lang="html"
    ></vue-source>
  </el-main>
</template>
<script>
import StreamTracks from "./../../components/StreamTracks";
export default {
  name: "AudioOutput",
  components: { StreamTracks },
  data() {
    return {
      tableData: [],
      url: null,
      error: null,
    };
  },
  mounted() {
    navigator.mediaDevices
      .enumerateDevices()
      .then(this.gotDevices)
      .catch(this.handleError);
  },
  destroyed() {},
  methods: {
    gotDevices(deviceInfos) {
      deviceInfos.forEach((device) => {
        if (device.kind == "audiooutput") {
          this.tableData.push(device);
        }
      });
    },
    handleError(err) {
      this.error = err;
    },
    changeDevice(device) {
      console.log(device);
      const videoElement = this.$refs.localVideo;
      if (device.kind === "audiooutput") {
        this.playback(videoElement, device.deviceId);
      }
    },
    playback(videoElement, deviceId) {
      console.log(
        "videoElement",
        deviceId,
        videoElement.sinkId,
        typeof videoElement.sinkId
      );
      if (typeof videoElement.sinkId !== "undefined") {
        videoElement
          .setSinkId(deviceId)
          .then(() => {
            console.log(`Success, audio output device attached: ${deviceId}`);
          })
          .catch((error) => {
            let errorMessage = error;
            if (error.name === "SecurityError") {
              errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
            }
            console.error(errorMessage);
            // Use default device
          });
      } else {
        console.warn("Browser does not support output device selection.");
      }
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
