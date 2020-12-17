<template>
  <!-- 扩展阅读 https://www.cnblogs.com/tugenhua0707/p/8859291.html -->
  <el-main>
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">编辑</el-divider>
        <vue-cropper
          v-if="option.img"
          ref="cropper"
          class="viewport"
          :info="option.info"
          :infoTrue="true"
          :img="option.img"
          :output-size="option.outputSize"
          :output-type="option.outputType"
          :full="option.full"
          :fixed="option.fixed"
          :fixed-number="option.fixedNumber"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :fixed-box="option.fixedBox"
          :original="option.original"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :center-box="option.centerBox"
          :high="option.high"
          :enlarge="option.enlarge"
          mode="cover"
          @real-time="realTime"
          @img-load="imgLoad"
          @cropMoving="cropMovingHandler"
          @imgMoving="imgMovingHandler"
        ></vue-cropper>

        <el-row v-if="option.img" style="padding-top: 2em">
          <el-button
            icon="el-icon-picture"
            size="mini"
            type="success"
            @click="changeFixedNumber('4:3')"
            >4:3</el-button
          >
          <el-button
            icon="el-icon-picture"
            size="mini"
            type="success"
            @click="changeFixedNumber('1:1')"
            >1:1</el-button
          >
          <el-button
            icon="el-icon-picture"
            type="success"
            size="mini"
            @click="changeFixedNumber('2:3')"
            >2:3</el-button
          >
          <el-button
            icon="el-icon-picture"
            size="mini"
            type="success"
            @click="changeFixedNumber('16:9')"
            >16:9</el-button
          >

          <el-button
            type="primary"
            icon="el-icon-refresh-left"
            size="mini"
            @click="rotateLeft"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            size="mini"
            @click="rotateRight"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-zoom-in"
            size="mini"
            @click="changeScale(5)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-zoom-out"
            size="mini"
            @click="changeScale(-5)"
          ></el-button>
          <el-button
            icon="el-icon-tickets"
            size="mini"
            type="primary"
            @click="option.autoCropWidth = 800"
            >800xAuto</el-button
          >
          <el-button
            icon="el-icon-tickets"
            size="mini"
            type="primary"
            @click="option.autoCropWidth = 400"
            >400xAuto</el-button
          >
        </el-row>

        <el-row style="padding-top: 2em">
          <el-upload
            class="el-upload"
            action="#"
            accept=".png, .jpg, .jpeg, .bmp, .webp"
            :limit="1"
            :auto-upload="false"
            :show-file-list="false"
            :before-upload="beforeUploadHandler"
            :on-change="fileChangeHandler"
          >
            <el-button type="primary" icon="el-icon-picture"></el-button>
          </el-upload>
          <template v-if="option.img">
            <el-button
              type="primary"
              icon="el-icon-delete"
              @click="clearCrop"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-refresh"
              @click="refreshCrop"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-edit-outline"
              @click="startCrop"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-crop"
              @click="stopCrop"
            ></el-button>
            <el-button type="primary" @click="finish('base64')"
              >base64预览</el-button
            >
            <el-button type="primary" @click="finish('blob')"
              >blob预览</el-button
            >
          </template>
        </el-row>
      </el-col>
      <el-col class="center" :xs="24" :sm="24" :md="6">
        <el-divider content-position="left">实时预览</el-divider>
        <div class="view-item">
          <div class="view-item" :style="previews.div" style="overflow: hidden">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </div>

        <el-divider content-position="left">截图预览</el-divider>
        <div class="view-item">
          <el-image :src="src" class="view-item"></el-image>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="6">
        <el-divider content-position="left">信息</el-divider>
        <p>
          图片尺寸：{{ (previews.img && previews.img.width) || 0 }}-{{
            (previews.img && previews.img.height) || 0
          }}
        </p>
        <p>裁剪尺寸：{{ previews.w || 0 }}x{{ previews.h || 0 }}</p>
        <p>
          输出尺寸：{{ previews.w * option.enlarge || 0 }}x{{
            previews.h * option.enlarge || 0
          }}
        </p>
        <p>输出大小：{{ previews.size | byteConver }}</p>
      </el-col>
    </el-row>
    <el-row :gutter="50">
      <el-col :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">选项</el-divider>
        <el-form ref="form" :model="option" class="cropper" label-width="120px">
          <el-form-item label="尺寸信息">
            <el-switch v-model="option.info"></el-switch>
          </el-form-item>
          <el-form-item label="固定截图框比例">
            <el-switch v-model="option.fixed"></el-switch>
          </el-form-item>
          <el-form-item label="固定截图框大小">
            <el-switch v-model="option.fixedBox"></el-switch>
          </el-form-item>

          <el-form-item label="原始宽高">
            <el-tooltip
              content="上传图片是否显示原始宽高 (针对大图 可以铺满)"
              placement="top"
            >
              <el-switch v-model="option.original"></el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="拖动图片">
            <el-switch v-model="option.canMove"></el-switch>
          </el-form-item>
          <el-form-item label="滚轮缩放">
            <el-switch v-model="option.canScale"></el-switch>
          </el-form-item>
          <el-form-item label="拖动截图框">
            <el-switch v-model="option.canMoveBox"></el-switch>
          </el-form-item>

          <el-form-item label="等比例输出">
            <el-tooltip content="输出原图比例的截图" placement="top">
              <el-switch v-model="option.full"></el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="自动生成截图框">
            <el-switch v-model="option.autoCrop"></el-switch>
          </el-form-item>
          <el-form-item label="生成高清图">
            <el-tooltip content="根据dpr生成适合屏幕的高清图片" placement="top">
              <el-switch v-model="option.high"></el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="截图框在图片内">
            <el-tooltip
              content="截图框限制在图片内，只有在自动生成截图框时才能生效"
              placement="top"
            >
              <el-switch v-model="option.centerBox"></el-switch>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="输出格式">
            <el-radio-group v-model="option.outputType">
              <el-radio label="png" value="png"></el-radio>
              <el-radio label="jpeg" value="jpeg"></el-radio>
              <el-radio label="webp" value="webp"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="x倍高清图">
            <el-slider
              v-model="option.enlarge"
              show-stops
              :marks="marks"
              :min="1"
              :max="5"
            ></el-slider>
          </el-form-item>
          <el-form-item label="">
            <source-code
              :value="[
                { value: 'guide/views/web/VueCropperjs.vue', lang: 'html' },
              ]"
              >查看源码</source-code
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import { VueCropper } from "vue-cropper";
import { calcBase64Size, byteConver } from "@/plugins/common.js";
export default {
  name: "Cropper",
  components: {
    VueCropper,
  },
  filters: {
    byteConver(value) {
      return byteConver(value);
    },
  },
  data() {
    return {
      marks: { 1: "1x", 2: "2x", 3: "3x", 4: "4x", 5: "5x" },
      crap: false,
      previews: {},
      src: null,
      axis: {},
      scaleX: 1,
      scaleY: 1,
      option: {
        info: true, // 裁剪框的大小信息
        fixed: true, // 是否开启截图框宽高固定比例
        fixedBox: false, // 固定截图框大小 不允许改变
        fixedNumber: [4, 3], // 截图框的宽高比例
        img: null,
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "png", // 裁剪生成图片的格式
        full: false, // 是否输出原图比例的截图
        original: false, // 上传图片按照原始比例渲染
        canMove: true, //上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 400, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        centerBox: false, // 截图框是否被限制在图片里面
        enlarge: 1, //图片根据截图框输出比例倍数
        high: true, //是否按照设备的dpr 输出等比例图片
      },
    };
  },
  methods: {
    beforeUploadHandler(file) {
      console.log("beforeUploadHandler", file);
    },
    fileChangeHandler(file, fileList) {
      console.log("file", file, fileList);
      this.option.img = URL.createObjectURL(file.raw);
    },
    changeFixedNumber(value) {
      if (this.option.fixedNumber.join(":") !== value) {
        this.option.fixedNumber = value.split(":");
        // this.$refs.cropper.refresh();
        setTimeout(() => {
          this.$refs.cropper.goAutoCrop();
        }, 100);
      }
    },
    startCrop() {
      //手动绘制裁切框
      this.crap = true;
      this.$refs.cropper.startCrop();
    },
    stopCrop() {
      //关闭手动绘制裁切框
      this.crap = false;
      this.$refs.cropper.stopCrop();
    },
    clearCrop() {
      this.$refs.cropper.clearCrop();
    },
    refreshCrop() {
      this.$refs.cropper.refresh();
    },
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    finish(type) {
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob((data) => {
          console.log(data);
          this.src = window.URL.createObjectURL(data);
        });
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.src = data;
          this.previews.size = calcBase64Size(data);
        });
      }
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
      console.log("realTime", data);
    },
    imgLoad(msg) {
      console.log("imgLoad", msg);
    },
    cropMovingHandler(event) {
      this.axis = event.axis;
    },
    imgMovingHandler(event) {
      this.axis = event.axis;
    },
  },
};
</script>
<style lang="stylus" scoped>
.el-main {
  overflow-x: hidden;
}

.viewport {
  width: 100%;
  height: 480px;
}

.view-item {
  overflow: hidden;
  width: 100%;
  height: 220px;
}

.el-form-item {
  margin-bottom: 12px;
  width: 50%;
  display: inline-block;
}

.el-upload {
  display: inline-block;
  margin-right: 10px;
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
