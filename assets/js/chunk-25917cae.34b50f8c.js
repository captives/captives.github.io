(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-25917cae"],{"0d31":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-table",{attrs:{data:e.tableData,stripe:""}},[a("el-table-column",{attrs:{label:"媒体流ID",align:"center"}},[a("el-table-column",{attrs:{label:"名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.label.substr(0,8))+"...")]}}])})],1),a("el-table-column",{attrs:{label:e.value&&e.value.id}},[a("el-table-column",{attrs:{prop:"kind",label:"类型",align:"center"}}),a("el-table-column",{attrs:{label:"id",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.id.substr(0,8))+"...")]}}])}),a("el-table-column",{attrs:{label:"state",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.readyState))]}}])}),a("el-table-column",{attrs:{label:"enabled",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.enabled))]}}])}),a("el-table-column",{attrs:{label:"muted",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.muted))]}}])}),e.edited?a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"移除轨道",placement:"left"}},[a("el-link",{staticClass:"el-icon-minus",on:{click:function(a){return e.removeTrack(t.row)}}})],1)]}}],null,!1,3439156443)}):e._e(),a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-main",{staticClass:"table-expand"},[a("el-row",[a("h4",[e._v("Base:")]),a("el-col",{attrs:{span:12}},[e._v("label: "+e._s(t.row.label))]),a("el-col",{attrs:{span:12}},[e._v("ID: "+e._s(t.row.id))])],1),a("el-row",[a("h4",[e._v("Constraints:")]),e._l(t.row.getConstraints(),(function(t,r){return a("el-col",{key:r,attrs:{span:12}},[e._v(e._s(r)+" : "+e._s(t))])}))],2),a("el-row",[a("h4",[e._v("Settings:")]),e._l(t.row.getSettings(),(function(t,r){return a("el-col",{key:r,attrs:{span:12}},[e._v(e._s(r)+" : "+e._s(t))])}))],2),a("el-row",[a("h4",[e._v("Capabilities:")]),e._l(t.row.getCapabilities(),(function(t,r){return a("el-col",{key:r,attrs:{span:12}},[e._v(e._s(r)+" : "+e._s(t))])}))],2)],1)]}}])})],1)],1)},n=[],o=(a("99af"),{name:"StreamTracks",props:{value:{type:MediaStream,default:null},edited:{type:Boolean,default:!1}},data:function(){return{id:null,tableData:[]}},watch:{value:function(e){this.id=e.id,this.tableData=[],this.tableData=this.tableData.concat(e.getVideoTracks(),e.getAudioTracks())}},methods:{removeTrack:function(e){this.value&&(e.stop(),this.value.removeTrack(e),console.log("remove track id",e.label,e.id),this.$emit("input",this.value))}}}),l=o,i=(a("2557"),a("2877")),c=Object(i["a"])(l,r,n,!1,null,"08dc7802",null);t["a"]=c.exports},"1dde":function(e,t,a){var r=a("d039"),n=a("b622"),o=a("2d00"),l=n("species");e.exports=function(e){return o>=51||!r((function(){var t=[],a=t.constructor={};return a[l]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},2557:function(e,t,a){"use strict";var r=a("32d5"),n=a.n(r);n.a},"32d5":function(e,t,a){},"61db":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-main",[a("el-row",{staticStyle:{width:"720px",margin:"0 auto"}},[a("url-input",{attrs:{list:e.$videoList},model:{value:e.url,callback:function(t){e.url=t},expression:"url"}}),a("el-divider",{attrs:{"content-position":"left"}},[e._v("Video")]),a("video",{ref:"localVideo",staticClass:"video-item",attrs:{src:e.url,muted:"",controls:"",loop:"",autoplay:""},domProps:{muted:!0}}),a("el-col",{attrs:{span:24}},[a("audio",{ref:"localAudio",attrs:{src:"/assets/medias/jinli.mp3",muted:"",controls:"",autoplay:""}}),a("el-button",{attrs:{type:"primary"},on:{click:e.startMixing}},[e._v("开始混音")])],1),a("StreamTracks",{model:{value:e.videoStream,callback:function(t){e.videoStream=t},expression:"videoStream"}}),a("video",{ref:"playVideo",staticClass:"video-item",attrs:{src:e.url,controls:"",loop:"",autoplay:""}}),a("StreamTracks",{model:{value:e.remixStream,callback:function(t){e.remixStream=t},expression:"remixStream"}})],1)],1)},n=[],o=(a("4160"),a("159b"),a("0d31")),l={name:"VideoMixing",components:{StreamTracks:o["a"]},data:function(){return{url:null,videoStream:null,audioStream:null,remixStream:null}},mounted:function(){var e=this,t=this,a=this.$refs.localVideo;a.addEventListener("canplay",(function(){console.log("----- video  canplay"),t.videoStream=e.getMediaStream(a)}));var r=this.$refs.localAudio;r.addEventListener("canplay",(function(){console.log("----- audio  canplay"),t.audioStream=e.getMediaStream(r)}))},methods:{getMediaStream:function(e){var t=0,a=null;return e.captureStream?a=e.captureStream(t):e.mozCaptureStream?a=e.mozCaptureStream(t):(console.error("Stream capture is not supported"),a=null),a.onaddtrack=function(e){console.log("track add",e)},a.onremovetrack=function(e){console.log("track remove",e)},a.onended=function(){console.log("stream on end")},a},startMixing:function(){var e=this;this.remixStream=new MediaStream,this.videoStream.getVideoTracks().forEach((function(t){e.remixStream.addTrack(t.clone())})),this.audioStream.getAudioTracks().forEach((function(t){e.remixStream.addTrack(t.clone()),t.enabled=!1})),this.videoStream.getAudioTracks().forEach((function(t){e.remixStream.addTrack(t.clone()),t.enabled=!1})),console.log(this.remixStream.audioTracks);var t=this.$refs.playVideo;t.srcObject=this.remixStream,t.play()}}},i=l,c=(a("fc73"),a("2877")),s=Object(c["a"])(i,r,n,!1,null,"e280f952",null);t["default"]=s.exports},8418:function(e,t,a){"use strict";var r=a("c04e"),n=a("9bf2"),o=a("5c6c");e.exports=function(e,t,a){var l=r(t);l in e?n.f(e,l,o(0,a)):e[l]=a}},"929e":function(e,t,a){},"99af":function(e,t,a){"use strict";var r=a("23e7"),n=a("d039"),o=a("e8b5"),l=a("861d"),i=a("7b0b"),c=a("50c4"),s=a("8418"),u=a("65f0"),d=a("1dde"),f=a("b622"),m=a("2d00"),p=f("isConcatSpreadable"),v=9007199254740991,b="Maximum allowed index exceeded",S=m>=51||!n((function(){var e=[];return e[p]=!1,e.concat()[0]!==e})),_=d("concat"),k=function(e){if(!l(e))return!1;var t=e[p];return void 0!==t?!!t:o(e)},h=!S||!_;r({target:"Array",proto:!0,forced:h},{concat:function(e){var t,a,r,n,o,l=i(this),d=u(l,0),f=0;for(t=-1,r=arguments.length;t<r;t++)if(o=-1===t?l:arguments[t],k(o)){if(n=c(o.length),f+n>v)throw TypeError(b);for(a=0;a<n;a++,f++)a in o&&s(d,f,o[a])}else{if(f>=v)throw TypeError(b);s(d,f++,o)}return d.length=f,d}})},fc73:function(e,t,a){"use strict";var r=a("929e"),n=a.n(r);n.a}}]);