<template>
  <el-main class="center">
    <url-input v-model="url" :list="$videoList"></url-input>
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Video</el-divider>
        <video ref="localVideo" class="video-item" :src="url" controls muted loop autoplay></video>
      </el-col>

      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Canvas</el-divider>
        <canvas ref="canvas" class="video-item" @mousemove="canvasMouseMove"></canvas>
        <el-row>
          行
          <el-input-number v-model="row" :min="1" :max="10" size="small"></el-input-number>列
          <el-input-number v-model="column" :min="1" :max="10" size="small"></el-input-number>
        </el-row>
      </el-col>

      <el-col class="center" :xs="24" :sm="24" :md="12" v-if="image">
        <el-divider content-position="left">Image</el-divider>
        <img ref="img" class="video-item" :src="image" />
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">MetaData</el-divider>
        <VideoMetaData ref="videoMedata"></VideoMetaData>
      </el-col>
    </el-row>
    <vue-source src="webrtc/views/canvas/DrawVideoSplicing.vue" lang="html"></vue-source>
  </el-main>
</template>
<script>
import VideoMetaData from './../../components/VideoMetaData.vue'
export default {
  name: "DrawVideoSplicing",
  components: {
    VideoMetaData
  },
  data() {
    return {
      url: "",
      context: null,
      row: 2,
      column: 2,
      image: null,
      pixsColor: null,
    }
  },
  methods: {
    init(event) {
      let canvas = this.$refs.canvas;
      if (canvas) {
        canvas.setAttribute('width', event.target.offsetWidth * 2);
        canvas.setAttribute('height', event.target.offsetHeight * 2);
        this.context = canvas.getContext("2d");
        this.animate();
      }
    },
    drawLine(x, y, tx, ty, width) {
      // for (var i = 1; i < this.column; i++) {
      //   this.drawLine(i * drawWidth, 0, i * drawWidth, canvas.height);
      // }

      // for (var k = 1; k < this.row; k++) {
      //   this.drawLine(0, k * drawHeight, canvas.width, k * drawHeight);
      // }

      width = width || 2;
      this.context.beginPath();
      this.context.moveTo(x - width / 2, y);
      this.context.lineTo(tx - width / 2, ty);
      this.context.lineWidth = width;
      this.context.strokeStyle = "#FFF";
      this.context.stroke();
    },
    drawText(x, y, text) {
      this.context.font = "32px 微软雅黑";
      this.context.fillStyle = "#FFF";
      this.context.fillText('video ' + text, x, y);
    },
    animate() {
      let source = this.$refs.localVideo;
      let canvas = this.$refs.canvas;
      if (source) {
        const sourceWidth = Math.floor(source.videoWidth / this.column); //单个元素的宽
        const sourceHeight = Math.floor(source.videoHeight / this.row);//单个元素的高

        const drawWidth = Math.floor(canvas.width / this.column); //单个元素的宽
        const drawHeight = Math.floor(canvas.height / this.row);//单个元素的高

        this.context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < this.column; i++) { //逐列
          for (var k = 0; k < this.row; k++) { //逐行
            this.context.drawImage(source,
              i * sourceWidth, k * sourceHeight, sourceWidth, sourceHeight,
              i * drawWidth + 1, k * drawHeight + 1, drawWidth - 1, drawHeight - 1,
            );

            this.drawText((i + 1) * drawWidth - 150, k * drawHeight + 50, k * this.column + i + 1);
          }
        }

        //获取区域数据像素操作
        // this.image = this.context.getImageData(0, 0, canvas.width, canvas.height);

        //base64
        // this.image = canvas.toDataURL("image/png");

        // 直接用canvas将画布上的图片转为blob,不需要经过base64
        // canvasElement.toBlob(callback, type, encoderOptions); 
        // 参数1为转换后的回调，回调参数为转换后的blob;必选
        // 参数2为指定图片格式，默认为image/png，即png；可为image/jpeg或者image/webp；可选
        // 参数3为值在0与1之间的数值，当请求图片格式为image/jpeg或者image/webp时用来指定图片展示质量; 可选
        // canvas.toBlob((blob) => {
        //   this.image = window.URL.createObjectURL(blob)
        // });

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
    canvasMouseMove(event) {
      // let {data} = this.context.getImageData(event.offsetX, event.offsetY, 8, 8);
      // console.log(data);
    }
  },
  mounted() {
    let video = this.$refs.localVideo;
    this.$refs.videoMedata.listen(video);
    video.addEventListener('canplay', this.init);
  },
}
</script>

<style lang="stylus" scoped>
.video-item {
  width: 720px;
  height: 405px;
  background: #333;
}
</style>