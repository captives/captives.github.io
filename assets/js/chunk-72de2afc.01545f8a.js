(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72de2afc"],{"38ed":function(t,e,i){"use strict";var o=i("3bb4"),n=i.n(o);n.a},"3bb4":function(t,e,i){},"3e3f":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-row",[t.srcElement?i("ol",[i("li",[t._v("title: "+t._s(t.srcElement.title))]),i("li",[t._v(" dom size: "+t._s(t.srcElement.clientWidth)+"x"+t._s(t.srcElement.clientHeight)+" ")]),i("li",[t._v(" video size: "+t._s(t.srcElement.videoWidth)+"x"+t._s(t.srcElement.videoHeight)+" ")]),i("li",[t._v(" src: "),i("el-link",{attrs:{href:t.srcElement.src,target:"_blank"}},[t._v(t._s(t.srcElement.src))])],1),i("li",[t._v("poster: "+t._s(t.srcElement.poster))]),i("li",[t._v("srcObject: "+t._s(t.srcElement.srcObject))]),i("li",[t._v("sinkId: "+t._s(t.srcElement.sinkId))]),i("li",[t._v("paused: "+t._s(t.srcElement.paused))]),i("li",[t._v("currentTime: "+t._s(t.currentTime))]),i("li",[t._v("duration: "+t._s(t.srcElement.duration))]),i("li",[t._v("autoplay: "+t._s(t.srcElement.autoplay))]),i("li",[t._v("loop: "+t._s(t.srcElement.loop))]),i("li",[t._v("muted: "+t._s(t.srcElement.muted))]),i("li",[t._v("volume: "+t._s(t.srcElement.volume))]),i("li",[t._v("controls: "+t._s(t.srcElement.controls))]),i("li",[t._v("webkitDecodedFrameCount: "+t._s(t.srcElement.webkitDecodedFrameCount))]),i("li",[t._v("webkitDroppedFrameCount: "+t._s(t.srcElement.webkitDroppedFrameCount))]),i("li",[t._v(" webkitAudioDecodedByteCount: "+t._s(t.srcElement.webkitAudioDecodedByteCount)+" ")]),i("li",[t._v(" webkitVideoDecodedByteCount: "+t._s(t.srcElement.webkitVideoDecodedByteCount)+" ")])]):t._e()])},n=[],s={name:"VideoMetaData",data:function(){return{video:null,loading:!1,currentTime:0,srcElement:null,info:null}},mounted:function(){},methods:{listen:function(t){this.video=t,t&&(t.addEventListener("canplay",this.oncanplay),t.addEventListener("loadeddata",this.onloadedmetadata),t.addEventListener("loadedmetadata",this.onloadedmetadata),t.addEventListener("progress",this.onprogress),t.addEventListener("timeupdate",this.ontimeupdate),t.addEventListener("play",this.onplay))},oncanplay:function(t){this.srcElement=t.srcElement,console.log(this.srcElement.videoWidth,this.srcElement.videoHeight)},onloadedmetadata:function(t){this.loading=!1,console.log("onloadedmetadata",t)},onplay:function(t){this.loading=!1,console.log("onplay",t)},onprogress:function(t){this.loading=!0},ontimeupdate:function(t){this.currentTime=t.target.currentTime}}},a=s,l=(i("4da6"),i("2877")),r=function(t){t.options.__source="src/guide/components/VideoMetaData.vue"},c=r,d=Object(l["a"])(a,o,n,!1,null,"2cc54caa",null);"function"===typeof c&&c(d);e["a"]=d.exports},"4da6":function(t,e,i){"use strict";var o=i("99a2"),n=i.n(o);n.a},"99a2":function(t,e,i){},e675:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-main",{staticClass:"center"},[i("url-input",{attrs:{list:t.$videoList},model:{value:t.url,callback:function(e){t.url=e},expression:"url"}}),i("el-row",{attrs:{gutter:50}},[i("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[i("el-divider",{attrs:{"content-position":"left"}},[t._v("Video")]),i("video",{ref:"localVideo",staticClass:"video-item",attrs:{src:t.url,controls:"",muted:"",loop:"",autoplay:""},domProps:{muted:!0}})],1),i("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[i("el-divider",{attrs:{"content-position":"left"}},[t._v("Canvas")]),i("canvas",{ref:"draw",staticClass:"video-item"}),i("el-row",[t._v(" 行 "),i("el-input-number",{attrs:{min:1,max:10,size:"small"},model:{value:t.row,callback:function(e){t.row=e},expression:"row"}}),t._v("列 "),i("el-input-number",{attrs:{min:1,max:10,size:"small"},model:{value:t.column,callback:function(e){t.column=e},expression:"column"}})],1)],1)],1),i("el-row",{attrs:{gutter:50}},[i("el-col",{staticClass:"center",attrs:{xs:12,sm:12,md:6}},[i("el-divider",{attrs:{"content-position":"left"}},[t._v("MetaData")]),i("VideoMetaData",{ref:"videoMedata"})],1),i("el-col",{staticClass:"center",attrs:{xs:12,sm:12,md:6}},[i("el-divider",{attrs:{"content-position":"left"}},[t._v("RGB")]),i("el-row",[i("el-slider",{attrs:{min:0,max:255,"show-input":"",label:"R"},model:{value:t.color.R,callback:function(e){t.$set(t.color,"R",e)},expression:"color.R"}}),i("el-slider",{attrs:{min:0,max:255,"show-input":"",label:"G"},model:{value:t.color.G,callback:function(e){t.$set(t.color,"G",e)},expression:"color.G"}}),i("el-slider",{attrs:{min:0,max:255,"show-input":"",label:"B"},model:{value:t.color.B,callback:function(e){t.$set(t.color,"B",e)},expression:"color.B"}})],1)],1),i("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[i("el-divider",{attrs:{"content-position":"left"}},[t._v("Compose")]),i("canvas",{ref:"compose",staticClass:"video-item"})],1)],1),i("vue-source",{attrs:{src:"guide/views/canvas/DrawVideoGreenScreen.vue",lang:"html"}})],1)},n=[],s=i("3e3f"),a={name:"DrawVideoSplicing",components:{VideoMetaData:s["a"]},data:function(){return{url:null,context:null,context2:null,row:2,column:2,width:0,height:0,color:{R:10,G:35,B:200}}},mounted:function(){var t=this.$refs.localVideo;this.$refs.videoMedata.listen(t),t.addEventListener("canplay",this.init),this.url=this.$videoList[this.$videoList.length-1].value},methods:{init:function(t){var e=this.$refs.draw;if(e){this.width=2*t.target.offsetWidth,this.height=2*t.target.offsetHeight,e.setAttribute("width",this.width),e.setAttribute("height",this.height),this.context=e.getContext("2d");var i=this.$refs.compose;i.setAttribute("width",this.width),i.setAttribute("height",this.height),this.context2=i.getContext("2d"),this.animate()}},drawText:function(t,e,i){this.context.font="32px 微软雅黑",this.context.fillStyle="#FFF",this.context.fillText("video "+i,t,e)},animate:function(){var t=this.$refs.localVideo,e=this.$refs.draw;if(t){var i=Math.floor(t.videoWidth/this.column),o=Math.floor(t.videoHeight/this.row),n=Math.floor(e.width/this.column),s=Math.floor(e.height/this.row);this.context.clearRect(0,0,e.width,e.height);for(var a=0;a<this.column;a++)for(var l=0;l<this.row;l++)this.context.drawImage(t,a*i,l*o,i,o,a*n+1,l*s+1,n-1,s-1),this.drawText((a+1)*n-150,l*s+50,l*this.column+a+1);this.videoPost(this.context,this.context2),"requestAnimationFrame"in window?requestAnimationFrame(this.animate):"webkitRequestAnimationFrame"in window?webkitRequestAnimationFrame(this.animate):"msRequestAnimationFrame"in window?msRequestAnimationFrame(this.animate):"mozRequestAnimationFrame"in window&&mozRequestAnimationFrame(this.animate)}},videoPost:function(t,e){for(var i=t.getImageData(0,0,this.width,this.height),o=i.data.length/4,n=0;n<o;n++){var s=i.data[4*n+0],a=i.data[4*n+1],l=i.data[4*n+2];s>this.color.R&&a>this.color.G&&l<this.color.B&&(i.data[4*n+3]=0)}e.putImageData(i,0,0)}}},l=a,r=(i("38ed"),i("2877")),c=function(t){t.options.__source="src/guide/views/canvas/DrawVideoGreenScreen.vue"},d=c,u=Object(r["a"])(l,o,n,!1,null,"3451c160",null);"function"===typeof d&&d(u);e["default"]=u.exports}}]);