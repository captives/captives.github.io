(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45e4e985"],{"63ec":function(e,n,a){"use strict";var o=a("7147"),l=a.n(o);l.a},7147:function(e,n,a){},"8ada":function(e,n,a){"use strict";a.r(n);var o=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("el-main",[a("mavon-editor",{staticClass:"fill",attrs:{toolbars:e.toolbars,fontSize:"16px",placeholder:"请输入文本"},on:{change:e.changeHandler,save:e.saveHandler},model:{value:e.value,callback:function(n){e.value=n},expression:"value"}})],1)},l=[],t={name:"VueMarkdownEditor",data:function(){return{value:"# 这是默认值",toolbars:{bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,superscript:!0,subscript:!0,quote:!0,ol:!0,ul:!0,link:!0,imagelink:!0,code:!0,table:!0,fullscreen:!0,readmodel:!0,htmlcode:!0,help:!0,undo:!0,redo:!0,trash:!0,save:!0,navigation:!0,alignleft:!0,aligncenter:!0,alignright:!0,subfield:!0,preview:!0}}},methods:{changeHandler:function(e,n){console.log(e,n)},saveHandler:function(e,n){console.log(e,n),alert("保存内容")}}},r=t,i=(a("63ec"),a("2877")),c=function(e){e.options.__source="src/home/views/VueMarkdownEditor.vue"},s=c,u=Object(i["a"])(r,o,l,!1,null,"16cb5b55",null);"function"===typeof s&&s(u);n["default"]=u.exports}}]);