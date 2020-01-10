<template>
  <div class="container">
    <div id="video_display" class="fill" v-loading="loading"></div>
  </div>
</template>
<script>
export default {
  name: "VideoDisplay",
  props: {
    user: {
      type: Object,
      default: () => { }
    },
    td: {
      type: String,
      default: "1000"
    },
    appid: {
      type: String,
      default: '9bc022ca9b2d4b2e93ac03a4d548fc0d'
    }
  },
  data() {
    return {
      loading: false,
      videoProfile: "480P_4",
    }
  },
  computed: {
    publisher() {
      return this.user && this.user.role == this.RoleType.PUBLISHER;
    }
  },
  methods: {
    init() {
      this.videoStream.init().then(({ videoinput, audioinput }) => {
        console.log("设备列表", videoinput, audioinput);
        this.videoStream.videoElement = "video_display";
        this.videoStream.videoProfile = this.videoProfile;
        this.videoStream.streamID = this.user.id;
        this.videoStream.createStream().then(localStream => {
          this.videoStream.display();
          this.connect();
        }).catch(err => {
          console.log('localStream play err', err);
        });
      });
    },
    connect() {
      const that = this;
      this.videoClient.on("stream", uid => {
        console.log("Remove Video Stream ADD", uid);
        this.videoClient.player(uid, "video_display");
        if (!this.publisher) { this.loading = false; }
      });

      this.videoClient.on("removed", uid => {
        console.log("Remove Video Stream REMOVE", uid);
        this.videoClient.stopPlayer(uid, "video_display");
      });

      this.videoClient.on("error", error => {

      });

      this.videoClient.on('rejected', function (uid) {

      });

      this.videoClient.connect(this.appid, this.td, this.user.role + '' + this.user.id).then(() => {
        if (this.publisher) {
          this.videoClient.publish(this.videoStream.localStream);
          this.loading = false;
        }
      });
    }
  },
  mounted() {
    this.loading = true;
    console.log(this.user);
    this.publisher ? this.init() : this.connect()
  }
}
</script>
<style lang="stylus" scoped>
.container {
  position: relative;
  background: rgba(0, 0, 0, 0.75) url('/live/assets/logo.png') no-repeat center;
  color: #FFF;

  #video_display {
    pointer-events: none;
  }

  .fill {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
}
</style>