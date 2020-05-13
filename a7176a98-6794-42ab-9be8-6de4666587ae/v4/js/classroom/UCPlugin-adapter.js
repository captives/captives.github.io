"use strict";
/********************************************************
 *      事件处理器
 *********************************************************/
function EventEmitter() {
    this.events = {};
}

/**
 * 绑定事件函数
 * @param eventName
 * @param callback
 */
EventEmitter.prototype.on = function (eventName, callback) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
};

/**
 * 解除绑定事件函数
 * @param eventName
 */
EventEmitter.prototype.off = function (eventName) {
    delete this.events[eventName];
};

/**
 * 触发事件函数
 * @param eventName
 * @param _
 */
EventEmitter.prototype.emit = function (eventName, _) {
    var events = this.events[eventName],
        args = Array.prototype.slice.call(arguments, 1), i, m;
    if (!events) {
        return;
    }
    for (i = 0, m = events.length; i < m; i++) {
        events[i].apply(null, args);
    }
};

/*******************************************************************
 * 实时消息
 * @constructor
 *******************************************************************/
function SocketClient() {
    if (!window.WebSocket) {
        console.warn("This browser does not support WebSocket.");
    }

    this.list = [];
    this.storageKey = '';
    //是否是断线重连
    this.isKoConnected = false;
}

SocketClient.prototype = new EventEmitter();
SocketClient.prototype.connect = function (server) {
    server.options = server.options || {};
    this.count = server.options.reconnectionAttempts || 2;
    var that = this;
    var manager = {
        path: server.path,
        secure: true,
        transports: ['websocket'],  // ['websocket', 'polling']
        reconnection: true,                //启动自动连接
        reconnectionAttempts: this.count,  //最大重试连接次数
        reconnectionDelay: 2000,           //最初尝试新的重新连接等待时间
        reconnectionDelayMax: 10000,       //最大等待重新连接,之前的2倍增长
        timeout: 20000                     //
    };

    that.server = server;
    Object.assign(manager, server.options);
    Object.assign(this, manager);
    console.log('webclient connect', server.url, manager);
    this.connected = false;
    this.socket = io.connect(server.url, manager);
    //连接时触发
    this.socket.on("connected", function () {
        console.log(that.server.url, "socket io connected success");
        that.socket.emit('authenticate', 'token');
    });

    //身份验证成功 authenticated
    this.socket.on('authenticated', function () {
        that.save(server);
        console.log(that.server.url, 'authenticated');
        that.connected = true;
        that.emit('connected', that.socket);
    });

    //连接时发生错误
    this.socket.on("connect_error", function (err) {
        console.error(that.server.url, "socket io", "connect error");
        that.connected = false;
    });

    //连接时超时
    this.socket.on("connect_timeout", function () {
        console.log(that.server.url, "socket io", "connect_timeout");
        that.connected = false;
    });

    //断开连接时触发
    this.socket.on('disconnect', function () {
        that.isKoConnected = true;
        that.count--;
        console.log(that.server.url, "socket io", that.count, 'disconnect');
        that.connected = false;
        if (that.count <= 0) {
            that.emit('close');
        } else {
            that.emit('disconnect', that.connected);
        }
    });

    //成功重连后触发,num连接尝试次数
    this.socket.on('reconnect', function (num) {
        console.log(that.server.url, "socket io", 'reconnect', num);
    });

    //试图重新连接时触发
    this.socket.on('reconnect_attempt', function () {
        console.log(that.server.url, "socket io", 'reconnect attempt');
    });

    //试图重新连接中触发, num连接尝试次数
    this.socket.on('reconnecting', function (num) {
        that.isKoConnected = true;
        console.log(that.server.url, "socket io", 'reconnecting', num);
        that.emit('reconnect', num, manager.reconnectionAttempts);
    });

    //重联尝试错误,err
    this.socket.on('reconnect_error', function (err) {
        console.error(that.server.url, "socket io", 'reconnect error');
        that.connected = false;
    });

    //重连失败
    this.socket.on('reconnect_failed', function () {
        console.log(that.server.url, "socket io", 'reconnect failed');
        that.connected = false;
        that.emit('close');
    });

    this.socket.on('error', function (err) {
        console.error(that.server.url, "socket io", 'error');
        that.connected = false;
        that.emit('error');
    });
    this.attach(this.socket);
};

SocketClient.prototype.join = function (appid, roomId, userId, userType, info) {
    var that = this;
    this.joinData = {
        appid: appid,
        room_id: roomId,
        user_id: userId,
        role: userType,
        info: info
    };
    console.log(that.server.url, 'join', this.joinData);
    //join加入房间
    this.socket.emit('join', this.joinData);
}

