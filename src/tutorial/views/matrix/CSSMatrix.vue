<template>
  <el-container>
    <el-main :class="{ matrix: isMatrix }">
      <div v-if="isMatrix" class="block" :style="styleObject.matrixText">
        正
      </div>

      <div v-else class="block" :style="styleObject.transformText">楷</div>
    </el-main>

    <el-aside width="500px">
      <Sidebar v-model="form"></Sidebar>
      <p>{{ styleObject.matrix }}</p>
      <p>{{ styleObject.transform }}</p>
      <p>{{ transform }}</p>

      <el-row class="footer">
        <el-button
          :type="isMatrix ? 'success' : 'danger'"
          size="mini"
          @click="isMatrix = !isMatrix"
          >切换</el-button
        >
        <el-button type="success" size="mini" @click="resetHandler"
          >重置</el-button
        >
        <el-button type="primary" size="mini" @click="reloadHandler"
          >刷新</el-button
        >
      </el-row>
    </el-aside>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sidebar from "./Sidebar.vue";
import Matrix from "./Matrix";
const degToRadian = (deg: number) => {
  return (Math.PI / 180) * deg;
};
@Component({
  name: "Room",
  components: { Sidebar },
})
export default class Room extends Vue {
  private isMatrix = false;
  private styleObject: any = {
    transform: null,
    transformText: "",
    matrix: {},
    matrixText: "",
    transition: 1,
  };
  private form: any = {
    x: 400,
    y: 100,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    skewX: 0,
    skewY: 0,
    time: 1,
  };

  private get transform() {
    this.styleObject.transition = this.form.time;
    this.styleObject.transform =
      ` translate(${this.form.x}px, ${this.form.y}px)` + //平移
      ` rotate(${this.form.rotate}deg)` + //旋转
      ` skew(${this.form.skewX}deg, ${this.form.skewY}deg)` + //斜切/扭曲
      ` scale(${this.form.scaleX}, ${this.form.scaleY})`; //缩放

    this.styleObject.transformText = `transform: ${this.styleObject.transform}; transition: ${this.styleObject.transition}s; transform-origin: center`;

    /**
     * 矩阵：matrix(a, b, c, d, e, f)
     *
     * X轴    a    c    e
     * Y轴    b    d    f
     * Z轴    0    0    1
     * a: X轴水平缩放              scaleX: 1
     * b: Y轴纵向斜切（拉伸）       skewY: 0
     * c: X轴横向斜切（拉伸）       skewX: 0
     * d: Y轴纵向缩放              scaleY: 1
     * e: X轴水平偏移量            translateX: 0
     * f: Y轴垂直偏移量            translateY: 0
     */
    //Step 1. 平移 translate(x,y)
    //x,y 对应矩阵的 e,f, 默认值都是0
    const matrix: Matrix = new Matrix(1, 0, 0, 1, this.form.x, this.form.y);
    //Step 2、缩放scale(x,y)
    //x,y 对应矩阵的 a,d, 默认值都是1
    const scaleMatrix = new Matrix(
      this.form.scaleX,
      0,
      0,
      this.form.scaleY,
      0,
      0
    );

    //Step 3. 旋转 rotate(0deg);
    //旋转影响矩阵的 a, b, c, d四个值,并且需要把角度值转换成弧度值
    //弧度和角度值的转换公式, 弧度 = π / 180 x 角度;
    console.log(this.form.rotate, degToRadian(this.form.rotate));
    const sin = Math.sin(degToRadian(this.form.rotate)); // 计算 sinθ
    const cos = Math.cos(degToRadian(this.form.rotate)); // 计算 cosθ
    const rotateMatrix: Matrix = new Matrix(cos, sin, -sin, cos, 0, 0);

    //Step 4. 斜切 skew(0deg, 0deg)
    //斜切/扭曲的x, y 对应矩阵的 c, b;
    const skewMatrix: Matrix = new Matrix(
      1,
      Math.tan(degToRadian(this.form.skewY)),
      Math.tan(degToRadian(this.form.skewX)),
      1,
      0,
      0
    );

    this.styleObject.transition = this.form.time;
    // this.styleObject.matrix = matrix.concat(scaleMatrix).concat(rotateMatrix).concat(skewMatrix);
    this.styleObject.matrix = matrix
      .concat(rotateMatrix)
      .concat(skewMatrix)
      .concat(scaleMatrix);
    this.styleObject.matrixText = `transform: ${this.styleObject.matrix.toString()}; transition: ${
      this.styleObject.transition
    }s; transform-origin: center`;

    return this.form;
  }

  private resetHandler() {
    this.form = {
      x: 400,
      y: 100,
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      skewY: 0,
      time: 1,
    };
  }

  private reloadHandler() {
    window.location.reload();
  }
}
</script>
<style lang="stylus" scoped>
.el-container {
  height: 100%;
  font-size: 14px;

  .el-main {
    position: relative;
    background: rgb(253, 226, 226);

    .block {
      position: absolute;
      display: block;
      width: 200px;
      height: 220px;
      line-height: 200px;
      text-align: center;
      border-radius: 5px;
      font-family: '华文楷体';
      font-size: 5cm;
      background-image: -webkit-linear-gradient(bottom, #F56C6C, #FFFFFF);
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.55);
    }

    .el-footer {
      position: absolute;
      text-align: center;
      height: 60px;
      color: #FFF;
      bottom: 0;
      width: 100%;
    }

    &.matrix {
      background: rgb(225, 243, 216);

      .block {
        // background: #67C23A;
        background-image: -webkit-linear-gradient(bottom, #67C23A, #FFFFFF);
      }
    }
  }

  .el-aside {
    position: relative;
    width: 300px;
    color: #FFF;
    padding: 0 10px;
    background: rgb(121, 187, 255);

    .el-form >>> {
      label {
        color: #FFF;
        padding-right: 20px;
        text-align: center;
      }
    }

    .footer {
      position: absolute;
      bottom: 10px;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
