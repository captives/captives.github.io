var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 矩阵对象
 */
var Matrix = (function () {
    function Matrix(a, b, c, d, x, y) {
        this.a = (a != null) ? a : 1;
        this.b = b || 0;
        this.c = c || 0;
        this.d = (d != null) ? d : 1;
        this.x = x || 0;
        this.y = y || 0;
    }
    Matrix.prototype.toString = function () {
        return 'matrix(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ','
            + this.x + ',' + this.y + ')';
    };
    Matrix.prototype.equals = function (m) {
        if (this.a === m.a
            && this.b === m.b
            && this.c === m.c
            && this.d === m.d
            && this.x === m.x
            && this.y === m.y) {
            return true;
        }
        return false;
    };
    Matrix.prototype.identity = function () {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.x = 0;
        this.y = 0;
    };
    Matrix.prototype.clone = function () {
        return new Matrix(this.a, this.b, this.c, this.d, this.x, this.y);
    };
    Matrix.prototype.clone1 = function () {
        return new egret.Matrix(this.a, this.b, this.c, this.d, this.x, this.y);
    };
    Matrix.prototype.copyFrom = function (m) {
        this.a = m.a;
        this.b = m.b;
        this.c = m.c;
        this.d = m.d;
        this.x = m.x;
        this.y = m.y;
    };
    /**
     * 旋转
     * angle 弧度
     */
    Matrix.prototype.rotate = function (angle) {
        var u = Math.cos(angle);
        var v = Math.sin(angle);
        var temp = this.a;
        this.a = u * this.a - v * this.b;
        this.b = v * temp + u * this.b;
        temp = this.c;
        this.c = u * this.c - v * this.d;
        this.d = v * temp + u * this.d;
        temp = this.x;
        this.x = u * this.x - v * this.y;
        this.y = v * temp + u * this.y;
    };
    /**
     * 位移
     */
    Matrix.prototype.translate = function (x, y) {
        this.x += x;
        this.y += y;
    };
    Matrix.prototype.concat = function (m) {
        var a = this.a * m.a;
        var b = 0;
        var c = 0;
        var d = this.d * m.d;
        var x = this.x * m.a + m.x;
        var y = this.y * m.d + m.y;
        if (this.b !== 0 || this.c !== 0 || m.b !== 0 || m.c !== 0) {
            a += this.b * m.c;
            d += this.c * m.b;
            b += this.a * m.b + this.b * m.d;
            c += this.c * m.a + this.d * m.c;
            x += this.y * m.c;
            y += this.x * m.b;
        }
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.x = x;
        this.y = y;
    };
    Matrix.prototype.invert = function () {
        if (this.b === 0 && this.c === 0 && this.a !== 0 && this.d !== 0) {
            this.a = 1 / this.a;
            this.d = 1 / this.d;
            this.b = 0;
            this.c = 0;
            this.x = -this.a * this.x;
            this.y = -this.d * this.y;
        }
        else {
            var det = this.a * this.d - this.b * this.c;
            if (det === 0) {
                this.identity();
                return;
            }
            det = 1 / det;
            var temp = this.a;
            this.a = this.d * det;
            this.b = -this.b * det;
            this.c = -this.c * det;
            this.d = temp * det;
            temp = this.y;
            this.y = -(this.b * this.x + this.d * this.y);
            this.x = -(this.a * this.x + this.c * temp);
        }
    };
    Matrix.prototype.getRotationX = function () {
        return Math.atan2(this.b, this.a);
    };
    Matrix.prototype.getRotationY = function () {
        return Math.atan2(this.c, this.d);
    };
    Matrix.prototype.getTransformedX = function (x, y) {
        return this.x + this.a * x + this.c * y;
    };
    Matrix.prototype.getTransformedY = function (x, y) {
        return this.y + this.d * y + this.b * x;
    };
    /**
     * 缩放
     */
    Matrix.prototype.scale = function (x, y) {
        this.a *= x;
        this.b *= y;
        this.c *= x;
        this.d *= y;
        this.x *= x;
        this.y *= y;
    };
    Matrix.prototype.containsPoint = function (x, y, w, h) {
        // find mouse in local target space
        // and check within bounds of that area
        var inv = Matrix.temp; // use pooled Matrix to reduce allocations
        inv.copyFrom(this);
        inv.invert();
        var tx = inv.x + inv.a * x + inv.c * y;
        var ty = inv.y + inv.d * y + inv.b * x;
        // compare locations in non-transformed space (inverted)
        if (tx >= 0 && tx <= w && ty >= 0 && ty <= h) {
            return true;
        }
        return false;
    };
    Matrix.temp = new Matrix();
    return Matrix;
}());
var Mouse = (function () {
    function Mouse() {
        throw new Error('can not create a instance');
    }
    /**
     * 鼠标点击的坐标
     */
    Mouse.get = function (event, elem) {
        if (!elem) {
            elem = event.currentTarget;
        }
        // if (event.touches){
        //     if (event.touches.length){
        //         Mouse.x = parseInt(event.touches[0].pageX);
        //         Mouse.y = parseInt(event.touches[0].pageY);
        //     }
        // }else{
        //     // mouse events
        //     Mouse.x = parseInt(event.clientX);
        //     Mouse.y = parseInt(event.clientY);
        // }
        // console.log(event.stageX,event.stageY);
        // console.log(event.localX,event.localY);
        var targetPoint = elem.globalToLocal(event.stageX, event.stageY);
        Mouse.x = targetPoint.x;
        Mouse.y = targetPoint.y;
        // console.log(Mouse.x,Mouse.y);
        // var rect = elem.getBoundingClientRect();
        // Mouse.x += elem.scrollLeft - elem.clientLeft - rect.left;
        // Mouse.y += elem.scrollTop - elem.clientTop - rect.top;
        return Mouse;
    };
    Mouse.x = 0;
    Mouse.y = 0;
    Mouse.START = 'touchBegin';
    Mouse.MOVE = 'touchMove';
    Mouse.END = 'touchEnd';
    Mouse.TAP = 'touchTap';
    return Mouse;
}());
var isClose = false;
var LogColor;
(function (LogColor) {
    LogColor["title"] = "color: black;font-weight: 600; font-size: 20px;";
    LogColor["info"] = "font-weight: bold";
    LogColor["warn"] = "color: yellow;font-weight: 600;";
    LogColor["erro"] = "color: red;font-weight: 600;";
    LogColor["str"] = "background: rgba(100, 100, 219, .3); padding: 1px 5px; border: 1px solid rgba(0, 0, 0, 0.1)";
    LogColor["obj"] = "background: skyblue; padding: 1px 5px; border: 1px solid rgba(0, 0, 0, 0.1)";
})(LogColor || (LogColor = {}));
var LogType;
(function (LogType) {
    LogType["title"] = "title";
    LogType["info"] = "info";
    LogType["warn"] = "warn";
    LogType["erro"] = "erro";
    LogType["str"] = "str";
    LogType["obj"] = "obj";
})(LogType || (LogType = {}));
var MyConsole = (function () {
    function MyConsole() {
    }
    MyConsole.info = function (outport, type, close) {
        if (outport === void 0) { outport = ''; }
        if (type === void 0) { type = LogType.str; }
        if (close === void 0) { close = isClose; }
        if (close) {
            return;
        }
        var arr = [];
        if (typeof outport === 'string') {
            var shuchu = type === 'obj' ? '%c' + '/*** ' + outport + ' ***/' : '%c' + outport;
            arr = [shuchu, LogColor[type]];
        }
        else {
            arr = [outport];
        }
        console.log.apply(console, arr);
    };
    return MyConsole;
}());
var ObserverNew = (function () {
    function ObserverNew() {
        this.subscribers = [];
    }
    ObserverNew.getInstance = function () {
        if (!this.instance) {
            this.instance = new ObserverNew();
        }
        return this.instance;
    };
    ObserverNew.prototype.register = function (aimTarget, animateType, callback) {
        var trigger = {
            aimTarget: aimTarget,
            animateType: animateType,
            callback: callback,
        };
        this.subscribers.push(trigger);
    };
    ObserverNew.prototype.emit = function (aimTarget, animateType) {
        for (var i = 0, len = this.subscribers.length; i < len; i++) {
            var trigger = this.subscribers[i];
            if (trigger.aimTarget === aimTarget && trigger.animateType === animateType) {
                if (trigger.callback && trigger.callback instanceof Function) {
                    trigger.callback();
                }
                return;
            }
        }
    };
    ObserverNew.prototype.remove = function (aimTarget, animateType) {
        for (var i = 0, len = this.subscribers.length; i < len; i++) {
            var trigger = this.subscribers[i];
            if (trigger.aimTarget === aimTarget && trigger.animateType === animateType) {
                this.subscribers.splice(i, 1);
                return;
            }
        }
    };
    ObserverNew.prototype.clear = function () {
        this.subscribers.length = 0;
    };
    ObserverNew.instance = null;
    return ObserverNew;
}());
// TypeScript file
/**
 * 可操作对象容器
 */