SocketClient.prototype.attach = function (socket) {
    var that = this;
    socket.on('enterSuccess', function (list) {
        list = list || [];
        that.emit('enterSuccess');

        console.log(that.server.url, 'enterSuccess', list);
        list.forEach(function (item) {
            that.emit('userEnter', item.user_id, item.role, item.info || {});
        });
    });

    socket.on('enterReject', function (data) {
        console.warn(that.server.url, 'enterReject', data);
        that.emit('enterReject', data.code, data.message);
    });

    socket.on('offline', function (data) {
        console.log(that.server.url, 'offline', data);
        that.emit('offline', data.device, data.time);
    });

    socket.on('userEnter', function (data) {
        console.log(that.server.url, 'userEnter', data);
        that.emit('userEnter', data.user_id, data.role, data.info || {});
    });

    socket.on('userQuit', function (data) {
        console.log(that.server.url, 'userQuit', data);
        that.emit('userQuit', data.user_id, data.role, data.info || {});
    });

    socket.on('share', function (data, user) {
        data.event ? that.emit('share', data.event, data.data || {}, user) : console.log('share', data);
    });
};

SocketClient.prototype.broadcast = function (event, data) {
    var that = this;
    return new Promise(function (resolve, reject) {
        if (that.connected) {
            that.socket.emit('share', {
                event: event,
                data: data
            }, function (json) {
                resolve(json);
            });
        }
    });
};

/**
 * 报告
 */
SocketClient.prototype.report = function (cam, mic, info) {
    if (this.socket) {
        this.socket.emit('report', {
            type: 'user',
            room_id: this.joinData.room_id,
            user_id: this.joinData.user_id,
            type_id: this.joinData.role,
            camera: cam,
            mic: mic,
            stream: info
        });
    }
}

SocketClient.prototype.reportError = function (info) {
    if (this.socket) {
        this.socket.emit('report', {
            type: 'error',
            room_id: this.joinData.room_id,
            user_id: this.joinData.user_id,
            type_id: this.joinData.role,
            detail: info
        });
    }
}

/**
 * 关闭远程消息传送
 */
SocketClient.prototype.close = function () {
    if (this.socket) {
        this.socket.close();
        console.log(this.server.url, "socket.io closed");
    }
};

SocketClient.prototype.init = function (id, list) {
    this.cr_id = "cr_" + id;
    this.storageKey = 'uuabc_ws_cr';
    this.list = list || [];
}

/**
 * 找到一个有效的socket
 */
SocketClient.prototype.getSocketItem = function () {
    var data = window.localStorage && JSON.parse(window.localStorage.getItem(this.storageKey)) || null;
    var item = null;

    //相同课程
    if (data && data.id === this.cr_id) {
        var id = data.wid;
        if (id) {
            this.list.forEach(opt => {
                if (opt.id == id) {
                    item = opt;
                }
            });
        } else {
            item = this.list[0];
        }
    } else {
        item = this.list[0];
    }

    console.log('getSocketItem', data, item);
    return item;
}

/**
 * 找到指定位置的下一个
 */
SocketClient.prototype.nextSocketItem = function (item) {
    var index = 0;
    this.list.forEach((opt, _index) => {
        if (item.id == opt.id) {
            index = _index + 1;
            index = index >= this.list.length ? - 1 : index;
        }
    });

    console.log('nextSocketItem', index, this.list[index]);
    return this.list[index] || null;
}

SocketClient.prototype.save = function (item) {
    console.log('save socket item', this.storageKey, this.cr_id, item);
    window.localStorage && window.localStorage.setItem(this.storageKey, JSON.stringify({
        id: this.cr_id, wid: item.id
    }));
}

/******************************************************************************* 
    appId: String
    role: Number | Boolean
    roomId: String
    uuid: String
    user(id,name,photo)
 ******************************************************************************/

