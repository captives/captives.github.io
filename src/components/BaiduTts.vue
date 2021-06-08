<template>
    <audio ref="audio" :src="src" autoplay></audio>
</template>
<script>
export default {
    name: "BaiduTts",
    props: {
        value: {
            type: String,
            default: "",
        },
        lang: {
            type: String,
            default: "zh", //uk:美式 en:英式
        },
        speed: {
            type: Number,
            default: 3,
        },
    },
    computed: {
        src() {
            return `https://fanyi.baidu.com/gettts?lan=${this.lang}&text=${this.value}&spd=${this.speed}&source=web`;
        },
    },
    methods: {
        play() {
            this.$refs["audio"].play();
        },
        pause() {
            this.$refs["audio"].pause();
        },
    },
};
</script>