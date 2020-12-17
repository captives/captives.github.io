<template>
  <el-main>
    <!-- 在线例子 https://fengyuanchen.github.io/cropperjs/ -->
    <!-- vue版本 https://agontuk.github.io/vue-cropperjs/ -->
    <el-row :gutter="20">
      <el-col class="center" :xs="24" :sm="24" :md="12" style="height: 480px">
        <el-divider content-position="left">编辑</el-divider>
        <div class="viewport">
          <img ref="imageElement" src="/assets/image.jpg" />
        </div>

        <el-row class="center" style="padding-top: 2em">
          <el-button
            icon="el-icon-picture"
            type="success"
            size="mini"
            @click="setAspectRatio('4:3')"
            >4:3</el-button
          >
          <el-button
            icon="el-icon-picture"
            type="success"
            size="mini"
            @click="setAspectRatio('1:1')"
            >1:1</el-button
          >
          <el-button
            icon="el-icon-picture"
            type="success"
            size="mini"
            @click="setAspectRatio('2:3')"
            >2:3</el-button
          >
          <el-button
            icon="el-icon-picture"
            type="success"
            size="mini"
            @click="setAspectRatio('16:9')"
            >16:9</el-button
          >

          <el-button
            icon="el-icon-tickets"
            size="mini"
            type="primary"
            @click="setCropBoxWidthHander(800)"
            >800xAuto</el-button
          >
          <el-button
            icon="el-icon-tickets"
            size="mini"
            type="primary"
            @click="setCropBoxWidthHander(400)"
            >400xAuto</el-button
          >
        </el-row>

        <el-row class="center" style="padding-top: 2em">
          <el-button
            type="primary"
            icon="el-icon-refresh-left"
            size="mini"
            @click="rotateHandler(90)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            size="mini"
            @click="rotateHandler(-90)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-zoom-in"
            size="mini"
            @click="changeScale(0.2)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-zoom-out"
            size="mini"
            @click="changeScale(-0.2)"
          ></el-button>

          <el-button
            type="primary"
            icon="el-icon-back"
            size="mini"
            @click="moveHandler(-10, 0)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-right"
            size="mini"
            @click="moveHandler(10, 0)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-top"
            size="mini"
            @click="moveHandler(0, -10)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-bottom"
            size="mini"
            @click="moveHandler(0, 10)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-sort"
            size="mini"
            class="vertical"
            @click="flipHHandler"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-sort"
            size="mini"
            @click="flipVHandler"
          ></el-button>
        </el-row>
        <el-row class="center" style="padding-top: 2em">
          <input
            ref="input"
            type="file"
            name="image"
            hidden
            accept="image/*"
            @change="fileChangeHandler"
          />
          <el-button
            type="primary"
            icon="el-icon-picture"
            @click="selectFileHandler"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-delete"
            @click="clearHandler"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            @click="resetHandler"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-crop"
            @click="previewHandler"
          ></el-button>
        </el-row>
      </el-col>

      <el-col class="center" :xs="24" :sm="24" :md="6">
        <el-divider content-position="left">实时预览</el-divider>
        <div class="view-item" style="height: 170px">
          <div class="img-preview preview-lg"></div>
          <div class="img-preview preview-md"></div>
          <div class="img-preview preview-sm"></div>
          <div class="img-preview preview-xs"></div>
        </div>

        <el-divider content-position="left">截图预览</el-divider>
        <div class="view-item">
          <el-image :src="src" class="view-item"></el-image>
          <p v-for="(item, key) in outputData" :key="'opt' + key">
            {{ key }} : {{ item }}
          </p>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="6">
        <el-divider content-position="left">Image Data</el-divider>
        <p v-for="(item, key) in imageData" :key="'img' + key">
          {{ key }} : {{ item | fixed2 }}
        </p>

        <el-divider content-position="left">Canvas Data</el-divider>
        <p v-for="(item, key) in canvasData" :key="'cav' + key">
          {{ key }} : {{ item | fixed2 }}
        </p>
        <el-divider content-position="left">CropBox Data</el-divider>
        <p v-for="(item, key) in cropBoxData" :key="'crop' + key">
          {{ key }} : {{ item | fixed2 }}
        </p>
      </el-col>
      <source-code
        :value="[{ value: 'guide/views/web/VueCropperjs.vue', lang: 'html' }]"
        >查看源码</source-code
      >
    </el-row>
  </el-main>
