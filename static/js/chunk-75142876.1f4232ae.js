(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75142876"],{3398:function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("el-main",{staticClass:"center"},[e("url-input",{attrs:{list:t.$videoList},model:{value:t.url,callback:function(i){t.url=i},expression:"url"}}),e("el-row",{attrs:{gutter:50}},[e("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[e("el-divider",{attrs:{"content-position":"left"}},[t._v("Video")]),e("video",{ref:"localVideo",staticClass:"video-item",attrs:{src:t.url,controls:"",muted:"",loop:"",autoplay:""},domProps:{muted:!0}})],1),e("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[e("el-divider",{attrs:{"content-position":"left"}},[t._v("Canvas")]),e("div",{ref:"container",staticClass:"video-item"}),e("el-row",[t._v(" 行 "),e("el-input-number",{attrs:{min:1,max:10,size:"small"},on:{change:t.handleChange},model:{value:t.row,callback:function(i){t.row=i},expression:"row"}}),t._v("列 "),e("el-input-number",{attrs:{min:1,max:10,size:"small"},on:{change:t.handleChange},model:{value:t.column,callback:function(i){t.column=i},expression:"column"}})],1)],1)],1),e("vue-source",{attrs:{src:"src/webrtc/views/canvas/DrawVideoSplitCopy.vue",lang:"html"}})],1)},a=[],o={name:"DrawVideoSplitCopy",data:function(){return{url:"",list:[],row:2,column:2,animationFrameId:0}},methods:{init:function(t){var i=this.$refs.container;i.innerHTML="",this.list=[];for(var e=Math.floor(i.clientWidth/this.column),n=Math.floor(i.clientHeight/this.row),a=0;a<this.row;a++)for(var o=0;o<this.column;o++){var s=document.createElement("canvas"),r=s.getContext("2d");s.setAttribute("width",e-1),s.setAttribute("height",n-1),s.style.position="absolute",s.style.left=o*e+1+"px",s.style.top=a*n+1+"px",i.appendChild(s),this.list.push(r)}this.animate()},animate:function(){var t=this.$refs.localVideo,i=this.$refs.container,e=Math.floor(i.clientWidth/this.column),n=Math.floor(i.clientHeight/this.row);if(t){for(var a=Math.floor(t.videoWidth/this.column),o=Math.floor(t.videoHeight/this.row),s=0;s<this.column;s++)for(var r=0;r<this.row;r++){var l=this.list[r*this.column+s];l.drawImage(t,s*a,r*o,a,o,0,0,e,n)}"requestAnimationFrame"in window?this.animationFrameId=requestAnimationFrame(this.animate):"webkitRequestAnimationFrame"in window?this.animationFrameId=webkitRequestAnimationFrame(this.animate):"msRequestAnimationFrame"in window?this.animationFrameId=msRequestAnimationFrame(this.animate):"mozRequestAnimationFrame"in window&&(this.animationFrameId=mozRequestAnimationFrame(this.animate))}},handleChange:function(){"cancelAnimationFrame"in window?cancelAnimationFrame(this.animationFrameId):"webkitCancelAnimationFrame"in window?webkitCancelAnimationFrame(this.animate):"msCancelAnimationFrame"in window?msCancelAnimationFrame(this.animate):"mozCancelAnimationFrame"in window&&mozCancelAnimationFrame(this.animate),this.init()}},mounted:function(){this.$refs.localVideo;this.init()}},s=o,r=(e("6f87"),e("2877")),l=Object(r["a"])(s,n,a,!1,null,"52434ed8",null);i["default"]=l.exports},"52f3":function(t,i,e){},"6f87":function(t,i,e){"use strict";var n=e("52f3"),a=e.n(n);a.a}}]);