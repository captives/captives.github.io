(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c11a2ab4"],{"0d31":function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-table",{attrs:{data:e.tableData,stripe:""}},[r("el-table-column",{attrs:{label:"媒体流ID",align:"center"}},[r("el-table-column",{attrs:{label:"名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.label.substr(0,8))+"...")]}}])})],1),r("el-table-column",{attrs:{label:e.value&&e.value.id}},[r("el-table-column",{attrs:{prop:"kind",label:"类型",align:"center"}}),r("el-table-column",{attrs:{label:"id",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.id.substr(0,8))+"...")]}}])}),r("el-table-column",{attrs:{label:"state",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.readyState))]}}])}),r("el-table-column",{attrs:{label:"enabled",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.enabled))]}}])}),r("el-table-column",{attrs:{label:"muted",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.muted))]}}])}),e.edited?r("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"移除轨道",placement:"left"}},[r("el-link",{staticClass:"el-icon-minus",on:{click:function(r){return e.removeTrack(t.row)}}})],1)]}}],null,!1,3439156443)}):e._e(),r("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-main",{staticClass:"table-expand"},[r("el-row",[r("h4",[e._v("Base:")]),r("el-col",{attrs:{span:12}},[e._v("label: "+e._s(t.row.label))]),r("el-col",{attrs:{span:12}},[e._v("ID: "+e._s(t.row.id))])],1),r("el-row",[r("h4",[e._v("Constraints:")]),e._l(t.row.getConstraints(),(function(t,o){return r("el-col",{key:o,attrs:{span:12}},[e._v(e._s(o)+" : "+e._s(t))])}))],2),r("el-row",[r("h4",[e._v("Settings:")]),e._l(t.row.getSettings(),(function(t,o){return r("el-col",{key:o,attrs:{span:12}},[e._v(e._s(o)+" : "+e._s(t))])}))],2),r("el-row",[r("h4",[e._v("Capabilities:")]),e._l(t.row.getCapabilities(),(function(t,o){return r("el-col",{key:o,attrs:{span:12}},[e._v(e._s(o)+" : "+e._s(t))])}))],2)],1)]}}])})],1)],1)},n=[],a=(r("99af"),{name:"StreamTracks",props:{value:{type:MediaStream,default:null},edited:{type:Boolean,default:!1}},data:function(){return{id:null,tableData:[]}},watch:{value:function(e){this.id=e.id,this.tableData=[],this.tableData=this.tableData.concat(e.getVideoTracks(),e.getAudioTracks())}},methods:{removeTrack:function(e){this.value&&(e.stop(),this.value.removeTrack(e),console.log("remove track id",e.label,e.id),this.$emit("input",this.value))}}}),i=a,c=(r("f8b5"),r("2877")),l=function(e){e.options.__source="src/guide/components/StreamTracks.vue"},s=l,d=Object(c["a"])(i,o,n,!1,null,"2e99fe9d",null);"function"===typeof s&&s(d);t["a"]=d.exports},"11f7":function(e,t,r){},"14b9":function(e,t,r){"use strict";var o=r("318d"),n=r.n(o);n.a},"1dde":function(e,t,r){var o=r("d039"),n=r("b622"),a=r("2d00"),i=n("species");e.exports=function(e){return a>=51||!o((function(){var t=[],r=t.constructor={};return r[i]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"318d":function(e,t,r){},"3ca3":function(e,t,r){"use strict";var o=r("6547").charAt,n=r("69f3"),a=r("7dd0"),i="String Iterator",c=n.set,l=n.getterFor(i);a(String,"String",(function(e){c(this,{type:i,string:String(e),index:0})}),(function(){var e,t=l(this),r=t.string,n=t.index;return n>=r.length?{value:void 0,done:!0}:(e=o(r,n),t.index+=e.length,{value:e,done:!1})}))},8418:function(e,t,r){"use strict";var o=r("c04e"),n=r("9bf2"),a=r("5c6c");e.exports=function(e,t,r){var i=o(t);i in e?n.f(e,i,a(0,r)):e[i]=r}},"99af":function(e,t,r){"use strict";var o=r("23e7"),n=r("d039"),a=r("e8b5"),i=r("861d"),c=r("7b0b"),l=r("50c4"),s=r("8418"),d=r("65f0"),u=r("1dde"),f=r("b622"),p=r("2d00"),m=f("isConcatSpreadable"),v=9007199254740991,b="Maximum allowed index exceeded",g=p>=51||!n((function(){var e=[];return e[m]=!1,e.concat()[0]!==e})),h=u("concat"),y=function(e){if(!i(e))return!1;var t=e[m];return void 0!==t?!!t:a(e)},_=!g||!h;o({target:"Array",proto:!0,forced:_},{concat:function(e){var t,r,o,n,a,i=c(this),u=d(i,0),f=0;for(t=-1,o=arguments.length;t<o;t++)if(a=-1===t?i:arguments[t],y(a)){if(n=l(a.length),f+n>v)throw TypeError(b);for(r=0;r<n;r++,f++)r in a&&s(u,f,a[r])}else{if(f>=v)throw TypeError(b);s(u,f++,a)}return u.length=f,u}})},bc2c:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-main",{staticClass:"center"},[r("el-row",{attrs:{gutter:50}},[r("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[r("el-divider",{attrs:{"content-position":"left"}},[e._v("Screen")]),r("video",{ref:"localVideo",staticClass:"video-item",attrs:{autoplay:""}}),r("div",[e.rendering?e._e():r("el-button",{attrs:{type:"success"},on:{click:e.initScreenStream}},[e._v("开启录像")]),e.localStream?[e.recording?r("el-button",{attrs:{type:"danger"},on:{click:e.stopRecoder}},[e._v("停止录制")]):r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.startRecoding(e.localStream)}}},[e._v("开始录制")])]:e._e()],2)],1),r("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[r("el-divider",{attrs:{"content-position":"left"}},[e._v("Recorder")]),r("video",{ref:"playVideo",staticClass:"video-item",attrs:{autoplay:""}}),e.recordBlobs.length?r("div",[e.recording?r("el-tag",{attrs:{type:"danger"}},[e._v("Rec ....")]):r("el-button",{attrs:{type:"danger"},on:{click:e.downloadfile}},[e._v("下载视频")])],1):e._e()],1)],1),r("StreamTracks",{model:{value:e.localStream,callback:function(t){e.localStream=t},expression:"localStream"}}),e.error?r("el-tag",{staticClass:"error",attrs:{type:"danger"}},[e._v(e._s(e.error))]):e._e(),r("vue-source",{attrs:{src:"guide/views/webrtc/DisplayMediaRecorder.vue",lang:"html"}})],1)},n=[],a=(r("4160"),r("d3b7"),r("3ca3"),r("159b"),r("ddb0"),r("2b3d"),r("0d31")),i={name:"DisplayMediaRecorder",components:{StreamTracks:a["a"]},data:function(){return{rendering:!1,localStream:null,options:{audio:!0,video:{width:{exact:720},height:{exact:405}}},recordBlobs:[],recording:!1,mediaRecorder:null,error:null}},mounted:function(){this.init()},destroyed:function(){this.localStream.getTracks().forEach((function(e){return e.stop()}))},methods:{init:function(){},getDisplayMedia:function(){return navigator.getDisplayMedia?navigator.getDisplayMedia({video:!0}):navigator.mediaDevices.getDisplayMedia?navigator.mediaDevices.getDisplayMedia({video:!0}):navigator.mediaDevices.getUserMedia({video:{mediaSource:"screen"}})},initScreenStream:function(){var e=this,t=this,r=this.$refs.localVideo;return new Promise((function(o,n){e.getDisplayMedia().then((function(n){e.localStream=n,n.oninactive=function(){t.rendering=!1,console.log("Capture stream inactive - stop recording!")},r.addEventListener("loadedmetadata",(function(e){t.rendering=!0,console.log("AudioTracks",n.getAudioTracks()),console.log("VideoTracks",n.getVideoTracks())})),r.srcObject=n,o(n)})).catch((function(e){t.error=e,console.log("navigator.getUserMedia error: ",e),n(e)}))}))},startRecoding:function(e){var t=this;this.recordBlobs=[];var r={mimeType:"video/webm;codecs=vp9"};MediaRecorder.isTypeSupported(r.mimeType)||(console.log(r.mimeType+" is not Supported"),r={mimeType:"video/webm;codecs=vp8"},MediaRecorder.isTypeSupported(r.mimeType)||(console.log(r.mimeType+" is not Supported"),r={mimeType:"video/webm"},MediaRecorder.isTypeSupported(r.mimeType)||(console.log(r.mimeType+" is not Supported"),r={mimeType:""})));try{this.mediaRecorder=new MediaRecorder(e,r)}catch(o){alert("Exception while creating MediaRecorder: "+o+". mimeType: "+r.mimeType)}console.log("Created MediaRecorder",this.mediaRecorder,"with options",r),this.mediaRecorder.onstart=function(e){t.recording=!0},this.mediaRecorder.onstop=function(e){t.recording=!1,console.log("Recorder stopped: ",e)},this.mediaRecorder.ondataavailable=function(e){e.data&&e.data.size>0&&t.recordBlobs.push(e.data)},this.mediaRecorder.onerror=function(e){t.error=e},this.mediaRecorder.start(10),console.log("MediaRecorder started",this.mediaRecorder)},stopRecoder:function(){this.mediaRecorder&&this.recording&&this.mediaRecorder.stop();var e=this.$refs.playVideo;if(e.addEventListener("loadedmetadata",(function(t){console.log("loadedmetadata",e.currentTime,e.duration),e.duration===1/0&&(e.currentTime=1e101,e.ontimeupdate=function(){e.currentTime=0,e.ontimeupdate=function(){delete e.ontimeupdate,e.play()}})})),this.recordBlobs&&this.recordBlobs.length){var t=new Blob(this.recordBlobs,{type:"video/webm"});e.src=window.URL.createObjectURL(t)}},downloadfile:function(){if(this.recordBlobs&&this.recordBlobs.length){var e=new Blob(this.recordBlobs,{type:"video/webm"}),t=window.URL.createObjectURL(e),r=document.createElement("a");r.style.display="none",r.href=t,r.download="Rec_"+Date.now()+".webm",document.body.appendChild(r),r.click(),setTimeout((function(){document.body.removeChild(r),window.URL.revokeObjectURL(t)}),100)}}}},c=i,l=(r("14b9"),r("2877")),s=function(e){e.options.__source="src/guide/views/webrtc/DisplayMediaRecorder.vue"},d=s,u=Object(l["a"])(c,o,n,!1,null,"d94467fe",null);"function"===typeof d&&d(u);t["default"]=u.exports},ddb0:function(e,t,r){var o=r("da84"),n=r("fdbc"),a=r("e260"),i=r("9112"),c=r("b622"),l=c("iterator"),s=c("toStringTag"),d=a.values;for(var u in n){var f=o[u],p=f&&f.prototype;if(p){if(p[l]!==d)try{i(p,l,d)}catch(v){p[l]=d}if(p[s]||i(p,s,u),n[u])for(var m in a)if(p[m]!==a[m])try{i(p,m,a[m])}catch(v){p[m]=a[m]}}}},f8b5:function(e,t,r){"use strict";var o=r("11f7"),n=r.n(o);n.a}}]);