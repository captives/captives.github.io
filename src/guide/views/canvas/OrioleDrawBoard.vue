<template>
  <el-container>
    <el-main>
      <el-divider content-position="left">工作画板</el-divider>
      <div class="canvas-container">
        <canvas ref="canvas" width="1280" height="720"></canvas>
      </div>
      <el-divider content-position="left">输出画板</el-divider>
      <div class="canvas-container">
        <canvas ref="remote" width="1280" height="720"></canvas>
      </div>
    </el-main>
    <el-aside width="380px">
      <h3>工具栏</h3>
      <el-divider content-position="left">画布尺寸</el-divider>
      <el-button type="primary" size="mini" @click="changeCanvasSize('640x480')">640x480</el-button>
      <el-button type="primary" size="mini" @click="changeCanvasSize('1280x720')">1280x720</el-button>
      <el-button type="primary" size="mini" @click="changeCanvasSize('1920x1080')">1920x1080</el-button>
      <el-divider content-position="left">画布属性</el-divider>
      <ElementProperties v-model="options" :drawType="drawType" @input="elementPropertiesHandler"></ElementProperties>
    </el-aside>
  </el-container>
</template>
<script>
import { Canvas, CanvasEvent, DrawType } from "./drawboardlibs/Canvas";
import css from "./drawboardlibs/style";
import iconfont from "./drawboardlibs/iconfont";
import ElementProperties from "./drawboard/ElementProperties.vue";

export default {
  name: "OrioleDrawBoard",
  components: { ElementProperties },
  data() {
    return {
      canvas: null,
      remote: null, //远程画板
      drawType: "select",
      options: {
        fill: "#00BABD",
        stroke: "#FFD700",
        background: "#FF8C00",
        strokeWidth: 2,
        opacity: 1,
        textAlign: "left",
        fontSize: 12,
        lineHeight: 20,
        charSpacing: 1,
        horizontalLock: false,
        verticalLock: false,
        horizontalScale: false,
        verticalScale: false,
        rotation: false,
        scaling: false,
      },
    };
  },
  methods: {
    loadCss(css) {
      let style = document.querySelector("head #oriole-sdk");
      if (!style) {
        style = document.createElement("style");
        style.setAttribute("id", "oriole-sdk");
        document.querySelector("head").appendChild(style);
      }

      style.innerHTML = css;
    },
    elementPropertiesHandler(value) {
      console.log("属性更改", value);
      this.canvas.setPaint(value);
    },
    changeCanvasSize(size) {
      const rect = size.split("x");
      this.canvas.setSize(...rect);
    },
  },
  mounted() {
    this.loadCss(css);
    this.$refs.canvas.insertAdjacentHTML("beforebegin", iconfont);
    this.canvas = new Canvas(this.$refs.canvas, { size: { width: 1280, height: 720 } });
    this.remote = new Canvas(this.$refs.remote, { size: { width: 1280, height: 720 } });

    this.canvas.on(CanvasEvent.DRAW_TYPE, (type) => {
      console.log("绘制类型切换", type);
    });

    this.canvas.on(CanvasEvent.CHANGE_PAINT, (value) => {});

    this.canvas.on(CanvasEvent.SHAP_ADD, (value) => {
      this.remote.drawChange(CanvasEvent.SHAP_ADD, value);
    });

    this.canvas.on(CanvasEvent.SHAP_UPDATE, (value) => {
      this.remote.drawChange(CanvasEvent.SHAP_UPDATE, value);
    });

    this.canvas.on(CanvasEvent.SHAP_DELETE, (value) => {
      this.remote.drawChange(CanvasEvent.SHAP_DELETE, value);
    });

    this.canvas.on(CanvasEvent.ERROR, (status, message) => {});
  },
};
</script>

<style lang="stylus" scoped>
.canvas-container, canvas {
  width: 1280px;
  height: 720px;
  background: rgba(255, 0, 0, 0.25);
}

.canvas-container >>> div {
  width: 1280px;
  height: 720px;
}

.el-aside {
  font-size: 16px;
}
</style>