(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60582a55"],{"0d31":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-table",{attrs:{data:t.tableData,stripe:""}},[a("el-table-column",{attrs:{label:"媒体流ID",align:"center"}},[a("el-table-column",{attrs:{label:"名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.label.substr(0,8))+"...")]}}])})],1),a("el-table-column",{attrs:{label:t.value&&t.value.id}},[a("el-table-column",{attrs:{prop:"kind",label:"类型",align:"center"}}),a("el-table-column",{attrs:{label:"id",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.id.substr(0,8))+"...")]}}])}),a("el-table-column",{attrs:{label:"state",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.readyState))]}}])}),a("el-table-column",{attrs:{label:"enabled",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.enabled))]}}])}),a("el-table-column",{attrs:{label:"muted",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.muted))]}}])}),t.edited?a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"移除轨道",placement:"left"}},[a("el-link",{staticClass:"el-icon-minus",on:{click:function(a){return t.removeTrack(e.row)}}})],1)]}}],null,!1,3439156443)}):t._e(),a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-main",{staticClass:"table-expand"},[a("el-row",[a("h4",[t._v("Base:")]),a("el-col",{attrs:{span:12}},[t._v("label: "+t._s(e.row.label))]),a("el-col",{attrs:{span:12}},[t._v("ID: "+t._s(e.row.id))])],1),a("el-row",[a("h4",[t._v("Constraints:")]),t._l(e.row.getConstraints(),(function(e,s){return a("el-col",{key:s,attrs:{span:12}},[t._v(t._s(s)+" : "+t._s(e))])}))],2),a("el-row",[a("h4",[t._v("Settings:")]),t._l(e.row.getSettings(),(function(e,s){return a("el-col",{key:s,attrs:{span:12}},[t._v(t._s(s)+" : "+t._s(e))])}))],2),a("el-row",[a("h4",[t._v("Capabilities:")]),t._l(e.row.getCapabilities(),(function(e,s){return a("el-col",{key:s,attrs:{span:12}},[t._v(t._s(s)+" : "+t._s(e))])}))],2)],1)]}}])})],1)],1)},n=[],r=(a("99af"),{name:"StreamTracks",props:{value:{type:MediaStream,default:null},edited:{type:Boolean,default:!1}},data:function(){return{id:null,tableData:[]}},watch:{value:function(t){this.id=t.id,this.tableData=[],this.tableData=this.tableData.concat(t.getVideoTracks(),t.getAudioTracks())}},methods:{removeTrack:function(t){this.value&&(t.stop(),this.value.removeTrack(t),console.log("remove track id",t.label,t.id),this.$emit("input",this.value))}}}),l=r,o=(a("f8b5"),a("2877")),i=function(t){t.options.__source="src/guide/components/StreamTracks.vue"},c=i,u=Object(o["a"])(l,s,n,!1,null,"2e99fe9d",null);"function"===typeof c&&c(u);e["a"]=u.exports},"11f7":function(t,e,a){},5606:function(t,e,a){"use strict";var s=a("dded7"),n=a.n(s);n.a},8986:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-main",[a("el-row",{attrs:{gutter:50}},[a("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[a("el-divider",{attrs:{"content-position":"left"}},[t._v("Canvas")]),a("div",{ref:"chart",staticClass:"video-item"})],1),a("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[a("el-divider",{attrs:{"content-position":"left"}},[t._v("Capture")]),a("video",{ref:"playVideo",staticClass:"video-item",attrs:{autoplay:"",muted:""},domProps:{muted:!0}})],1)],1),a("StreamTracks",{model:{value:t.stream,callback:function(e){t.stream=e},expression:"stream"}}),a("vue-source",{attrs:{src:"guide/views/webrtc/VideoStreamFromCanvas.vue",lang:"html"}})],1)},n=[],r=(a("4160"),a("b680"),a("159b"),a("0d31")),l={name:"VideoStreamFromCanvas",components:{StreamTracks:r["a"]},data:function(){return{chart:null,stream:null}},mounted:function(){var t=this;this.chart=this.$echarts.init(this.$refs.chart);var e={value:50,name:"Use"};this.drawCanvas(e),setInterval((function(){e.value=(100*Math.random()).toFixed(2)-0,t.drawCanvas(e)}),1e3),this.oncanplay(this.$refs.chart)},destroyed:function(){this.stream&&(this.stream.getTracks().forEach((function(t){return t.stop()})),this.stream=null)},methods:{drawCanvas:function(t){var e={tooltip:{formatter:"{a} <br/>{b} : {c}%"},toolbox:{feature:{restore:{},saveAsImage:{}}},series:[{name:"CPU",type:"gauge",detail:{formatter:"{value}%"},data:[t]}]};this.chart.setOption(e),window.onresize=this.chart.resize},oncanplay:function(t){var e=this,a=this.$refs.playVideo,s=t.querySelector("canvas");s&&(this.stream=s.captureStream(),a.addEventListener("loadedmetadata",(function(t){console.log("AudioTracks",e.stream.getAudioTracks()),console.log("VideoTracks",e.stream.getVideoTracks())})),a.autoplay=!0,a.srcObject=this.stream,a.paused?a.play():a.pause())}}},o=l,i=(a("5606"),a("2877")),c=function(t){t.options.__source="src/guide/views/webrtc/VideoStreamFromCanvas.vue"},u=c,d=Object(i["a"])(o,s,n,!1,null,"538be749",null);"function"===typeof u&&u(d);e["default"]=d.exports},dded7:function(t,e,a){},f8b5:function(t,e,a){"use strict";var s=a("11f7"),n=a.n(s);n.a}}]);