var Picture = (function () {
    function Picture(image, m) {
        this.image = image;
        var matrix = new Matrix(m.a, m.b, m.c, m.d, m.x, m.y);
        this.transform = new Transformable(image.width, image.height, matrix, this);
    }
    Picture.prototype.draw = function (container) {
        var m = this.transform.matrix;
        this.image.matrix = new egret.Matrix(m.a, m.b, m.c, m.d, m.x, m.y);
        container.addChild(this.image);
    };
    Picture.prototype.undraw = function (container) {
        container.removeChild(this.image);
    };
    return Picture;
}());
// 伪随机的实现
var Pseudorandom = (function () {
    function Pseudorandom(initArr) {
        this.initArr = [];
        this.hasSelectedItem = [];
        if (typeof initArr === 'number') {
            var arr = [];
            for (var i = 0, len = initArr; i < len; i++) {
                arr.push(i);
            }
            this.initArr = arr;
        }
        else {
            this.initArr = initArr;
        }
    }
    Pseudorandom.prototype.getIndex = function () {
        var _this = this;
        var noSelectItems = this.initArr.filter(function (item) { return !_this.hasSelectedItem.includes(item); });
        var len = noSelectItems.length;
        if (len === 0) {
            this.hasSelectedItem = [];
            noSelectItems = this.initArr.slice();
            len = noSelectItems.length;
        }
        var index = Math.floor(Math.random() * len);
        var itemIndex = noSelectItems[index];
        this.hasSelectedItem.push(itemIndex);
        return itemIndex;
    };
    return Pseudorandom;
}());
var Transformable = (function () {
    function Transformable(width, height, matrix, owner) {
        this.width = 0;
        this.height = 0;
        this.width = width;
        this.height = height;
        this.matrix = matrix;
        this.owner = owner;
        this.changed = null;
    }
    return Transformable;
}());
var UUType;
(function (UUType) {
    /**
     * 文本
     */
    UUType[UUType["TEXT"] = 1] = "TEXT";
    /**
     * 图片
     */
    UUType[UUType["IMAGE"] = 2] = "IMAGE";
    /**
     * 大音频
     */
    UUType[UUType["AUDIO"] = 3] = "AUDIO";
    /**
     * 小音频
     */
    UUType[UUType["AudioSmall"] = 302] = "AudioSmall";
    /**
     * 视频
     */
    UUType[UUType["VIDEO"] = 4] = "VIDEO";
    /**
     * 背景
     */
    UUType[UUType["BACKGROUND"] = 99] = "BACKGROUND";
    /**
     * 转盘
     */
    UUType[UUType["CIRCLE_SECTOR"] = 101] = "CIRCLE_SECTOR";
    /**
     * 弹出框卡片组件
     */
    UUType[UUType["CARDALERT"] = 1001] = "CARDALERT";
    /**
     * 弹出框卡片组件2
     */
    UUType[UUType["CARDALERT_SW"] = 1002] = "CARDALERT_SW";
    /**
     * 轮播图组件
     */
    UUType[UUType["SLIDESHOW"] = 1101] = "SLIDESHOW";
    /**
     * 跑马灯组件 常规
     */
    UUType[UUType["MARQUEE_NORMAL"] = 1201] = "MARQUEE_NORMAL";
    /**
     * 跑马灯组件 选学生
     */
    UUType[UUType["MARQUEE_STUDENT"] = 1202] = "MARQUEE_STUDENT";
    /**
     * 骰子
     */
    UUType[UUType["DICE"] = 1301] = "DICE";
    /**
     * 匹配
     */
    UUType[UUType["MATCH"] = 1401] = "MATCH";
    /**
     * 掉落
     */
    UUType[UUType["DROPOUT"] = 1501] = "DROPOUT";
    /**
     * 分类
     */
    UUType[UUType["CLASSIFY"] = 1601] = "CLASSIFY";
    /**
     * 图片拖拽1
     */
    UUType[UUType["DRAWIMAGE"] = 1801] = "DRAWIMAGE";
    /**
     * invite框1 全部人员可见
     */
    UUType[UUType["INVITEALL"] = 2001] = "INVITEALL";
    /**
     * 功能按钮 - start
     */
    UUType[UUType["BTNSTART"] = 3001] = "BTNSTART";
    /**
     * 星星闪烁特效
     */
    UUType[UUType["StarFlicker"] = 4001] = "StarFlicker";
    /**
     * 学生不可见组件
     */
    // Tips按钮
    UUType[UUType["BTNTIPS"] = 5001] = "BTNTIPS";
    // Reset按钮
    UUType[UUType["BTNRESET"] = 5002] = "BTNRESET";
    // Answer按钮
    UUType[UUType["BTNANSWER"] = 5003] = "BTNANSWER";
    // Teaching图片
    UUType[UUType["TEACHINGIMG"] = 5011] = "TEACHINGIMG";
    // invite虚线框
    UUType[UUType["INVITETEACHER"] = 5021] = "INVITETEACHER";
})(UUType || (UUType = {}));
var LayerSet = (function () {
    function LayerSet() {
        throw new Error('can not create a instance');
    }
    LayerSet.createInstance = function (layerClass, prop) {
        var translater = new layerClass(prop);
        return translater;
    };
    LayerSet.getLayer = function (list, type) {
        return list.filter(function (item) {
            return item.uuType === type;
        });
    };
    return LayerSet;
}());
var TipsContainer = (function (_super) {
    __extends(TipsContainer, _super);
    function TipsContainer(props) {
        var _this = _super.call(this) || this;
        // props
        _this.content = '';
        _this.templateResources = {
            bgUrl: '',
            soundClose: '',
        };
        _this.width = 1024;
        _this.height = 240;
        _this.bgUrl = '';
        _this.soundClose = '';
        _this.labelWidth = 1024 - 150;
        _this.labelHeight = 240 - 50;
        _this.btnClose = 'common_template#close1';
        MyConsole.info('TipsContainer Instance');
        // 模版资源
        var _a = props.templateResources, bgUrl = _a.bgUrl, soundClose = _a.soundClose;
        _this.bgUrl = bgUrl;
        _this.soundClose = soundClose;
        // 音效
        _this.soundCloseCom = new UUSoundCom(_this.soundClose);
        _this.content = props.content;
        _this.touchEnabled = false;
        _this.init();
        return _this;
    }
    TipsContainer.prototype.draw = function (group) {
        this.soundCloseCom.play();
        group.addChild(this);
    };
    // 关闭弹卡
    TipsContainer.prototype.closePanel = function () {
        this.soundCloseCom.play();
        this.$parent.removeChild(this);
    };
    // 显示弹卡
    TipsContainer.prototype.show = function () {
        this.soundCloseCom.play();
    };
    TipsContainer.prototype.init = function () {
        var bg = UIFactory.createImage(this.bgUrl, this.width, this.height);
        var btn = UIFactory.createImage(this.btnClose, 50, 50);
        btn.right = 25;
        btn.top = 25;
        btn.touchEnabled = true;
        btn.addEventListener(Mouse.START, this.closePanel, this);
        var content = this.createContent();
        this.addChild(bg);
        this.addChild(content);
        this.addChild(btn);
    };
    TipsContainer.prototype.createContent = function () {
        var group = UIFactory.createGroup(this.labelWidth, this.labelHeight);
        group.y = 25;
        group.x = 50;
        MyConsole.info('content = ' + this.content);
        var label = this.createLabel(this.content);
        group.addChild(label);
        return group;
    };
    TipsContainer.prototype.createLabel = function (text) {
        var label = new eui.Label();
        label.fontFamily = 'Muli';
        label.width = this.labelWidth;
        label.height = this.labelHeight;
        label.size = 30;
        label.textColor = 0x000000;
        label.lineSpacing = 2;
        label.text = text;
        return label;
    };
    return TipsContainer;
}(eui.Group));
// TypeScript file
/**
 * 功能按钮 基础组件
 */
var UUButton = (function (_super) {
    __extends(UUButton, _super);
    function UUButton(src) {
        var _this = _super.call(this) || this;
        _this.width = 100;
        _this.height = 49;
        _this.source = RES.getRes(src);
        return _this;
    }
    return UUButton;
}(eui.Image));
var UUSound = (function (_super) {
    __extends(UUSound, _super);
    function UUSound(mediaSrc) {
        var _this = _super.call(this) || this;
        _this._pauseTime = 0;
        MyConsole.info('UUSound Instance');
        _this.mediaSrc = mediaSrc;
        _this.touchEnabled = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    UUSound.prototype.play = function () {
        // sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        this._channel = this._sound.play(this._pauseTime, 1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
    };
    UUSound.prototype.pause = function () {
        if (this._channel) {
            this._pauseTime = this._channel.position;
            this.stop();
        }
    };
    UUSound.prototype.stop = function () {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
            this._channel.stop();
            this._channel = null;
        }
    };
    UUSound.prototype.replay = function () {
        if (this._channel) {
            this._pauseTime = 0;
            this.stop();
            this.play();
        }
    };
    UUSound.prototype.onAddToStage = function (event) {
        this.loadSound();
    };
    UUSound.prototype.onRemoveFromStage = function (event) {
        MyConsole.info('UUSound onRemoveFromStage.');
        this.stop();
    };
    // 音频相关
    UUSound.prototype.loadSound = function () {
        var _this = this;
        var sound = this._sound = new egret.Sound();
        // sound 加载完成监听
        sound.addEventListener(egret.Event.COMPLETE, function (e) {
            _this.initUI();
        }, this);
        sound.load(this.mediaSrc);
    };
    // 播放完成
    UUSound.prototype.onComplete = function (e) {
        this.stop();
    };
    return UUSound;
}(eui.Group));
// TypeScript file
/**
 * 声音组件
 */
