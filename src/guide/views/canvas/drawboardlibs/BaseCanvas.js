const { fabric } = require('fabric');
const BaseEvent = require('./BaseEvent');
const { merge } = require('./utils');
const {
    arrow,
    rightangle,
    equilateral,
    rectangle,
    square,
    circle,
} = require('./PathLibrary');

const DrawType = {
    PEN: "pen", //画笔
    ARROW: "arrow", //箭头
    LINE: "line", //直线
    DOTTEDLINE: "dottedline", //虚线
    CIRCLE: "circle", //正圆
    ELLIPSE: "ellipse", //椭圆
    SQUARE: "square", //正方形
    RECTANGLE: "rectangle", //长方形
    RIGHTANGLE: "rightangle", //直角三角形
    TRIANGLE: "triangle", //等边三角形
    TEXT: "textbox", //文字
    SELECT: "select", //选中
    ERASER: "eraser", //橡皮擦,单个图像删除
};

const CanvasEvent = {
    DRAW_TYPE: "drawType", //教具切换
    CHANGE_PAINT: "changePaint", //属性修改
    SHAP_ADD: "shapAdd", //图形增加
    SHAP_UPDATE: "shapUpdate", //图形更新
    SHAP_DELETE: "shapDelete", //图形删除
    ERROR: "error", //错误
}

class BaseCanvas extends BaseEvent {
    constructor(el, _options, style) {
        super();
        this.options = merge({
            fill: "#409EFF", //图形填充色
            stroke: "#F56C6C", //线条颜色
            strokeWidth: 2, //线条宽度
            fontSize: 15, //字体大小
            toolbar: Object.values(DrawType), //
            drawingMode: true,
            writeMode: true,
            drawType: DrawType.PEN,
            size: { width: 800, height: 600 },
            selectionLineWidth: 1, //选择器边框
            selectionDashArray: [], //边框样式
            selectionColor: "rgba(121, 187, 255, 0.25)", // 选择器背景色
            selectionBorderColor: 'rgb(121, 187, 255)', // 选择器边框色

            borderColor: 'rgb(64, 158, 255)',
            borderDashArray: [],
            cornerColor: 'rgb(64, 158, 255)',
            cornerStrokeColor: 'rgb(64, 158, 255)',
            cornerDashArray: [],
            cornerSize: 10,
            cornerStyle: 'circle',
            padding: 5,
        }, _options);

        this.canvas = new fabric.Canvas(el, { containerClass: "oriole-container" });
        this.canvas.wrapperEl.style = style;
        const ratio = fabric.util.findScaleToFit(this.options.size, this.canvas);
        this.canvas.stopContextMenu = true;
        this.canvas.viewportTransform = [ratio, 0, 0, ratio,
            (this.canvas.getWidth() - this.options.size.width * ratio) / 2,
            (this.canvas.getHeight() - this.options.size.height * ratio) / 2
        ];

        this.setPaint(this.options);
        this.createToolBar(ratio);
        this.eventListener(this.canvas);

        this.drawingMode = this.options.drawingMode;
        this.writeMode = this.options.writeMode;

        console.log("dom size", this.canvas.viewportTransform, ratio, this.canvas.getWidth() + "x" + this.canvas.getHeight());
    }

    /**
     * 画板状态
     */
    set drawingMode(val) {
        this.options.drawingMode = val;
        if (this.canvas) {
            this.canvas.wrapperEl.style['pointer-events'] = val ? "auto" : "none";
            if (this.canvas.toolbar) {
                this.canvas.toolbar.style.display = val ? '' : 'none';
            }
        }
    }

    /**
     * 启用禁用
     */
    set writeMode(val) {
        this.options.writeMode = val;
        if (this.options.writeMode) {
            console.log('可以绘图,可以选择图形.....');
            this.changeMode(this.drawType);
        } else {
            this.canvas.selection = false;
            this.canvas.skipTargetFind = true;
            this.canvas.isDrawingMode = false;
            this.canvas.discardActiveObject();
            this.canvas.renderAll();
            console.log('禁止绘图.....');
        }

        this.canvas.requestRenderAll();
    }

