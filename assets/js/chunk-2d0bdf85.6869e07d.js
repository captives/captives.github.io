(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bdf85"],{"2deb":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("Model")]),n("vue-code",[n("pre",{attrs:{lang:"js"}},[e._v("@Model(event?: string, options: ( Constructor | Constructor[] | PropOptions ) = {}) decorator ")])]),n("h3",[e._v("示例：")]),n("vue-code",[n("pre",{attrs:{lang:"js"}},[e._v("import { Vue, Component, Model } from 'vue-property-decorator'\n\n@Component({ name: \"VueItem\" })\nexport default class VueItem extends Vue {\n  @Model('change', { type: Boolean }) readonly checked!: boolean\n}\n            ")])]),n("p",[e._v("等同于")]),n("vue-code",[n("pre",{attrs:{lang:"js"}},[e._v("export default {\n  name: \"VueItem\",\n  model: {\n    prop: 'checked',\n    event: 'change',\n  },\n  props: {\n    checked: {\n      type: Boolean,\n    },\n  },\n}  ")])]),n("h3",[e._v("注意：")]),e._m(0),n("p",[e._v("B：声明组件内不支持默认值")]),n("h3",[e._v(" 例子1：v-on:input 事件")]),n("VueModelItem",{model:{value:e.title,callback:function(t){e.title=t},expression:"title"}}),n("VueModelItem",{model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),n("VueModelItem"),n("h3",[e._v(" 例子2： 其它类型事件")]),n("VueModelItemChange",{attrs:{name:e.name},on:{change:e.changeHandler}}),n("h3",[e._v("例子源码：")]),n("p",[e._v("item.vue")]),n("vue-code",[n("pre",{attrs:{lang:"js"}},[e._v("@Model('change', { type: String, default: \"默认值\" }) private name: string;\n\nprivate updateHandler() {\n    //更改值\n    this.$emit('change', Date.now());\n}")])]),n("p",[e._v("index.vue")]),n("vue-code",[n("pre",{attrs:{lang:"html"}},[e._v('<Item :name="name" @change="val => name = val"></item>')]),n("pre",{attrs:{lang:"js"}},[e._v("private name: string | null = null; ")])])],1)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("A："),n("em",[e._v("v-model")]),e._v("是 "),n("em",[e._v("v-bind:value")]),e._v("和"),n("em",[e._v("v-on:input")]),e._v("的语法糖 ")])}],r=n("d4ec"),l=n("bee2"),c=n("262e"),u=n("2caf"),i=n("9ab4"),s=n("1b40"),v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-alert",{attrs:{type:"success",closable:!1}},[e._v(e._s(e.value)+" "),n("el-button",{attrs:{type:"info",size:"mini"},on:{click:e.updateHandler}},[e._v("更改值")])],1)},p=[],d=function(e){Object(c["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(r["a"])(this,n),t.apply(this,arguments)}return Object(l["a"])(n,[{key:"updateHandler",value:function(){this.$emit("input","更改后 ----\x3e "+Date.now())}}]),n}(s["l"]);Object(i["a"])([Object(s["d"])("input",{type:String,default:"默认值"})],d.prototype,"value",void 0),d=Object(i["a"])([Object(s["a"])({name:"VueModelItem"})],d);var m=d,_=m,f=n("2877"),b=function(e){e.options.__source="src/tutorial/views/vue-property-decorator/model/VueModelItem.vue"},h=b,j=Object(f["a"])(_,v,p,!1,null,null,null);"function"===typeof h&&h(j);var g=j.exports,O=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-alert",{attrs:{type:"success",closable:!1}},[e._v(e._s(e.name)+" "),n("el-button",{attrs:{type:"info",size:"mini"},on:{click:e.updateHandler}},[e._v("更改值")])],1)},y=[],M=function(e){Object(c["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(r["a"])(this,n),t.apply(this,arguments)}return Object(l["a"])(n,[{key:"updateHandler",value:function(){this.$emit("change","更改后 ----\x3e "+Date.now())}}]),n}(s["l"]);Object(i["a"])([Object(s["d"])("change",{type:String,default:"默认值"})],M.prototype,"name",void 0),M=Object(i["a"])([Object(s["a"])({name:"VueModelItemChange"})],M);var V=M,I=V,k=function(e){e.options.__source="src/tutorial/views/vue-property-decorator/model/VueModelItemChange.vue"},w=k,x=Object(f["a"])(I,O,y,!1,null,null,null);"function"===typeof w&&w(x);var C=x.exports,H=function(e){Object(c["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(r["a"])(this,n),e=t.apply(this,arguments),e.title="标题",e.name=null,e}return Object(l["a"])(n,[{key:"changeHandler",value:function(e){console.log("---<",e),this.name=e}}]),n}(s["l"]);H=Object(i["a"])([Object(s["a"])({name:"VueModel",components:{VueModelItem:g,VueModelItemChange:C}})],H);var $=H,E=$,B=function(e){e.options.__source="src/tutorial/views/vue-property-decorator/model/index.vue"},D=B,S=Object(f["a"])(E,a,o,!1,null,"3f6909ca",null);"function"===typeof D&&D(S);t["default"]=S.exports}}]);