function UCPlugin() {
    GlobalData.userType = Number(this.queryGet('user_type')) || 2;
    GlobalData.userId = this.queryGet('user_id');
    GlobalData.roomId = this.queryGet('app_id') + ":" + this.queryGet('room_id');
    GlobalData.user = {
        id: GlobalData.userId,
        type: GlobalData.userType,
        name: this.queryGet('name'),
        avatar: this.queryGet('avatar')
    };
    Object.assign(this, { appid: this.queryGet('app_id') }, GlobalData);

    this.course = { userType: GlobalData.userType, page: 1, total: 1, completed: false, auth: true, history: null };
    GlobalData.hasAuthority(this.course.auth);

    this.enabledSocket = GlobalData.roomId && GlobalData.userId;

    const that = this;
    if (this.enabledSocket) {
        this.getState(this.roomId).then(function (res) {
            if (res.isSuccess) {
                that.course.page = Number(res.result) || 1;
                that.course.completed && that.changePage(that.course.page);
            }

            that.getState([that.roomId, that.course.page].join('-')).then(function (res) {
                if (res.isSuccess) {
                    that.course.history = res.result;
                    console.warn('relaod history', that.course.history);
                    that.mockAction(that.course.history);
                }
            });
        });
    }
}

UCPlugin.prototype.queryGet = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
};

UCPlugin.prototype.fetch = function (data, options) {
    const url = "https://sit-cms-state-svc.51uuabc.com" + options.path;
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, false);
        // xhr.setRequestHeader('Content-type', 'text/plain');
        xhr.setRequestHeader('Content-type', 'application/json');
        // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onloadstart = () => { };
        xhr.onprogress = (e) => { };
        xhr.onload = () => {
            resolve(JSON.parse(xhr.response));
        }

        xhr.onerror = err => {
            reject(err);
        }

        // var list = [];
        // for (var key in data) {
        //     list.push(key + "=" + data[key]);
        // }
        // data = list.join('&');

        data = JSON.stringify(data);

        xhr.send(data);
    });
}

UCPlugin.prototype.setState = function (key, value, expire) {
    if (this.enabledSocket) {
        console.log('UCPlugin setState ---- success', key, value);
        return this.fetch({ key: key, value: value, expire: expire }, { path: '/state/set' });
    } else {
        return Promise.resolve({ isSuccess: false });
    }
}

UCPlugin.prototype.getState = function (key, type = 0, needParseJson = false) {
    if (this.enabledSocket) {
        console.log('UCPlugin getState ---- success', key);
        return this.fetch({ key: key, type: type, needParseJson: needParseJson }, { path: '/state/get' });
    } else {
        return Promise.resolve({ isSuccess: false });
    }
}

//适用多key
UCPlugin.prototype.mgetState = function () {
    const list = Array.prototype.slice.call(arguments);
    if (this.enabledSocket && list.length) {
        console.log('UCPlugin mgetState ---- success', list);
        return this.fetch({ keys: list, }, { path: '/state/mget' });
    } else {
        return Promise.resolve({ isSuccess: false });
    }
}

/* 
    key	    是	string	key
    value	是	string	value
    type	是	int	    0添加到首部 1添加尾部, 默认0
 */
UCPlugin.prototype.pushState = function (key, value, type) {
    if (this.enabledSocket) {
        console.log('UCPlugin pushState ---- success');
        return this.fetch({ key: key, value: value, type: type }, { path: '/state/push' });
    } else {
        return Promise.resolve({ isSuccess: false });
    }
}

/* 
    key	            是	string	key
    start	        是	int	    开始索引位置 默认0 第一个，负数从尾部开始计算
    stop	        是	int	    结束位置 默认 －1 ，返回全部
    needParseJson	否	boolean	是否需要转成object－json , 默认false
 */
UCPlugin.prototype.lrangeState = function (key, startIndex, endIndex, needParseJson) {
    if (this.enabledSocket) {
        console.log('UCPlugin pushState ---- success');
        return this.fetch({ key: key, start: startIndex, stop: endIndex, needParseJson: needParseJson }, { path: '/state/lrange' });
    } else {
        return Promise.resolve({ isSuccess: false });
    }
}

