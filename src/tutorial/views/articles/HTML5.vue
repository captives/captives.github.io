<template>
  <el-main>
    <h3>HTML5 基本知识</h3>
    <p>
      浏览器选项卡获取焦点和失去焦点
      <el-checkbox v-model="visibilityStated">监听</el-checkbox>
    </p>
    <vue-code>
      <pre lang="js">
document.addEventListener("visibilitychange", () => {
        if (document.visibilityState == "hidden") {
            document.title = "选项卡被隐藏";
        }else{
            document.title = "选项卡被激活";
        }
    });</pre
      >
    </vue-code>

    <p>
      浏览器选项卡关闭
      <el-checkbox v-model="selectValue">监听</el-checkbox>
    </p>
    <vue-code>
      <pre lang="js">
window.addEventListener("beforeunload", (e) => {
        if (this.selectValue) {
            var confirmationMessage = "要记得保存！你确定要离开我吗？";
            (e || window.event).returnValue = confirmationMessage; // 兼容 Gecko + IE
            return confirmationMessage; // 兼容 Gecko + Webkit, Safari, Chrome
        }
    });</pre
      >
    </vue-code>
    <div class="row-building"></div>
  </el-main>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "HTML5",
})
export default class HTML5 extends Vue {
  private visibilityStated = false;
  private selectValue = false;

  private visibilitychange() {
    document.addEventListener("visibilitychange", () => {
      if (this.visibilityStated) {
        if (document.visibilityState == "hidden") {
          document.title = "选项卡被隐藏";
        } else {
          document.title = "选项卡被激活";
        }
      }
    });
  }

  private beforeunload() {
    window.addEventListener("beforeunload", (e) => {
      if (this.selectValue) {
        var confirmationMessage = "要记得保存！你确定要离开我吗？";
        (e || window.event).returnValue = confirmationMessage; // 兼容 Gecko + IE
        return confirmationMessage; // 兼容 Gecko + Webkit, Safari, Chrome
      }
    });
  }

  private mounted() {
    this.visibilitychange();
    this.beforeunload();
  }
}
</script>
<style lang="stylus" scoped>
@keyframes radar-beam
    0%
        transform translateX(-100%)
    100%
        transform translateX(150%)
.row-building
    background #E6A23C
    height 60px
    position relative
    &::after
        content ''
        display block
        background-image linear-gradient(90deg, rgba(0, 255, 51, 0) 50%, rgba(103, 194, 58, .55) 100%)
        width 50%
        height 100%
        position absolute
        top 0
        left 0
        -webkit-animation radar-beam-data-v-64cd0161 5s infinite
        animation radar-beam-data-v-64cd0161 5s infinite
        -webkit-animation-timing-function linear
        animation-timing-function linear
        transform-origin bottom right
        border-radius 100% 0 0 0
</style>
