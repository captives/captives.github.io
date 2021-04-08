<template>
    <el-main>
        <QRCode :value="inputValue"></QRCode>
        <el-row style="padding-top:20px">
            <el-input v-model="inputValue" placeholder="请输入内容"> </el-input>
        </el-row>
        <el-row>
            <h1>文本内容</h1>
            {{ inputValue }}
        </el-row>
        <vue-source src="components/QRCode.vue"></vue-source>
    </el-main>
</template>

<script>
import QRCode from "@/components/QRCode.vue";
export default {
    name: "QRCodeGenerate",
    components: { QRCode },
    data() {
        return {
            inputValue: "文本测试",
            qrcode: null,
        };
    },
};
</script>
