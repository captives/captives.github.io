(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-299a2abb"],{"0c3a":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-main",{staticClass:"center"},[i("el-row",{attrs:{gutter:50}},[i("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[i("el-divider",{attrs:{"content-position":"left"}},[t._v("Video")]),i("video",{ref:"localVideo",staticClass:"video-item",attrs:{controls:"",muted:"",loop:""},domProps:{muted:!0}},[i("source",{attrs:{src:"/medias/demo.mp4"}}),i("source",{attrs:{src:"/medias/musicdemo.mp4"}})])],1),i("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[i("el-divider",{attrs:{"content-position":"left"}},[t._v("Canvas")]),i("canvas",{ref:"draw",staticClass:"video-item"})],1)],1)],1)},a=[],n=i("7a94"),o={name:"DrawVideo",data:function(){return{canvas:null}},methods:{init:function(t){var e=this.$refs.localVideo,i=this.$refs.draw;i.setAttribute("width",i.parentNode.offsetWidth-100),i.setAttribute("height",i.parentNode.offsetHeight);var s=new n["fabric"].Canvas(i);console.log("video element",e,i.parentNode);var a=new n["fabric"].Image(e,{left:e.offsetWidth/2,top:e.offsetHeight/2,width:e.offsetWidth/2,height:e.offsetHeight/2,originX:"center",originY:"center",objectCaching:!1});s.add(a),a.getElement().play(),console.log(a,a.getElement()),n["fabric"].util.requestAnimFrame((function t(){s.renderAll(),n["fabric"].util.requestAnimFrame(t)}))}},mounted:function(){var t=this.$refs.localVideo;t.addEventListener("canplay",this.init)}},r=o,c=(i("c954"),i("2877")),l=Object(c["a"])(r,s,a,!1,null,"2bae3898",null);e["default"]=l.exports},4705:function(t,e,i){},c954:function(t,e,i){"use strict";var s=i("4705"),a=i.n(s);a.a}}]);