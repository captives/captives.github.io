<template>
  <el-dialog
    title="编辑"
    :visible.sync="data.visible"
    width="910px"
    append-to-body
  >
    <el-row class="cropper-box">
      <vue-cropper
        ref="cropper"
        class="cropper-viewport"
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
        @mouseup.native="startCrop"
      ></vue-cropper>
      <div class="slider-view">
        <!-- <div class="view-item">
          <div class="view-item" :style="previews.div" style="overflow: hidden">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </div>-->
        <el-image :src="src" fit="contain" class="view-item">
          <div slot="error" class="el-image__error">暂无预览</div>
        </el-image>
        <el-divider content-position="left">信息</el-divider>
        <p>
          原始尺寸：{{ previews.img && previews.img.width | pxToVal }}x{{
            previews.img && previews.img.height | pxToVal
          }}
        </p>
        <p>
          裁剪尺寸：{{ Math.round(previews.w * option.enlarge) }}x{{
            Math.round(previews.h * option.enlarge)
          }}
        </p>
        <p>
          输出尺寸：{{ Math.round(previews.w * option.enlarge) }}x{{
            Math.round(previews.h * option.enlarge)
          }}
        </p>
        <p>输出大小：{{ blob.size | byteToString }}</p>
      </div>
    </el-row>
    <el-row v-if="option.img">
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
        @click="changeScale(1)"
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-zoom-out"
        size="mini"
        @click="changeScale(-1)"
      ></el-button>
      <el-button
        type="danger"
        icon="el-icon-crop"
        size="mini"
        @click="startCrop"
      ></el-button>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelHandler">取 消</el-button>
      <el-button type="primary" @click="submitHandler(true)">确 定</el-button>
      <el-button v-if="data.file" type="danger" @click="submitHandler(false)"
        >原 图</el-button
      >
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { VueCropper } from "vue-cropper";
import {
  Component,
  Vue,
  Prop,
  PropSync,
  Model,
  Watch,
} from "vue-property-decorator";

@Component({
  name: "ImageCropper",
  components: { VueCropper },
  filters: {
    pxToVal(val: string): number {
      return val ? Number(val.replace("px", "")) : 0;
    },
  },
})
export default class ImageCropper extends Vue {
  @PropSync("value", { type: Object, default: () => [] }) readonly data!: any;
  private src = "";
  private blob: any = {};
  private previews: any = {};
  private imageData: any = { width: 0, height: 0 };
  private option: any = {
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
    autoCropHeight: 300, // 默认生成截图框高度
    centerBox: true, // 截图框是否被限制在图片里面
    enlarge: 1, //图片根据截图框输出比例倍数
    high: true, //是否按照设备的dpr 输出等比例图片
  };
  @Watch("data")
  dataChange(item: any) {
    this.option.img = item.image;
  }

  // 实时预览函数
  private realTime(data: any) {
    this.previews = data;
  }

  private imgLoad(msg: any) {
    console.log("imgLoad", msg, this.previews);
    let data: any = this.previews.img;
    let width = Number(data.width.replace("px", ""));
    let height = Number(data.height.replace("px", ""));
    this.imageData = { width, height, w: 640, h: 480 };
    if (width / height > 640 / 480) {
      this.option.enlarge = width / 640;
    } else {
      this.option.enlarge = height / 480;
    }

    this.startCrop();
  }

  private rotateLeft() {
    // @ts-ignore
    this.$refs.cropper.rotateLeft();
    this.startCrop();
  }

  private rotateRight() {
    // @ts-ignore
    this.$refs.cropper.rotateRight();
    this.startCrop();
  }

  private changeScale(num: number) {
    num = num || 1;
    // @ts-ignore
    this.$refs.cropper.changeScale(num);
    this.startCrop();
  }

  private changeFixedNumber(value: string) {
    if (this.option.fixedNumber.join(":") !== value) {
      this.option.fixedNumber = value.split(":");
      setTimeout(() => {
        // @ts-ignore
        this.$refs.cropper.goAutoCrop();
        this.startCrop();
      }, 100);
    }
  }

  private startCrop() {
    // @ts-ignore
    this.$refs.cropper.getCropBlob((data) => {
      this.blob = data;
      this.src = window.URL.createObjectURL(data);
    });
  }

  private cancelHandler() {
    this.data.visible = false;
    this.src = "";
    this.previews = {};
    this.$emit("input", this.data);
  }

  private submitHandler(operation: boolean) {
    this.data.visible = false;
    if (operation) {
      let file: File = new window.File(
        [this.blob],
        this.data.name || "cut—image",
        { type: this.blob.type }
      );
      this.$emit("complete", file, this.data);
    } else {
      this.$emit("complete", this.data.file, this.data);
    }

    this.src = "";
    this.previews = {};
    this.$emit("input", this.data);
  }
}
</script>
<style lang="scss" scoped>
.cropper-box {
  .cropper-viewport {
    width: 520px;
    height: 360px;
    float: left;
    margin-right: 30px;
  }

  .slider-view {
    width: 320px;
    display: inline-block;

    .view-item {
      width: 320px;
      height: 240px;
      background: #eee;
    }

    p {
      line-height: 25px;
    }
  }
}
</style>
