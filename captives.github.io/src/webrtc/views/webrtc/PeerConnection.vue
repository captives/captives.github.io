<template>
<el-main>
  <el-row :gutter="50">
    <el-col class="center" :xs="24" :sm="24" :md="12">
      <el-divider content-position="left">Publisher</el-divider>
      <div class="textarea" contenteditable @input="inputHandler"></div>
    </el-col>
    <el-col class="center" :xs="24" :sm="24" :md="12">
      <el-divider content-position="left">Subscriber</el-divider>
      <div class="textarea">{{ outputText }}</div>
    </el-col>
  </el-row>
  <el-tag class="error">左侧输入信息，右侧同步显示</el-tag>
</el-main>
</template>

<script>
export default {
  name: "PeerConnection",
  data() {
    return {
      inputText: '',
      outputText: '',
      servers: null,// {"iceServers": [{"urls": "stun:stun.l.google.com:19302"}]};
      dataChannel: null,
      publisherPeerConnection: null,
      subscriberPeerConnection: null,
      error: null
    }
  },
  methods: {
    inputHandler(event) {
      this.inputText = event.target.outerText;
      if (this.dataChannel && this.dataChannel.readyState === 'open') {
        this.dataChannel.send(this.inputText);
      }
    },
    init() {
      this.createPublisher();
      this.createSubscriber();
    },
    createPublisher() {
      //创建对等连接 RTCPeerConnection
      this.publisherPeerConnection = new RTCPeerConnection(this.servers);
      //创建数据通道
      this.dataChannel = this.publisherPeerConnection.createDataChannel('sendDataChannel');
      this.dataChannel.onopen = (data) => {
        console.log('Send channel state is: ' + this.dataChannel.readyState);
      };

      this.dataChannel.onclose = (data) => {
        console.log('Send channel state is: ' + this.dataChannel.readyState);
      };

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
      this.subscriberPeerConnection.onicecandidate = (event) => {
        this.handleCandidate(event.candidate, this.publisherPeerConnection, 'remotePeer#:', 'remote');
      };

      this.subscriberPeerConnection.ondatachannel = (event) => {
        var remoteChannel = event.channel;
        remoteChannel.onmessage = (evt) => {
          this.outputText = evt.data;
        };

        remoteChannel.onopen = remoteChannel.onclose = () => {
          var readyState = remoteChannel.readyState;
          console.log('Receive channel state is: ' + readyState);
        }
      };
    },
    handleCandidate(candidate, dest, prefix, type) {
      dest.addIceCandidate(candidate).then(() => {
        console.log('AddIceCandidate success.');
      }).catch(function (error) {
        console.log('Failed to add ICE candidate: ' + error.toString());
      });
      console.log(prefix + 'New ' + type + ' ICE candidate: ' + (candidate ? candidate.candidate : '(null)'));
    }
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.publisherPeerConnection.close();
    this.subscriberPeerConnection.close();
  }
}
</script>
<style lang="stylus" scoped>
.textarea {
  padding: 20px;
  line-height: 25px;
  text-align: left;
  height: 270px;
  background: #EEE;
  white-space: pre-wrap;
  overflow: auto;
}
</style>