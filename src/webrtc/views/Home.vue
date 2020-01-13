<template>
  <el-main>
    <el-row class="content center">
      <img alt="Vue logo" src="../assets/logo.png" />
    </el-row>
    <el-row class="content">
      <h1>el-code</h1>
      <p>组件及样式引入</p>
      <el-code>
        <pre lang="javascript">
import '@/assets/css/code-style.css';
import Code from './../components/Code.vue'
Vue.component('el-code', Code);
</pre>
      </el-code>

      <p>or</p>
      <el-code>
        <pre lang="javascript">
global.js
import './assets/css/code-style.css';
import Code from './components/Code';
export default {
    install(Vue) {
        Vue.component('el-code', Code);
    }
}

main.js
import global from './../plugins/global';
Vue.use(global);
</pre>
      </el-code>

      <p>组件使用</p>
      <el-code>
        <pre lang="html">
&lt;el-code&gt;
  &lt;p&gt;sh&lt;/p&gt;
  &lt;pre lang=&quot;sh&quot;&gt;ping localhost&lt;/pre&gt;
&lt;/el-code&gt;
</pre>
      </el-code>

      <el-code>
        <pre lang="css">
.el-aside {
  .el-menu {
    height: 100%;
  }
}

.el-container {
  .el-breadcrumb {
    margin-left: 20px;
    line-height: 45px;
  }
}
</pre>
      </el-code>

      <el-code>
        <p>console</p>
        <pre lang="console">ping localhost</pre>
      </el-code>
      <el-code>
        <p>bash</p>
        <pre lang="bash">ping localhost</pre>
      </el-code>
      <el-code>
        <p>sh</p>
        <pre lang="sh">ping localhost</pre>
      </el-code>
      <el-code>
        <p>cmd</p>
        <pre lang="cmd">ping localhost</pre>
      </el-code>
    </el-row>

    <el-row class="content">
      <h1>url-input</h1>
      <p>HTML</p>
      <el-code>
        <pre lang="html">
&lt;url-input v-model=&quot;url&quot; :list=&quot;$videoList&quot;&gt;&lt;/url-input&gt; 
&lt;video  :src=&quot;url&quot; controls muted loop autoplay&gt;&lt;/video&gt;
</pre>
      </el-code>JavasSript部分
      <el-code>
        <pre lang="javascript">data() {
  return {
    url: "",
    list: [
          { label: "Parkour 720P MP4", value: "/medias/parkour_720P.mp4" },
          { label: "Parkour 720P WEBM", value: "/medias/parkour_720P.webm" },
          { label: "Parkour 1080P MP4", value: "/medias/parkour_1080P.mp4" },
          { label: "Parkour 1080P WEBM", value: "/medias/parkour_1080P.webm" },
          
          { label: "Piper 720P", value: "/medias/Piper_720P.mp4" },
          { label: "Piper 1080P", value: "/medias/Piper_1080P.mp4" },

          { label: "睡眠钢琴音乐", value: "/medias/Relaxing Piano Music.mp4" },
          { label: "汽车 绿幕视频", value: "/medias/green-screen-car.mp4" },
      ];
  }
}
</pre>
      </el-code>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'Home',
}
</script>
<style lang="stylus" scoped>
.el-main {
  .content {
    max-width: 960px;
    display: block;
    margin: 0 auto;
  }
}
</style>
