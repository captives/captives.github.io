<template>
  <el-container>
    <el-main>
      <canvas ref="canvasElement" class="canvas" width="1360px" height="720px"></canvas>
      <ul>
        <li :class="{active: selected(DrawType.SELECT)}" @click="drawTypeChange(DrawType.SELECT)">选中</li>
        <li :class="{active: selected(DrawType.PEN)}" @click="drawTypeChange(DrawType.PEN)">画笔</li>
        <li :class="{active: selected(DrawType.ARROW)}" @click="drawTypeChange(DrawType.ARROW)">箭头</li>
        <li :class="{active: selected(DrawType.LINE)}" @click="drawTypeChange(DrawType.LINE)">直线</li>
        <li
          :class="{active: selected(DrawType.DOTTEDLINE)}"
          @click="drawTypeChange(DrawType.DOTTEDLINE)"
        >虚线</li>
        <li :class="{active: selected(DrawType.CIRCLE)}" @click="drawTypeChange(DrawType.CIRCLE)">圆</li>
        <li
          :class="{active: selected(DrawType.ELLIPSE)}"
          @click="drawTypeChange(DrawType.ELLIPSE)"
        >椭圆</li>
        <li :class="{active: selected(DrawType.SQUARE)}" @click="drawTypeChange(DrawType.SQUARE)">矩形</li>
        <li
          :class="{active: selected(DrawType.RIGHTANGLE)}"
          @click="drawTypeChange(DrawType.RIGHTANGLE)"
        >直角三角</li>
        <li
          :class="{active: selected(DrawType.EQUILATERAL)}"
          @click="drawTypeChange(DrawType.EQUILATERAL)"
        >等边三角</li>
        <li :class="{active: selected(DrawType.TEXT)}" @click="drawTypeChange(DrawType.TEXT)">文字</li>

        <li @click="clear">
          <el-color-picker
            v-model="selectColor"
            show-alpha
            :predefine="predefineColors"
            @change="colorPickerChangeHandler"
          ></el-color-picker>
        </li>
        <li @click="clear">
          <el-popover placement="left" width="200" trigger="hover">
            <el-slider v-model="selecteWidth" @change="widthSliderChangeHandler"></el-slider>
            <span slot="reference">
              宽度
              <small>{{selecteWidth}}</small>
            </span>
          </el-popover>
        </li>
        <li @click="clear">清屏</li>
      </ul>
    </el-main>
    <el-aside width="300px">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本" name="1">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
        <el-collapse-item title="样式" name="2">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <!-- <vue-source src="webrtc/views/canvas/DrawBoardFabric.vue" lang="html"></vue-source> -->
  </el-container>
