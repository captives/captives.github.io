(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-901d423c"],{"1dde":function(e,t,s){var n=s("d039"),i=s("b622"),o=s("2d00"),r=i("species");e.exports=function(e){return o>=51||!n((function(){var t=[],s=t.constructor={};return s[r]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"4de4":function(e,t,s){"use strict";var n=s("23e7"),i=s("b727").filter,o=s("1dde"),r=s("ae40"),a=o("filter"),c=r("filter");n({target:"Array",proto:!0,forced:!a||!c},{filter:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},"545e":function(e,t,s){},"7e12":function(e,t,s){var n=s("da84"),i=s("58a8").trim,o=s("5899"),r=n.parseFloat,a=1/r(o+"-0")!==-1/0;e.exports=a?function(e){var t=i(String(e)),s=r(t);return 0===s&&"-"==t.charAt(0)?-0:s}:r},8418:function(e,t,s){"use strict";var n=s("c04e"),i=s("9bf2"),o=s("5c6c");e.exports=function(e,t,s){var r=n(t);r in e?i.f(e,r,o(0,s)):e[r]=s}},"99af":function(e,t,s){"use strict";var n=s("23e7"),i=s("d039"),o=s("e8b5"),r=s("861d"),a=s("7b0b"),c=s("50c4"),l=s("8418"),u=s("65f0"),d=s("1dde"),h=s("b622"),f=s("2d00"),g=h("isConcatSpreadable"),p=9007199254740991,v="Maximum allowed index exceeded",w=f>=51||!i((function(){var e=[];return e[g]=!1,e.concat()[0]!==e})),m=d("concat"),b=function(e){if(!r(e))return!1;var t=e[g];return void 0!==t?!!t:o(e)},k=!w||!m;n({target:"Array",proto:!0,forced:k},{concat:function(e){var t,s,n,i,o,r=a(this),d=u(r,0),h=0;for(t=-1,n=arguments.length;t<n;t++)if(o=-1===t?r:arguments[t],b(o)){if(i=c(o.length),h+i>p)throw TypeError(v);for(s=0;s<i;s++,h++)s in o&&l(d,h,o[s])}else{if(h>=p)throw TypeError(v);l(d,h++,o)}return d.length=h,d}})},a15b:function(e,t,s){"use strict";var n=s("23e7"),i=s("44ad"),o=s("fc6a"),r=s("a640"),a=[].join,c=i!=Object,l=r("join",",");n({target:"Array",proto:!0,forced:c||!l},{join:function(e){return a.call(o(this),void 0===e?",":e)}})},acd8:function(e,t,s){var n=s("23e7"),i=s("7e12");n({global:!0,forced:parseFloat!=i},{parseFloat:i})},b40e:function(e,t,s){"use strict";s.r(t),s.d(t,"browserAstrict",(function(){return f}));var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-container",{staticClass:"fill",attrs:{direction:"vertical"}},[e.visible?e._e():s("el-button",{staticStyle:{position:"fixed",right:"10px",top:"0","z-index":"5"},attrs:{type:"text"},on:{click:function(t){return e.toggleHeaderHandler(!0)}}},[e._v("开启")]),s("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"header",class:e.titleClass},[s("el-button",{staticStyle:{float:"right"},attrs:{type:"text"},on:{click:function(t){return e.toggleHeaderHandler(!1)}}},[e._v("关闭")])],1),s("el-container",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[s("router-view")],1)],1)},i=[],o=(s("99af"),s("4de4"),s("7db0"),s("c975"),s("a15b"),s("d81d"),s("a9e3"),s("d4ec")),r=s("bee2"),a=s("262e"),c=s("2caf"),l=s("9ab4"),u=s("1b40"),d=s("f6a7"),h=(s("d3b7"),s("acd8"),s("ac1f"),s("25f0"),s("466d"),s("5319"),function(){function e(){Object(o["a"])(this,e),this.ua=navigator.userAgent.toLowerCase()||""}return Object(r["a"])(e,[{key:"testUa",value:function(e){return e.test(this.ua)}},{key:"testVs",value:function(e){return this.ua.match(e).toString().replace(/[^0-9|_.]/g,"").replace(/_/g,".")}},{key:"system",value:function(){var e="";return this.testUa(/windows|win32|win64|wow32|wow64/g)?e="windows":this.testUa(/macintosh|macintel/g)?e="macos":this.testUa(/x11/g)?e="linux":this.testUa(/android|adr/g)?e="android":this.testUa(/ios|iphone|ipad|ipod|iwatch/g)&&(e="ios"),e}},{key:"systemVs",value:function(){var e=this.system(),t="";return"windows"===e?this.testUa(/windows nt 5.0|windows 2000/g)?t="2000":this.testUa(/windows nt 5.1|windows xp/g)?t="xp":this.testUa(/windows nt 5.2|windows 2003/g)?t="2003":this.testUa(/windows nt 6.0|windows vista/g)?t="vista":this.testUa(/windows nt 6.1|windows 7/g)?t="7":this.testUa(/windows nt 6.2|windows 8/g)?t="8":this.testUa(/windows nt 6.3|windows 8.1/g)?t="8.1":this.testUa(/windows nt 10.0|windows 10/g)&&(t="10"):"macos"===e?t=this.testVs(/os x [\d._]+/g):"android"===e?t=this.testVs(/android [\d._]+/g):"ios"===e&&(t=this.testVs(/os [\d._]+/g)),t}},{key:"platform",value:function(){var e=this.system(),t="";return"windows"===e||"macos"===e||"linux"===e?t="desktop":("android"===e||"ios"===e||this.testUa(/mobile/g))&&(t="mobile"),t}},{key:"engine",value:function(){var e="";return this.testUa(/applewebkit/g)?e="webkit":this.testUa(/gecko/g)&&this.testUa(/firefox/g)?e="gecko":this.testUa(/presto/g)?e="presto":this.testUa(/trident|compatible|msie/g)&&(e="trident"),e}},{key:"engineVs",value:function(){var e=this.engine(),t="";return"webkit"===e?t=this.testVs(/applewebkit\/[\d._]+/g):"gecko"===e?t=this.testVs(/gecko\/[\d._]+/g):"presto"===e?t=this.testVs(/presto\/[\d._]+/g):"trident"===e&&(t=this.testVs(/trident\/[\d._]+/g)),t}},{key:"supporter",value:function(){var e="";return this.testUa(/applewebkit/g)?this.testUa(/edge/g)?e="edge":this.testUa(/opr/g)?e="opera":this.testUa(/chrome/g)?e="chrome":this.testUa(/safari/g)&&(e="safari"):this.testUa(/gecko/g)&&this.testUa(/firefox/g)?e="firefox":this.testUa(/presto/g)?e="opera":this.testUa(/trident|compatible|msie/g)&&(e="iexplore"),e}},{key:"supporterVs",value:function(){var e=this.supporter(),t="";return"chrome"===e?t=this.testVs(/chrome\/[\d._]+/g):"safari"===e?t=this.testVs(/version\/[\d._]+/g):"firefox"===e?t=this.testVs(/firefox\/[\d._]+/g):"opera"===e?t=this.testVs(/opr\/[\d._]+/g):"iexplore"===e?t=this.testVs(/(msie [\d._]+)|(rv:[\d._]+)/g):"edge"===e&&(t=this.testVs(/edge\/[\d._]+/g)),t}},{key:"shell",value:function(){var e="";return this.testUa(/micromessenger/g)?e="wechat":this.testUa(/qqbrowser/g)?e="qq":this.testUa(/ucbrowser/g)?e="uc":this.testUa(/qihu 360se/g)?e="360":this.testUa(/2345explorer/g)?e="2345":this.testUa(/metasr/g)?e="sougou":this.testUa(/lbbrowser/g)?e="liebao":this.testUa(/maxthon/g)&&(e="maxthon"),e}},{key:"shellVs",value:function(){var e="";return this.testUa(/micromessenger/g)?e=this.testVs(/micromessenger\/[\d._]+/g):this.testUa(/qqbrowser/g)?e=this.testVs(/qqbrowser\/[\d._]+/g):this.testUa(/ucbrowser/g)?e=this.testVs(/ucbrowser\/[\d._]+/g):this.testUa(/2345explorer/g)?e=this.testVs(/2345explorer\/[\d._]+/g):this.testUa(/metasr/g)||this.testUa(/maxthon/g)&&(e=this.testVs(/maxthon\/[\d._]+/g)),e}},{key:"compareVersion",value:function(e,t){return e===t||parseFloat(e)===parseFloat(t)?0:parseFloat(e)>parseFloat(t)?1:2}},{key:"browserType",value:function(){return{system:this.system(),systemVs:this.systemVs(),platform:this.platform(),engine:this.engine(),engineVs:this.engineVs(),supporter:this.supporter(),supporterVs:this.supporterVs(),shell:this.shell(),shellVs:this.shellVs()}}}]),e}()),f=[{os:"windows",name:"chrome",version:58,ignore:[]},{os:"windows",name:"firefox",version:56,ignore:[]},{os:"windows",name:"opera",version:45,ignore:[]},{os:"macos",name:"chrome",version:58,ignore:[88]},{os:"macos",name:"firefox",version:56,ignore:[]},{os:"macos",name:"opera",version:45,ignore:[]}],g=(new h).browserType(),p=function(e){Object(a["a"])(s,e);var t=Object(c["a"])(s);function s(){var e;return Object(o["a"])(this,s),e=t.apply(this,arguments),e.visible=!0,e.titleClass="",e.loading=!1,e.browser=null,e}return Object(r["a"])(s,[{key:"created",value:function(){var e=this;this.$router.onReady((function(t,s){e.titleClass=t.path.indexOf("login")>=0?"login":"",console.log("$router.onReady",t)})),this.$router.beforeEach((function(t,s,n){e.loading=!0,console.log("$router.beforeEach",t),setTimeout((function(){return n()}),2e3)})),this.$router.afterEach((function(t,s){e.titleClass=t.path.indexOf("login")>=0?"login":"",e.loading=!1,console.log("$router.afterEach")}));var t=this.checkBrowser(),s=t.code||0;console.log("浏览器检查",t),2==s||this.$confirm(t.desc||"",{confirmButtonText:"去下载",cancelButtonText:"继续进入",center:!0,dangerouslyUseHTMLString:!0,iconClass:"icon_warning",closeOnClickModal:!1,closeOnPressEscape:!1,closeOnHashChange:!1,showCancelButton:s>=0,cancelButtonClass:"el-button--warning",showClose:!1}).then((function(){window.open(Object({NODE_ENV:"production",VUE_APP_LABEL:"online",BASE_URL:""}).VUE_APP_BROWSER_DOWNPAGE,"_self")})).catch((function(){}))}},{key:"beforeRouteEnter",value:function(e,t,s){console.log("进入路由"),s()}},{key:"beforeRouteUpdate",value:function(e,t,s){console.log("路由改变")}},{key:"beforeRouteLeave",value:function(e,t,s){console.log("路由离开")}},{key:"toggleHeaderHandler",value:function(e){this.visible=e,setTimeout((function(){return window.dispatchEvent(new Event("resize"))}),20)}},{key:"checkBrowser",value:function(){document.title="checking....";var e=Number(g.supporterVs.substr(0,g.supporterVs.indexOf("."))),t=f.find((function(e){return e.name==g.supporter&&e.os==g.system})),s='<p class="el-link">您当前使用的是 '.concat(g.supporter," ").concat(e," 浏览器</p>");if(!t){var n=f.filter((function(e){return e.os==g.system})),i={name:g.supporter,os:g.system,code:-1,version:0,ignore:[],desc:'<p class="el-link el-link--danger">您当前使用的是 '.concat(g.supporter," ").concat(e," 浏览器, 暂不支持!</p> <p>请使用以下浏览器: ")};return n.length?(i.desc+=n.map((function(e){return e.name+": "+e.version})).join("、"),i.desc+="</p>"):(i.code=-2,i.desc='<p class="el-link el-link--danger">当前的系统和浏览器均不支持上课！</p>'),i}if(e<t.version)t.code=0,t.desc=s+'<p class="el-link el-link--warning">浏览器版本较低, 建议您升级到最新版本</p>';else{var o=t.ignore.indexOf(e);t.code=o>=0?1:2,o>=0&&(t.desc=s+'<p class="el-link el-link--warning">兼容性较差, 建议您升级到最新版本</p>')}return t}}]),s}(u["l"]);p=Object(l["a"])([Object(u["a"])({name:"Main",components:{Splash:d["a"]}})],p);var v=p,w=v,m=(s("e621"),s("2877")),b=function(e){e.options.__source="src/live/Main.vue"},k=b,x=Object(m["a"])(w,n,i,!1,null,"2d1bba31",null);"function"===typeof k&&k(x);t["default"]=x.exports},d81d:function(e,t,s){"use strict";var n=s("23e7"),i=s("b727").map,o=s("1dde"),r=s("ae40"),a=o("map"),c=r("map");n({target:"Array",proto:!0,forced:!a||!c},{map:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},e621:function(e,t,s){"use strict";var n=s("545e"),i=s.n(n);i.a},f6a7:function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("transition",{attrs:{name:"el-loading-fade"},on:{"after-leave":e.handleAfterLeave}},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.visible,expression:"visible"}],staticClass:"el-loading-mask",class:[e.customClass,{"is-fullscreen":e.fullscreen}],style:{backgroundColor:e.background||""}},[s("div",{staticClass:"el-loading-spinner"},[e.spinner?s("i",{class:e.spinner}):s("svg",{staticClass:"circular",attrs:{viewBox:"25 25 50 50"}},[s("circle",{staticClass:"path",attrs:{cx:"50",cy:"50",r:"20",fill:"none"}})]),e.text?s("p",{staticClass:"el-loading-text"},[e._v(e._s(e.text))]):e._e()])])])},i=[],o={name:"loading",data:function(){return{text:"loading....",spinner:null,background:null,fullscreen:!0,visible:!0,customClass:""}},methods:{handleAfterLeave:function(){this.$emit("after-leave")},setText:function(e){this.text=e}}},r=o,a=s("2877"),c=function(e){e.options.__source="src/components/Splash.vue"},l=c,u=Object(a["a"])(r,n,i,!1,null,null,null);"function"===typeof l&&l(u);t["a"]=u.exports}}]);