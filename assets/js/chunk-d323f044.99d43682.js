(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d323f044"],{"5d85":function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-main",{staticClass:"center"},[i("el-row",{attrs:{gutter:50}},[i("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[i("el-divider",{attrs:{"content-position":"left"}},[e._v("Video")]),i("video",{ref:"localVideo",staticClass:"video-item",attrs:{controls:"",muted:"",loop:""},domProps:{muted:!0}},[i("source",{attrs:{src:"/medias/demo.mp4"}}),i("source",{attrs:{src:"/medias/musicdemo.mp4"}})])],1),i("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[i("el-divider",{attrs:{"content-position":"left"}},[e._v("Canvas")]),i("canvas",{ref:"draw",staticClass:"video-item"})],1)],1),i("vue-source",{attrs:{src:"guide/views/canvas/DrawVideoForFabric.vue",lang:"html"}})],1)},a=[],r=i("7a94"),n={name:"DrawVideo",data:function(){return{canvas:null}},methods:{init:function(e){var t=this.$refs.localVideo,i=this.$refs.draw;i.setAttribute("width",i.parentNode.offsetWidth-100),i.setAttribute("height",i.parentNode.offsetHeight);var s=new r["fabric"].Canvas(i);console.log("video element",t,i.parentNode);var a=new r["fabric"].Image(t,{left:t.offsetWidth/2,top:t.offsetHeight/2,width:t.offsetWidth/2,height:t.offsetHeight/2,originX:"center",originY:"center",objectCaching:!1});s.add(a),a.getElement().play(),console.log(a,a.getElement()),r["fabric"].util.requestAnimFrame((function e(){s.renderAll(),r["fabric"].util.requestAnimFrame(e)}))}},mounted:function(){var e=this.$refs.localVideo;e.addEventListener("canplay",this.init)}},o=n,c=(i("6d9f"),i("2877")),d=Object(c["a"])(o,s,a,!1,null,"eee862ea",null);t["default"]=d.exports},"6d9f":function(e,t,i){"use strict";var s=i("77ea"),a=i.n(s);a.a},"77ea":function(e,t,i){}}]);