    /**绘图类型 */
    get drawType() {
        return this.options.drawType;
    }

    /**颜色 */
    get stroke() {
        return this.options.stroke;
    }

    /**图形边框 */
    get strokeWidth() {
        return this.options.strokeWidth;
    }

    /**
     * 创建教具工具栏
     * @param {Number} ratio 屏幕缩放大小 
     */
    createToolBar(ratio) {
        const that = this;
        const ul = document.createElement('ul');
        ul.style.transform = `matrix(${ratio}, 0, 0, ${ratio}, 0, 0)`;
        const toolbar = this.options.toolbar || [];

        if (toolbar.indexOf(this.options.drawType) === -1) {
            this.options.drawType = toolbar[0];
        }

        console.log('createToolBar', ratio, this.options);
        toolbar.forEach(icon => {
            const li = document.createElement('li');
            li.className = icon;
            li.innerHTML = `<svg class="oriole-icon"><use xlink:href="#oriole${icon}"></use></svg>`;
            li.setAttribute('title', icon);
            li.onclick = function(event) {
                that.changeMode(icon);
            }
            ul.appendChild(li);
        });
        this.canvas.toolbar = ul;
        this.canvas.wrapperEl.appendChild(ul);
        this.changeMode(this.options.drawType);
        this.drawingMode = this.options.drawingMode;
    }

    eventListener(canvas) {
        canvas.on("path:created", ({ path }) => {
            if (this.drawType === DrawType.PEN && path) {
                console.log("自由绘图", path.toJSON());
                path.id = "line_" + Date.now();
                this.emit(CanvasEvent.SHAP_ADD, { id: path.id, ...path.toJSON() });
            }
        });

        //文本更改后
        canvas.on("text:changed", ({ target }) => {
            console.log("text:changed 文本更改", target);

            if (target.left + target.width > canvas.getWidth()) {
                // target.set('width', canvas.getWidth() - target.left);
                target.width = canvas.getWidth() - target.left;
                target.setOptions({ width: canvas.getWidth() - target.left });
                console.log('有效最大宽度', canvas.getWidth() - target.left, "越界宽度", target.width - canvas.getWidth() + target.left);
            }

            if (target.top + target.height > canvas.getHeight()) {
                // target.set('height', canvas.getHeight() - target.top);
                target.height = canvas.getHeight() - target.top;
                target.setOptions({ height: canvas.getHeight() - target.top });
                console.log('有效最大高度', canvas.getHeight() - target.top, "越界高度", target.height - canvas.getHeight() + target.top);
            }
            canvas.requestRenderAll();
            this.emit(CanvasEvent.SHAP_UPDATE, [{ id: target.id, ...target.toJSON() }]);
        });

        //在转换或任何更改结束时, 包含rotated、skewed、scaled、moved
        canvas.on("object:modified", (data) => {
            console.log('object:modified', data);
            this.activeObjectsUpdate();
        });

        canvas.on("selection:updated", ({ selected }) => {
            console.log('selection:updated ---->', selected);
            this.updateSelectedStyle(selected);
        });

        canvas.on("selection:created", ({ selected }) => {
            console.log('selection:created', selected);
            this.updateSelectedStyle(selected);
            //删除操作
            if (this.options.drawType === DrawType.ERASER) {
                let objects = [];
                selected.forEach(kclass => {
                    objects.push({ id: kclass.id });
                    this.remove(kclass);
                });
                this.emit(CanvasEvent.SHAP_DELETE, objects);
            }
        });
    }

    updateSelectedStyle(selected) {
        selected.forEach(kclass => {
            kclass.setOptions({
                borderColor: this.options.borderColor,
                borderDashArray: this.options.borderDashArray,
                cornerColor: this.options.cornerColor,
                cornerStrokeColor: this.options.cornerStrokeColor,
                cornerDashArray: this.options.cornerDashArray,
                cornerSize: this.options.cornerSize,
                cornerStyle: this.options.cornerStyle,
                padding: this.options.padding,
            });
        });
        this.canvas.renderAll();
    }


