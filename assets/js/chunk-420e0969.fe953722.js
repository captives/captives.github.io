(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-420e0969"],{"0d31":function(e,t,o){"use strict";var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-table",{attrs:{data:e.tableData,stripe:""}},[o("el-table-column",{attrs:{label:"媒体流ID",align:"center"}},[o("el-table-column",{attrs:{label:"名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.label.substr(0,8))+"...")]}}])})],1),o("el-table-column",{attrs:{label:e.value&&e.value.id}},[o("el-table-column",{attrs:{prop:"kind",label:"类型",align:"center"}}),o("el-table-column",{attrs:{label:"id",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.id.substr(0,8))+"...")]}}])}),o("el-table-column",{attrs:{label:"state",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.readyState))]}}])}),o("el-table-column",{attrs:{label:"enabled",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.enabled))]}}])}),o("el-table-column",{attrs:{label:"muted",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.muted))]}}])}),e.edited?o("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"移除轨道",placement:"left"}},[o("el-link",{staticClass:"el-icon-minus",on:{click:function(o){return e.removeTrack(t.row)}}})],1)]}}],null,!1,3439156443)}):e._e(),o("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-main",{staticClass:"table-expand"},[o("el-row",[o("h4",[e._v("Base:")]),o("el-col",{attrs:{span:12}},[e._v("label: "+e._s(t.row.label))]),o("el-col",{attrs:{span:12}},[e._v("ID: "+e._s(t.row.id))])],1),o("el-row",[o("h4",[e._v("Constraints:")]),e._l(t.row.getConstraints(),(function(t,r){return o("el-col",{key:r,attrs:{span:12}},[e._v(e._s(r)+" : "+e._s(t))])}))],2),o("el-row",[o("h4",[e._v("Settings:")]),e._l(t.row.getSettings(),(function(t,r){return o("el-col",{key:r,attrs:{span:12}},[e._v(e._s(r)+" : "+e._s(t))])}))],2),o("el-row",[o("h4",[e._v("Capabilities:")]),e._l(t.row.getCapabilities(),(function(t,r){return o("el-col",{key:r,attrs:{span:12}},[e._v(e._s(r)+" : "+e._s(t))])}))],2)],1)]}}])})],1)],1)},n=[],a=(o("99af"),{name:"StreamTracks",props:{value:{type:MediaStream,default:null},edited:{type:Boolean,default:!1}},data:function(){return{id:null,tableData:[]}},watch:{value:function(e){this.id=e.id,this.tableData=[],this.tableData=this.tableData.concat(e.getVideoTracks(),e.getAudioTracks())}},methods:{removeTrack:function(e){this.value&&(e.stop(),this.value.removeTrack(e),console.log("remove track id",e.label,e.id),this.$emit("input",this.value))}}}),i=a,s=(o("f8b5"),o("2877")),c=function(e){e.options.__source="src/guide/components/StreamTracks.vue"},l=c,d=Object(s["a"])(i,r,n,!1,null,"2e99fe9d",null);"function"===typeof l&&l(d);t["a"]=d.exports},"11f7":function(e,t,o){},"1dde":function(e,t,o){var r=o("d039"),n=o("b622"),a=o("2d00"),i=n("species");e.exports=function(e){return a>=51||!r((function(){var t=[],o=t.constructor={};return o[i]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"72ef":function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-main",{staticClass:"center"},[o("el-row",{attrs:{gutter:50}},[o("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[o("el-divider",{attrs:{"content-position":"left"}},[e._v("预览")]),o("video",{staticClass:"video-item",attrs:{autoplay:""},domProps:{srcObject:e.localStream}})],1),o("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[o("el-divider",{attrs:{"content-position":"left"}},[e._v("录制")]),o("el-form",{attrs:{model:e.form,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"文件名"}},[o("el-input",{attrs:{clearable:"",disabled:e.form.connected},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),o("el-form-item",{attrs:{label:"服务器地址"}},[o("el-input",{attrs:{clearable:"",disabled:e.form.connected},model:{value:e.form.url,callback:function(t){e.$set(e.form,"url",t)},expression:"form.url"}},[o("el-button",{attrs:{slot:"append",icon:e.form.connected?"el-icon-connection":"el-icon-link"},on:{click:e.runWebSocket},slot:"append"})],1)],1),o("el-form-item",[e.recording?o("el-button",{attrs:{type:"danger"},on:{click:e.stopRecorder}},[e._v("停止录制")]):o("el-button",{attrs:{type:"success"},on:{click:e.startRecorder}},[e._v("开启录制")])],1)],1)],1)],1),o("StreamTracks",{model:{value:e.localStream,callback:function(t){e.localStream=t},expression:"localStream"}}),e.error?o("el-tag",{staticClass:"error",attrs:{type:"danger"}},[e._v(e._s(e.error))]):e._e()],1)},n=[],a=(o("4160"),o("d3b7"),o("159b"),o("0d31")),i={name:"DisplayMediaRecorder",components:{StreamTracks:a["a"]},data:function(){return{form:{connected:!1,name:"Recorder",url:"wss://local.uuabc.com:2020"},socket:null,localStream:null,options:{audio:!0,video:{width:{exact:720},height:{exact:405}}},recording:!1,mediaRecorder:null,error:null}},destroyed:function(){},methods:{runWebSocket:function(){var e=this;if("WebSocket"in window)if(this.form.connected)this.socket.close(),this.socket=null,this.form.connected=!1;else{var t=this.socket=new WebSocket(this.form.url);t.onopen=function(){e.form.connected=!0,t.send(JSON.stringify({event:"register",name:e.form.name}))},t.onmessage=function(e){},t.onclose=function(){e.form.connected=!1}}else alert("您的浏览器不支持 WebSocket!")},sendMessage:function(e){console.log(e),this.form.connected&&this.socket.send(JSON.stringify(e))},startRecorder:function(){var e=this,t=this;return new Promise((function(o,r){e.getDisplayMedia().then((function(t){e.localStream=t,t.oninactive=function(){this.recording=!1,console.log("媒体流关闭 - 停止录制")},e.startRecoding(t),o(t)})).catch((function(e){t.error=e,console.log("navigator.getUserMedia error: ",e),r(e)}))}))},getDisplayMedia:function(){return navigator.getDisplayMedia?navigator.getDisplayMedia({video:!0,audio:!0}):navigator.mediaDevices.getDisplayMedia?navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0}):navigator.mediaDevices.getUserMedia({video:{mediaSource:"screen"},audio:!0})},startRecoding:function(e){var t=this,o={mimeType:"video/webm;codecs=h264"};MediaRecorder.isTypeSupported(o.mimeType)||(console.log(o.mimeType+" is not Supported"),o={mimeType:"video/webm;codecs=vp9"},MediaRecorder.isTypeSupported(o.mimeType)||(console.log(o.mimeType+" is not Supported"),o={mimeType:"video/webm;codecs=vp8"},MediaRecorder.isTypeSupported(o.mimeType)||(console.log(o.mimeType+" is not Supported"),o={mimeType:"video/webm"},MediaRecorder.isTypeSupported(o.mimeType)||(console.log(o.mimeType+" is not Supported"),o={mimeType:""}))));try{console.log("Recorder",o),this.mediaRecorder=new MediaRecorder(e,o)}catch(r){alert("Exception while creating MediaRecorder: "+r+". mimeType: "+o.mimeType)}console.log("Created MediaRecorder",this.mediaRecorder,"with options",o),this.mediaRecorder.onstart=function(e){t.recording=!0,t.sendMessage({event:"START_REC_BLOB",uid:"user.id"})},this.mediaRecorder.onstop=function(e){t.recording=!1,t.sendMessage({event:"STOP_REC_BLOB",uid:"user.id"}),console.log("Recorder stopped: ",e)},this.mediaRecorder.ondataavailable=function(e){if(e.data&&e.data.size>0){var o=new FileReader;o.onerror=function(e){console.error("媒体流转换到blob数据失败",e)},o.onloadend=function(){t.sendMessage({event:"REC_BLOB",blob:o.result,uid:"user.id"})},o.readAsBinaryString(e.data)}},this.mediaRecorder.onerror=function(e){t.error=e},this.mediaRecorder.start(200),console.log("MediaRecorder started",this.mediaRecorder)},stopRecorder:function(){this.mediaRecorder&&this.recording&&this.mediaRecorder.stop(),this.localStream.getTracks().forEach((function(e){return e.stop()}))}}},s=i,c=(o("9736"),o("2877")),l=function(e){e.options.__source="src/guide/views/webrtc/DisplayMediaRecorderToFile.vue"},d=l,u=Object(c["a"])(s,r,n,!1,null,"9e9274be",null);"function"===typeof d&&d(u);t["default"]=u.exports},8418:function(e,t,o){"use strict";var r=o("c04e"),n=o("9bf2"),a=o("5c6c");e.exports=function(e,t,o){var i=r(t);i in e?n.f(e,i,a(0,o)):e[i]=o}},9736:function(e,t,o){"use strict";var r=o("e35c"),n=o.n(r);n.a},"99af":function(e,t,o){"use strict";var r=o("23e7"),n=o("d039"),a=o("e8b5"),i=o("861d"),s=o("7b0b"),c=o("50c4"),l=o("8418"),d=o("65f0"),u=o("1dde"),m=o("b622"),f=o("2d00"),p=m("isConcatSpreadable"),v=9007199254740991,b="Maximum allowed index exceeded",g=f>=51||!n((function(){var e=[];return e[p]=!1,e.concat()[0]!==e})),h=u("concat"),_=function(e){if(!i(e))return!1;var t=e[p];return void 0!==t?!!t:a(e)},y=!g||!h;r({target:"Array",proto:!0,forced:y},{concat:function(e){var t,o,r,n,a,i=s(this),u=d(i,0),m=0;for(t=-1,r=arguments.length;t<r;t++)if(a=-1===t?i:arguments[t],_(a)){if(n=c(a.length),m+n>v)throw TypeError(b);for(o=0;o<n;o++,m++)o in a&&l(u,m,a[o])}else{if(m>=v)throw TypeError(b);l(u,m++,a)}return u.length=m,u}})},e35c:function(e,t,o){},f8b5:function(e,t,o){"use strict";var r=o("11f7"),n=o.n(r);n.a}}]);