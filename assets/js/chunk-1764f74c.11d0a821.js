(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1764f74c"],{"66f2":function(e,t,n){},"80c3":function(e,t,n){"use strict";var r=n("66f2"),a=n.n(r);a.a},d76d:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("Ref")]),n("vue-code",[n("pre",{attrs:{lang:"js"}},[e._v("@Ref(refKey?: string) decorator")])]),n("h3",[e._v("示例：")]),n("vue-code",[n("pre",{attrs:{lang:"html"}},[e._v('<calendar ref="calendar" v-model="time"></calendar>\n<url-input ref="url-input" v-model="url" :list="$videoList"></url-input>\n<div ref="videoItem" class="video-item">\n    <video ref="player-video" :src="url"></video>\n</div>\n<div class="center">\n    <el-button type="primary" @click="playHandler">播放</el-button>\n    <el-button type="danger" @click="stopHandler">停止</el-button>\n</div>')]),n("pre",{attrs:{lang:"js"}},[e._v("import { Calendar } from 'element-ui';\nimport { Component, Ref, Vue } from 'vue-property-decorator'\n@Component({ components: { Calendar }, name: 'VueItem' })\nexport default class VueItem extends Vue {\n    @Ref() private readonly videoItem!: HTMLDivElement;\n    @Ref('player-video') private readonly videoPlayer!: HTMLVideoElement;\n    //自定义组件时，ts下声明的class类值可作类型声明\n    @Ref() private readonly calendar!: Calendar;\n\n    private url: string = \"\";\n    private time: Date | null = new Date();\n\n    private playHandler() {\n        this.videoPlayer.play();\n    }\n\n    private stopHandler() {\n        this.videoPlayer.pause();\n        this.videoPlayer.currentTime = 0;\n    }\n}")])]),e._v(" 等同于 "),n("vue-code",[n("pre",{attrs:{lang:"js"}},[e._v("export default {\n  name:\"VueItem\",\n  computed: {\n    videoItem: {\n      cache: false,\n      get() {\n        return this.$refs.videoItem as HTMLDivElement;\n      }\n    },\n    videoPlayer: {\n      cache: false,\n      get() {\n        return this.$refs['player-video'] as HTMLVideoElement;\n      }\n    },\n    calendar: {\n      cache: false,\n      get() {\n        return this.$refs['calendar'] as Calendar;\n      }\n    },\n  }\n} ")])]),n("calendar",{ref:"calendar",model:{value:e.time,callback:function(t){e.time=t},expression:"time"}}),n("url-input",{ref:"url-input",attrs:{list:e.$videoList},model:{value:e.url,callback:function(t){e.url=t},expression:"url"}}),n("div",{ref:"videoItem",staticClass:"video-item"},[n("video",{ref:"player-video",attrs:{src:e.url}})]),n("div",{staticClass:"center"},[n("el-button",{attrs:{type:"primary"},on:{click:e.playHandler}},[e._v("播放")]),n("el-button",{attrs:{type:"danger"},on:{click:e.stopHandler}},[e._v("停止")])],1)],1)},a=[],l=n("d4ec"),i=n("bee2"),o=n("262e"),c=n("2caf"),d=n("9ab4"),s=n("5c96"),u=n("1b40"),v=function(e){Object(o["a"])(n,e);var t=Object(c["a"])(n);function n(){var e;return Object(l["a"])(this,n),e=t.apply(this,arguments),e.url="",e.time=new Date,e}return Object(i["a"])(n,[{key:"playHandler",value:function(){this.videoPlayer.play()}},{key:"stopHandler",value:function(){this.videoPlayer.pause(),this.videoPlayer.currentTime=0}}]),n}(u["l"]);Object(d["a"])([Object(u["j"])()],v.prototype,"videoItem",void 0),Object(d["a"])([Object(u["j"])("player-video")],v.prototype,"videoPlayer",void 0),Object(d["a"])([Object(u["j"])()],v.prototype,"calendar",void 0),v=Object(d["a"])([Object(u["a"])({components:{Calendar:s["Calendar"]},name:"VueRef"})],v);var p=v,f=p,m=(n("80c3"),n("2877")),y=function(e){e.options.__source="src/tutorial/views/vue-property-decorator/ref/index.vue"},b=y,h=Object(m["a"])(f,r,a,!1,null,"9bc98586",null);"function"===typeof b&&b(h);t["default"]=h.exports}}]);