(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e6294"],{9821:function(e,n,t){"use strict";t.r(n);var s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("el-main",{staticClass:"center"},[t("el-row",{attrs:{gutter:50}},[t("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[t("el-divider",{attrs:{"content-position":"left"}},[e._v("Session")]),t("el-form",{attrs:{"label-width":"80px"}},[t("el-form-item",{attrs:{label:"Session:"}},[t("el-input",{model:{value:e.userName,callback:function(n){e.userName=n},expression:"userName"}},[t("el-button",{attrs:{slot:"append",type:"primary",icon:"el-icon-user"},on:{click:e.joinSession},slot:"append"},[e._v("进入")])],1)],1)],1)],1),t("el-col",{staticClass:"center",attrs:{xs:24,sm:24,md:12}},[t("el-divider",{attrs:{"content-position":"left"}},[e._v("Local")]),t("canvas",{ref:"canvas",staticClass:"video-item"})],1)],1),t("el-row",{attrs:{gutter:50}},[t("el-col",{staticClass:"center",attrs:{span:6}},[t("el-divider",[e._v("Session")])],1)],1)],1)},o=[],i=(t("d3b7"),t("3d9c")),a=t("bc3a"),r=t.n(a),c="https://local.uuabc.com:4443",u="MY_SECRET",l=function(e){var n={method:"POST",url:c+"/api/sessions",data:JSON.stringify({customSessionId:e}),headers:{Authorization:"Basic "+btoa("OPENVIDUAPP:"+u),"Content-Type":"application/json"}};return console.log(">>>",n.method,n),new Promise((function(t,s){r.a.post(n).then((function(e){return t(e.id)})).catch((function(n){409===n.status?t(e):(console.warn("未连接到OpenVidu服务器。这可能是以下位置的证书错误 "+c),window.confirm("未连接到OpenVidu服务器。这可能是以下位置的证书错误"+c+'; 单击“确定”导航并接受它。如果没有显示证书警告，请检查OpenVidu服务器是否已在 "'+c+'"'))}))}))},d=function(e){return new Promise((function(n,t){r.a.post({method:"post",url:c+"/api/tokens",data:JSON.stringify({session:e}),headers:{Authorization:"Basic "+btoa("OPENVIDUAPP:"+u),"Content-Type":"application/json"}}).then((function(e){return n(e.id)})).catch((function(e){return t(e)}))}))},p={name:"HelloWorld",data:function(){return{userName:"SessionA3",OV:null,session:null}},destroyed:function(){this.leaveSession()},methods:{joinSession:function(){var e=this;this.OV=new i["OpenVidu"],this.session=this.OV.initSession(),this.session.on("streamCreated",(function(n){var t=n.stream;e.session.subscribe(t,"subscriber")})),this.getToken(this.userName).then((function(n){e.session.connect(n).then((function(){var n=e.OV.initPublisher("publisher");e.session.publish(n)})).catch((function(e){console.log("There was an error connecting to the session:",e.code,e.message)}))}))},leaveSession:function(){this.session&&this.session.disconnect()},getToken:function(e){return l(e).then((function(e){return d(e)}))}}},h=p,f=t("2877"),m=function(e){e.options.__source="src/guide/views/openvidu/HelloWorld.vue"},v=m,b=Object(f["a"])(h,s,o,!1,null,null,null);"function"===typeof v&&v(b);n["default"]=b.exports}}]);