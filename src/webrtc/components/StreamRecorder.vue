<template>
  <el-row>
    <video ref="playVideo" class="video-item" autoplay></video>

    <el-row class="center" v-if="stream">
      <el-col v-if="recording">
        <el-tag type="danger">Rec ....</el-tag>
        <el-button type="danger" @click="stopRecoder" size="mini">停止录制</el-button>
      </el-col>

      <el-col v-else>
        <el-button type="primary" @click="play" size="mini">播放流</el-button>
        <el-button type="success" @click="startRecoding" size="mini">开始录制</el-button>
        <el-button v-if="recordBlobs.length" type="danger" @click="downloadfile" size="mini">下载视频</el-button>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
export default {
  name: "StreamRecorder",
  props: {
    stream: { type: MediaStream }
  },
  data() {
    return {
      recordBlobs: [],
      recording: false,
      mediaRecorder: null,
      error: null
    }
  },
  methods: {
    play() {
      const player = this.$refs.playVideo;
      player.addEventListener('loadedmetadata', (e) => {
        console.log("AudioTracks", this.stream.getAudioTracks());
        console.log("VideoTracks", this.stream.getVideoTracks());
      });

      player.autoplay = true;
      player.srcObject = this.stream;
    },
    startRecoding() {
      this.play();
      this.recordBlobs = [];
      var options = { mimeType: 'video/webm;codecs=vp9' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = { mimeType: 'video/webm;codecs=vp8' };

        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.log(options.mimeType + ' is not Supported');
          options = { mimeType: 'video/webm' };

          if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            console.log(options.mimeType + ' is not Supported');
            options = { mimeType: '' };
          }
        }
      }

      try {
        this.mediaRecorder = new MediaRecorder(this.stream, options);
      } catch (e) {
        alert('Exception while creating MediaRecorder: ' + e + '. mimeType: ' + options.mimeType);
      }

      console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
      this.mediaRecorder.onstart = (event) => {
        this.recording = true;
      };

      this.mediaRecorder.onstop = (event) => {
        this.recording = false;
        console.log('Recorder stopped: ', event);
      };

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordBlobs.push(event.data);
        }
      };

      this.mediaRecorder.onerror = event => {
        this.error = event;
      }

      this.mediaRecorder.start(10); // 数据收集10ms
      console.log('MediaRecorder started', this.mediaRecorder);
    },
    playRecoder() {
      //播放
      const video = this.$refs.playVideo;
      if (!video.pause) {
        video.stop();
        video.src = null;
        video.srcObject = null;
      }

      video.addEventListener('loadedmetadata', event => {
        console.log("loadedmetadata", video.currentTime, video.duration);
        if (video.duration === Infinity) {
          video.currentTime = 1e101;
          video.ontimeupdate = function () {
            video.currentTime = 0;
            video.ontimeupdate = function () {
              delete video.ontimeupdate;
              video.play();
            };
          };
        }
      });

      if (this.recordBlobs && this.recordBlobs.length) {
        const blob = new Blob(this.recordBlobs, { type: 'video/webm' });
        video.src = window.URL.createObjectURL(blob);
        video.play();
      }
    },
    stopRecoder() {
      if (this.mediaRecorder && this.recording) {
        this.mediaRecorder.stop();
      }

      this.playRecoder();
    },
    downloadfile() {
      if (this.recordBlobs && this.recordBlobs.length) {
        const blob = new Blob(this.recordBlobs, { type: 'video/webm' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Rec_' + Date.now() + '.webm';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          this.recordBlobs = [];
        }, 100);
      }
    },
    close() {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }
}
</script>
<style lang="stylus" scoped>
.video-item {
  background: #999;
  height: 270px;
  background: #333;
  margin-right: 10px;
}
</style>