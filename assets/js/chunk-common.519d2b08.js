(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-common"],{"0c75":function(e,t,n){},"1a09":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row"},[e.code?n("vue-code",[n("p",{staticClass:"title"},[e._v(e._s(e._f("label")(e.src)))]),n("pre",{attrs:{lang:e.lang}},[e._v(e._s(e.code))])]):[n("img",{attrs:{src:e.loading,alt:""}})]],2)},a=[],o=(n("d3b7"),n("ac1f"),n("1276"),n("875e")),c=n.n(o),s=n("1cf6"),l={name:"Source",components:{"vue-code":s["a"]},props:{src:{type:String,default:""},lang:{type:String,default:"html"}},data:function(){return{code:null,loading:c.a}},filters:{label:function(e){var t=e.split("/");return t[t.length-1]}},methods:{fetch:function(e){return new Promise((function(t,n){var r=new XMLHttpRequest;r.open("get",e),r.setRequestHeader("Content-type","text/html"),r.onloadstart=function(){},r.onprogress=function(e){},r.onload=function(){t(r.response)},r.onerror=function(e){console.error(e)},r.send()}))}},mounted:function(){var e=this;this.src&&this.fetch("src/"+this.src).then((function(t){e.code=t}))}},i=l,u=(n("7481"),n("2877")),d=Object(u["a"])(i,r,a,!1,null,"b82ae484",null);t["a"]=d.exports},"1cf6":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"code",staticClass:"code"},[e._t("default",[e._v("code info")])],2)},a=[],o=(n("4160"),n("159b"),n("c197")),c=n.n(o),s={name:"Code",props:{language:{type:String,default:"javascrit"}},methods:{render:function(){var e=this,t=this.$refs.code.querySelectorAll("pre")||[];t.forEach((function(t){var n=document.createElement("code");t.innerHTML&&(n.innerHTML=t.innerHTML,n.className="language-"+t.getAttribute("lang")),e.$refs.code.replaceChild(n,t)})),c.a.highlightAll()}},mounted:function(){this.render()}},l=s,i=(n("3f93"),n("2877")),u=Object(i["a"])(l,r,a,!1,null,"667a4b87",null);t["a"]=u.exports},2887:function(e,t,n){"use strict";n("bad8");var r=n("1cf6"),a=n("1a09"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("el-dropdown",{on:{command:e.selecteItem}},[n("span",{staticClass:"el-dropdown-link"},[e._t("default",[e._v("Source")],{data:e.value})],2),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.value,(function(t,r){return n("el-dropdown-item",{key:r,attrs:{command:t}},[e._v(e._s(e._f("label")(t.value)))])})),1)],1),n("el-drawer",{attrs:{title:e.selectItem.value,visible:e.drawerVisible,"destroy-on-close":!0,direction:"rtl",size:"40%"},on:{"update:visible":function(t){e.drawerVisible=t}}},[e.selectItem.code?n("vue-code",[n("pre",{attrs:{lang:e.selectItem.lang}},[e._v(e._s(e.selectItem.code))])]):e._e()],1)],1)},c=[],s=(n("d3b7"),n("ac1f"),n("1276"),{name:"SourceCode",components:{"vue-code":r["a"]},props:{drawed:{type:Boolean,default:!0},value:{type:Array,default:function(){return[]}}},data:function(){return{drawerVisible:!1,selectItem:{}}},filters:{label:function(e){var t=e.split("/");return t[t.length-1]}},methods:{fetch:function(e){return new Promise((function(t,n){var r=new XMLHttpRequest;r.open("get",e),r.setRequestHeader("Content-type","text/html"),r.onloadstart=function(){},r.onload=function(){t(r.response)},r.onprogress=function(e){},r.send()}))},selecteItem:function(e){var t=this;this.fetch("src/"+e.value).then((function(n){t.selectItem=e,t.drawerVisible=t.drawed,t.$set(e,"code",n),t.$emit("input",t.value)}))}}}),l=s,i=(n("511b"),n("2877")),u=Object(i["a"])(l,o,c,!1,null,"5871b2b3",null),d=u.exports,f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}},[n("template",{slot:"prepend"},[e.list.length?n("el-select",{attrs:{placeholder:"请选择视频"},on:{change:e.changeHandler},model:{value:e.selectValue,callback:function(t){e.selectValue=t},expression:"selectValue"}},e._l(e.list,(function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1):n("span",[e._v("URL：")])],1),n("el-button",{attrs:{slot:"append",icon:"el-icon-s-promotion"},on:{click:e.requestURL},slot:"append"})],2)},p=[],m={name:"URLInput",props:{value:{type:String,default:""},list:{type:Array,default:function(){return[]}}},data:function(){return{text:this.value,selectValue:null}},methods:{changeHandler:function(e){this.text=this.selectValue},requestURL:function(){this.$emit("input",this.text)}},mounted:function(){this.list.length&&(this.text=this.list[0].value,this.selectValue=this.text,this.$emit("input",this.text))}},h=m,v=(n("d763"),Object(i["a"])(h,f,p,!1,null,"54a39894",null)),b=v.exports,g=n("4cc3"),x=n("f77c");t["a"]={install:function(e){e.component("vue-code",r["a"]),e.component("url-input",b),e.component("vue-source",a["a"]),e.component("source-code",d),e.component("nav-menu",g["a"]),e.prototype.$fetch=x["c"],e.prototype.$videoList=[{label:"Parkour 720P MP4",value:"/medias/parkour_720P.mp4"},{label:"Parkour 720P WEBM",value:"/medias/parkour_720P.webm"},{label:"Parkour 1080P MP4",value:"/medias/parkour_1080P.mp4"},{label:"Parkour 1080P WEBM",value:"/medias/parkour_1080P.webm"},{label:"Piper 720P",value:"/medias/Piper_720P.mp4"},{label:"Piper 1080P",value:"/medias/Piper_1080P.mp4"},{label:"汽车 绿幕视频",value:"/medias/green-screen-car.mp4"}]}}},"3f93":function(e,t,n){"use strict";var r=n("c805"),a=n.n(r);a.a},"4cc3":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.list.length?n("el-menu",{attrs:{router:!0,mode:e.mode,"default-active":e.selectIndex,"background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"},on:{select:e.menuChangeHandler}},[e._l(e.list,(function(t){return[-1!=t.path.indexOf(".html")?[n("el-menu-item",{key:t.path,attrs:{index:t.path}},[n("i",{class:t.icon}),n("el-link",{attrs:{href:t.path}},[e._v(e._s(t.name))])],1)]:[n("el-menu-item",{key:t.path,attrs:{index:t.path,route:e.prefix+t.path}},[n("i",{class:t.icon}),e._v(" "+e._s(t.name)+" ")])]]}))],2):e._e()},a=[],o=(n("7db0"),n("c975"),{name:"NavMenu",props:{mode:{type:String,default:"vertical"},prefix:{type:String,default:""},list:{type:Array,default:function(){return[]}},routes:{type:Array,default:function(){return[]}}},data:function(){return{selectIndex:"/index"}},computed:{path:function(){var e=this;return function(t){return e.searchPath(t)}}},methods:{searchPath:function(e){},menuChangeHandler:function(e,t){console.log(this.prefix,e,t)}},created:function(){var e=this.$route.path,t=this.list.find((function(t,n){return-1!=e.indexOf(t.path)}));this.selectIndex=t.path}}),c=o,s=(n("dfdc"),n("2877")),l=Object(s["a"])(c,r,a,!1,null,"f65e01c4",null);t["a"]=l.exports},"511b":function(e,t,n){"use strict";var r=n("ef24"),a=n.n(r);a.a},"60c3":function(e,t,n){},7481:function(e,t,n){"use strict";var r=n("0c75"),a=n.n(r);a.a},"7b69":function(e,t,n){},"80d6":function(e,t,n){},"875e":function(e,t,n){e.exports=n.p+"assets/img/loading-code.6fe0c5f8.gif"},bad8:function(e,t,n){},c805:function(e,t,n){},d763:function(e,t,n){"use strict";var r=n("7b69"),a=n.n(r);a.a},dfdc:function(e,t,n){"use strict";var r=n("60c3"),a=n.n(r);a.a},ef24:function(e,t,n){},f77c:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return a})),n.d(t,"c",(function(){return o}));n("c975"),n("b680"),n("d3b7"),n("e25e"),n("ac1f"),n("5319");function r(e){var t=e.replace("data:image/png;base64,",""),n=t.indexOf("=");t.indexOf("=")>0&&(t=t.substring(0,n));var r=t.length;return parseInt(r-r/8*2)}function a(e){e=e||0;var t="";t=e<102.4?e.toFixed(2)+"B":e<104857.6?(e/1024).toFixed(2)+"KB":e<107374182.4?(e/1048576).toFixed(2)+"MB":(e/1073741824).toFixed(2)+"GB";var n=t+"",r=n.indexOf("."),a=n.substr(r+1,2);return"00"==a?n.substring(0,r)+n.substr(r+3,2):n}function o(e){return new Promise((function(t,n){var r=new XMLHttpRequest;r.open("get",e,!0),r.onreadystatechange=function(){4==r.readyState&&((r.status>=200&&r.status<300||304==r.status)&&t(JSON.parse(r.responseText)),n())},r.onerror=function(n){console.log("featch Error",e,n),t()},r.send()}))}}}]);