UCPlugin.prototype.addButton = function (label, callback) {
    const imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAAH7+Yj7AAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAABZLkSWAAAE00lEQVRYCcWYQWhdRRSG32tjRbSiCUTMostSKuKiJaiL+JpFkdaFJZiN4MKN4MKFUopC8XURRDSIoZTSVVooSKTUglLcaBRbQQoKtqWIi5BFS7NQJC2Sphq/f94907n3zr3v3vcSe+Bkzpz5zz/nzsyde14ajUTW1tYm0OfVbeoPnbZak01CJJ2j3olxI+kMmTMaboPifc86zewkDMxt8qPNZjuxJ73TBtUqvEUrddIkws2uXoS7g2o05gHOF6V5EtQ/6OuGHghTllPTxNiLGL8mZgF9A3US5rgTz2Ti941mUMcD1WHKQZpX0WUAs7RebGq173tvYBijLWQUJLw9mPa7HRA401jMD2bcGM1ny/OMd3SMsRRQTERvY+xABthIAZUG4EVA52LAO6EzAf8c+rA/tuVpZwZSXaXkF1xMqdFO5zagj2R6YAgiqEVfWiZKeRqilRDkCSGRXbhBYVDEvgrxnPyOsGJGEZ60y60NZDqAb6WHcr0TgK/LC173yd4cInEM0Oo0F8knEP2lQYhGafYVAc2vg7NsnUj7eOBLHbLAnzJtDdspb77zBZn+IjeZPkvzYh7iPEtG+CDddwtAVd3uLDpCi2B2XSW6UurKFE+wqqAUYcgC+Tj9sdAX2EvYpyC5FficWUioUUh1RLajI6g2T0fnW4j+oI1KjhASrec76JZoxD2nu/nvdTtWihCyFm5pHTlCxmsW4Akh63VDxOVJ3WGFTDvby+5aYv5SsdOf+/IYsmqbLFdDnwsdj26yyjrpPm+XAFsa0+VQdNY0Lvkbog87ZvlfkhsUYZnomzptAAL8Wpkv0+4pI/wTsk8tALK22SXtiG1KDHPcnBXJBN9aRqi3xUmXzTCY2utlhFvI7LChE1L/Rpg/0/4mQt0cRbI53AhIjxQB5Wf8oghPlYGEq7iG+k77z+hB7Ifl6EM+IMMVt4YYrozog0xXmasgHGFCNNUjoaqGeYv115c5WK86jz8H2VWLVZsjlBPSR2heQ4fVj8j3EH0T8ccJY0D5kolGMXegRZMJGhMdz2voTyST+7jFAuSLPnEIJild5PvRfk9VSCv7NvpVdguyoGiCJPUAwANoP1+Z7FxlfZ2TsyTrao8QmEuQ5FoApPdDcpWDT5DEVH6oLF7vraz7oNr6GVbT3QsuQZLTW6bkutVGVSa7C+g8ehkdQl9G675QulaV5C1L8M0eSAhJiZ74NKSLoZeHf5T+26Gvor0E1zH98ld5WvcJwzm0JaqLb4ZO2XA/RTOR9VfsDys3lSCqnXsR/bI6SWK5OhviXYy9hPoz3ssExGxXgirs68osiS1kg5Ld2Jv199F3NddyDwRbC2LCj3EBpJZ7WcWKzsjTtcI6YL2tn7GSv2dj4dyNT1vcr/yqBKv8W6Bson8ZPEOiV7IguPXg+iL1urIzds2MQ9LtF0V2/lj/SxK9FA6Q5EP0D4W+irarcPxbBlGLQOl6yA+QXEAfQ3VRP4HWEf/J8wkqmiRVHEzWYdoAbKrITCWoyUhSvlfQ/6uS0bQSVTSfc0RSv31yCToof5JEX8BsmW+D2nl4v8smZnMVJmgAtSSrSuc5VJ/FfgsKFQIX0R9JylUs2IVSKcFYNEnrelLp/ySqi9sU0/3LSR8A6Q30GsnkPon4u8p/qbSQnZFb1FwAAAAASUVORK5CYII=';
    var button = document.createElement('span');
    button.onclick = callback;
    button.style = "background: url(" + imgData + ") center no-repeat; cursor: pointer; display: inline-block; width: 40px; height: 40px; top: calc(50% - 40px); position: fixed;";
    document.querySelector('body').appendChild(button);
    return button;
}

UCPlugin.prototype.prevPage = function () {
    this.course.page -= 1;
    this.changePage(this.course.page);
}

UCPlugin.prototype.nextPage = function () {
    this.course.page += 1;
    this.changePage(this.course.page);
}

UCPlugin.prototype.changePage = function (page) {
    page = Number(page);
    this.course.page = page >= 1 ? page <= this.course.total ? page : this.course.total : 1;
    this.setState(this.roomId, this.course.page);
    this.course.completed && PageMgr.turnPage(this.course.page);
    this.enabledSocket && this.client.broadcast('page', { page: this.course.page, total: this.course.total, reset: 0 });
}

