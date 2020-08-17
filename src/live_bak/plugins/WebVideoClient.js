import AgoraRTC from 'agora-rtc-sdk'
import BaseEvent from './BaseEvent.js'

console.log('设备检测', AgoraRTC.checkSystemRequirements());
/*******************************************************************
 * 本地视频
 *
 * @constructor 依赖 AgoraRTCSDK-3.0.0.js
 *******************************************************************/
class VideoStream extends BaseEvent {
    cameras = [];//视频输入列表
    microphones = [];//音频输入列表
    audios = [];//音频输出列表
    camera = null;//当前使用的视频输入设备
    microphone = null;//当前使用的音频输入设备
    localStream = null;//本地视频流
    videoProfile = null;//视频规格
    videoElement = null;//本地流video播放容器
    streamID = null;
    constructor() {
        super();
    }

    /**
     * 获取视频采集约束数据
     */
    get options() {
        var data = {
            streamID: parseInt(this.streamID),
            screen: false,
            video: false,
            audio: false,
        };

        if (this.cameraId) {
            data.video = true;
            data.cameraId = this.cameraId;
        } else {
            if (this.cameras.length) {
                data.video = true; //使用默认设备
            } else {
                console.warn('没有视频设备, 无视频信号');
            }
        }

        if (this.microphoneId) {
            data.audio = true;
            data.microphoneId = this.microphoneId;
        } else {
            if (this.microphones.length) {
                data.audio = true;
            } else {
                console.warn('没有麦克风设备, 无音频信号');
            }
        }

        return data;
    }


    init() {
        var that = this;
        return new Promise((resolve, reject) => {
            AgoraRTC.getDevices((devices) => {
                that.audios = [];
                that.cameras = [];
                that.microphones = [];
                if (devices && devices.length > 0) {
                    devices.forEach((device) => {
                        device = JSON.parse(JSON.stringify(device));
                        if (device['kind'] == 'videoinput') {
                            device.label = device.label || 'Camera ' + (that.cameras.length + 1);
                            that.cameras.push(device);
                        } else if (device['kind'] == 'audioinput') {
                            device.label = device.label || 'Microphone ' + (that.microphones.length + 1);
                            that.microphones.push(device);
                        } else if (device['kind'] == 'audiooutput') {
                            device.label = device.label || 'Audio ' + (that.audios.length + 1);
                            that.audios.push(device);
                        }
                    });
                    resolve({ videoinput: that.cameras, audioinput: that.microphones, audiooutput: that.audios });
                } else {
                    reject("DEVICES_NOT_FOUND");
                }
            });
        });
    }

    set cameraId(deviceId) {
        const list = this.cameras || [];
        this.camera = list.find(item => item.deviceId === deviceId);
    }

    get cameraId() {
        if (this.camera) {
            return this.camera.deviceId;
        }

        if (this.cameras.length > 0) {
            this.camera = this.cameras[0];
            return this.camera.deviceId;
        }

        return null;
    }

    set microphoneId(deviceId) {
        const that = this;
        const list = that.microphones || [];
        this.microphone = list.find(item => item.deviceId === deviceId);
    }

    get microphoneId() {
        if (this.microphone) {
            return this.microphone.deviceId;
        }

        if (this.microphones.length > 0) {
            this.microphone = this.microphones[0];
            return this.microphone.deviceId;
        }

        return null;
    }

    /** 显示播放本地视频流 */
    display(element, options) {
        return new Promise((resolve, reject) => {
            console.log(this);
            if (this.localStream) {
                this.localStream.isPlaying() && this.localStream.stop();
                this.localStream.play(element || this.videoElement, options, errState => {
                    if (errState && errState.status !== "aborted") {
                        reject({ error: "播放失败，一般为浏览器策略阻止。引导用户用手势触发恢复播放" });
                    }
                    resolve();
                });
            }
        });
    }

    createStream(options) {
        var that = this;
        options = options || that.options;
        this.videoProfile = this.videoProfile || '360P_3';
        console.log('Create Stream', this.element, this.videoProfile, options);
        return new Promise((resolve, reject) => {

            that.localStream = AgoraRTC.createStream(options);
            that.localStream.setVideoProfile(that.videoProfile);

            that.localStream.on("accessAllowed", () => {
                that.access = true;
                console.log("localStream # accessAllowed");
            });

            that.localStream.on("accessDenied", () => {
                that.access = false;
                console.warn("localStream # accessDenied");
            });

            that.localStream.init(() => {
                console.log("getUserMedia successfully");
                resolve(that.localStream);
            }, (err) => {
                console.log("getUserMedia failed", err);
                reject(err.msg);
            });
        });
    }

    switchDevice(type, deviceId) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.localStream.switchDevice(type, deviceId, resolve, reject);
        });
    }

    /** 关闭本地视频流 */
    close() {
        if (this.localStream != null) {
            this.localStream.close();
        }
    }

}


