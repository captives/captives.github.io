(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41278592"],{"0538":function(t,e,a){"use strict";var n=a("1c0b"),r=a("861d"),i=[].slice,s={},o=function(t,e,a){if(!(e in s)){for(var n=[],r=0;r<e;r++)n[r]="a["+r+"]";s[e]=Function("C,a","return new C("+n.join(",")+")")}return s[e](t,a)};t.exports=Function.bind||function(t){var e=n(this),a=i.call(arguments,1),s=function(){var n=a.concat(i.call(arguments));return this instanceof s?o(e,n.length,n):e.apply(t,n)};return r(e.prototype)&&(s.prototype=e.prototype),s}},"0d31":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-table",{attrs:{data:t.tableData,stripe:""}},[a("el-table-column",{attrs:{label:"媒体流ID",align:"center"}},[a("el-table-column",{attrs:{label:"名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.label.substr(0,8))+"...")]}}])})],1),a("el-table-column",{attrs:{label:t.value&&t.value.id}},[a("el-table-column",{attrs:{prop:"kind",label:"类型",align:"center"}}),a("el-table-column",{attrs:{label:"id",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.id.substr(0,8))+"...")]}}])}),a("el-table-column",{attrs:{label:"state",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.readyState))]}}])}),a("el-table-column",{attrs:{label:"enabled",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.enabled))]}}])}),a("el-table-column",{attrs:{label:"muted",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.muted))]}}])}),t.edited?a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"移除轨道",placement:"left"}},[a("el-link",{staticClass:"el-icon-minus",on:{click:function(a){return t.removeTrack(e.row)}}})],1)]}}],null,!1,3439156443)}):t._e(),a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-main",{staticClass:"table-expand"},[a("el-row",[a("h4",[t._v("Base:")]),a("el-col",{attrs:{span:12}},[t._v("label: "+t._s(e.row.label))]),a("el-col",{attrs:{span:12}},[t._v("ID: "+t._s(e.row.id))])],1),a("el-row",[a("h4",[t._v("Constraints:")]),t._l(e.row.getConstraints(),(function(e,n){return a("el-col",{key:n,attrs:{span:12}},[t._v(t._s(n)+" : "+t._s(e))])}))],2),a("el-row",[a("h4",[t._v("Settings:")]),t._l(e.row.getSettings(),(function(e,n){return a("el-col",{key:n,attrs:{span:12}},[t._v(t._s(n)+" : "+t._s(e))])}))],2),a("el-row",[a("h4",[t._v("Capabilities:")]),t._l(e.row.getCapabilities(),(function(e,n){return a("el-col",{key:n,attrs:{span:12}},[t._v(t._s(n)+" : "+t._s(e))])}))],2)],1)]}}])})],1)],1)},r=[],i=(a("99af"),{name:"StreamTracks",props:{value:{type:MediaStream,default:null},edited:{type:Boolean,default:!1}},data:function(){return{id:null,tableData:[]}},watch:{value:function(t){this.id=t.id,this.tableData=[],this.tableData=this.tableData.concat(t.getVideoTracks(),t.getAudioTracks())}},methods:{removeTrack:function(t){this.value&&(t.stop(),this.value.removeTrack(t),console.log("remove track id",t.label,t.id),this.$emit("input",this.value))}}}),s=i,o=(a("2557"),a("2877")),l=Object(o["a"])(s,n,r,!1,null,"08dc7802",null);e["a"]=l.exports},2557:function(t,e,a){"use strict";var n=a("32d5"),r=a.n(n);r.a},"2b92":function(t,e,a){"use strict";var n=a("73e0"),r=a.n(n);r.a},"32d5":function(t,e,a){},"73e0":function(t,e,a){},8418:function(t,e,a){"use strict";var n=a("c04e"),r=a("9bf2"),i=a("5c6c");t.exports=function(t,e,a){var s=n(e);s in t?r.f(t,s,i(0,a)):t[s]=a}},"99af":function(t,e,a){"use strict";var n=a("23e7"),r=a("d039"),i=a("e8b5"),s=a("861d"),o=a("7b0b"),l=a("50c4"),c=a("8418"),u=a("65f0"),d=a("1dde"),f=a("b622"),h=a("2d00"),m=f("isConcatSpreadable"),v=9007199254740991,b="Maximum allowed index exceeded",p=h>=51||!r((function(){var t=[];return t[m]=!1,t.concat()[0]!==t})),y=d("concat"),g=function(t){if(!s(t))return!1;var e=t[m];return void 0!==e?!!e:i(t)},w=!p||!y;n({target:"Array",proto:!0,forced:w},{concat:function(t){var e,a,n,r,i,s=o(this),d=u(s,0),f=0;for(e=-1,n=arguments.length;e<n;e++)if(i=-1===e?s:arguments[e],g(i)){if(r=l(i.length),f+r>v)throw TypeError(b);for(a=0;a<r;a++,f++)a in i&&c(d,f,i[a])}else{if(f>=v)throw TypeError(b);c(d,f++,i)}return d.length=f,d}})},c0b6:function(t,e,a){var n=a("23e7"),r=a("0538");n({target:"Function",proto:!0},{bind:r})},e6f2:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-main",{staticClass:"center"},[a("el-row",{attrs:{gutter:50}},[a("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[a("el-divider",{attrs:{"content-position":"left"}},[t._v("Camera")]),a("video",{ref:"localVideo",staticClass:"video-item",attrs:{autoplay:""}})],1),a("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[a("el-divider",{attrs:{"content-position":"left"}},[t._v("Audio Spectrum")]),a("canvas",{ref:"canvas",staticClass:"video-item"})],1)],1),a("StreamTracks",{model:{value:t.localStream,callback:function(e){t.localStream=e},expression:"localStream"}}),t.error?a("el-tag",{staticClass:"error",attrs:{type:"danger"}},[t._v(t._s(t.error))]):t._e(),a("vue-source",{attrs:{src:"guide/views/webrtc/MediaStreamVisualizer.vue",lang:"html"}})],1)},r=[],i=(a("4160"),a("159b"),a("0d31")),s=(a("ace4"),a("c0b6"),a("d3b7"),a("5cc6"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("3c5d"),a("2954"),a("649e"),a("219c"),a("170b"),a("b39a"),a("72f7"),308),o=231,l=.8,c=2048;function u(t,e){console.log("Creating StreamVisualizer with stream and canvas: ",t,e),this.canvas=e,this.drawContext=this.canvas.getContext("2d"),"function"===typeof AudioContext?this.context=new AudioContext:"function"===typeof webkitAudioContext?this.context=new webkitAudioContext:alert("Sorry! Web Audio is not supported by this browser"),this.source=this.context.createMediaStreamSource(t),console.log("Created Web Audio source from remote stream: ",this.source),this.analyser=this.context.createAnalyser(),this.analyser.minDecibels=-140,this.analyser.maxDecibels=0,this.freqs=new Uint8Array(this.analyser.frequencyBinCount),this.times=new Uint8Array(this.analyser.frequencyBinCount),this.source.connect(this.analyser),this.startTime=0,this.startOffset=0}u.prototype.start=function(){requestAnimationFrame(this.draw.bind(this))},u.prototype.draw=function(){this.analyser.smoothingTimeConstant=l,this.analyser.fftSize=c,this.analyser.getByteFrequencyData(this.freqs),this.analyser.getByteTimeDomainData(this.times),this.canvas.width=s,this.canvas.height=o;for(var t=0;t<this.analyser.frequencyBinCount;t++){var e=this.freqs[t],a=e/256,n=o*a,r=o-n-1,i=s/this.analyser.frequencyBinCount,u=t/this.analyser.frequencyBinCount*360;this.drawContext.fillStyle="hsl("+u+", 100%, 50%)",this.drawContext.fillRect(t*i,r,i,n)}for(t=0;t<this.analyser.frequencyBinCount;t++)e=this.times[t],a=e/256,n=o*a,r=o-n-1,i=s/this.analyser.frequencyBinCount,this.drawContext.fillStyle="white",this.drawContext.fillRect(t*i,r,1,2);requestAnimationFrame(this.draw.bind(this))},u.prototype.getFrequencyValue=function(t){var e=this.context.sampleRate/2,a=Math.round(t/e*this.freqs.length);return this.freqs[a]};var d=u,f={name:"MediaStreamVisualizer",components:{StreamTracks:i["a"]},data:function(){return{localStream:null,options:{audio:!0,video:{width:{exact:720},height:{exact:405}}},error:null}},mounted:function(){this.init()},destroyed:function(){this.localStream&&this.localStream.getTracks().forEach((function(t){t.stop()}))},methods:{init:function(){var t=this,e=this,a=this.$refs.localVideo;navigator.mediaDevices.getUserMedia(this.options).then((function(e){t.localStream=e,e.oninactive=function(){console.log("Stream inactive")},a.onloadedmetadata=function(t){console.log("AudioTracks",e.getAudioTracks()),console.log("VideoTracks",e.getVideoTracks())},a.srcObject=e;var n=new d(e,t.$refs.canvas);n.start()}))["catch"]((function(t){e.error=t,console.log("navigator.getUserMedia error: ",t)}))}}},h=f,m=(a("2b92"),a("2877")),v=Object(m["a"])(h,n,r,!1,null,"0fae5059",null);e["default"]=v.exports}}]);