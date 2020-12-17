<template>
  <el-main>
    <el-row :gutter="10">
      <el-col :span="10">动态添加iframe页面</el-col>
      <el-col v-if="activateData" :span="13">
        当前激活交互窗口{{ activateData.id }}
        <el-button type="danger" @click="sendPageIframeHandler"
          >发送指令</el-button
        >
      </el-col>
      <el-col :span="1">
        <el-button type="primary" tyle="small" @click="addHandler"
          >增加</el-button
        >
      </el-col>
    </el-row>
    <el-carousel trigger="click" height="500px" :interval="60000">
      <el-carousel-item v-for="item in list" :key="item.id">
        <iframe
          :id="'iframe_' + item.id"
          :src="item.src"
          frameborder="0"
          :title="item.title"
        ></iframe>
      </el-carousel-item>
    </el-carousel>
  </el-main>
</template>
<script>
export default {
  name: "DynamicIframeDeliver",
  data() {
    return {
      activateData: null,
      list: [{ id: 11, title: "窗口1", src: "vue.html" }],
    };
  },
  mounted() {
    window.addEventListener("message", this.onmessageHandler.bind(this));
  },
  methods: {
    addHandler() {
      let id = Math.floor(Math.random() * 999999);
      this.list.push({ id: id, title: "窗口 " + id, src: "vue.html?v=" + id });
    },
    onmessageHandler(e) {
      const data = e.data;
      if (data.event && data.event === "actived") {
        this.activateData = data;
      }
      console.log("VUE --", e.data);
    },
    sendPageIframeHandler() {
      const iframe = document.getElementById(this.activateData.id);
      iframe.contentWindow.command(new Date().toLocaleTimeString());
    },
  },
};
</script>
<style lang="stylus" scoped>
.el-row {
  margin-bottom: 20px;
}

.el-carousel {
  background: rgb(254, 240, 240);

  >>>iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
