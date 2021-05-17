<template>
    <el-main>
        <ul>
            <li v-for="(html,index) in history" :key="index" v-html="html"></li>
        </ul>
    </el-main>
</template>
<script>
export default {
    name: "Console",
    data() {
        return {
            history: [],
        };
    },
    activated() {
        this.history = console.history || [];
    },
};
</script>
<style lang="stylus" scoped>
li {
    padding: 5px 0;
    font-size: 14px;
}
</style>
