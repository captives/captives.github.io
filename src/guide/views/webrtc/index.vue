<template>
    <el-main>
        <el-row>
            <h3>
                <router-link to="/webrtc/list">Enumerate devices</router-link>
            </h3>
            <vue-code>
                <pre lang="javascript">
navigator.mediaDevices.enumerateDevices().then(deviceInfos =>{
  console.log(deviceInfos);
}).catch(error => {
  ...
});
        </pre>
            </vue-code>
        </el-row>
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

  if ('srcObject' in video) {
      video.srcObject = stream;
  } else {
      video.src = URL.createObjectURL(stream);
  }
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

    if ('srcObject' in video) {
        video.srcObject = stream;
    } else {
        video.src = URL.createObjectURL(stream);
    }
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

  if ('srcObject' in video) {
      player.srcObject = this.stream;
  } else {
      player.src = URL.createObjectURL(this.stream);
  }
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
if ('srcObject' in video) {
    video.srcObject = stream;
} else {
    video.src = URL.createObjectURL(stream);
}
</pre>
            </vue-code>
        </el-row>

        <el-row>
            <h3>
                <router-link to="/webrtc/remote">Vue use MediaStream</router-link>
            </h3>
            <vue-code>
                <pre lang="html">
&lt;video :srcObject.prop="localStream" autoplay&gt;&lt;/video&gt;
</pre>
            </vue-code>
        </el-row>

        <el-row>
            <h3>
                <router-link to="/webrtc/audiooutput">Choose media source and audio output</router-link>
            </h3>
            <el-row>
                该<em>HTMLMediaElement.setSinkId()</em>方法设置用于输出的音频设备的ID，并返回
                Promise。仅当授权该应用程序使用指定设备时，此方法才有效。
            </el-row>
            <vue-code>
                <pre lang="javascript">
playback(videoElement, deviceId) {
  if (typeof videoElement.sinkId !== 'undefined') {
    videoElement.setSinkId(deviceId).then(() => {
      console.log(`Success, audio output device attached: ${deviceId}`);
    }).catch(error => {
      let errorMessage = error;
      if (error.name === 'SecurityError') {
        errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
      }
      console.error(errorMessage);
      // Use default device
    });
  } else {
    console.warn('Browser does not support output device selection.');
  }
}
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

        <h3>多路音频流混合</h3>
        <p></p>
        <vue-code>
            <pre lang="javascript">
let videos = [];
let audioSources = [];

// WebAudio API representer
var AudioContext = window.AudioContext;
if (typeof AudioContext === 'undefined') {
    if (typeof webkitAudioContext !== 'undefined') {
        /*global AudioContext:true */
        AudioContext = webkitAudioContext;
    }

    if (typeof mozAudioContext !== 'undefined') {
        /*global AudioContext:true */
        AudioContext = mozAudioContext;
    }
}

let audioContext = new AudioContext();
let audioDestination = audioContext.createMediaStreamDestination()
streams.forEach(function(stream) {
    if (stream.getVideoTracks().length) {
        var video = getVideo(stream);
        video.stream = stream;
        videos.push(video);
    }

    if (stream.getAudioTracks().length && audioContext) {
        var audioSource = audioContext.createMediaStreamSource(stream);
        audioSource.connect(audioDestination);
        audioSources.push(audioSource);
    }
});

//获取合并后的音频流
let audioDestination = audioContext.createMediaStreamDestination();
audioSources.forEach(function(audioSource) {
    audioSource.connect(audioDestination);
});
let stream:MediaStream = audioDestination.stream;
      </pre>
        </vue-code>

        <el-row>
            <h3>资料</h3>
            <ul>
                <li>
                    <el-link href="https://www.webrtc-experiment.com/">WebRTC Experiment</el-link>
                </li>
                <li>
                    <el-link href="https://www.webrtc-experiment.com/RecordRTC/">RecordRTC</el-link>
                </li>
                <li>
                    <el-link href="https://quickblox.com/developers/Sample-videochat-web">Sample Webrtc Web</el-link>
                </li>
            </ul>
        </el-row>
    </el-main>
</template>
<script>
export default {
    name: "index",
};
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
