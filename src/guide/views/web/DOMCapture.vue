<template>
    <el-container>
        <gallery style="width:300px" :column="2" draggable></gallery>
        <el-main>
            <div class="flex">
                <!-- DOM -->
                <div ref="poster" class="edit-poster" :style="imageStyle" @drop="dropHandler($event)" @dragover="dropoverHandler">
                    <img ref="image" :src="image.url" @load="imageLoading" />
                    <div class="qrcode-legend" :style="qrStyle" @mousedown="startMove"></div>
                </div>

                <!-- 预览图 -->
                <div class="edit-poster" :style="imageStyle">
                    <el-image :src="url"></el-image>
                </div>
            </div>
            <div class="flex">
                <!-- Canvas 绘图 -->
                <div ref="canvas-poster" class="edit-poster" :style="imageStyle">
                    <canvas ref="canvas" :style="imageStyle" :width="image.clientWidth * output.scale" :height="image.clientHeight * output.scale"></canvas>
                </div>
                <!-- Canvas 预览图 -->
                <div class="edit-poster" :style="imageStyle">
                    <el-image :src="output.src"></el-image>
                </div>
            </div>
            <div class="flex">
                <ul>
                    <li>图像信息</li>
                    <li>比例：1:{{ image.ratio }}</li>
                    <li>尺寸：{{image.width.toFixed(2)}}x{{image.height.toFixed(2)}}</li>
                    <li>预览尺寸：{{image.clientWidth.toFixed(2)}}x{{image.clientHeight.toFixed(2)}}</li>
                </ul>

                <ul>
                    <li>二维码信息</li>
                    <li>位置：{{(qrcode.top * output.scale).toFixed(2)}}x{{(qrcode.left * output.scale).toFixed(2)}}</li>
                    <li>尺寸：{{(qrcode.width * output.scale).toFixed(2)}}x{{(qrcode.height * output.scale).toFixed(2)}}</li>
                </ul>
                <ul>
                    <li>输出图像信息</li>
                    <li>倍率:
                        <el-input-number size="small" v-model="output.scale" :min="0.5" :step="0.5" :max="50"></el-input-number>
                    </li>
                    <li>尺寸：{{(image.clientWidth * output.scale).toFixed(2)}}x{{(image.clientHeight * output.scale).toFixed(2)}}</li>
                </ul>

                <el-button size="small" type="danger" @click="publishPoster">生成海报</el-button>
            </div>

            <label style="padding:0 20px">二维码</label>
            <el-input v-model="qrcode.text" size="small" style="width:30%"></el-input>
        </el-main>
    </el-container>