    setPaint(options) {
        this.options = merge(this.options, options);
        console.log('___setPaint', this.options);

        if (this.canvas) {
            this.canvas.selectionLineWidth = this.options.selectionLineWidth;
            this.canvas.selectionDashArray = this.options.selectionDashArray;
            this.canvas.selectionColor = this.options.selectionColor;
            this.canvas.selectionBorderColor = this.options.selectionBorderColor;
            if (this.canvas.freeDrawingBrush) {
                this.canvas.freeDrawingBrush.color = this.options.stroke;
                this.canvas.freeDrawingBrush.width = this.options.strokeWidth;
            }

            this.canvas.getActiveObjects().forEach(kclass => {
                const option = {...this.options };
                if ([DrawType.ARROW, DrawType.CIRCLE, DrawType.ELLIPSE, DrawType.SQUARE, DrawType.RECTANGLE, DrawType.RIGHTANGLE, DrawType.TRIANGLE].indexOf(kclass.type) != -1) {
                    option.fill = "rgba(0, 0, 0, 0)";
                }

                if (DrawType.TEXT == kclass.type) {
                    option.strokeWidth = 1;
                    option.fill = option.stroke;
                    option.stroke = option.stroke;
                }
                kclass.setOptions(option);
            });
            this.canvas.renderAll();
            this.emit(CanvasEvent.CHANGE_PAINT, this.options);

            this.activeObjectsUpdate();
        }
    }

    /**
     * 活动对象属性更新
     */
    activeObjectsUpdate() {
        var objects = [];
        this.canvas.getActiveObjects().forEach((kclass) => {
            const json = kclass.toJSON();
            objects.push({ id: kclass.id, ...json });
        });

        if (objects.length > 0) {
            this.emit(CanvasEvent.SHAP_UPDATE, objects);
        }
    }

    /**
     * 工具菜单切换
     * @param {Enum | String} type 
     */
    changeMode(type) {
        if (Object.values(DrawType).indexOf(type) == -1) {
            this.emit(CanvasEvent.ERROR, 'drawType', '无效的工具类型');
            return;
        }

        this.options.drawType = type;
        if (this.canvas.toolbar) {
            const list = this.canvas.toolbar.querySelectorAll('li');
            list.forEach(node => {
                if (node.className.split(" ").indexOf(type) != -1) {
                    if (node.className.split(" ").indexOf('active') == -1) {
                        node.className += " active";
                        this.emit(CanvasEvent.DRAW_TYPE, type);
                    }
                } else {
                    node.className = node.className.replace(' active', "");
                }
            });
        }

        if (this.options.writeMode) {
            this.canvas.selection = false; //开启元素多选择
            switch (type) {
                case DrawType.PEN:
                    this.canvas.isDrawingMode = true;
                    this.canvas.skipTargetFind = true;
                    // this.canvas.selection = false; //开启元素多选择
                    break;
                case DrawType.SELECT:
                    this.canvas.isDrawingMode = false; //关闭自由绘图
                    this.canvas.skipTargetFind = false;
                    // this.canvas.selection = true; //开启元素多选择
                    break;
                case DrawType.ERASER:
                    this.canvas.isDrawingMode = false;
                    this.canvas.skipTargetFind = false;
                    // this.canvas.selection = ture;
                    this.canvas.discardActiveObject(); //清楚选中框
                    break;
                case DrawType.TEXT:
                    this.canvas.isDrawingMode = false;
                    this.canvas.skipTargetFind = true;
                    this.canvas.selection = true;
                    this.canvas.discardActiveObject(); //清楚选中框
                    break;
                default:
                    this.canvas.isDrawingMode = false;
                    this.canvas.skipTargetFind = true; //不能被选中
                    // this.canvas.selection = false; //元素多选
                    this.canvas.discardActiveObject(); //清楚选中框
                    break;
            }
            this.canvas.requestRenderAll();
        }
    }

