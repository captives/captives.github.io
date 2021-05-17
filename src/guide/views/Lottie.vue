<template>
    <el-main class="bg">
        <url-input v-model="value" :list="list" @change="changeHandler"></url-input>
        <vue-lottie class="lottie" :value="value"></vue-lottie>
    </el-main>
</template>
<script>
export default {
    name: "Lottie",
    data() {
        return {
            value: "",
            list: [
                { label: "山水加载", value: "/assets/lottie/lf20_ZdVYgO.json" },
                { label: "云加载", value: "/assets/lottie/lf20_0H52jw.json" },
                { label: "喝饮料加载", value: "/assets/lottie/lf20_SedlEa.json" },
                { label: "404", value: "/assets/lottie/lf20_amJmnJ.json" },
                { label: "404", value: "/assets/lottie/404.json" },
                { label: "自定义", value: null },
            ],
        };
    },
    methods: {
        changeHandler(val) {
            console.log(val);
        },
    },
};
</script>
<style lang="stylus" scoped>
.lottie {
    width: 200px;
    padding: 20px 0;
    height: 80%;
    margin: 0 auto;
}

.bg {
    width: 100%;
    height: 800px;
    display: block;
    text-align: center;
}
</style>
