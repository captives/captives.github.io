(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-730c2c6c"],{"057f":function(t,e,n){var r=n("fc6a"),o=n("241c").f,a={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return o(t)}catch(e){return i.slice()}};t.exports.f=function(t){return i&&"[object Window]"==a.call(t)?c(t):o(r(t))}},"0d31":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-table",{attrs:{data:t.tableData,stripe:""}},[n("el-table-column",{attrs:{label:"媒体流ID",align:"center"}},[n("el-table-column",{attrs:{label:"名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.label.substr(0,8))+"...")]}}])})],1),n("el-table-column",{attrs:{label:t.value&&t.value.id}},[n("el-table-column",{attrs:{prop:"kind",label:"类型",align:"center"}}),n("el-table-column",{attrs:{label:"id",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.id.substr(0,8))+"...")]}}])}),n("el-table-column",{attrs:{label:"state",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.readyState))]}}])}),n("el-table-column",{attrs:{label:"enabled",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.enabled))]}}])}),n("el-table-column",{attrs:{label:"muted",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.muted))]}}])}),t.edited?n("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"移除轨道",placement:"left"}},[n("el-link",{staticClass:"el-icon-minus",on:{click:function(n){return t.removeTrack(e.row)}}})],1)]}}],null,!1,3439156443)}):t._e(),n("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-main",{staticClass:"table-expand"},[n("el-row",[n("h4",[t._v("Base:")]),n("el-col",{attrs:{span:12}},[t._v("label: "+t._s(e.row.label))]),n("el-col",{attrs:{span:12}},[t._v("ID: "+t._s(e.row.id))])],1),n("el-row",[n("h4",[t._v("Constraints:")]),t._l(e.row.getConstraints(),(function(e,r){return n("el-col",{key:r,attrs:{span:12}},[t._v(t._s(r)+" : "+t._s(e))])}))],2),n("el-row",[n("h4",[t._v("Settings:")]),t._l(e.row.getSettings(),(function(e,r){return n("el-col",{key:r,attrs:{span:12}},[t._v(t._s(r)+" : "+t._s(e))])}))],2),n("el-row",[n("h4",[t._v("Capabilities:")]),t._l(e.row.getCapabilities(),(function(e,r){return n("el-col",{key:r,attrs:{span:12}},[t._v(t._s(r)+" : "+t._s(e))])}))],2)],1)]}}])})],1)],1)},o=[],a=(n("99af"),{name:"StreamTracks",props:{value:{type:MediaStream,default:null},edited:{type:Boolean,default:!1}},data:function(){return{id:null,tableData:[]}},watch:{value:function(t){this.id=t.id,this.tableData=[],this.tableData=this.tableData.concat(t.getVideoTracks(),t.getAudioTracks())}},methods:{removeTrack:function(t){this.value&&(t.stop(),this.value.removeTrack(t),console.log("remove track id",t.label,t.id),this.$emit("input",this.value))}}}),i=a,c=(n("2557"),n("2877")),l=Object(c["a"])(i,r,o,!1,null,"08dc7802",null);e["a"]=l.exports},"1dde":function(t,e,n){var r=n("d039"),o=n("b622"),a=n("2d00"),i=o("species");t.exports=function(t){return a>=51||!r((function(){var e=[],n=e.constructor={};return n[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},2557:function(t,e,n){"use strict";var r=n("32d5"),o=n.n(r);o.a},"32d5":function(t,e,n){},"3ca3":function(t,e,n){"use strict";var r=n("6547").charAt,o=n("69f3"),a=n("7dd0"),i="String Iterator",c=o.set,l=o.getterFor(i);a(String,"String",(function(t){c(this,{type:i,string:String(t),index:0})}),(function(){var t,e=l(this),n=e.string,o=e.index;return o>=n.length?{value:void 0,done:!0}:(t=r(n,o),e.index+=t.length,{value:t,done:!1})}))},"53ca":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n("a4d3"),n("e01a"),n("d28b"),n("e260"),n("d3b7"),n("3ca3"),n("ddb0");function r(t){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}},"5d27":function(t,e,n){},"5f27":function(t,e,n){},"746f":function(t,e,n){var r=n("428f"),o=n("5135"),a=n("e538"),i=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});o(e,t)||i(e,t,{value:a.f(t)})}},8418:function(t,e,n){"use strict";var r=n("c04e"),o=n("9bf2"),a=n("5c6c");t.exports=function(t,e,n){var i=r(e);i in t?o.f(t,i,a(0,n)):t[i]=n}},"99af":function(t,e,n){"use strict";var r=n("23e7"),o=n("d039"),a=n("e8b5"),i=n("861d"),c=n("7b0b"),l=n("50c4"),s=n("8418"),u=n("65f0"),f=n("1dde"),d=n("b622"),v=n("2d00"),b=d("isConcatSpreadable"),p=9007199254740991,h="Maximum allowed index exceeded",m=v>=51||!o((function(){var t=[];return t[b]=!1,t.concat()[0]!==t})),g=f("concat"),y=function(t){if(!i(t))return!1;var e=t[b];return void 0!==e?!!e:a(t)},S=!m||!g;r({target:"Array",proto:!0,forced:S},{concat:function(t){var e,n,r,o,a,i=c(this),f=u(i,0),d=0;for(e=-1,r=arguments.length;e<r;e++)if(a=-1===e?i:arguments[e],y(a)){if(o=l(a.length),d+o>p)throw TypeError(h);for(n=0;n<o;n++,d++)n in a&&s(f,d,a[n])}else{if(d>=p)throw TypeError(h);s(f,d++,a)}return f.length=d,f}})},"9b5a":function(t,e,n){"use strict";var r=n("5d27"),o=n.n(r);o.a},a4d3:function(t,e,n){"use strict";var r=n("23e7"),o=n("da84"),a=n("d066"),i=n("c430"),c=n("83ab"),l=n("4930"),s=n("fdbf"),u=n("d039"),f=n("5135"),d=n("e8b5"),v=n("861d"),b=n("825a"),p=n("7b0b"),h=n("fc6a"),m=n("c04e"),g=n("5c6c"),y=n("7c73"),S=n("df75"),w=n("241c"),_=n("057f"),k=n("7418"),D=n("06cf"),O=n("9bf2"),x=n("d1e7"),T=n("9112"),C=n("6eeb"),j=n("5692"),I=n("f772"),E=n("d012"),P=n("90e3"),N=n("b622"),M=n("e538"),$=n("746f"),A=n("d44e"),V=n("69f3"),B=n("b727").forEach,F=I("hidden"),J="Symbol",U="prototype",L=N("toPrimitive"),R=V.set,z=V.getterFor(J),H=Object[U],Q=o.Symbol,W=a("JSON","stringify"),Y=D.f,q=O.f,G=_.f,K=x.f,X=j("symbols"),Z=j("op-symbols"),tt=j("string-to-symbol-registry"),et=j("symbol-to-string-registry"),nt=j("wks"),rt=o.QObject,ot=!rt||!rt[U]||!rt[U].findChild,at=c&&u((function(){return 7!=y(q({},"a",{get:function(){return q(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=Y(H,e);r&&delete H[e],q(t,e,n),r&&t!==H&&q(H,e,r)}:q,it=function(t,e){var n=X[t]=y(Q[U]);return R(n,{type:J,tag:t,description:e}),c||(n.description=e),n},ct=s?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof Q},lt=function(t,e,n){t===H&&lt(Z,e,n),b(t);var r=m(e,!0);return b(n),f(X,r)?(n.enumerable?(f(t,F)&&t[F][r]&&(t[F][r]=!1),n=y(n,{enumerable:g(0,!1)})):(f(t,F)||q(t,F,g(1,{})),t[F][r]=!0),at(t,r,n)):q(t,r,n)},st=function(t,e){b(t);var n=h(e),r=S(n).concat(bt(n));return B(r,(function(e){c&&!ft.call(n,e)||lt(t,e,n[e])})),t},ut=function(t,e){return void 0===e?y(t):st(y(t),e)},ft=function(t){var e=m(t,!0),n=K.call(this,e);return!(this===H&&f(X,e)&&!f(Z,e))&&(!(n||!f(this,e)||!f(X,e)||f(this,F)&&this[F][e])||n)},dt=function(t,e){var n=h(t),r=m(e,!0);if(n!==H||!f(X,r)||f(Z,r)){var o=Y(n,r);return!o||!f(X,r)||f(n,F)&&n[F][r]||(o.enumerable=!0),o}},vt=function(t){var e=G(h(t)),n=[];return B(e,(function(t){f(X,t)||f(E,t)||n.push(t)})),n},bt=function(t){var e=t===H,n=G(e?Z:h(t)),r=[];return B(n,(function(t){!f(X,t)||e&&!f(H,t)||r.push(X[t])})),r};if(l||(Q=function(){if(this instanceof Q)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=P(t),n=function(t){this===H&&n.call(Z,t),f(this,F)&&f(this[F],e)&&(this[F][e]=!1),at(this,e,g(1,t))};return c&&ot&&at(H,e,{configurable:!0,set:n}),it(e,t)},C(Q[U],"toString",(function(){return z(this).tag})),C(Q,"withoutSetter",(function(t){return it(P(t),t)})),x.f=ft,O.f=lt,D.f=dt,w.f=_.f=vt,k.f=bt,M.f=function(t){return it(N(t),t)},c&&(q(Q[U],"description",{configurable:!0,get:function(){return z(this).description}}),i||C(H,"propertyIsEnumerable",ft,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!l,sham:!l},{Symbol:Q}),B(S(nt),(function(t){$(t)})),r({target:J,stat:!0,forced:!l},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var n=Q(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!ct(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){ot=!0},useSimple:function(){ot=!1}}),r({target:"Object",stat:!0,forced:!l,sham:!c},{create:ut,defineProperty:lt,defineProperties:st,getOwnPropertyDescriptor:dt}),r({target:"Object",stat:!0,forced:!l},{getOwnPropertyNames:vt,getOwnPropertySymbols:bt}),r({target:"Object",stat:!0,forced:u((function(){k.f(1)}))},{getOwnPropertySymbols:function(t){return k.f(p(t))}}),W){var pt=!l||u((function(){var t=Q();return"[null]"!=W([t])||"{}"!=W({a:t})||"{}"!=W(Object(t))}));r({target:"JSON",stat:!0,forced:pt},{stringify:function(t,e,n){var r,o=[t],a=1;while(arguments.length>a)o.push(arguments[a++]);if(r=e,(v(e)||void 0!==t)&&!ct(t))return d(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!ct(e))return e}),o[1]=e,W.apply(null,o)}})}Q[U][L]||T(Q[U],L,Q[U].valueOf),A(Q,J),E[F]=!0},b0c0:function(t,e,n){var r=n("83ab"),o=n("9bf2").f,a=Function.prototype,i=a.toString,c=/^\s*function ([^ (]*)/,l="name";r&&!(l in a)&&o(a,l,{configurable:!0,get:function(){try{return i.call(this).match(c)[1]}catch(t){return""}}})},b793:function(t,e,n){"use strict";var r=n("5f27"),o=n.n(r);o.a},c64e:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-main",{staticClass:"center"},[n("video",{ref:"localVideo",staticClass:"video-item",attrs:{autoplay:""},domProps:{srcObject:t.localStream}}),n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"row-class-name":t.tableRowClassName}},[n("el-table-column",{attrs:{prop:"label",label:"名称"}}),n("el-table-column",{attrs:{label:"类型",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.deviceLabel[e.row.kind]))]}}])}),n("el-table-column",{attrs:{prop:"deviceId",label:"设备ID"}}),n("el-table-column",{attrs:{label:"操作",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return t.changeDevice(e.row)}}},[t._v("选择")])]}}])})],1),n("StreamTracks",{model:{value:t.localStream,callback:function(e){t.localStream=e},expression:"localStream"}}),t.error?n("el-tag",{staticClass:"error",attrs:{type:"danger"}},[t._v(t._s(t.error))]):t._e(),n("vue-source",{attrs:{src:"guide/views/webrtc/ChooseUserMedia.vue",lang:"html"}})],1)},o=[],a=(n("4160"),n("b0c0"),n("159b"),n("53ca")),i=n("0d31"),c={name:"ChooseUserMedia",components:{StreamTracks:i["a"]},data:function(){return{tableData:[],deviceLabel:{audioinput:"音频输入",audiooutput:"音频输出",videoinput:"视频输入"},selectDevice:{audioinput:null,audiooutput:null,videoinput:null},localStream:null,options:{audio:!0,video:{width:{exact:720},height:{exact:405}}},error:null}},mounted:function(){navigator.mediaDevices.enumerateDevices().then(this.gotDevices)["catch"](this.handleError)},destroyed:function(){this.closeDevice()},methods:{tableRowClassName:function(t){var e=t.row;t.rowIndex;return"row-"+e.kind},gotDevices:function(t){this.tableData=t},handleError:function(t){this.error=t},changeDevice:function(t){var e=this.$refs.localVideo;if("audiooutput"===t.kind){var n=this.selectDevice.audiooutput?this.selectDevice.audiooutput.deviceId:void 0;this.playback(e,n)}else this.selectDevice[t.kind]=t.deviceId,this.start(e)},start:function(t){var e=this,n=this.selectDevice.audioinput,r=this.selectDevice.videoinput,o={audio:!!n&&{deviceId:{exact:n}},video:!!r&&{deviceId:{exact:r}}};console.log("constraints",o),this.closeDevice(),navigator.mediaDevices.getUserMedia(o).then((function(n){e.localStream=n,n.oninactive=function(){console.log("Stream inactive")},t.addEventListener("loadedmetadata",(function(t){console.log("AudioTracks",n.getAudioTracks()),console.log("VideoTracks",n.getVideoTracks())}))}))["catch"]((function(t){that.error=t,console.log("navigator.getUserMedia error: ",t)}))},playback:function(t,e){console.log("videoElement",e,t.sinkId,Object(a["a"])(t.sinkId)),"undefined"!==typeof t.sinkId?t.setSinkId(e).then((function(){console.log("Success, audio output device attached: ".concat(e))}))["catch"]((function(t){var e=t;"SecurityError"===t.name&&(e="You need to use HTTPS for selecting audio output device: ".concat(t)),console.error(e)})):console.warn("Browser does not support output device selection.")},closeDevice:function(){this.localStream&&this.localStream.getTracks().forEach((function(t){t.stop()}))}}},l=c,s=(n("b793"),n("9b5a"),n("2877")),u=Object(s["a"])(l,r,o,!1,null,"35965d81",null);e["default"]=u.exports},d28b:function(t,e,n){var r=n("746f");r("iterator")},ddb0:function(t,e,n){var r=n("da84"),o=n("fdbc"),a=n("e260"),i=n("9112"),c=n("b622"),l=c("iterator"),s=c("toStringTag"),u=a.values;for(var f in o){var d=r[f],v=d&&d.prototype;if(v){if(v[l]!==u)try{i(v,l,u)}catch(p){v[l]=u}if(v[s]||i(v,s,f),o[f])for(var b in a)if(v[b]!==a[b])try{i(v,b,a[b])}catch(p){v[b]=a[b]}}}},e01a:function(t,e,n){"use strict";var r=n("23e7"),o=n("83ab"),a=n("da84"),i=n("5135"),c=n("861d"),l=n("9bf2").f,s=n("e893"),u=a.Symbol;if(o&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var f={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new u(t):void 0===t?u():u(t);return""===t&&(f[e]=!0),e};s(d,u);var v=d.prototype=u.prototype;v.constructor=d;var b=v.toString,p="Symbol(test)"==String(u("test")),h=/^Symbol\((.*)\)[^)]+$/;l(v,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,e=b.call(t);if(i(f,t))return"";var n=p?e.slice(7,-1):e.replace(h,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:d})}},e538:function(t,e,n){var r=n("b622");e.f=r}}]);