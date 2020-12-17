<template>
  <el-main class="center">
    <url-input v-model="url" :list="$videoList"></url-input>
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Video</el-divider>
        <video
          ref="localVideo"
          class="video-item"
          :src="url"
          controls
          muted
          loop
          autoplay
        ></video>
      </el-col>

      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Canvas</el-divider>
        <canvas ref="draw" class="video-item"></canvas>
        <el-row>
          行
          <el-input-number
            v-model="row"
            :min="1"
            :max="10"
            size="small"
          ></el-input-number
          >列
          <el-input-number
            v-model="column"
            :min="1"
            :max="10"
            size="small"
          ></el-input-number>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col class="center" :xs="12" :sm="12" :md="6">
        <el-divider content-position="left">MetaData</el-divider>
        <VideoMetaData ref="videoMedata"></VideoMetaData>
      </el-col>
      <el-col class="center" :xs="12" :sm="12" :md="6">
        <el-divider content-position="left">RGB</el-divider>
        <el-row>
          <el-slider
            v-model="color.R"
            :min="0"
            :max="255"
            show-input
            label="R"
          ></el-slider>
          <el-slider
            v-model="color.G"
            :min="0"
            :max="255"
            show-input
            label="G"
          ></el-slider>
          <el-slider
            v-model="color.B"
            :min="0"
            :max="255"
            show-input
            label="B"
          ></el-slider>
        </el-row>
      </el-col>

      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Compose</el-divider>
        <canvas ref="compose" class="video-item"></canvas>
      </el-col>
    </el-row>

    <vue-source
      src="guide/views/canvas/DrawVideoGreenScreen.vue"
      lang="html"
    ></vue-source>
  </el-main>
</template>
<script>
import VideoMetaData from "./../../components/VideoMetaData.vue";
export default {
  name: "DrawVideoSplicing",
  components: {
    VideoMetaData,
  },
  data() {
    return {
      url: null,
      context: null,
      context2: null,
      row: 2,
      column: 2,
      width: 0,
      height: 0,
      color: { R: 10, G: 35, B: 200 },
    };
  },
  mounted() {
    let video = this.$refs.localVideo;
    this.$refs.videoMedata.listen(video);
    video.addEventListener("canplay", this.init);
    this.url = this.$videoList[this.$videoList.length - 1].value;
  },
  methods: {
    init(event) {
      let canvas = this.$refs.draw;
      if (canvas) {
        this.width = event.target.offsetWidth * 2;
        this.height = event.target.offsetHeight * 2;
        canvas.setAttribute("width", this.width);
        canvas.setAttribute("height", this.height);
        this.context = canvas.getContext("2d");

        let canvas2 = this.$refs.compose;
        canvas2.setAttribute("width", this.width);
        canvas2.setAttribute("height", this.height);
        this.context2 = canvas2.getContext("2d");

        this.animate();
      }
    },
    drawText(x, y, text) {
      this.context.font = "32px 微软雅黑";
      this.context.fillStyle = "#FFF";
      this.context.fillText("video " + text, x, y);
    },
    animate() {
      let source = this.$refs.localVideo;
      let canvas = this.$refs.draw;
      if (source) {
        const sourceWidth = Math.floor(source.videoWidth / this.column); //单个元素的宽
        const sourceHeight = Math.floor(source.videoHeight / this.row); //单个元素的高

        const drawWidth = Math.floor(canvas.width / this.column); //单个元素的宽
        const drawHeight = Math.floor(canvas.height / this.row); //单个元素的高

        this.context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < this.column; i++) {
          //逐列
          for (var k = 0; k < this.row; k++) {
            //逐行
            this.context.drawImage(
              source,
              i * sourceWidth,
              k * sourceHeight,
              sourceWidth,
              sourceHeight,
              i * drawWidth + 1,
              k * drawHeight + 1,
              drawWidth - 1,
              drawHeight - 1
            );

            this.drawText(
              (i + 1) * drawWidth - 150,
              k * drawHeight + 50,
              k * this.column + i + 1
            );
          }
        }

        this.videoPost(this.context, this.context2);

        if ("requestAnimationFrame" in window) {
          requestAnimationFrame(this.animate);
        } else if ("webkitRequestAnimationFrame" in window) {
          webkitRequestAnimationFrame(this.animate);
        } else if ("msRequestAnimationFrame" in window) {
          msRequestAnimationFrame(this.animate);
        } else if ("mozRequestAnimationFrame" in window) {
          mozRequestAnimationFrame(this.animate);
        }
      }
    },
    videoPost(source, target) {
      let frame = source.getImageData(0, 0, this.width, this.height);
      let l = frame.data.length / 4;

      for (let i = 0; i < l; i++) {
        let r = frame.data[i * 4 + 0];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];

        if (r > this.color.R && g > this.color.G && b < this.color.B) {
          frame.data[i * 4 + 3] = 0;
        }
      }

      target.putImageData(frame, 0, 0);
    },
  },
};
</script>

<style lang="stylus" scoped>
.video-item {
  width: 720px;
  height: 405px;
  background: #333;
}
</style>
