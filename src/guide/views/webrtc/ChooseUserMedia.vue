<template>
  <el-main class="center">
    <video ref="localVideo" class="video-item" autoplay></video>

    <!-- 媒体设备列表 -->
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="label" label="名称"></el-table-column>
      <el-table-column label="类型" width="100" align="center">
        <template slot-scope="scope">{{deviceLabel[scope.row.kind]}}</template>
      </el-table-column>
      <el-table-column prop="deviceId" label="设备ID"></el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="changeDevice(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 媒体流轨道 -->
    <StreamTracks v-model="localStream"></StreamTracks>

    <el-tag v-if="error" class="error" type="danger">{{ error }}</el-tag>

    <vue-source src="guide/views/webrtc/ChooseUserMedia.vue" lang="html"></vue-source>
  </el-main>
</template>
<script>
import StreamTracks from "./../../components/StreamTracks";
export default {
  name: "ChooseUserMedia",
  components: { StreamTracks },
  data() {
    return {
      tableData: [],
      deviceLabel: {
        audioinput: "音频输入",
        audiooutput: "音频输出",
        videoinput: "视频输入"
      },
      selectDevice: {
        audioinput: null,
        audiooutput: null,
        videoinput: null
      },
      localStream: null,
      options: {
        audio: true,
        video: {
          width: { exact: 720 },
          height: { exact: 405 }
        }
      },
      error: null
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      return "row-" + row.kind;
    },
    gotDevices(deviceInfos) {
      this.tableData = deviceInfos;
    },
    handleError(err) {
      this.error = err;
    },
    changeDevice(device) {
      const videoElement = this.$refs.localVideo;
      if (device.kind === 'audiooutput') {
        const deviceId = this.selectDevice.audiooutput ? this.selectDevice.audiooutput.deviceId : undefined;
        this.playback(videoElement, deviceId);
      } else {
        this.selectDevice[device.kind] = device.deviceId;
        this.start(videoElement);
      }
    },
    start(videoElement) {
      const audioSource = this.selectDevice.audioinput;
      const videoSource = this.selectDevice.videoinput;
      const constraints = {
        //mode A
        // audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
        // video: { deviceId: videoSource ? { exact: videoSource } : undefined }

        //mode B
        audio: audioSource ? { deviceId: { exact: audioSource } } : false,
        video: videoSource ? { deviceId: { exact: videoSource } } : false
      };

      console.log("constraints", constraints);
      this.closeDevice();

      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        this.localStream = stream;
        stream.oninactive = function () {
          console.log("Stream inactive");
        };

        videoElement.addEventListener("loadedmetadata", e => {
          console.log("AudioTracks", stream.getAudioTracks());
          console.log("VideoTracks", stream.getVideoTracks());
        });

        videoElement.srcObject = stream;
      }).catch(function (error) {
        that.error = error;
        console.log("navigator.getUserMedia error: ", error);
      });
    },
    playback(videoElement, deviceId) {
      console.log('videoElement', deviceId, videoElement.sinkId, typeof videoElement.sinkId);
      if (typeof videoElement.sinkId !== 'undefined') {
        videoElement.setSinkId(deviceId).then(() => {
          console.log(`Success, audio output device attached: ${deviceId}`);
        }).catch(error => {
          let errorMessage = error;
          if (error.name === 'SecurityError') {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          // Use default device
        });
      } else {
        console.warn('Browser does not support output device selection.');
      }
    },
    closeDevice() {
      this.localStream && this.localStream.getTracks().forEach(track => {
        track.stop();
      });
    }
  },
  mounted() {
    navigator.mediaDevices.enumerateDevices().then(this.gotDevices).catch(this.handleError);
  },
  destroyed() {
    this.closeDevice();
  }
};
</script>
<style lang="stylus">
.row-videoinput {
  background-color: #f0f9eb !important;
}
</style>
<style lang="stylus" scoped>
.video-item {
  height: 270px;
  width: 480px;
  background: #333;
  margin-right: 10px;
}
</style>