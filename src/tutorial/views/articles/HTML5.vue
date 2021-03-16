<template>
  <el-main class="center">
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
    });</pre>
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
    });</pre>
    </vue-code>
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
