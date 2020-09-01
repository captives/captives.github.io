<template>
  <el-container>
    <el-container>
      <el-header>
        <span type="success">房间：{{tdvalue}}</span>
        <span>当前用户:{{user.name}} | {{user.uid}}</span>

        <i class="icon-button el-icon-more" @click="drawerVisible=true" style="right: 60px;"></i>
        <i class="icon-button el-icon-switch-button" @click="logoutHandler" style="right: 0;"></i>
      </el-header>

      <el-container>
        <el-aside width="320px" style="text-align:center">
          <VideoPanel v-if="localStream" :stream="localStream">
            <VideoPlayer :title="user.name" :stream="localStream" :muted="true" :range="stageRange"></VideoPlayer>
          </VideoPanel>

          <VideoPanel v-for="user in streamList" :key="user.id" :stream="user.stream">
            <VideoPlayer :title="user.name" :stream="user.stream" :muted="true" :range="stageRange"></VideoPlayer>
          </VideoPanel>
        </el-aside>
        <el-main ref="stage">主面板</el-main>
      </el-container>
    </el-container>

    <el-drawer
      :visible.sync="drawerVisible"
      :withHeader="false"
      direction="rtl"
      custom-class="slide-drawer"
      :modal-append-to-body="false"
    >
      <el-divider content-position="left">用户列表</el-divider>
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="id" label="UID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
      </el-table>

      <el-divider content-position="left">视频列表</el-divider>
      <el-table :data="streamList" border style="width: 100%">
        <el-table-column prop="id" label="UID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="streamId" label="媒体流地址"></el-table-column>
      </el-table>
    </el-drawer>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import VideoPanel from './VideoPanel.vue';
import VideoPlayer from './VideoPlayer.vue';
import api from './../api/index'

interface User { id: string, name: string };

interface UserMedia { id: string, name: string, streamId?: string, stream?: MediaStream };

@Component({
  name: "Room", components: { VideoPanel, VideoPlayer }
})
export default class Room extends Vue {
  private tdvalue: string = "7788";
  @Ref('stage') readonly stageElement: HTMLElement;
  private user: any = { uid: null, name: null };
  private localStream: MediaStream | null = null;
  private userList: Array<User> = [];
  private streamList: Array<UserMedia> = [];
  private drawerVisible: boolean = false;
  private stageRange: any = null;

  //路由进入
  beforeRouteEnter(to: any, from: any, next: Function) {
    console.log('进入路由');
    next();
  }

  beforeRouteUpdate(to: any, from: any, next: Function) {
    console.log('路由改变');
  }

  beforeRouteLeave(to: any, from: any, next: Function) {
    console.log('路由离开');
  }

  private logoutHandler() {
    //@ts-ignore
    this.$confirm("是否确认退出？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      api.destory().then(({ success }: any) => {
        if (success) {
          //@ts-ignore
          this.$message({ type: "success", message: "退出成功" });
          this.$router.push('/login');
        }
      });
    })
  }

  private onResize(element: HTMLElement) {
    // const rect = element.getBoundingClientRect();
    // const ratio = 4 / 3;
    // let width = rect.width, height = rect.height;
    // if (width >= height) {
    //   width = height * ratio;
    //   if (width > rect.width) {
    //     width = rect.width;
    //     height = width / ratio;
    //   }
    // } else {
    //   height = width / ratio;
    //   if (height > rect.height) {
    //     height = rect.height;
    //     width = height * ratio;
    //   }
    // }

    //@ts-ignore
    let rect = this.stageElement.$el.getBoundingClientRect();
    this.stageRange = { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    console.log(this.stageRange);
  }

  private created() {
    api.user().then(({ success, user }: any) => {
      if (success) {
        this.user.name = user.name;
        this.user.uid = user.time;
        //@ts-ignore
        this.$socket.emit('register', { role: 1, td: this.$route.params.td, name: user.name });
      }
    })
  }

  private mounted() {
    this.onResize(document.documentElement);
    window.onresize = () => {
      this.onResize(document.documentElement);
    };

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      this.localStream = stream;
      this.streamList.push({ ...this.user, stream });
      this.streamList.push({ ...this.user, stream });
    }).catch(err => {

    })
  }
}
</script>
<style lang="stylus" scoped>
.el-header {
  position: relative;
  background: rgb(140, 197, 255);
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0;

  span {
    margin: 0 20px;
    color: #FFF;
  }

  .icon-button {
    position: absolute;
    width: 60px;
    height: 60px;
    line-height: 60px;
    color: #FFF;
    background: none;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.35);
    }
  }
}

.el-main {
  background: #EEE;

  video {
    outline: none;
    width: 320px;
    height: 240px;
  }
}

>>> .slide-drawer {
  padding: 40px 20px;
}
</style>