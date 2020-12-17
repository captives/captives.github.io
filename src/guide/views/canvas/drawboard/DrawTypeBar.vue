<template>
  <ul>
    <li
      :class="{ active: selected(DrawType.SELECT) }"
      @click="drawTypeChange(DrawType.SELECT)"
    >
      选中
    </li>
    <li class="divider"></li>
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
      :class="{ active: selected(DrawType.ARROW2) }"
      @click="drawTypeChange(DrawType.ARROW2)"
    >
      箭头2
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
      正方形
    </li>
    <li
      :class="{ active: selected(DrawType.SQUARE) }"
      @click="drawTypeChange(DrawType.RECTANGLE)"
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
      正三角形
    </li>
    <li
      :class="{ active: selected(DrawType.TEXT) }"
      @click="drawTypeChange(DrawType.TEXT)"
    >
      文字
    </li>
    <li
      :class="{ active: selected(DrawType.TEXTBOX) }"
      @click="drawTypeChange(DrawType.TEXTBOX)"
    >
      文本框
    </li>
    <li
      :class="{ active: selected(DrawType.ITEXT) }"
      @click="drawTypeChange(DrawType.ITEXT)"
    >
      文本域
    </li>
    <li
      :class="{ active: selected(DrawType.ERASER) }"
      @click="drawTypeChange(DrawType.ERASER)"
    >
      橡皮擦
    </li>
    <li class="divider"></li>
    <slot></slot>
  </ul>
</template>
<script>
const DrawType = {
  PEN: "pen", //画笔
  BRUSH: "brush", //刷子
  ARROW: "arrow", //箭头
  ARROW2: "arrow2", //箭头
  LINE: "line", //直线
  DOTTEDLINE: "dottedline", //虚线
  CIRCLE: "circle", //正圆
  ELLIPSE: "ellipse", //椭圆
  SQUARE: "square", //正方形
  RECTANGLE: "rectangle", //长方形
  RIGHTANGLE: "rightangle", //直角三角形
  EQUILATERAL: "equilateral", //等边三角形
  TEXT: "text", //文字
  TEXTBOX: "textbox", //文字
  ITEXT: "itext", //文字
  SELECT: "select", //选中
  ERASER: "eraser", //橡皮擦
};

export { DrawType };
export default {
  name: "DrawTypeBar",
  data() {
    return {
      drawType: "select",
      DrawType: DrawType,
    };
  },
  computed: {
    selected() {
      return (type) => {
        return this.drawType === type;
      };
    },
  },
  methods: {
    drawTypeChange(type) {
      this.drawType = type;
      this.$emit("change", type);
    },
  },
};
</script>
<style lang="stylus" scoped>
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
        &.divider
            height 4px
            line-height 4px
            &:hover
                background #409EFF
</style>
