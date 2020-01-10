<template>
  <el-row>
    <ol v-if="srcElement">
      <li>title: {{srcElement.title}}</li>
      <li>dom size: {{srcElement.clientWidth}}x{{srcElement.clientHeight}}</li>
      <li>video size: {{srcElement.videoWidth}}x{{srcElement.videoHeight}}</li>
      <li>src: <el-link :href="srcElement.src" target="_blank">{{srcElement.src}}</el-link></li>
      <li>poster: {{srcElement.poster}}</li>
      <li>srcObject: {{srcElement.srcObject}}</li>
      <li>sinkId: {{srcElement.sinkId}}</li>
      <li>paused: {{srcElement.paused}}</li>

      <li>currentTime: {{currentTime}}</li>
      <li>duration: {{srcElement.duration}}</li>
      <li>autoplay: {{srcElement.autoplay}}</li>
      <li>loop: {{srcElement.loop}}</li>
      <li>muted: {{srcElement.muted}}</li>
      <li>volume: {{srcElement.volume}}</li>
      <li>controls: {{srcElement.controls}}</li>
      <li>webkitDecodedFrameCount: {{srcElement.webkitDecodedFrameCount}}</li>
      <li>webkitDroppedFrameCount: {{srcElement.webkitDroppedFrameCount}}</li>
      <li>webkitAudioDecodedByteCount: {{srcElement.webkitAudioDecodedByteCount}}</li>
      <li>webkitVideoDecodedByteCount: {{srcElement.webkitVideoDecodedByteCount}}</li>
    </ol>
  </el-row>
</template>
<script>
export default {
  name: "VideoMetaData",
  data() {
    return {
      video: null,
      loading: false,
      currentTime: 0,
      srcElement: null,
      info: null,
    }
  },
  methods: {
    listen(video) {
      this.video = video;
      if (video) {
        video.addEventListener('canplay', this.oncanplay);
        video.addEventListener('loadeddata', this.onloadedmetadata);
        video.addEventListener('loadedmetadata', this.onloadedmetadata);
        video.addEventListener('progress', this.onprogress);
        video.addEventListener('timeupdate', this.ontimeupdate);
        video.addEventListener('play', this.onplay);
      }
    },
    oncanplay(event) {
      this.srcElement = event.srcElement;
      console.log(this.srcElement.videoWidth, this.srcElement.videoHeight);
    },
    //成功获取资源长度
    onloadedmetadata(event) {
      this.loading = false;
      console.log('onloadedmetadata', event);
    },
    onplay(event) {
      this.loading = false;
      console.log('onplay', event);
    },
    onprogress(event) {
      this.loading = true;
    },
    ontimeupdate(event) {
      this.currentTime = event.target.currentTime;
    }
  },
  mounted() {

  },
}
</script>
<style lang="stylus" scoped>
.el-row {
  text-align: left;
}
</style>