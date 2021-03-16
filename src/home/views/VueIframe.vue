<template>
    <iframe ref="iframe" :src="src" frameborder="0"></iframe>
</template>
<script>
export default {
    name: "VueIframe",
    data() {
        return {
            src: "https://www.baidu.com",
        };
    },
    created() {
        this.$router.onReady(() => {
            this.src = this.$route.query.url;
            console.log(this.$route.query);
        });
    },
    mounted() {
        this.$refs.iframe.style.height = document.body.clientHeight + "px";
    },
};
</script>
<style lang="stylus" scoped>
iframe {
    width: 100%;
    height: 100%;
    min-height: 600px;
    broder: none;
    outline: none;
}
</style>