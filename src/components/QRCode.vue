<template>
    <el-card style="width: max-content;">
        <div ref="qrcode"></div>
        <div>
            <span style="font-size:14px;padding-right:5px">{{time}}</span>
            <el-button type="text" @click="makeCode">刷新</el-button>
        </div>
    </el-card>
</template>

<script>
export default {
    name: "QRCode",
    props: {
        value: "",
        width: {
            type: Number,
            default: 200,
        },
        height: {
            type: Number,
            default: 200,
        },
    },
    data() {
        return {
            time: "",
            inputValue: "文本测试",
            qrcode: null,
        };
    },
    watch: {
        value() {
            this.makeCode();
        },
    },
    created() {
        this.$fetch("./js/libs/qrcode.min.js").then((res) => {
            let script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.innerText = res;
            document.body.appendChild(script);
            this.init();
        });
    },
    methods: {
        init() {
            console.log(QRCode, this.$refs.qrcode);
            this.qrcode = new QRCode(this.$refs.qrcode, {
                width: this.width,
                height: this.height,
            });
            this.makeCode();
        },
        makeCode() {
            if (!this.value) {
                this.$message({ type: "error", message: "请输入内容" });
            } else {
                this.time = new Date().toLocaleString();
                this.qrcode.clear();
                this.qrcode.makeCode(this.value);
            }
        },
    },
};
</script>
