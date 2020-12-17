<template>
  <el-row>
    <h1>基本图形</h1>
    <el-select v-model="typeValue" placeholder="请选择" @change="changeHandler">
      <el-option-group
        v-for="group in options"
        :key="group.label"
        :label="group.label"
      >
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-option-group>
    </el-select>
    <h1>矢量图形</h1>
    <label style="font-weight: bold; padding: 0 10px">
      <el-input-number
        v-model="inputNumber"
        :min="1"
        :max="183"
        label="矢量图形"
      ></el-input-number>
      <el-button type="primary" @click="changeHandler('shape' + inputNumber)"
        >添加</el-button
      >
    </label>
  </el-row>
</template>
<script>
import { fabric } from "fabric";
import { getRandomNum, getRandomLeftTop, getRandomColor } from "./utils.js";
export default {
  name: "BasicAssembly",
  data() {
    return {
      typeValue: 1,
      inputNumber: 1,
      options: [
        {
          label: "简单图形",
          options: [
            { label: "长方形", value: "rect" },
            { label: "圆圈", value: "circle" },
            { label: "三角形", value: "triangle" },
            { label: "线条", value: "line" },
            { label: "多边形", value: "polygon" },
            { label: "文字", value: "text" },
            { label: "文本框", value: "itext" },
            { label: "文本域", value: "textbox" },
            { label: "矩形图案", value: "patternrect" },
          ],
        },
        {
          label: "图形图像",
          options: [
            { label: "图片1", value: "image1" },
            { label: "图片2", value: "image2" },
            { label: "图片3", value: "image3" },
            { label: "视频", value: "image4" },
          ],
        },
        {
          label: "渐变图形",
          options: [
            { label: "渐变1", value: "shape74" },
            { label: "渐变2", value: "shape66" },
            { label: "渐变3", value: "shape75" },
            { label: "渐变4", value: "shape148" },
          ],
        },
        {
          label: "组合图形",
          options: [
            { label: "弧线1", value: "shape104" },
            { label: "弧线2", value: "shape105" },
            { label: "弧线3", value: "shape106" },
            { label: "弧线4", value: "shape107" },
            { label: "转换路径", value: "shape103" },
          ],
        },
      ],
    };
  },
  mounted() {
    // Shape素材下载 http://fabricjs.com/kitchensink
    // let index = 0;
    // let id = setInterval(() => {
    //   index++;
    //   if (index > 183) {
    //     clearInterval(id);
    //   } else {
    //     const a = document.createElement('a');
    //     a.style.display = 'none';
    //     a.href = 'assets/' + index + ".svg";
    //     a.download = 'shape' + index + ".svg";
    //     document.body.appendChild(a);
    //     a.click();
    //   }
    // }, 1000);
  },
  methods: {
    addImage(uri, options, minScale, maxScale) {
      return new Promise((resolve, reject) => {
        fabric.Image.fromURL("assets/" + uri, (image) => {
          image
            .set(options)
            .scale(getRandomNum(minScale, maxScale))
            .setCoords();
          resolve(image);
        });
      });
    },
    addShape(name, option) {
      console.log("adding shape", name);
      return new Promise((resolve, reject) => {
        fabric.loadSVGFromURL(
          "assets/shapes/" + name + ".svg",
          function (objects, options) {
            var rect = fabric.util.groupSVGElements(objects, options);
            rect.set(option).setCoords();
            resolve(rect);
          }
        );
      });
    },
    async changeHandler(value) {
      const coord = getRandomLeftTop();
      const color = "#" + getRandomColor();
      const pattern = new fabric.Pattern({
        source: "assets/logo.png",
        repeat: "repeat",
      });
      const text =
        "Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n" +
        "Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.";
      let rect = null;
      switch (value) {
        case "rect":
          rect = new fabric.Rect({
            ...coord,
            fill: color,
            width: 50,
            height: 50,
            opacity: 0.8,
          });
          break;
        case "circle":
          rect = new fabric.Circle({
            ...coord,
            fill: color,
            radius: 50,
            opacity: 0.8,
          });
          break;
        case "triangle":
          rect = new fabric.Triangle({
            ...coord,
            fill: color,
            width: 50,
            height: 50,
            opacity: 0.8,
          });
          break;
        case "line":
          rect = new fabric.Line([50, 100, 200, 200], {
            ...coord,
            stroke: color,
          });
          break;
        case "polygon":
          rect = new fabric.Polygon(
            [
              { x: 185, y: 0 },
              { x: 250, y: 100 },
              { x: 385, y: 170 },
              { x: 0, y: 245 },
            ],
            {
              ...coord,
              fill: color,
            }
          );
          break;
        case "text":
          rect = new fabric.Text(text.slice(0, getRandomNum(0, text.length)), {
            ...coord,
            fill: color,
            fontFamily: "helvetica",
            angle: getRandomNum(-10, 10),
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: "",
            originX: "left",
            hasRotatingPoint: true,
            centerTransform: true,
          });
          break;
        case "itext":
          rect = new fabric.IText(text.slice(0, getRandomNum(0, text.length)), {
            ...coord,
            fill: color,
            fontFamily: "helvetica",
            angle: getRandomNum(-10, 10),
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: "",
            originX: "left",
            hasRotatingPoint: true,
            centerTransform: true,
          });
        case "textbox":
          rect = new fabric.Textbox(
            text.slice(0, getRandomNum(0, text.length)),
            {
              ...coord,
              fill: color,
              fontSize: 20,
              fontFamily: "helvetica",
              angle: getRandomNum(-10, 10),
              fontWeight: "",
              originX: "left",
              width: 300,
              hasRotatingPoint: true,
              centerTransform: true,
            }
          );
          break;
        case "patternrect":
          rect = new fabric.Rect({
            width: 300,
            height: 300,
            ...coord,
            angle: getRandomNum(-10, 10),
            fill: pattern,
          });
          alert("添加不生效,需要检查");
          break;
        case "image1":
          rect = await this.addImage(
            "image.jpg",
            { ...coord, angle: getRandomNum(-10, 10) },
            0.1,
            0.25
          );
          break;
        case "image2":
          rect = await this.addImage(
            "logo.png",
            { ...coord, angle: getRandomNum(-10, 10) },
            0.1,
            1
          );
          break;
        case "image3":
          rect = await this.addImage(
            "logo.png",
            { ...coord, angle: getRandomNum(-10, 10) },
            0.5,
            0.75
          );
          break;
        default: {
          if (value.indexOf("shape") != -1) {
            rect = await this.addShape(value, {
              ...coord,
              angle: getRandomNum(-10, 10),
            });
          } else {
          }
        }
      }
      console.log(coord, color);
      this.$emit("change", value, rect);
    },
  },
};
</script>
<style lang="stylus" scoped></style>
