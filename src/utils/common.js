const queryGet = (name) => {
    const i = window.location.hash.indexOf('?') > 0 ? window.location.hash.indexOf('?') : window.location.hash.length;
    const search = window.location.hash.substr(i + 1);
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = decodeURIComponent(search).substr(1).match(reg);
    return r ? unescape(r[2]) : r;
};

const hashGetData = () => {
    const i = window.location.hash.indexOf('?') > 0 ? window.location.hash.indexOf('?') : window.location.hash.length;
    const path = window.location.hash.substr(1, i - 1);
    const search = window.location.hash.substr(i + 1);
    let r = {};
    if (search) {
        decodeURIComponent(search).split('&').map(item => {
            const list = item.split('=');
            r[list[0]] = list[1];
        })
    }
    return {...window.location, path, query: r };
}

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n); // http://stackoverflow.com/a/1830844/648802
};


const byteConver = (value) => {
    const limit = Number(value) || 0;
    let size = "";
    if (limit < 0.1 * 1024) { // 如果小于0.1KB转化成B
        size = limit.toFixed(2) + "B";
    } else if (limit < 0.1 * 1024 * 1024) { // 如果小于0.1MB转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
    } else if (limit < 0.1 * 1024 * 1024 * 1024) { // 如果小于0.1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    } else { //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }

    let sizestr = size + "";
    let len = sizestr.indexOf("\.");
    let dec = sizestr.substr(len + 1, 2);
    if (dec == "00") { //当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
}


const fileToBlob = (file, callback) => {
    let blob = null;
    let reader = new FileReader();
    reader.addEventListener('load', (e) => {
        if (typeof e.target.result === 'object') {
            blob = new Blob([e.target.result], { type: file.type });
        } else {
            blob = e.target.result
        }

        callback(blob);
    });
    reader.readAsArrayBuffer(file);
}

const fileToBase64 = (file, callback) => {
    let reader = new FileReader();
    reader.addEventListener('load', (e) => {
        callback(reader.result);
    })
    reader.readAsDataURL(file);
}

const downloadFile = (url, fileName, callback) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url + "?v" + Date.now();
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        callback && callback();
    }, 100);
}

export {
    queryGet,
    hashGetData,
    isNumber,
    byteConver,
    fileToBlob,
    fileToBase64,
    downloadFile
}