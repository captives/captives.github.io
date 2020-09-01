(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01b10436"],{6107:function(t,e,i){},bab4:function(t,e,i){
/*!
 * Cropper.js v1.5.7
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2020-05-23T05:23:00.081Z
 */
(function(e,i){t.exports=i()})(0,(function(){"use strict";function t(e){return t="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function a(t,e,a){return e&&i(t.prototype,e),a&&i(t,a),t}function n(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function o(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function r(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?o(Object(i),!0).forEach((function(e){n(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function h(t){return s(t)||c(t)||l(t)||p()}function s(t){if(Array.isArray(t))return d(t)}function c(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function l(t,e){if(t){if("string"===typeof t)return d(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?d(t,e):void 0}}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,a=new Array(e);i<e;i++)a[i]=t[i];return a}function p(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u="undefined"!==typeof window&&"undefined"!==typeof window.document,m=u?window:{},g=!(!u||!m.document.documentElement)&&"ontouchstart"in m.document.documentElement,f=!!u&&"PointerEvent"in m,v="cropper",w="all",b="crop",y="move",x="zoom",M="e",C="w",D="s",k="n",B="ne",O="nw",T="se",E="sw",W="".concat(v,"-crop"),N="".concat(v,"-disabled"),H="".concat(v,"-hidden"),L="".concat(v,"-hide"),z="".concat(v,"-invisible"),Y="".concat(v,"-modal"),X="".concat(v,"-move"),R="".concat(v,"Action"),S="".concat(v,"Preview"),A="crop",j="move",I="none",P="crop",U="cropend",q="cropmove",$="cropstart",Q="dblclick",K=g?"touchstart":"mousedown",Z=g?"touchmove":"mousemove",J=g?"touchend touchcancel":"mouseup",G=f?"pointerdown":K,V=f?"pointermove":Z,F=f?"pointerup pointercancel":J,_="ready",tt="resize",et="wheel",it="zoom",at="image/jpeg",nt=/^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/,ot=/^data:/,rt=/^data:image\/jpeg;base64,/,ht=/^img|canvas$/i,st={viewMode:0,dragMode:A,initialAspectRatio:NaN,aspectRatio:NaN,data:null,preview:"",responsive:!0,restore:!0,checkCrossOrigin:!0,checkOrientation:!0,modal:!0,guides:!0,center:!0,highlight:!0,background:!0,autoCrop:!0,autoCropArea:.8,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,wheelZoomRatio:.1,cropBoxMovable:!0,cropBoxResizable:!0,toggleDragModeOnDblclick:!0,minCanvasWidth:0,minCanvasHeight:0,minCropBoxWidth:0,minCropBoxHeight:0,minContainerWidth:200,minContainerHeight:100,ready:null,cropstart:null,cropmove:null,cropend:null,crop:null,zoom:null},ct='<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>',lt=Number.isNaN||m.isNaN;function dt(t){return"number"===typeof t&&!lt(t)}var pt=function(t){return t>0&&t<1/0};function ut(t){return"undefined"===typeof t}function mt(e){return"object"===t(e)&&null!==e}var gt=Object.prototype.hasOwnProperty;function ft(t){if(!mt(t))return!1;try{var e=t.constructor,i=e.prototype;return e&&i&&gt.call(i,"isPrototypeOf")}catch(a){return!1}}function vt(t){return"function"===typeof t}var wt=Array.prototype.slice;function bt(t){return Array.from?Array.from(t):wt.call(t)}function yt(t,e){return t&&vt(e)&&(Array.isArray(t)||dt(t.length)?bt(t).forEach((function(i,a){e.call(t,i,a,t)})):mt(t)&&Object.keys(t).forEach((function(i){e.call(t,t[i],i,t)}))),t}var xt=Object.assign||function(t){for(var e=arguments.length,i=new Array(e>1?e-1:0),a=1;a<e;a++)i[a-1]=arguments[a];return mt(t)&&i.length>0&&i.forEach((function(e){mt(e)&&Object.keys(e).forEach((function(i){t[i]=e[i]}))})),t},Mt=/\.\d*(?:0|9){12}\d*$/;function Ct(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e11;return Mt.test(t)?Math.round(t*e)/e:t}var Dt=/^width|height|left|top|marginLeft|marginTop$/;function kt(t,e){var i=t.style;yt(e,(function(t,e){Dt.test(e)&&dt(t)&&(t="".concat(t,"px")),i[e]=t}))}function Bt(t,e){return t.classList?t.classList.contains(e):t.className.indexOf(e)>-1}function Ot(t,e){if(e)if(dt(t.length))yt(t,(function(t){Ot(t,e)}));else if(t.classList)t.classList.add(e);else{var i=t.className.trim();i?i.indexOf(e)<0&&(t.className="".concat(i," ").concat(e)):t.className=e}}function Tt(t,e){e&&(dt(t.length)?yt(t,(function(t){Tt(t,e)})):t.classList?t.classList.remove(e):t.className.indexOf(e)>=0&&(t.className=t.className.replace(e,"")))}function Et(t,e,i){e&&(dt(t.length)?yt(t,(function(t){Et(t,e,i)})):i?Ot(t,e):Tt(t,e))}var Wt=/([a-z\d])([A-Z])/g;function Nt(t){return t.replace(Wt,"$1-$2").toLowerCase()}function Ht(t,e){return mt(t[e])?t[e]:t.dataset?t.dataset[e]:t.getAttribute("data-".concat(Nt(e)))}function Lt(t,e,i){mt(i)?t[e]=i:t.dataset?t.dataset[e]=i:t.setAttribute("data-".concat(Nt(e)),i)}function zt(t,e){if(mt(t[e]))try{delete t[e]}catch(i){t[e]=void 0}else if(t.dataset)try{delete t.dataset[e]}catch(i){t.dataset[e]=void 0}else t.removeAttribute("data-".concat(Nt(e)))}var Yt=/\s\s*/,Xt=function(){var t=!1;if(u){var e=!1,i=function(){},a=Object.defineProperty({},"once",{get:function(){return t=!0,e},set:function(t){e=t}});m.addEventListener("test",i,a),m.removeEventListener("test",i,a)}return t}();function Rt(t,e,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},n=i;e.trim().split(Yt).forEach((function(e){if(!Xt){var o=t.listeners;o&&o[e]&&o[e][i]&&(n=o[e][i],delete o[e][i],0===Object.keys(o[e]).length&&delete o[e],0===Object.keys(o).length&&delete t.listeners)}t.removeEventListener(e,n,a)}))}function St(t,e,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},n=i;e.trim().split(Yt).forEach((function(e){if(a.once&&!Xt){var o=t.listeners,r=void 0===o?{}:o;n=function(){delete r[e][i],t.removeEventListener(e,n,a);for(var o=arguments.length,h=new Array(o),s=0;s<o;s++)h[s]=arguments[s];i.apply(t,h)},r[e]||(r[e]={}),r[e][i]&&t.removeEventListener(e,r[e][i],a),r[e][i]=n,t.listeners=r}t.addEventListener(e,n,a)}))}function At(t,e,i){var a;return vt(Event)&&vt(CustomEvent)?a=new CustomEvent(e,{detail:i,bubbles:!0,cancelable:!0}):(a=document.createEvent("CustomEvent"),a.initCustomEvent(e,!0,!0,i)),t.dispatchEvent(a)}function jt(t){var e=t.getBoundingClientRect();return{left:e.left+(window.pageXOffset-document.documentElement.clientLeft),top:e.top+(window.pageYOffset-document.documentElement.clientTop)}}var It=m.location,Pt=/^(\w+:)\/\/([^:/?#]*):?(\d*)/i;function Ut(t){var e=t.match(Pt);return null!==e&&(e[1]!==It.protocol||e[2]!==It.hostname||e[3]!==It.port)}function qt(t){var e="timestamp=".concat((new Date).getTime());return t+(-1===t.indexOf("?")?"?":"&")+e}function $t(t){var e=t.rotate,i=t.scaleX,a=t.scaleY,n=t.translateX,o=t.translateY,r=[];dt(n)&&0!==n&&r.push("translateX(".concat(n,"px)")),dt(o)&&0!==o&&r.push("translateY(".concat(o,"px)")),dt(e)&&0!==e&&r.push("rotate(".concat(e,"deg)")),dt(i)&&1!==i&&r.push("scaleX(".concat(i,")")),dt(a)&&1!==a&&r.push("scaleY(".concat(a,")"));var h=r.length?r.join(" "):"none";return{WebkitTransform:h,msTransform:h,transform:h}}function Qt(t){var e=r({},t),i=[];return yt(t,(function(t,a){delete e[a],yt(e,(function(e){var a=Math.abs(t.startX-e.startX),n=Math.abs(t.startY-e.startY),o=Math.abs(t.endX-e.endX),r=Math.abs(t.endY-e.endY),h=Math.sqrt(a*a+n*n),s=Math.sqrt(o*o+r*r),c=(s-h)/h;i.push(c)}))})),i.sort((function(t,e){return Math.abs(t)<Math.abs(e)})),i[0]}function Kt(t,e){var i=t.pageX,a=t.pageY,n={endX:i,endY:a};return e?n:r({startX:i,startY:a},n)}function Zt(t){var e=0,i=0,a=0;return yt(t,(function(t){var n=t.startX,o=t.startY;e+=n,i+=o,a+=1})),e/=a,i/=a,{pageX:e,pageY:i}}function Jt(t){var e=t.aspectRatio,i=t.height,a=t.width,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"contain",o=pt(a),r=pt(i);if(o&&r){var h=i*e;"contain"===n&&h>a||"cover"===n&&h<a?i=a/e:a=i*e}else o?i=a/e:r&&(a=i*e);return{width:a,height:i}}function Gt(t){var e=t.width,i=t.height,a=t.degree;if(a=Math.abs(a)%180,90===a)return{width:i,height:e};var n=a%90*Math.PI/180,o=Math.sin(n),r=Math.cos(n),h=e*r+i*o,s=e*o+i*r;return a>90?{width:s,height:h}:{width:h,height:s}}function Vt(t,e,i,a){var n=e.aspectRatio,o=e.naturalWidth,r=e.naturalHeight,s=e.rotate,c=void 0===s?0:s,l=e.scaleX,d=void 0===l?1:l,p=e.scaleY,u=void 0===p?1:p,m=i.aspectRatio,g=i.naturalWidth,f=i.naturalHeight,v=a.fillColor,w=void 0===v?"transparent":v,b=a.imageSmoothingEnabled,y=void 0===b||b,x=a.imageSmoothingQuality,M=void 0===x?"low":x,C=a.maxWidth,D=void 0===C?1/0:C,k=a.maxHeight,B=void 0===k?1/0:k,O=a.minWidth,T=void 0===O?0:O,E=a.minHeight,W=void 0===E?0:E,N=document.createElement("canvas"),H=N.getContext("2d"),L=Jt({aspectRatio:m,width:D,height:B}),z=Jt({aspectRatio:m,width:T,height:W},"cover"),Y=Math.min(L.width,Math.max(z.width,g)),X=Math.min(L.height,Math.max(z.height,f)),R=Jt({aspectRatio:n,width:D,height:B}),S=Jt({aspectRatio:n,width:T,height:W},"cover"),A=Math.min(R.width,Math.max(S.width,o)),j=Math.min(R.height,Math.max(S.height,r)),I=[-A/2,-j/2,A,j];return N.width=Ct(Y),N.height=Ct(X),H.fillStyle=w,H.fillRect(0,0,Y,X),H.save(),H.translate(Y/2,X/2),H.rotate(c*Math.PI/180),H.scale(d,u),H.imageSmoothingEnabled=y,H.imageSmoothingQuality=M,H.drawImage.apply(H,[t].concat(h(I.map((function(t){return Math.floor(Ct(t))}))))),H.restore(),N}var Ft=String.fromCharCode;function _t(t,e,i){var a="";i+=e;for(var n=e;n<i;n+=1)a+=Ft(t.getUint8(n));return a}var te=/^data:.*,/;function ee(t){var e=t.replace(te,""),i=atob(e),a=new ArrayBuffer(i.length),n=new Uint8Array(a);return yt(n,(function(t,e){n[e]=i.charCodeAt(e)})),a}function ie(t,e){var i=[],a=8192,n=new Uint8Array(t);while(n.length>0)i.push(Ft.apply(null,bt(n.subarray(0,a)))),n=n.subarray(a);return"data:".concat(e,";base64,").concat(btoa(i.join("")))}function ae(t){var e,i=new DataView(t);try{var a,n,o;if(255===i.getUint8(0)&&216===i.getUint8(1)){var r=i.byteLength,h=2;while(h+1<r){if(255===i.getUint8(h)&&225===i.getUint8(h+1)){n=h;break}h+=1}}if(n){var s=n+4,c=n+10;if("Exif"===_t(i,s,4)){var l=i.getUint16(c);if(a=18761===l,(a||19789===l)&&42===i.getUint16(c+2,a)){var d=i.getUint32(c+4,a);d>=8&&(o=c+d)}}}if(o){var p,u,m=i.getUint16(o,a);for(u=0;u<m;u+=1)if(p=o+12*u+2,274===i.getUint16(p,a)){p+=8,e=i.getUint16(p,a),i.setUint16(p,1,a);break}}}catch(g){e=1}return e}function ne(t){var e=0,i=1,a=1;switch(t){case 2:i=-1;break;case 3:e=-180;break;case 4:a=-1;break;case 5:e=90,a=-1;break;case 6:e=90;break;case 7:e=90,i=-1;break;case 8:e=-90;break}return{rotate:e,scaleX:i,scaleY:a}}var oe={render:function(){this.initContainer(),this.initCanvas(),this.initCropBox(),this.renderCanvas(),this.cropped&&this.renderCropBox()},initContainer:function(){var t=this.element,e=this.options,i=this.container,a=this.cropper;Ot(a,H),Tt(t,H);var n={width:Math.max(i.offsetWidth,Number(e.minContainerWidth)||200),height:Math.max(i.offsetHeight,Number(e.minContainerHeight)||100)};this.containerData=n,kt(a,{width:n.width,height:n.height}),Ot(t,H),Tt(a,H)},initCanvas:function(){var t=this.containerData,e=this.imageData,i=this.options.viewMode,a=Math.abs(e.rotate)%180===90,n=a?e.naturalHeight:e.naturalWidth,o=a?e.naturalWidth:e.naturalHeight,r=n/o,h=t.width,s=t.height;t.height*r>t.width?3===i?h=t.height*r:s=t.width/r:3===i?s=t.width/r:h=t.height*r;var c={aspectRatio:r,naturalWidth:n,naturalHeight:o,width:h,height:s};c.left=(t.width-h)/2,c.top=(t.height-s)/2,c.oldLeft=c.left,c.oldTop=c.top,this.canvasData=c,this.limited=1===i||2===i,this.limitCanvas(!0,!0),this.initialImageData=xt({},e),this.initialCanvasData=xt({},c)},limitCanvas:function(t,e){var i=this.options,a=this.containerData,n=this.canvasData,o=this.cropBoxData,r=i.viewMode,h=n.aspectRatio,s=this.cropped&&o;if(t){var c=Number(i.minCanvasWidth)||0,l=Number(i.minCanvasHeight)||0;r>1?(c=Math.max(c,a.width),l=Math.max(l,a.height),3===r&&(l*h>c?c=l*h:l=c/h)):r>0&&(c?c=Math.max(c,s?o.width:0):l?l=Math.max(l,s?o.height:0):s&&(c=o.width,l=o.height,l*h>c?c=l*h:l=c/h));var d=Jt({aspectRatio:h,width:c,height:l});c=d.width,l=d.height,n.minWidth=c,n.minHeight=l,n.maxWidth=1/0,n.maxHeight=1/0}if(e)if(r>(s?0:1)){var p=a.width-n.width,u=a.height-n.height;n.minLeft=Math.min(0,p),n.minTop=Math.min(0,u),n.maxLeft=Math.max(0,p),n.maxTop=Math.max(0,u),s&&this.limited&&(n.minLeft=Math.min(o.left,o.left+(o.width-n.width)),n.minTop=Math.min(o.top,o.top+(o.height-n.height)),n.maxLeft=o.left,n.maxTop=o.top,2===r&&(n.width>=a.width&&(n.minLeft=Math.min(0,p),n.maxLeft=Math.max(0,p)),n.height>=a.height&&(n.minTop=Math.min(0,u),n.maxTop=Math.max(0,u))))}else n.minLeft=-n.width,n.minTop=-n.height,n.maxLeft=a.width,n.maxTop=a.height},renderCanvas:function(t,e){var i=this.canvasData,a=this.imageData;if(e){var n=Gt({width:a.naturalWidth*Math.abs(a.scaleX||1),height:a.naturalHeight*Math.abs(a.scaleY||1),degree:a.rotate||0}),o=n.width,r=n.height,h=i.width*(o/i.naturalWidth),s=i.height*(r/i.naturalHeight);i.left-=(h-i.width)/2,i.top-=(s-i.height)/2,i.width=h,i.height=s,i.aspectRatio=o/r,i.naturalWidth=o,i.naturalHeight=r,this.limitCanvas(!0,!1)}(i.width>i.maxWidth||i.width<i.minWidth)&&(i.left=i.oldLeft),(i.height>i.maxHeight||i.height<i.minHeight)&&(i.top=i.oldTop),i.width=Math.min(Math.max(i.width,i.minWidth),i.maxWidth),i.height=Math.min(Math.max(i.height,i.minHeight),i.maxHeight),this.limitCanvas(!1,!0),i.left=Math.min(Math.max(i.left,i.minLeft),i.maxLeft),i.top=Math.min(Math.max(i.top,i.minTop),i.maxTop),i.oldLeft=i.left,i.oldTop=i.top,kt(this.canvas,xt({width:i.width,height:i.height},$t({translateX:i.left,translateY:i.top}))),this.renderImage(t),this.cropped&&this.limited&&this.limitCropBox(!0,!0)},renderImage:function(t){var e=this.canvasData,i=this.imageData,a=i.naturalWidth*(e.width/e.naturalWidth),n=i.naturalHeight*(e.height/e.naturalHeight);xt(i,{width:a,height:n,left:(e.width-a)/2,top:(e.height-n)/2}),kt(this.image,xt({width:i.width,height:i.height},$t(xt({translateX:i.left,translateY:i.top},i)))),t&&this.output()},initCropBox:function(){var t=this.options,e=this.canvasData,i=t.aspectRatio||t.initialAspectRatio,a=Number(t.autoCropArea)||.8,n={width:e.width,height:e.height};i&&(e.height*i>e.width?n.height=n.width/i:n.width=n.height*i),this.cropBoxData=n,this.limitCropBox(!0,!0),n.width=Math.min(Math.max(n.width,n.minWidth),n.maxWidth),n.height=Math.min(Math.max(n.height,n.minHeight),n.maxHeight),n.width=Math.max(n.minWidth,n.width*a),n.height=Math.max(n.minHeight,n.height*a),n.left=e.left+(e.width-n.width)/2,n.top=e.top+(e.height-n.height)/2,n.oldLeft=n.left,n.oldTop=n.top,this.initialCropBoxData=xt({},n)},limitCropBox:function(t,e){var i=this.options,a=this.containerData,n=this.canvasData,o=this.cropBoxData,r=this.limited,h=i.aspectRatio;if(t){var s=Number(i.minCropBoxWidth)||0,c=Number(i.minCropBoxHeight)||0,l=r?Math.min(a.width,n.width,n.width+n.left,a.width-n.left):a.width,d=r?Math.min(a.height,n.height,n.height+n.top,a.height-n.top):a.height;s=Math.min(s,a.width),c=Math.min(c,a.height),h&&(s&&c?c*h>s?c=s/h:s=c*h:s?c=s/h:c&&(s=c*h),d*h>l?d=l/h:l=d*h),o.minWidth=Math.min(s,l),o.minHeight=Math.min(c,d),o.maxWidth=l,o.maxHeight=d}e&&(r?(o.minLeft=Math.max(0,n.left),o.minTop=Math.max(0,n.top),o.maxLeft=Math.min(a.width,n.left+n.width)-o.width,o.maxTop=Math.min(a.height,n.top+n.height)-o.height):(o.minLeft=0,o.minTop=0,o.maxLeft=a.width-o.width,o.maxTop=a.height-o.height))},renderCropBox:function(){var t=this.options,e=this.containerData,i=this.cropBoxData;(i.width>i.maxWidth||i.width<i.minWidth)&&(i.left=i.oldLeft),(i.height>i.maxHeight||i.height<i.minHeight)&&(i.top=i.oldTop),i.width=Math.min(Math.max(i.width,i.minWidth),i.maxWidth),i.height=Math.min(Math.max(i.height,i.minHeight),i.maxHeight),this.limitCropBox(!1,!0),i.left=Math.min(Math.max(i.left,i.minLeft),i.maxLeft),i.top=Math.min(Math.max(i.top,i.minTop),i.maxTop),i.oldLeft=i.left,i.oldTop=i.top,t.movable&&t.cropBoxMovable&&Lt(this.face,R,i.width>=e.width&&i.height>=e.height?y:w),kt(this.cropBox,xt({width:i.width,height:i.height},$t({translateX:i.left,translateY:i.top}))),this.cropped&&this.limited&&this.limitCanvas(!0,!0),this.disabled||this.output()},output:function(){this.preview(),At(this.element,P,this.getData())}},re={initPreview:function(){var t=this.element,e=this.crossOrigin,i=this.options.preview,a=e?this.crossOriginUrl:this.url,n=t.alt||"The image to preview",o=document.createElement("img");if(e&&(o.crossOrigin=e),o.src=a,o.alt=n,this.viewBox.appendChild(o),this.viewBoxImage=o,i){var r=i;"string"===typeof i?r=t.ownerDocument.querySelectorAll(i):i.querySelector&&(r=[i]),this.previews=r,yt(r,(function(t){var i=document.createElement("img");Lt(t,S,{width:t.offsetWidth,height:t.offsetHeight,html:t.innerHTML}),e&&(i.crossOrigin=e),i.src=a,i.alt=n,i.style.cssText='display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"',t.innerHTML="",t.appendChild(i)}))}},resetPreview:function(){yt(this.previews,(function(t){var e=Ht(t,S);kt(t,{width:e.width,height:e.height}),t.innerHTML=e.html,zt(t,S)}))},preview:function(){var t=this.imageData,e=this.canvasData,i=this.cropBoxData,a=i.width,n=i.height,o=t.width,r=t.height,h=i.left-e.left-t.left,s=i.top-e.top-t.top;this.cropped&&!this.disabled&&(kt(this.viewBoxImage,xt({width:o,height:r},$t(xt({translateX:-h,translateY:-s},t)))),yt(this.previews,(function(e){var i=Ht(e,S),c=i.width,l=i.height,d=c,p=l,u=1;a&&(u=c/a,p=n*u),n&&p>l&&(u=l/n,d=a*u,p=l),kt(e,{width:d,height:p}),kt(e.getElementsByTagName("img")[0],xt({width:o*u,height:r*u},$t(xt({translateX:-h*u,translateY:-s*u},t))))})))}},he={bind:function(){var t=this.element,e=this.options,i=this.cropper;vt(e.cropstart)&&St(t,$,e.cropstart),vt(e.cropmove)&&St(t,q,e.cropmove),vt(e.cropend)&&St(t,U,e.cropend),vt(e.crop)&&St(t,P,e.crop),vt(e.zoom)&&St(t,it,e.zoom),St(i,G,this.onCropStart=this.cropStart.bind(this)),e.zoomable&&e.zoomOnWheel&&St(i,et,this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),e.toggleDragModeOnDblclick&&St(i,Q,this.onDblclick=this.dblclick.bind(this)),St(t.ownerDocument,V,this.onCropMove=this.cropMove.bind(this)),St(t.ownerDocument,F,this.onCropEnd=this.cropEnd.bind(this)),e.responsive&&St(window,tt,this.onResize=this.resize.bind(this))},unbind:function(){var t=this.element,e=this.options,i=this.cropper;vt(e.cropstart)&&Rt(t,$,e.cropstart),vt(e.cropmove)&&Rt(t,q,e.cropmove),vt(e.cropend)&&Rt(t,U,e.cropend),vt(e.crop)&&Rt(t,P,e.crop),vt(e.zoom)&&Rt(t,it,e.zoom),Rt(i,G,this.onCropStart),e.zoomable&&e.zoomOnWheel&&Rt(i,et,this.onWheel,{passive:!1,capture:!0}),e.toggleDragModeOnDblclick&&Rt(i,Q,this.onDblclick),Rt(t.ownerDocument,V,this.onCropMove),Rt(t.ownerDocument,F,this.onCropEnd),e.responsive&&Rt(window,tt,this.onResize)}},se={resize:function(){if(!this.disabled){var t,e,i=this.options,a=this.container,n=this.containerData,o=a.offsetWidth/n.width;if(1!==o||a.offsetHeight!==n.height)i.restore&&(t=this.getCanvasData(),e=this.getCropBoxData()),this.render(),i.restore&&(this.setCanvasData(yt(t,(function(e,i){t[i]=e*o}))),this.setCropBoxData(yt(e,(function(t,i){e[i]=t*o}))))}},dblclick:function(){this.disabled||this.options.dragMode===I||this.setDragMode(Bt(this.dragBox,W)?j:A)},wheel:function(t){var e=this,i=Number(this.options.wheelZoomRatio)||.1,a=1;this.disabled||(t.preventDefault(),this.wheeling||(this.wheeling=!0,setTimeout((function(){e.wheeling=!1}),50),t.deltaY?a=t.deltaY>0?1:-1:t.wheelDelta?a=-t.wheelDelta/120:t.detail&&(a=t.detail>0?1:-1),this.zoom(-a*i,t)))},cropStart:function(t){var e=t.buttons,i=t.button;if(!(this.disabled||("mousedown"===t.type||"pointerdown"===t.type&&"mouse"===t.pointerType)&&(dt(e)&&1!==e||dt(i)&&0!==i||t.ctrlKey))){var a,n=this.options,o=this.pointers;t.changedTouches?yt(t.changedTouches,(function(t){o[t.identifier]=Kt(t)})):o[t.pointerId||0]=Kt(t),a=Object.keys(o).length>1&&n.zoomable&&n.zoomOnTouch?x:Ht(t.target,R),nt.test(a)&&!1!==At(this.element,$,{originalEvent:t,action:a})&&(t.preventDefault(),this.action=a,this.cropping=!1,a===b&&(this.cropping=!0,Ot(this.dragBox,Y)))}},cropMove:function(t){var e=this.action;if(!this.disabled&&e){var i=this.pointers;t.preventDefault(),!1!==At(this.element,q,{originalEvent:t,action:e})&&(t.changedTouches?yt(t.changedTouches,(function(t){xt(i[t.identifier]||{},Kt(t,!0))})):xt(i[t.pointerId||0]||{},Kt(t,!0)),this.change(t))}},cropEnd:function(t){if(!this.disabled){var e=this.action,i=this.pointers;t.changedTouches?yt(t.changedTouches,(function(t){delete i[t.identifier]})):delete i[t.pointerId||0],e&&(t.preventDefault(),Object.keys(i).length||(this.action=""),this.cropping&&(this.cropping=!1,Et(this.dragBox,Y,this.cropped&&this.options.modal)),At(this.element,U,{originalEvent:t,action:e}))}}},ce={change:function(t){var e,i=this.options,a=this.canvasData,n=this.containerData,o=this.cropBoxData,r=this.pointers,h=this.action,s=i.aspectRatio,c=o.left,l=o.top,d=o.width,p=o.height,u=c+d,m=l+p,g=0,f=0,v=n.width,W=n.height,N=!0;!s&&t.shiftKey&&(s=d&&p?d/p:1),this.limited&&(g=o.minLeft,f=o.minTop,v=g+Math.min(n.width,a.width,a.left+a.width),W=f+Math.min(n.height,a.height,a.top+a.height));var L=r[Object.keys(r)[0]],z={x:L.endX-L.startX,y:L.endY-L.startY},Y=function(t){switch(t){case M:u+z.x>v&&(z.x=v-u);break;case C:c+z.x<g&&(z.x=g-c);break;case k:l+z.y<f&&(z.y=f-l);break;case D:m+z.y>W&&(z.y=W-m);break}};switch(h){case w:c+=z.x,l+=z.y;break;case M:if(z.x>=0&&(u>=v||s&&(l<=f||m>=W))){N=!1;break}Y(M),d+=z.x,d<0&&(h=C,d=-d,c-=d),s&&(p=d/s,l+=(o.height-p)/2);break;case k:if(z.y<=0&&(l<=f||s&&(c<=g||u>=v))){N=!1;break}Y(k),p-=z.y,l+=z.y,p<0&&(h=D,p=-p,l-=p),s&&(d=p*s,c+=(o.width-d)/2);break;case C:if(z.x<=0&&(c<=g||s&&(l<=f||m>=W))){N=!1;break}Y(C),d-=z.x,c+=z.x,d<0&&(h=M,d=-d,c-=d),s&&(p=d/s,l+=(o.height-p)/2);break;case D:if(z.y>=0&&(m>=W||s&&(c<=g||u>=v))){N=!1;break}Y(D),p+=z.y,p<0&&(h=k,p=-p,l-=p),s&&(d=p*s,c+=(o.width-d)/2);break;case B:if(s){if(z.y<=0&&(l<=f||u>=v)){N=!1;break}Y(k),p-=z.y,l+=z.y,d=p*s}else Y(k),Y(M),z.x>=0?u<v?d+=z.x:z.y<=0&&l<=f&&(N=!1):d+=z.x,z.y<=0?l>f&&(p-=z.y,l+=z.y):(p-=z.y,l+=z.y);d<0&&p<0?(h=E,p=-p,d=-d,l-=p,c-=d):d<0?(h=O,d=-d,c-=d):p<0&&(h=T,p=-p,l-=p);break;case O:if(s){if(z.y<=0&&(l<=f||c<=g)){N=!1;break}Y(k),p-=z.y,l+=z.y,d=p*s,c+=o.width-d}else Y(k),Y(C),z.x<=0?c>g?(d-=z.x,c+=z.x):z.y<=0&&l<=f&&(N=!1):(d-=z.x,c+=z.x),z.y<=0?l>f&&(p-=z.y,l+=z.y):(p-=z.y,l+=z.y);d<0&&p<0?(h=T,p=-p,d=-d,l-=p,c-=d):d<0?(h=B,d=-d,c-=d):p<0&&(h=E,p=-p,l-=p);break;case E:if(s){if(z.x<=0&&(c<=g||m>=W)){N=!1;break}Y(C),d-=z.x,c+=z.x,p=d/s}else Y(D),Y(C),z.x<=0?c>g?(d-=z.x,c+=z.x):z.y>=0&&m>=W&&(N=!1):(d-=z.x,c+=z.x),z.y>=0?m<W&&(p+=z.y):p+=z.y;d<0&&p<0?(h=B,p=-p,d=-d,l-=p,c-=d):d<0?(h=T,d=-d,c-=d):p<0&&(h=O,p=-p,l-=p);break;case T:if(s){if(z.x>=0&&(u>=v||m>=W)){N=!1;break}Y(M),d+=z.x,p=d/s}else Y(D),Y(M),z.x>=0?u<v?d+=z.x:z.y>=0&&m>=W&&(N=!1):d+=z.x,z.y>=0?m<W&&(p+=z.y):p+=z.y;d<0&&p<0?(h=O,p=-p,d=-d,l-=p,c-=d):d<0?(h=E,d=-d,c-=d):p<0&&(h=B,p=-p,l-=p);break;case y:this.move(z.x,z.y),N=!1;break;case x:this.zoom(Qt(r),t),N=!1;break;case b:if(!z.x||!z.y){N=!1;break}e=jt(this.cropper),c=L.startX-e.left,l=L.startY-e.top,d=o.minWidth,p=o.minHeight,z.x>0?h=z.y>0?T:B:z.x<0&&(c-=d,h=z.y>0?E:O),z.y<0&&(l-=p),this.cropped||(Tt(this.cropBox,H),this.cropped=!0,this.limited&&this.limitCropBox(!0,!0));break}N&&(o.width=d,o.height=p,o.left=c,o.top=l,this.action=h,this.renderCropBox()),yt(r,(function(t){t.startX=t.endX,t.startY=t.endY}))}},le={crop:function(){return!this.ready||this.cropped||this.disabled||(this.cropped=!0,this.limitCropBox(!0,!0),this.options.modal&&Ot(this.dragBox,Y),Tt(this.cropBox,H),this.setCropBoxData(this.initialCropBoxData)),this},reset:function(){return this.ready&&!this.disabled&&(this.imageData=xt({},this.initialImageData),this.canvasData=xt({},this.initialCanvasData),this.cropBoxData=xt({},this.initialCropBoxData),this.renderCanvas(),this.cropped&&this.renderCropBox()),this},clear:function(){return this.cropped&&!this.disabled&&(xt(this.cropBoxData,{left:0,top:0,width:0,height:0}),this.cropped=!1,this.renderCropBox(),this.limitCanvas(!0,!0),this.renderCanvas(),Tt(this.dragBox,Y),Ot(this.cropBox,H)),this},replace:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return!this.disabled&&t&&(this.isImg&&(this.element.src=t),e?(this.url=t,this.image.src=t,this.ready&&(this.viewBoxImage.src=t,yt(this.previews,(function(e){e.getElementsByTagName("img")[0].src=t})))):(this.isImg&&(this.replaced=!0),this.options.data=null,this.uncreate(),this.load(t))),this},enable:function(){return this.ready&&this.disabled&&(this.disabled=!1,Tt(this.cropper,N)),this},disable:function(){return this.ready&&!this.disabled&&(this.disabled=!0,Ot(this.cropper,N)),this},destroy:function(){var t=this.element;return t[v]?(t[v]=void 0,this.isImg&&this.replaced&&(t.src=this.originalUrl),this.uncreate(),this):this},move:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,i=this.canvasData,a=i.left,n=i.top;return this.moveTo(ut(t)?t:a+Number(t),ut(e)?e:n+Number(e))},moveTo:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,i=this.canvasData,a=!1;return t=Number(t),e=Number(e),this.ready&&!this.disabled&&this.options.movable&&(dt(t)&&(i.left=t,a=!0),dt(e)&&(i.top=e,a=!0),a&&this.renderCanvas(!0)),this},zoom:function(t,e){var i=this.canvasData;return t=Number(t),t=t<0?1/(1-t):1+t,this.zoomTo(i.width*t/i.naturalWidth,null,e)},zoomTo:function(t,e,i){var a=this.options,n=this.canvasData,o=n.width,r=n.height,h=n.naturalWidth,s=n.naturalHeight;if(t=Number(t),t>=0&&this.ready&&!this.disabled&&a.zoomable){var c=h*t,l=s*t;if(!1===At(this.element,it,{ratio:t,oldRatio:o/h,originalEvent:i}))return this;if(i){var d=this.pointers,p=jt(this.cropper),u=d&&Object.keys(d).length?Zt(d):{pageX:i.pageX,pageY:i.pageY};n.left-=(c-o)*((u.pageX-p.left-n.left)/o),n.top-=(l-r)*((u.pageY-p.top-n.top)/r)}else ft(e)&&dt(e.x)&&dt(e.y)?(n.left-=(c-o)*((e.x-n.left)/o),n.top-=(l-r)*((e.y-n.top)/r)):(n.left-=(c-o)/2,n.top-=(l-r)/2);n.width=c,n.height=l,this.renderCanvas(!0)}return this},rotate:function(t){return this.rotateTo((this.imageData.rotate||0)+Number(t))},rotateTo:function(t){return t=Number(t),dt(t)&&this.ready&&!this.disabled&&this.options.rotatable&&(this.imageData.rotate=t%360,this.renderCanvas(!0,!0)),this},scaleX:function(t){var e=this.imageData.scaleY;return this.scale(t,dt(e)?e:1)},scaleY:function(t){var e=this.imageData.scaleX;return this.scale(dt(e)?e:1,t)},scale:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,i=this.imageData,a=!1;return t=Number(t),e=Number(e),this.ready&&!this.disabled&&this.options.scalable&&(dt(t)&&(i.scaleX=t,a=!0),dt(e)&&(i.scaleY=e,a=!0),a&&this.renderCanvas(!0,!0)),this},getData:function(){var t,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i=this.options,a=this.imageData,n=this.canvasData,o=this.cropBoxData;if(this.ready&&this.cropped){t={x:o.left-n.left,y:o.top-n.top,width:o.width,height:o.height};var r=a.width/a.naturalWidth;if(yt(t,(function(e,i){t[i]=e/r})),e){var h=Math.round(t.y+t.height),s=Math.round(t.x+t.width);t.x=Math.round(t.x),t.y=Math.round(t.y),t.width=s-t.x,t.height=h-t.y}}else t={x:0,y:0,width:0,height:0};return i.rotatable&&(t.rotate=a.rotate||0),i.scalable&&(t.scaleX=a.scaleX||1,t.scaleY=a.scaleY||1),t},setData:function(t){var e=this.options,i=this.imageData,a=this.canvasData,n={};if(this.ready&&!this.disabled&&ft(t)){var o=!1;e.rotatable&&dt(t.rotate)&&t.rotate!==i.rotate&&(i.rotate=t.rotate,o=!0),e.scalable&&(dt(t.scaleX)&&t.scaleX!==i.scaleX&&(i.scaleX=t.scaleX,o=!0),dt(t.scaleY)&&t.scaleY!==i.scaleY&&(i.scaleY=t.scaleY,o=!0)),o&&this.renderCanvas(!0,!0);var r=i.width/i.naturalWidth;dt(t.x)&&(n.left=t.x*r+a.left),dt(t.y)&&(n.top=t.y*r+a.top),dt(t.width)&&(n.width=t.width*r),dt(t.height)&&(n.height=t.height*r),this.setCropBoxData(n)}return this},getContainerData:function(){return this.ready?xt({},this.containerData):{}},getImageData:function(){return this.sized?xt({},this.imageData):{}},getCanvasData:function(){var t=this.canvasData,e={};return this.ready&&yt(["left","top","width","height","naturalWidth","naturalHeight"],(function(i){e[i]=t[i]})),e},setCanvasData:function(t){var e=this.canvasData,i=e.aspectRatio;return this.ready&&!this.disabled&&ft(t)&&(dt(t.left)&&(e.left=t.left),dt(t.top)&&(e.top=t.top),dt(t.width)?(e.width=t.width,e.height=t.width/i):dt(t.height)&&(e.height=t.height,e.width=t.height*i),this.renderCanvas(!0)),this},getCropBoxData:function(){var t,e=this.cropBoxData;return this.ready&&this.cropped&&(t={left:e.left,top:e.top,width:e.width,height:e.height}),t||{}},setCropBoxData:function(t){var e,i,a=this.cropBoxData,n=this.options.aspectRatio;return this.ready&&this.cropped&&!this.disabled&&ft(t)&&(dt(t.left)&&(a.left=t.left),dt(t.top)&&(a.top=t.top),dt(t.width)&&t.width!==a.width&&(e=!0,a.width=t.width),dt(t.height)&&t.height!==a.height&&(i=!0,a.height=t.height),n&&(e?a.height=a.width/n:i&&(a.width=a.height*n)),this.renderCropBox()),this},getCroppedCanvas:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!this.ready||!window.HTMLCanvasElement)return null;var e=this.canvasData,i=Vt(this.image,this.imageData,e,t);if(!this.cropped)return i;var a=this.getData(),n=a.x,o=a.y,r=a.width,s=a.height,c=i.width/Math.floor(e.naturalWidth);1!==c&&(n*=c,o*=c,r*=c,s*=c);var l=r/s,d=Jt({aspectRatio:l,width:t.maxWidth||1/0,height:t.maxHeight||1/0}),p=Jt({aspectRatio:l,width:t.minWidth||0,height:t.minHeight||0},"cover"),u=Jt({aspectRatio:l,width:t.width||(1!==c?i.width:r),height:t.height||(1!==c?i.height:s)}),m=u.width,g=u.height;m=Math.min(d.width,Math.max(p.width,m)),g=Math.min(d.height,Math.max(p.height,g));var f=document.createElement("canvas"),v=f.getContext("2d");f.width=Ct(m),f.height=Ct(g),v.fillStyle=t.fillColor||"transparent",v.fillRect(0,0,m,g);var w=t.imageSmoothingEnabled,b=void 0===w||w,y=t.imageSmoothingQuality;v.imageSmoothingEnabled=b,y&&(v.imageSmoothingQuality=y);var x,M,C,D,k,B,O=i.width,T=i.height,E=n,W=o;E<=-r||E>O?(E=0,x=0,C=0,k=0):E<=0?(C=-E,E=0,x=Math.min(O,r+E),k=x):E<=O&&(C=0,x=Math.min(r,O-E),k=x),x<=0||W<=-s||W>T?(W=0,M=0,D=0,B=0):W<=0?(D=-W,W=0,M=Math.min(T,s+W),B=M):W<=T&&(D=0,M=Math.min(s,T-W),B=M);var N=[E,W,x,M];if(k>0&&B>0){var H=m/r;N.push(C*H,D*H,k*H,B*H)}return v.drawImage.apply(v,[i].concat(h(N.map((function(t){return Math.floor(Ct(t))}))))),f},setAspectRatio:function(t){var e=this.options;return this.disabled||ut(t)||(e.aspectRatio=Math.max(0,t)||NaN,this.ready&&(this.initCropBox(),this.cropped&&this.renderCropBox())),this},setDragMode:function(t){var e=this.options,i=this.dragBox,a=this.face;if(this.ready&&!this.disabled){var n=t===A,o=e.movable&&t===j;t=n||o?t:I,e.dragMode=t,Lt(i,R,t),Et(i,W,n),Et(i,X,o),e.cropBoxMovable||(Lt(a,R,t),Et(a,W,n),Et(a,X,o))}return this}},de=m.Cropper,pe=function(){function t(i){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(e(this,t),!i||!ht.test(i.tagName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=i,this.options=xt({},st,ft(a)&&a),this.cropped=!1,this.disabled=!1,this.pointers={},this.ready=!1,this.reloading=!1,this.replaced=!1,this.sized=!1,this.sizing=!1,this.init()}return a(t,[{key:"init",value:function(){var t,e=this.element,i=e.tagName.toLowerCase();if(!e[v]){if(e[v]=this,"img"===i){if(this.isImg=!0,t=e.getAttribute("src")||"",this.originalUrl=t,!t)return;t=e.src}else"canvas"===i&&window.HTMLCanvasElement&&(t=e.toDataURL());this.load(t)}}},{key:"load",value:function(t){var e=this;if(t){this.url=t,this.imageData={};var i=this.element,a=this.options;if(a.rotatable||a.scalable||(a.checkOrientation=!1),a.checkOrientation&&window.ArrayBuffer)if(ot.test(t))rt.test(t)?this.read(ee(t)):this.clone();else{var n=new XMLHttpRequest,o=this.clone.bind(this);this.reloading=!0,this.xhr=n,n.onabort=o,n.onerror=o,n.ontimeout=o,n.onprogress=function(){n.getResponseHeader("content-type")!==at&&n.abort()},n.onload=function(){e.read(n.response)},n.onloadend=function(){e.reloading=!1,e.xhr=null},a.checkCrossOrigin&&Ut(t)&&i.crossOrigin&&(t=qt(t)),n.open("GET",t),n.responseType="arraybuffer",n.withCredentials="use-credentials"===i.crossOrigin,n.send()}else this.clone()}}},{key:"read",value:function(t){var e=this.options,i=this.imageData,a=ae(t),n=0,o=1,r=1;if(a>1){this.url=ie(t,at);var h=ne(a);n=h.rotate,o=h.scaleX,r=h.scaleY}e.rotatable&&(i.rotate=n),e.scalable&&(i.scaleX=o,i.scaleY=r),this.clone()}},{key:"clone",value:function(){var t=this.element,e=this.url,i=t.crossOrigin,a=e;this.options.checkCrossOrigin&&Ut(e)&&(i||(i="anonymous"),a=qt(e)),this.crossOrigin=i,this.crossOriginUrl=a;var n=document.createElement("img");i&&(n.crossOrigin=i),n.src=a||e,n.alt=t.alt||"The image to crop",this.image=n,n.onload=this.start.bind(this),n.onerror=this.stop.bind(this),Ot(n,L),t.parentNode.insertBefore(n,t.nextSibling)}},{key:"start",value:function(){var t=this,e=this.image;e.onload=null,e.onerror=null,this.sizing=!0;var i=m.navigator&&/(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(m.navigator.userAgent),a=function(e,i){xt(t.imageData,{naturalWidth:e,naturalHeight:i,aspectRatio:e/i}),t.sizing=!1,t.sized=!0,t.build()};if(!e.naturalWidth||i){var n=document.createElement("img"),o=document.body||document.documentElement;this.sizingImage=n,n.onload=function(){a(n.width,n.height),i||o.removeChild(n)},n.src=e.src,i||(n.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",o.appendChild(n))}else a(e.naturalWidth,e.naturalHeight)}},{key:"stop",value:function(){var t=this.image;t.onload=null,t.onerror=null,t.parentNode.removeChild(t),this.image=null}},{key:"build",value:function(){if(this.sized&&!this.ready){var t=this.element,e=this.options,i=this.image,a=t.parentNode,n=document.createElement("div");n.innerHTML=ct;var o=n.querySelector(".".concat(v,"-container")),r=o.querySelector(".".concat(v,"-canvas")),h=o.querySelector(".".concat(v,"-drag-box")),s=o.querySelector(".".concat(v,"-crop-box")),c=s.querySelector(".".concat(v,"-face"));this.container=a,this.cropper=o,this.canvas=r,this.dragBox=h,this.cropBox=s,this.viewBox=o.querySelector(".".concat(v,"-view-box")),this.face=c,r.appendChild(i),Ot(t,H),a.insertBefore(o,t.nextSibling),this.isImg||Tt(i,L),this.initPreview(),this.bind(),e.initialAspectRatio=Math.max(0,e.initialAspectRatio)||NaN,e.aspectRatio=Math.max(0,e.aspectRatio)||NaN,e.viewMode=Math.max(0,Math.min(3,Math.round(e.viewMode)))||0,Ot(s,H),e.guides||Ot(s.getElementsByClassName("".concat(v,"-dashed")),H),e.center||Ot(s.getElementsByClassName("".concat(v,"-center")),H),e.background&&Ot(o,"".concat(v,"-bg")),e.highlight||Ot(c,z),e.cropBoxMovable&&(Ot(c,X),Lt(c,R,w)),e.cropBoxResizable||(Ot(s.getElementsByClassName("".concat(v,"-line")),H),Ot(s.getElementsByClassName("".concat(v,"-point")),H)),this.render(),this.ready=!0,this.setDragMode(e.dragMode),e.autoCrop&&this.crop(),this.setData(e.data),vt(e.ready)&&St(t,_,e.ready,{once:!0}),At(t,_)}}},{key:"unbuild",value:function(){this.ready&&(this.ready=!1,this.unbind(),this.resetPreview(),this.cropper.parentNode.removeChild(this.cropper),Tt(this.element,H))}},{key:"uncreate",value:function(){this.ready?(this.unbuild(),this.ready=!1,this.cropped=!1):this.sizing?(this.sizingImage.onload=null,this.sizing=!1,this.sized=!1):this.reloading?(this.xhr.onabort=null,this.xhr.abort()):this.image&&this.stop()}}],[{key:"noConflict",value:function(){return window.Cropper=de,t}},{key:"setDefaults",value:function(t){xt(st,ft(t)&&t)}}]),t}();return xt(pe.prototype,oe,re,he,se,ce,le),pe}))}}]);