/*******************************************************************
 * 视频流服务
 *
 * @constructor 依赖 AgoraRTCSDK-3.0.0.js
 *******************************************************************/
class VideoClient extends BaseEvent {
    uid = null;
    channel = null;
    streamList = {};
    clinet = null;
    appid = null;
    constructor() {
        super();
        AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.WARN);
        AgoraRTC.Logger.enableLogUpload();
        console.log("AgoraRTC.BUILD", AgoraRTC.BUILD);
        this.client = AgoraRTC.createClient({
            mode: 'live',
            codec: "vp8"
        });

        this.addListener(this.client);
    }

    /**
     * 监听视频流对象
     * @param {Object} client 
     */
    addListener(client) {
        const that = this;
        //远程音视频流已添加回调事件(stream-added)
        client.on('stream-added', (event) => {
            var stream = event.stream;
            var uid = stream.getId();
            console.log("New stream added: ", uid);
            console.log("Subscribe ", stream);
            client.subscribe(stream, function (err) {
                console.log("Subscribe stream failed", uid, err);
            });
        });

        //远程音视频流已订阅回调事件(stream-subscribed)
        client.on('stream-subscribed', ({ stream }) => {
            var uid = stream.getId();
            that.streamList[uid] = stream;
            console.log("Subscribe remote stream successfully: ", uid, stream.getAttributes(), "Video Track", stream.getVideoTrack(), 'Audio Track', stream.getAudioTrack());
            that.emit('stream', uid);
        });

        //远程音视频流已删除回调事件(stream-removed)
        client.on('stream-removed', ({ stream }) => {
            var uid = stream.getId();
            console.log("Remote stream is removed " + uid);
            that.emit('removed', uid);

            stream.stop();
            delete that.streamList[uid];
        });

        //对方用户已离开会议室回调事件(peer-leave)
        client.on('peer-leave', ({ stream }) => {
            if (stream) {
                var uid = stream.getId();
                console.log("Remote stream is removed " + uid);
                that.emit('removed', uid);

                stream.stop();
                delete that.streamList[uid];
            }
        });

        //开始尝试重新发布/订阅音视频流
        client.on("stream-reconnect-start", function (event) {
            console.log("尝试重新发布/订阅音视频流", event.uid);
        });

        //重新发布/订阅音视频流结束
        client.on('stream-reconnect-end', function (event) {
            console.log("重新发布/订阅音视频流结束", event.uid, event.success, event.reason);
        });


        //用户已取消视频通话静音
        client.on('unmute-video', ({ uid }) => {
            console.log("unmute video:", uid);
        });

        //用户已被踢且被封禁
        client.on('client-banned', ({ uid, attr }) => {
            that.emit('rejected', uid, attr);
            console.warn(" user banned:" + uid + ", banntype:" + attr);
        });

        client.on('active-speaker', ({ uid }) => {
            console.log("update active speaker: client", uid);
        });

        //提示频道内正在说话的远端用户及其音量
        client.on("volume-indicator", ({ attr }) => {
            attr.forEach(function (volume, index) {
                console.log(`${index} UID ${volume.uid} Level ${volume.level}`);
            });
        });

        //token 失效前30s提示
        client.on('onTokenPrivilegeWillExpire', () => {
            console.warn('---- token expire ----');
            that.emit('tokenExpire');
        });

        //视频流类型发生改变
        client.on("stream-type-changed", function (event) {
            console.log("Stream Type Change", event.uid, event.streamType);
        });

        client.on("network-type-changed", function (event) {
            console.log("Network Type Changed to", event.networkType);
        });

        //摄像头被添加或移除
        client.on("camera-changed", function (event) {
            console.log("Camera Changed", event.state, event.device);
        });

        //音频输入设备被添加或移除
        client.on("recording-device-changed", function (event) {
            console.log("Recording Device Changed", event.state, event.device);
        });

        //音频输出设备被添加或移除
        client.on("playout-device-changed", function (event) {
            console.log("Playout Device Changed", event.state, event.device);
        });

        //正在与服务器重新建立连接
        client.on("reconnect", function () {
            console.log("reconnect");
        });

        //与服务器已经成功建立连接
        client.on("connected", function () {
            console.log("connected");
        });

        //与服务器的连接状态发生改变
        client.on("connection-state-change", function (event) {
            that.connected = event.curState === "CONNECTED";
            console.log("Connection status changes", event.prevState, event.curState);
            that.emit('connection', event.prevState, event.curState);
        });

        //报告本地用户的上下行网络质量
        client.on("network-quality", function (stats) {
            // console.log("downlinkNetworkQuality", stats.downlinkNetworkQuality);
            // console.log("uplinkNetworkQuality", stats.uplinkNetworkQuality);
        });

        client.on('error', function (err) {
            console.error("AgoraRTC SDK Error:" + err);
            that.emit('error', err.reason);
        });
    }

    /**
     * 连接声网服务器
     * @param {String} classid 
     * @param {String} appToken  
     * @param {Int32} uid 
     */
    connect(appid, classid, uid, appToken) {
        const that = this;
        this.appid = appid;
        this.channel = "AGD" + classid; //强制转换为字符串
        console.log("VIDEO CLIENT::", this.appid, this.channel);
        return new Promise((resolve, reject) => {
            if (!that.appid) {
                console.warn("AgoraRTC appid must not be empty", that.appid);
                reject("AgoraRTC appid must not be empty" + that.appid);
            } else {
                //初始化
                that.client.init(that.appid, () => {
                    //加入频道
                    that.client.join(appToken, this.channel, uid, uid => {
                        that.uid = uid;
                        console.log("JOIN 成功", that.appid, this.channel, uid);
                        resolve(uid);
                    }, function (info) {
                        reject(info);
                    });
                }, info => {
                    reject(info);
                });
            }
        });
    }

    /**
     * 发布视频流
     * @param {*} stream 
     */
    publish(stream) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.client.publish(stream, err => {
                console.warn("Publish local stream error: ", err);
                reject(err);
            });

            //本地音视频已上传回调事件(stream-published)
            that.client.on('stream-published', event => {
                console.log("Publish local stream successfully");
                resolve();
            });
        });
    }

    /**
     * 查询指定用户的视频流
     * @param {int32} uid 
     */
    getStream(uid) {
        var stream = this.streamList[uid];
        if (stream) {
            return stream;
        } else {
            return console.warn('指定token的媒体流已经丢失', uid);
        }
    }

    player(uid, element, options) {
        var stream = this.getStream(uid);
        return new Promise((resolve, reject) => {
            if (stream) {
                stream.isPlaying() && stream.stop();
                stream.play(element, options || { fit: "contain" }, errState => {
                    if (errState && errState.status !== "aborted") {
                        reject({ error: "播放失败，一般为浏览器策略阻止。引导用户用手势触发恢复播放" });
                    }
                    resolve();
                });
            } else {
                console.warn('指定token的媒体流已经丢失或未获取...', uid, element);
                reject({ error: `为查询到指定${uid}的媒体流` });
            }
        });
    }

    /**
     * 停止播放
     * @param {*} uid 
     * @param {*} element 
     */
    stopPlayer(uid, element) {
        var stream = this.getStream(uid);
        stream && stream.stop();
        document.getElementById(element).innerText = "";
        console.log(uid, 'Stream stopPlayer', uid, this.streamList);
    }

    /**
     * 开关视频流
     * @param {int32} uid 
     * @param {Boolean} enabled 
     */
    toggleVideo(uid, enabled) {
        var stream = this.getStream(uid);
        if (enabled) {
            stream.unmuteVideo();
        } else {
            stream.muteVideo();
            console.log('视频图像已经关闭', uid);
        }
    }


    getAudioVolume(uid) {
        const volume = localStorage.getItem(this.channel + uid);
        return Number(volume || 100);
    }

    setAudioVolume(uid, volume) {
        var stream = this.getStream(uid);
        stream && stream.setAudioVolume(volume);
        localStorage.setItem(this.channel + uid, volume);
    }

    /**
     * 开关音频流
     * @param {int32} uid 
     * @param {Boolean} muted 
     */
    toggleAudio(uid, muted) {
        var stream = this.getStream(uid);
        if (stream) {
            if (muted) {
                stream.muteAudio();
                console.log('视频声音已经关闭 ', uid);
            } else {
                stream.unmuteAudio();
            }
        }
    }

    /**
     * 取消发布视频流
     * @param {Object} stream 
     */
    unpublish(stream, callback) {
        if (stream) {
            this.client.unpublish(stream, err => {
                switch (err) {
                    case "STREAM_NOT_YET_PUBLISHED":
                        console.warn("指定的stream还没发布");
                        break;
                    case "INVALID_LOCAL_STREAM":
                        console.warn("传入无效stream对象");
                        break;
                    case "INVALID_OPERATION":
                        console.warn("当前不在频道中,取消订阅失败");
                        break;
                    default:
                        console.error("Unpublish local stream failed", err);
                }
                callback && callback(err);
            });
        }
    }

    /**
     * 离开，退出
     */
    destroyed() {
        var that = this;
        return new Promise((resolve, reject) => {
            Object.keys(that.streamList).map(key => {
                that.stopPlayer(key);
            });

            that.streamList = {};
            that.client.leave(function () {
                console.log("Leavel channel successfully");
                resolve();
            }, function (err) {
                console.warn("Leave channel failed");
                reject(err);
            });
        });
    }
}

export { VideoStream, VideoClient }