UCPlugin.prototype.callbackResLoaded = function (total, callback) {
    const that = this;
    this.course.total = total;
    this.course.completed = true;

    if (this.course.userType == 2) {
        var lbt = this.addButton('上一页', this.prevPage.bind(this));
        lbt.style = lbt.getAttribute('style') + "left: 40px;";

        var rbt = this.addButton('下一页', this.nextPage.bind(this));
        rbt.style = rbt.getAttribute('style') + "right: 40px; transform-origin: 50% 50%; transform: rotate(180deg);";
    }

    console.log("UCPlugin", this.enabledSocket ? "启用互动服务" : "互动服务已禁用", GlobalData.user, this.course);

    if (this.enabledSocket) {
        this.fetch({}, { path: '/state/info' }).then(function (res) {
            if (res.isSuccess) {
                if ('loadScript' in that) {//启用socket 服务
                    that.loadScript('js/socket.io/socket.io.slim.js', that.socketHandler.bind(that, res.result, callback));
                } else {
                    that.changePage(that.course.page);
                }
            } else {
                console.log('互动服务数据请求失败, 互动服务已停用');
            }
            console.log(res);
        }).catch(function (error) {
            console.log('互动服务数据请求失败, 互动服务已停用');
        });
    }
}

UCPlugin.prototype.callbackPageLoaded = function (single, action) {
    this.course.single = single;
    this.course.action = action;
    if (this.course.page == PageMgr['cur_page'] && this.course.history) {
        this.mockAction(this.course.history);
        this.course.history = null;
    } else {
        this.course.page = PageMgr['cur_page'];
    }
}

UCPlugin.prototype.callbackSendMsg = function (msg) {
    this.mockAction(msg);
    this.enabledSocket && this.client.broadcast('action', msg);
    console.warn(this.user.type, this.user.id, "callbackSendMsg", msg);
};

UCPlugin.prototype.callbackSendInfo = function (html) {
    console.log(html);
};

UCPlugin.prototype.mockAction = function (msg) {
    if (this.course.completed) {
        console.warn('receiveMsg', msg);
        PageMgr.receiveMsg(msg);
    }
};


UCPlugin.prototype.socketHandler = function (data, callback) {
    const that = this;
    var client = this.client = new SocketClient();
    client.init(that.roomId, data.websocket || [
        { id: 1, url: "https://sit-si.51uuabc.com", options: { path: "/socket.io", transports: ["websocket"] } },
        { id: 2, url: "https://sit-si1.51uuabc.com", options: { path: "/socket.io", transports: ["websocket"] } },
        { id: 3, url: "https://sit-si2.51uuabc.com", options: { path: "/socket.io", transports: ["websocket"] } },
        { id: 4, url: "https://sit-sil.51uuabc.com", options: { path: "/socket.io", transports: ["polling"] } },
    ]);

    client.on('connected', function () {
        client.join(that.appid, that.roomId, that.user.id, that.user.type, that.user);
    });

    client.on("enterReject", function (code, info) {
        alert(code + "\n" + info);
    });

    client.on("enterSuccess", function () {
        callback && callback();
        PageMgr.turnPage(that.course.page);

        if (that.course.userType == 2) {
            that.client.broadcast('page', { page: that.course.page, total: that.course.total, reset: 1 });
        }

        var ul = document.createElement('ul');
        ul.setAttribute('id', 'userList');
        ul.style = "list-style: none; padding: 0; margin: 0; bottom: 0px;  width: 150px;height: 200px; position: fixed;background: rgba(0,0,0,.5);";
        document.querySelector('body').appendChild(ul);
    });

    client.on('userEnter', function (userId, userType, info) {
        if (that.course.userType == 2) {
            that.client.broadcast('page', { page: that.course.page, total: that.course.total, reset: 1 });
        }

        var li = document.createElement('li');
        li.innerHTML = JSON.stringify(info);
        li.setAttribute('class', 'li' + userId);
        li.style = "color: #FFF";
        document.querySelector('#userList').appendChild(li);
    });

    client.on('userQuit', function (userId, userType, info) {
        document.querySelector('#userList').removeChild(document.querySelector('.li' + userId));
    });

    client.on('share', function (event, value, user) {
        switch (event) {
            case 'page':
                that.course.page = value.page;
                PageMgr.turnPage(that.course.page);
                break;
            case 'action':
                console.log(that.user.type, that.user.id, "Receiver", value);
                const json = JSON.parse(value);
                if (json.cmd != 7012) { //学生提交答案
                    that.mockAction(value);
                }
                break;
            default: {
                console.log('event', event, value, user);
            }
        }
    });

    client.on('close', function () {
        client.close();
        const ws = client.nextSocketItem(ws);
        if (ws) {
            setTimeout(function () {
                client.connect(ws);
            }, 500);
        } else {
            alert('连接失败, 请刷新重试');
        }
    });

    client.connect(client.getSocketItem());
}
window.UCPlugin = UCPlugin;