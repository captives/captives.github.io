(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ab5602e"],{"03cc":function(n,e,t){},"041e":function(n,e,t){"use strict";t("d3b7");var c="/canvas";e["a"]={path:c,name:"Canvas",component:function(){return t.e("chunk-d8f17236").then(t.bind(null,"33ea"))},redirect:c+"/index",children:[{path:c+"/index",name:"Canvas API",icon:"el-icon-printer",component:function(){return t.e("chunk-7b555418").then(t.bind(null,"9bbc"))}},{path:c+"/video",name:"视频绘图",icon:"el-icon-printer",component:function(){return t.e("chunk-46a2a15c").then(t.bind(null,"c38b"))}},{path:c+"/video-split",name:"视频画面分屏",icon:"el-icon-printer",component:function(){return t.e("chunk-2b4e36fe").then(t.bind(null,"bef4"))}},{path:c+"/video-splicing",name:"视频画面拼接",icon:"el-icon-printer",component:function(){return t.e("chunk-c5e8b2c4").then(t.bind(null,"8e11"))}},{path:c+"/video-green-screen",name:"视频画面绿屏抠图",icon:"el-icon-printer",component:function(){return t.e("chunk-af4121aa").then(t.bind(null,"e675"))}},{path:c+"/video-split-copy",name:"视频画面分割拷贝",icon:"el-icon-printer",component:function(){return t.e("chunk-19b8ff56").then(t.bind(null,"0229"))}},{path:c+"/base",name:"fabric 基础",icon:"el-icon-printer",component:function(){return Promise.all([t.e("chunk-6e83591c"),t.e("chunk-295dc0e6"),t.e("chunk-5307b0cc")]).then(t.bind(null,"e324"))}},{path:c+"/drawboard",name:"fabric 画板",icon:"el-icon-printer",component:function(){return Promise.all([t.e("chunk-6e83591c"),t.e("chunk-295dc0e6"),t.e("chunk-b94e6452")]).then(t.bind(null,"8c75"))}},{path:c+"/video-for-fabric",name:"视频绘图fabric",icon:"el-icon-printer",component:function(){return Promise.all([t.e("chunk-6e83591c"),t.e("chunk-295dc0e6"),t.e("chunk-d323f044")]).then(t.bind(null,"5d85"))}}]}},"06ef":function(n,e,t){"use strict";t("d3b7");var c="/notes";e["a"]={path:c,name:"记事本",component:function(){return t.e("chunk-4dda77aa").then(t.bind(null,"59a8"))},redirect:c+"/index",children:[{path:c+"/index",name:"记事本 知识点",component:function(){return t.e("chunk-a556d86c").then(t.bind(null,"ce29"))}}]}},"1f3f":function(n,e,t){"use strict";t("d3b7");e["a"]={path:"/tools",name:"工具箱",component:function(){return t.e("chunk-150d3cb4").then(t.bind(null,"1270"))},redirect:"/tools/dashboard",children:[{path:"/tools/dashboard",name:"DashBoard",component:function(){return t.e("chunk-bb9c9b02").then(t.bind(null,"f0cd"))}},{path:"/tools/qr-code",name:"QR Code",component:function(){return t.e("chunk-2d0e508b").then(t.bind(null,"9383"))}},{path:"/tools/element",name:"element UI",component:function(){return t.e("chunk-578340ab").then(t.bind(null,"4663"))}},{path:"/tools/vetree",name:"element Tree",component:function(){return t.e("chunk-25e16376").then(t.bind(null,"3703"))}},{path:"/tools/ruler",name:"Ruler",component:function(){return t.e("chunk-843a4cfa").then(t.bind(null,"bad9"))}},{path:"/tools/drop",name:"拖放",component:function(){return t.e("chunk-781db158").then(t.bind(null,"70d3"))}},{path:"/tools/console",name:"控制台输出",component:function(){return t.e("chunk-2d22ccf1").then(t.bind(null,"f58d"))}},{path:"/tools/url-format",name:"URL编解码",component:function(){return t.e("chunk-206e01ac").then(t.bind(null,"9024"))}},{path:"/tools/vue-mixins",name:"VueMixins",component:function(){return t.e("chunk-2d0d63ed").then(t.bind(null,"7273"))}}]}},"258c":function(n,e,t){"use strict";t.r(e);var c=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("el-main",[t("el-header",[t("el-menu",{attrs:{mode:"horizontal","text-color":"#fff","active-text-color":"#ffd04b","background-color":"#545c64",collapse:n.isCollapse,"default-active":n.selectActive},on:{select:n.navSelectHandler}},[t("el-menu-item",{attrs:{index:"/index.html"}},[t("span",{staticClass:"nav-menu-logo"},[n._v("logo")])]),n._l(n.list,(function(e){return[e.children?t("el-submenu",{key:e.path,attrs:{index:e.path}},[t("template",{slot:"title"},[e.icon?t("i",{class:e.icon}):n._e(),t("span",{attrs:{slot:"title"},slot:"title"},[n._v(n._s(e.name))])]),n._l(e.children,(function(e){return[e.children?t("el-submenu",{key:e.path,attrs:{index:e.path}},[t("template",{slot:"title"},[n._v(n._s(e.name))]),n._l(e.children,(function(e){return t("el-menu-item",{key:e.path,attrs:{index:e.path}},[n._v(n._s(e.name))])}))],2):t("el-menu-item",{key:e.path,attrs:{index:e.path}},[n._v(n._s(e.name))])]}))],2):t("el-menu-item",{key:e.path,attrs:{index:e.path}},[n._v(n._s(e.name))])]}))],2)],1),t("el-row",{attrs:{gutter:50}},[t("el-col",{attrs:{span:12}},[t("el-tree",{attrs:{data:n.list,props:{label:"name"}},on:{"node-click":n.handleNodeClick}})],1),t("el-col",{attrs:{span:12}},[t("el-cascader",{attrs:{options:n.list,props:{label:"name",value:"path"}},on:{change:n.handleChange},model:{value:n.selectActive,callback:function(e){n.selectActive=e},expression:"selectActive"}})],1)],1)],1)},o=[],a=(t("c975"),t("d4ec")),u=t("bee2"),i=t("262e"),r=t("2caf"),l=t("9ab4"),h=t("60a3"),d=t("d7ac"),m=t("4b34"),p=t("7da6"),s=t("89d2"),b=t("c4eb");console.log(s["a"].options,b["a"].options);var f=[{name:"首页",path:"/index.html",children:d["a"].options.routes},{path:"/live.html",name:"会议室",children:m["a"].options.routes},{name:"指南",path:"/guide.html",children:s["a"].options.routes},{name:"教程",path:"/main.html",children:b["a"].options.routes},{path:"/sprite/index.html",name:"雪碧图"},{path:"/charts.html",name:"图表",children:p["a"].options.routes}],k=f,v=t("4cc3"),x=function(n){Object(i["a"])(t,n);var e=Object(r["a"])(t);function t(){var n;return Object(a["a"])(this,t),n=e.apply(this,arguments),n.isCollapse=!1,n.selectActive="",n.list=k,n}return Object(u["a"])(t,[{key:"handleNodeClick",value:function(n){}},{key:"handleChange",value:function(n){}},{key:"searchPath",value:function(){var n=window.location.hash.substr(1,window.location.hash.length);this.selectActive=n||this.list[0].path}},{key:"navSelectHandler",value:function(n,e,t){console.log("nav",n,e,t);e[0];-1!=n.indexOf(".")?window.location.href=n:window.location.href=e[0]+"#"+n}}]),t}(h["f"]);x=Object(l["a"])([Object(h["a"])({name:"WebSite",components:{NavMenu:v["a"]}})],x);var w=x,g=w,y=(t("f295"),t("2877")),C=Object(y["a"])(g,c,o,!1,null,"79d3481a",null);e["default"]=C.exports},"440a":function(n,e,t){"use strict";t("d3b7");var c="/openvidu";e["a"]={path:c,name:"OpenVidu",component:function(){return t.e("chunk-ea6619d0").then(t.bind(null,"c4ac"))},redirect:c+"/index",children:[{path:c+"/index",name:"OpenVidu 知识点",icon:"el-icon-menu",component:function(){return t.e("chunk-2d0b16dd").then(t.bind(null,"208a"))}},{path:c+"/hello",name:"Hello World",icon:"el-icon-menu",component:function(){return Promise.all([t.e("chunk-cfae8e68"),t.e("chunk-73d53b71")]).then(t.bind(null,"9821"))}},{path:c+"/avcall",name:"Audio Video Call",icon:"el-icon-menu",component:function(){return Promise.all([t.e("chunk-cfae8e68"),t.e("chunk-222c6411")]).then(t.bind(null,"dc79"))}}]}},"4b34":function(n,e,t){"use strict";t("d3b7");var c=t("2b0e"),o=t("8c4f");c["default"].use(o["a"]);var a=[{path:"/",name:"登入",component:function(){return t.e("chunk-71a35f82").then(t.bind(null,"630a"))}},{path:"/one",name:"一对一",component:function(){return t.e("chunk-d2f5d200").then(t.bind(null,"b9b8"))}},{path:"/many",name:"一对多",component:function(){return t.e("chunk-d2f5d200").then(t.bind(null,"b9b8"))}},{path:"/live",name:"直播",component:function(){return t.e("chunk-d2f5d200").then(t.bind(null,"b9b8"))}},{path:"/desc",name:"说明",component:function(){return t.e("chunk-d2f5d200").then(t.bind(null,"b9b8"))}}],u=new o["a"]({base:"",routes:a});e["a"]=u},5405:function(n,e,t){"use strict";t("d3b7");e["a"]={path:"/e-charts",name:"Echarts",component:function(){return t.e("chunk-304dd51f").then(t.bind(null,"514e"))},redirect:"/e-charts/index",children:[{path:"/e-charts/index",name:"索引",component:function(){return t.e("chunk-2d0b6c6f").then(t.bind(null,"1f37"))}},{path:"/e-charts/chart1",name:"环形图",component:function(){return t.e("chunk-a4b04dc0").then(t.bind(null,"c457"))}},{path:"/e-charts/chart2",name:"柱状图",component:function(){return t.e("chunk-4048b36e").then(t.bind(null,"844d"))}},{path:"/e-charts/chart3",name:"仪表盘",component:function(){return t.e("chunk-3cd9b74a").then(t.bind(null,"4f32"))}},{path:"/e-charts/chart4",name:"饼图",component:function(){return t.e("chunk-4b6d54c9").then(t.bind(null,"b6db"))}},{path:"/e-charts/chart5",name:"CPU/内存消耗图",component:function(){return t.e("chunk-154fdec2").then(t.bind(null,"93d07"))}},{path:"/e-charts/chart6",name:"饼状图",component:function(){return t.e("chunk-f8b00cee").then(t.bind(null,"75b0"))}},{path:"/e-charts/chart7",name:"饼图/环形合成图",component:function(){return t.e("chunk-3a9fe600").then(t.bind(null,"9d9c"))}},{path:"/e-charts/chart8",name:"矩形树图",component:function(){return t.e("chunk-2d0c5224").then(t.bind(null,"3e95"))}},{path:"/e-charts/chart9",name:"倒金字塔图",component:function(){return t.e("chunk-4fac2c36").then(t.bind(null,"3edb"))}},{path:"/e-charts/chart10",name:"汽车仪表盘",component:function(){return t.e("chunk-78d35915").then(t.bind(null,"5d7f"))}},{path:"/e-charts/chart11",name:"汽车仪表盘2",component:function(){return t.e("chunk-416ae04a").then(t.bind(null,"62d9"))}},{path:"/e-charts/chart12",name:"线图和饼图",component:function(){return t.e("chunk-2d0cedc1").then(t.bind(null,"60f7"))}},{path:"/e-charts/chart13",name:"柱状图（数组）",component:function(){return t.e("chunk-2d215c41").then(t.bind(null,"c031"))}},{path:"/e-charts/chart14",name:"柱状图（对象）",component:function(){return t.e("chunk-2d0b8ddd").then(t.bind(null,"3109"))}},{path:"/e-charts/chart15",name:"柱状图叠加",component:function(){return t.e("chunk-2d216769").then(t.bind(null,"c325"))}},{path:"/e-charts/chart16",name:"折线图堆叠",component:function(){return t.e("chunk-df1e3ba8").then(t.bind(null,"f098"))}},{path:"/e-charts/chart18",name:"折线面积图",component:function(){return t.e("chunk-63dcc4bc").then(t.bind(null,"db38"))}},{path:"/e-charts/chart17",name:"CPU消耗图",component:function(){return t.e("chunk-00063d10").then(t.bind(null,"d587"))}},{path:"/e-charts/airroutemap1",name:"模拟迁徙 1",component:function(){return Promise.all([t.e("chunk-2f1736f6"),t.e("chunk-b270c1dc"),t.e("chunk-2d213157")]).then(t.bind(null,"aabc"))}},{path:"/e-charts/airroutemap2",name:"模拟迁徙 2",component:function(){return Promise.all([t.e("chunk-2f1736f6"),t.e("chunk-b270c1dc"),t.e("chunk-2d0a3ce7")]).then(t.bind(null,"046c"))}},{path:"/e-charts/world-economy",name:"世界经济",component:function(){return Promise.all([t.e("chunk-2f1736f6"),t.e("chunk-2d216f58"),t.e("chunk-3973d7a2")]).then(t.bind(null,"2679"))}},{path:"/e-charts/world-money",name:"全球数字货币交易",component:function(){return Promise.all([t.e("chunk-2f1736f6"),t.e("chunk-2d216f58"),t.e("chunk-53b556b0")]).then(t.bind(null,"b6d5"))}}]}},"7da6":function(n,e,t){"use strict";t("d3b7");var c=t("2b0e"),o=t("8c4f"),a=function(){var n=this,e=n.$createElement;n._self._c;return n._m(0)},u=[function(){var n=this,e=n.$createElement,c=n._self._c||e;return c("div",{staticClass:"center"},[c("img",{attrs:{alt:"Vue logo",src:t("910c")}})])}],i={name:"home",components:{}},r=i,l=t("2877"),h=Object(l["a"])(r,a,u,!1,null,null,null),d=h.exports,m=t("5405");c["default"].use(o["a"]);var p=[{path:"/",name:"快速入门",component:d},{path:"/about",name:"About",component:function(){return t.e("chunk-20271e5a").then(t.bind(null,"c98a"))}},m["a"]],s=new o["a"]({base:"",routes:p});e["a"]=s},"81e2":function(n,e,t){"use strict";t("d3b7");var c="/webrtc";e["a"]={path:c+"",name:"WebRTC",component:function(){return t.e("chunk-87d2a1b2").then(t.bind(null,"44d6"))},redirect:c+"/index",children:[{path:c+"/index",name:"WebRTC 知识点",icon:"el-icon-s-flag",component:function(){return t.e("chunk-3ac5c5ed").then(t.bind(null,"c65d"))}},{path:c+"/list",name:"用户设备列表",icon:"el-icon-notebook-2",component:function(){return t.e("chunk-2d0bd1ca").then(t.bind(null,"2b37"))}},{path:c+"/stream-from-usermedia",name:"视频流来自用户设备",icon:"el-icon-camera",component:function(){return t.e("chunk-15acd5bd").then(t.bind(null,"e253"))}},{path:c+"/dynamic-selection-usermedia",name:"动态选择用户设备",icon:"el-icon-orange",component:function(){return t.e("chunk-371c54ca").then(t.bind(null,"c64e"))}},{path:c+"/stream-from-displaymedia",name:"视频流来自显示设备",icon:"el-icon-monitor",component:function(){return t.e("chunk-027967ed").then(t.bind(null,"3fdd"))}},{path:c+"/stream-from-video",name:"视频流来自Video",icon:"el-icon-film",component:function(){return t.e("chunk-51967054").then(t.bind(null,"bbaf"))}},{path:c+"/stream-from-canvas",name:"视频流来自Canvas",icon:"el-icon-picture-outline",component:function(){return t.e("chunk-7cc4f4ae").then(t.bind(null,"8986"))}},{path:c+"/audiooutput",name:"音频输出到指定设备",icon:"el-icon-headset",component:function(){return t.e("chunk-4ba8f438").then(t.bind(null,"0a22"))}},{path:c+"/visualizer",name:"媒体流可视化",icon:"el-icon-data-line",component:function(){return t.e("chunk-d5be35bc").then(t.bind(null,"e6f2"))}},{path:c+"/audio-volume",name:"媒体流音量测算",icon:"el-icon-odometer",component:function(){return t.e("chunk-f01980a6").then(t.bind(null,"0ffd"))}},{path:c+"/mixer",name:"媒体流混音",icon:"el-icon-set-up",component:function(){return Promise.all([t.e("chunk-5497c013"),t.e("chunk-14150400")]).then(t.bind(null,"ae7f"))}},{path:c+"/pc",name:"对等连接",icon:"el-icon-connection",component:function(){return t.e("chunk-5299bc02").then(t.bind(null,"7406"))}},{path:c+"/remote",name:"对等连接传输流",icon:"el-icon-money",component:function(){return t.e("chunk-328cd144").then(t.bind(null,"25ec"))}},{path:c+"/recorder",name:"用户设备流录制",icon:"el-icon-video-camera",component:function(){return Promise.all([t.e("chunk-5497c013"),t.e("chunk-1734245b")]).then(t.bind(null,"8ce7"))}},{path:c+"/display-media-recorder",name:"显示设备录制流",icon:"el-icon-video-camera-solid",component:function(){return Promise.all([t.e("chunk-5497c013"),t.e("chunk-18023a96")]).then(t.bind(null,"bc2c"))}}]}},"89d2":function(n,e,t){"use strict";t.d(e,"b",(function(){return h}));t("d3b7");var c=t("2b0e"),o=t("8c4f"),a=t("ff26"),u=t("041e"),i=t("81e2"),r=t("440a"),l=t("06ef");c["default"].use(o["a"]);var h=[{path:"/",name:"组件说明",component:function(){return t.e("chunk-3b5a469a").then(t.bind(null,"1897"))}},a["a"],u["a"],i["a"],r["a"],l["a"],{path:"/live.html",name:"会议室",redirect:"/live.html"},{path:"/about",name:"处理中心",component:function(){return t.e("chunk-0c2390da").then(t.bind(null,"ae00"))}},{path:"/VideoMixing",name:"视频混音",component:function(){return t.e("chunk-5c905b7a").then(t.bind(null,"61db"))}}],d=o["a"].prototype.push;o["a"].prototype.push=function(n){return d.call(this,n)["catch"]((function(n){return n}))};var m=new o["a"]({base:"",routes:h});e["a"]=m},"910c":function(n,e,t){n.exports=t.p+"assets/img/logo.82b9c7a5.png"},baa5:function(n,e,t){var c=t("23e7"),o=t("e58c");c({target:"Array",proto:!0,forced:o!==[].lastIndexOf},{lastIndexOf:o})},d7ac:function(n,e,t){"use strict";t("baa5"),t("b0c0"),t("d3b7");var c=t("2b0e"),o=t("8c4f"),a=t("1f3f");c["default"].use(o["a"]);var u=[{path:"/",name:"首页",component:function(){return t.e("chunk-1e720385").then(t.bind(null,"cb6de"))}},{path:"/favorite",name:"收藏夹",component:function(){return t.e("chunk-f9c7dcd2").then(t.bind(null,"03c4"))}},a["a"]],i=o["a"].prototype.push;o["a"].prototype.push=function(n){return i.call(this,n)["catch"]((function(n){return n}))};var r=new o["a"]({base:"",routes:u});r.beforeEach((function(n,e,t){-1!=n.path.lastIndexOf(".html")?window.location.href=n.path:(document.title=n.name,t())})),e["a"]=r},e58c:function(n,e,t){"use strict";var c=t("fc6a"),o=t("a691"),a=t("50c4"),u=t("a640"),i=t("ae40"),r=Math.min,l=[].lastIndexOf,h=!!l&&1/[1].lastIndexOf(1,-0)<0,d=u("lastIndexOf"),m=i("indexOf",{ACCESSORS:!0,1:0}),p=h||!d||!m;n.exports=p?function(n){if(h)return l.apply(this,arguments)||0;var e=c(this),t=a(e.length),u=t-1;for(arguments.length>1&&(u=r(u,o(arguments[1]))),u<0&&(u=t+u);u>=0;u--)if(u in e&&e[u]===n)return u||0;return-1}:l},f295:function(n,e,t){"use strict";var c=t("03cc"),o=t.n(c);o.a},ff26:function(n,e,t){"use strict";t("d3b7");var c="/web";e["a"]={path:c,name:"HTML5 Web",component:function(){return t.e("chunk-51026e86").then(t.bind(null,"852a"))},redirect:c+"/index",children:[{path:c+"/index",name:"HTML5 知识点",icon:"el-icon-s-flag",component:function(){return t.e("chunk-39e3c520").then(t.bind(null,"6a2f"))}},{path:c+"/video-js",name:"VideoJs",icon:"el-icon-notebook-2",component:function(){return Promise.all([t.e("chunk-6e83591c"),t.e("chunk-cdd7733c")]).then(t.bind(null,"2b32"))}},{path:c+"/xgvideo",name:"西瓜视频",icon:"el-icon-notebook-2",component:function(){return t.e("chunk-2a4b8335").then(t.bind(null,"abde"))}},{path:c+"/audio-lrc",name:"简单LRC播放器",icon:"el-icon-notebook-2",component:function(){return t.e("chunk-3b1ad57b").then(t.bind(null,"d047"))}},{path:c+"/media-source",name:"Media Source",icon:"el-icon-notebook-2",component:function(){return Promise.all([t.e("chunk-5497c013"),t.e("chunk-0182115e")]).then(t.bind(null,"4b8b3"))}},{path:c+"/html-to-canvas",name:"html2canvas",icon:"el-icon-notebook-2",component:function(){return t.e("chunk-7676219b").then(t.bind(null,"3dee"))}},{path:c+"/cropperjs",name:"Cropperjs",icon:"el-icon-notebook-2",component:function(){return t.e("chunk-58cae112").then(t.bind(null,"eaaf"))}},{path:c+"/vue-cropper",name:"Vue Cropper",icon:"el-icon-notebook-2",component:function(){return Promise.all([t.e("chunk-5497c013"),t.e("chunk-453f737d")]).then(t.bind(null,"581c"))}},{path:c+"/pdf-js",name:"PDF 在线阅读器",icon:"el-icon-notebook-2",component:function(){return Promise.all([t.e("chunk-6e83591c"),t.e("chunk-4ec556ae")]).then(t.bind(null,"e31f"))}},{path:c+"/websql",name:"Web SQL",icon:"el-icon-notebook-2",component:function(){return t.e("chunk-7c12f145").then(t.bind(null,"442e"))}},{path:c+"/vue-apollo-client",name:'Vue Apollo Client"',icon:"el-icon-notebook-2",component:function(){return t.e("chunk-2d0b9b9a").then(t.bind(null,"33bf"))}},{path:c+"/math-jax",name:"MathJax",icon:"el-icon-notebook-2",component:function(){return t.e("chunk-13c46b5e").then(t.bind(null,"431b"))}},{path:c+"/vue-scroller",name:"无限滚动",icon:"el-icon-notebook-2",component:function(){return t.e("chunk-810afa44").then(t.bind(null,"7794"))}}]}}}]);