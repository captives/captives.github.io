<template>
  <el-container>
    <el-main>
      <span>{{ mouseFrom }} \ {{ mouseTo }}</span>
      <div
        ref="element"
        class="canvas"
        width="1360px"
        height="720px"
        @mousedown="mouseDownHandler"
        @mousemove="mouseMoveHandler"
        @mouseleave="mouseLeaveHandler"
        @mouseup="mouseLeaveHandler"
      ></div>
      <ul>
        <li
          :class="{ active: selected(DrawType.SELECT) }"
          @click="drawTypeChange(DrawType.SELECT)"
        >
          选中
        </li>
        <li
          :class="{ active: selected(DrawType.PEN) }"
          @click="drawTypeChange(DrawType.PEN)"
        >
          画笔
        </li>
        <li
          :class="{ active: selected(DrawType.ARROW) }"
          @click="drawTypeChange(DrawType.ARROW)"
        >
          箭头
        </li>
        <li
          :class="{ active: selected(DrawType.LINE) }"
          @click="drawTypeChange(DrawType.LINE)"
        >
          直线
        </li>
        <li
          :class="{ active: selected(DrawType.DOTTEDLINE) }"
          @click="drawTypeChange(DrawType.DOTTEDLINE)"
        >
          虚线
        </li>
        <li
          :class="{ active: selected(DrawType.CIRCLE) }"
          @click="drawTypeChange(DrawType.CIRCLE)"
        >
          圆
        </li>
        <li
          :class="{ active: selected(DrawType.ELLIPSE) }"
          @click="drawTypeChange(DrawType.ELLIPSE)"
        >
          椭圆
        </li>
        <li
          :class="{ active: selected(DrawType.SQUARE) }"
          @click="drawTypeChange(DrawType.SQUARE)"
        >
          矩形
        </li>
        <li
          :class="{ active: selected(DrawType.RIGHTANGLE) }"
          @click="drawTypeChange(DrawType.RIGHTANGLE)"
        >
          直角三角
        </li>
        <li
          :class="{ active: selected(DrawType.EQUILATERAL) }"
          @click="drawTypeChange(DrawType.EQUILATERAL)"
        >
          等边三角
        </li>
        <li
          :class="{ active: selected(DrawType.TEXT) }"
          @click="drawTypeChange(DrawType.TEXT)"
        >
          文字
        </li>

        <li>
          <el-color-picker
            v-model="selectColor"
            show-alpha
            :predefine="predefineColors"
            @change="colorPickerChangeHandler"
          ></el-color-picker>
        </li>

        <li>
          <el-popover placement="left" width="200" trigger="hover">
            <el-slider
              v-model="selecteWidth"
              @change="widthSliderChangeHandler"
            ></el-slider>
            <span slot="reference">
              宽度
              <small>{{ selecteWidth }}</small>
            </span>
          </el-popover>
        </li>
        <li @click="clear">清屏</li>
      </ul>
    </el-main>
  </el-container>
