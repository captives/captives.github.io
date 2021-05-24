<template>
    <el-main class="center">
        <url-input v-model="url" :list="$videoList"></url-input>
        <el-row :gutter="50">
            <el-col class="center" :xs="24" :sm="24" :md="12">
                <el-divider content-position="left">Video</el-divider>
                <video ref="localVideo" class="video-item" :src="url" controls muted loop autoplay></video>
            </el-col>

            <el-col class="center" :xs="24" :sm="24" :md="12">
                <el-divider content-position="left">Canvas</el-divider>
                <canvas ref="draw" class="video-item"></canvas>
                <el-row>
                    行
                    <el-input-number v-model="row" :min="1" :max="10" size="small"></el-input-number>列
                    <el-input-number v-model="column" :min="1" :max="10" size="small"></el-input-number>
                </el-row>
            </el-col>
        </el-row>

        <vue-source src="guide/views/canvas/DrawVideoSplitScreen.vue" lang="html"></vue-source>
    </el-main>
</template>
<script>
export default {
    name: "DrawVideoSplicing",
    data() {
        return {
            url: null,
            canvas: null,
            context: null,
            row: 3,
            column: 3,
        };
    },
    mounted() {
        let video = this.$refs.localVideo;
        video.addEventListener("canplay", this.init);
    },
    methods: {
        init(event) {
            let canvas = this.$refs.draw;
            if (canvas) {
                canvas.setAttribute("width", event.target.offsetWidth);
                canvas.setAttribute("height", event.target.offsetHeight);
                this.context = canvas.getContext("2d");
                this.animate();
            }
        },
        drawLine(x, y, tx, ty, width) {
            width = width || 2;
            this.context.beginPath();
            this.context.moveTo(x - width / 2, y);
            this.context.lineTo(tx - width / 2, ty);
            this.context.lineWidth = width;
            this.context.strokeStyle = "#FFF";
            this.context.stroke();
        },
        drawText(x, y, text) {
            this.context.font = "16px 微软雅黑";
            this.context.fillStyle = "#FFF";
            this.context.fillText("video " + text, x, y);
        },
        animate() {
            let source = this.$refs.localVideo;
            let canvas = this.$refs.draw;
            if (source) {
                const sourceWidth = Math.floor(source.videoWidth / this.column); //单个元素的宽
                const sourceHeight = Math.floor(source.videoHeight / this.row); //单个元素的高

                const drawWidth = Math.floor(canvas.width / this.column); //单个元素的宽
                const drawHeight = Math.floor(canvas.height / this.row); //单个元素的高

                this.context.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < this.column; i++) {
                    for (var k = 0; k < this.row; k++) {
                        this.context.drawImage(source, 0, 0, source.videoWidth, source.videoHeight, i * drawWidth + 1, k * drawHeight + 1, drawWidth - 1, drawHeight - 1);

                        this.drawText((i + 1) * drawWidth - 70, k * drawHeight + 20, k * this.column + i + 1);
                    }
                }

                if ("requestAnimationFrame" in window) {
                    requestAnimationFrame(this.animate);
                } else if ("webkitRequestAnimationFrame" in window) {
                    webkitRequestAnimationFrame(this.animate);
                } else if ("msRequestAnimationFrame" in window) {
                    msRequestAnimationFrame(this.animate);
                } else if ("mozRequestAnimationFrame" in window) {
                    mozRequestAnimationFrame(this.animate);
                }
            }
        },
    },
};
</script>

<style lang="stylus" scoped>
.video-item {
    width: 720px;
    height: 405px;
    background: #333;
}
</style>
