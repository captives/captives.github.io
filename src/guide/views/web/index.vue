<template>
  <el-main>
    <VueShareWorker></VueShareWorker>
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in list"
        :key="item.label"
        :label="item.label"
        :span="list.length/24"
      >
        <el-button :type="index%2 ==0 ?'danger':'success'" @click="loadURL(item.url)">{{item.label}}</el-button>
      </el-col>
    </el-row>
    <el-main style="height: 80%">
      <iframe :src="url" allow="autoplay" frameborder="0" scrolling="no"></iframe>
    </el-main>

    <!-- <iframe :src="item.url" allow="autoplay" frameborder="0" scrolling="no"></iframe>
    <canvas style="position:absolute; width:100%;height:100%;top:0;left:0"></canvas>-->

    <!--  <el-tabs type="border-card">
      <el-tab-pane v-for="item in list" :key="item.label" :label="item.label">
        <p v-if="item.desc">{{item.desc}}</p>
        <iframe :src="item.url" allow="autoplay" frameborder="0" scrolling="no"></iframe>
        <canvas style="position:absolute; width:100%;height:100%;top:0;left:0"></canvas>
      </el-tab-pane>
    </el-tabs>-->
  </el-main>
</template>
<script>
import VueShareWorker from './../../components/VueShareWorker';
export default {
  name: "index",
  components: { VueShareWorker },
  data() {
    return {
      url: null,
      list: [
        // { label: '自动播放策略', url: "https://dev.redis.server/testIframe.html" },
        // { label: '淘宝镜像', url: "//npm.taobao.org/" },
        // { label: '西瓜播放器', url: "//h5player.bytedance.com/" },
        // { label: 'video.js', url: "//videojs.com/" },
        // { label: 'MediaElement.js', url: "//www.mediaelementjs.com/" },
      ]
    }
  },
  methods: {
    loadURL(url) {
      this.url = url;
      console.log('加载页面', url);

    }
  },
  mounted() {
    //媒体参与度查询 chrome://media-engagement/
    this.list.push({ label: '自动播放 - 直接加载', url: "/v3/testIframe.html", desc: "这里模拟百家云教室加载课件" });
    this.list.push({ label: '自动播放 - 直接加载(跨域)', url: "/v3/testIframe2.html", desc: "这里模拟百家云教室加载课件" });
    this.list.push({ label: '自动播放 + 自动跳转', url: "/v3/testReward.html", desc: "这里模拟百家云教室加载课件" });
    this.list.push({ label: '自动播放 + 自动跳转(同域)', url: "/v3/testReward2.html", desc: "这里模拟百家云教室加载课件" });
    this.list.push({ label: '自动播放 + 自动跳转(跳转后同域)', url: "/v3/testReward3.html", desc: "这里模拟百家云教室加载课件" });
  }
}
</script>
<style lang="stylus" scoped>
.el-main {
  overflow: hidden;

  .el-tabs {
    width: 100%;
    height: 100%;

    >>> .el-tabs__content {
      height: calc(100% - 69px);

      .el-tab-pane {
        height: 100%;
      }
    }
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>