var UUSoundCom = (function (_super) {
    __extends(UUSoundCom, _super);
    function UUSoundCom(mediaSrc) {
        var _this = _super.call(this) || this;
        _this._pauseTime = 0;
        MyConsole.info('UUSoundCom Instance');
        _this.mediaSrc = mediaSrc;
        _this.touchEnabled = false;
        _this.loadSound();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    UUSoundCom.prototype.play = function (loopNum) {
        if (loopNum === void 0) { loopNum = 1; }
        // sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        this._channel = this._sound.play(this._pauseTime, loopNum);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
    };
    UUSoundCom.prototype.pause = function () {
        if (this._channel) {
            this._pauseTime = this._channel.position;
            this.stop();
        }
    };
    UUSoundCom.prototype.stop = function () {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
            this._channel.stop();
            this._channel = null;
        }
    };
    UUSoundCom.prototype.replay = function () {
        if (this._channel) {
            this._pauseTime = 0;
            this.stop();
            this.play();
        }
    };
    UUSoundCom.prototype.onAddToStage = function (event) {
        // MyConsole.info('addtoStage 是否执行');
        // this.loadSound();
    };
    UUSoundCom.prototype.onRemoveFromStage = function (event) {
        MyConsole.info('UUSound onRemoveFromStage.');
        this.stop();
    };
    // 音频相关
    UUSoundCom.prototype.loadSound = function () {
        var sound = this._sound = new egret.Sound();
        sound.load(this.mediaSrc);
    };
    // 播放完成
    UUSoundCom.prototype.onComplete = function (e) {
        // MyConsole.info('播放完成');
        // if (this._channel) {
        //     this._channel.stop();
        // } else {
        //     this.stop();
        // }
    };
    return UUSoundCom;
}(eui.Group));
var WebVideo = (function () {
    function WebVideo(videoWidth, videoHeight, matrix) {
        this.currentTime = 0;
        this.isClear = false;
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.matrix = matrix;
        this.currentTime = 0;
        this.video = document.createElement('video');
        this.video.setAttribute('playsinline', 'true');
        this.video.controls = false;
        this.video.setAttribute('style', 'width: 100%; height: 100%; position: absolute; border: 0px; left: 0px; top: 0px;');
        var egretDomRoot = document.getElementById('egretDomRoot');
        var boxDiv = this.createBoxDom();
        this.boxDiv = boxDiv;
        boxDiv.appendChild(this.video);
        this.changeEgretDomRootPosition();
        if (egretDomRoot) {
            egretDomRoot.appendChild(boxDiv);
        }
        this.onScreenChange();
    }
    Object.defineProperty(WebVideo.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (src) {
            this._src = src;
            this.video.src = src;
        },
        enumerable: true,
        configurable: true
    });
    WebVideo.prototype.play = function () {
        this.video.currentTime = this.currentTime;
        this.video.play();
    };
    WebVideo.prototype.pause = function () {
        this.currentTime = this.video.currentTime;
        this.video.pause();
    };
    WebVideo.prototype.stop = function () {
        this.currentTime = 0;
        this.video.pause();
    };
    WebVideo.prototype.setEnded = function (cb, params) {
        this.video.addEventListener('ended', cb(params), true);
    };
    WebVideo.prototype.setCanPlay = function (cb, params) {
        this.video.addEventListener('canplay', cb(params), true);
    };
    WebVideo.prototype.setPoster = function (poster) {
        this.video.poster = poster;
    };
    WebVideo.prototype.clear = function () {
        this.stop();
        var egretDomRoot = document.getElementById('egretDomRoot');
        if (egretDomRoot) {
            egretDomRoot.removeChild(egretDomRoot.firstElementChild);
        }
        this.isClear = true;
    };
    WebVideo.prototype.createBoxDom = function () {
        var div = document.createElement('div');
        this.changeSize(div);
        return div;
    };
    WebVideo.prototype.changeSize = function (div) {
        var egretPlayer = document.querySelector('canvas');
        var t = egretPlayer.offsetWidth / 1024;
        var videoWidth = this.videoWidth;
        var videoHeight = this.videoHeight;
        var matrix = this.matrix;
        var a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d, x = matrix.x, y = matrix.y;
        videoWidth *= t;
        videoHeight *= t;
        x *= t;
        y *= t;
        var boxMatrix = "matrix(" + a + ", " + b + ", " + c + ", " + d + ", " + x + ", " + y + ")";
        div.setAttribute('style', "\n        position: absolute;\n        border: 0px;\n        left: 0px;\n        top: 0px;\n        transform-origin: 0% 0% 0px;\n        transform: " + boxMatrix + ";\n        width: " + videoWidth + "px;\n        height: " + videoHeight + "px;");
    };
    WebVideo.prototype.changeEgretDomRootPosition = function () {
        var egretDomRoot = document.getElementById('egretDomRoot');
        var canvas = document.querySelector('canvas');
        if (egretDomRoot) {
            egretDomRoot.style.left = canvas.style.left;
            egretDomRoot.style.top = canvas.style.top;
        }
    };
    WebVideo.prototype.screenChangeFn = function () {
        if (this.isClear) {
            return;
        }
        if (this.boxDiv) {
            this.changeSize(this.boxDiv);
            this.changeEgretDomRootPosition();
        }
    };
    WebVideo.prototype.onScreenChange = function () {
        var _this = this;
        var observer = new MutationObserver(function (mutations, observer) {
            mutations.forEach(function (mutation) {
                _this.screenChangeFn();
            });
        });
        var config = {
            attributes: true,
            attributeOldValue: true,
            attributeFilter: [
                'style',
            ],
        };
        var canvas = document.querySelector('canvas');
        observer.observe(canvas, config);
    };
    return WebVideo;
}());
/**
 * 滤镜工厂
 * 1、图片金色滤镜：createGlodFilter
 * 2、文本金色滤镜：createGlodFilterForText
 * 3、暗色滤镜：createShadowFilter
 */
var FilterFactory = (function () {
    function FilterFactory() {
    }
    FilterFactory.createGlodFilter = function () {
        var color = 0xFFD700; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 60; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 60; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 10; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        // let flag = 'add';
        // setInterval(() => {
        // 	if(glowFilter.blurX > 250) {
        // 		flag = 'reduce';
        // 	}
        // 	if(glowFilter.blurX <= 30) {
        // 		flag = 'add';
        // 	}
        // 	if(flag === 'add') {
        // 		glowFilter.blurX += 20;
        // 		glowFilter.blurY += 20;
        // 	}else {
        // 		glowFilter.blurX -= 20;
        // 		glowFilter.blurY -= 20;
        // 	}
        // }, 200);
        return glowFilter;
    };
    FilterFactory.createGlodFilterForText = function () {
        var color = 0xFFD700; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 20; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 20; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 5; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = egret.BitmapFilterQuality.HIGH; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        return glowFilter;
    };
    FilterFactory.createShadowFilter = function () {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0,
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return colorFlilter;
    };
    return FilterFactory;
}());
/**
 * UI工厂类
 */