    /**
     * 添加图形
     * @param {*} shap 
     */
    add(shap, type, id) {
        if (shap) {
            shap.id = id || ("shap_" + Date.now());
            shap.shapType = type; //实际绘制出来的图形类型
            shap.type = type;
            this.canvas.add(shap);
        }
    }

    /**
     * 移除图形
     * @param {Kclass}} shap 
     */
    remove(shap) {
        if (shap) {
            this.canvas.remove(shap);
        }
    }

    /**
     * 移除指定图形
     * @param {String} id 
     */
    removeById(id) {
        if (id) {
            const list = this.canvas.getObjects();
            list.forEach(kclass => {
                if (kclass.id === id) {
                    this.remove(kclass);
                }
            });
        }
    }

    /**
     * 划线
     * @param {*} from 起始坐标
     * @param {*} to 终点坐标
     */
    createLine(from, to, options) {
        return new fabric.Line([from.x, from.y, to.x, to.y], merge({
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
            strokeLineJoin: "round",
        }, options));
    }

    /**
     * 划虚线
     * @param {*} from 起始坐标
     * @param {*} to 终点坐标
     */
    createDottedline(from, to, options) {
        return new fabric.Line([from.x, from.y, to.x, to.y], merge({
            strokeDashArray: [this.strokeWidth, this.strokeWidth], //宽度、间距
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
            strokeLineJoin: "round",
        }, options));
    }

    /**
     * 箭头
     * @param {*} from 起始坐标
     * @param {*} to 终点坐标
     */
    createArrow(from, to, options) {
        return new fabric.Path(arrow(from, to), merge({
            fill: "rgba(0,0,0,0)",
            stroke: this.options.stroke,
            strokeWidth: this.strokeWidth,

        }, options));
    }

    /**
     * 正圆
     * @param {*} from 起始坐标
     * @param {*} to 终点坐标
     */
    createCircle(from, to, options) {
        return new fabric.Circle(merge({
            left: from.x,
            top: from.y,
            fill: "rgba(255, 255, 255, 0)",
            originX: "center",
            originY: "center",
            radius: circle(from, to),
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
        }, options));
    }

    /**
     * 椭圆
     * @param {*} from 起始坐标
     * @param {*} to 终点坐标
     */
    createEllipse(from, to, options) {
        return new fabric.Ellipse(merge({
            left: (to.x - from.x) / 2 + from.x,
            top: (to.y - from.y) / 2 + from.y,
            fill: "rgba(255, 255, 255, 0)",
            originX: "center",
            originY: "center",
            rx: Math.abs(from.x - to.x),
            ry: Math.abs(from.y - to.y),
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
        }, options));
    }

    /**
     * 正方形
     * @param {*} from 起始坐标
     * @param {*} to 终点坐标
     */
    createSquare(from, to, options) {
        return new fabric.Path(square(from, to), merge({
            left: to.x - (to.x - from.x) / 2,
            top: to.y - (to.y - from.y) / 2,
            fill: "rgba(255, 255, 255, 0)",
            originX: "center",
            originY: "center",
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
        }, options));
    }

    /**
     * 矩形
     * @param {*} from 起始坐标
     * @param {*} to 终点坐标
     */
    createRectangle(from, to, options) {
        return new fabric.Path(rectangle(from, to), merge({
            left: to.x - (to.x - from.x) / 2,
            top: to.y - (to.y - from.y) / 2,
            fill: "rgba(255, 255, 255, 0)",
            originX: "center",
            originY: "center",
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
        }, options));
    }

    /**
     * 直角三角形
     * @param {*} from 起始坐标
     * @param {*} to 终点坐标
     */
    createRightangle(from, to, options) {
        return new fabric.Path(rightangle(from, to), merge({
            left: to.x - (to.x - from.x) / 2,
            top: to.y - (to.y - from.y) / 2,
            fill: "rgba(255, 255, 255, 0)",
            originX: "center",
            originY: "center",
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
        }, options));
    }

