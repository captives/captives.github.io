const { BaseCanvas, CanvasEvent, DrawType } = require('./BaseCanvas');

class Canvas extends BaseCanvas {
    constructor(el, _options, style) {
        super(el, _options, style);
        this.mouseDown = false;
        this.startTime = 0;
        this.mouseFrom = { x: 0, y: 0 };
        this.mouseTo = { x: 0, y: 0 };
        this.canvasObject = null; //绘图元素
        this.textBoxObject = null; //文本框
        this.currentTarget = {
            id: null,
            points: []
        };
    }

    eventListener(_canvas) {
        super.eventListener(_canvas);

        _canvas.on("mouse:down", this.mouseDownHandler.bind(this));
        _canvas.on("mouse:up", this.mouseUpHandler.bind(this));
        _canvas.on("mouse:move", this.mouseMoveHandler.bind(this));
    }

    mouseDownHandler(dataEvent) {
        console.log("down....", this.canvas.isDrawingMode, dataEvent);
        if (this.options.writeMode) {
            this.mouseDown = true;
            this.startTime = Date.now();
            this.mouseFrom = dataEvent.pointer;
        }
    }

    mouseUpHandler(dataEvent) {
        console.log("up....", this.canvas.isDrawingMode, dataEvent);

        if (this.options.writeMode) {
            this.mouseDown = false;
            this.startTime = 0;
            this.mouseTo = dataEvent.pointer;
            if (this.canvasObject) {
                this.startDrawing(dataEvent.e);
                this.emit(CanvasEvent.SHAP_ADD, { id: this.canvasObject.id, ...this.canvasObject.toJSON() });
                this.canvasObject = null;
            } else if (this.drawType === DrawType.TEXT) {
                if (!dataEvent.target) {
                    this.drawTextBox(dataEvent.e);
                    this.emit(CanvasEvent.SHAP_ADD, { id: this.textBoxObject.id, ...this.textBoxObject.toJSON() });
                }
            }
        }
    }

    mouseMoveHandler(dataEvent) {
        if (this.mouseDown && this.options.writeMode) {
            // console.log("move....", this.canvas.isDrawingMode, dataEvent.pointer);
            this.mouseTo = dataEvent.pointer;
            if (Date.now() - this.startTime >= 30) {
                this.startTime = Date.now();
                this.startDrawing(dataEvent.e);
            }

            if (this.drawType === DrawType.PEN) {
                //坐标到一定数量,进行触发
                // this.canvas.fire('path:created');
            }
        }
    }

    changeMode(type) {
        super.changeMode(type);
        console.log('______', this.canvas.getObjects());

        if (this.textBoxObject) {
            this.textBoxObject.exitEditing();
            this.canvas.discardActiveObject();
            if (this.textBoxObject.text == "") {
                this.remove(this.textBoxObject);
                this.textBoxObject = null;
                //TODO 处理图形被删除后的逻辑
            }
        }
    }

    /**
     * 开始绘图
     * @param {MouseEvent}} e   鼠标事件 
     */
    startDrawing(e) {
        this.remove(this.canvasObject);
        switch (this.drawType) {
            case DrawType.PEN:
                break;
            case DrawType.ARROW:
                this.canvasObject = this.createArrow(this.mouseFrom, this.mouseTo);
                break;
            case DrawType.LINE:
                this.canvasObject = this.createLine(this.mouseFrom, this.mouseTo);
                break;
            case DrawType.DOTTEDLINE:
                this.canvasObject = this.createDottedline(this.mouseFrom, this.mouseTo);
                break;
            case DrawType.CIRCLE:
                this.canvasObject = this.createCircle(this.mouseFrom, this.mouseTo);
                break;
            case DrawType.ELLIPSE:
                this.canvasObject = this.createEllipse(this.mouseFrom, this.mouseTo);
                break;
            case DrawType.SQUARE:
                this.canvasObject = this.createSquare(this.mouseFrom, this.mouseTo);
                break;
            case DrawType.RECTANGLE:
                this.canvasObject = this.createRectangle(this.mouseFrom, this.mouseTo);
                break;
            case DrawType.RIGHTANGLE:
                this.canvasObject = this.createRightangle(this.mouseFrom, this.mouseTo);
                break;
            case DrawType.TRIANGLE:
                this.canvasObject = this.createTriangle(this.mouseFrom, this.mouseTo);
                break;
            default:
                break;
        }

        this.add(this.canvasObject, this.drawType);
    }