var UIFactory = (function () {
    function UIFactory() {
    }
    UIFactory.createGroup = function (width, height) {
        var group = new eui.Group();
        if (width) {
            group.width = width;
        }
        if (height) {
            group.height = height;
        }
        return group;
    };
    UIFactory.createLabel = function (text, textColor, size) {
        if (textColor === void 0) { textColor = 0x000000; }
        var label = new eui.Label();
        label.text = text;
        label.textColor = textColor;
        if (size) {
            label.size = size;
        }
        return label;
    };
    UIFactory.createImage = function (url, width, height) {
        var image = new eui.Image();
        image.source = url;
        if (width) {
            image.width = width;
        }
        if (height) {
            image.height = height;
        }
        return image;
    };
    UIFactory.createHLayout = function (gap, horizontalAlign, verticalAlign) {
        if (gap === void 0) { gap = 10; }
        if (horizontalAlign === void 0) { horizontalAlign = egret.HorizontalAlign.LEFT; }
        if (verticalAlign === void 0) { verticalAlign = egret.VerticalAlign.TOP; }
        var hLayout = new eui.HorizontalLayout();
        hLayout.gap = gap;
        hLayout.horizontalAlign = horizontalAlign;
        hLayout.verticalAlign = verticalAlign;
        return hLayout;
    };
    UIFactory.createVLayout = function (gap, horizontalAlign, verticalAlign) {
        if (gap === void 0) { gap = 10; }
        if (horizontalAlign === void 0) { horizontalAlign = egret.HorizontalAlign.LEFT; }
        if (verticalAlign === void 0) { verticalAlign = egret.VerticalAlign.TOP; }
        var vLayout = new eui.VerticalLayout();
        vLayout.gap = gap;
        vLayout.horizontalAlign = horizontalAlign;
        vLayout.verticalAlign = verticalAlign;
        return vLayout;
    };
    UIFactory.createTLayout = function (count, hGap, vGap) {
        if (count === void 0) { count = 1; }
        if (hGap === void 0) { hGap = 10; }
        if (vGap === void 0) { vGap = 10; }
        var tLayout = new eui.TileLayout();
        tLayout.requestedColumnCount = count;
        tLayout.horizontalGap = hGap;
        tLayout.verticalGap = vGap;
        return tLayout;
    };
    UIFactory.createLayoutByNum = function (changeRowNum, realRowNum, defaultLayout) {
        if (defaultLayout === void 0) { defaultLayout = 'h'; }
        var layout;
        if (realRowNum <= changeRowNum) {
            if (defaultLayout === 'h') {
                layout = this.createHLayout();
            }
            else {
                layout = this.createVLayout();
            }
        }
        else {
            layout = this.createTLayout(changeRowNum);
        }
        return layout;
    };
    return UIFactory;
}());
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
var DirectionFilter = (function () {
    function DirectionFilter(callback) {
        this.isFirstTimeOut = true;
        this.directionList = [];
        this.time = 0; // 延时执行指令时间222
        if (!DirectionFilter._instance) {
            this.directionCallback = callback;
            DirectionFilter._instance = this;
        }
        return DirectionFilter._instance;
    }
    DirectionFilter.prototype.pushDirection = function (msg) {
        var _this = this;
        // 拦截同时多次调用turnPage 发送重复指令的情况；
        this.directionList.push(msg);
        // 防止多次启用定时器
        if (!this.isFirstTimeOut) {
            return;
        }
        this.isFirstTimeOut = false;
        setTimeout(function () {
            // 去重 相同指令只记录最后一次
            var newDirectionList = [];
            for (var i = 0, len = _this.directionList.length; i < len; i++) {
                var direction = _this.directionList[i];
                var findIndex = newDirectionList.indexOf(direction);
                if (findIndex !== -1) {
                    newDirectionList.splice(findIndex, 1);
                }
                newDirectionList.push(direction);
            }
            _this.directionList = newDirectionList;
            var filterArr = [];
            for (var i = _this.directionList.length - 1; i >= 0; i--) {
                var direction = JSON.parse(_this.directionList[i]);
                console.log('--> direction');
                console.log(direction);
                var id = direction.id, type = direction.type, isSingle = direction.isSingle;
                if (type === 3 && isSingle) {
                    if (filterArr.map(function (item) { return item.id; }).includes(id)) {
                        _this.directionList.splice(i, 1);
                    }
                    else {
                        filterArr.push(direction);
                    }
                }
            }
            console.log('--> directionList');
            console.log(_this.directionList);
            try {
                _this.directionList.forEach(function (message) {
                    _this.emitDirection(message);
                });
            }
            catch (e) {
                console.error('执行指令出错', e);
            }
            _this.directionList.length = 0;
            _this.isFirstTimeOut = true;
        }, this.time);
    };
    DirectionFilter.prototype.emitDirection = function (msg) {
        this.directionCallback && this.directionCallback(msg);
    };
    return DirectionFilter;
}());
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.width = 1024;
        _this.height = 768;
        _this.barWidth = 820;
        _this.barHeight = 13;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.onProgress = function (current, total) {
        var width = (current / total) * this.barWidth;
        this.bar.mask = new egret.Rectangle(0, 0, width, this.barHeight);
        this.textField.text = current + "/" + total;
    };
    LoadingUI.prototype.createView = function () {
        var bg = this.createBg();
        var barGroup = this.createBar();
        this.textField = this.createTextField();
        this.addChild(bg);
        this.addChild(barGroup);
        this.addChild(this.textField);
    };
    LoadingUI.prototype.createTextField = function () {
        var textField = new eui.Label();
        textField.horizontalCenter = 0;
        textField.y = 620;
        return textField;
    };
    LoadingUI.prototype.createBg = function () {
        return UIFactory.createImage('resource/images/loading/PreLoadingBg.png', this.width, this.height);
    };
    LoadingUI.prototype.createBar = function () {
        var group = UIFactory.createGroup(this.barWidth, this.barHeight);
        var bar = UIFactory.createImage('resource/images/loading/PreLoadingBar.png', this.barWidth, this.barHeight);
        group.horizontalCenter = 0;
        group.y = 674;
        bar.mask = new egret.Rectangle(0, 0, 0, this.barHeight);
        this.bar = bar;
        group.addChild(bar);
        return group;
    };
    return LoadingUI;
}(eui.Group));
var PageInfo = (function () {
    function PageInfo() {
        if (!PageInfo._instance) {
            PageInfo._instance = this;
        }
        return PageInfo._instance;
    }
    PageInfo.prototype.sendInfo = function (page) {
        console.log('--> sendInfo');
        var classrommTips = page.classroomTipsDis;
        console.log(classrommTips);
        this.sendClassroomTips(classrommTips);
    };
    PageInfo.prototype.sendClassroomTips = function (classrommTips) {
        var msg = {
            type: 1,
            msg: classrommTips,
        };
        callbackInSendInfo(JSON.stringify(msg));
    };
    return PageInfo;
}());
var PageMgr = (function () {
    function PageMgr() {
        this.curPage = 1;
        var allPage = window.previewData.list.length;
        this.allPage = allPage;
    }
    Object.defineProperty(PageMgr, "cur_page", {
        get: function () {
            return this.pageMgr().curPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageMgr, "all_page", {
        get: function () {
            return this.pageMgr().allPage;
        },
        enumerable: true,
        configurable: true
    });
    PageMgr.pageMgr = function () {
        if (!this._instance) {
            this._instance = new PageMgr();
        }
        return this._instance;
    };
    // 课件内鼠标样式设置，icon：鼠标样式，offset 偏移量，参见CSS鼠标样式定义
    PageMgr.cursorIcon = function (icon, offsetX, offsetY) {
        var body = document.body;
        if (icon === 'auto') {
            body.style.cursor = 'auto';
            return;
        }
        var str = 'url("' + icon + '") ' + offsetX + ' ' + offsetY + ', auto';
        body.style.cursor = str;
    };
    // 响应指令
    PageMgr.receiveMsg = function (msg) {
        MyConsole.info('--> receiveMsg');
        console.log(msg);
        this.reveiveMsgCallback(msg);
        // new DirectionFilter(this.reveiveMsgCallback.bind(this)).pushDirection(msg);
    };
    // 响应指令的回调函数
    PageMgr.reveiveMsgCallback = function (msg) {
        var msgJson = JSON.parse(msg);
        var id = msgJson.id, cmd = msgJson.cmd;
        // reset 当前页面
        if (cmd === '0000') {
            this.pageMgr().resetPage();
            return;
        }
        var pictures = this.pageMgr().getPreviewPagePictures();
        var pic = pictures.find(function (item) { return item.image.data.id === id; });
        var com = pic && pic.image;
        if (com && com.receiveMsg) {
            try {
                com.receiveMsg(msg);
            }
            catch (e) {
                console.error('指令报错：', e);
            }
        }
    };
    // 发送指令
    PageMgr.sendMsg = function (msg) {
        if (!window.GlobalData.isAuthority && window.GlobalData.userType === 1) {
            return;
        }
        callbackInSendMsg(msg);
    };
    // 上一页
    PageMgr.prevPage = function () {
        MyConsole.info('--> 上一页');
        if (this.pageMgr().curPage <= 1) {
            return;
        }
        this.pageMgr().curPage--;
        this.sureResourceIsFinish(this.cur_page);
    };
    // 下一页
    PageMgr.nextPage = function () {
        MyConsole.info('--> 下一页');
        if (this.pageMgr().curPage >= this.all_page) {
            return;
        }
        this.pageMgr().curPage++;
        this.sureResourceIsFinish(this.cur_page);
    };
    // 跳转到指定页
    PageMgr.turnPage = function (page) {
        MyConsole.info('--> 跳转到指定页');
        var pageIndexOut = parseInt(page, 10);
        if (pageIndexOut === this.pageMgr().curPage) {
            return;
        }
        this.pageMgr().curPage = pageIndexOut;
        this.sureResourceIsFinish(pageIndexOut);
    };
    // 首页加载完成
    PageMgr.firstPageIsLoaded = function () {
        MyConsole.info('--> 默认首页加载完成 firstPageIsLoaded');
        ClassrommMgr.callbackInResLoaded(PageMgr.all_page);
        var interactControl = !!window.previewData.list[0].interactControl;
        ClassrommMgr.callbackInPageLoaded(false, interactControl); // 参数默认值
        new PageInfo().sendInfo(window.previewData.list[0]);
    };
    // 确认资源加载完成
    PageMgr.sureResourceIsFinish = function (pageIndex) {
        if (pageIndex <= 0 || pageIndex > this.all_page) {
            return;
        }
        this.pageMgr().exchangePage(pageIndex - 1);
        var interactControl = !!window.previewData.list[pageIndex - 1].interactControl;
        ClassrommMgr.callbackInPageLoaded(false, interactControl); // 参数默认值
        new PageInfo().sendInfo(window.previewData.list[pageIndex - 1]);
    };
    // 切换页面
    PageMgr.prototype.exchangePage = function (index) {
        new Preview().go(index);
    };
    // 获取当前展示的组件列表
    PageMgr.prototype.getPreviewPagePictures = function () {
        return new Preview().pictureList[new Preview().pageIndex];
    };
    // 重置页面
    PageMgr.prototype.resetPage = function () {
        new Preview().resetPage();
    };
    return PageMgr;
}());
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: 'username' }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                MyConsole.info('login');
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var Preview = (function (_super) {
    __extends(Preview, _super);
    function Preview() {
        var _this = _super.call(this) || this;
        _this.width = 1024;
        _this.height = 768;
        _this.pages = []; // 该课件的数据列表
        _this.pageList = []; // 页面列表
        _this.pageIndex = 0; // 页面索引
        _this.displayGroup = new eui.Group(); // 用于渲染页面的容器
        _this.pictureList = []; // 记录每次渲染的页面的picture列表
        // 观察者
        _this.observer = ObserverNew.getInstance();
        // Game
        _this.game = new Game();
        _this.preloadNum = 1; // 预渲染页数
        _this.preloadResourceNum = 3; // 预加载资源页数
        // 事件集合
        _this.eventObj = {};
        if (!Preview._instance) {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            Preview._instance = _this;
        }
        return Preview._instance;
    }
    Preview.prototype.draw = function (pageIndex) {
        MyConsole.info('Preview draw...', LogType.info);
        this.pageIndex = pageIndex;
        // 清空交互动效
        this.game.addChild(this);
    };
    Preview.prototype.undraw = function () {
        this.observer.clear();
        this.game.removeChild(this);
    };
    Preview.prototype.getPages = function () {
        this.pages = window.previewData.list;
    };
    Preview.prototype.go = function (pageIndex) {
        MyConsole.info('this.pageList...');
        MyConsole.info('this.displayGroup...');
        this.pageIndex = pageIndex;
        this.displayGroup.removeChildren();
        var item = this.pageList[pageIndex];
        if (!item) {
            item = this.renderSinglePage(pageIndex);
            this.pageList[pageIndex] = item;
        }
        this.prePage = item;
        this.displayGroup.addChild(item);
        // 预渲染页面 后一页
        if (pageIndex + this.preloadNum <= this.pages.length - 1) {
            var group = this.pageList[pageIndex + this.preloadNum];
            if (!group) {
                group = this.renderSinglePage(pageIndex + this.preloadNum);
                this.pageList[pageIndex + this.preloadNum] = group;
            }
            this.displayGroup.addChildAt(group, 0);
        }
        // 预渲染页面 前一页
        // if (pageIndex - this.preloadNum >= 0) {
        //     let group = this.pageList[pageIndex - this.preloadNum];
        //     if (!group) {
        //         group = this.renderSinglePage(pageIndex - this.preloadNum);
        //         this.pageList[pageIndex - this.preloadNum] = group;
        //     }
        //     this.displayGroup.addChildAt(group, 0);
        // }
        // 预加载资源
        for (var i = pageIndex; i <= pageIndex + this.preloadResourceNum; i++) {
            this.preloadResource(i);
        }
        this.observer.clear();
        this.listenAnimate();
    };
    Preview.prototype.drawComById = function (id) {
        var pictures = this.pictureList[this.pageIndex];
        var pic = pictures.find(function (item) { return item.image.data.id === id; });
        if (pic) {
            pic.draw(new Preview().prePage);
        }
    };
    Preview.prototype.undrawComByType = function (type) {
        var pictures = this.pictureList[this.pageIndex];
        var pics = pictures.filter(function (item) { return item.image.data.type === type; });
        if (pics.length) {
            pics.forEach(function (pic) { return pic.undraw(new Preview().prePage); });
        }
    };
    Preview.prototype.hasComInPrePage = function (type) {
        var comTypes = this.prePage.$children.map(function (item) { return item.data && item.data.type; });
        return comTypes.includes(type);
    };
    Preview.prototype.getComById = function (id) {
        return this.prePage.$children.find(function (item) { return item.data && item.data.id === id; });
    };
    Preview.prototype.resetPage = function () {
        this.displayGroup.removeChild(this.prePage);
        this.displayGroup.addChild(this.prePage);
    };
    Preview.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    Preview.prototype.onAddToStage = function (event) {
        MyConsole.info('Preview onAddToStage...');
        this.pageList.length = 0;
        this.initEui();
        this.getPages();
        // PageMgr.turnPage((this.pageIndex + 1).toString());
        this.go(this.pageIndex);
        // 预渲染 以pageIndex为中心 包含前后各一页
        // const pageLength = this.pages.length;
        // const pageMaxIndex = pageLength - 1;
        // const max = this.pageIndex + this.preloadNum > pageMaxIndex ? pageMaxIndex : this.pageIndex + this.preloadNum;
        // const min = (max - 2 * this.preloadNum) > 0 ? (max - 2 * this.preloadNum) : 0;
        // for (let i = max; i >= min; i--) {
        //     const group = this.renderSinglePage(i);
        //     this.displayGroup.addChild(group);
        //     this.pageList[i] = group;
        // }
        // this.prePage = this.pageList[this.pageIndex];
        // this.displayGroup.addChild(this.prePage);
        // // 预加载资源
        // for (let i = this.pageIndex; i <= this.pageIndex + this.preloadResourceNum; i++) {
        //     this.preloadResource(i);
        // }
        // // 事件注册
        // this.observer.clear();
        // this.listenAnimate();
        PageMgr.firstPageIsLoaded();
    };
    Preview.prototype.initEui = function () {
        MyConsole.info('Preview initEui...');
        this.displayGroup.width = this.width;
        this.displayGroup.height = this.height;
        this.displayGroup.scrollEnabled = true;
        this.addChild(this.displayGroup);
    };
    // 创建单页的元素
    Preview.prototype.renderSinglePage = function (index) {
        var elements = this.pages[index].elements;
        var group = new SinglePageGroup(this.width, this.height, elements);
        var pictures = group.getPicturs();
        this.pictureList[index] = pictures;
        return group;
    };
    // 监听动效
    Preview.prototype.listenAnimate = function () {
        var _this = this;
        MyConsole.info('**** listenAnimate ****', LogType.obj);
        var triggerGroup = this.pages[this.pageIndex].properties.triggerGroup;
        var _loop_1 = function (i, len) {
            var _a = triggerGroup[i], originTarget = _a.originTarget, aimTagrget = _a.aimTagrget, animateType = _a.animateType;
            var originTargetId = originTarget.id;
            var aimTargetId = aimTagrget.id;
            this_1.observer.register(aimTagrget, animateType, function () {
                MyConsole.info('**** 触发交互动效 ****', LogType.obj);
                // 组件对象 - 源对象
                var originItemCom = _this.pictureList[_this.pageIndex]
                    .filter(function (item) { return item.image.data.id === originTargetId; })[0].image;
                // 组件对象 - 目标对象
                var aimTargetPic = _this.pictureList[_this.pageIndex]
                    .filter(function (item) { return item.image.data.id === aimTargetId; })[0];
                switch (animateType) {
                    case 'show':
                        if (aimTargetPic.image[animateType]) {
                            aimTargetPic.image[animateType]();
                        }
                        break;
                    default:
                        if (aimTargetPic.image[animateType]) {
                            aimTargetPic.image[animateType](originItemCom);
                        }
                        break;
                }
            });
            // 源对象监听click
            // 根据originTarget找到组件
            // 根据aimTarget和animateType找到回调函数
            var originItem = this_1.pictureList[this_1.pageIndex]
                .filter(function (item) { return item.image.data.id === originTargetId; })[0].image;
            if (!originItem) {
                return { value: void 0 };
            }
            originItem.touchEnabled = true;
            var id = originItem.data.id;
            if (this_1.eventObj[id]) {
                originItem.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this_1.eventObj[id], this_1);
            }
            this_1.eventObj[id] = function () {
                _this.observer.emit(aimTagrget, animateType);
            };
            originItem.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this_1.eventObj[id], this_1);
        };
        var this_1 = this;
        for (var i = 0, len = triggerGroup.length; i < len; i++) {
            var state_1 = _loop_1(i, len);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    // 预加载资源
    Preview.prototype.preloadResource = function (pageIndex) {
        MyConsole.info('preloadResource...');
        if (pageIndex > this.pages.length - 1) {
            return;
        }
        if (pageIndex < 0) {
            return;
        }
        var page = this.pages[pageIndex];
        // 只有在display模式有效
        if (!page.resources.length) {
            return;
        }
        page.resources.forEach(function (resName) {
            RES.getResAsync(resName);
        });
    };
    return Preview;
}(eui.Group));
var SinglePageGroup = (function (_super) {
    __extends(SinglePageGroup, _super);
    function SinglePageGroup(width, height, elements) {
        var _this = _super.call(this) || this;
        _this.elements = [];
        _this.pictures = [];
        _this.width = width;
        _this.height = height;
        _this.elements = elements;
        _this.init(elements);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    SinglePageGroup.prototype.drawComponents = function () {
        for (var i = 0, n = this.pictures.length; i < n; i++) {
            var picture = this.pictures[i];
            var data = picture.image.data;
            // if (!data.isView) { continue; }
            // 弹卡默认隐藏
            if (data.type === UUType.CARDALERT || data.type === UUType.CARDALERT_SW) {
                continue;
            }
            // 判断是否展示视频组件
            if (data.type === UUType.VIDEO && new Preview().prePage !== this) {
                continue;
            }
            // 根据角色和组件viewType字段决定组件是否可见
            var GlobalData = window.GlobalData;
            if (GlobalData) {
                if (GlobalData.userType === 1 && data.viewType === 2) {
                    continue;
                }
            }
            picture.draw(this);
        }
    };
    SinglePageGroup.prototype.getPicturs = function () {
        return this.pictures;
    };
    SinglePageGroup.prototype.onAddToStage = function () {
        MyConsole.info('--> SinglePageGroup onAddToStage');
        this.drawComponents();
    };
    SinglePageGroup.prototype.onRemoveFromStage = function () {
        // 切页时将页面初始化
        MyConsole.info('--> SinglePageGroup onRemoveFromStage...');
        for (var i = 0, n = this.pictures.length; i < n; i++) {
            var picture = this.pictures[i];
            var data = picture.image.data;
            // 移除视频组件
            if (data.type === UUType.VIDEO) {
                picture.undraw(this);
            }
        }
    };
    SinglePageGroup.prototype.init = function (elements) {
        var pictures = [];
        for (var i = 0, n = elements.length; i < n; i++) {
            var t = LayerSet.getLayer(Utils.getComs(), elements[i].type)[0];
            var com = LayerSet.createInstance(t, elements[i].props);
            com.name = elements[i].id;
            com.data = elements[i];
            if (elements[i].type === UUType.IMAGE
                || elements[i].type === UUType.BACKGROUND
                || elements[i].type === UUType.DRAWIMAGE
                || elements[i].type === UUType.TEACHINGIMG) {
                var src = elements[i].src;
                com.source = src;
            }
            var picture = new Picture(com, elements[i].matrix);
            pictures.push(picture);
        }
        this.pictures = pictures;
        this.createBg();
        this.drawComponents();
    };
    SinglePageGroup.prototype.undrawComponents = function () {
        for (var i = 0, n = this.pictures.length; i < n; i++) {
            var picture = this.pictures[i];
            var data = picture.image.data;
            if (!data.isView) {
                continue;
            }
            // 根据角色和组件viewType字段决定组件是否可见
            var GlobalData = window.GlobalData;
            if (GlobalData) {
                if (GlobalData.userType === 1 && data.viewType === 2) {
                    continue;
                }
            }
            picture.undraw(this);
        }
    };
    SinglePageGroup.prototype.createBg = function () {
        var rect = new eui.Rect(this.width, this.height, 0xa0d049);
        this.addChild(rect);
    };
    return SinglePageGroup;
}(eui.Group));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url === url) {
                // @ts-ignore
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            // @ts-ignore
            RES.getResByUrl('resource/gameEui.json', function (data) {
                // @ts-ignore
                window.JSONParseClass.setData(data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf('.exml') > -1) {
                var dataPath = url.split('/');
                dataPath.pop();
                var dirPath = dataPath.join('/') + '_EUI.json';
                // @ts-ignore
                if (!generateJSON.paths[url]) {
                    // @ts-ignore
                    RES.getResByUrl(dirPath, function (data) {
                        // @ts-ignore
                        window.JSONParseClass.setData(data);
                        egret.callLater(function () {
                            // @ts-ignore
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        // @ts-ignore
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            // @ts-ignore
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
var Components = (function () {
    function Components() {
    }
    Components.getComs = function () {
        return [UUBackground, UUVideo, DrawImage, UUImage, CardAlertSwitch, AudioSmall, InviteTeacher, BtnReset, StarFlicker];
    };
    return Components;
}());
// @ts-ignore
var Utils = (function () {
    function Utils() {
    }
    Utils.getComs = function () {
        // @ts-ignore
        return Components.getComs();
    };
    Utils.getTexture = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            RES.getResByUrl(url, function (texture) {
                resolve(texture);
            }, _this, RES.ResourceItem.TYPE_IMAGE);
        });
    };
    return Utils;
}());
// @ts-ignore
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        if (!Game._instance) {
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageInit, _this);
            Game._instance = _this;
        }
        return Game._instance;
    }
    Game.prototype.initEui = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editContaier, bg;
            return __generator(this, function (_a) {
                editContaier = new eui.Group();
                editContaier.x = 0;
                editContaier.y = 0;
                this.addChild(editContaier);
                bg = new egret.Shape();
                bg.graphics.beginFill(0xcccccc, 1);
                bg.graphics.drawRect(0, 0, this.width, this.height);
                bg.graphics.endFill();
                editContaier.addChild(bg);
                this.preview.width = this.width;
                this.preview.height = this.height;
                this.preview.x = 0;
                this.preview.y = 0;
                this.preview.scrollEnabled = true;
                editContaier.addChild(this.preview);
                return [2 /*return*/];
            });
        });
    };
    Game.prototype.onAddToStageInit = function (event) {
        mouse.enable(this.stage);
        mouse.setMouseMoveEnabled(true);
        this.preview = new Preview();
        this.initEui();
    };
    return Game;
}(eui.Component));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textfield = new egret.TextField();
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        // 资源允许跨域使用
        egret.ImageLoader.crossOrigin = 'anonymous';
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            // egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            // egret.ticker.resume();
        };
        // inject the custom material parser
        // 注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation('eui.IAssetAdapter', assetAdapter);
        egret.registerImplementation('eui.IThemeAdapter', new ThemeAdapter());
        this.runGame().catch(function (e) {
            MyConsole.info(e);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var g = new Game();
        g.width = this.width;
        g.height = this.height;
        this.addChild(g);
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var loadingView_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, RES.loadConfig('data/preload.json', '')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup('loading', 1)];
                    case 2:
                        _a.sent();
                        loadingView_1 = new LoadingUI();
                        this.stage.addChild(loadingView_1);
                        // 模拟classroom调用
                        loadingBegin();
                        return [4 /*yield*/, RES.loadGroup('preload', 0, loadingView_1)];
                    case 3:
                        _a.sent();
                        this.createGameScene();
                        setTimeout(function () { _this.stage.removeChild(loadingView_1); }, 500);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        MyConsole.info(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ alpha: 1 }, 200);
            tw.wait(2000);
            tw.to({ alpha: 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(eui.UILayer));
// TypeScript file
/**
 * 背景
 */
var UUBackground = (function (_super) {
    __extends(UUBackground, _super);
    function UUBackground() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layerName = '背景';
        _this.width = 1024;
        _this.height = 768;
        return _this;
    }
    UUBackground.uuType = UUType.BACKGROUND;
    return UUBackground;
}(eui.Image));
var UUVideo = (function (_super) {
    __extends(UUVideo, _super);
    function UUVideo(props) {
        var _this = _super.call(this) || this;
        _this.layerName = '视频';
        // props
        _this.width = 824;
        _this.height = 705;
        _this.mode = 1;
        _this.templateResources = {
            postUrl: '',
        };
        // component
        _this.videoWidth = 824;
        _this.videoHeight = 620;
        _this.postUrl = 'resource/template/Video/Video_posts1.jpeg';
        _this.startUrl = 'common_template#play';
        _this.pauseUrl = 'common_template#pause';
        _this.stopUrl = 'common_template#stop';
        _this.playState = 'stop';
        MyConsole.info('--> UUVideo Instance', LogType.obj);
        // 模版资源
        _this.mediaSrc = props.mediaSrc;
        _this.mode = props.mode;
        props.templateResources.postUrl = _this.postUrl;
        // 16:9
        if (_this.mode === 2) {
            _this.width = 912;
            _this.height = 627;
            _this.videoWidth = 912;
            _this.videoHeight = 512;
            _this.postUrl = 'resource/template/Video/Video_posts2.jpeg';
            props.templateResources.postUrl = _this.postUrl;
        }
        if (props.width && props.height) {
            _this.width = props.width;
            _this.height = props.height;
        }
        _this.touchEnabled = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    // 接收指令
    UUVideo.prototype.receiveMsg = function (msg) {
        var msgJson = JSON.parse(msg);
        var cmd = msgJson.cmd;
        switch (cmd) {
            case 1001:
                this.play();
                break;
            case 1002:
                this.pause();
                break;
            case 99:
                this.stop();
                break;
        }
    };
    UUVideo.prototype.onAddToStage = function (event) {
        this.loadVideo();
    };
    UUVideo.prototype.onRemoveFromStage = function (event) {
        MyConsole.info('--> UUVideo onRemoveFromStage', LogType.obj);
        this.playState = 'stop';
        this.webVideo && this.webVideo.clear();
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playMsg, this);
        this.pauseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stopMsg, this);
        this.stopBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshMsg, this);
    };
    UUVideo.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var btnBox;
            return __generator(this, function (_a) {
                btnBox = this.createBtnBox();
                this.addChild(btnBox);
                return [2 /*return*/];
            });
        });
    };
    // 音频相关
    UUVideo.prototype.loadVideo = function () {
        if (window.GlobalData.handleStatus === 1) {
            this.loadVideoByElement();
        }
        else {
            this.loadVideoByEgret();
        }
    };
    // 以egret Video方式展示
    UUVideo.prototype.loadVideoByEgret = function () {
        this._video = new egret.Video();
        this._video.width = this.videoWidth;
        this._video.height = this.videoHeight;
        this._video.fullscreen = false;
        this._video.poster = this.postUrl;
        this.addChild(this._video);
        this.init();
        // 本地开发测试用
        // this.mediaSrc = 'resource/template/Video/trailer.mp4';
        // MyConsole.info('mediaSrc = ' + this.mediaSrc);
        // this._video.load(this.mediaSrc);
    };
    // 以video 标签方式展示
    UUVideo.prototype.loadVideoByElement = function () {
        this.webVideo = new WebVideo(this.videoWidth, this.videoHeight, this.data.matrix);
        this.webVideo.src = this.mediaSrc;
        this.webVideo.setPoster(this.postUrl);
        this.webVideo.setCanPlay(this.init.bind(this), this);
        this.webVideo.setEnded(this.onComplete.bind(this), this);
    };
    UUVideo.prototype.play = function () {
        if (this.playState === 'play') {
            return;
        }
        this.playState = 'play';
        this.webVideo && this.webVideo.play();
    };
    UUVideo.prototype.pause = function () {
        if (this.playState !== 'play') {
            return;
        }
        this.playState = 'pause';
        this.webVideo && this.webVideo.pause();
    };
    UUVideo.prototype.stop = function () {
        if (this.playState === 'stop') {
            return;
        }
        this.playState = 'stop';
        this.webVideo && this.webVideo.stop();
    };
    // 播放完成
    UUVideo.prototype.onComplete = function (e) {
        this.stop();
    };
    // UI相关
    UUVideo.prototype.createBtnBox = function () {
        var btnGroup = UIFactory.createGroup(240, 60);
        var hLayout = new eui.HorizontalLayout();
        hLayout.gap = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        btnGroup.layout = hLayout;
        btnGroup.horizontalCenter = 0;
        btnGroup.bottom = 0;
        this.startBtn = this.createStartImg();
        this.pauseBtn = this.createPauseImg();
        this.stopBtn = this.createStopImg();
        btnGroup.addChild(this.startBtn);
        btnGroup.addChild(this.pauseBtn);
        btnGroup.addChild(this.stopBtn);
        return btnGroup;
    };
    UUVideo.prototype.createStartImg = function () {
        var startBtn = UIFactory.createImage(this.startUrl, 60, 60);
        startBtn.touchEnabled = true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playMsg, this);
        return startBtn;
    };
    UUVideo.prototype.createPauseImg = function () {
        var pauseBtn = UIFactory.createImage(this.pauseUrl, 60, 60);
        pauseBtn.touchEnabled = true;
        pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stopMsg, this);
        return pauseBtn;
    };
    UUVideo.prototype.createStopImg = function () {
        var stopBtn = UIFactory.createImage(this.stopUrl, 60, 60);
        stopBtn.touchEnabled = true;
        stopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshMsg, this);
        return stopBtn;
    };
    // 发送播放指令
    UUVideo.prototype.playMsg = function () {
        var msg = {
            cmd: 1001,
            type: 2,
            id: this.data.id,
        };
        PageMgr.sendMsg(JSON.stringify(msg));
    };
    // 发送停止指令
    UUVideo.prototype.stopMsg = function () {
        var msg = {
            cmd: 1002,
            type: 2,
            id: this.data.id,
        };
        PageMgr.sendMsg(JSON.stringify(msg));
    };
    // 发送更新指令
    UUVideo.prototype.refreshMsg = function () {
        var msg = {
            cmd: 99,
            type: 2,
            id: this.data.id,
        };
        PageMgr.sendMsg(JSON.stringify(msg));
    };
    UUVideo.uuType = UUType.VIDEO;
    return UUVideo;
}(eui.Group));
var DrawImage = (function (_super) {
    __extends(DrawImage, _super);
    function DrawImage(props) {
        var _this = _super.call(this) || this;
        _this.layerName = '拖拽';
        // props
        _this.templateResources = {
            soundDown: '',
        };
        _this.soundDown = '';
        MyConsole.info('DrawImage Instance');
        // 模版资源
        var soundDown = props.templateResources.soundDown;
        _this.soundDown = soundDown;
        // 音效
        _this.soundDownCom = new UUSoundCom(_this.soundDown);
        _this.touchEnabled = true;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    // 接收指令
    DrawImage.prototype.receiveMsg = function (msg) {
        var msgJson = JSON.parse(msg);
        var cmd = msgJson.cmd, x = msgJson.x, y = msgJson.y;
        switch (cmd) {
            case 505:
                this.down(x, y);
                break;
            case 501:
                this.move(x, y);
                break;
            case 503:
                this.up(x, y);
                break;
        }
    };
    DrawImage.prototype.onAddToStage = function (event) {
        this.init();
    };
    DrawImage.prototype.init = function () {
        this.addFilter();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downMsg, this);
    };
    DrawImage.prototype.down = function (x, y) {
        this.removeFilter();
        // 缩小功能
        // this.initScaleX = this.scaleX;
        // this.initScaleY = this.scaleY;
        // this.scaleX *= 0.9;
        // this.scaleY *= 0.9;
        this.x = x;
        this.y = y;
    };
    DrawImage.prototype.move = function (x, y) {
        this.x = x;
        this.y = y;
    };
    DrawImage.prototype.up = function (x, y) {
        this.soundDownCom.play();
        this.addFilter();
        // this.scaleX = this.initScaleX;
        // this.scaleY = this.initScaleY;
        this.x = x;
        this.y = y;
    };
    DrawImage.prototype.addFilter = function () {
        this.filters = [FilterFactory.createGlodFilter()];
    };
    DrawImage.prototype.removeFilter = function () {
        this.filters = [];
    };
    // 发送鼠标按下指令
    DrawImage.prototype.downMsg = function (evt) {
        evt.preventDefault();
        this.stage.addEventListener(Mouse.MOVE, this.moveMsg, this);
        this.stage.addEventListener(Mouse.END, this.upMsg, this);
        this.distanceX = evt.stageX - this.x;
        this.distanceY = evt.stageY - this.y;
        var x = Math.floor(evt.stageX - this.distanceX);
        var y = Math.floor(evt.stageY - this.distanceY);
        var msg = {
            cmd: 505,
            type: 4,
            x: x,
            y: y,
            id: this.data.id,
        };
        PageMgr.sendMsg(JSON.stringify(msg));
    };
    // 发送鼠标移动指令
    DrawImage.prototype.moveMsg = function (evt) {
        evt.preventDefault();
        var x = Math.floor(evt.stageX - this.distanceX);
        var y = Math.floor(evt.stageY - this.distanceY);
        var msg = {
            cmd: 501,
            type: 4,
            x: x,
            y: y,
            id: this.data.id,
        };
        PageMgr.sendMsg(JSON.stringify(msg));
    };
    // 发送鼠标抬起指令
    DrawImage.prototype.upMsg = function (evt) {
        evt.preventDefault();
        this.stage.removeEventListener(Mouse.MOVE, this.moveMsg, this);
        this.stage.removeEventListener(Mouse.END, this.upMsg, this);
        var x = Math.floor(evt.stageX - this.distanceX);
        var y = Math.floor(evt.stageY - this.distanceY);
        var msg = {
            cmd: 503,
            type: 3,
            x: x,
            y: y,
            id: this.data.id,
        };
        PageMgr.sendMsg(JSON.stringify(msg));
    };
    DrawImage.uuType = UUType.DRAWIMAGE;
    return DrawImage;
}(eui.Image));
// TypeScript file
/**
 * 图片组件
 */
