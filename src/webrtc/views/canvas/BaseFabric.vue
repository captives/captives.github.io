<template>
  <el-main>
    <el-row v-if="canvas">
      <el-button @click="clear" type="danger">清屏</el-button>
      <el-button @click="reset" type="primary">重置</el-button>
    </el-row>
    <canvas ref="draw" class="panel" width="1360px" height="720px"></canvas>
    <!-- <el-row>{{canvas.toJSON()}}</el-row>
    <el-row>{{canvas.toSVG()}}</el-row>-->

    <vue-source src="webrtc/views/canvas/BaseFabric.vue" lang="html"></vue-source>
  </el-main>
</template>
<script>
import { fabric } from 'fabric'
export default {
  name: "BaseFabric",
  data() {
    return {
      canvas: null
    }
  },
  methods: {
    init() {
      let canvas = this.canvas = new fabric.Canvas(this.$refs.draw, {
        isDrawingMode: false
      });

      fabric.Object.prototype.transparentCorners = false;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = '#ff0';
        canvas.freeDrawingBrush.width = 10;
        canvas.freeDrawingBrush.shadow = new fabric.Shadow({
          blur: 0,
          offsetX: 0,
          offsetY: 0,
          affectStroke: true,
          color: 'blue',
        });
      }


      console.log("canvas", canvas);
      canvas.on('object:moved', function ({ e, target, subTargets }) {
        console.log("object:moved", target, e);
      });

      canvas.on('object:moving', function ({ e, target, subTargets }) {
        console.log("object:moving", target, e);
      });

      canvas.on('mouse:up', function ({ e, target, subTargets }) {
        console.log("mouse:up", e);
        canvas.isDrawingMode = false;
        canvas.renderAll();
      });

      canvas.on('mouse:down', function ({ e, target, subTargets }) {
        console.log("mouse:down", e, target);
        canvas.renderAll();
      });

      canvas.on('mouse:move:before', function ({ e, target, subTargets }) {
        console.log("mouse:move:before", e);
      });

      canvas.on('mouse:move', function ({ e, target, subTargets }) {
        console.log("mouse:move", e);
        canvas.isDrawingMode = !target;
      });

    },
    reset() {
      this.clear();
      let source = this.$refs.draw;
      const width = source.offsetWidth;
      const height = source.offsetHeight;
      // add random objects
      for (var i = 15; i--;) {
        var dim = fabric.util.getRandomInt(30, 60);
        var klass = ['image', 'Rect', 'Triangle', 'Circle'][fabric.util.getRandomInt(0, 2)];
        var options = {
          top: fabric.util.getRandomInt(0, width),
          left: fabric.util.getRandomInt(0, height),
          fill: 'green'
        };

        if (klass === 'Circle') {
          options.radius = dim;
          let circle = new fabric.Circle({
            radius: dim,
            fill: 'blue',
            originX: 'center',//调整中心点的X轴坐标
            originY: 'center'
          });

          let text = new fabric.Text('F' + dim, {//绘制文本
            fontSize: dim,
            fill: '#FFF',
            originX: 'center',
            originY: 'center'
          });

          this.canvas.add(new fabric.Group([circle, text], options));
        } else if (klass == 'image') {
          fabric.Image.fromURL('/assets/corgi.jpg', img => {
            img.scale(0.5).set({
              left: fabric.util.getRandomInt(0, width / 2),
              top: fabric.util.getRandomInt(0, height) / 2,
              angle: -15,
              clipTo: function (ctx) {
                ctx.arc(0, 0, 300, 0, Math.PI * 2, true);
              }
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
    clear() {
      this.canvas.clear();
    }
  },
  mounted() {
    this.init();
    this.reset();
  },
}
</script>
<style lang="stylus" scoped>
.panel {
  width: 100%;
  height: 100%;
  background: orange;
}
</style>