    /**
     * 等边三角形
     * @param {*} from 起始坐标
     * @param {*} to 终点坐标
     */
    createTriangle(from, to, options) {
        var height = to.y - from.y;
        return new fabric.Triangle(merge({
            left: from.x,
            top: from.y,
            fill: "rgba(255, 255, 255, 0)",
            originX: "center",
            originY: "center",
            width: Math.sqrt(Math.pow(height, 2) + Math.pow(height / 2.0, 2)),
            height: height,
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
        }, options));
    }

    /**
     * 创建路径图
     * @param {String} path path路径
     * @param {*} option 选项
     */
    createPath(path, option) {
        return new fabric.Path(path, option);
    };

    /**
     * 文本框
     * @param {*} from 起始坐标
     * @param {*} to 终点坐标
     */
    createTextBox(from, to, text, options) {
        return new fabric.Textbox(text, merge({
            fontSize: this.options.fontSize,
            left: from.x,
            top: from.y,
            fill: this.options.stroke,
            originX: 'left',
            width: to.x - from.x,
            height: to.y - from.y,
            backgroundColor: "rgba(83, 168, 255, 0.35)",
            editingBorderColor: 'rgb(83, 168, 255)', //编辑框的边框色
            strokeWidth: 10,
            breakWords: true,
        }, options));
    }

    /**
     * 文本
     * @param {*} from 起始坐标
     * @param {*} to 终点坐标
     */
    createText(text, options) {
        return new fabric.Textbox(text, merge(options, {
            breakWords: true,
        }));
    }

    /**
     * 设置画布大小
     * @param {Number} width 
     * @param {Number} height 
     */
    setSize(width, height) {
        if (this.canvas) {
            this.canvas.setWidth(width);
            this.canvas.setHeight(height);
        }
    }

    /**
     * 返回画布的对象表示
     * @returns 实例的对象表示
     */
    toObject() {
        if (!this.canvas.isEmpty()) {
            return this.canvas.toObject();
        }
        return null;
    }

    /**
     * 返回画布的JSON表示形式
     * @returns JSON字符串
     */
    toJSON() {
        if (!this.canvas.isEmpty()) {
            return this.canvas.toJSON();
        }
        return null;
    }

    /**
     * 返回画布的最小JSON表示形式
     * @returns JSON字符串
     */
    toDatalessJSON() {
        if (!this.canvas.isEmpty()) {
            return this.canvas.toDatalessJSON();
        }
        return null;
    }

    /**
     * 返回画布的SVG表示形式
     */
    toSVG(options, reviver) {
        if (!this.canvas.isEmpty()) {
            return this.canvas.toSVG(options, reviver);
        }
        return null;
    }

    /**
     * 将canvas元素导出到dataurl图像。请注意，使用倍增器时，裁剪会适当缩放
     * @param {*} options 
     * @returns URL，该对象包含由options.format指定的格式的对象的表示形式
     */
    toDataURL(options) {
        if (!this.canvas.isEmpty()) {
            return this.canvas.toDataURL(options);
        }
        return null;
    }

    /**
     * 使用来自指定JSON的数据填充画布。JSON格式必须符合fabric.Canvas＃toJSON之一。
     * @param {*} json JSON字符串或对象
     * @param {*} callback 回调，在解析json并初始化对应的对象（例如fabric.Image）时调用
     * @param {*} reviver 进一步解析JSON元素的方法，在创建每个Fabric对象之后调用。
     */
    // loadFromJSON(json, callback, reviver) {
    //     if (this.canvas) {
    //         this.canvas.loadFromJSON(json, () => {
    //             this.canvas.renderAll();
    //             callback && callback();
    //         }, reviver);
    //     }
    // }

    /**
     * @return 返回实例的字符串表示形式
     */
    toString() {
        return this.canvas.toString();
    }

    /**
     * 清屏
     */
    clear() {
        if (this.canvas) {
            this.canvas.clear();
        }
    }
}

module.exports = { BaseCanvas, CanvasEvent, DrawType };