var UUImage = (function (_super) {
    __extends(UUImage, _super);
    function UUImage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layerName = '图片';
        _this.isDraw = false;
        return _this;
    }
    UUImage.uuType = UUType.IMAGE;
    return UUImage;
}(eui.Image));
var CardAlertSwitch = (function (_super) {
    __extends(CardAlertSwitch, _super);
    function CardAlertSwitch(props) {
        var _this = _super.call(this) || this;
        _this.layerName = '弹卡';
        // props
        _this.mode = 0;
        _this.mediaSrc = '';
        _this.templateResources = {
            bdUrl: '',
            soundOpen: '',
            soundClose: '',
        };
        _this.width = 679;
        _this.height = 461;
        _this.bdUrl = '';
        _this.soundOpen = '';
        _this.soundClose = '';
        _this.btnClose = 'common_template#close2';
        MyConsole.info('CardAlertSwitch Instance');
        // 模版资源
        var _a = props.templateResources, bdUrl = _a.bdUrl, soundOpen = _a.soundOpen, soundClose = _a.soundClose;
        _this.bdUrl = bdUrl;
        _this.soundOpen = soundOpen;
        _this.soundClose = soundClose;
        // 音效
        _this.soundOpenCom = new UUSoundCom(_this.soundOpen);
        _this.soundCloseCom = new UUSoundCom(_this.soundClose);
        _this.mode = props.mode;
        _this.img = props.img;
        _this.mediaSrc = props.mediaSrc;
        if (_this.mode) {
            _this.bdUrl = "resource/template/CardAlert/type1/CardAlert_type1_bg" + _this.mode + ".png";
            props.templateResources.bdUrl = _this.bdUrl;
        }
        _this.touchEnabled = false;
        _this.onAddToStage();
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    // 接受事件绑定的触发
    CardAlertSwitch.prototype.show = function () {
        // 拦截多次触发显示
        if (new Preview().getComById(this.data.id)) {
            return;
        }
        var msg = {
            cmd: 201,
            type: 2,
            id: this.data.id,
        };
        PageMgr.sendMsg(JSON.stringify(msg));
    };
    // 接收指令
    CardAlertSwitch.prototype.receiveMsg = function (msg) {
        var msgJson = JSON.parse(msg);
        var cmd = msgJson.cmd;
        switch (cmd) {
            case 201:
                this.showPanel();
                break;
            case 202:
                this.closePanel();
                break;
            case 203:
                this.playAudio();
                break;
        }
    };
    CardAlertSwitch.prototype.onAddToStage = function () {
        MyConsole.info('CardAlert onAddToStage');
        this.init();
    };
    CardAlertSwitch.prototype.onRemoveFromStage = function (event) {
        MyConsole.info('CardAlertSwitch onRemoveFromStage');
        this.$parent && this.$parent.removeChild(this);
    };
    CardAlertSwitch.prototype.init = function () {
        var _this = this;
        var img = UIFactory.createImage(this.img);
        this.addChild(img);
        img.addEventListener(egret.Event.COMPLETE, function () {
            _this.width = img.width;
            _this.height = img.height;
            if (_this.mode) {
                var btn = UIFactory.createImage(_this.btnClose, 68, 68);
                btn.left = 15;
                btn.top = 15;
                btn.touchEnabled = true;
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.closePanelMsg, _this);
                _this.addChild(btn);
            }
            if (_this.mediaSrc) {
                _this.audio = new AudioSmall({ mediaSrc: _this.mediaSrc }, true);
                _this.audio.x = 55;
                _this.audio.y = _this.height - 66;
                _this.addChild(_this.audio);
                _this.audio.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.playAudioMsg, _this);
            }
        }, this);
    };
    // 关闭弹卡
    CardAlertSwitch.prototype.closePanel = function () {
        this.$parent && this.$parent.removeChild(this);
        this.soundCloseCom.play();
    };
    // 显示弹卡
    CardAlertSwitch.prototype.showPanel = function () {
        new Preview().drawComById(this.data.id);
        this.soundOpenCom.play();
    };
    // 播放audio
    CardAlertSwitch.prototype.playAudio = function () {
        this.audio.play();
    };
    // 发送播放audio指令
    CardAlertSwitch.prototype.playAudioMsg = function () {
        var msg = {
            cmd: 203,
            type: 4,
            id: this.data.id,
        };
        PageMgr.sendMsg(JSON.stringify(msg));
    };
    // 发送关闭弹卡的指令
    CardAlertSwitch.prototype.closePanelMsg = function () {
        var msg = {
            cmd: 202,
            type: 2,
            id: this.data.id,
        };
        PageMgr.sendMsg(JSON.stringify(msg));
    };
    CardAlertSwitch.uuType = UUType.CARDALERT_SW;
    return CardAlertSwitch;
}(eui.Group));
// TypeScript file
/**
 * 小音频组件
 */
