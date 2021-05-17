(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2266f8"],{e93a:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h2",[e._v("Prop")]),r("vue-code",[r("pre",{attrs:{lang:"js"}},[e._v("@Prop(options: ( Constructor | Constructor[] | PropOptions ) = {}) decorator ")])]),r("h3",[e._v("示例：")]),r("vue-code",[r("pre",{attrs:{lang:"js"}},[e._v("import { Vue, Component, Prop } from 'vue-property-decorator'\n \n@Component({ name: 'VueItem' })\nexport default class VueItem extends Vue {\n  @Prop(Number) readonly propA: number | undefined\n  @Prop([String, Boolean]) readonly propC: string | boolean | undefined\n  @Prop({ default: 'default value' }) readonly propB!: string\n}")])]),r("p",[e._v("等同于")]),r("vue-code",[r("pre",{attrs:{lang:"js"}},[e._v("export default {\n  name: \"VueItem\",\n  props: {\n    propA: {\n      type: Number,\n    },\n    propB: {\n      default: 'default value',\n    },\n    propC: {\n      type: [String, Boolean],\n    },\n  },\n} ")])]),r("h3",[e._v("例子1 ：")]),r("VuePropItem",{attrs:{propA:e.propA,propC:e.propC}},[r("el-button",{attrs:{type:"primary"},on:{click:e.changeHandler}},[e._v("更改值")]),r("p",[e._v("组件外面值更改，组件内部值跟着更新； 单向更新")])],1),e._m(0),r("VuePropModelItem",{model:{value:e.title,callback:function(t){e.title=t},expression:"title"}}),r("div",[r("span",[e._v("组件外："+e._s(e.title))]),r("el-button",{attrs:{type:"success"},on:{click:function(t){e.title="默认值"}}},[e._v("恢复值")])],1)],1)},n=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h3",[e._v("例子2: "),r("em",[e._v("v-model")])])}],a=r("d4ec"),p=r("bee2"),u=r("262e"),c=r("2caf"),l=r("9ab4"),s=r("1b40"),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-alert",{attrs:{type:"success",closable:!1}},[e._v(e._s(e.propA)+" - 数据类型 - "+e._s(typeof e.propA))]),r("el-alert",{attrs:{title:e.propB,type:"warning",closable:!1}}),r("el-alert",{attrs:{type:"success",closable:!1}},[e._v(e._s(e.propC)+" - 数据类型 - "+e._s(typeof e.propC)+" ")]),e._t("default")],2)},v=[],d=(r("a9e3"),function(e){Object(u["a"])(r,e);var t=Object(c["a"])(r);function r(){return Object(a["a"])(this,r),t.apply(this,arguments)}return r}(s["l"]));Object(l["a"])([Object(s["f"])(Number)],d.prototype,"propA",void 0),Object(l["a"])([Object(s["f"])({default:"default value"})],d.prototype,"propB",void 0),Object(l["a"])([Object(s["f"])([String,Boolean])],d.prototype,"propC",void 0),d=Object(l["a"])([Object(s["a"])({name:"VuePropItem"})],d);var f=d,b=f,_=r("2877"),m=function(e){e.options.__source="src/tutorial/views/vue-property-decorator/prop/VuePropItem.vue"},y=m,j=Object(_["a"])(b,i,v,!1,null,null,null);"function"===typeof y&&y(j);var O=j.exports,h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-alert",{attrs:{type:"success",closable:!1}},[e._v("组件内部："+e._s(e.value))]),r("el-button",{attrs:{type:"primary"},on:{click:e.changeHandler}},[e._v("内部更新值")])],1)},P=[],g=function(e){Object(u["a"])(r,e);var t=Object(c["a"])(r);function r(){return Object(a["a"])(this,r),t.apply(this,arguments)}return Object(p["a"])(r,[{key:"changeHandler",value:function(){this.$emit("input",Date.now().toLocaleString())}}]),r}(s["l"]);Object(l["a"])([Object(s["f"])({type:String,default:"-"})],g.prototype,"value",void 0),g=Object(l["a"])([Object(s["a"])({name:"VuePropItem"})],g);var V=g,w=V,C=function(e){e.options.__source="src/tutorial/views/vue-property-decorator/prop/VuePropModelItem.vue"},I=C,A=Object(_["a"])(w,h,P,!1,null,null,null);"function"===typeof I&&I(A);var k=A.exports,x=function(e){Object(u["a"])(r,e);var t=Object(c["a"])(r);function r(){var e;return Object(a["a"])(this,r),e=t.apply(this,arguments),e.propA=Date.now(),e.propC="文本A",e.title=null,e}return Object(p["a"])(r,[{key:"changeHandler",value:function(){this.propA=Date.now(),this.propC=["这是文本",!0][Math.round(10*Math.random())%2]}}]),r}(s["l"]);x=Object(l["a"])([Object(s["a"])({name:"VueProp",components:{VuePropItem:O,VuePropModelItem:k}})],x);var B=x,M=B,S=function(e){e.options.__source="src/tutorial/views/vue-property-decorator/prop/index.vue"},$=S,E=Object(_["a"])(M,o,n,!1,null,"1228f125",null);"function"===typeof $&&$(E);t["default"]=E.exports}}]);