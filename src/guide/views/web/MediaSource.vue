<template>
  <el-main class="center">
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Video Player</el-divider>
        <video ref="localVideo" class="video-item"></video>
        <el-progress :percentage="percentage"></el-progress>
      </el-col>
    </el-row>

    <el-tag v-if="error" class="error" type="danger">{{ error }}</el-tag>
  </el-main>
</template>
<script>
export default {
  name: "MediaSource",
  data() {
    return {
      mimeCodec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
      mediaSource: null,
      percentage: 0,
      error: null
    }
  },
  methods: {
    fetch(url) {
      return new Promise((resolve, reject) => {
        console.log('fetch', url);
        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.responseType = 'arraybuffer';
        xhr.onloadstart = () => this.percentage = 0;
        xhr.onload = () => {
          this.percentage = 100;
          resolve(xhr.response);
        }

        xhr.onprogress = (e) => {
          this.percentage = Math.round(e.loaded * 100 / e.total);
        };
        xhr.send();
      });
    },
    init() {
      const that = this;
      const video = this.$refs.localVideo;
      // Need to be specific for Blink regarding codecs
      // ./mp4info frag_bunny.mp4 | grep Codec
      if ('MediaSource' in window && MediaSource.isTypeSupported(this.mimeCodec)) {
        this.mediaSource = new MediaSource();
        console.log('1, mediaSource.readyState', this.mediaSource.readyState);
        video.src = URL.createObjectURL(this.mediaSource);
        this.mediaSource.addEventListener('sourceopen', () => {
          console.log('2, mediaSource.readyState', that.mediaSource.readyState);
          let sourceBuffer = that.mediaSource.addSourceBuffer(that.mimeCodec);
          that.fetch('/medias/musicvideo.mp4').then(buf => {
            sourceBuffer.addEventListener('updateend', () => {
              console.log('4, mediaSource.readyState', that.mediaSource.readyState);
              that.mediaSource.endOfStream();
              video.play();
            });
            sourceBuffer.appendBuffer(buf);
            console.log('3, mediaSource.readyState', that.mediaSource.readyState);
          });
        });
      } else {
        console.log('不支持MIME类型编解码', this.mimeCodec);
      }
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style lang="stylus" scoped>
.video-item {
  height: 270px;
  min-width: 480px;
  background: #999;
}
</style>