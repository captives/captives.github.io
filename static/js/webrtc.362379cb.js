(function(e){function n(n){for(var c,a,r=n[0],l=n[1],i=n[2],d=0,f=[];d<r.length;d++)a=r[d],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&f.push(u[a][0]),u[a]=0;for(c in l)Object.prototype.hasOwnProperty.call(l,c)&&(e[c]=l[c]);h&&h(n);while(f.length)f.shift()();return o.push.apply(o,i||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],c=!0,a=1;a<t.length;a++){var r=t[a];0!==u[r]&&(c=!1)}c&&(o.splice(n--,1),e=l(l.s=t[0]))}return e}var c={},a={webrtc:0},u={webrtc:0},o=[];function r(e){return l.p+"static/js/"+({about:"about"}[e]||e)+"."+{about:"0edaa92d","chunk-0285db23":"341bea5b","chunk-05e7be5d":"9bf3034b","chunk-16581870":"4344c17c","chunk-1b03998e":"10f17c79","chunk-2d0ba378":"cdf07d16","chunk-fde9daca":"1485e170","chunk-207a754c":"eb37152f","chunk-2d0a4f51":"fe9af338","chunk-2d0ac99d":"33bf48e1","chunk-2f0becdf":"56050b51","chunk-37b4c0d6":"885bfb39","chunk-3d092478":"aaddbf70","chunk-3e5e4f19":"283107e8","chunk-4296ea04":"fad00d82","chunk-49af3bdf":"a0fe659f","chunk-51125ce8":"aedf601d","chunk-58861f31":"428f8a3e","chunk-3fbaa306":"f6d2fbb0","chunk-7e169ff0":"4f121ada","chunk-dfde0e20":"a58b2555","chunk-e1c57566":"d5726960","chunk-5d3fc4ae":"7a39359d","chunk-69239300":"b9a73d3c","chunk-6e8ba660":"56c1e580","chunk-73c50a64":"08ca715b","chunk-9910b34e":"ea6b03c7","chunk-bb083876":"3af49384","chunk-299a2abb":"475abd97","chunk-74c86014":"7fccb899","chunk-be7663f0":"f50c6ee1","chunk-d4011cce":"2f0de127","chunk-d810e28a":"59860450","chunk-dcef90c2":"8fa48738","chunk-ddf632c6":"62b335ba","chunk-e5b79804":"9ed7a93a","chunk-eb2a33fa":"e903db5f","chunk-efeecd9a":"ff667e68","chunk-fcfd8310":"a32a516e"}[e]+".js"}function l(n){if(c[n])return c[n].exports;var t=c[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.e=function(e){var n=[],t={about:1,"chunk-0285db23":1,"chunk-05e7be5d":1,"chunk-16581870":1,"chunk-fde9daca":1,"chunk-207a754c":1,"chunk-2f0becdf":1,"chunk-37b4c0d6":1,"chunk-3d092478":1,"chunk-3e5e4f19":1,"chunk-4296ea04":1,"chunk-49af3bdf":1,"chunk-51125ce8":1,"chunk-3fbaa306":1,"chunk-7e169ff0":1,"chunk-dfde0e20":1,"chunk-e1c57566":1,"chunk-5d3fc4ae":1,"chunk-69239300":1,"chunk-6e8ba660":1,"chunk-73c50a64":1,"chunk-9910b34e":1,"chunk-299a2abb":1,"chunk-74c86014":1,"chunk-be7663f0":1,"chunk-d4011cce":1,"chunk-d810e28a":1,"chunk-dcef90c2":1,"chunk-ddf632c6":1,"chunk-e5b79804":1,"chunk-eb2a33fa":1,"chunk-efeecd9a":1,"chunk-fcfd8310":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var c="static/css/"+({about:"about"}[e]||e)+"."+{about:"aef9ae7c","chunk-0285db23":"3481d5ff","chunk-05e7be5d":"a945585f","chunk-16581870":"2f59327c","chunk-1b03998e":"31d6cfe0","chunk-2d0ba378":"31d6cfe0","chunk-fde9daca":"9aa9c46d","chunk-207a754c":"7912d12f","chunk-2d0a4f51":"31d6cfe0","chunk-2d0ac99d":"31d6cfe0","chunk-2f0becdf":"9dfcdef7","chunk-37b4c0d6":"b40ce987","chunk-3d092478":"963fbba0","chunk-3e5e4f19":"3515f10e","chunk-4296ea04":"eade333b","chunk-49af3bdf":"2a5417fe","chunk-51125ce8":"1272ae16","chunk-58861f31":"31d6cfe0","chunk-3fbaa306":"77cdc3f9","chunk-7e169ff0":"f8a3d70b","chunk-dfde0e20":"a0dfa674","chunk-e1c57566":"3aa00038","chunk-5d3fc4ae":"49f44c41","chunk-69239300":"ac611781","chunk-6e8ba660":"8bc6e35b","chunk-73c50a64":"fc3e8039","chunk-9910b34e":"4f736b26","chunk-bb083876":"31d6cfe0","chunk-299a2abb":"c6202a55","chunk-74c86014":"a47ffe03","chunk-be7663f0":"2f55b648","chunk-d4011cce":"45233137","chunk-d810e28a":"cf24e1e6","chunk-dcef90c2":"a4b8f196","chunk-ddf632c6":"4166e2a1","chunk-e5b79804":"9d3c3c52","chunk-eb2a33fa":"ca07a591","chunk-efeecd9a":"e51be293","chunk-fcfd8310":"8520c945"}[e]+".css",u=l.p+c,o=document.getElementsByTagName("link"),r=0;r<o.length;r++){var i=o[r],d=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(d===c||d===u))return n()}var f=document.getElementsByTagName("style");for(r=0;r<f.length;r++){i=f[r],d=i.getAttribute("data-href");if(d===c||d===u)return n()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=n,h.onerror=function(n){var c=n&&n.target&&n.target.src||u,o=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=c,delete a[e],h.parentNode.removeChild(h),t(o)},h.href=u;var s=document.getElementsByTagName("head")[0];s.appendChild(h)})).then((function(){a[e]=0})));var c=u[e];if(0!==c)if(c)n.push(c[2]);else{var o=new Promise((function(n,t){c=u[e]=[n,t]}));n.push(c[2]=o);var i,d=document.createElement("script");d.charset="utf-8",d.timeout=120,l.nc&&d.setAttribute("nonce",l.nc),d.src=r(e);var f=new Error;i=function(n){d.onerror=d.onload=null,clearTimeout(h);var t=u[e];if(0!==t){if(t){var c=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;f.message="Loading chunk "+e+" failed.\n("+c+": "+a+")",f.name="ChunkLoadError",f.type=c,f.request=a,t[1](f)}u[e]=void 0}};var h=setTimeout((function(){i({type:"timeout",target:d})}),12e4);d.onerror=d.onload=i,document.head.appendChild(d)}return Promise.all(n)},l.m=e,l.c=c,l.d=function(e,n,t){l.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,n){if(1&n&&(e=l(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var c in e)l.d(t,c,function(n){return e[n]}.bind(null,c));return t},l.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(n,"a",n),n},l.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},l.p="",l.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],d=i.push.bind(i);i.push=n,i=i.slice();for(var f=0;f<i.length;f++)n(i[f]);var h=d;o.push([3,"chunk-vendors"]),t()})({3:function(e,n,t){e.exports=t("cb58")},3300:function(e,n,t){},4665:function(e,n,t){},"70ff":function(e,n,t){},"7b69":function(e,n,t){},"80d6":function(e,n,t){},"89a6":function(e,n,t){"use strict";var c=t("4665"),a=t.n(c);a.a},"89f5":function(e,n,t){"use strict";var c=t("70ff"),a=t.n(c);a.a},bad8:function(e,n,t){},be35:function(e,n,t){"use strict";var c=t("df90"),a=t.n(c);a.a},cb58:function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var c=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("el-container",{staticClass:"fill",attrs:{id:"app"}},[t("el-header",[t("el-menu",{attrs:{router:!0,mode:"horizontal","background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"},on:{select:e.navChangeHandler}},[t("el-menu-item",{attrs:{index:"0",disabled:""}}),e._l(e.list,(function(n,c){return t("el-menu-item",{key:c,attrs:{index:"h"+(c+1),route:n.to}},[t("i",{class:n.icon}),e._v(" "+e._s(n.label)+" ")])}))],2)],1),t("el-container",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[t("router-view")],1)],1)},u=[],o={name:"",data:function(){return{loading:!1,index:"h1",list:[{label:"Home",to:"/",logo:"./assets/logo.png"},{label:"HTML5 Web",to:"/web",logo:null},{label:"Canvas",to:"/canvas",logo:null},{label:"WebRTC",to:"/webrtc",logo:null},{label:"OpenVidu",to:"/openvidu",logo:null},{label:"图表",to:"/charts.html",logo:null},{label:"处理中心",to:"/about",logo:null}]}},methods:{navChangeHandler:function(e,n){}},created:function(){var e=this;this.$router.beforeEach((function(n,t,c){e.loading=!0,c()})),this.$router.afterEach((function(){e.loading=!1}))}},r=o,l=(t("89f5"),t("2877")),i=Object(l["a"])(r,a,u,!1,null,"1d5e6934",null),d=i.exports,f=(t("baa5"),t("b0c0"),t("d3b7"),t("8c4f"));c["default"].use(f["a"]);var h=[{path:"/",name:"Home",component:function(){return t.e("chunk-9910b34e").then(t.bind(null,"8a84"))}},{path:"/canvas",name:"Canvas",component:function(){return t.e("chunk-efeecd9a").then(t.bind(null,"5912"))},redirect:"/canvas/index",children:[{path:"/canvas/index",name:"index",component:function(){return t.e("chunk-16581870").then(t.bind(null,"c4db"))}},{path:"/canvas/base",name:"Base",component:function(){return Promise.all([t.e("chunk-bb083876"),t.e("chunk-74c86014")]).then(t.bind(null,"adc9"))}},{path:"/canvas/video",name:"绘图",component:function(){return t.e("chunk-4296ea04").then(t.bind(null,"6e44"))}},{path:"/canvas/video-split",name:"分屏",component:function(){return t.e("chunk-be7663f0").then(t.bind(null,"3ca9"))}},{path:"/canvas/video-splicing",name:"拼接",component:function(){return t.e("chunk-ddf632c6").then(t.bind(null,"b368"))}},{path:"/canvas/video-green-screen",name:"拼接绿屏幕抠图",component:function(){return t.e("chunk-207a754c").then(t.bind(null,"3087"))}},{path:"/canvas/video-split-copy",name:"分割拷贝",component:function(){return t.e("chunk-69239300").then(t.bind(null,"3398"))}},{path:"/canvas/video-for-fabric",name:"Draw video for fabric",component:function(){return Promise.all([t.e("chunk-bb083876"),t.e("chunk-299a2abb")]).then(t.bind(null,"0c3a"))}}]},{path:"/web",name:"HTML5 Web",component:function(){return t.e("chunk-dcef90c2").then(t.bind(null,"3bc4"))},redirect:"/web/index",children:[{path:"/web/index",name:"HTML5",component:function(){return t.e("chunk-0285db23").then(t.bind(null,"9836"))}},{path:"/web/video-js",name:"VideoJS",component:function(){return t.e("chunk-d4011cce").then(t.bind(null,"bae0"))}},{path:"/web/xgvideo",name:"XGVideo",component:function(){return t.e("chunk-3d092478").then(t.bind(null,"6aba"))}},{path:"/web/audio-lrc",name:"LRC播放器",component:function(){return t.e("chunk-eb2a33fa").then(t.bind(null,"a7ec"))}},{path:"/web/media-source",name:"Media Source",component:function(){return Promise.all([t.e("chunk-58861f31"),t.e("chunk-3fbaa306")]).then(t.bind(null,"0a1b"))}},{path:"/web/html-to-canvas",name:"html2canvas",component:function(){return t.e("chunk-51125ce8").then(t.bind(null,"3301f"))}}]},{path:"/webrtc",name:"webrtc",component:function(){return t.e("chunk-37b4c0d6").then(t.bind(null,"23ee6"))},redirect:"/webrtc/index",children:[{path:"/webrtc/index",name:"WebRTC Tutorials",component:function(){return t.e("chunk-73c50a64").then(t.bind(null,"3462"))}},{path:"/webrtc/list",name:"Enumerate Devices",component:function(){return t.e("chunk-2d0ac99d").then(t.bind(null,"19dc"))}},{path:"/webrtc/stream-from-usermedia",name:"Video Stream from UserMedia",component:function(){return t.e("chunk-2f0becdf").then(t.bind(null,"f228"))}},{path:"/webrtc/stream-from-displaymedia",name:"Video Stream from DisplayMedia",component:function(){return t.e("chunk-6e8ba660").then(t.bind(null,"ab9f"))}},{path:"/webrtc/stream-from-video",name:"Video Stream from video",component:function(){return t.e("chunk-fcfd8310").then(t.bind(null,"048d"))}},{path:"/webrtc/stream-from-canvas",name:"Video Stream from Canvas",component:function(){return t.e("chunk-3e5e4f19").then(t.bind(null,"5cfa"))}},{path:"/webrtc/pc",name:"Peer Connection",component:function(){return t.e("chunk-05e7be5d").then(t.bind(null,"802b"))}},{path:"/webrtc/remote",name:"Audio VideoCall",component:function(){return t.e("chunk-49af3bdf").then(t.bind(null,"3da1"))}},{path:"/webrtc/visualizer",name:"Stream Visualizer",component:function(){return t.e("chunk-e5b79804").then(t.bind(null,"af4b"))}},{path:"/webrtc/mixer",name:"Stream Mixer",component:function(){return Promise.all([t.e("chunk-58861f31"),t.e("chunk-7e169ff0")]).then(t.bind(null,"4ad6"))}},{path:"/webrtc/recorder",name:"Media Recorder",component:function(){return Promise.all([t.e("chunk-58861f31"),t.e("chunk-e1c57566")]).then(t.bind(null,"2201"))}},{path:"/webrtc/display-media-recorder",name:"Display Media Record",component:function(){return Promise.all([t.e("chunk-58861f31"),t.e("chunk-dfde0e20")]).then(t.bind(null,"bc98"))}},{path:"/webrtc/audio-volume",name:"Audio Stream Volume",component:function(){return t.e("chunk-d810e28a").then(t.bind(null,"c638"))}}]},{path:"/openvidu",name:"openvidu",component:function(){return t.e("chunk-5d3fc4ae").then(t.bind(null,"0ad7"))},redirect:"/openvidu/index",children:[{path:"/openvidu/index",name:"OpenVidu Tutorials",component:function(){return t.e("chunk-2d0a4f51").then(t.bind(null,"093e"))}},{path:"/openvidu/hello",name:"Hello World",component:function(){return Promise.all([t.e("chunk-1b03998e"),t.e("chunk-2d0ba378")]).then(t.bind(null,"35ee"))}},{path:"/openvidu/avcall",name:"Audio Video Call",component:function(){return Promise.all([t.e("chunk-1b03998e"),t.e("chunk-fde9daca")]).then(t.bind(null,"40a6"))}}]},{path:"/live",redirect:"/live.html"},{path:"/about",name:"about",component:function(){return t.e("about").then(t.bind(null,"f90d"))}}],s=new f["a"]({base:"",routes:h});s.beforeEach((function(e,n,t){-1!=e.path.lastIndexOf(".html")?window.location.href=e.path:(document.title=e.name,t())}));var b=s,p=(t("80d6"),t("5c96")),m=t.n(p),k=(t("0fae"),t("3eba")),v=(t("07e6"),t("007d"),t("627c"),t("bc3a")),g=t.n(v),w=t("a7fe"),y=t.n(w),x=(t("bad8"),function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{ref:"code",staticClass:"code"},[e._t("default",[e._v("console.log('hello code~')")])],2)}),P=[],_=t("c197"),C=t.n(_),S={name:"Code",props:{language:{type:String,default:"javascrit"}},mounted:function(){var e=this.$refs.code.querySelector("pre");if(e.innerHTML){var n=document.createElement("code");n.innerHTML=e.innerHTML,n.className="language-"+e.getAttribute("lang"),this.$refs.code.replaceChild(n,e)}C.a.highlightAll()}},M=S,E=(t("89a6"),Object(l["a"])(M,x,P,!1,null,"55445279",null)),O=E.exports,L=function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.code?t("el-code",[t("p",[e._v(e._s(e.value))]),t("pre",{attrs:{lang:e.lang}},[e._v(e._s(e.code))])]):e._e()},j=[],H={name:"Source",props:{value:{type:String,default:""},lang:{type:String,default:"html"}},data:function(){return{code:null}},methods:{fetch:function(e){return new Promise((function(n,t){console.log("fetch",e);var c=new XMLHttpRequest;c.open("get",e),c.setRequestHeader("Content-type","text/html"),c.onloadstart=function(){},c.onload=function(){n(c.response)},c.onprogress=function(e){},c.send()}))}},mounted:function(){var e=this;this.fetch(this.value).then((function(n){return e.code=n}))}},T=H,V=(t("be35"),Object(l["a"])(T,L,j,!1,null,"5bfbfba8",null)),$=V.exports,A=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("el-dropdown",{on:{command:e.selecteItem}},[t("span",{staticClass:"el-dropdown-link"},[e._v("Source")]),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.value,(function(n,c){return t("el-dropdown-item",{key:c,attrs:{command:n}},[e._v(e._s(e._f("label")(n.value)))])})),1)],1)},R=[],q=(t("ac1f"),t("1276"),{name:"SourceCode",props:{value:{type:Array,default:function(){return[]}}},filters:{label:function(e){var n=e.split("/");return n[n.length-1]}},methods:{fetch:function(e){return new Promise((function(n,t){console.log("fetch",e);var c=new XMLHttpRequest;c.open("get",e),c.setRequestHeader("Content-type","text/html"),c.onloadstart=function(){},c.onload=function(){n(c.response)},c.onprogress=function(e){},c.send()}))},selecteItem:function(e){var n=this;this.fetch(e.value).then((function(t){n.$set(e,"code",t),n.$emit("input",n.value)}))}}}),N=q,W=(t("fb64"),Object(l["a"])(N,A,R,!1,null,"1ed1dc00",null)),B=W.exports,D=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.text,callback:function(n){e.text=n},expression:"text"}},[t("template",{slot:"prepend"},[e.list.length?t("el-select",{attrs:{placeholder:"请选择视频"},on:{change:e.changeHandler},model:{value:e.selectValue,callback:function(n){e.selectValue=n},expression:"selectValue"}},e._l(e.list,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1):t("span",[e._v("URL：")])],1),t("el-button",{attrs:{slot:"append",icon:"el-icon-s-promotion"},on:{click:e.requestURL},slot:"append"})],2)},U=[],I={name:"URLInput",props:{value:{type:String,default:""},list:{type:Array,default:function(){return[]}}},data:function(){return{text:this.value,selectValue:null}},methods:{changeHandler:function(e){this.text=this.selectValue},requestURL:function(){this.$emit("input",this.text)}},mounted:function(){this.list.length&&(this.text=this.list[0].value,this.selectValue=this.text,this.$emit("input",this.text))}},z=I,J=(t("d763"),Object(l["a"])(z,D,U,!1,null,"54a39894",null)),X=J.exports,F={install:function(e){e.component("el-code",O),e.component("url-input",X),e.component("el-source",$),e.component("source-code",B),e.prototype.$videoList=[{label:"Parkour 720P MP4",value:"/medias/parkour_720P.mp4"},{label:"Parkour 720P WEBM",value:"/medias/parkour_720P.webm"},{label:"Parkour 1080P MP4",value:"/medias/parkour_1080P.mp4"},{label:"Parkour 1080P WEBM",value:"/medias/parkour_1080P.webm"},{label:"Piper 720P",value:"/medias/Piper_720P.mp4"},{label:"Piper 1080P",value:"/medias/Piper_1080P.mp4"},{label:"汽车 绿幕视频",value:"/medias/green-screen-car.mp4"}]}};c["default"].use(m.a),c["default"].prototype.$echarts=k,c["default"].use(y.a,g.a),c["default"].use(F),c["default"].config.productionTip=!1,window.vue=new c["default"]({router:b,render:function(e){return e(d)}}).$mount("#app")},d763:function(e,n,t){"use strict";var c=t("7b69"),a=t.n(c);a.a},df90:function(e,n,t){},fb64:function(e,n,t){"use strict";var c=t("3300"),a=t.n(c);a.a}});