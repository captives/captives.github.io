(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3fbaa306"],{"0a1b":function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-main",{staticClass:"center"},[o("el-row",{attrs:{gutter:50}},[o("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[o("el-divider",{attrs:{"content-position":"left"}},[e._v("Video Player")]),o("video",{ref:"localVideo",staticClass:"video-item"}),o("el-progress",{attrs:{percentage:e.percentage}})],1)],1),e.error?o("el-tag",{staticClass:"error",attrs:{type:"danger"}},[e._v(e._s(e.error))]):e._e()],1)},a=[],n=(o("d3b7"),o("3ca3"),o("ddb0"),o("2b3d"),{name:"MediaSource",data:function(){return{mimeCodec:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',mediaSource:null,percentage:0,error:null}},methods:{fetch:function(e){var t=this;return new Promise((function(o,r){console.log("fetch",e);var a=new XMLHttpRequest;a.open("get",e),a.responseType="arraybuffer",a.onloadstart=function(){return t.percentage=0},a.onload=function(){t.percentage=100,o(a.response)},a.onprogress=function(e){t.percentage=Math.round(100*e.loaded/e.total)},a.send()}))},init:function(){var e=this,t=this.$refs.localVideo;"MediaSource"in window&&MediaSource.isTypeSupported(this.mimeCodec)?(this.mediaSource=new MediaSource,console.log("1, mediaSource.readyState",this.mediaSource.readyState),t.src=URL.createObjectURL(this.mediaSource),this.mediaSource.addEventListener("sourceopen",(function(){console.log("2, mediaSource.readyState",e.mediaSource.readyState);var o=e.mediaSource.addSourceBuffer(e.mimeCodec);e.fetch("/medias/musicvideo.mp4").then((function(r){o.addEventListener("updateend",(function(){console.log("4, mediaSource.readyState",e.mediaSource.readyState),e.mediaSource.endOfStream(),t.play()})),o.appendBuffer(r),console.log("3, mediaSource.readyState",e.mediaSource.readyState)}))}))):console.log("不支持MIME类型编解码",this.mimeCodec)}},mounted:function(){this.init()}}),i=n,c=(o("2234"),o("2877")),d=Object(c["a"])(i,r,a,!1,null,"57a52881",null);t["default"]=d.exports},2234:function(e,t,o){"use strict";var r=o("e63b"),a=o.n(r);a.a},e63b:function(e,t,o){}}]);