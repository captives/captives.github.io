<template>
  <div class="container">
    <div id="video_display" class="fill" v-loading="loading"></div>
    <el-button
      class="setting"
      type="danger"
      icon="el-icon-setting"
      circle
      @click="dialog.visible=true"
    ></el-button>]


    <el-dialog
      title="设置"
      :visible.sync="dialog.visible"
      :append-to-body="true"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="600px"
    >
      <div class="pre-video"></div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="摄像头">
          <el-select v-model="form.cameraId" placeholder="请选择摄像头">
            <el-option
              v-for="(item,index) in videoStream.cameras"
              :key="index"
              :label="item.label"
              :value="item.deviceId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="麦克风">
          <el-select v-model="form.microphoneId" placeholder="请选择麦克风">
            <el-option
              v-for="(item,index) in videoStream.microphones"
              :key="index"
              :label="item.label"
              :value="item.deviceId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible=false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
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
      form: {
        cameraId: null,
        microphoneId: null,
      },
      dialog: {
        visible: false
      }
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
          this.form.cameraId = this.videoStream.cameraId;
          this.form.microphoneId = this.videoStream.microphoneId;
          this.videoStream.display();
          this.connect();
        }).catch(err => {
          console.log('localStream play err', err);
          this.$message({ type: "error", message: err });
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

  .el-button.setting {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 17px;
    padding: 5px 6px 5px 5px;
  }
}

.el-dialog__wrapper {
  >>> .el-dialog__body {
    display: flex;
  }

  .pre-video {
    width: 240px;
    height: 160px;
    background: red;
  }

  .el-form {
    width: calc(100% - 240px);

    .el-form-item {
      margin: 20px 0;
    }
  }
}
</style>