</template>
<script>
import { fabric } from 'fabric'
export default {
  name: "DrawBoard",
  data() {
    return {
      canvas: null,
      drawing: false, //是否开启画图
      mouseDown: false,
      mouseFrom: { x: 0, y: 0 },
      mouseTo: { x: 0, y: 0 },
      canvasObject: null,
      drawType: "pen",
      DrawType: {
        PEN: "pen", //画笔
        BRUSH: "brush", //刷子
        ARROW: 'arrow',//箭头
        LINE: 'line',//直线
        DOTTEDLINE: 'dottedline',//虚线
        CIRCLE: 'circle',//正圆
        ELLIPSE: 'ellipse',//椭圆
        SQUARE: 'square', //正方形
        RECTANGLE: 'rectangle', //长方形
        RIGHTANGLE: 'rightangle', //直角三角形
        EQUILATERAL: 'equilateral', //等边三角形
        TEXT: 'text', //文字
        SELECT: "delete", //删除
      },
      selectColor: 'rgba(255, 69, 0, 0.68)',
      selecteWidth: 5,
      activeNames: "1",
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ]
    }
  },
  computed: {
    selected() {
      return (type) => {
        return this.drawType === type;
      }
    }
  },
  methods: {
    init() {
      let canvas = this.canvas = new fabric.Canvas(this.$refs.canvasElement, {
        isDrawingMode: true, //绘制模式
        skipTargetFind: true,//如果为true，则在画布上悬停时跳过目标检测。这可以用来提高性能。
        selectable: false, //选择要修改的对象
        selection: false //是否应启用组选择
      });

      fabric.Object.prototype.transparentCorners = true;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = this.selectColor;
        canvas.freeDrawingBrush.width = this.selecteWidth;
      }

      console.log("canvas", canvas);
      canvas.on('mouse:down', ({ e, target, subTargets }) => {
        this.mouseDown = true;
        this.mouseFrom = this.transformMouse(e.offsetX, e.offsetY);
        console.log("mouse:down", e, target);
        console.log(this.canvasObject);
      });

      canvas.on('mouse:up', ({ e, target, subTargets }) => {
        this.mouseDown = false;
        this.mouseTo = this.transformMouse(e.offsetX, e.offsetY);
        console.log("mouse:up", e, target, subTargets);
        this.canvasObject = null;
      });

      canvas.on('mouse:move', ({ e, target, subTargets }) => {
        if (this.mouseDown) {
          this.mouseTo = this.transformMouse(e.offsetX, e.offsetY);
          this.startDrawing();
        }
      });

      canvas.on('mouse:move:before', ({ e, target, subTargets }) => {
        // console.log("mouse:move:before", e);
      });

      canvas.on('object:selected', ({ e, target, subTargets }) => {
        console.log("object:selected", e, target, subTargets);
      });
    },
    transformMouse(x, y) {
      return { x: x, y: y };
    },
    startDrawing() {
      if (this.canvasObject) {
        this.canvas.remove(this.canvasObject);
      }
      switch (this.drawType) {
        case this.DrawType.LINE:
          this.canvasObject = new fabric.Line([this.mouseFrom.x, this.mouseFrom.y, this.mouseTo.x, this.mouseTo.y], {
            stroke: this.selectColor,
            strokeWidth: this.selecteWidth,
            strokeLineJoin: "round"
          });
          break;
        case this.DrawType.DOTTEDLINE:
          this.canvasObject = new fabric.Line([this.mouseFrom.x, this.mouseFrom.y, this.mouseTo.x, this.mouseTo.y], {
            strokeDashArray: [this.selecteWidth, this.selecteWidth],//宽度、间距
            stroke: this.selectColor,
            strokeWidth: this.selecteWidth,
            strokeLineJoin: "round"
          });
          break;
        case this.DrawType.ARROW:
          this.canvasObject = new fabric.Path(this.drawArrow(this.mouseFrom.x, this.mouseFrom.y, this.mouseTo.x, this.mouseTo.y, 30, 30), {
            fill: "rgba(255, 255, 255, 0)",
            stroke: this.selectColor,
            strokeWidth: this.selecteWidth
          });
          break;
        case this.DrawType.CIRCLE:
          let radius = Math.sqrt((this.mouseTo.x - this.mouseFrom.x) * (this.mouseTo.x - this.mouseFrom.x) + (this.mouseTo.y - this.mouseFrom.y) * (this.mouseTo.y - this.mouseFrom.y)) / 2;
          this.canvasObject = new fabric.Circle({
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            fill: "rgba(255, 255, 255, 0)",
            radius: radius,
            stroke: this.selectColor,
            strokeWidth: this.selecteWidth
          });
          break;
        case this.DrawType.ELLIPSE:
          this.canvasObject = new fabric.Ellipse({
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            fill: "rgba(255, 255, 255, 0)",
            originX: "center",
            originY: "center",
            rx: Math.abs(this.mouseFrom.x - this.mouseTo.x),
            ry: Math.abs(this.mouseFrom.y - this.mouseTo.y),
            stroke: this.selectColor,
            strokeWidth: this.selecteWidth
          });
          break;
        case this.DrawType.SQUARE: //正方形
          this.canvasObject = new fabric.Rect({
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            fill: "rgba(255, 255, 255, 0)",
            width: this.mouseTo.x - this.mouseFrom.x,
            height: this.mouseTo.y - this.mouseFrom.y,
            stroke: this.selectColor,
            strokeWidth: this.selecteWidth,
            strokeDashArray: [this.selecteWidth, this.selecteWidth] //宽度和间距
          });
          break;
        case this.DrawType.RIGHTANGLE: //直角三角形
          var path = "M " + this.mouseFrom.x + " " + this.mouseFrom.y + " L " + this.mouseFrom.x + " " + this.mouseTo.y + " L " + this.mouseTo.x + " " + this.mouseTo.y + " z";
          this.canvasObject = new fabric.Path(path, {
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            fill: "rgba(255, 255, 255, 0)",
            stroke: this.selectColor,
            strokeWidth: this.selecteWidth
          });
          break;
        case this.DrawType.EQUILATERAL: //等边三角形
          var height = this.mouseTo.y - this.mouseFrom.y;
          this.canvasObject = new fabric.Triangle({
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            width: Math.sqrt(Math.pow(height, 2) + Math.pow(height / 2.0, 2)),
            height: height,
            fill: "rgba(255, 255, 255, 0)",
            stroke: this.selectColor,
            strokeWidth: this.selecteWidth
          });
          break;
        case this.DrawType.TEXT: //文本
          this.canvasObject = new fabric.Textbox("", {
            left: this.mouseFrom.x,
            top: this.mouseFrom.y,
            fill: this.selectColor,
            stroke: this.selectColor,
            strokeWidth: 1,
            borderDashArray: [5, 5],
            editingBorderColor: 'rgba(64, 158, 255, .55)',
            selectionBackgroundColor: 'rgba(64, 158, 255, 1)',
          });
          break;
      }

      if (this.canvasObject) {
        this.canvas.add(this.canvasObject);
        this.canvasObject.drawType = this.drawType;
        if (this.canvasObject.drawType === this.DrawType.TEXT) {
          this.canvasObject.enterEditing();
          // this.canvasObject.hiddenTextarea.focus();
          //设定为活动对象 
          this.canvasObject.setActiveObject(this.canvasObject);
        }
      }
    },
    drawArrow(fromX, fromY, toX, toY, theta, headlen) {
      theta = typeof theta != "undefined" ? theta : 30;
      headlen = typeof theta != "undefined" ? headlen : 10;
      // 计算各角度和对应的P2,P3坐标
      var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
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
    drawTypeChange(type) {
      this.drawType = type;
      switch (type) {
        case this.DrawType.PEN:
          this.canvas.isDrawingMode = true;
          break;
        case this.DrawType.SELECT:
          this.canvas.isDrawingMode = false;
          this.canvas.selection = false;
          this.canvas.skipTargetFind = false;
          this.canvas.selectable = true;
          break;
        default:
          this.canvas.isDrawingMode = false;
          this.canvas.skipTargetFind = true; //画板元素不能被选中
          this.canvas.selection = false; //画板不显示选中
          break;
      }

      if (this.canvasObject && this.canvasObject.drawType == this.DrawType.TEXT) {
        this.canvasObject.exitEditing();
      }

      this.canvasObject = null;
      this.startDrawing();
    },
    colorPickerChangeHandler(value) {
      this.canvas.freeDrawingBrush.color = this.selectColor;
    },
    widthSliderChangeHandler(value) {
      this.canvas.freeDrawingBrush.width = this.selecteWidth;
    },
    clear() {
      this.canvas.clear();
    }
  },
  mounted() {
    this.init();
    document.addEventListener('keydown', (event) => {
      const code = window.event ? event.keyCode : event.which;
      if (code == 8) {//删除选中
        this.canvas.remove(this.canvas.getActiveObject());
      }
    });
  },
}
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
    background-size: 20px 20px;
  }

  ul {
    color: #FFF;
    right: 10px;
    top: 10px;
    position: absolute;

    li {
      margin: 2px 0;
      height: 40px;
      line-height: 40px;
      width: 60px;
      font-size: 15px;
      text-align: center;
      background: #409EFF;
      cursor: pointer;

      &:hover {
        background: #F56C6C;
      }

      &.active {
        background: #F56C6C;
      }

      .el-color-picker {
        width: 100%;

        >>> .el-color-picker__trigger {
          width: 100%;
          padding: 0;
          border: none;

          .el-color-picker__icon:before {
            content: '颜色';
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>