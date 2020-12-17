<template>
  <el-main>
    <el-header>Shaka Player <small>dash/hls播放器</small></el-header>
    <url-input
      v-model="url"
      :list="$videoList"
      @change="changeHandler"
    ></url-input>
    <el-row ref="videoContainer" class="videoContainer">
      <video ref="video" autoplay></video>
    </el-row>
    <p>ffmpeg 自适应流</p>
    <vue-code>
      <pre lang="bash">
# video streams
$ ffmpeg -i bunny_1080p_60fps.mp4 -c:v libvpx-vp9 -s 160x90 -b:v 250k -keyint_min 150 -g 150 -an -f webm -dash 1 video_160x90_250k.webm

$ ffmpeg -i bunny_1080p_60fps.mp4 -c:v libvpx-vp9 -s 320x180 -b:v 500k -keyint_min 150 -g 150 -an -f webm -dash 1 video_320x180_500k.webm

$ ffmpeg -i bunny_1080p_60fps.mp4 -c:v libvpx-vp9 -s 640x360 -b:v 750k -keyint_min 150 -g 150 -an -f webm -dash 1 video_640x360_750k.webm

$ ffmpeg -i bunny_1080p_60fps.mp4 -c:v libvpx-vp9 -s 640x360 -b:v 1000k -keyint_min 150 -g 150 -an -f webm -dash 1 video_640x360_1000k.webm

$ ffmpeg -i bunny_1080p_60fps.mp4 -c:v libvpx-vp9 -s 1280x720 -b:v 1500k -keyint_min 150 -g 150 -an -f webm -dash 1 video_1280x720_1500k.webm

# audio streams
$ ffmpeg -i bunny_1080p_60fps.mp4 -c:a libvorbis -b:a 128k -vn -f webm -dash 1 audio_128k.webm

$ ffmpeg -i bunny_1080p_60fps.mp4 -c:a libvorbis -b:a 320k -vn -f webm -dash 1 audio_320k.webm

# the DASH manifest
$ ffmpeg \
 -f webm_dash_manifest -i video_160x90_250k.webm \
 -f webm_dash_manifest -i video_320x180_500k.webm \
 -f webm_dash_manifest -i video_640x360_750k.webm \
 -f webm_dash_manifest -i video_640x360_1000k.webm \
 -f webm_dash_manifest -i video_1280x720_1500k.webm \
 -f webm_dash_manifest -i audio_128k.webm \
 -f webm_dash_manifest -i audio_320k.webm \
 -c copy -map 0 -map 1 -map 2 -map 3 -map 4 -map 5 -map 6 \
 -f webm_dash_manifest \
 -adaptation_sets "id=0,streams=0,1,2,3,4 id=1,streams=5,6" \
 manifest.mpd
      </pre>
    </vue-code>

    <p>Dash.js</p>
    <vue-code>
      <pre lang="js">
&lt;body&gt;
  &lt;video id=&quot;videoPlayer&quot; controls&gt;&lt;/video&gt;
  ...
  &lt;script src=&quot;yourPathToDash/dash.all.min.js&quot;&gt;&lt;/script&gt; 
  &lt;!-- or debug --&gt;
  &lt;script src=&quot;yourPathToDash/dash.all.debug.js&quot;&gt;&lt;/script&gt; 
&lt;/body&gt;

&lt;script&gt;
  var url = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd";
  var player = dashjs.MediaPlayer().create();
  player.initialize(document.querySelector("#videoPlayer"), url, true);
&lt;/script&gt;
      </pre>
    </vue-code>
  </el-main>
