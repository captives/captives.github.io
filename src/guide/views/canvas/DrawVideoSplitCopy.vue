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
                <div ref="container" class="video-item"></div>
                <el-row>
                    行
                    <el-input-number v-model="row" :min="1" :max="10" size="small" @change="handleChange"></el-input-number>列
                    <el-input-number v-model="column" :min="1" :max="10" size="small" @change="handleChange"></el-input-number>
                </el-row>
            </el-col>
        </el-row>

        <vue-source src="guide/views/canvas/DrawVideoSplitCopy.vue" lang="html"></vue-source>
    </el-main>
</template>
<script>
export default {
    name: "DrawVideoSplitCopy",
    data() {
        return {
            url: "",
            list: [],
            row: 2,
            column: 2,
            animationFrameId: 0,
        };
    },
    mounted() {
        let video = this.$refs.localVideo;
        // video.addEventListener('canplay', this.init);
        this.init();
    },
    methods: {
        init(event) {
            let views = this.$refs.container;
            views.innerHTML = "";
            this.list = [];

            const drawWidth = Math.floor(views.clientWidth / this.column); //单个元素的宽
            const drawHeight = Math.floor(views.clientHeight / this.row); //单个元素的高
            for (var k = 0; k < this.row; k++) {
                //逐行
                for (var i = 0; i < this.column; i++) {
                    //逐列
                    let canvas = document.createElement("canvas");
                    let context = canvas.getContext("2d");

                    canvas.setAttribute("width", drawWidth - 1);
                    canvas.setAttribute("height", drawHeight - 1);
                    canvas.style.position = "absolute";
                    canvas.style.left = i * drawWidth + 1 + "px";
                    canvas.style.top = k * drawHeight + 1 + "px";
                    views.appendChild(canvas);

                    this.list.push(context);
                }
            }

            this.animate();
        },
        animate() {
            let source = this.$refs.localVideo;
            let views = this.$refs.container;
            const drawWidth = Math.floor(views.clientWidth / this.column); //单个元素的宽
            const drawHeight = Math.floor(views.clientHeight / this.row); //单个元素的高

            if (source) {
                const sourceWidth = Math.floor(source.videoWidth / this.column); //单个元素的宽
                const sourceHeight = Math.floor(source.videoHeight / this.row); //单个元素的高
                for (var i = 0; i < this.column; i++) {
                    //逐列
                    for (var k = 0; k < this.row; k++) {
                        //逐行
                        let context = this.list[k * this.column + i];
                        context.drawImage(source, i * sourceWidth, k * sourceHeight, sourceWidth, sourceHeight, 0, 0, drawWidth, drawHeight);
                    }
                }

                if ("requestAnimationFrame" in window) {
                    this.animationFrameId = requestAnimationFrame(this.animate);
                } else if ("webkitRequestAnimationFrame" in window) {
                    this.animationFrameId = webkitRequestAnimationFrame(this.animate);
                } else if ("msRequestAnimationFrame" in window) {
                    this.animationFrameId = msRequestAnimationFrame(this.animate);
                } else if ("mozRequestAnimationFrame" in window) {
                    this.animationFrameId = mozRequestAnimationFrame(this.animate);
                }
            }
        },
        handleChange() {
            if ("cancelAnimationFrame" in window) {
                cancelAnimationFrame(this.animationFrameId);
            } else if ("webkitCancelAnimationFrame" in window) {
                webkitCancelAnimationFrame(this.animate);
            } else if ("msCancelAnimationFrame" in window) {
                msCancelAnimationFrame(this.animate);
            } else if ("mozCancelAnimationFrame" in window) {
                mozCancelAnimationFrame(this.animate);
            }
            this.init();
        },
    },
};
</script>

<style lang="stylus" scoped>
.video-item {
    position: relative;
    width: 720px;
    height: 405px;
    background: #333;
}
</style>
