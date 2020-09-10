<template>
  <el-main>
    <el-row ref="qrcode"></el-row>
    <el-row>
      <el-input placeholder="请输入内容" v-model="inputValue">
        <el-button type="danger" slot="append" @click="makeCode">生成</el-button>
      </el-input>
    </el-row>
    <el-row>
      <h1>文本内容</h1>
      {{ inputValue }}
    </el-row>
    <vue-source src="home\views\QRCode.vue"></vue-source>
  </el-main>
</template>

<script>
export default {
  name: "QRCode",
  data() {
    return {
      inputValue: "文本测试",
      qrcode: null,
    }
  },
  methods: {
    init() {
      console.log(QRCode, this.$refs.qrcode.$el);
      this.qrcode = new QRCode(this.$refs.qrcode.$el, {
        width: 200, height: 200
      });
      this.makeCode();
    },
    makeCode() {
      if (!this.inputValue) {
        this.$message({ type: "error", message: "请输入内容" });
      } else {
        this.qrcode.clear();
        this.qrcode.makeCode(this.inputValue);
      }

    }
  },
  mounted() {
    this.$fetch('./js/libs/qrcode.min.js').then(res => {
      let script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.innerText = res;
      document.body.appendChild(script);
      this.init();
    });
  }
}
</script>