</template>
<script>
import html2canvas from "html2canvas";
import Gallery from "@/components/Gallery";
import { fileToBase64 } from "@/utils/common";
export default {
    name: "DOMCapture",
    components: { Gallery },
    data() {
        return {
            url: "", //预览图
            width: 400,
            image: {
                url: null,
                ratio: 1, //图像的缩放比率
                size: 0, //图像源大小
                width: 0, //图像源宽
                height: 0, //图像源高
                clientWidth: 0, //容器宽
                clientHeight: 0, //容器高
            }, //背景图
            qrcode: {
                text: "",
                mouseDown: false,
                startX: 0,
                startY: 0,
                top: 0,
                left: 0,
                width: 80,
                height: 80,
            },
            output: {
                scale: 3,
                width: 0,
                height: 0,
                src: null,
            },
            canvas: {
                ratio: 1,
                width: 0,
                height: 0,
                image: new Image(),
                context: null,
            },
        };
    },
    computed: {
        qrStyle() {
            return {
                top: this.qrcode.top + "px",
                left: this.qrcode.left + "px",
                width: this.qrcode.width + "px",
                height: this.qrcode.height + "px",
            };
        },
        posterStyle() {
            let scale = 1;
            if (this.image.width > this.image.clientWidth) {
                scale = this.image.clientWidth / this.image.width;
            }

            return {
                width: this.image.width + "px",
                height: this.image.width + "px",
            };
        },
        imageStyle() {
            return {
                width: this.image.clientWidth + "px",
                height: this.image.clientHeight + "px",
            };
        },
    },
    methods: {
        dropHandler(event) {
            event.preventDefault();
            if (event.dataTransfer.getData("image")) {
                const data = JSON.parse(event.dataTransfer.getData("image"));
                this.image.url = data.value;
                this.loadImage(this.image.url);
            }
        },
        dropoverHandler(event) {
            event.preventDefault();
        },
        getPixelRatio: (context) => {
            var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
        },
        animate() {
            this.canvas.context.clearRect(0, 0, this.image.width, this.image.height);
            this.canvas.context.drawImage(this.canvas.image, 0, 0, this.image.width, this.image.height, 0, 0, this.image.clientWidth * this.output.scale, this.image.clientHeight * this.output.scale);

            this.canvas.context.fillStyle = "#FFffff";
            this.canvas.context.strokeStyle = "#0000FF";
            this.canvas.context.lineWidth = this.output.scale;
            this.canvas.context.fillRect(this.qrcode.left * this.output.scale, this.qrcode.top * this.output.scale, this.qrcode.width * this.output.scale, this.qrcode.height * this.output.scale);
            this.canvas.context.strokeRect(this.qrcode.left * this.output.scale, this.qrcode.top * this.output.scale, this.qrcode.width * this.output.scale, this.qrcode.height * this.output.scale);

            if ("requestAnimationFrame" in window) {
                requestAnimationFrame(this.animate);
            } else if ("webkitRequestAnimationFrame" in window) {
                webkitRequestAnimationFrame(this.animate);
            } else if ("msRequestAnimationFrame" in window) {
                msRequestAnimationFrame(this.animate);
            } else if ("mozRequestAnimationFrame" in window) {
                mozRequestAnimationFrame(this.animate);
            }
        },
        loadImage(src) {
            //blob
            this.canvas.context = this.$refs["canvas"].getContext("2d");
            const ratio = this.getPixelRatio(this.canvas.context);
            this.canvas.image.onload = () => {
                this.canvas.image.style.width = this.image.clientWidth + "px";
                this.canvas.image.style.height = this.image.clientHeight + "px";
                this.animate();
            };
            this.canvas.image.src = src;
        },
        imageLoading(event) {
            const el = new Image();
            el.src = this.image.url;
            this.image.width = el.width;
            this.image.height = el.height;
            console.log(el.src, el.width, el.height);
            //  console.log("文件大小", (file.raw.size / (1024 * 1024)).toFixed(2) + "M");
            let ratio = 1;
            if (el.width > this.width) {
                ratio = el.width / this.width;
                this.image.clientWidth = this.width;
                this.image.ratio = ratio;
            }

            this.image.clientWidth = el.width / ratio;
            this.image.clientHeight = el.height / ratio;
            console.log(this.image);
        },
        startMove(event) {
            event.preventDefault();
            this.qrcode.mouseDown = true;
            this.qrcode.top = event.currentTarget.offsetTop;
            this.qrcode.left = event.currentTarget.offsetLeft;
            this.qrcode.startX = event.clientX;
            this.qrcode.startY = event.clientY;
            document.addEventListener("mousemove", this.mouseMoveHandler.bind(this), false);
            document.addEventListener("mouseup", this.mouseUpHandler.bind(this), false);
        },
        mouseMoveHandler(event) {
            if (this.qrcode.mouseDown) {
                const x = event.clientX - this.qrcode.startX;
                const y = event.clientY - this.qrcode.startY;

                this.qrcode.top += y;
                this.qrcode.left += x;

                this.qrcode.startX = event.clientX;
                this.qrcode.startY = event.clientY;
                if (this.qrcode.left < 0) {
                    this.qrcode.left = 0;
                }

                if (this.qrcode.top < 0) {
                    this.qrcode.top = 0;
                }

                if (this.qrcode.left + this.qrcode.width >= this.image.clientWidth) {
                    this.qrcode.left = this.image.clientWidth - this.qrcode.width;
                }

                if (this.qrcode.top + this.qrcode.height >= this.image.clientHeight) {
                    this.qrcode.top = this.image.clientHeight - this.qrcode.height;
                }
            }
        },
        mouseUpHandler(event) {
            this.qrcode.mouseDown = false;
            document.removeEventListener("mousemove", this.mouseMoveHandler.bind(this), false);
            document.removeEventListener("mouseup", this.mouseUpHandler.bind(this), false);
        },
        publishPoster() {
            html2canvas(this.$refs.poster, { scale: this.output.scale }).then((canvas) => {
                if (canvas) {
                    this.url = canvas.toDataURL("image/png");
                    console.log(this.url);
                }
            });

            const canvas = this.$refs["canvas"];
            console.log(canvas.toDataURL("image/png"));

            this.output.src = canvas.toDataURL("image/png");
        },
    },
};
</script>
<style lang="stylus" scoped>
.flex {
    display: flex;
    justify-content: center;

    ul {
        min-width: 30%;
    }
}

.edit-poster {
    position: relative;
    margin: 20px 30px;
    min-width: 400px;
    min-height: 140px;
    background: #DEDEDE;
    display: inline-block;
    // border: 1px orange dotted;
    box-sizing: border-box;

    canvas {
        background: none;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .qrcode-legend {
        position: absolute;
        width: 80px;
        height: 80px;
        background: #fff;
        display: block;
        border: 1px #00f solid;
        top: 10px;
        left: 50px;
        cursor: move;
    }
}
</style>
