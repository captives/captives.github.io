(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1208c913"],{"08d8":function(n,t,e){},"9d50":function(n,t,e){"use strict";var o=e("08d8"),i=e.n(o);i.a},c4a9:function(n,t,e){"use strict";(function(n){e.d(t,"a",(function(){return i}));var o=function(){return"undefined"!==typeof window?window:n},i=function(){var n=o();return n&&n.tinymce?n.tinymce:null}}).call(this,e("c8ba"))},ca72:function(n,t,e){"use strict";var o=["onActivate","onAddUndo","onBeforeAddUndo","onBeforeExecCommand","onBeforeGetContent","onBeforeRenderUI","onBeforeSetContent","onBeforePaste","onBlur","onChange","onClearUndos","onClick","onContextMenu","onCopy","onCut","onDblclick","onDeactivate","onDirty","onDrag","onDragDrop","onDragEnd","onDragGesture","onDragOver","onDrop","onExecCommand","onFocus","onFocusIn","onFocusOut","onGetContent","onHide","onInit","onKeyDown","onKeyPress","onKeyUp","onLoadContent","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onNodeChange","onObjectResizeStart","onObjectResized","onObjectSelected","onPaste","onPostProcess","onPostRender","onPreProcess","onProgressState","onRedo","onRemove","onReset","onSaveContent","onSelectionChange","onSetAttrib","onSetContent","onShow","onSubmit","onUndo","onVisualAid"],i=function(n){return-1!==o.indexOf(n)},r=function(n,t,e){Object.keys(t).filter(i).forEach((function(o){var i=t[o];"function"===typeof i&&("onInit"===o?i(n,e):e.on(o.substring(2),(function(n){return i(n,e)})))}))},s=function(n,t){var e=n.$props.modelEvents?n.$props.modelEvents:null,o=Array.isArray(e)?e.join(" "):e;n.$watch("value",(function(e,o){t&&"string"===typeof e&&e!==o&&e!==t.getContent({format:n.$props.outputFormat})&&t.setContent(e)})),t.on(o||"change keyup undo redo",(function(){n.$emit("input",t.getContent({format:n.$props.outputFormat}))}))},a=function(n,t,e){var o=t.$props.value?t.$props.value:"",i=t.$props.initialValue?t.$props.initialValue:"";e.setContent(o||i),t.$listeners.input&&s(t,e),r(n,t.$listeners,e)},c=0,u=function(n){var t=Date.now(),e=Math.floor(1e9*Math.random());return c++,n+"_"+e+c+String(t)},p=function(n){return null!==n&&"textarea"===n.tagName.toLowerCase()},l=function(n){return"undefined"===typeof n||""===n?[]:Array.isArray(n)?n:n.split(" ")},d=function(n,t){return l(n).concat(l(t))},f=function(n){return null===n||void 0===n},h=function(){return{listeners:[],scriptId:u("tiny-script"),scriptLoaded:!1}},v=function(){var n=h(),t=function(n,t,e,o){var i=t.createElement("script");i.referrerPolicy="origin",i.type="application/javascript",i.id=n,i.src=e;var r=function(){i.removeEventListener("load",r),o()};i.addEventListener("load",r),t.head&&t.head.appendChild(i)},e=function(e,o,i){n.scriptLoaded?i():(n.listeners.push(i),e.getElementById(n.scriptId)||t(n.scriptId,e,o,(function(){n.listeners.forEach((function(n){return n()})),n.scriptLoaded=!0})))},o=function(){n=h()};return{load:e,reinitialize:o}},m=v(),y=e("c4a9"),g={apiKey:String,cloudChannel:String,id:String,init:Object,initialValue:String,inline:Boolean,modelEvents:[String,Array],plugins:[String,Array],tagName:String,toolbar:[String,Array],value:String,disabled:Boolean,tinymceScriptSrc:String,outputFormat:{type:String,validator:function(n){return"html"===n||"text"===n}}},b=function(){return b=Object.assign||function(n){for(var t,e=1,o=arguments.length;e<o;e++)for(var i in t=arguments[e],t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i]);return n},b.apply(this,arguments)},$=function(n,t,e){return n(e||"div",{attrs:{id:t}})},S=function(n,t){return n("textarea",{attrs:{id:t},style:{visibility:"hidden"}})},j=function(n){return function(){var t=b(b({},n.$props.init),{readonly:n.$props.disabled,selector:"#"+n.elementId,plugins:d(n.$props.init&&n.$props.init.plugins,n.$props.plugins),toolbar:n.$props.toolbar||n.$props.init&&n.$props.init.toolbar,inline:n.inlineEditor,setup:function(t){n.editor=t,t.on("init",(function(e){return a(e,n,t)})),n.$props.init&&"function"===typeof n.$props.init.setup&&n.$props.init.setup(t)}});p(n.element)&&(n.element.style.visibility=""),Object(y["a"])().init(t)}},C={props:g,created:function(){this.elementId=this.$props.id||u("tiny-vue"),this.inlineEditor=this.$props.init&&this.$props.init.inline||this.$props.inline},watch:{disabled:function(){this.editor.setMode(this.disabled?"readonly":"design")}},mounted:function(){if(this.element=this.$el,null!==Object(y["a"])())j(this)();else if(this.element&&this.element.ownerDocument){var n=this.$props.cloudChannel?this.$props.cloudChannel:"5",t=this.$props.apiKey?this.$props.apiKey:"no-api-key",e=f(this.$props.tinymceScriptSrc)?"https://cdn.tiny.cloud/1/"+t+"/tinymce/"+n+"/tinymce.min.js":this.$props.tinymceScriptSrc;m.load(this.element.ownerDocument,e,j(this))}},beforeDestroy:function(){null!==Object(y["a"])()&&Object(y["a"])().remove(this.editor)},render:function(n){return this.inlineEditor?$(n,this.elementId,this.$props.tagName):S(n,this.elementId)}};t["a"]=C},fcfe:function(n,t,e){"use strict";e.r(t);var o=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("el-main",[e("editor",{attrs:{apiKey:"9j0jjt7739g05sqrj9uki6phym2b0gxsjqaamqdox4gj52hw",init:n.options},model:{value:n.content,callback:function(t){n.content=t},expression:"content"}}),e("el-divider",{attrs:{"content-position":"left"}},[n._v("输出")]),e("div",{domProps:{innerHTML:n._s(n.content)}}),e("el-divider",{attrs:{"content-position":"left"}},[n._v("内容")]),e("div",[n._v(n._s(n.content))]),e("el-divider",{attrs:{"content-position":"left"}},[n._v("动效图")])],1)},i=[],r=e("d4ec"),s=e("262e"),a=e("2caf"),c=e("9ab4"),u=e("60a3"),p=e("ca72"),l=function(n){Object(s["a"])(e,n);var t=Object(a["a"])(e);function e(){var n;return Object(r["a"])(this,e),n=t.apply(this,arguments),n.content="",n.options={height:600,language:"zh_CN"},n}return e}(u["f"]);l=Object(c["a"])([Object(u["a"])({name:"VueEditor",components:{Editor:p["a"]}})],l);var d=l,f=d,h=(e("9d50"),e("2877")),v=Object(h["a"])(f,o,i,!1,null,"68280527",null);t["default"]=v.exports}}]);