<template>
    <div>
        <h2>Ref</h2>
        <vue-code>
            <pre lang="js">@Ref(refKey?: string) decorator</pre>
        </vue-code>
        <h3>示例：</h3>
        <vue-code>
            <pre lang="html">
&lt;calendar ref="calendar" v-model="time"&gt;&lt;/calendar&gt;
&lt;url-input ref="url-input" v-model="url" :list="$videoList"&gt;&lt;/url-input&gt;
&lt;div ref="videoItem" class="video-item"&gt;
    &lt;video ref="player-video" :src="url"&gt;&lt;/video&gt;
&lt;/div&gt;
&lt;div class="center"&gt;
    &lt;el-button type="primary" @click="playHandler"&gt;播放&lt;/el-button&gt;
    &lt;el-button type="danger" @click="stopHandler"&gt;停止&lt;/el-button&gt;
&lt;/div&gt;</pre>

            <pre lang="js">
import { Calendar } from 'element-ui';
import { Component, Ref, Vue } from 'vue-property-decorator'
@Component({ components: { Calendar }, name: 'VueItem' })
export default class VueItem extends Vue {
    @Ref() private readonly videoItem!: HTMLDivElement;
    @Ref('player-video') private readonly videoPlayer!: HTMLVideoElement;
    //自定义组件时，ts下声明的class类值可作类型声明
    @Ref() private readonly calendar!: Calendar;

    private url: string = "";
    private time: Date | null = new Date();

    private playHandler() {
        this.videoPlayer.play();
    }

    private stopHandler() {
        this.videoPlayer.pause();
        this.videoPlayer.currentTime = 0;
    }
}</pre>
        </vue-code>
        等同于
        <vue-code>
            <pre lang="js">
export default {
  name:"VueItem",
  computed: {
    videoItem: {
      cache: false,
      get() {
        return this.$refs.videoItem as HTMLDivElement;
      }
    },
    videoPlayer: {
      cache: false,
      get() {
        return this.$refs['player-video'] as HTMLVideoElement;
      }
    },
    calendar: {
      cache: false,
      get() {
        return this.$refs['calendar'] as Calendar;
      }
    },
  }
} </pre>
        </vue-code>

        <calendar ref="calendar" v-model="time"></calendar>
        <url-input ref="url-input" v-model="url" :list="$videoList"></url-input>
        <div ref="videoItem" class="video-item">
            <video ref="player-video" :src="url"></video>
        </div>
        <div class="center">
            <el-button type="primary" @click="playHandler">播放</el-button>
            <el-button type="danger" @click="stopHandler">停止</el-button>
        </div>
    </div>
</template>
<script lang='ts'>
import { Calendar } from 'element-ui';
import { Component, Ref, Vue } from 'vue-property-decorator'
@Component({ components: { Calendar }, name: 'VueRef' })
export default class VueRef extends Vue {
    @Ref() private readonly videoItem!: HTMLDivElement;
    @Ref('player-video') private readonly videoPlayer!: HTMLVideoElement;
    //自定义组件时，ts下声明的class类值可作类型声明
    @Ref() private readonly calendar!: Calendar;

    private url: string = "";
    private time: Date | null = new Date();

    private playHandler() {
        this.videoPlayer.play();
    }

    private stopHandler() {
        this.videoPlayer.pause();
        this.videoPlayer.currentTime = 0;
    }
}
</script>
<style scoped>
.video-item {
    height: 480px;
    width: 100%;
}

.video-item video {
    width: 100%;
    height: 100%;
}
</style>