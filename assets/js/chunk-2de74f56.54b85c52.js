(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2de74f56"],{"0538":function(t,e,i){"use strict";var n=i("1c0b"),s=i("861d"),o=[].slice,r={},a=function(t,e,i){if(!(e in r)){for(var n=[],s=0;s<e;s++)n[s]="a["+s+"]";r[e]=Function("C,a","return new C("+n.join(",")+")")}return r[e](t,i)};t.exports=Function.bind||function(t){var e=n(this),i=o.call(arguments,1),r=function(){var n=i.concat(o.call(arguments));return this instanceof r?a(e,n.length,n):e.apply(t,n)};return s(e.prototype)&&(r.prototype=e.prototype),r}},"7b59":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-main",[i("el-row",[i("el-upload",{staticClass:"file-upload",attrs:{action:"#","on-change":t.fileChangeHandle,"auto-upload":!1,accept:".png, .jpg, .jpeg, .bmp","show-file-list":!1}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1),i("el-button",{attrs:{size:"small",type:"danger"},on:{click:t.publishPoster}},[t._v("发布海报")])],1),i("el-row",[i("div",{ref:"poster",staticClass:"edit-poster",style:t.imageStyle},[i("img",{ref:"image",attrs:{src:t.image.url},on:{load:t.imageLoading}}),i("div",{staticClass:"qrcode-legend",style:t.qrStyle,on:{mousedown:t.startMove}})]),i("div",{staticClass:"edit-poster",style:t.imageStyle},[i("el-image",{attrs:{src:t.url}})],1)])],1)},s=[],o=(i("c0b6"),i("c0e9")),r=i.n(o),a={name:"DOMCapture",data:function(){return{url:"",width:400,image:{ratio:1,url:null,width:0,height:0,clientWidth:0,clientHeight:0},qrcode:{text:"",mouseDown:!1,startX:0,startY:0,top:0,left:0,width:80,height:80}}},computed:{qrStyle:function(){return{top:this.qrcode.top+"px",left:this.qrcode.left+"px",width:this.qrcode.width+"px",height:this.qrcode.height+"px"}},posterStyle:function(){return this.image.width>this.image.clientWidth&&this.image.clientWidth/this.image.width,{width:this.image.width+"px",height:this.image.width+"px"}},imageStyle:function(){return{width:this.image.clientWidth+"px",height:this.image.clientHeight+"px"}}},methods:{fileChangeHandle:function(t,e){var i=this,n=new FileReader;n.addEventListener("load",(function(){i.image.url=n.result})),n.readAsDataURL(t.raw)},imageLoading:function(t){var e=new Image;e.src=this.image.url,console.log(e.src),this.image.width=e.width,this.image.height=e.height,console.log(e.width,e.height,t);var i=1;e.width>this.width&&(i=e.width/this.width,this.image.clientWidth=this.width,this.image.ratio=i),this.image.clientWidth=e.width/i,this.image.clientHeight=e.height/i,console.log(this.image)},startMove:function(t){t.preventDefault(),this.qrcode.mouseDown=!0,this.qrcode.top=t.currentTarget.offsetTop,this.qrcode.left=t.currentTarget.offsetLeft,this.qrcode.startX=t.clientX,this.qrcode.startY=t.clientY,document.addEventListener("mousemove",this.mouseMoveHandler.bind(this),!1),document.addEventListener("mouseup",this.mouseUpHandler.bind(this),!1)},mouseMoveHandler:function(t){if(this.qrcode.mouseDown){var e=t.clientX-this.qrcode.startX,i=t.clientY-this.qrcode.startY;this.qrcode.top+=i,this.qrcode.left+=e,this.qrcode.startX=t.clientX,this.qrcode.startY=t.clientY}},mouseUpHandler:function(t){this.qrcode.mouseDown=!1,document.removeEventListener("mousemove",this.mouseMoveHandler.bind(this),!1),document.removeEventListener("mouseup",this.mouseUpHandler.bind(this),!1)},publishPoster:function(){var t=this;r()(this.$refs.poster).then((function(e){e&&(t.url=e.toDataURL("image/png"))}))}}},h=a,c=(i("ab6e"),i("2877")),l=Object(c["a"])(h,n,s,!1,null,"312574f8",null);e["default"]=l.exports},ab6e:function(t,e,i){"use strict";var n=i("befe"),s=i.n(n);s.a},befe:function(t,e,i){},c0b6:function(t,e,i){var n=i("23e7"),s=i("0538");n({target:"Function",proto:!0},{bind:s})}}]);