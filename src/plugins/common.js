//原生js实现复制内容到剪切板，兼容pc、移动端（支持Safari浏览器）
function copyTxt(text) {
    if (typeof document.execCommand !== "function") {
        alert("复制失败，请长按复制");
        return;
    }
    var dom = document.createElement("textarea");
    dom.value = text;
    dom.setAttribute('style', 'display: block;width: 1px;height: 1px;');
    document.body.appendChild(dom);
    dom.select();
    var result = document.execCommand('copy');
    document.body.removeChild(dom);
    if (result) {
        alert("复制成功");
        return;
    }
    if (typeof document.createRange !== "function") {
        alert("复制失败，请长按复制");
        return;
    }
    var range = document.createRange();
    var div = document.createElement('div');
    div.innerHTML = text;
    div.setAttribute('style', 'height: 1px;fontSize: 1px;overflow: hidden;');
    document.body.appendChild(div);
    range.selectNode(div);
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        selection.removeAllRanges();
    }
    selection.addRange(range);
    document.execCommand('copy');
    alert("复制成功")
}

//获取base64图片大小，返回kb数字
function calcBase64Size(base64url) {
    //把头部去掉
    var str = base64url.replace('data:image/png;base64,', '');

    // 找到等号，把等号也去掉
    var equalIndex = str.indexOf('=');
    if (str.indexOf('=') > 0) {
        str = str.substring(0, equalIndex);
    }

    // 原来的字符流大小，单位为字节
    var strLength = str.length;
    // 计算后得到的文件流大小，单位为字节
    return parseInt(strLength - (strLength / 8) * 2);
}


function byteConver(limit) {
    limit = limit || 0;
    let size = "";
    if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B
        size = limit.toFixed(2) + "B";
    } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
    } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    } else { //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }

    let sizestr = size + "";
    let len = sizestr.indexOf("\.");
    let dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {//当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
}


export {
    copyTxt,
    calcBase64Size,
    byteConver
}