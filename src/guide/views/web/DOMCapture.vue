<template>
  <el-main>
    <el-row>
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

      <el-button size="small" type="danger" @click="publishPoster">发布海报</el-button>
    </el-row>
    <el-row>
      <!-- 编辑图 -->
      <div ref="poster" class="edit-poster" :style="imageStyle">
        <!-- <div ref="poster" :style="posterStyle"> -->
        <img ref="image" :src="image.url" @load="imageLoading" />
        <div class="qrcode-legend" :style="qrStyle" @mousedown="startMove"></div>
        <!-- </div> -->
      </div>
      <!-- 预览图 -->
      <div class="edit-poster" :style="imageStyle">
        <el-image :src="url"></el-image>
      </div>
    </el-row>
  </el-main>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
  name: "DOMCapture",
  data() {
    return {
      url: "",//预览图
      width: 400,
      image: {
        ratio: 1,
        url: null,
        width: 0,
        height: 0,
        clientWidth: 0,
        clientHeight: 0,
      },//背景图
      qrcode: {
        text: "",
        mouseDown: false,
        startX: 0,
        startY: 0,
        top: 0,
        left: 0,
        width: 80,
        height: 80
      },
    }
  },
  computed: {
    qrStyle() {
      return {
        top: this.qrcode.top + "px",
        left: this.qrcode.left + "px",
        width: this.qrcode.width + "px",
        height: this.qrcode.height + "px"
      }
    },
    posterStyle() {
      let scale = 1;
      if (this.image.width > this.image.clientWidth) {
        scale = this.image.clientWidth / this.image.width;
      }

      return {
        width: this.image.width + "px",
        height: this.image.width + "px"
      }
    },
    imageStyle() {
      return {
        width: this.image.clientWidth + "px",
        height: this.image.clientHeight + "px"
      }
    }
  },
  methods: {
    fileChangeHandle(file, fileList) {
      //   this.image.url = URL.createObjectURL(file.raw);
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.image.url = reader.result;
      });
      reader.readAsDataURL(file.raw);
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
    startMove(event) {
      event.preventDefault();
      this.qrcode.mouseDown = true;
      this.qrcode.top = event.currentTarget.offsetTop;
      this.qrcode.left = event.currentTarget.offsetLeft;
      this.qrcode.startX = event.clientX;
      this.qrcode.startY = event.clientY;
      document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
      document.addEventListener('mouseup', this.mouseUpHandler.bind(this), false);
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
      document.removeEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
      document.removeEventListener('mouseup', this.mouseUpHandler.bind(this), false);
    },
    publishPoster() {
      html2canvas(this.$refs.poster).then(canvas => {
        if (canvas) {
          this.url = canvas.toDataURL("image/png");
        }
      });
    }
  }
}
</script>
<style lang="stylus" scoped>
.file-upload {
  display: inline-block;
}

.edit-poster {
  position: relative;
  margin: 20px 30px;
  min-width: 400px;
  min-height: 140px;
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