var AudioSmall = (function (_super) {
    __extends(AudioSmall, _super);
    function AudioSmall(props, isChildCom) {
        if (isChildCom === void 0) { isChildCom = false; }
        var _this = _super.call(this, props.mediaSrc) || this;
        _this.layerName = '小音频';
        // component
        _this.width = 46;
        _this.height = 33;
        _this.startUrl = 'common_template#sound';
        _this.playState = 'stop';
        _this.isFinish = true;
        _this.isFirstClick = true;
        // 是否作为其他组件的子组件使用
        _this.isChildCom = isChildCom;
        MyConsole.info('AudioSmall Instance');
        return _this;
    }
    AudioSmall.prototype.initUI = function () {
        this.startBtn = this.createStartImg();
        this.addChild(this.startBtn);
    };
    // 音频相关
    AudioSmall.prototype.audioClick = function () {
        if (this.playState === 'stop') {
            this.playMsg();
        }
    };
    AudioSmall.prototype.play = function () {
        // 设置锚点为中心点, 使缩放动效以图形中心为原点
        if (this.isFirstClick) {
            this.isFirstClick = false;
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            this.x += this.width / 2;
            this.y += this.height / 2;
        }
        if (!this.isFinish) {
            return;
        }
        this.isFinish = false;
        _super.prototype.play.call(this);
        this.playState = 'playing';
        this.exchangePlayState();
    };
    AudioSmall.prototype.stop = function () {
        _super.prototype.stop.call(this);
        this.playState = 'stop';
        this.exchangePlayState();
    };
    // 接收指令
    AudioSmall.prototype.receiveMsg = function (msg) {
        var msgJson = JSON.parse(msg);
        var cmd = msgJson.cmd;
        switch (cmd) {
            case 1402:
                this.play();
                break;
        }
    };
    // UI相关
    AudioSmall.prototype.createStartImg = function () {
        var startBtn = UIFactory.createImage(this.startUrl);
        startBtn.percentWidth = 100;
        startBtn.percentHeight = 100;
        startBtn.horizontalCenter = 0;
        startBtn.verticalCenter = 0;
        startBtn.touchEnabled = true;
        if (!this.isChildCom) {
            startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.audioClick, this);
        }
        return startBtn;
    };
    // 播放状态转换
    AudioSmall.prototype.exchangePlayState = function () {
        var _this = this;
        var tw = egret.Tween.get(this);
        switch (this.playState) {
            case 'stop':
                tw.to({ scaleX: 1, scaleY: 1 }, 1000).call(function () {
                    _this.isFinish = true;
                });
                break;
            case 'playing':
                tw.to({ scaleX: 2, scaleY: 2 }, 1000);
                break;
        }
    };
    // 发送播放指令
    AudioSmall.prototype.playMsg = function () {
        var msg = {
            cmd: 1402,
            type: 4,
            id: this.data.id,
        };
        PageMgr.sendMsg(JSON.stringify(msg));
    };
    AudioSmall.uuType = UUType.AudioSmall;
    return AudioSmall;
}(UUSound));
// TypeScript file
/**
 * invite框组件 老师可见
 */
