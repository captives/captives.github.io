<template>
  <el-container>
    <el-row>
      <el-button type="success" @click="captureHandler">截图</el-button>
    </el-row>
    <el-main>
      <iframe src="//html2canvas.hertzen.com/" frameborder="0"></iframe>
    </el-main>
    <el-dialog title="截图" width="80%" :visible.sync="dialogVisible">
      <el-image ref="image" :src="src"></el-image>
    </el-dialog>
  </el-container>
</template>
<script>
import html2canvas from "html2canvas";
export default {
  name: "Html2Canvas",
  data() {
    return {
      dialogVisible: false,
      src: "",
    };
  },
  methods: {
    captureHandler() {
      html2canvas(document.querySelector("body")).then((canvas) => {
        this.dialogVisible = true;
        console.log(this.$refs.image);
        console.log(canvas);
        // canvas.style.width = '80%';
        // canvas.style.height = '640px';
        if (canvas) {
          this.src = canvas.toDataURL("image/png");
        }
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
iframe {
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.image {
  width: 100%;
  height: 100%;
  background: red;
}
</style>
