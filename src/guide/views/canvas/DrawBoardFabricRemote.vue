<template>
  <el-main>
    <canvas
      ref="canvasElement"
      class="canvas"
      width="1360px"
      height="720px"
    ></canvas>
  </el-main>
</template>
<script>
import { fabric } from "fabric";
import DrawTypeBar, { DrawType } from "./drawboard/DrawTypeBar.vue";
export default {
  name: "DrawBoardFabricRemote",
  components: {},
  data() {
    return {
      canvas: null, //画布对象
      canvasObject: null, //绘图元素
      textBoxObject: null, //文本框
      drawing: false, //是否开启画图
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let canvas = (this.canvas = new fabric.Canvas(this.$refs.canvasElement));
      canvas.selectionColor = "rgba(236, 245, 255, 0.05)";
      let _drawSelection = canvas._drawSelection;
      fabric.Object.prototype.transparentCorners = true;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = this.selectColor;
        canvas.freeDrawingBrush.width = this.selecteWidth;
      }
      canvas.interactive = false; //禁止交互
      console.log("canvas", canvas);
    },
    transformMouse(x, y) {
      return { x: x, y: y };
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-main
    position relative
    .canvas
        width 100%
        height 100%
        background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==')
        background-size 15px 15px
</style>
