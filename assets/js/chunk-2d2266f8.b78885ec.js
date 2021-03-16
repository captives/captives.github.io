(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2266f8"],{e93a:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h2",[e._v("Prop")]),r("vue-code",[r("pre",{attrs:{lang:"js"}},[e._v("@Prop(options: ( Constructor | Constructor[] | PropOptions ) = {}) decorator ")])]),r("h3",[e._v("示例：")]),r("vue-code",[r("pre",{attrs:{lang:"js"}},[e._v("import { Vue, Component, Prop } from 'vue-property-decorator'\n \n@Component({ name: 'VueItem' })\nexport default class VueItem extends Vue {\n  @Prop(Number) readonly propA: number | undefined\n  @Prop([String, Boolean]) readonly propC: string | boolean | undefined\n  @Prop({ default: 'default value' }) readonly propB!: string\n}")])]),r("p",[e._v("等同于")]),r("vue-code",[r("pre",{attrs:{lang:"js"}},[e._v("export default {\n  name: \"VueItem\",\n  props: {\n    propA: {\n      type: Number,\n    },\n    propB: {\n      default: 'default value',\n    },\n    propC: {\n      type: [String, Boolean],\n    },\n  },\n} ")])]),r("h3",[e._v("例子：")]),r("VuePropItem",{attrs:{propA:e.propA,propC:e.propC}},[r("el-button",{attrs:{type:"primary"},on:{click:e.changeHandler}},[e._v("更改值")])],1)],1)},n=[],p=r("d4ec"),a=r("bee2"),u=r("262e"),c=r("2caf"),l=r("9ab4"),s=r("1b40"),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-alert",{attrs:{type:"success",closable:!1}},[e._v(e._s(e.propA)+" - 数据类型 - "+e._s(typeof e.propA))]),r("el-alert",{attrs:{title:e.propB,type:"warning",closable:!1}}),r("el-alert",{attrs:{type:"success",closable:!1}},[e._v(e._s(e.propC)+" - 数据类型 - "+e._s(typeof e.propC)+" ")]),e._t("default")],2)},d=[],v=(r("a9e3"),function(e){Object(u["a"])(r,e);var t=Object(c["a"])(r);function r(){return Object(p["a"])(this,r),t.apply(this,arguments)}return r}(s["l"]));Object(l["a"])([Object(s["f"])(Number)],v.prototype,"propA",void 0),Object(l["a"])([Object(s["f"])({default:"default value"})],v.prototype,"propB",void 0),Object(l["a"])([Object(s["f"])([String,Boolean])],v.prototype,"propC",void 0),v=Object(l["a"])([Object(s["a"])({name:"VuePropItem"})],v);var f=v,b=f,m=r("2877"),y=function(e){e.options.__source="src/tutorial/views/vue-property-decorator/prop/VuePropItem.vue"},_=y,j=Object(m["a"])(b,i,d,!1,null,null,null);"function"===typeof _&&_(j);var O=j.exports,h=function(e){Object(u["a"])(r,e);var t=Object(c["a"])(r);function r(){var e;return Object(p["a"])(this,r),e=t.apply(this,arguments),e.propA=Date.now(),e.propC="文本A",e}return Object(a["a"])(r,[{key:"changeHandler",value:function(){this.propA=Date.now(),this.propC=["这是文本",!0][Math.round(10*Math.random())%2]}}]),r}(s["l"]);h=Object(l["a"])([Object(s["a"])({name:"VueProp",components:{VuePropItem:O}})],h);var C=h,P=C,g=function(e){e.options.__source="src/tutorial/views/vue-property-decorator/prop/index.vue"},w=g,A=Object(m["a"])(P,o,n,!1,null,"3e883f7c",null);"function"===typeof w&&w(A);t["default"]=A.exports}}]);