/**
 * Created by Administrator on 2018/8/22.
 */

function VideoCanvas(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.context = null;
    this.fullScreen = false;
}

VideoCanvas.prototype.create = function (parent) {
    var canvas = this.canvas = document.createElement('canvas');
    canvas.setAttribute('class', 'video-item');
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');
    this.reset();
    this.behavior(canvas);
    parent.appendChild(canvas);
};

VideoCanvas.prototype.reset = function () {
    var canvas = this.canvas;
    $(canvas).animate({
        left: this.x + 'px',
        top: this.y + 'px',
        width: this.width,
        height: this.height
    });
};

VideoCanvas.prototype.draw = function (source) {
    this.clear();
    this.context.drawImage(source, this.x, this.y, this.width, this.height, 0, 0, this.width, this.height);
};

VideoCanvas.prototype.behavior = function (target) {
    //TODO 拖动
    target.onmousedown = function (event) {
        event = event || window.event;
        var that = this;
        var begin = {x: event.clientX, y: event.clientY};
        window.onmousemove = function (evt) {
            evt = evt || window.event;
            var after = {x: evt.clientX, y: evt.clientY};
            that.style.left = parseInt(that.style.left.replace("px", "")) + (after.x - begin.x) + "px";
            that.style.top = parseInt(that.style.top.replace("px", "")) + (after.y - begin.y) + "px";
            begin = after;
        };

        window.onmouseup = function () {
            this.onmousemove = null;
        };

        //TODO 调整位置
        var childNodes = target.parentNode.childNodes || [];
        childNodes.forEach(function (item) {
            item.style['z-index'] = 0;
        });
        target.style['z-index'] = 1;
    };

    var that = this;
    //TODO 缩放
    target.ondblclick = function (event) {
        that.fullScreen = !that.fullScreen;
        if (that.fullScreen) {
            $(target).animate({
                left: 0, top: 0,
                width: target.parentNode.offsetWidth,
                height: target.parentNode.offsetHeight,
            });
        } else {
            that.reset();
        }
    }
};

VideoCanvas.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
};


/*********************************************************/
//切割的canvas
var list = [];
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var panel = document.getElementById("video-group");
var context = canvas.getContext("2d");

function drawSplitLine(context, rows, cols) {
    //单个视图的宽高
    var width = video.offsetWidth / cols;
    var height = video.offsetHeight / rows;
    context.strokeStyle = "#FFFFFF";
    for (var c = 1; c <= cols; c++) {
        for (var r = 1; r <= rows; r++) {
            context.beginPath();
            context.shadowOffsetX = 5;
            context.shadowOffsetY = 5;
            context.shadowColor = "rgba(100,100,100,0.5)";
            context.shadowBlur = 7;

            context.moveTo((c - 1) * width, r * height);
            context.lineTo(c * width, r * height);
            context.lineTo(c * width, (r - 1) * height);
            context.stroke();
        }
    }
}

function createVideo(parent, rows, cols) {
    var childNodes = parent.childNodes || [];
    childNodes.forEach(function (item) {
        item.parentNode.removeChild(item);
    });

    var width = parent.offsetWidth / cols;
    var height = parent.offsetHeight / rows;

    for (var r = 1; r <= rows; r++) {
        for (var c = 1; c <= cols; c++) {
            var videoCanvas = new VideoCanvas(width * (c - 1), height * (r - 1), width, height);
            videoCanvas.create(parent);
            list.push(videoCanvas);
        }
    }
}

function drawSplitVideo(source, width, height) {
    list.forEach(function (videoCanvas) {
        videoCanvas.draw(source, width, height);
    });
}

function resetVideo() {
    list.forEach(function (videoCanvas) {
        videoCanvas.reset();
    });
}

function drawVideo(source) {
    context.clearRect(0, 0, source.offsetWidth, source.offsetHeight);
    context.drawImage(source, 0, 0, source.offsetWidth, source.offsetHeight);
    drawSplitVideo(canvas);
    // drawSplitVideo(source);
}

function animate() {
    drawVideo(video);
    drawSplitLine(context, 4, 4);

    if ("requestAnimationFrame" in window) {
        requestAnimationFrame(animate);
    }else if ("webkitRequestAnimationFrame" in window) {
        webkitRequestAnimationFrame(animate);
    }else if ("msRequestAnimationFrame" in window) {
        msRequestAnimationFrame(animate);
    }else if ("mozRequestAnimationFrame" in window) {
        mozRequestAnimationFrame(animate);
    }
}

function start() {
    createVideo(panel, 4, 4);
    animate();
    video.src = "/medias/Piper_HD720.mp4";
}

document.querySelector('#resetBtn').onclick = function (e) {
    resetVideo();
};

// document.querySelector('#video-group').onmousemove = function () {
//     document.querySelector('#control-group').style.bottom = '-5px';
// };
//
// document.querySelector('#video-group').onmouseout = function () {
//     document.querySelector('#control-group').style.bottom = '-55px';
// };

window.onload = start;