<template>
    <el-container>
        <el-main>
            <canvas ref="draw" class="panel" width="1360px" height="720px"></canvas>

            <ul>
                <li>
                    <el-button type="primary" icon="el-icon-edit" circle @click="drawHandler"></el-button>
                </li>
                <li>
                    <el-button type="success" icon="el-icon-rank" circle @click="selectHandler"></el-button>
                </li>
                <li>
                    <el-button type="warning" icon="el-icon-delete" circle @click="clearHandler"></el-button>
                </li>
                <li>
                    <el-button type="danger" icon="el-icon-refresh" circle @click="resetHandler"></el-button>
                </li>
                <li>
                    <el-button size="small" @click="selectFileHandler">照片</el-button>
                    <input id="fileInput" type="file" accept="image/png,image/jpeg,image/jpg,image/bmp" style="display:none" v-on:change="fileChangeHandler">
                </li>
                <li>
                    <el-link href="https://github.com/Couy69/vue-fabric-drawingboard">例1</el-link>
                </li>
                <li>
                    <el-link href="https://github.com/vipstone/drawingboard">例2</el-link>
                </li>
            </ul>
        </el-main>

        <el-footer>
            <ul></ul>
            <el-row v-if="false" :gutter="10">
                <el-col :span="8">{{ canvas && canvas.toJSON() }}</el-col>
                <el-col :span="8">{{ canvas && canvas.toSVG() }}</el-col>
                <el-col :span="8">{{ canvas && canvas.toDataURL() }}</el-col>
            </el-row>
        </el-footer>
        <el-footer>
            <FabricJS></FabricJS>
        </el-footer>
    </el-container>