    /**
     * 绘制文本框
     * @param { MouseEvent } e   鼠标事件 
     */
    drawTextBox(e) {
        if (this.drawType === DrawType.TEXT && ["mouseup", "touchend"].indexOf(e.type) >= 0) {
            if (this.textBoxObject) {
                this.textBoxObject.exitEditing();
                this.canvas.discardActiveObject();
                if (this.textBoxObject.text == "") {
                    this.remove(this.textBoxObject);
                    this.textBoxObject = null;
                    //TODO 处理图形被删除后的逻辑
                }
            }

            this.textBoxObject = this.createTextBox(this.mouseFrom, this.mouseTo, "");
            this.textBoxObject.setControlsVisibility({
                bl: true, // 左下
                br: true, // 右下
                mb: false, // 下中
                ml: true, // 中左
                mr: true, // 中右
                mt: false, // 上中
                tl: true, // 上左
                tr: true, // 上右
                mtr: true // 旋转控制键
            });

            console.log('这是文本框', this.textBoxObject);
            this.add(this.textBoxObject, this.drawType);
            this.textBoxObject.enterEditing();
            this.canvas.setActiveObject(this.textBoxObject);
        }
    }

    /**
     * 绘图板事件恢复
     * @param {*} event 
     * @param {*} value 
     */
    drawChange(event, value) {
        switch (event) {
            case CanvasEvent.SHAP_ADD:
                this.createShap(value.type, value);
                break;
            case CanvasEvent.SHAP_UPDATE:
                value = value || [];
                value.forEach(_value => {
                    this.createShap(_value.type, _value);
                });
                break;
            case CanvasEvent.SHAP_DELETE:
                value = value || [];
                value.forEach(_value => {
                    this.removeById(_value.id);
                });
                break;
            default:
                break;
        }
    }

    /**
     * 绘制远程图形
     * @param {Enum | String} type 
     * @param {Object} option 
     */
    createShap(type, option) {
        console.log(type, option);
        const list = this.canvas.getObjects();
        //根据id查询图形,没有,则创建,有的话,直接更新属性
        const objects = list.filter(kclass => kclass.id === option.id);
        if (objects.length > 0) {
            objects.forEach(kclass => {
                kclass.setOptions(option);
                this.canvas.requestRenderAll();
            });
            return;
        }

        let shap = null;
        switch (type) {
            case DrawType.LINE:
            case DrawType.DOTTEDLINE:
                shap = this.createLine({ x: option.x1, y: option.y1 }, { x: option.x2, y: option.y2 }, option);
                break;
            case DrawType.CIRCLE:
                shap = this.createCircle({ x: 0, y: 0 }, { x: 0, y: 0 }, option);
                break;
            case DrawType.ELLIPSE:
                shap = this.createEllipse({ x: 0, y: 0 }, { x: 0, y: 0 }, option);
                break;
            case DrawType.TRIANGLE:
                shap = this.createTriangle({ x: 0, y: 0 }, { x: 0, y: 0 }, option);
                break;
            case DrawType.TEXT:
                shap = this.createText(option.text, option);
                break;
            case "path":
            case DrawType.PEN:
            case DrawType.ARROW:
            case DrawType.SQUARE:
            case DrawType.RECTANGLE:
            case DrawType.TRIANGLE:
            case DrawType.RIGHTANGLE:
                option.fill = "rgba(0, 0, 0, 0)";
                const path = option.path.join(" ").split(',').join(" ");
                shap = this.createPath(path, option);
                break;
            default:
                break;
        }

        console.log('准备绘制', type, option, shap);

        this.add(shap, option.type, option.id);
    }

    loadFromJSON({ version, objects }) {
        objects.forEach(item => {
            this.createShap(item.type, item);
        });
    }
}

module.exports = { Canvas, CanvasEvent, DrawType };