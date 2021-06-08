function ClassrommMgr() { }
var uuabc;
var callbackResLoaded;
ClassrommMgr.callbackInResLoaded = function (total) {
    console.log('ClassrommMgr.callbackInResLoaded ');
    if ('callbackResLoaded' in ucPlugin) {
        console.log("'callbackResLoaded' in ucPlugin");
        ucPlugin.callbackResLoaded(total, () => {
            if (uuabc && uuabc.callbackResLoaded) {
                uuabc.callbackResLoaded(total);
                classRoomIsloaded = true
            }

            if (null != callbackResLoaded) {
                callbackResLoaded(total);
                classRoomIsloaded = true
            }
        });
    } else {
        if (uuabc && uuabc.callbackResLoaded) {
            uuabc.callbackResLoaded(total);
            classRoomIsloaded = true
        }

        if (null != callbackResLoaded) {
            callbackResLoaded(total);
            classRoomIsloaded = true
        }
    }
};


var callbackPageLoaded;
ClassrommMgr.callbackInPageLoaded = function (single, action) {
    console.log("action = " + action);
    if (uuabc && uuabc.callbackPageLoaded) {
        uuabc.callbackPageLoaded(single, action)
    }

    if (null != callbackPageLoaded) {
        callbackPageLoaded(single, action)
    }

    if ('callbackPageLoaded' in ucPlugin) {
        ucPlugin.callbackPageLoaded(single, action);
    }
};

// 回掉ios 
// 传入音频视频参数  
// 课件内音频视频静音
// params {
//     status: 1 // play 2 // pause, url, time, id
// }
var callbackInSoundPlay;
ClassrommMgr.callbackInSoundPlay = function (params) {
    console.log("callbackInSoundPlay params = " + params);
    if (uuabc && uuabc.callbackInSoundPlay) {
        uuabc.callbackInSoundPlay(params)
    }

    if (!!callbackPageLoaded) {
        callbackInSoundPlay(params)
    }

    if ('callbackInSoundPlay' in ucPlugin) {
        ucPlugin.callbackInSoundPlay(params);
    }
};



var callbackSendMsg;
function callbackInSendMsg(msg) {
    if ('callbackSendMsg' in ucPlugin) {
        ucPlugin.callbackSendMsg(msg);
    } else {
        if (uuabc && uuabc.callbackSendMsg) {
            uuabc.callbackSendMsg(msg)
        }

        if (null != callbackSendMsg) {
            callbackSendMsg(msg)
        }
    }
}
var callbackSendInfo;
function callbackInSendInfo(msg) {
    if (uuabc && uuabc.callbackSendInfo) {
        uuabc.callbackSendInfo(msg)
    }

    if (null != callbackSendInfo) {
        callbackSendInfo(msg)
    }

    if ('callbackSendInfo' in ucPlugin) {
        ucPlugin.callbackSendInfo(msg);
    }
}
var mouseClick;
ClassrommMgr.mouseClickIn = function (tStageX, tStageY) {
    if (uuabc && uuabc.mouseClick) {
        uuabc.mouseClick(tStageX, tStageY)
    }

    if (null != mouseClick) {
        mouseClick(tStageX, tStageY)
    }

    if ('mouseClick' in ucPlugin) {
        ucPlugin.mouseClick(tStageX, tStageY)
    }
};
var mouseDown;
ClassrommMgr.mouseDownIn = function (tStageX, tStageY) {
    if (uuabc && uuabc.mouseDown) {
        uuabc.mouseDown(tStageX, tStageY)
    }

    if (null != mouseDown) {
        mouseDown(tStageX, tStageY)
    }

    if ('mouseDown' in ucPlugin) {
        ucPlugin.mouseDown(tStageX, tStageY);
    }
};
var mouseUp;
ClassrommMgr.mouseUpIn = function (tStageX, tStageY) {
    if (uuabc && uuabc.mouseUp) {
        uuabc.mouseUp(tStageX, tStageY)
    }

    if (null != mouseUp) {
        mouseUp(tStageX, tStageY)
    }

    if ('mouseUp' in ucPlugin) {
        ucPlugin.mouseUp(tStageX, tStageY);
    }
};
var mouseMove;
ClassrommMgr.mouseMoveIn = function (tStageX, tStageY) {
    if (uuabc && uuabc.mouseMove) {
        uuabc.mouseMove(tStageX, tStageY)
    }

    if (null != mouseMove) {
        mouseMove(tStageX, tStageY)
    }

    if ('mouseMove' in ucPlugin) {
        ucPlugin.mouseMove(tStageX, tStageY);
    }
};
function GlobalData() { }
GlobalData.handleStatus = 1;
GlobalData.userType = 2;
_isAuthority = true;
GlobalData.hasAuthority = function (enabled) {
    console.log("--> 学生互动授权启用");
    console.log("enabled = " + !!enabled);
    _isAuthority = !!enabled
};
Object.defineProperty(GlobalData, "isAuthority", {
    get: function () {
        return _isAuthority
    }
}); 
// 获取index.html相对路径
Object.defineProperty(GlobalData, "publicPath", {
    get: function () {
        return window.location.href.split('index.html')[0]
    }
});
// 获取index.html相对路径
Object.defineProperty(GlobalData, "origin", {
    get: function () {
        return window.location.origin
    }
});

(function () {
    function mouseEvent(type, evt) {
        var stageX = 0,
            stageY = 0;
        function addDistance(dom) {
            var offsetLeft = dom.offsetLeft;
            var offsetTop = dom.offsetTop;
            stageX += offsetLeft;
            stageY += offsetTop;
            if (dom.parentElement != mainBox) {
                addDistance(dom.parentElement)
            }
        }
        stageX = evt.offsetX;
        stageY = evt.offsetY;
        if (evt.target !== mainBox) {
            addDistance(evt.target)
        }
        switch (type) {
            case "click":
                ClassrommMgr.mouseClickIn(stageX, stageY);
                break;
            case "mousedown":
                ClassrommMgr.mouseDownIn(stageX, stageY);
                break;
            case "mouseup":
                ClassrommMgr.mouseUpIn(stageX, stageY);
                break;
            case "mousemove":
                ClassrommMgr.mouseMoveIn(stageX, stageY);
                break
        }
    }
    var mainBox = document.getElementById("box");
    mainBox.addEventListener("click",
        function (evt) {
            mouseEvent("click", evt)
        });
    mainBox.addEventListener("mousedown",
        function (evt) {
            mouseEvent("mousedown", evt)
        });
    mainBox.addEventListener("mouseup",
        function (evt) {
            mouseEvent("mouseup", evt)
        });
    mainBox.addEventListener("mousemove",
        function (evt) {
            mouseEvent("mousemove", evt)
        })
})();