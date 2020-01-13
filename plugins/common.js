
//原生js实现复制内容到剪切板，兼容pc、移动端（支持Safari浏览器）
function copyTxt(text){
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