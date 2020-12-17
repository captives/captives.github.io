<template>
  <el-row>
    <el-container>
      <el-main>
        <canvas
          ref="canvasElement"
          class="canvas"
          width="1360px"
          height="720px"
        ></canvas>
        <DrawTypeBar @change="drawTypeChange">
          <li @click="clear">清屏</li>
        </DrawTypeBar>
      </el-main>
      <el-aside width="300px">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="示例" name="1">
            <div>http://fabricjs.com/kitchensink</div>
          </el-collapse-item>
          <el-collapse-item title="图形" name="2">
            <BasicAssembly @change="rectChangeHandler"></BasicAssembly>
          </el-collapse-item>
          <el-collapse-item title="属性" name="3">
            <ElementProperties
              v-model="options"
              :drawType="drawType"
              @input="elementPropertiesHandler"
            ></ElementProperties>
          </el-collapse-item>
        </el-collapse>
      </el-aside>
    </el-container>
    <el-container>
      <DrawBoardFabricRemote></DrawBoardFabricRemote>
    </el-container>
  </el-row>
</template>
<script>
import { fabric } from "fabric";
import BasicAssembly from "./drawboard/BasicAssembly.vue";
import ElementProperties from "./drawboard/ElementProperties.vue";
import DrawTypeBar, { DrawType } from "./drawboard/DrawTypeBar.vue";
import DrawBoardFabricRemote from "./DrawBoardFabricRemote.vue";
export default {
  name: "DrawBoardFabric",
  components: {
    DrawTypeBar,
    BasicAssembly,
    ElementProperties,
    DrawBoardFabricRemote,
  },
  data() {
    return {
      canvas: null, //画布对象
      canvasObject: null, //绘图元素
      textBoxObject: null, //文本框
      drawing: false, //是否开启画图
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
      mouseDown: false,
      mouseFrom: { x: 0, y: 0 },
      mouseTo: { x: 0, y: 0 },
      drawType: "select",
      DrawType,
      activeNames: "3",
      moveCount: 1, //绘制移动计数器
      doDrawing: false, // 绘制状态
    };
  },
  computed: {
    selectColor() {
      return this.options.fill;
    },
    selecteWidth() {
      return this.options.strokeWidth;
    },
  },
  mounted() {
    this.init();
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
      let canvas = (this.canvas = new fabric.Canvas(this.$refs.canvasElement, {
        containerClass: "fabric-container",
      }));

      let _drawSelection = canvas._drawSelection;
      fabric.Object.prototype.transparentCorners = false; //实心

      canvas.selectionLineWidth = 1; //选择器边框
      canvas.selectionColor = "rgba(236, 245, 255, 0.25)"; // 选择器背景色
      canvas.selectionBorderColor = "rgb(121, 187, 255)"; // 选择器边框色
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = this.selectColor;
        canvas.freeDrawingBrush.width = this.selecteWidth;
      }

      console.log("canvas", canvas);
      canvas.on("mouse:down", ({ e, target, subTargets }) => {
        this.mouseDown = true;
        this.doDrawing = true;
        this.mouseFrom = this.transformMouse(e.offsetX, e.offsetY);
        console.log("mouse:down", e, target, subTargets);

        if (this.drawType == this.DrawType.SELECT) {
          // _drawSelection = canvas._drawSelectionl;
          // canvas._drawSelection = () => {};
        }
      });

      canvas.on("mouse:up", ({ e, target, subTargets }) => {
        this.mouseDown = false;
        this.doDrawing = false;
        this.moveCount = 1;
        this.mouseTo = this.transformMouse(e.offsetX, e.offsetY);
        console.log("mouse:up", e, target, subTargets);

        // console.log('-- 坐标', this.mouseFrom, this.mouseTo);
        // console.log('-- toSVG', this.canvasObject.toSVG());
        // console.log('-- toJSON', this.canvasObject.toJSON());
        // console.log('-- toObject', this.canvasObject.toObject());
        // console.log('-- toClipPathSVG', this.canvasObject.toClipPathSVG());
        // console.log('-- toDatalessObject', this.canvasObject.toDatalessObject());
        // console.log('-- toDataURL', this.canvasObject.toDataURL({ format: "png" }));

        if (this.drawType == this.DrawType.SELECT) {
          // canvas._drawSelection = _drawSelection;
        } else if (
          this.canvasObject &&
          [this.DrawType.TEXTBOX, this.DrawType.ITEXT].indexOf(
            this.canvasObject.drawType
          ) == -1
        ) {
          this.canvasObject = null;
        }

        console.log("----", this.canvas.getActiveObject());
      });

      canvas.on("mouse:move", ({ e, target, subTargets }) => {
        if (this.mouseDown) {
          if (this.moveCount % 3 && !this.doDrawing) {
            //减少绘制频率
            return;
          }
          this.moveCount++;

          this.mouseTo = this.transformMouse(e.offsetX, e.offsetY);

          if (this.canvasObject) {
            this.canvas.remove(this.canvasObject);

            if (
              [this.DrawType.TEXTBOX, this.DrawType.ITEXT].indexOf(
                this.canvasObject.drawType
              ) !== -1
            ) {
              this.canvasObject.exitEditing();
            }
          }
          this.startDrawing();
        }
      });

      canvas.on("selection:created", ({ target }) => {
        if (this.drawType === DrawType.ERASER) {
          if (target._objects) {
            //多选删除
            var etCount = target._objects.length;
            for (var etindex = 0; etindex < etCount; etindex++) {
              this.canvas.remove(target._objects[etindex]);
            }
          } else {
            //单选删除
            this.canvas.remove(target);
          }
          this.canvas.discardActiveObject(); //清楚选中框
        }
      });

      canvas.on("selection:updated", ({ e, target, subTargets }) => {
        target.set({
          borderColor: "red", //边框颜色
          cornerColor: "green", //控制对象角的颜色
          cornerSize: 6, //对象控制角的大小
          // cornerStyle 控制点圆点或方块
          transparentCorners: false,
        });
        console.log("selection:updated", target);
      });

      canvas.on("object:selected", ({ e, target, subTargets }) => {
        console.log("object:selected", e, target, subTargets);
      });

      canvas.on("selection:cleared", ({ e, target, subTargets }) => {
        console.log("selection:cleared", e, target, subTargets);
      });

      //仅自由绘图时生成class
      canvas.on("path:created", (e) => {
        console.log("path:created", e);
      });
    },
    transformMouse(x, y) {
      return { x: x, y: y };
    },
    startDrawing() {
      const text = "这是文本内容";
      switch (this.drawType) {
        case this.DrawType.LINE: //实线
          this.canvasObject = new fabric.Line(
            [
              this.mouseFrom.x,
              this.mouseFrom.y,
              this.mouseTo.x,
              this.mouseTo.y,
            ],
            {
              stroke: this.selectColor,
              strokeWidth: this.selecteWidth,
              strokeLineJoin: "round",
            }
          );
          break;
        case this.DrawType.DOTTEDLINE: //虚线
          this.canvasObject = new fabric.Line(
            [
              this.mouseFrom.x,
              this.mouseFrom.y,
              this.mouseTo.x,
              this.mouseTo.y,
            ],
            {
              strokeDashArray: [this.selecteWidth, this.selecteWidth], //宽度、间距
              stroke: this.selectColor,
              strokeWidth: this.selecteWidth,
              strokeLineJoin: "round",
            }
          );
          break;
        case this.DrawType.ARROW: //箭头
          this.canvasObject = new fabric.Path(
            this.drawArrow(
              this.mouseFrom.x,
              this.mouseFrom.y,
              this.mouseTo.x,
              this.mouseTo.y,
              30,
              30
            ),
            {
              fill: "rgba(255, 255, 255, 0)",
              stroke: this.selectColor,
              strokeWidth: this.selecteWidth,
            }
          );
          break;
        case this.DrawType.ARROW2: //箭头指向
          this.canvasObject = new fabric.Path(
            this.drawArrow2(
              this.mouseFrom.x,
              this.mouseFrom.y,
              this.mouseTo.x,
              this.mouseTo.y,
              30,
              30
            ),
            {
              fill: this.selectColor,
              // stroke: this.selectColor,
              strokeWidth: 2,
            }
          );
          break;
        case this.DrawType.CIRCLE: //正圆
          let value =
            (this.mouseTo.x - this.mouseFrom.x) *
              (this.mouseTo.x - this.mouseFrom.x) +
            (this.mouseTo.y - this.mouseFrom.y) *
              (this.mouseTo.y - this.mouseFrom.y);
          let radius = Math.sqrt(value) / 2;

          this.canvasObject = new fabric.Circle({
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            fill: "rgba(255, 255, 255, 0)",
            originX: "center",
            originY: "center",
            radius: radius,
            stroke: this.selectColor,
            strokeWidth: this.selecteWidth,
          });
          break;
        case this.DrawType.ELLIPSE:
          this.canvasObject = new fabric.Ellipse({
            left: (this.mouseTo.x - this.mouseFrom.x) / 2 + this.mouseFrom.x,
            top: (this.mouseTo.y - this.mouseFrom.y) / 2 + this.mouseFrom.y,
            fill: "rgba(255, 255, 255, 0)",
            originX: "center",
            originY: "center",
            rx: Math.abs(this.mouseFrom.x - this.mouseTo.x),
            ry: Math.abs(this.mouseFrom.y - this.mouseTo.y),
            stroke: this.selectColor,
            strokeWidth: this.selecteWidth,
          });
          break;
        case this.DrawType.SQUARE: //正方形
          var path =
            "M " +
            this.mouseFrom.x +
            " " +
            this.mouseFrom.y +
            " L " +
            this.mouseTo.x +
            " " +
            this.mouseFrom.y +
            " L " +
            this.mouseTo.x +
            " " +
            this.mouseTo.y +
            " L " +
            this.mouseFrom.x +
            " " +
            this.mouseTo.y +
            " L " +
            this.mouseFrom.x +
            " " +
            this.mouseFrom.y +
            " z";

          this.canvasObject = new fabric.Path(path, {
            left: this.mouseTo.x - (this.mouseTo.x - this.mouseFrom.x) / 2,
            top: this.mouseTo.y - (this.mouseTo.y - this.mouseFrom.y) / 2,
            fill: "rgba(255, 255, 255, 0)",
            originX: "center",
            originY: "center",

            stroke: this.selectColor,
            strokeWidth: this.selecteWidth,
          });

          break;
        case this.DrawType.RECTANGLE: //矩形
          this.canvasObject = new fabric.Rect({
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            fill: "rgba(255, 255, 255, 0)",
            width: this.mouseTo.x - this.mouseFrom.x,
            height: this.mouseTo.y - this.mouseFrom.y,
            stroke: this.selectColor,
            strokeWidth: this.selecteWidth,
            // strokeDashArray: [this.selecteWidth, this.selecteWidth], //虚线宽度和间距
          });
          break;
        case this.DrawType.RIGHTANGLE: //直角三角形
          var path =
            "M " +
            this.mouseFrom.x +
            " " +
            this.mouseFrom.y +
            " L " +
            this.mouseFrom.x +
            " " +
            this.mouseTo.y +
            " L " +
            this.mouseTo.x +
            " " +
            this.mouseTo.y +
            " z";

          this.canvasObject = new fabric.Path(path, {
            left: this.mouseTo.x - (this.mouseTo.x - this.mouseFrom.x) / 2,
            top: this.mouseTo.y - (this.mouseTo.y - this.mouseFrom.y) / 2,
            fill: "rgba(255, 255, 255, 0)",
            originX: "center",
            originY: "center",
            stroke: this.selectColor,
            strokeWidth: this.selecteWidth,
          });
          break;
        case this.DrawType.EQUILATERAL: //三角形
          var height = this.mouseTo.y - this.mouseFrom.y;
          this.canvasObject = new fabric.Triangle({
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            fill: "rgba(255, 255, 255, 0)",
            originX: "center",
            originY: "center",
            width: Math.sqrt(Math.pow(height, 2) + Math.pow(height / 2.0, 2)),
            height: height,
            stroke: this.selectColor,
            strokeWidth: this.selecteWidth,
          });
          break;
        case this.DrawType.TEXT: //文本
          this.canvasObject = new fabric.Text(text, {
            fontSize: 40,
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            fill: this.selectColor,
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: "",
            originX: "left",
            hasRotatingPoint: true,
            centerTransform: true,
            backgroundColor: "#ff0000",
            borderColor: "#00ff00",
          });
          break;

        case this.DrawType.TEXTBOX: //文本
          this.canvasObject = new fabric.Textbox(text, {
            fontSize: 40,
            left: this.mouseFrom.x,
            top: this.mouseFrom.y - 10,
            fill: this.selectColor,
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: "",
            originX: "left",
            borderColor: this.selectColor,
            backgroundColor: "rgba(0, 0, 0, 0.55)",
          });
          break;

        case this.DrawType.ITEXT: //文本
          this.canvasObject = new fabric.IText(text, {
            fontSize: 40,
            left: this.mouseFrom.x,
            top: this.mouseFrom.y - 10,
            fill: this.selectColor,
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: "",
            originX: "left",
            borderColor: this.selectColor,
          });
          break;
      }

      if (this.canvasObject) {
        this.canvas.add(this.canvasObject);
        this.canvasObject.drawType = this.drawType;
        if (
          [this.DrawType.TEXTBOX, this.DrawType.ITEXT].indexOf(
            this.canvasObject.drawType
          ) !== -1
        ) {
          this.canvasObject.enterEditing();
          // this.canvas._drawSelectionl = false;
          this.canvasObject.hiddenTextarea.focus();
        }
      }
    },
    drawArrow(fromX, fromY, toX, toY, theta, headlen) {
      theta = typeof theta != "undefined" ? theta : 30;
      headlen = typeof theta != "undefined" ? headlen : 10;
      // 计算各角度和对应的P2,P3坐标
      var angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI,
        angle1 = ((angle + theta) * Math.PI) / 180,
        angle2 = ((angle - theta) * Math.PI) / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
      var arrowX = fromX - topX,
        arrowY = fromY - topY;
      var path = " M " + fromX + " " + fromY;
      path += " L " + toX + " " + toY;
      arrowX = toX + topX;
      arrowY = toY + topY;
      path += " M " + arrowX + " " + arrowY;
      path += " L " + toX + " " + toY;
      arrowX = toX + botX;
      arrowY = toY + botY;
      path += " L " + arrowX + " " + arrowY;
      return path;
    },
    drawArrow2(fromX, fromY, toX, toY, theta, headlen) {
      var x1 = fromX,
        x2 = toX,
        y1 = fromY,
        y2 = toY;
      var w = x2 - x1,
        h = y2 - y1,
        sh = Math.cos(Math.PI / 4) * 16;
      var sin = h / Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
      var cos = w / Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
      var w1 = (16 * sin) / 4,
        h1 = (16 * cos) / 4,
        centerx = sh * cos,
        centery = sh * sin;
      /**
       * centerx,centery 表示起始点，终点连线与箭头尖端等边三角形交点相对x，y
       * w1 ，h1用于确定四个点
       */
      var path = " M " + x1 + " " + y1;
      path += " L " + (x2 - centerx + w1) + " " + (y2 - centery - h1);
      path += " L " + (x2 - centerx + w1 * 2) + " " + (y2 - centery - h1 * 2);
      path += " L " + x2 + " " + y2;
      path += " L " + (x2 - centerx - w1 * 2) + " " + (y2 - centery + h1 * 2);
      path += " L " + (x2 - centerx - w1) + " " + (y2 - centery + h1);
      path += " Z";
      return path;
    },
    drawFiveStars(fromX, fromY, toX, toY) {
      var x1 = fromX,
        x2 = toX,
        y1 = fromY,
        y2 = toY;
      /**
       * 实现思路  (x1,y1)表示鼠标起始的位置 (x2,y2)表示鼠标抬起的位置
       * r 表示五边形外圈圆的半径，这里建议自己画个图理解
       * 正五边形夹角为36度。计算出cos18°，sin18°备用
       */
      var w = Math.abs(x2 - x1),
        h = Math.abs(y2 - y1),
        r = Math.sqrt(w * w + h * h);
      var cos18 = Math.cos((18 * Math.PI) / 180);
      var sin18 = Math.sin((18 * Math.PI) / 180);

      /**
       * 算出对应五个点的坐标转化为路径
       */
      var point1 = [x1, y1 + r];
      var point2 = [x1 + 2 * r * sin18, y1 + r - 2 * r * cos18];
      var point3 = [x1 - r * cos18, y1 + r * sin18];
      var point4 = [x1 + r * cos18, y1 + r * sin18];
      var point5 = [x1 - 2 * r * sin18, y1 + r - 2 * r * cos18];

      var path = " M " + point1[0] + " " + point1[1];
      path += " L " + point2[0] + " " + point2[1];
      path += " L " + point3[0] + " " + point3[1];
      path += " L " + point4[0] + " " + point4[1];
      path += " L " + point5[0] + " " + point5[1];
      path += " Z";
      return path;
    },
    drawTypeChange(type) {
      this.drawType = type;

      switch (type) {
        case DrawType.PEN:
          this.canvas.isDrawingMode = true;
          break;
        case DrawType.SELECT:
          this.canvas.isDrawingMode = false; //关闭自由绘图
          this.canvas.skipTargetFind = false;
          this.canvas.selection = true; //开启元素多选择
          this.canvas.selectable = true;
          break;
        case DrawType.ERASER:
          this.canvas.isDrawingMode = false;
          this.canvas.skipTargetFind = false;
          this.canvas.selection = true;
          this.canvas.selectable = true;
          this.canvas.discardActiveObject(); //清楚选中框
          break;
        default:
          this.canvas.isDrawingMode = false;
          this.canvas.skipTargetFind = true; //画板元素不能被选中
          this.canvas.selection = false; //禁用元素多选
          this.canvas.discardActiveObject(); //清楚选中框
          break;
      }

      this.behaviorHandler();
    },
    behaviorHandler() {
      if (this.canvasObject) {
        console.log("当前绘图对象", this.canvasObject.drawType);
        if (
          [this.DrawType.TEXTBOX, this.DrawType.ITEXT].indexOf(
            this.drawType
          ) !== -1
        ) {
          this.canvasObject.enterEditing();
          this.canvasObject.hiddenTextarea.focus();
          console.log("进入编辑");
        } else if (
          [this.DrawType.TEXTBOX, this.DrawType.ITEXT].indexOf(
            this.canvasObject.drawType
          ) !== -1
        ) {
          this.canvasObject.exitEditing();
          console.log("退出编辑");
        }

        console.log(
          "当前绘制类型",
          this.drawType,
          "\n数据",
          this.canvasObject.toObject(),
          "\nSVG",
          this.canvasObject.toSVG()
        );
      }
    },
    elementPropertiesHandler(value) {
      console.log("属性更改", value);
      if (this.canvas) {
        this.canvas.freeDrawingBrush.color = value.fill;
        this.canvas.freeDrawingBrush.width = value.strokeWidth;
      }
    },
    clear() {
      this.canvas.clear();
    },
    rectChangeHandler(type, rect) {
      console.log("draw type", type, rect);
      if (rect) {
        this.canvas.add(rect);
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.el-container {
  position: relative;
}

.el-main {
  position: relative;

  .canvas {
    width: 100%;
    height: 100%;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==');
    background-size: 15px 15px;
  }
}
</style>