</template>
<script>
//https://shaka-player-demo.appspot.com/
import * as shaka from "shaka-player/dist/shaka-player.ui.js";
import "shaka-player/dist/controls.css"; /* Shaka player CSS import */
export default {
  name: "VueShakaPlayer",
  data() {
    return {
      url: null,
      player: null,
    };
  },
  mounted() {
    console.log("播放示例列表, http://players.akamai.com/players");
    console.log("ShakaPlayer", shaka);
    this.$videoList = [
      {
        label: "Dash 测试1",
        value:
          "https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd",
      },
      {
        label: "Dash 按需配置 ",
        value:
          "https://dash.akamaized.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd",
      },
      {
        label: "Dash 按需配置 ",
        value:
          "https://demo.unified-streaming.com/video/ateam/ateam.ism/ateam.mpd",
      },
      {
        label: "Dash 实时配置文件 ",
        value: "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd",
      },
      {
        label: "Dash 实时配置文件 最高4K",
        value: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
      },
      {
        label: "Dash live 1",
        value:
          "https://cph-msl.akamaized.net/dash/live/2003285/test/manifest.mpd",
      },
      {
        label: "Dash live 2 具有认证",
        value:
          "https://cph-msl-ta.akamaized.net/dash/live/2003285/test/manifest.mpd?hdnts=st=1576841519~exp=1892201519~acl=/*~hmac=2cd04fd6efa7c852ac45aa0866366879e485319f68cca2cf7ecfcc1463d8db0d",
      },
      {
        label: "HLS 测试1",
        value:
          "https://multiplatform-f.akamaihd.net/i/multi/april11/sintel/sintel-hd_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8",
      },
      {
        label: "HLS 测试2",
        value:
          "https://cph-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
      },
    ];
  },
  methods: {
    init(url) {
      //安装内置polyfill, 修补浏览器兼容性
      shaka.polyfill.installAll();
      //检查浏览器是否支持Shaka需要的基本api。
      console.log("兼容性", shaka.Player.isBrowserSupported());
      if (shaka.Player.isBrowserSupported()) {
        this.initPlayer(url);
        // this.initPlayer2(url);
      } else {
        // 此浏览器没有我们所需的最少API集。
        console.error("Browser not supported!");
      }
    },
    async initPlayer2(url) {
      const video = this.$refs.video;
      const ui = video["ui"];
      const controls = ui.getControls();
      const player = controls.getPlayer();
      // Listen for error events.
      player.addEventListener("error", onPlayerErrorEvent);
      controls.addEventListener("error", onUIErrorEvent);
      // Try to load a manifest.
      // This is an asynchronous process.
      try {
        await player.load(url);
        // This runs if the asynchronous load is successful.
        console.log("The video has now been loaded!");
      } catch (error) {
        onPlayerError(error);
      }

      function onPlayerErrorEvent(errorEvent) {
        // Extract the shaka.util.Error object from the event.
        onPlayerError(event.detail);
      }

      function onPlayerError(error) {
        // Handle player error
        console.error("Error code", error.code, "object", error);
      }

      function onUIErrorEvent(errorEvent) {
        // Extract the shaka.util.Error object from the event.
        onPlayerError(event.detail);
      }

      function initFailed(errorEvent) {
        // Handle the failure to load; errorEvent.detail.reasonCode has a
        // shaka.ui.FailReasonCode describing why.
        console.error("Unable to load the UI library!");
      }

      // document.addEventListener('shaka-ui-loaded', init);
      // Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails
      // to load (e.g. due to lack of browser support).
      document.addEventListener("shaka-ui-load-failed", initFailed);
    },
    initPlayer(url) {
      const video = this.$refs.video;
      this.player = new shaka.Player(video);

      //UI扩展https://shaka-player-demo.appspot.com/docs/api/tutorial-ui-customization.html
      const ui = new shaka.ui.Overlay(
        this.player,
        this.$refs.videoContainer.$el,
        video
      );
      ui.configure({
        addSeekBar: true, //播放进度条
        seekBarColors: {
          //进度条颜色
          base: "rgba(255, 255, 255, 0.3)",
          buffered: "rgba(255, 255, 255, 0.54)",
          played: "rgb(255, 255, 255)",
          //如果使用广告功能,可以在时间轴上为广告间隔标记指定颜色：
          adBreaks: "rgb(255, 204, 0)",
        },
        controlPanelElements: [
          //控件元素集合
          "play_pause", //播放暂停
          "time_and_duration", //时间
          "spacer", //空白分隔符
          "rewind", //快进
          "fast_forward", //快退
          "mute", //静音
          "fullscreen", //全屏
          "overflow_menu", //更多菜单
          "quality",
        ],
        overflowMenuButtons: [
          //溢出/更多菜单
          "captions", //字幕,有的话才显示
          "cast",
          "quality", //分辨率
          "language", //语言
          "picture_in_picture", //画中画
          "playback_rate", //播放速度
          "loop", //循环播放
        ],
      });

      const controls = ui.getControls();
      console.log("shaka.ui", Object.keys(shaka.ui));

      this.player.configure({
        drm: {
          servers: {
            "com.widevine.alpha": "https://widevine-proxy.appspot.com/proxy",
          },
        },
      });

      controls.addEventListener("error", (event) => {
        // Extract the shaka.util.Error object from the event.
        console.log(event.detail);
      });

      this.player
        .load(url)
        .then(function () {
          //如果异步加载成功，则运行此操作
          console.log("The video has now been loaded!");
        })
        .catch((error) => {
          // onError is executed if the asynchronous load fails.
          console.error("Error code", error.code, "object", error);
        });
    },
    changeHandler() {
      this.init(this.url);
    },
  },
};
</script>
<style lang="stylus" scoped>
.el-main {
  .el-header {
    line-height: 60px;
  }

  .videoContainer {
    margin: 20px 0;
    height: 480px;
    width: 100%;
    background: rgba(84, 92, 100, 0.65);

    video {
      max-width: 100%;
      height: 100%;
      margin: 0 auto;
    }
  }
}
</style>
