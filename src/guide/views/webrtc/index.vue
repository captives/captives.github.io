<template>
  <el-main>
    <el-row>
      <h3>
        <router-link to="/webrtc/stream-from-usermedia">Stream from UserMedia</router-link>
      </h3>
      <vue-code>
        <pre lang="javascript">
navigator.mediaDevices.getUserMedia({ video:true, audio:true }).then((stream) => {
  stream.oninactive = function () {
    console.log('Stream inactive - stop!');
  };

  video.srcObject = stream;
}).catch(function (error) {
  console.log('navigator.getUserMedia error: ', error);
});
</pre>
      </vue-code>
    </el-row>
    <el-row>
      <h3>
        <router-link to="/webrtc/stream-from-displaymedia">Stream from DisplayMedia</router-link>
      </h3>

      <vue-code>
        <pre lang="javascript">
getDisplayMedia() {
    if (navigator.getDisplayMedia) {
        return navigator.getDisplayMedia({ video: true });
    } else if (navigator.mediaDevices.getDisplayMedia) {
        return navigator.mediaDevices.getDisplayMedia({ video: true });
    } else {
        return navigator.mediaDevices.getUserMedia({ video: { mediaSource: 'screen' } });
    }
},

getDisplayMedia().then((stream) => {
    stream.oninactive = function () {
      console.log('Capture stream inactive - stop recording!');
    };

    video.srcObject = stream;
  }).catch(function (error) {
    console.log('navigator.getUserMedia error: ', error);
  });
</pre>
      </vue-code>
    </el-row>
    <el-row>
      <h3>
        <router-link to="/webrtc/stream-from-video">Stream from video element</router-link>
      </h3>
      <vue-code>
        <pre lang="javascript">
const video = this.$refs.localVideo;
video.addEventListener('canplay', () => {
  const fps = 0;
  const player = this.$refs.playVideo;
  if (video.captureStream) {
    this.stream = video.captureStream(fps);
  } else if (video.mozCaptureStream) {
    this.stream = video.mozCaptureStream(fps);
  } else {
    console.error('Stream capture is not supported');
    this.stream = null;
  }

  player.srcObject = this.stream;
});
</pre>
      </vue-code>
    </el-row>
    <el-row>
      <h3>
        <router-link to="/webrtc/stream-from-canvas">Stream from canvas element</router-link>
      </h3>
      <vue-code>
        <pre lang="javascript">
const stream = canvas.captureStream();
video.srcObject = stream;
</pre>
      </vue-code>
    </el-row>

    <el-row>
      <h3>
        <router-link to="/webrtc/stream-from-displaymedia">Close video stream</router-link>
      </h3>
      <vue-code>
        <pre lang="javascript">
stream.getTracks().forEach(track => track.stop());
</pre>
      </vue-code>
    </el-row>

    <el-row>
      <h3>
        <router-link to="/webrtc/recorder">Recording media streaming to blob</router-link>
      </h3>
      <vue-code>
        <pre lang="javascript">
data() {
    return {
        recordBlobs: [],
        recording: false,
        mediaRecorder: null,
        error: null
    }
},
startRecoding(stream) {
  this.recordBlobs = [];
  var options = { mimeType: 'video/webm;codecs=vp9' };
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.log(options.mimeType + ' is not Supported');
    options = { mimeType: 'video/webm;codecs=vp8' };

    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.log(options.mimeType + ' is not Supported');
      options = { mimeType: 'video/webm' };

      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = { mimeType: '' };
      }
    }
  }

  try {
    this.mediaRecorder = new MediaRecorder(stream, options);
  } catch (e) {
    alert('Exception while creating MediaRecorder: ' + e + '. mimeType: ' + options.mimeType);
  }

  console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
  this.mediaRecorder.onstart = (event) => {
    this.recording = true;
  };

  this.mediaRecorder.onstop = (event) => {
    this.recording = false;
    console.log('Recorder stopped: ', event);
  };

  this.mediaRecorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      this.recordBlobs.push(event.data);
    }
  };

  this.mediaRecorder.onerror = event => {
    this.error = event;
  }

  this.mediaRecorder.start(10); // 数据收集10ms
  console.log('MediaRecorder started', this.mediaRecorder);
},
stopRecoder() {
  if (this.mediaRecorder && this.recording) {
    this.mediaRecorder.stop();
  }
},
</pre>
      </vue-code>
    </el-row>
    <el-row>
      <h3>
        <router-link to="/webrtc/recorder">Play blob media stream</router-link>
      </h3>
      <vue-code>
        <pre lang="javascript">
data() {
    return {
        recordBlobs: [],
        error: null
    }
},
playStream() {
    //播放
    const video = this.$refs.playVideo;
    video.addEventListener('loadedmetadata', event => {
        console.log("loadedmetadata", video.currentTime, video.duration);
        if (video.duration === Infinity) {
            video.currentTime = 1e101;
            video.ontimeupdate = function () {
                video.currentTime = 0;
                video.ontimeupdate = function () {
                    delete video.ontimeupdate;
                    video.play();
                };
            };
        }
    });

    if (this.recordBlobs && this.recordBlobs.length) {
        const blob = new Blob(this.recordBlobs, { type: 'video/webm' });
        video.src = window.URL.createObjectURL(blob);
    }
}
</pre>
      </vue-code>
    </el-row>
    <el-row>
      <h3>
        <router-link to="/webrtc/recorder">Download blob media stream</router-link>
      </h3>
      <vue-code>
        <pre lang="javascript">
data() {
    return {
        recordBlobs: [],
        error: null
    }
},
downloadfile() {
  if (this.recordBlobs && this.recordBlobs.length) {
    const blob = new Blob(this.recordBlobs, { type: 'video/webm' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'Rec_' + Date.now() + '.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }
}
</pre>
      </vue-code>
    </el-row>

    <el-row>
      <h3>资料</h3>
      <ul>
        <li> <el-link href="https://www.webrtc-experiment.com/">WebRTC Experiment</el-link></li>
      </ul>
    </el-row>
  </el-main>
</template>
<script>
export default {
  name: "index",
}
</script>
<style lang="stylus" scoped>
.el-main {
  color: #1f2f3d;

  a {
    display: block;
    text-decoration: none;
  }
}
</style>