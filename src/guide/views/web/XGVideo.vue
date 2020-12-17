<template>
  <el-main>
    <url-input
      v-model="config.url"
      :list="$videoList"
      @input="urlInputHandler"
    ></url-input>
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">video</el-divider>
        <div class="videodisplay">
          <video :src="config.url" autoplay muted loop></video>
        </div>
      </el-col>
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">西瓜视频</el-divider>
        <div class="videodisplay">
          <div id="player" class="player"></div>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
//http://h5player.bytedance.com/plugins/#pc
import Player from "xgplayer";
// import 'xgplayer-mp4';
// import { time } from './../plugins/xgplayer-time';

export default {
  name: "Video",
  data() {
    return {
      config: {
        id: "player",
        height: "480",
        width: "100%",
        url: "/medias/demo.mp4",
        poster: null,
        autoplay: true,
        videoInit: true, //初始化显示首帧
        // screenShot: true,
        playsinline: true, //开启ios和微信的内联模式
        "x5-video-player-type": "h5", //微信同层播放
        "x5-video-player-fullscreen": true, //微信全屏播放
        controls: true, //原生
        ignores: [], //'fullscreen'
        //播放器初始化的时候传递配置参数
        customConfig: {},
        execBeforePluginsCall: [
          () => {
            console.log("before ---> ");
          },
        ],
      },
      player: null,
    };
  },
  mounted() {
    this.player = new Player(this.config);

    console.log(this.player);
    // Xgplayer.install('time', time);
  },
  methods: {
    urlInputHandler(url) {
      this.player.src = url;
    },
  },
};
</script>
<style lang="stylus" scoped>
.videodisplay {
  background: rgba(0, 0, 0, 0.55);

  video, #vs, .player {
    width: 100%;
    height: 100%;
  }
}
</style>
