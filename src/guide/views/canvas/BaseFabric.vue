<template>
  <el-container>
    <el-main>
      <canvas ref="draw" class="panel" width="1360px" height="720px"></canvas>

      <ul>
        <li>
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="drawHandler"
          ></el-button>
        </li>
        <li>
          <el-button
            type="success"
            icon="el-icon-rank"
            circle
            @click="selectHandler"
          ></el-button>
        </li>
        <li>
          <el-button
            type="warning"
            icon="el-icon-delete"
            circle
            @click="clearHandler"
          ></el-button>
        </li>
        <li>
          <el-button
            type="danger"
            icon="el-icon-refresh"
            circle
            @click="resetHandler"
          ></el-button>
        </li>

        <li>
          <el-link href="https://github.com/Couy69/vue-fabric-drawingboard"
            >例1</el-link
          >
        </li>
        <li>
          <el-link href="https://github.com/vipstone/drawingboard">例2</el-link>
        </li>
      </ul>
    </el-main>

    <el-footer>
      <ul></ul>
      <el-row v-if="false" :gutter="10">
        <el-col :span="8">{{ canvas && canvas.toJSON() }}</el-col>
        <el-col :span="8">{{ canvas && canvas.toSVG() }}</el-col>
        <el-col :span="8">{{ canvas && canvas.toDataURL() }}</el-col>
      </el-row>
    </el-footer>
    <el-footer>
      <FabricJS></FabricJS>
    </el-footer>
  </el-container>
</template>
<script>
import { fabric } from "fabric";
import FabricJS from "./drawboard/FabricJS";
export default {
  name: "BaseFabric",
  components: { FabricJS },
  data() {
    return {
      canvas: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
    // this.reset();
    document.addEventListener("keydown", (event) => {
      const code = window.event ? event.keyCode : event.which;
      if (code == 8) {
        //删除选中
        this.canvas.remove(this.canvas.getActiveObject());
      }
    });
  },
  methods: {
    init() {
      let canvas = (this.canvas = new fabric.Canvas(this.$refs.draw, {
        isDrawingMode: true,
      }));

      fabric.Object.prototype.transparentCorners = false;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = "#ff0";
        canvas.freeDrawingBrush.width = 10;
        canvas.freeDrawingBrush.shadow = new fabric.Shadow({
          blur: 0,
          offsetX: 0,
          offsetY: 0,
          affectStroke: true,
          color: "blue",
        });
      }

      console.log("canvas", canvas, this.$refs.draw);

      canvas.on("object:moved", function ({ e, target, subTargets }) {
        console.log("object:moved", target, e);
      });

      canvas.on("object:moving", function ({ e, target, subTargets }) {
        console.log("object:moving", target, e);
      });

      canvas.on("mouse:up", function ({ e, target, subTargets }) {
        console.log("mouse:up", e);
        // canvas.isDrawingMode = false;
        canvas.renderAll();
      });

      canvas.on("mouse:down", function ({ e, target, subTargets }) {
        console.log("mouse:down", e, target);
        canvas.renderAll();
      });

      canvas.on("mouse:move:before", function ({ e, target, subTargets }) {
        console.log("mouse:move:before", e);
      });

      canvas.on("mouse:move", function ({ e, target, subTargets }) {
        console.log("mouse:move", e);
        // canvas.isDrawingMode = !target;
      });
    },
    drawHandler() {
      if (this.canvas) {
        this.canvas.isDrawingMode = true;
      }
    },
    selectHandler() {
      if (this.canvas) {
        this.canvas.isDrawingMode = false;
        console.log("对象集合", this.canvas.getObjects());
      }
    },
    resetHandler() {
      this.clearHandler();
      let source = this.$refs.draw;
      const width = source.offsetWidth;
      const height = source.offsetHeight;
      // add random objects
      for (var i = 15; i--; ) {
        var dim = fabric.util.getRandomInt(30, 60);
        var klass = ["image", "Rect", "Triangle", "Circle"][
          fabric.util.getRandomInt(0, 2)
        ];
        var options = {
          top: fabric.util.getRandomInt(0, width),
          left: fabric.util.getRandomInt(0, height),
          fill: "green",
        };

        if (klass === "Circle") {
          options.radius = dim;
          let circle = new fabric.Circle({
            radius: dim,
            fill: "blue",
            originX: "center", //调整中心点的X轴坐标
            originY: "center",
          });

          let text = new fabric.Text("F" + dim, {
            //绘制文本
            fontSize: dim,
            fill: "#FFF",
            originX: "center",
            originY: "center",
          });

          this.canvas.add(new fabric.Group([circle, text], options));
        } else if (klass == "image") {
          fabric.Image.fromURL("/assets/image.jpg", (img) => {
            img.scale(0.5).set({
              left: fabric.util.getRandomInt(0, width / 2),
              top: fabric.util.getRandomInt(0, height) / 2,
              angle: -15,
              clipTo: function (ctx) {
                ctx.arc(0, 0, 300, 0, Math.PI * 2, true);
              },
            });

            this.canvas.add(img).setActiveObject(img);
          });
        } else {
          options.width = dim;
          options.height = dim;
          this.canvas.add(new fabric[klass](options));
        }
      }
    },
    clearHandler() {
      this.canvas.clear();
    },
  },
};
</script>
<style lang="stylus" scoped>
.panel
    width 100%
    height 100%
    background orange
ul
    position absolute
    right 20px
    top 100px
    li
        margin 10px 0
</style>
