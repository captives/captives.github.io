(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15446e62"],{"3b5d":function(e,n,t){"use strict";var o=t("d787"),a=t.n(o);a.a},"41b0":function(e,n,t){"use strict";t.r(n);var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"home"},[t("vue-hash-calendar",{attrs:{visible:!0,isShowWeekView:!0,pickerType:"date",scrollChangeDate:!0,isShowArrow:!0,isShowAction:!0,showTodayButton:!0},on:{change:e.calendarChangeHandler},scopedSlots:e._u([{key:"week",fn:function(n){return t("div",{staticClass:"calendar-week"},[e._v(" 周"+e._s(n.week)+" ")])}},{key:"arrow",fn:function(e){return t("div",{staticClass:"calendar-arrow"},[t("van-icon",{attrs:{name:[e.show?"arrow-down":"cross"]}})],1)}}])},[t("div",{staticClass:"font-bold",attrs:{slot:"today"},slot:"today"},[e._v("今天")])]),t("van-button",{on:{click:e.scanQRCodeHandler}},[e._v("扫一扫")])],1)},a=[],r=(t("c975"),t("b0c0"),t("d4ec")),c=t("bee2"),i=t("262e"),s=t("2caf"),u=t("9ab4"),l=t("1b40"),f=window["wx"],d=function(e){Object(i["a"])(t,e);var n=Object(s["a"])(t);function t(){return Object(r["a"])(this,t),n.apply(this,arguments)}return Object(c["a"])(t,[{key:"beforeCreate",value:function(){var e=this;console.log(this.$route),this.$router.afterEach((function(){document.title=e.$route.name||document.title})),console.log(f),f.config({debug:!0,appId:"wx77f5c3c171d2451d",timestamp:Date.now(),nonceStr:"seven",signature:"seven",jsApiList:["scanQRCode"]}),f.checkJsApi({jsApiList:["chooseImage"],success:function(e){console.log(e)}}),f.ready((function(){console.log("----------ready")}))}},{key:"calendarChangeHandler",value:function(e){console.log("time",e.toLocaleString())}},{key:"scanQRCodeHandler",value:function(){f.scanQRCode({desc:"scanQRCode desc",needResult:0,scanType:["qrCode","barCode"],success:function(e){},error:function(e){e.errMsg.indexOf("function_not_exist")>0&&alert("版本过低请升级")}})}}]),t}(l["l"]);d=Object(u["b"])([Object(l["a"])({name:"WeChat"})],d);var b=d,v=b,h=(t("3b5d"),t("2877")),p=function(e){e.options.__source="src/travel/views/WeChat.vue"},w=p,g=Object(h["a"])(v,o,a,!1,null,"dab4f148",null);"function"===typeof w&&w(g);n["default"]=g.exports},a640:function(e,n,t){"use strict";var o=t("d039");e.exports=function(e,n){var t=[][e];return!!t&&o((function(){t.call(null,n||function(){throw 1},1)}))}},ae40:function(e,n,t){var o=t("83ab"),a=t("d039"),r=t("5135"),c=Object.defineProperty,i={},s=function(e){throw e};e.exports=function(e,n){if(r(i,e))return i[e];n||(n={});var t=[][e],u=!!r(n,"ACCESSORS")&&n.ACCESSORS,l=r(n,0)?n[0]:s,f=r(n,1)?n[1]:void 0;return i[e]=!!t&&!a((function(){if(u&&!o)return!0;var e={length:-1};u?c(e,1,{enumerable:!0,get:s}):e[1]=1,t.call(e,l,f)}))}},b0c0:function(e,n,t){var o=t("83ab"),a=t("9bf2").f,r=Function.prototype,c=r.toString,i=/^\s*function ([^ (]*)/,s="name";o&&!(s in r)&&a(r,s,{configurable:!0,get:function(){try{return c.call(this).match(i)[1]}catch(e){return""}}})},bee2:function(e,n,t){"use strict";function o(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function a(e,n,t){return n&&o(e.prototype,n),t&&o(e,t),e}t.d(n,"a",(function(){return a}))},c975:function(e,n,t){"use strict";var o=t("23e7"),a=t("4d64").indexOf,r=t("a640"),c=t("ae40"),i=[].indexOf,s=!!i&&1/[1].indexOf(1,-0)<0,u=r("indexOf"),l=c("indexOf",{ACCESSORS:!0,1:0});o({target:"Array",proto:!0,forced:s||!u||!l},{indexOf:function(e){return s?i.apply(this,arguments)||0:a(this,e,arguments.length>1?arguments[1]:void 0)}})},d787:function(e,n,t){}}]);