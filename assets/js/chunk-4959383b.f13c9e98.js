(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4959383b"],{"056e":function(e,t,r){"use strict";var a=r("5107"),o=r.n(a);o.a},"0d03":function(e,t,r){var a=r("6eeb"),o=Date.prototype,n="Invalid Date",i="toString",s=o[i],l=o.getTime;new Date(NaN)+""!=n&&a(o,i,(function(){var e=l.call(this);return e===e?s.call(this):n}))},"1dde":function(e,t,r){var a=r("d039"),o=r("b622"),n=r("2d00"),i=o("species");e.exports=function(e){return n>=51||!a((function(){var t=[],r=t.constructor={};return r[i]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"1f93":function(e,t,r){},"37d3":function(e,t,r){"use strict";var a=r("1f93"),o=r.n(a);o.a},4795:function(e,t,r){var a=r("23e7"),o=r("da84"),n=r("342f"),i=[].slice,s=/MSIE .\./.test(n),l=function(e){return function(t,r){var a=arguments.length>2,o=a?i.call(arguments,2):void 0;return e(a?function(){("function"==typeof t?t:Function(t)).apply(this,o)}:t,r)}};a({global:!0,bind:!0,forced:s},{setTimeout:l(o.setTimeout),setInterval:l(o.setInterval)})},"4ad6":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-main",[r("url-input",{attrs:{list:e.$videoList},model:{value:e.url,callback:function(t){e.url=t},expression:"url"}}),r("el-row",{attrs:{gutter:50}},[r("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[r("el-divider",{attrs:{"content-position":"left"}},[e._v("Video")]),r("video",{ref:"localVideo",staticClass:"video-item",attrs:{src:e.url,controls:"",loop:"",autoplay:""}})],1),r("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[r("el-divider",{attrs:{"content-position":"left"}},[e._v("tracks")]),r("StreamTracks",{model:{value:e.videoStream,callback:function(t){e.videoStream=t},expression:"videoStream"}})],1)],1),r("el-row",{attrs:{gutter:50}},[r("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[r("el-divider",{attrs:{"content-position":"left"}},[e._v("Audio")]),r("audio",{ref:"localAudio",attrs:{src:"/medias/jinli.mp3",controls:""}}),r("el-row",{staticStyle:{"padding-top":"20px"}},[r("el-checkbox",{model:{value:e.mixing,callback:function(t){e.mixing=t},expression:"mixing"}},[e._v(e._s(e.mixing?"替换声道":"原声道"))]),r("el-button",{attrs:{type:"success",size:"mini"},on:{click:e.videoPlayer}},[e._v("播放")]),r("el-button",{attrs:{type:"danger",size:"mini"},on:{click:e.stopPlayer}},[e._v("停止播放")]),r("el-button",{attrs:{type:"success",size:"mini"}},[e._v("下载视频")])],1)],1),r("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[r("el-divider",{attrs:{"content-position":"left"}},[e._v("tracks")]),r("StreamTracks",{model:{value:e.audioStream,callback:function(t){e.audioStream=t},expression:"audioStream"}})],1)],1),r("el-row",{attrs:{gutter:50}},[r("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[r("el-divider",{attrs:{"content-position":"left"}},[e._v("Recorder")]),r("StreamRecorder",{attrs:{stream:e.remixStream}})],1),r("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[r("el-divider",{attrs:{"content-position":"left"}},[e._v("tracks")]),r("StreamTracks",{model:{value:e.remixStream,callback:function(t){e.remixStream=t},expression:"remixStream"}})],1)],1),r("vue-source",{attrs:{src:"webrtc/views/webrtc/MediaStreamMixer.vue",lang:"html"}})],1)},o=[],n=(r("4160"),r("159b"),r("7775")),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-row",[r("video",{ref:"playVideo",staticClass:"video-item",attrs:{autoplay:""}}),e.stream?r("el-row",{staticClass:"center"},[e.recording?r("el-col",[r("el-tag",{attrs:{type:"danger"}},[e._v("Rec ....")]),r("el-button",{attrs:{type:"danger",size:"mini"},on:{click:e.stopRecoder}},[e._v("停止录制")])],1):r("el-col",[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.play}},[e._v("播放流")]),r("el-button",{attrs:{type:"success",size:"mini"},on:{click:e.startRecoding}},[e._v("开始录制")]),e.recordBlobs.length?r("el-button",{attrs:{type:"danger",size:"mini"},on:{click:e.downloadfile}},[e._v("下载视频")]):e._e()],1)],1):e._e()],1)},s=[],l=(r("6eba"),r("0d03"),r("d3b7"),r("3ca3"),r("ddb0"),r("4795"),r("2b3d"),{name:"StreamRecorder",props:{stream:{type:MediaStream}},data:function(){return{recordBlobs:[],recording:!1,mediaRecorder:null,error:null}},methods:{play:function(){var e=this,t=this.$refs.playVideo;t.addEventListener("loadedmetadata",(function(t){console.log("AudioTracks",e.stream.getAudioTracks()),console.log("VideoTracks",e.stream.getVideoTracks())})),t.autoplay=!0,t.srcObject=this.stream},startRecoding:function(){var e=this;this.play(),this.recordBlobs=[];var t={mimeType:"video/webm;codecs=vp9"};MediaRecorder.isTypeSupported(t.mimeType)||(console.log(t.mimeType+" is not Supported"),t={mimeType:"video/webm;codecs=vp8"},MediaRecorder.isTypeSupported(t.mimeType)||(console.log(t.mimeType+" is not Supported"),t={mimeType:"video/webm"},MediaRecorder.isTypeSupported(t.mimeType)||(console.log(t.mimeType+" is not Supported"),t={mimeType:""})));try{this.mediaRecorder=new MediaRecorder(this.stream,t)}catch(r){alert("Exception while creating MediaRecorder: "+r+". mimeType: "+t.mimeType)}console.log("Created MediaRecorder",this.mediaRecorder,"with options",t),this.mediaRecorder.onstart=function(t){e.recording=!0},this.mediaRecorder.onstop=function(t){e.recording=!1,console.log("Recorder stopped: ",t)},this.mediaRecorder.ondataavailable=function(t){t.data&&t.data.size>0&&e.recordBlobs.push(t.data)},this.mediaRecorder.onerror=function(t){e.error=t},this.mediaRecorder.start(10),console.log("MediaRecorder started",this.mediaRecorder)},playRecoder:function(){var e=this.$refs.playVideo;if(e.pause||(e.stop(),e.src=null,e.srcObject=null),e.addEventListener("loadedmetadata",(function(t){console.log("loadedmetadata",e.currentTime,e.duration),e.duration===1/0&&(e.currentTime=1e101,e.ontimeupdate=function(){e.currentTime=0,e.ontimeupdate=function(){delete e.ontimeupdate,e.play()}})})),this.recordBlobs&&this.recordBlobs.length){var t=new Blob(this.recordBlobs,{type:"video/webm"});e.src=window.URL.createObjectURL(t),e.play()}},stopRecoder:function(){this.mediaRecorder&&this.recording&&this.mediaRecorder.stop(),this.playRecoder()},downloadfile:function(){var e=this;if(this.recordBlobs&&this.recordBlobs.length){var t=new Blob(this.recordBlobs,{type:"video/webm"}),r=window.URL.createObjectURL(t),a=document.createElement("a");a.style.display="none",a.href=r,a.download="Rec_"+Date.now()+".webm",document.body.appendChild(a),a.click(),setTimeout((function(){document.body.removeChild(a),window.URL.revokeObjectURL(r),e.recordBlobs=[]}),100)}},close:function(){this.stream.getTracks().forEach((function(e){return e.stop()}))}}}),c=l,d=(r("4c76"),r("2877")),u=Object(d["a"])(c,i,s,!1,null,"813c82f8",null),m=u.exports,p={name:"MediaStreamMixer",components:{StreamTracks:n["a"],StreamRecorder:m},data:function(){return{url:null,mixing:!1,videoStream:null,audioStream:null,remixStream:null}},methods:{getMediaStream:function(e){var t=0,r=null;return e.captureStream?r=e.captureStream(t):e.mozCaptureStream?r=e.mozCaptureStream(t):(console.error("Stream capture is not supported"),r=null),r.onaddtrack=function(e){console.log("track add",e)},r.onremovetrack=function(e){console.log("track remove",e)},r.onended=function(){console.log("stream on end")},r},videoPlayer:function(){var e=this;this.stopPlayer(),this.remixStream=new MediaStream,this.videoStream.getVideoTracks().forEach((function(t){e.remixStream.addTrack(t.clone())})),this.mixing?this.audioStream.getAudioTracks().forEach((function(t){e.remixStream.addTrack(t.clone())})):this.videoStream.getAudioTracks().forEach((function(t){e.remixStream.addTrack(t.clone())}))},stopPlayer:function(){this.remixStream&&(this.remixStream.getTracks().forEach((function(e){e.stop()})),this.remixStream=[])},close:function(){this.videoStream&&this.videoStream.getTracks().forEach((function(e){return e.stop()})),this.audioStream&&this.audioStream.getTracks().forEach((function(e){return e.stop()})),this.remixStream&&this.remixStream.getTracks().forEach((function(e){return e.stop()}))}},mounted:function(){var e=this,t=this.$refs.localVideo;t.addEventListener("canplay",(function(){e.videoStream=e.getMediaStream(t)}));var r=this.$refs.localAudio;r.addEventListener("canplay",(function(){e.audioStream=e.getMediaStream(r)}))},destroyed:function(){this.close()}},f=p,v=(r("056e"),Object(d["a"])(f,a,o,!1,null,"e887bb70",null));t["default"]=v.exports},"4c76":function(e,t,r){"use strict";var a=r("f3b2"),o=r.n(a);o.a},5107:function(e,t,r){},"6eba":function(e,t,r){var a=r("23e7");a({target:"Date",stat:!0},{now:function(){return(new Date).getTime()}})},7775:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-table",{attrs:{data:e.tableData,stripe:""}},[r("el-table-column",{attrs:{label:"媒体流ID",align:"center"}},[r("el-table-column",{attrs:{label:"名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.label.substr(0,8))+"...")]}}])})],1),r("el-table-column",{attrs:{label:e.value&&e.value.id}},[r("el-table-column",{attrs:{prop:"kind",label:"类型",align:"center"}}),r("el-table-column",{attrs:{label:"id",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.id.substr(0,8))+"...")]}}])}),r("el-table-column",{attrs:{label:"state",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.readyState))]}}])}),r("el-table-column",{attrs:{label:"enabled",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.enabled))]}}])}),r("el-table-column",{attrs:{label:"muted",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.muted))]}}])}),e.edited?r("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"移除轨道",placement:"left"}},[r("el-link",{staticClass:"el-icon-minus",on:{click:function(r){return e.removeTrack(t.row)}}})],1)]}}],null,!1,3439156443)}):e._e(),r("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-main",{staticClass:"table-expand"},[r("el-row",[r("h4",[e._v("Base:")]),r("el-col",{attrs:{span:12}},[e._v("label: "+e._s(t.row.label))]),r("el-col",{attrs:{span:12}},[e._v("ID: "+e._s(t.row.id))])],1),r("el-row",[r("h4",[e._v("Constraints:")]),e._l(t.row.getConstraints(),(function(t,a){return r("el-col",{key:a,attrs:{span:12}},[e._v(e._s(a)+" : "+e._s(t))])}))],2),r("el-row",[r("h4",[e._v("Settings:")]),e._l(t.row.getSettings(),(function(t,a){return r("el-col",{key:a,attrs:{span:12}},[e._v(e._s(a)+" : "+e._s(t))])}))],2),r("el-row",[r("h4",[e._v("Capabilities:")]),e._l(t.row.getCapabilities(),(function(t,a){return r("el-col",{key:a,attrs:{span:12}},[e._v(e._s(a)+" : "+e._s(t))])}))],2)],1)]}}])})],1)],1)},o=[],n=(r("99af"),{name:"StreamTracks",props:{value:{type:MediaStream,default:null},edited:{type:Boolean,default:!1}},data:function(){return{id:null,tableData:[]}},watch:{value:function(e){this.id=e.id,this.tableData=[],this.tableData=this.tableData.concat(e.getVideoTracks(),e.getAudioTracks())}},methods:{removeTrack:function(e){this.value&&(e.stop(),this.value.removeTrack(e),console.log("remove track id",e.label,e.id),this.$emit("input",this.value))}}}),i=n,s=(r("37d3"),r("2877")),l=Object(s["a"])(i,a,o,!1,null,"82e6b8c4",null);t["a"]=l.exports},"99af":function(e,t,r){"use strict";var a=r("23e7"),o=r("d039"),n=r("e8b5"),i=r("861d"),s=r("7b0b"),l=r("50c4"),c=r("8418"),d=r("65f0"),u=r("1dde"),m=r("b622"),p=r("2d00"),f=m("isConcatSpreadable"),v=9007199254740991,b="Maximum allowed index exceeded",h=p>=51||!o((function(){var e=[];return e[f]=!1,e.concat()[0]!==e})),g=u("concat"),y=function(e){if(!i(e))return!1;var t=e[f];return void 0!==t?!!t:n(e)},S=!h||!g;a({target:"Array",proto:!0,forced:S},{concat:function(e){var t,r,a,o,n,i=s(this),u=d(i,0),m=0;for(t=-1,a=arguments.length;t<a;t++)if(n=-1===t?i:arguments[t],y(n)){if(o=l(n.length),m+o>v)throw TypeError(b);for(r=0;r<o;r++,m++)r in n&&c(u,m,n[r])}else{if(m>=v)throw TypeError(b);c(u,m++,n)}return u.length=m,u}})},f3b2:function(e,t,r){}}]);