(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d96dc89e"],{"03c4":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-main",[n("el-tabs",{attrs:{type:"card"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"常用",name:"/"}},[n("el-button",{attrs:{type:"primary"},on:{click:t.openColorPickerHandler}},[t._v("色卡")]),n("ColorRGBToHex",{staticStyle:{width:"45%"}},[n("p",{attrs:{slot:"footer"},slot:"footer"})])],1),t._l(t.data,(function(e,r){return n("el-tab-pane",{key:r,attrs:{label:r,name:r}},[n("el-row",{staticClass:"list",attrs:{gutter:20}},t._l(e,(function(e){return n("el-col",{key:e.title,attrs:{xs:12,sm:8,md:6,lg:6,span:4}},[n("el-card",[n("div",{attrs:{slot:"header"},slot:"header"},[n("a",{staticClass:"header",attrs:{href:e.href}},[t._v(t._s(e.title))])]),n("p",{staticClass:"desc"},[t._v(t._s(e.desc))]),e.about&&e.about.length>0?n("ul",{staticClass:"news"},t._l(e.about,(function(e){return n("li",{key:e.label},[n("a",{attrs:{href:e.value,title:e.alt}},[t._v(t._s(e.label))])])})),0):t._e()])],1)})),1)],1)})),n("el-tab-pane",{attrs:{label:"自定义指令",name:"/demo"}},[n("el-checkbox",{model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[t._v("闪屏")]),n("VueCode",{directives:[{name:"splash",rawName:"v-splash:[visible].fullscreen",value:t.loadingText,expression:"loadingText",arg:t.visible,modifiers:{fullscreen:!0}}]},[n("ColorRGBToHex",{staticStyle:{width:"45%"}}),n("div",[t._v("这是第二个元素")])],1)],1)],2)],1)},a=[],o=n("1b8e"),l=n("d1e8"),s={name:"Favorite",components:{ColorRGBToHex:o["a"],VueCode:l["a"]},data:function(){return{data:{},activeName:"",error:null,visible:!1,loadingText:""}},created:function(){var t=this;this.$fetch("/assets/data/favorite.json").then((function(e){console.log(e),t.data=JSON.parse(e),t.activeName="/"})).catch((function(e){t.error="数据加载失败"})),setInterval((function(){t.loadingText=(new Date).toLocaleString()}),1e3)},methods:{openColorPickerHandler:function(){window.open("/pdfview/index.html?file=/assets/color-card.pdf")}}},i=s,c=(n("8f55"),n("2877")),u=function(t){t.options.__source="src/home/views/Favorite.vue"},f=u,m=Object(c["a"])(i,r,a,!1,null,"8af5c0d4",null);"function"===typeof f&&f(m);e["default"]=m.exports},"1b8e":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-card",{staticClass:"box-card"},[n("div",{style:{color:t.value},attrs:{slot:"header"},slot:"header"},[t._t("default",[n("span",[t._v("颜色转换：RGB转16进制")])])],2),n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"40px"}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"R"}},[n("el-input-number",{attrs:{min:0,max:255},model:{value:t.form.R,callback:function(e){t.$set(t.form,"R",e)},expression:"form.R"}})],1)],1),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"G"}},[n("el-input-number",{attrs:{min:0,max:255},model:{value:t.form.G,callback:function(e){t.$set(t.form,"G",e)},expression:"form.G"}})],1)],1),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"B"}},[n("el-input-number",{attrs:{min:0,max:255},model:{value:t.form.B,callback:function(e){t.$set(t.form,"B",e)},expression:"form.B"}})],1)],1),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"RGB"}},[n("el-input",{model:{value:t.rgb,callback:function(e){t.rgb=e},expression:"rgb"}})],1)],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"Hex"}},[n("el-input",{attrs:{value:t.value}})],1)],1),n("el-col",{attrs:{span:6}},[n("el-form-item",{attrs:{label:"Hex"}},[n("el-input",{attrs:{value:t.hex}})],1)],1)],1)],1),t._t("footer",[n("vue-code",[n("pre",{attrs:{lang:"js"}},[t._v(t._s(t.rgb2hex))])])])],2)},a=[],o=(n("a15b"),n("a9e3"),n("d3b7"),n("ac1f"),n("25f0"),n("5319"),n("1276"),n("498a"),n("d1a0")),l={name:"ColorRGBToHex",data:function(){return{form:{R:0,G:0,B:0}}},computed:{rgb2hex:function(){return o["b"].toString()},rgb:{set:function(t){var e=t.split(",");e.length<3&&(e=[0,0,0]),this.form.R=Number(e[0].toString().trim())||0,this.form.G=Number(e[1].toString().trim())||0,this.form.B=Number(e[2].toString().trim())||0},get:function(){return[this.form.R,this.form.G,this.form.B].join(", ")}},value:function(){return Object(o["b"])("RGB("+this.rgb+")").toUpperCase()},hex:function(){return this.value.replace("#","0x")}}},s=l,i=n("2877"),c=function(t){t.options.__source="src/components/ColorRGBToHex.vue"},u=c,f=Object(i["a"])(s,r,a,!1,null,null,null);"function"===typeof u&&u(f);e["a"]=f.exports},"25f0":function(t,e,n){"use strict";var r=n("6eeb"),a=n("825a"),o=n("d039"),l=n("ad6d"),s="toString",i=RegExp.prototype,c=i[s],u=o((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),f=c.name!=s;(u||f)&&r(RegExp.prototype,s,(function(){var t=a(this),e=String(t.source),n=t.flags,r=String(void 0===n&&t instanceof RegExp&&!("flags"in i)?l.call(t):n);return"/"+e+"/"+r}),{unsafe:!0})},"498a":function(t,e,n){"use strict";var r=n("23e7"),a=n("58a8").trim,o=n("c8d2");r({target:"String",proto:!0,forced:o("trim")},{trim:function(){return a(this)}})},"8f55":function(t,e,n){"use strict";var r=n("d50f"),a=n.n(r);a.a},"90f6":function(t,e,n){"use strict";var r=n("f247"),a=n.n(r);a.a},c8d2:function(t,e,n){var r=n("d039"),a=n("5899"),o="​᠎";t.exports=function(t){return r((function(){return!!a[t]()||o[t]()!=o||a[t].name!==t}))}},d1a0:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return a}));n("99af"),n("fb6a"),n("a9e3"),n("d3b7"),n("e25e"),n("ac1f"),n("25f0"),n("5319"),n("1276");var r=function(t){var e=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;if(/^(rgb|RGB)/.test(t)){for(var n=t.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(","),r="#",a=0;a<n.length;a++){var o=Number(n[a]).toString(16);o.length<2&&(o="0"+o),r+=o}return 7!==r.length&&(r=t),r}if(e.test(t)){var l=t.replace(/#/,"").split("");if(6===l.length)return t;if(3===l.length){var s="#";for(a=0;a<l.length;a+=1)s+=l[a]+l[a];return s}}return t},a=function(t){var e=t.toLowerCase(),n=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;if(e&&n.test(e)){if(4===e.length){for(var r="#",a=1;a<4;a+=1)r+=e.slice(a,a+1).concat(e.slice(a,a+1));e=r}var o=[];for(a=1;a<7;a+=2)o.push(parseInt("0x"+e.slice(a,a+2)));return o}return e}},d1e8:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"code-button",class:{mask:t.show},on:{mouseenter:t.mouseEnterHandler,mouseleave:t.mouseLeaveHandler}},[t._t("default"),t.show?n("el-button",{attrs:{type:"text"},on:{click:t.openHandler}},[t._v("<code/>")]):t._e(),n("el-dialog",{attrs:{title:"",visible:t.visible,width:"50%","append-to-body":!0},on:{"update:visible":function(e){t.visible=e}}},[n("h3",[t._v("显示slot内容")]),n("vue-code",[n("pre",{attrs:{lang:"html"}},[t._v(t._s(t.html))])])],1)],2)},a=[],o=(n("4160"),n("159b"),n("1cf6")),l={name:"VueCode",data:function(){return{show:!1,visible:!1,html:""}},methods:{mouseEnterHandler:function(){this.show=!0},mouseLeaveHandler:function(){this.show=!1},openHandler:function(){console.log("Code",JSON.stringify(o["a"])),console.log("this",this),this.visible=!0,this.$slots.default.forEach((function(t){t.componentInstance&&console.warn("----\x3e file ",t["__file"])})),this.html=this.$slots.default[0].componentInstance.$el,console.log(this.html),console.log("打开",this.$slots.default)}},mounted:function(){var t=this.$parent.$el;t.style.position="relative"}},s=l,i=(n("90f6"),n("2877")),c=function(t){t.options.__source="src/components/VueCode.vue"},u=c,f=Object(i["a"])(s,r,a,!1,null,"3b78119b",null);"function"===typeof u&&u(f);e["a"]=f.exports},d50f:function(t,e,n){},f247:function(t,e,n){}}]);