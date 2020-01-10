<template>
  <el-main class="center">
    <url-input v-model="url" :list="$videoList"></url-input>
    <el-row :gutter="50">
      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Video</el-divider>
        <video ref="localVideo" class="video-item" :src="url" controls muted loop autoplay></video>
      </el-col>

      <el-col class="center" :xs="24" :sm="24" :md="12">
        <el-divider content-position="left">Canvas</el-divider>
        <canvas ref="canvas" class="video-item"></canvas>
      </el-col>
    </el-row>
    <el-row>通过将video元素的功能与结合使用canvas，您可以实时处理视频数据，</el-row>
    <el-code>
      <pre lang="html">
&lt;template&gt;
  &lt;el-main class=&quot;center&quot;&gt;
    &lt;el-row :gutter=&quot;50&quot;&gt;
      &lt;el-col class=&quot;center&quot; :xs=&quot;24&quot; :sm=&quot;24&quot; :md=&quot;12&quot;&gt;
        &lt;el-divider content-position=&quot;left&quot;&gt;Video&lt;/el-divider&gt;
        &lt;video ref=&quot;localVideo&quot; class=&quot;video-item&quot; 
          src=&quot;/medias/demo.mp4&quot; controls muted loop autoplay &gt;&lt;/video&gt;
      &lt;/el-col&gt;

      &lt;el-col class=&quot;center&quot; :xs=&quot;24&quot; :sm=&quot;24&quot; :md=&quot;12&quot;&gt;
        &lt;el-divider content-position=&quot;left&quot;&gt;Canvas&lt;/el-divider&gt;
        &lt;canvas ref=&quot;canvas&quot; class=&quot;video-item&quot;&gt;&lt;/canvas&gt;
      &lt;/el-col&gt;
    &lt;/el-row&gt;
    &lt;el-row&gt;通过将video元素的功能与结合使用canvas，您可以实时处理视频数据，&lt;/el-row&gt;
  &lt;/el-main&gt;
&lt;/template&gt;
&lt;script&gt;

export default {
  name: &quot;DrawVideo&quot;,
  data() {
    return {
      canvas: null,
      context: null,
    }
  },
  methods: {
    init(event) {
      let canvas = this.$refs.canvas;
      canvas.setAttribute(&#x27;width&#x27;, event.target.offsetWidth);
      canvas.setAttribute(&#x27;height&#x27;, event.target.offsetHeight);
      this.context = canvas.getContext(&quot;2d&quot;);
      this.animate();
    },
    animate() {
      let source = this.$refs.localVideo;
      this.context.clearRect(0, 0, source.offsetWidth, source.offsetHeight);
      this.context.drawImage(source, 0, 0, source.offsetWidth, source.offsetHeight);

      if (&quot;requestAnimationFrame&quot; in window) {
        requestAnimationFrame(this.animate);
      } else if (&quot;webkitRequestAnimationFrame&quot; in window) {
        webkitRequestAnimationFrame(this.animate);
      } else if (&quot;msRequestAnimationFrame&quot; in window) {
        msRequestAnimationFrame(this.animate);
      } else if (&quot;mozRequestAnimationFrame&quot; in window) {
        mozRequestAnimationFrame(this.animate);
      }
    }
  },
  mounted() {
    let video = this.$refs.localVideo;
    video.addEventListener(&#x27;canplay&#x27;, this.init);
  },
}
&lt;/script&gt;

&lt;style lang=&quot;stylus&quot; scoped&gt;
.video-item {
  background: #999;
  width: 570px;
  height: 320px;
  background: #333;
}
&lt;/style&gt;
      </pre>
    </el-code>
  </el-main>
</template>
<script>
export default {
  name: "DrawVideo",
  data() {
    return {
      url: "",
      canvas: null,
      context: null,
    }
  },
  methods: {
    init(event) {
      let canvas = this.$refs.canvas;
      canvas.setAttribute('width', event.target.offsetWidth);
      canvas.setAttribute('height', event.target.offsetHeight);
      this.context = canvas.getContext("2d");
      this.animate();
    },
    animate() {
      let source = this.$refs.localVideo;
      this.context.clearRect(0, 0, source.offsetWidth, source.offsetHeight);
      this.context.drawImage(source, 0, 0, source.offsetWidth, source.offsetHeight);

      if ("requestAnimationFrame" in window) {
        requestAnimationFrame(this.animate);
      } else if ("webkitRequestAnimationFrame" in window) {
        webkitRequestAnimationFrame(this.animate);
      } else if ("msRequestAnimationFrame" in window) {
        msRequestAnimationFrame(this.animate);
      } else if ("mozRequestAnimationFrame" in window) {
        mozRequestAnimationFrame(this.animate);
      }
    }
  },
  mounted() {
    let video = this.$refs.localVideo;
    video.addEventListener('canplay', this.init);
  },
}
</script>

<style lang="stylus" scoped>
.video-item {
  background: #999;
  width: 570px;
  height: 320px;
  background: #333;
}
</style>