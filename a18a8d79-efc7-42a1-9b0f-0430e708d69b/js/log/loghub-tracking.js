function createHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}
function queryGet(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
};

function AliLogTracker(host, project, logstore) {

    this.userId = queryGet('user_id');
    this.uuid = queryGet('room_id');
    this.name = queryGet('name');

    this.uri_;
    this.params_;
    this.sid = 0;
    this.debug = true;

    this.uri_ = '//' + project + '.' + host + '/logstores/' + logstore + '/track?APIVersion=0.6.0';
    this.params_ = new Array();
}

AliLogTracker._instance = null;
AliLogTracker.instance = function () {
    if (!this._instance) {
        this._instance = new AliLogTracker('log-global.aliyuncs.com', 'prd-frontend-uc-log', 'prd-frontend-uc-log');
    }
    return this._instance;
}

AliLogTracker.prototype.push = function (value) {
    if (!value) {
        return;
    }

    if (this.params_.length === 0) {
        this.params_.push([this.name, this.userId, "互动课件"].join(" "));
    }

    this.params_.push(value);

    if (this.params_.length > 0) {
        if (this.sid) {
            clearInterval(this.sid);
            this.sid = 0;
        }

        if (this.params_.length > 10) {
            this.send(this.uuid, this.params_.join('\n'));
        }

        this.sid = setInterval(() => {
            this.send(this.uuid, this.params_.join('\n'));
        }, 3000);
    }
}

AliLogTracker.prototype.send = function (key, value) {
    if (!key || !value) {
        return;
    }
    var httpRequest_ = createHttpRequest();
    // httpRequest_.timeout = 500;
    var url = this.uri_ + "&" + key + "=" + encodeURIComponent(value);
    try {
        httpRequest_.open("GET", url, true);
        httpRequest_.send(null);
        setTimeout(function(){
            httpRequest_.abort();
        }, 500);
    } catch (ex) {
        if (console && typeof console.log === 'function') {
            console.log("Failed to log to ali log service because of this exception:\n" + ex);
            console.log("Failed log data:", url);
        }
    }

    clearInterval(this.sid);
    this.sid = 0;
    this.params_ = [];
}

var Logger = function () {
    var tracker = AliLogTracker.instance();
    var values = Array.prototype.slice.call(arguments);
    values = values.map((item) => {
        if (item instanceof Array) {
            return item.join(' ');
        }

        if (item instanceof Object) {
            return JSON.stringify(item);
        }
        return item;
    });

    if (tracker.debug) {
        console.log('[AliLogTracker]', tracker.uuid, values.join(' '));
    }

    tracker.push(values.join(' '));
}


console.error = function (tempErrorMsg) {
    var errorMsg = (arguments[0] && arguments[0].message) || tempErrorMsg;
    var lineNumber = 0;
    var columnNumber = 0;
    var errorObj = arguments[0] && arguments[0].stack;
    if (!errorObj) {
        if (typeof errorMsg == "object") {
            try {
                errorMsg = JSON.stringify(errorMsg)
            } catch (e) {
                errorMsg = "错误无法解析"
            }
        }
        Logger("console ERROR", errorMsg, lineNumber + ":" + columnNumber);
    } else {
        // 如果报错中包含错误堆栈，可以认为是JS报错，而非自定义报错
        Logger("JS ERROR", errorMsg, lineNumber + ":" + columnNumber, errorObj);
    }
}

window.onerror = function (message, source, lineNumber, columnNumber, error) {
    Logger("Window ERROR", message, source, lineNumber + ":" + columnNumber, error);
}

window.onunhandledrejection = function (e) {
    var errorMsg = "";
    var errorStack = "";
    if (typeof e.reason === "object") {
        errorMsg = e.reason.message;
        errorStack = e.reason.stack;
    } else {
        errorMsg = e.reason;
        errorStack = "";
    }
    //处理上报
    Logger("Unhandled ERROR", errorMsg, "UncaughtInPromiseError: " + errorStack);
}
