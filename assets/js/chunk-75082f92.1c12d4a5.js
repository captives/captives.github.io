(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75082f92"],{1960:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-container",[s("el-main",[s("canvas",{ref:"canvasElement",staticClass:"canvas",attrs:{width:"1360px",height:"720px"}})]),s("ul",[s("li",{class:{active:e.selected(e.DrawType.PEN)},on:{click:function(t){return e.drawTypeChange(e.DrawType.PEN)}}},[e._v("画笔")]),s("li",{class:{active:e.selected(e.DrawType.ARROW)},on:{click:function(t){return e.drawTypeChange(e.DrawType.ARROW)}}},[e._v("箭头")]),s("li",{class:{active:e.selected(e.DrawType.LINE)},on:{click:function(t){return e.drawTypeChange(e.DrawType.LINE)}}},[e._v("直线")]),s("li",{class:{active:e.selected(e.DrawType.DOTTEDLINE)},on:{click:function(t){return e.drawTypeChange(e.DrawType.DOTTEDLINE)}}},[e._v("虚线")]),s("li",{class:{active:e.selected(e.DrawType.CIRCLE)},on:{click:function(t){return e.drawTypeChange(e.DrawType.CIRCLE)}}},[e._v("圆")]),s("li",{class:{active:e.selected(e.DrawType.ELLIPSE)},on:{click:function(t){return e.drawTypeChange(e.DrawType.ELLIPSE)}}},[e._v("椭圆")]),s("li",{class:{active:e.selected(e.DrawType.SQUARE)},on:{click:function(t){return e.drawTypeChange(e.DrawType.SQUARE)}}},[e._v("矩形")]),s("li",{class:{active:e.selected(e.DrawType.RIGHTANGLE)},on:{click:function(t){return e.drawTypeChange(e.DrawType.RIGHTANGLE)}}},[e._v("直角三角")]),s("li",{class:{active:e.selected(e.DrawType.EQUILATERAL)},on:{click:function(t){return e.drawTypeChange(e.DrawType.EQUILATERAL)}}},[e._v("等边三角")]),s("li",{class:{active:e.selected(e.DrawType.TEXT)},on:{click:function(t){return e.drawTypeChange(e.DrawType.TEXT)}}},[e._v("文字")]),s("li",{class:{active:e.selected(e.DrawType.SELECT)},on:{click:function(t){return e.drawTypeChange(e.DrawType.SELECT)}}},[e._v("选中")]),s("li",{on:{click:e.clear}},[s("el-color-picker",{attrs:{"show-alpha":"",predefine:e.predefineColors},on:{change:e.colorPickerChangeHandler},model:{value:e.selectColor,callback:function(t){e.selectColor=t},expression:"selectColor"}})],1),s("li",{on:{click:e.clear}},[s("el-popover",{attrs:{placement:"left",width:"200",trigger:"click"}},[s("el-slider",{on:{change:e.widthSliderChangeHandler},model:{value:e.selecteWidth,callback:function(t){e.selecteWidth=t},expression:"selecteWidth"}}),s("span",{attrs:{slot:"reference"},slot:"reference"},[e._v(" 宽度 "),s("small",[e._v(e._s(e.selecteWidth))])])],1)],1),s("li",{on:{click:e.clear}},[e._v("清屏")]),s("li",{on:{click:e.reset}},[e._v("重置")])])],1)},r=[],i=s("7a94"),o={name:"DrawBoard",data:function(){return{canvas:null,drawing:!1,mouseDown:!1,mouseFrom:{x:0,y:0},mouseTo:{x:0,y:0},canvasObject:null,drawType:"pen",DrawType:{PEN:"pen",BRUSH:"brush",ARROW:"arrow",LINE:"line",DOTTEDLINE:"dottedline",CIRCLE:"circle",ELLIPSE:"ellipse",SQUARE:"square",RECTANGLE:"rectangle",RIGHTANGLE:"rightangle",EQUILATERAL:"equilateral",TEXT:"text",SELECT:"delete"},selectColor:"rgba(255, 69, 0, 0.68)",selecteWidth:5,predefineColors:["#ff4500","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585","rgba(255, 69, 0, 0.68)","rgb(255, 120, 0)","hsv(51, 100, 98)","hsva(120, 40, 94, 0.5)","hsl(181, 100%, 37%)","hsla(209, 100%, 56%, 0.73)","#c7158577"]}},computed:{selected:function(){var e=this;return function(t){return e.drawType===t}}},methods:{init:function(){var e=this,t=this.canvas=new i["fabric"].Canvas(this.$refs.canvasElement,{isDrawingMode:!0,skipTargetFind:!0,selectable:!1,selection:!1});i["fabric"].Object.prototype.transparentCorners=!0,t.freeDrawingBrush&&(t.freeDrawingBrush.color=this.selectColor,t.freeDrawingBrush.width=this.selecteWidth),console.log("canvas",t),t.on("mouse:down",(function(t){var s=t.e,a=t.target;t.subTargets;e.mouseDown=!0,e.mouseFrom=e.transformMouse(s.offsetX,s.offsetY),console.log("mouse:down",s,a),console.log(e.canvasObject)})),t.on("mouse:up",(function(t){var s=t.e,a=t.target,r=t.subTargets;e.mouseDown=!1,e.mouseTo=e.transformMouse(s.offsetX,s.offsetY),console.log("mouse:up",s,a,r),e.canvasObject=null})),t.on("mouse:move",(function(t){var s=t.e;t.target,t.subTargets;e.mouseDown&&(e.mouseTo=e.transformMouse(s.offsetX,s.offsetY),e.startDrawing())})),t.on("mouse:move:before",(function(e){e.e,e.target,e.subTargets})),t.on("object:selected",(function(e){var t=e.e,s=e.target,a=e.subTargets;console.log("object:selected",t,s,a)}))},transformMouse:function(e,t){return{x:e,y:t}},startDrawing:function(){switch(this.canvasObject&&this.canvas.remove(this.canvasObject),this.drawType){case this.DrawType.LINE:this.canvasObject=new i["fabric"].Line([this.mouseFrom.x,this.mouseFrom.y,this.mouseTo.x,this.mouseTo.y],{stroke:this.selectColor,strokeWidth:this.selecteWidth,strokeLineJoin:"round"});break;case this.DrawType.DOTTEDLINE:this.canvasObject=new i["fabric"].Line([this.mouseFrom.x,this.mouseFrom.y,this.mouseTo.x,this.mouseTo.y],{strokeDashArray:[this.selecteWidth,this.selecteWidth],stroke:this.selectColor,strokeWidth:this.selecteWidth,strokeLineJoin:"round"});break;case this.DrawType.ARROW:this.canvasObject=new i["fabric"].Path(this.drawArrow(this.mouseFrom.x,this.mouseFrom.y,this.mouseTo.x,this.mouseTo.y,30,30),{fill:"rgba(255, 255, 255, 0)",stroke:this.selectColor,strokeWidth:this.selecteWidth});break;case this.DrawType.CIRCLE:var e=Math.sqrt((this.mouseTo.x-this.mouseFrom.x)*(this.mouseTo.x-this.mouseFrom.x)+(this.mouseTo.y-this.mouseFrom.y)*(this.mouseTo.y-this.mouseFrom.y))/2;this.canvasObject=new i["fabric"].Circle({left:this.mouseFrom.x,top:this.mouseFrom.y,fill:"rgba(255, 255, 255, 0)",radius:e,stroke:this.selectColor,strokeWidth:this.selecteWidth});break;case this.DrawType.ELLIPSE:this.canvasObject=new i["fabric"].Ellipse({left:this.mouseFrom.x,top:this.mouseFrom.y,fill:"rgba(255, 255, 255, 0)",originX:"center",originY:"center",rx:Math.abs(this.mouseFrom.x-this.mouseTo.x),ry:Math.abs(this.mouseFrom.y-this.mouseTo.y),stroke:this.selectColor,strokeWidth:this.selecteWidth});break;case this.DrawType.SQUARE:this.canvasObject=new i["fabric"].Rect({left:this.mouseFrom.x,top:this.mouseFrom.y,fill:"rgba(255, 255, 255, 0)",width:this.mouseTo.x-this.mouseFrom.x,height:this.mouseTo.y-this.mouseFrom.y,stroke:this.selectColor,strokeWidth:this.selecteWidth,strokeDashArray:[this.selecteWidth,this.selecteWidth]});break;case this.DrawType.RIGHTANGLE:var t="M "+this.mouseFrom.x+" "+this.mouseFrom.y+" L "+this.mouseFrom.x+" "+this.mouseTo.y+" L "+this.mouseTo.x+" "+this.mouseTo.y+" z";this.canvasObject=new i["fabric"].Path(t,{left:this.mouseFrom.x,top:this.mouseFrom.y,fill:"rgba(255, 255, 255, 0)",stroke:this.selectColor,strokeWidth:this.selecteWidth});break;case this.DrawType.EQUILATERAL:var s=this.mouseTo.y-this.mouseFrom.y;this.canvasObject=new i["fabric"].Triangle({left:this.mouseFrom.x,top:this.mouseFrom.y,width:Math.sqrt(Math.pow(s,2)+Math.pow(s/2,2)),height:s,fill:"rgba(255, 255, 255, 0)",stroke:this.selectColor,strokeWidth:this.selecteWidth});break;case this.DrawType.TEXT:this.canvasObject=new i["fabric"].Textbox("",{left:this.mouseFrom.x,top:this.mouseFrom.y,fill:this.selectColor,stroke:this.selectColor,strokeWidth:1,borderDashArray:[5,5],editingBorderColor:"rgba(64, 158, 255, .55)",selectionBackgroundColor:"rgba(64, 158, 255, 1)"});break}this.canvasObject&&(this.canvas.add(this.canvasObject),this.canvasObject.drawType=this.drawType),this.selected(this.DrawType.TEXT)&&(this.canvasObject.enterEditing(),this.canvasObject.setActiveObject(this.canvasObject))},drawArrow:function(e,t,s,a,r,i){r="undefined"!=typeof r?r:30,i="undefined"!=typeof r?i:10;var o=180*Math.atan2(t-a,e-s)/Math.PI,c=(o+r)*Math.PI/180,n=(o-r)*Math.PI/180,h=i*Math.cos(c),l=i*Math.sin(c),u=i*Math.cos(n),d=i*Math.sin(n),m=e-h,T=t-l,w=" M "+e+" "+t;return w+=" L "+s+" "+a,m=s+h,T=a+l,w+=" M "+m+" "+T,w+=" L "+s+" "+a,m=s+u,T=a+d,w+=" L "+m+" "+T,w},drawTypeChange:function(e){switch(this.drawType=e,this.canvasObject=null,e){case this.DrawType.PEN:this.canvas.isDrawingMode=!0;break;case this.DrawType.SELECT:this.canvas.isDrawingMode=!1,this.canvas.selection=!1,this.canvas.skipTargetFind=!1,this.canvas.selectable=!0;break;default:this.canvas.isDrawingMode=!1,this.canvas.skipTargetFind=!0,this.canvas.selection=!1;break}this.startDrawing()},colorPickerChangeHandler:function(e){this.canvas.freeDrawingBrush.color=this.selectColor},widthSliderChangeHandler:function(e){this.canvas.freeDrawingBrush.width=this.selecteWidth},reset:function(){this.clear()},clear:function(){this.canvas.clear()}},mounted:function(){var e=this;this.init(),document.addEventListener("keydown",(function(t){var s=window.event?t.keyCode:t.which;8==s&&e.canvas.remove(e.canvas.getActiveObject())}))}},c=o,n=(s("5834"),s("2877")),h=Object(n["a"])(c,a,r,!1,null,"99b22d62",null);t["default"]=h.exports},5834:function(e,t,s){"use strict";var a=s("72d8"),r=s.n(a);r.a},"72d8":function(e,t,s){}}]);