</template>
<script>
import { fabric } from "fabric";
import FabricJS from "./drawboard/FabricJS";
export default {
    name: "BaseFabric",
    components: { FabricJS },
    data() {
        return {
            canvas: null,
            zoom: 1,
            isDragging: false,
            lastPosX: 0,
            lastPosY: 0,
            viewportTransform: [],
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.init();
        });
        // this.reset();
        document.addEventListener("keydown", (event) => {
            const code = window.event ? event.keyCode : event.which;
            if (code == 8) {
                //删除选中
                this.canvas.remove(this.canvas.getActiveObject());
            }
        });
    },
    methods: {
        init() {
            let canvas = (this.canvas = new fabric.Canvas(this.$refs.draw, {
                isDrawingMode: true,
            }));

            fabric.Object.prototype.transparentCorners = false;
            if (canvas.freeDrawingBrush) {
                canvas.freeDrawingBrush.color = "#ff0";
                canvas.freeDrawingBrush.width = 10;
                canvas.freeDrawingBrush.shadow = new fabric.Shadow({
                    blur: 0,
                    offsetX: 0,
                    offsetY: 0,
                    affectStroke: true,
                    color: "blue",
                });
            }

            console.log("canvas", canvas, this.$refs.draw);

            canvas.on("mouse:down", (opt) => {
                console.log("mouse:down", opt.e.type, opt);
                var evt = opt.e;
                if (evt.altKey === true && !this.canvas.isDrawingMode) {
                    this.isDragging = true;
                    this.canvas.selection = false;
                    this.lastPosX = evt.type == "touchstart" ? evt.targetTouches[0].clientX : evt.clientX;
                    this.lastPosY = evt.type == "touchstart" ? evt.targetTouches[0].clientY : evt.clientY;
                    console.log(this.lastPosX, this.lastPosY);
                }
            });

            canvas.on("mouse:move", (opt) => {
                console.log("mouse:move", opt.e.type, opt);
                if (this.isDragging) {
                    var evt = opt.e;
                    var vpt = this.canvas.viewportTransform;
                    const clientX = evt.type == "touchmove" ? evt.targetTouches[0].clientX : evt.clientX;
                    const clientY = evt.type == "touchmove" ? evt.targetTouches[0].clientY : evt.clientY;
                    vpt[4] += clientX - this.lastPosX;
                    vpt[5] += clientY - this.lastPosY;
                    console.log(clientX, this.lastPosX, clientY - this.lastPosY);
                    this.canvas.requestRenderAll();
                    this.lastPosX = clientX;
                    this.lastPosY = clientY;
                }
            });

            canvas.on("mouse:up", (opt) => {
                console.log("mouse:up", opt.e.type, opt);
                if (this.isDragging) {
                    // 鼠标向上移动时，我们希望重新计算所有对象的新交互，因此我们称之为setViewportTransform
                    this.canvas.setViewportTransform(this.canvas.viewportTransform);
                    this.isDragging = false;
                    this.canvas.selection = true;
                }
            });

            canvas.on("mouse:wheel", ({ e }) => {
                var delta = e.deltaY;
                var zoom = canvas.getZoom();
                zoom *= 0.999 ** delta;
                if (zoom > 10) zoom = 10;
                if (zoom < 0.25) zoom = 0.25;
                this.zoom = zoom;
                // canvas.setZoom(zoom);
                canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, zoom);
                e.preventDefault();
                e.stopPropagation();

                var vpt = this.canvas.viewportTransform;
                if (zoom < 400 / 1000) {
                    vpt[4] = 200 - (1000 * zoom) / 2;
                    vpt[5] = 200 - (1000 * zoom) / 2;
                } else {
                    if (vpt[4] >= 0) {
                        vpt[4] = 0;
                    } else if (vpt[4] < this.canvas.getWidth() - 1000 * zoom) {
                        vpt[4] = this.canvas.getWidth() - 1000 * zoom;
                    }
                    if (vpt[5] >= 0) {
                        vpt[5] = 0;
                    } else if (vpt[5] < this.canvas.getHeight() - 1000 * zoom) {
                        vpt[5] = this.canvas.getHeight() - 1000 * zoom;
                    }
                }
            });
        },
        drawHandler() {
            if (this.canvas) {
                this.canvas.isDrawingMode = true;
            }
        },
        selectHandler() {
            if (this.canvas) {
                this.canvas.isDrawingMode = false;
                console.log("对象集合", this.canvas.getObjects());
            }
        },
        resetHandler() {
            this.clearHandler();
            let source = this.$refs.draw;
            const width = source.offsetWidth;
            const height = source.offsetHeight;
            // add random objects
            for (var i = 15; i--; ) {
                var dim = fabric.util.getRandomInt(30, 60);
                var klass = ["image", "Rect", "Triangle", "Circle"][fabric.util.getRandomInt(0, 2)];
                var options = {
                    top: fabric.util.getRandomInt(0, width),
                    left: fabric.util.getRandomInt(0, height),
                    fill: "green",
                };

                if (klass === "Circle") {
                    options.radius = dim;
                    let circle = new fabric.Circle({
                        radius: dim,
                        fill: "blue",
                        originX: "center", //调整中心点的X轴坐标
                        originY: "center",
                    });

                    let text = new fabric.Text("F" + dim, {
                        //绘制文本
                        fontSize: dim,
                        fill: "#FFF",
                        originX: "center",
                        originY: "center",
                    });

                    this.canvas.add(new fabric.Group([circle, text], options));
                } else if (klass == "image") {
                    fabric.Image.fromURL("/assets/image.jpg", (img) => {
                        img.scale(0.5).set({
                            left: fabric.util.getRandomInt(0, width / 2),
                            top: fabric.util.getRandomInt(0, height) / 2,
                            angle: -15,
                            clipTo: function (ctx) {
                                ctx.arc(0, 0, 300, 0, Math.PI * 2, true);
                            },
                        });

                        this.canvas.add(img).setActiveObject(img);
                    });
                } else {
                    options.width = dim;
                    options.height = dim;
                    this.canvas.add(new fabric[klass](options));
                }
            }
        },
        clearHandler() {
            this.canvas.clear();
        },
        selectFileHandler(event) {
            // document.getElementById("fileInput").click(event);
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/png,image/jpeg,image/jpg,image/bmp";
            input.addEventListener("change", this.fileChangeHandler.bind(this));
            input.click(event);
        },
        fileChangeHandler(event) {
            console.log("文件地址", event.target);
            console.log("this.files", event.target.files);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                fabric.Image.fromURL(reader.result, (img) => {
                    img.scale(0.5).set({
                        left: 0,
                        top: 0,
                        angle: 0,
                        clipTo: function (ctx) {
                            ctx.arc(0, 0, 300, 0, Math.PI * 2, true);
                        },
                    });

                    this.canvas.add(img).setActiveObject(img);
                });
            });
            reader.readAsDataURL(event.target.files[0]);
        },
    },
};
</script>
<style lang="stylus" scoped>
.panel {
    width: 100%;
    height: 100%;
    background: orange;
}

ul {
    position: absolute;
    right: 20px;
    top: 100px;

    li {
        margin: 10px 0;
    }
}
</style>
