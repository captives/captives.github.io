(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5c39df34"],{"24b96":function(e,n,o){"use strict";var t=o("95d9"),l=o.n(t);l.a},"5ff8":function(e,n,o){e.exports=o.p+"assets/img/logo.82b9c7a5.png"},"8a84":function(e,n,o){"use strict";o.r(n);var t=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("el-main",[t("el-row",{staticClass:"content center"},[t("img",{attrs:{alt:"Vue logo",src:o("5ff8")}})]),t("el-row",{staticClass:"content"},[t("h1",{on:{click:function(n){return e.show({title:"vue-code",src:"/components/Code.vue"})}}},[e._v("vue-code")]),t("p",[e._v("组件及样式引入")]),t("vue-code",[t("pre",{attrs:{lang:"javascript"}},[e._v("import '@/assets/css/code-style.css';\nimport Code from './../components/Code.vue'\nVue.component('vue-code', Code);\n")])]),t("p",[e._v("or")]),t("vue-code",[t("pre",{attrs:{lang:"javascript"}},[e._v("global.js\nimport './assets/css/code-style.css';\nimport Code from './components/Code';\nexport default {\n    install(Vue) {\n        Vue.component('vue-code', Code);\n    }\n}\n\nmain.js\nimport global from './../plugins/global';\nVue.use(global);\n")])]),t("p",[e._v("组件使用")]),t("vue-code",[t("pre",{attrs:{lang:"html"}},[e._v('<vue-code>\n  <p>sh</p>\n  <pre lang="sh">ping localhost</pre>\n</vue-code>\n')])]),t("vue-code",[t("pre",{attrs:{lang:"css"}},[e._v(".el-aside {\n  .el-menu {\n    height: 100%;\n  }\n}\n\n.el-container {\n  .el-breadcrumb {\n    margin-left: 20px;\n    line-height: 45px;\n  }\n}\n")])]),t("vue-code",[t("p",[e._v("console")]),t("pre",{attrs:{lang:"console"}},[e._v("ping localhost")])]),t("vue-code",[t("p",[e._v("bash")]),t("pre",{attrs:{lang:"bash"}},[e._v("ping localhost")])]),t("vue-code",[t("p",[e._v("sh")]),t("pre",{attrs:{lang:"sh"}},[e._v("ping localhost")])]),t("vue-code",[t("p",[e._v("cmd")]),t("pre",{attrs:{lang:"cmd"}},[e._v("ping localhost")])])],1),t("el-row",{staticClass:"content"},[t("h1",{on:{click:function(n){return e.show({title:"vue-source",src:"/components/Source.vue"})}}},[e._v("vue-source")]),t("p",[e._v("组件引入")]),t("vue-code",[t("pre",{attrs:{lang:"javascript"}},[e._v("import Source from './../components/Source';\nVue.component('vue-source', Source);\n")])]),t("p",[e._v("组件使用")]),t("vue-code",[t("pre",{attrs:{lang:"html"}},[e._v('<vue-source src="/plugins/global.js" lang="javascript"></vue-source>\n')])])],1),t("el-row",{staticClass:"content"},[t("h1",{on:{click:function(n){return e.show({title:"url-input",src:"/components/URLInput.vue"})}}},[e._v("url-input")]),t("p",[e._v("HTML")]),t("vue-code",[t("pre",{attrs:{lang:"html"}},[e._v('<url-input v-model="url" :list="$videoList"></url-input> \n<video  :src="url" controls muted loop autoplay></video>\n')])]),e._v("JavasSript部分 "),t("vue-code",[t("pre",{attrs:{lang:"javascript"}},[e._v('data() {\n  return {\n    url: "",\n    list: [\n          { label: "Parkour 720P MP4", value: "/medias/parkour_720P.mp4" },\n          { label: "Parkour 720P WEBM", value: "/medias/parkour_720P.webm" },\n          { label: "Parkour 1080P MP4", value: "/medias/parkour_1080P.mp4" },\n          { label: "Parkour 1080P WEBM", value: "/medias/parkour_1080P.webm" },\n          \n          { label: "Piper 720P", value: "/medias/Piper_720P.mp4" },\n          { label: "Piper 1080P", value: "/medias/Piper_1080P.mp4" },\n\n          { label: "睡眠钢琴音乐", value: "/medias/Relaxing Piano Music.mp4" },\n          { label: "汽车 绿幕视频", value: "/medias/green-screen-car.mp4" },\n      ];\n  }\n}\n')])])],1),t("el-dialog",{attrs:{title:e.dialog.title,visible:e.dialog.visible},on:{"update:visible":function(n){return e.$set(e.dialog,"visible",n)},closed:function(n){e.dialog.src=null}}},[e.dialog.src?t("vue-source",{attrs:{src:e.dialog.src}}):t("span",[e._v("暂无数据")])],1)],1)},l=[],s={name:"Home",data:function(){return{dialog:{title:null,visible:!1,src:null}}},methods:{show:function(e){this.dialog.title=e.title,this.dialog.src=e.src,this.dialog.visible=!0}}},a=s,r=(o("24b96"),o("2877")),c=Object(r["a"])(a,t,l,!1,null,"07839e54",null);n["default"]=c.exports},"95d9":function(e,n,o){}}]);