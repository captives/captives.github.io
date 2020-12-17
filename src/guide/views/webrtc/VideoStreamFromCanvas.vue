<template>
  <el-main>
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Canvas</el-divider>
        <div ref="chart" class="video-item"></div>
      </el-col>
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Capture</el-divider>
        <video ref="playVideo" class="video-item" autoplay muted></video>
      </el-col>
    </el-row>

    <StreamTracks v-model="stream"></StreamTracks>

    <vue-source
      src="guide/views/webrtc/VideoStreamFromCanvas.vue"
      lang="html"
    ></vue-source>
  </el-main>
</template>
<script>
import StreamTracks from "./../../components/StreamTracks";
export default {
  name: "VideoStreamFromCanvas",
  components: {
    StreamTracks,
  },
  data() {
    return {
      chart: null,
      stream: null,
    };
  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.chart);
    var data = { value: 50, name: "Use" };
    this.drawCanvas(data);
    setInterval(() => {
      data.value = (Math.random() * 100).toFixed(2) - 0;
      this.drawCanvas(data);
    }, 1000);

    this.oncanplay(this.$refs.chart);
  },
  destroyed() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  },
  methods: {
    drawCanvas(data) {
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "CPU",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [data],
          },
        ],
      };

      this.chart.setOption(option);
      window.onresize = this.chart.resize;
    },
    oncanplay(dom) {
      const player = this.$refs.playVideo;
      const canvas = dom.querySelector("canvas");
      if (canvas) {
        this.stream = canvas.captureStream();

        player.addEventListener("loadedmetadata", (e) => {
          console.log("AudioTracks", this.stream.getAudioTracks());
          console.log("VideoTracks", this.stream.getVideoTracks());
        });

        player.autoplay = true;
        player.srcObject = this.stream;
        if (player.paused) {
          player.play();
        } else {
          player.pause();
        }
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.el-main {
  overflow: hidden;
}

.video-item {
  height: 360px;
  max-width: 720px;
  background: #eee;
  margin-right: 10px;
}
</style>
