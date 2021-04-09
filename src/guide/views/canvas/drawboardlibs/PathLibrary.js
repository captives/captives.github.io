const SEPARATOR = " ";

/**
 * 坐标转换
 * @param {Number} x    鼠标横坐标 
 * @param {Number} y    鼠标纵坐标 
 * @returns {Object(x, y)}  坐标对象 
 */
function transformMouse(x, y) {
    return { x: x, y: y };
}
/**
 * 直角三角形
 * @param {*} mouseFrom     坐标起始点
 * @param {*} mouseTo       坐标终点
 * @returns {String} 
 */
function rightangle(mouseFrom, mouseTo) {
    return ["M", mouseFrom.x, mouseFrom.y,
        "L", mouseFrom.x, mouseTo.y,
        "L", mouseTo.x, mouseTo.y,
        "Z"
    ].join(SEPARATOR);
}

/**
 * 三角形
 * @param {*} mouseFrom     坐标起始点
 * @param {*} mouseTo       坐标终点
 * @returns {String} 
 */
function equilateral(mouseFrom, mouseTo) {
    return "";
}

/**
 * 矩形
 * @param {*} mouseFrom     坐标起始点
 * @param {*} mouseTo       坐标终点
 * @returns {String} 
 */
function rectangle(mouseFrom, mouseTo) {
    return ["M", mouseFrom.x, mouseFrom.y,
        "L", mouseTo.x, mouseFrom.y,
        "L", mouseTo.x, mouseTo.y,
        "L", mouseFrom.x, mouseTo.y,
        "L", mouseFrom.x, mouseFrom.y,
        "z"
    ].join(SEPARATOR);
}

/**
 * 正方形
 * @param {*} mouseFrom     坐标起始点
 * @param {*} mouseTo       坐标终点
 * @returns {String} 
 */
function square(mouseFrom, mouseTo) {
    var left = mouseFrom.x,
        top = mouseFrom.y;
    mouseTo.x - left > mouseTo.y - top ? (mouseTo.y = top + mouseTo.x - left) : (mouseTo.x = left + mouseTo.y - top);
    return [
        "M", mouseFrom.x, mouseFrom.y,
        "L", mouseTo.x, mouseFrom.y,
        "L", mouseTo.x, mouseTo.y,
        "L", mouseFrom.x, mouseTo.y,
        "L", mouseFrom.x, mouseFrom.y,
        "Z"
    ].join(SEPARATOR);
}

/**
 * 正圆
 * @param {*} mouseFrom 坐标起始点
 * @param {*} mouseTo 坐标终点
 * @returns {Number} 半径
 */
function circle(mouseFrom, mouseTo) {
    let value = (mouseTo.x - mouseFrom.x) * (mouseTo.x - mouseFrom.x) + (mouseTo.y - mouseFrom.y) * (mouseTo.y - mouseFrom.y);
    return Math.sqrt(value);
}

/**
 * 箭头
 * @param {*} mouseFrom 坐标起始点
 * @param {*} mouseTo 坐标终点
 * @returns {String} 
 */
function arrow(mouseFrom, mouseTo) {
    const theta = 20;
    const headlen = 20;
    // 计算各角度和对应的P2,P3坐标
    var angle = (Math.atan2(mouseFrom.y - mouseTo.y, mouseFrom.x - mouseTo.x) * 180) / Math.PI,
        angle1 = ((angle + theta) * Math.PI) / 180,
        angle2 = ((angle - theta) * Math.PI) / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
    return [
        "M", mouseFrom.x, mouseFrom.y,
        "L", mouseTo.x, mouseTo.y,
        "M", mouseTo.x + topX, mouseTo.y + topY,
        "L", mouseTo.x, mouseTo.y,
        "L", mouseTo.x + botX, mouseTo.y + botY,
    ].join(SEPARATOR);
}


function image() {
    // fabric.Image.fromURL("/static/logo.jpg", (img) => {
    //     img.scale(0.5).set({
    //         left: fabric.util.getRandomInt(0, width / 2),
    //         top: fabric.util.getRandomInt(0, height) / 2,
    //         angle: -15,
    //         clipTo: function (ctx) {
    //             ctx.arc(0, 0, 300, 0, Math.PI * 2, true);
    //         },
    //     });
    //     this.canvas.add(img).setActiveObject(img);
    // });
}


module.exports = {
    transformMouse,
    arrow,
    rightangle,
    equilateral,
    rectangle,
    square,
    circle,
};