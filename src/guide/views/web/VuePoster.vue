<template>
  <el-main>
    <el-row :gutter="50">
      <vue-canvas-poster
        :painting="painting"
        @success="success"
        @fail="fail"
      ></vue-canvas-poster>
      <el-col :span="12">
        <el-divider content-position="left">文本区域</el-divider>
        <el-upload
          class="file-upload"
          action="#"
          :on-change="fileChangeHandle"
          :auto-upload="false"
          accept=".png, .jpg, .jpeg, .bmp"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>

        <el-button size="small" type="danger" @click="publishPoster"
          >发布成品</el-button
        >
        <el-input v-model="qrcode.text" @change="qrcodeChange"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <!-- 编辑图 -->
      <div class="edit-poster" :style="imageStyle">
        <img ref="image" :src="image.url" @load="imageLoading" />
        <div
          class="qrcode-legend"
          :style="qrStyle"
          @mousedown="startMove"
        ></div>
      </div>
      <!-- 预览图 -->
      <div class="edit-poster" :style="imageStyle">
        <img ref="image" :src="url" />
      </div>
    </el-row>
  </el-main>
</template>
<script>
import { VueCanvasPoster } from "vue-canvas-poster";
export default {
  name: "VuePoster",
  components: {
    VueCanvasPoster,
  },
  data() {
    return {
      width: 400,
      image: {
        ratio: 1,
        url: null,
        width: 0,
        height: 0,
        clientWidth: 0,
        clientHeight: 0,
      }, //背景图
      qrcode: {
        text: "",
        mouseDown: false,
        startX: 0,
        startY: 0,
        top: 0,
        left: 0,
        width: 80,
        height: 80,
      },
      url: "", //预览图
      painting: null,
    };
  },
  computed: {
    qrStyle() {
      return {
        top: this.qrcode.top + "px",
        left: this.qrcode.left + "px",
        width: this.qrcode.width + "px",
        height: this.qrcode.height + "px",
      };
    },
    imageStyle() {
      return {
        width: this.image.clientWidth + "px",
        height: this.image.clientHeight + "px",
      };
    },
  },
  mounted() {},
  methods: {
    fileChangeHandle(file, fileList) {
      console.log(file);
      this.image.url = URL.createObjectURL(file.raw);
    },
    imageLoading(event) {
      const el = new Image();
      el.src = this.image.url;
      console.log(el.src);
      this.image.width = el.width;
      this.image.height = el.height;
      console.log(el.width, el.height, event);

      let ratio = 1;
      if (el.width > this.width) {
        ratio = el.width / this.width;
        this.image.clientWidth = this.width;
        this.image.ratio = ratio;
      }

      this.image.clientWidth = el.width / ratio;
      this.image.clientHeight = el.height / ratio;
      console.log(this.image);
    },
    publishPoster() {
      this.painting = {
        width: this.image.width + "px",
        height: this.image.height + "px",
        background: "#f4f5f7",
        views: [
          {
            type: "image",
            url: this.image.url,
            css: {
              top: "0px",
              left: "0px",
              borderRadius: "10px",
              width: this.image.width + "px",
              height: this.image.height + "px",
            },
          },
          {
            type: "qrcode",
            content: window.location.href,
            css: {
              top: this.qrcode.top * this.image.ratio + "px",
              left: this.qrcode.left * this.image.ratio + "px",
              borderRadius: "5px",
              width: this.qrcode.width * this.image.ratio + "px",
              height: this.qrcode.height * this.image.ratio + "px",
            },
          },
        ],
      };
    },
    qrcodeChange() {
      if (this.painting) {
        this.painting.views.forEach((item) => {
          if (item.type == "qrcode") {
            item.content = this.qrcode.text;
          }
        });
      }
    },
    success(src) {
      this.url = src;
    },
    fail(err) {
      console.log("fail", err);
    },
    startMove(event) {
      event.preventDefault();
      this.qrcode.mouseDown = true;
      this.qrcode.top = event.currentTarget.offsetTop;
      this.qrcode.left = event.currentTarget.offsetLeft;
      this.qrcode.startX = event.clientX;
      this.qrcode.startY = event.clientY;
      document.addEventListener(
        "mousemove",
        this.mouseMoveHandler.bind(this),
        false
      );
      document.addEventListener(
        "mouseup",
        this.mouseUpHandler.bind(this),
        false
      );
    },
    mouseMoveHandler(event) {
      if (this.qrcode.mouseDown) {
        const x = event.clientX - this.qrcode.startX;
        const y = event.clientY - this.qrcode.startY;

        this.qrcode.top += y;
        this.qrcode.left += x;

        this.qrcode.startX = event.clientX;
        this.qrcode.startY = event.clientY;
      }
    },
    mouseUpHandler(event) {
      this.qrcode.mouseDown = false;
      document.removeEventListener(
        "mousemove",
        this.mouseMoveHandler.bind(this),
        false
      );
      document.removeEventListener(
        "mouseup",
        this.mouseUpHandler.bind(this),
        false
      );
    },
  },
};
</script>
<style lang="stylus" scoped>

.file-upload {
  display: inline-block;
}

.edit-poster {
  position: relative;
  margin: 20px 30px;
  min-width: 480px;
  min-height: 640px;
  background: #DEDEDE;
  display: inline-block;

  img {
    width: 100%;
    height: 100%;
  }

  .qrcode-legend {
    position: absolute;
    width: 80px;
    height: 80px;
    background: #fff;
    display: block;
    border: 1px #00f solid;
    top: 10px;
    left: 50px;
    cursor: move;
  }
}
</style>
