(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-127194ea"],{"4bb5":function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var o=n("2fe1"),c=n("2f62"),i=f("computed",c["e"]),r=f("computed",c["c"]),a=f("methods",c["b"]),u=f("methods",c["d"]);function s(e,t){function n(t){function n(n,o){if("string"===typeof o){var c=o,i=n;return t(c,{namespace:e})(i,c)}var r=n,a=b(o||{},{namespace:e});return t(r,a)}return n}return t?(console.warn("[vuex-class] passing the 2nd argument to `namespace` function is deprecated. pass only namespace string instead."),n(t)):{State:n(i),Getter:n(r),Mutation:n(u),Action:n(a)}}function f(e,t){function n(n,c){return Object(o["a"])((function(o,i){o[e]||(o[e]={});var r,a=(r={},r[i]=n,r);o[e][i]=void 0!==c?t(c,a)[i]:t(a)[i]}))}function c(e,t){if("string"===typeof t){var o=t,c=e;return n(o,void 0)(c,o)}var i=d(t),r=e;return n(r,i)}return c}function d(e){var t=e&&e.namespace;if("string"===typeof t)return"/"!==t[t.length-1]?t+"/":t}function b(e,t){var n={};return[e,t].forEach((function(e){Object.keys(e).forEach((function(t){n[t]=e[t]}))})),n}},"995b":function(e,t,n){"use strict";var o=n("fc46"),c=n.n(o);c.a},d8c6:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{style:e.domStyle},[e._v("公共会议室")])},c=[],i=n("d4ec"),r=n("bee2"),a=n("262e"),u=n("2caf"),s=n("9ab4"),f=n("1b40"),d=n("4bb5"),b=Object(d["a"])("RoomStore"),p=function(e){Object(a["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(i["a"])(this,n),t.apply(this,arguments)}return Object(r["a"])(n,[{key:"mounted",value:function(){this.onResize({element:this.$el}),window.addEventListener("resize",this.onResize.bind(this,{element:this.$el}),!1)}}]),n}(f["l"]);Object(s["a"])([b.Getter("domStyle")],p.prototype,"domStyle",void 0),Object(s["a"])([b.Action("onResize")],p.prototype,"onResize",void 0),p=Object(s["a"])([Object(f["a"])({name:"PublicRoom"})],p);var l=p,v=l,m=(n("995b"),n("2877")),h=function(e){e.options.__source="src/live/views/PublicRoom.vue"},y=h,j=Object(m["a"])(v,o,c,!1,null,"378de03a",null);"function"===typeof y&&y(j);t["default"]=j.exports},fc46:function(e,t,n){}}]);