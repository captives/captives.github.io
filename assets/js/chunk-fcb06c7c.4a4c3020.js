(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fcb06c7c"],{"7ec7":function(e,t,r){},bee2:function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}r.d(t,"a",(function(){return a}))},c9e0:function(e,t,r){"use strict";var n=r("7ec7"),a=r.n(n);a.a},faff:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-container",[r("el-aside",{attrs:{width:"414px"}},[r("iframe",{ref:"iframe",attrs:{src:e.url,frameborder:"0"}})]),r("el-main",[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.refreshHandler}},[e._v("刷新")])],1)],1)},a=[],c=r("d4ec"),i=r("bee2"),u=r("262e"),o=r("2caf"),f=r("9ab4"),l=r("1b40"),s=function(e){Object(u["a"])(r,e);var t=Object(o["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.url="",e}return Object(i["a"])(r,[{key:"created",value:function(){var e=this;this.$router.onReady((function(){var t=e.$route.query;e.url=t.url||"/travel.html"}))}},{key:"refreshHandler",value:function(){this.iframe.src=this.url+"?v="+Date.now()}}]),r}(l["l"]);Object(f["b"])([Object(l["j"])()],s.prototype,"iframe",void 0),s=Object(f["b"])([Object(l["a"])({name:"View"})],s);var b=s,v=b,p=(r("c9e0"),r("2877")),d=function(e){e.options.__source="src/tutorial/views/View.vue"},h=d,m=Object(p["a"])(v,n,a,!1,null,"57914952",null);"function"===typeof h&&h(m);t["default"]=m.exports}}]);