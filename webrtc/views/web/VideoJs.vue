<template>
  <el-main>
    <url-input v-model="url" :list="$videoList" @input="urlInputHandler"></url-input>
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">video</el-divider>
        <div class="videodisplay">
          <video :src="url" autoplay muted loop></video>
        </div>
      </el-col>
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">video js</el-divider>
        <div class="videodisplay">
          <video id="video-js" :src="url"></video>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import videoJs from 'video.js'
import 'video.js/dist/video-js.min.css'

export default {
  name: "Video",
  data() {
    return {
      url: "",
      player: null
    }
  },
  methods: {
    init() {
      this.player = videoJs('video-js', {
        autoplay: true,
        muted: true, controls: true,
        height: 480, loop: true
      }, function onPlayerReady() {
        videoJs.log('播放器准备完毕', this);
        this.on('loadstart', function () {
          console.log('loadstart------------')
        });

        this.on('loadedmetadata', function (data) {
          console.log('loadedmetadata---视频源数据加载完成----', data)
        });

        this.on('loadeddata', function (data) {
          console.log('loadeddata---渲染播放画面----', data);
        });

        this.on('progress', function (event) {
          console.log('progress-------加载过程----', event)
        });

        document.querySelector('.vjs-progress-control').addEventListener('click', () => {

        });

        const video = document.querySelector('#video-js video');
        video.addEventListener('seeking', (event) => {
          console.log('seeking --> ', player.currentTime(), event.target.currentTime);
        });
        video.addEventListener('seeked', (event) => {
          console.log('seeked --> ', player.currentTime(), event.target.currentTime);
        });

        // this.on('timeupdate', function () {
        //   const curTime = this.currentTime();
        //   //从指定时间开始
        //   if (curTime < 1200) {
        //     this.currentTime(1200);
        //   }
        //   // console.log('timeupdate', curTime, this.duration());
        // })
      });
    },
    urlInputHandler(value) {
      if (this.player) {
        this.player.src = value;
        this.player.play();
      }
    }
  },
  mounted() {
    this.init();
  }
}
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