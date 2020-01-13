<template>
  <el-main>
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Publisher</el-divider>
        <video ref="localVideo" class="video-item" autoplay></video>

        <StreamTracks v-model="localStream"></StreamTracks>
      </el-col>
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Subscriber</el-divider>
        <video ref="remoteVideo" class="video-item" autoplay></video>

        <StreamTracks v-model="remoteStream"></StreamTracks>
      </el-col>
    </el-row>

    <vue-source src="src/webrtc/views/webrtc/AudioVideoCall.vue" lang="html"></vue-source>
  </el-main>
</template>
<script>
import StreamTracks from './../../components/StreamTracks';
export default {
  name: "AudioVideoCall",
  components: {
    StreamTracks
  },
  data() {
    return {
      servers: { "iceServers": [{ "urls": "stun:stun.l.google.com:19302" }] },
      publisherPeerConnection: null,
      subscriberPeerConnection: null,
      localStream: null,
      remoteStream: null,
      options: {
        audio: true,
        video: {
          width: { exact: 720 },
          height: { exact: 405 }
        }
      },
      error: null
    }
  },
  methods: {
    init() {
      this.initLocalStream().then(() => {
        this.createSubscriber();
        this.createPublisher();
      });
    },
    initLocalStream() {
      const that = this;
      const video = this.$refs.localVideo;
      return new Promise((resolve, reject) => {
        //启动媒体设备
        navigator.mediaDevices.getUserMedia(this.options).then((stream) => {
          this.localStream = stream;
          stream.oninactive = function () {
            console.log('Stream inactive');
          };

          video.addEventListener('loadedmetadata', (e) => {
            console.log("AudioTracks", stream.getAudioTracks());
            console.log("VideoTracks", stream.getVideoTracks());
          });
          video.srcObject = stream;
          resolve(stream);
        }).catch(function (error) {
          that.error = error;
          console.log('navigator.getUserMedia error: ', error);
          reject(error);
        });
      });
    },
    createPublisher() {
      //创建对等连接 RTCPeerConnection
      this.publisherPeerConnection = new RTCPeerConnection(this.servers);

      this.localStream.getTracks().forEach((track) => {
        this.publisherPeerConnection.addTrack(track, this.localStream);
      });

      this.publisherPeerConnection.onicecandidate = (event) => {
        this.handleCandidate(event.candidate, this.subscriberPeerConnection, 'localPeer#:', 'local');
      };

      this.publisherPeerConnection.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      }).then((desc) => {
        this.publisherPeerConnection.setLocalDescription(desc);
        console.log('Offer from publisherPeerConnection \n' + desc.sdp);
        this.subscriberPeerConnection.setRemoteDescription(desc);

        this.subscriberPeerConnection.createAnswer().then((desc2) => {
          this.subscriberPeerConnection.setLocalDescription(desc2);
          console.log('Answer from subscriberPeerConnection \n' + desc2.sdp);
          this.publisherPeerConnection.setRemoteDescription(desc2);
        }).catch(function (error) {
          console.log('Failed to create session description: ' + error.toString());
        });
      }).catch(function (error) {
        console.log('Failed to create session description: ' + error.toString());
      });
    },
    createSubscriber() {
      this.subscriberPeerConnection = new RTCPeerConnection(this.servers);
      this.subscriberPeerConnection.ontrack = this.subscriberPeerTrackHandler;

      this.subscriberPeerConnection.onicecandidate = (event) => {
        this.handleCandidate(event.candidate, this.publisherPeerConnection, 'remotePeer#:', 'remote');
      };
    },
    handleCandidate(candidate, dest, prefix, type) {
      dest.addIceCandidate(candidate).then(() => {
        console.log('AddIceCandidate success.');
      }).catch(function (error) {
        console.log('Failed to add ICE candidate: ' + error.toString());
      });
      console.log(prefix + 'New ' + type + ' ICE candidate: ' + (candidate ? candidate.candidate : '(null)'));
    },
    subscriberPeerTrackHandler(event) {
      const video = this.$refs.remoteVideo;
      video.srcObject = this.remoteStream = event.streams[0];
      console.log('received remote stream', event);
    }
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.localStream && this.localStream.getTracks().forEach(track => {
      track.stop();
    });
    this.publisherPeerConnection.close();
    this.subscriberPeerConnection.close();
  }
}
</script>
<style lang="stylus" scoped>
.video-item {
  text-align: left;
  height: 270px;
  width: 100%;
  background: #EEE;
}

.video-item {
  width: 480px;
  background: #666;
}
</style>