var InviteTeacher = (function (_super) {
    __extends(InviteTeacher, _super);
    function InviteTeacher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layerName = 'invite框-teacher';
        _this.isDraw = false;
        _this.width = 200;
        _this.height = 200;
        _this.source = RES.getRes('common_template#invite2');
        return _this;
    }
    InviteTeacher.uuType = UUType.INVITETEACHER;
    return InviteTeacher;
}(eui.Image));
/**
 * start按钮
 */
var BtnReset = (function (_super) {
    __extends(BtnReset, _super);
    function BtnReset() {
        var _this = _super.call(this, 'common_template#btn_reset') || this;
        _this.layerName = 'reset按钮';
        _this.isDraw = false;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    BtnReset.prototype.onAddToStage = function (event) {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resetPage, this);
    };
    BtnReset.prototype.resetPage = function () {
        // let preview: Preview = new Preview();
        // preview.go(preview.pageIndex);
        var parent = this.$parent;
        var children = parent.$children;
        var resetChildList = children.filter(function (child) { return !!child.reset; });
        MyConsole.info('resetChildList...');
        if (!resetChildList.length) {
            PageMgr.sendMsg(JSON.stringify({
                cmd: '0000',
                type: 1,
            }));
            return;
        }
        resetChildList.forEach(function (child) { return child.reset && child.reset(); });
    };
    BtnReset.uuType = UUType.BTNRESET;
    return BtnReset;
}(UUButton));
var StarFlicker = (function (_super) {
    __extends(StarFlicker, _super);
    function StarFlicker() {
        var _this = _super.call(this) || this;
        _this.layerName = '闪光特效';
        _this.width = 250;
        _this.height = 200;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StarFlicker.prototype.onAddToStage = function (event) {
        this.onGroupComplete();
    };
    StarFlicker.prototype.onGroupComplete = function () {
        var _this = this;
        var starArr = [
            'star_play_tex#xingxing2',
            'star_play_tex#xingxing3',
            'star_play_tex#xingxing4',
            'star_play_tex#xingxing5',
            'star_play_tex#xingxing6',
            'star_play_tex#xingxing7',
            'star_play_tex#xingxing8',
            'star_play_tex#xingxing9',
            'star_play_tex#xingxing10',
            'star_play_tex#xingxing11',
            'star_play_tex#xingxing12',
        ];
        var stage = [
            [50, 50],
            [100, 50],
            [150, 50],
            [200, 50],
            [250, 50],
            [50, 100],
            [100, 100],
            [150, 100],
            [200, 100],
            [250, 100],
            [50, 150],
        ];
        var imgArr = [];
        for (var i = 0, len = starArr.length; i < len; i++) {
            var txtr = RES.getRes(starArr[i]);
            var img = new egret.Bitmap(txtr);
            img.x = stage[i][0];
            img.y = stage[i][1];
            imgArr.push(img);
            this.addChild(img);
        }
        var num = 1;
        var animate1 = function () {
            _this.removeChild(imgArr[1]);
            _this.removeChild(imgArr[3]);
            _this.removeChild(imgArr[5]);
            _this.removeChild(imgArr[7]);
            _this.removeChild(imgArr[9]);
            _this.addChild(imgArr[0]);
            _this.addChild(imgArr[2]);
            _this.addChild(imgArr[4]);
            _this.addChild(imgArr[6]);
            _this.addChild(imgArr[8]);
            _this.addChild(imgArr[10]);
        };
        var animate2 = function () {
            _this.addChild(imgArr[1]);
            _this.addChild(imgArr[3]);
            _this.addChild(imgArr[5]);
            _this.addChild(imgArr[7]);
            _this.addChild(imgArr[9]);
            _this.removeChild(imgArr[0]);
            _this.removeChild(imgArr[2]);
            _this.removeChild(imgArr[4]);
            _this.removeChild(imgArr[6]);
            _this.removeChild(imgArr[8]);
            _this.removeChild(imgArr[10]);
        };
        this.timer = setInterval(function () {
            if (num === 1) {
                animate1();
            }
            else {
                animate2();
            }
            num++;
            num = num % 2;
        }, 300);
    };
    StarFlicker.uuType = UUType.StarFlicker;
    return StarFlicker;
}(eui.Group));
