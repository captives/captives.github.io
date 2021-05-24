<template>
    <div class="gallery" @drop="dropHandler($event)" @dragover="dropoverHandler">
        <el-upload class="file-upload" action="#" :on-change="fileChangeHandle" :auto-upload="false" accept=".png, .jpg, .jpeg, .bmp" :show-file-list="false">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <ul>
            <li v-for="(item, index) in list" :key="index" :style="{ width }" :draggable="draggable" @dragstart="dragstartHandler($event, item)">
                <el-image :src="item.value" fit="scale-down"></el-image>
                <div class="detail">
                    <p>{{ item.label }} </p>
                    <p>{{ item.size }} </p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { fileToBlob, fileToBase64 } from "@/utils/common";
export default {
    name: "Gallery",
    props: {
        column: {
            type: Number,
            default: 1,
        },
        draggable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            list: [
                { label: "图片名称", value: "/assets/image.jpg", size: "12000" },
                { label: "图片名称", value: "/assets/logo.png", size: "12000" },
                { label: "图片名称", value: "/assets/poster.jpg", size: "12000" },
                { label: "图片名称", value: "/assets/socket.png", size: "12000" },
                { label: "图片名称", value: "/assets/image.jpg", size: "12000" },
                { label: "图片名称", value: "/assets/image.jpg", size: "12000" },
                { label: "图片名称", value: "/assets/logo.png", size: "12000" },
                { label: "图片名称", value: "/assets/poster.jpg", size: "12000" },
            ],
        };
    },
    computed: {
        width() {
            return Math.floor(100 / this.column) + "%";
        },
    },
    methods: {
        dragstartHandler(event, value) {
            event.dataTransfer.setData("image", JSON.stringify(value));
        },
        dropHandler(event) {
            event.preventDefault();
            console.log("files", event.dataTransfer.files.length);
            if (event.dataTransfer.files.length) {
                event.dataTransfer.files.forEach((raw) => {
                    fileToBlob(raw, (blob) => {
                        this.list.push({ label: raw.name, value: window.URL.createObjectURL(blob), size: raw.size });
                    });
                });
            }
        },
        dropoverHandler(event) {
            event.preventDefault();
        },
        fileChangeHandle(file, fileList) {
            //base64
            // const reader = new FileReader();
            // reader.addEventListener("load", () => {
            //     this.image.url = reader.result;
            //     console.log("源图像", (reader.result.length / (1024 * 1024)).toFixed(2) + "M");
            // });
            // reader.readAsDataURL(file.raw);

            fileToBase64(file.raw, (data) => {
                this.list.push({ label: file.raw.name, value: data, size: file.size });
            });
        },
    },
    mounted() {
        console.log(this.$el.clientWidth);
    },
};
</script>

<style lang="stylus" scoped>
ul {
    li {
        position: relative;
        padding: 10px;
        height: 150px;
        display: inline-block;
        box-sizing: border-box;

        .el-image {
            background: #eee;
            width: 100%;
            height: 100%;
        }

        .detail {
            display: none;
            position: absolute;
            left: 10px;
            top: 10px;
            right: 10px;
            bottom: 10px;
            color: #FFF;
            background: rgba(0, 0, 0, 0.75);
            padding: 0 20px;
        }
    }
}

.gallery {
    height: 100%;
    box-sizing: border-box;
    flex-shrink: 0;

    li:hover {
        .detail {
            display: block;
        }
    }
}
</style>