</template>
<script>
//另参见 https://github.com/Agontuk/vue-cropperjs
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

import { calcBase64Size, byteConver } from "@/plugins/common.js";
export default {
  name: "VueCropperjs",
  filters: {
    fixed2(value) {
      return ~~(value * 100) / 100;
      // return value.toFixed(2);
    },
  },
  data() {
    return {
      src: null,
      scaleX: 1,
      scaleY: 1,
      cropper: null,
      imageData: {},
      canvasData: {},
      cropBoxData: {},
      outputData: {},
    };
  },
  mounted() {
    const that = this;
    this.cropper = new Cropper(this.$refs.imageElement, {
      aspectRatio: 16 / 9,
      viewMode: 1,
      dragMode: "move",
      preview: ".img-preview",
      movable: true, //启用移动图像
      guides: false, //裁剪框上显示虚线
      center: false, //裁剪框上到中心指示器
      autoCrop: false, //自动裁切
      zoomOnWheel: true, //是否允许通过鼠标滚轮来缩放图片
      background: true, //是否在容器上显示网格背景
      rotatable: true, //是否允许旋转图片
      ready() {
        console.log("image loaded");
        // this.cropper.setCropBoxData(data);
        //开始裁剪
        that.cropper.crop();
      },
      cropstart: function (e) {
        console.log(e.type, e.detail.action);
      },
      cropmove: function (e) {
        console.log(e.type, e.detail.action);
      },
      cropend: function (e) {
        console.log(e.type, e.detail.action);
        that.previewHandler();
      },
      crop(event) {
        that.previewImageHandler();
      },
    });
  },
  methods: {
    selectFileHandler(event) {
      this.$refs.input.click();
    },
    fileChangeHandler(event) {
      console.log(event);
      let file = event.target.files[0];
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    clearHandler() {
      this.cropper.clear();
    },
    setAspectRatio(value) {
      let arr = value.split(":");
      this.cropper.setAspectRatio(arr[0] / arr[1]);
    },
    rotateHandler(val) {
      this.cropper.rotate(val);
      //   指定角度
      //   this.cropper.rotateTo(val);
    },
    changeScale(val) {
      this.cropper.zoom(val);
    },
    moveHandler(offsetX, offsetY) {
      this.cropper.move(offsetX, offsetY);
    },
    flipHHandler() {
      this.scaleX = -this.scaleX;
      this.cropper.scale(this.scaleX, this.scaleY);
    },
    flipVHandler() {
      this.scaleY = -this.scaleY;
      this.cropper.scale(this.scaleX, this.scaleY);
    },
    setCropBoxWidthHander(width) {
      let data = this.cropper.getCropBoxData();
      data.width = width;
      this.cropper.setCropBoxData(data);
    },
    previewHandler() {
      let canvas = this.cropper.getCroppedCanvas();
      this.src = canvas.toDataURL();
      this.outputData = {
        width: canvas.getAttribute("width"),
        height: canvas.getAttribute("height"),
        size: byteConver(calcBase64Size(this.src)),
      };
    },
    previewImageHandler() {
      this.imageData = this.cropper.getImageData();
      this.canvasData = this.cropper.getCanvasData();
      this.cropBoxData = this.cropper.getCropBoxData();
    },
    resetHandler() {
      this.cropper.reset();
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-main {
  overflow-x: hidden;

  .el-row {
    p {
      width: 50%;
      margin: 10px 0px;
      display: inline-block;
    }
  }
}

.viewport {
  width: 100%;
  height: 480px !important;
}

.view-item {
  width: 100%;

  &.el-image {
    height: 220px;
  }

  p {
    width: 33% !important;
  }

  .img-preview {
    float: left;
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
    overflow: hidden;
    background: red;

    &.preview-lg {
      height: 10rem;
      width: 16rem;
    }

    &.preview-md {
      height: 5rem;
      width: 8rem;
    }

    &.preview-sm {
      height: 2.5rem;
      width: 4rem;
    }

    &.preview-xs {
      height: 1.25rem;
      width: 2rem;
    }
  }
}

.el-button {
  padding: 10px;

  >>> i {
    font-weight: bold;
  }

  &.vertical {
    >>> i {
      transform: rotate(90deg);
    }
  }
}
</style>