</template>
<script>
import { fabric } from "fabric";
import Two from "two.js";
export default {
  name: "DrawTwojsBoardFabric",
  data() {
    return {
      two: null,
      canvas: null,
      drawing: false, //是否开启画图
      mouseDown: false,
      mouseFrom: { x: 0, y: 0 },
      mouseTo: { x: 0, y: 0 },
      mousePoints: [],
      drawType: "select",
      rectObject: null,
      DrawType: {
        PEN: "pen", //画笔
        BRUSH: "brush", //刷子
        ARROW: "arrow", //箭头
        LINE: "line", //直线
        DOTTEDLINE: "dottedline", //虚线
        CIRCLE: "circle", //正圆
        ELLIPSE: "ellipse", //椭圆
        SQUARE: "square", //正方形
        RECTANGLE: "rectangle", //长方形
        RIGHTANGLE: "rightangle", //直角三角形
        EQUILATERAL: "equilateral", //等边三角形
        TEXT: "text", //文字
        SELECT: "select", //选中
      },
      selectColor: "rgba(255, 69, 0, 0.68)",
      selecteWidth: 5,
      activeNames: "2",
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ],
    };
  },
  computed: {
    selected() {
      return (type) => {
        return this.drawType === type;
      };
    },
  },
  mounted() {
    this.init();
    document.addEventListener("keydown", (event) => {
      const code = window.event ? event.keyCode : event.which;
      if (code == 8) {
        //删除选中
      }
    });
  },
  methods: {
    init() {
      console.log(
        this.$refs.element.clientWidth,
        this.$refs.element.clientHeight
      );
      //在整个body中绘制绘图区
      var two = new Two({
        width: this.$refs.element.clientWidth,
        height: this.$refs.element.clientHeight,
        // fullscreen: true,//设置是否全屏
        autostart: true, //是否自动启动动画
      }).appendTo(this.$refs.element);
      two.update();
      this.two = two;
    },
    transformMouse(x, y) {
      return { x: x, y: y };
    },
    mouseDownHandler(event) {
      this.mousePoints = [];
      this.mouseDown = true;
      this.mouseFrom = this.transformMouse(event.offsetX, event.offsetY);
      this.rectObject = null;
    },
    mouseMoveHandler(event) {
      if (this.mouseDown) {
        this.mouseTo = this.transformMouse(event.offsetX, event.offsetY);
        this.startDrawing();
      }
    },
    mouseLeaveHandler(event) {
      if (this.mouseDown) {
        this.mouseTo = this.transformMouse(event.offsetX, event.offsetY);
        this.rectObject = null;
        this.mouseDown = false;
      }
    },
    drawTypeChange(type) {
      this.drawType = type;
    },
    startDrawing() {
      let width = this.mouseTo.x - this.mouseFrom.x;
      let height = this.mouseTo.y - this.mouseFrom.y;

      switch (this.drawType) {
        case this.DrawType.PEN:
          this.rectObject = new Two.Line(
            this.mouseFrom.x,
            this.mouseFrom.y,
            this.mouseTo.x,
            this.mouseTo.y
          );
          this.mouseFrom = this.mouseTo;
          break;
        case this.DrawType.LINE:
          this.rectObject = new Two.Line(
            this.mouseFrom.x,
            this.mouseFrom.y,
            this.mouseTo.x,
            this.mouseTo.y
          );
          this.mouseFrom = this.mouseTo;
          break;
        case this.DrawType.CIRCLE:
          if (this.rectObject) {
            this.two.remove(this.rectObject);
          }

          let value =
            (this.mouseTo.x - this.mouseFrom.x) *
              (this.mouseTo.x - this.mouseFrom.x) +
            (this.mouseTo.y - this.mouseFrom.y) *
              (this.mouseTo.y - this.mouseFrom.y);
          console.log(this.mouseFrom, this.mouseTo);
          let radius = Math.sqrt(value) / 2 || 20;
          this.rectObject = new Two.Circle(
            this.mouseFrom.x,
            this.mouseFrom.y,
            radius
          );
          break;
        case this.DrawType.ELLIPSE:
          if (this.rectObject) {
            this.two.remove(this.rectObject);
          }

          this.rectObject = new Two.Ellipse(
            this.mouseFrom.x,
            this.mouseFrom.y,
            width,
            height
          );
          break;
        case this.DrawType.RECTANGLE:
          if (this.rectObject) {
            this.two.remove(this.rectObject);
          }

          this.rectObject = new Two.Rectangle(
            this.mouseFrom.x,
            this.mouseFrom.y,
            width,
            height
          );
          break;
      }

      if (this.rectObject) {
        this.two.add(this.rectObject);
        this.fill = "#FFF";
        this.rectObject.stroke = this.selectColor;
        this.rectObject.linewidth = this.selecteWidth;
      }
    },
    colorPickerChangeHandler(value) {},
    widthSliderChangeHandler(value) {},
    clear() {
      this.two.clear();
    },
  },
};
</script>
<style lang="stylus" scoped>
.el-container
    position relative
.el-main
    position relative
    .canvas
        width 100%
        height 100%
        background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==')
        background-size 20px 20px
    ul
        color #FFF
        right 10px
        top 10px
        position absolute
        li
            margin 2px 0
            height 40px
            line-height 40px
            width 60px
            font-size 15px
            text-align center
            background #409EFF
            cursor pointer
            &:hover
                background #F56C6C
            &.active
                background #F56C6C
            .el-color-picker
                width 100%
                >>> .el-color-picker__trigger
                    width 100%
                    padding 0
                    border none
                    .el-color-picker__icon:before
                        content '颜色'
                        font-size 15px
</style>
